// Minimal Node.js backend via Next.js App Router API route
import { NextResponse } from "next/server";

export async function GET() {
  
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const seconds = String(now.getSeconds()).padStart(2, "0")
  const timeString = `${hours}:${minutes}:${seconds}`
  return NextResponse.json({
    message: `Hello, it's ${timeString}!`,
    timestamp: now.toISOString(),
  });
}