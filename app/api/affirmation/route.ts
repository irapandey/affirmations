import { NextResponse } from "next/server";

export async function GET() {
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

