import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function GET() {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        status: "error",
        message: "GROQ_API_KEY is not set in environment variables",
      });
    }

    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: "GPT OSS 120B / Qwen3.6 27B",
      messages: [
        {
          role: "user",
          content: "Say hello in JSON format like this: {\"message\": \"hello\"}",
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 50,
    });

    const content = completion.choices[0].message.content;

    return NextResponse.json({
      status: "success",
      message: "Groq is working correctly",
      response: content,
      keyPrefix: apiKey.substring(0, 8) + "...",
    });

  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }
}