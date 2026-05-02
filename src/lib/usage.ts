import { createServerSupabaseClient } from "./supabase/server";

const FREE_LIMITS: Record<string, { max: number; period: "weekly" | "monthly" }> = {
  curriculum:  { max: 3,  period: "weekly" },
  scheme:      { max: 5,  period: "monthly" },
  lesson:      { max: 8,  period: "monthly" },
  assessment:  { max: 6,  period: "monthly" },
  resources:   { max: 10, period: "monthly" },
};

function getPeriodKey(period: "weekly" | "monthly"): string {
  const now = new Date();
  if (period === "weekly") {
    const week = Math.ceil(now.getDate() / 7);
    return `${now.getFullYear()}-${now.getMonth() + 1}-W${week}`;
  }
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export async function checkAndIncrementUsage(userId: string, tool: string) {
  const supabase = await createServerSupabaseClient();
  const limit = FREE_LIMITS[tool];
  if (!limit) return { allowed: true, remaining: 999 };

  const periodKey = getPeriodKey(limit.period);

  const { data } = await supabase
    .from("usage_tracking")
    .select("count")
    .eq("user_id", userId)
    .eq("tool", tool)
    .eq("period_key", periodKey)
    .single();

  const currentCount = data?.count || 0;
  if (currentCount >= limit.max) return { allowed: false, remaining: 0 };

  await supabase.from("usage_tracking").upsert(
    {
      user_id: userId,
      tool,
      period_key: periodKey,
      count: currentCount + 1,
    },
    { onConflict: "user_id,tool,period_key" }
  );

  return { allowed: true, remaining: limit.max - currentCount - 1 };
}