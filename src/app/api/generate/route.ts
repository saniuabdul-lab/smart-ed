import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { checkAndIncrementUsage } from "@/lib/usage";
import { buildPrompt } from "@/lib/ai/prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, classLevel, subject, curriculum, term, topic } =
      await request.json();

    if (!type || !classLevel || !subject) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
        { error: "FREE_LIMIT_REACHED", remaining: 0 },
        { status: 429 }
      );
    }

    // Build the prompt
    const prompt = buildPrompt(type, {
      classLevel,
      subject,
      curriculum: curriculum || "nigerian",
      term,
      topic,
    });

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert Nigerian curriculum specialist trained on NERDC guidelines and the British National Curriculum. Always respond with valid JSON only. No markdown, no explanation, just the JSON object.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000,
    });

    const result = JSON.parse(
      completion.choices[0].message.content || "{}"
    );

    // Save document to database
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

    return NextResponse.json({ result, remaining: remaining - 1 });
  } catch (error) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}