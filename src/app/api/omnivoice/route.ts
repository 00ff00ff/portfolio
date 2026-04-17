import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, instruct } = body;

    // Call local FastAPI server
    const response = await fetch("http://127.0.0.1:8000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, instruct }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: errText }, { status: response.status });
    }

    // Get the audio file as an array buffer
    const arrayBuffer = await response.arrayBuffer();

    // Return the response as a blob back to the user
    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": "audio/wav",
      },
    });
  } catch (error: any) {
    console.error("API proxy error:", error);
    return NextResponse.json(
      { error: "Failed to connect to OmniVoice local backend. Is it running?" },
      { status: 500 }
    );
  }
}
