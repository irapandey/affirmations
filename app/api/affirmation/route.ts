import { NextResponse } from "next/server";

const RATE_LIMIT = 100; 
let requestTimestamps: number[] = [];

export async function GET() {
  const now = Date.now();
  
  // Remove requests older than 1 minute
  requestTimestamps = requestTimestamps.filter(
    (ts) => now - ts < 60_000
  );

  if (requestTimestamps.length >= RATE_LIMIT) {
    return NextResponse.json(
      { affirmation: "Too many requests! Please wait a moment 🤍" },
      { status: 429 }
    );
  }

  requestTimestamps.push(now);

  try {
    const response = await fetch("https://www.affirmations.dev", {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { affirmation: "Take a deep breath. Try again 🤍" },
      { status: 500 }
    );
  }
}
