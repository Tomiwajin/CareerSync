import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { google } from "googleapis";
import { supabase } from "@/lib/supabase";
import { decrypt } from "@/lib/encryption";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("gmail_access_token");
    const userEmail = cookieStore.get("user_email");
    const userId = cookieStore.get("user_id");

    // Access token still valid
    if (accessToken?.value) {
      return NextResponse.json({
        isAuthenticated: true,
        email: userEmail?.value || null,
      });
    }

    // Access token expired — try refreshing via stored refresh token
    if (userId?.value) {
      const { data: user } = await supabase
        .from("users")
        .select("gmail_refresh_token, email")
        .eq("id", userId.value)
        .single();

      if (user?.gmail_refresh_token) {
        const refreshToken = decrypt(user.gmail_refresh_token);
        const oauth2Client = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET,
          process.env.GOOGLE_REDIRECT_URI
        );
        oauth2Client.setCredentials({ refresh_token: refreshToken });
        const { credentials } = await oauth2Client.refreshAccessToken();

        if (credentials.access_token) {
          cookieStore.set("gmail_access_token", credentials.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600,
          });
          return NextResponse.json({
            isAuthenticated: true,
            email: user.email || userEmail?.value || null,
          });
        }
      }
    }

    return NextResponse.json({ isAuthenticated: false, email: null });
  } catch {
    return NextResponse.json({ isAuthenticated: false, email: null });
  }
}
