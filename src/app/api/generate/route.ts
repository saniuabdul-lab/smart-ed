import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { checkAndIncrementUsage } from "@/lib/usage";
import { buildPrompt } from "@/lib/ai/prompts";

export async function POST(request: Request) {
  try {
    // Check OpenAI key exists
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Check Supabase config
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: "Supabase not configured" },
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
        { error: "Missing required fields: type, classLevel, subject" },
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
          message: "You have reached your free limit for this tool. Upgrade to continue.",
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

    // Call OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert Nigerian curriculum specialist with deep knowledge of NERDC guidelines, the British National Curriculum, and Nigerian school standards. You generate professional, accurate, and detailed educational documents. Always respond with valid JSON only. No markdown formatting, no code blocks, just pure JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 3000,
    });

    const content = completion.choices[0].message.content;

    if (!content) {
      return NextResponse.json(
        { error: "No content returned from AI. Please try again." },
        { status: 500 }
      );
    }

    let result;
    try {
      result = JSON.parse(content);
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
        content: result,
      });
    } catch (dbError) {
      console.error("Database save error:", dbError);
      // Continue even if save fails — return the result to the user
    }

    return NextResponse.json({
      result,
      remaining: remaining - 1,
      success: true,
    });

  } catch (error: any) {
    console.error("Generate API error:", error);

    // Handle specific OpenAI errors
    if (error?.status === 401) {
      return NextResponse.json(
        { error: "Invalid OpenAI API key. Please check your configuration." },
        { status: 500 }
      );
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { error: "OpenAI rate limit reached. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    if (error?.code === "insufficient_quota") {
      return NextResponse.json(
        { error: "OpenAI quota exceeded. Please check your OpenAI billing." },
        { status: 500 }
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