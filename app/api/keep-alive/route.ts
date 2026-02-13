import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Keep-alive endpoint to prevent Supabase from pausing.
// Set up a cron job (e.g., cron-job.org) to hit this every day or every few days.
export async function GET() {
  const startTime = Date.now();

  try {
    // Simple query to keep Supabase active
    const { count, error } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    if (error) {
      return NextResponse.json(
        {
          status: "error",
          message: error.message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    const responseTime = Date.now() - startTime;

    return NextResponse.json({
      status: "healthy",
      database: "connected",
      userCount: count,
      responseTime: `${responseTime}ms`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Database unreachable",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
