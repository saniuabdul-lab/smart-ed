import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { checkAndIncrementUsage } from "@/lib/usage";
import { buildPrompt } from "@/lib/ai/prompts";

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured." },
        { status: 500 }
      );
    }

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

    const { allowed, remaining } = await checkAndIncrementUsage(
      user.id,
      type
    );

    if (!allowed) {
      return NextResponse.json(
        {
          error: "FREE_LIMIT_REACHED",
          message: "You have reached your free limit. Upgrade to Pro to continue.",
          remaining: 0,
        },
        { status: 429 }
      );
    }

    const prompt = buildPrompt(type, {
      classLevel,
      subject,
      curriculum: curriculum || "nigerian",
      term,
      topic,
    });

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an expert Nigerian curriculum specialist with deep knowledge of:
- NERDC (Nigerian Educational Research and Development Council) guidelines
- The British National Curriculum standards  
- Nigerian primary and secondary school standards from Nursery 1 to SS3
- Professional lesson planning using the ABCD Behavioural Objective Method
- Nigerian school context, culture and available resources

You generate professional, accurate, detailed and practical educational documents.
Always respond with valid JSON only. No markdown formatting, no code blocks, no explanations. Just pure valid JSON.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 3000,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;

    if (!content) {
      return NextResponse.json(
        { error: "No content returned from AI. Please try again." },
        { status: 500 }
      );
    }

    let parsedResult;
    try {
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
    }

    return NextResponse.json({
      result: parsedResult,
      remaining: remaining - 1,
      success: true,
    });

  } catch (error: any) {
    console.error("Generate API error:", error);

    if (error?.message?.includes("rate_limit") || error?.message?.includes("429")) {
      return NextResponse.json(
        { error: "Rate limit reached. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    if (error?.message?.includes("API key") || error?.message?.includes("auth")) {
      return NextResponse.json(
        { error: "Invalid API key. Please check your configuration." },
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