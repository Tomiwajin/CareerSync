import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function GET() {
  const spaceUrl = process.env.HUGGINGFACE_SPACE_URL;

  if (!spaceUrl) {
    return NextResponse.json(
      { status: "error", message: "HuggingFace Space URL not configured" },
      { status: 500 }
    );
  }

  const startTime = Date.now();

  try {
    const client = await Client.connect(spaceUrl);

    // Send a minimal test request to ensure models are loaded
    const result = await client.predict("/classify_batch", {
      emails_json: JSON.stringify(["test"]),
    });

    const responseTime = Date.now() - startTime;

    // If response took > 5 seconds, models were likely cold-starting
    const wasColdStart = responseTime > 5000;

    return NextResponse.json({
      status: "ready",
      responseTime,
      wasColdStart,
      message: wasColdStart
        ? "Models loaded successfully (cold start)"
        : "Models are ready",
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;

    return NextResponse.json(
      {
        status: "error",
        responseTime,
        message:
          error instanceof Error ? error.message : "Failed to connect to models",
      },
      { status: 503 }
    );
  }
}
