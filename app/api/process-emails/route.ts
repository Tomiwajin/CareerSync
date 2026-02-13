import { type NextRequest, NextResponse } from "next/server";
import { google, gmail_v1 } from "googleapis";
import { cookies } from "next/headers";
import { Client } from "@gradio/client";
import { shouldExcludeEmail } from "@/lib/email-utils";

interface ClassificationResult {
  label: string;
  score: number;
  success?: boolean;
}

interface ExtractionResult {
  company: string;
  role: string;
  success?: boolean;
}

function sendProgress(
  encoder: TextEncoder,
  controller: ReadableStreamDefaultController,
  stage: string,
  current: number,
  total: number
) {
  const progress = {
    type: "progress",
    stage,
    current,
    total,
    percentage: Math.round((current / total) * 100),
  };
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(progress)}\n\n`));
}

async function classifyEmailsBatch(
  emails: Array<{ text: string; id: string }>,
  progressCallback?: (current: number, total: number) => void
): Promise<Map<string, ClassificationResult>> {
  const results = new Map<string, ClassificationResult>();
  const maxBatchSize = 100;
  const spaceUrl = process.env.HUGGINGFACE_SPACE_URL;
  if (!spaceUrl) throw new Error("HuggingFace Space URL not configured");

  const client = await Client.connect(spaceUrl);
  for (let i = 0; i < emails.length; i += maxBatchSize) {
    const batch = emails.slice(i, i + maxBatchSize);
    progressCallback?.(i, emails.length);

    const emailTexts = batch.map((email) => email.text);
    const result = await client.predict("/classify_batch", {
      emails_json: JSON.stringify(emailTexts),
    });

    const batchData = JSON.parse(result.data as string);
    if (!batchData.results || !Array.isArray(batchData.results))
      throw new Error(batchData.error || "Invalid batch response format");

    batch.forEach((email, index) => {
      const res = batchData.results[index];
      results.set(email.id, {
        label: res?.label || "other",
        score: res?.score || 0,
        success: res?.success ?? false,
      });
    });

    if (i + maxBatchSize < emails.length)
      await new Promise((r) => setTimeout(r, 1000));
  }

  progressCallback?.(emails.length, emails.length);
  return results;
}

async function extractJobInfoBatch(
  emails: Array<{ text: string; id: string }>,
  progressCallback?: (current: number, total: number) => void
): Promise<Map<string, ExtractionResult>> {
  const results = new Map<string, ExtractionResult>();
  const maxBatchSize = 100;
  const spaceUrl = process.env.HUGGINGFACE_SPACE_URL;
  if (!spaceUrl) throw new Error("HuggingFace Space URL not configured");

  const client = await Client.connect(spaceUrl);
  for (let i = 0; i < emails.length; i += maxBatchSize) {
    const batch = emails.slice(i, i + maxBatchSize);
    progressCallback?.(i, emails.length);

    const emailTexts = batch.map((email) => email.text);
    const result = await client.predict("/extract_batch", {
      emails_json: JSON.stringify(emailTexts),
    });

    const batchData = JSON.parse(result.data as string);
    if (!batchData.results || !Array.isArray(batchData.results))
      throw new Error(batchData.error || "Invalid batch response format");

    batch.forEach((email, index) => {
      const res = batchData.results[index];
      results.set(email.id, {
        company: res?.company || "Unknown",
        role: res?.role || "Unknown",
        success: res?.success ?? false,
      });
    });

    if (i + maxBatchSize < emails.length)
      await new Promise((r) => setTimeout(r, 1000));
  }

  progressCallback?.(emails.length, emails.length);
  return results;
}

function extractEmailBody(payload: gmail_v1.Schema$MessagePart): string {
  const extractFromPart = (part: gmail_v1.Schema$MessagePart): string => {
    let text = "";
    if (part.body?.data) {
      try {
        const decoded = Buffer.from(part.body.data, "base64").toString("utf-8");
        if (part.mimeType?.includes("text/html")) {
          const clean = decoded
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
            .replace(/<[^>]+>/g, " ")
            .replace(/&nbsp;/g, " ")
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/\s+/g, " ")
            .trim();
          text += clean + "\n";
        }
      } catch {}
    }
    if (part.parts) for (const p of part.parts) text += extractFromPart(p);
    return text;
  };
  return extractFromPart(payload).trim();
}

async function fetchEmailsInBatches(
  gmail: gmail_v1.Gmail,
  allMessages: gmail_v1.Schema$Message[],
  batchSize = 10
) {
  const results: gmail_v1.Schema$Message[] = [];
  for (let i = 0; i < allMessages.length; i += batchSize) {
    const batch = allMessages.slice(i, i + batchSize);
    const responses = await Promise.all(
      batch.map((m) =>
        gmail.users.messages
          .get({ userId: "me", id: m.id!, format: "full" })
          .then((r) => r.data)
          .catch(() => null)
      )
    );
    results.push(...(responses.filter(Boolean) as gmail_v1.Schema$Message[]));
    await new Promise((r) => setTimeout(r, 500));
  }
  return results;
}

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const {
          startDate,
          endDate,
          excludedEmails = [],
          classificationThreshold = 0.5,
          jobLabels = [
            "applied",
            "rejected",
            "interview",
            "next-phase",
            "offer",
          ],
        } = await request.json();

        const requiredEnv = [
          "GOOGLE_CLIENT_ID",
          "GOOGLE_CLIENT_SECRET",
          "GOOGLE_REDIRECT_URI",
          "HUGGINGFACE_SPACE_URL",
        ];
        for (const envVar of requiredEnv)
          if (!process.env[envVar]) throw new Error(`${envVar} not configured`);

        if (!startDate || !endDate)
          throw new Error("Start and end date required");

        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime()))
          throw new Error("Invalid date format");
        if (start >= end) throw new Error("Start date must be before end date");

        const cookieStore = await cookies();
        const accessToken = cookieStore.get("gmail_access_token")?.value;
        const refreshToken = cookieStore.get("gmail_refresh_token")?.value;
        if (!accessToken) throw new Error("Authentication required");

        sendProgress(encoder, controller, "Connecting to Gmail", 0, 100);
        const oauth2 = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET,
          process.env.GOOGLE_REDIRECT_URI
        );
        oauth2.setCredentials({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        const gmail = google.gmail({ version: "v1", auth: oauth2 });

        sendProgress(encoder, controller, "Fetching emails", 5, 100);
        const query = `category:primary after:${Math.floor(
          start.getTime() / 1000
        )} before:${Math.floor(end.getTime() / 1000)}`;
        const allMessages: gmail_v1.Schema$Message[] = [];
        let pageToken: string | undefined;

        do {
          const res = await gmail.users.messages.list({
            userId: "me",
            q: query,
            maxResults: 100,
            pageToken,
          });
          const msgs = res.data.messages || [];
          allMessages.push(...msgs);
          pageToken = res.data.nextPageToken || undefined;
          sendProgress(
            encoder,
            controller,
            `Fetching emails (${allMessages.length} found)`,
            Math.min(15, 5 + (allMessages.length / 100) * 10),
            100
          );
        } while (pageToken);

        sendProgress(
          encoder,
          controller,
          "Retrieving message details",
          20,
          100
        );
        const detailedMessages = await fetchEmailsInBatches(
          gmail,
          allMessages,
          100
        );

        const emailsForClassification = [];
        for (const email of detailedMessages) {
          const headers = email.payload?.headers || [];
          const from = headers.find((h) => h.name === "From")?.value || "";
          if (shouldExcludeEmail(from, excludedEmails)) continue;
          const subject =
            headers.find((h) => h.name === "Subject")?.value || "";
          const date = new Date(Number.parseInt(email.internalDate ?? "0"));
          const body = email.payload ? extractEmailBody(email.payload) : "";
          const text = `Subject: ${subject}\n\n${body.substring(0, 1000)}`;
          emailsForClassification.push({
            text,
            id: email.id!,
            metadata: {
              from,
              subject,
              date,
              body,
              snippet: email.snippet || "",
            },
          });
        }

        sendProgress(encoder, controller, "Classifying emails", 40, 100);
        const classifications = await classifyEmailsBatch(
          emailsForClassification,
          (c, t) =>
            sendProgress(
              encoder,
              controller,
              `Classifying (${c}/${t})`,
              40 + (c / t) * 20,
              100
            )
        );

        const jobRelated = [];
        for (const email of emailsForClassification) {
          const cls = classifications.get(email.id);
          if (!cls?.success) continue;
          const isJob =
            jobLabels.includes(cls.label.toLowerCase()) &&
            cls.score >= classificationThreshold;
          if (isJob) jobRelated.push(email);
        }

        sendProgress(
          encoder,
          controller,
          `Extracting job info (${jobRelated.length} emails)`,
          70,
          100
        );
        const extractions = await extractJobInfoBatch(jobRelated, (c, t) =>
          sendProgress(
            encoder,
            controller,
            `Extracting (${c}/${t})`,
            70 + (c / t) * 20,
            100
          )
        );

        const applications = jobRelated.map((email) => {
          const cls = classifications.get(email.id);
          const ext = extractions.get(email.id);
          const { from, subject, date, body } = email.metadata;
          return {
            id: `gmail-${email.id}`,
            company: ext?.company || "Unknown",
            role: ext?.role || "Unknown",
            status: cls?.label.toLowerCase() || "other",
            email: from.match(/<(.+)>/)?.[1] || from,
            date: date.toISOString(),
            subject,
            bodyPreview: body.substring(0, 200),
            classification: {
              label: cls?.label || "unknown",
              confidence: cls?.score || 0,
            },
          };
        });

        sendProgress(encoder, controller, "Complete", 100, 100);
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "complete",
              success: true,
              processed: applications.length,
              applications,
              totalEmails: allMessages.length,
            })}\n\n`
          )
        );
        controller.close();
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "error",
              message:
                err instanceof Error ? err.message : "Failed to process emails",
            })}\n\n`
          )
        );
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
