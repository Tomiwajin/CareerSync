import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // Clear all auth-related cookies
    cookieStore.delete("gmail_access_token");
    cookieStore.delete("gmail_refresh_token");
    cookieStore.delete("user_email");
    cookieStore.delete("user_id");

    return NextResponse.json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
