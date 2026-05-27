import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { checkAndIncrementUsage } from "@/lib/usage";
import { buildPrompt } from "@/lib/ai/prompts";

export async function POST(request: Request) {
  try {
    // Check Gemini key exists
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    // Check Supabase config
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return NextResponse.json(
        { error: "Supabase not configured." },
        { status: 500 }
      );
    }

    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, classLevel, subject, curriculum, term, topic } = body;

    if (!type || !classLevel || !subject) {
      return NextResponse.json(
        { error: "Missing required fields: type, classLevel and subject are required." },
        { status: 400 }
      );
    }

    // Check and enforce free tier limits
    const { allowed, remaining } = await checkAndIncrementUsage(
      user.id,
      type
    );

    if (!allowed) {
      return NextResponse.json(
        {
          error: "FREE_LIMIT_REACHED",
          message: "You have reached your free limit for this tool. Upgrade to Pro to continue.",
          remaining: 0,
        },
        { status: 429 }
      );
    }

    // Build prompt
    const prompt = buildPrompt(type, {
      classLevel,
      subject,
      curriculum: curriculum || "nigerian",
      term,
      topic,
    });

    // Call Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
        maxOutputTokens: 3000,
      },
    });

    const systemInstruction = `You are an expert Nigerian curriculum specialist with deep knowledge of:
- NERDC (Nigerian Educational Research and Development Council) guidelines
- The British National Curriculum standards
- Nigerian primary and secondary school standards from Nursery 1 to SS3
- Professional lesson planning using the ABCD Behavioural Objective Method
- Nigerian school context, culture and available resources

You generate professional, accurate, detailed and practical educational documents.
Always respond with valid JSON only. No markdown formatting, no code blocks, no explanations. Just pure valid JSON.`;

    const fullPrompt = `${systemInstruction}\n\n${prompt}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const content = response.text();

    if (!content) {
      return NextResponse.json(
        { error: "No content returned from AI. Please try again." },
        { status: 500 }
      );
    }

    // Parse JSON response
    let parsedResult;
    try {
      // Clean the response in case there is any markdown
      const cleaned = content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      parsedResult = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    // Save to database
    try {
      await supabase.from("documents").insert({
        user_id: user.id,
        type,
        title: `${subject} — ${classLevel}`,
        class_level: classLevel,
        subject,
        curriculum: curriculum || "nigerian",
        term: term || null,
        content: parsedResult,
      });
    } catch (dbError) {
      console.error("Database save error:", dbError);
      // Continue even if save fails
    }

    return NextResponse.json({
      result: parsedResult,
      remaining: remaining - 1,
      success: true,
    });

  } catch (error: any) {
    console.error("Generate API error:", error);

    if (error?.message?.includes("API key")) {
      return NextResponse.json(
        { error: "Invalid Gemini API key. Please check your configuration." },
        { status: 500 }
      );
    }

    if (error?.message?.includes("quota") || error?.message?.includes("rate")) {
      return NextResponse.json(
        { error: "AI rate limit reached. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    if (error?.message?.includes("SAFETY")) {
      return NextResponse.json(
        { error: "Content was blocked by safety filters. Please modify your request and try again." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error. Please try again.",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}