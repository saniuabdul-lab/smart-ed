import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        status: "error",
        message: "GEMINI_API_KEY is not set in environment variables",
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(
      "Say hello in one word. Respond with JSON like this: {\"message\": \"hello\"}"
    );

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      status: "success",
      message: "Gemini is working correctly",
      response: text,
      keyPrefix: apiKey.substring(0, 8) + "...",
    });

  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.message,
      code: error.code || "unknown",
    });
  }
}