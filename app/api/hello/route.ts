// Minimal Node.js backend via Next.js App Router API route
import { NextResponse } from "next/server";

// Tell Next this route is always dynamic (no static optimization)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const seconds = String(now.getSeconds()).padStart(2, "0")
  const timeString = `${hours}:${minutes}:${seconds}`

    // Explicitly disable downstream caching
  const res = NextResponse.json(
    {
      message: `Hello, it's ${timeString}!`,
      timestamp: now.toISOString(),
    },
    { 
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );

  return res;
}