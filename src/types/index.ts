export type UserPlan = "free" | "starter" | "pro" | "enterprise";
export type UserRole = "teacher" | "admin" | "coordinator" | "proprietor";
export type DocumentType = "curriculum" | "scheme" | "lesson" | "assessment" | "resource";
export type CurriculumType = "nigerian" | "british" | "combined";
export type Term = "first" | "second" | "third";

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  school_name: string | null;
  school_type: string | null;
  state: string | null;
  plan: UserPlan;
  created_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  type: DocumentType;
  title: string;
  class_level: string;
  subject: string;
  curriculum: CurriculumType;
  term: string | null;
  content: Record<string, unknown>;
  created_at: string;
}

export interface UsageState {
  curriculum:  { used: number; max: number; period: "weekly" };
  scheme:      { used: number; max: number; period: "monthly" };
  lesson:      { used: number; max: number; period: "monthly" };
  assessment:  { used: number; max: number; period: "monthly" };
  resources:   { used: number; max: number; period: "monthly" };
}

export interface GenerateRequest {
  type: DocumentType;
  classLevel: string;
  subject: string;
  curriculum: CurriculumType;
  term?: Term;
  topic?: string;
}