import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  FileText,
  Lightbulb,
  ClipboardList,
  Lock,
  Sparkles,
  TrendingUp,
  LogOut,
} from "lucide-react";

export default async function OverviewPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const displayName =
    profile?.name || user.email?.split("@")[0] || "Educator";
  const schoolName = profile?.school_name || "My School";

  const quickActions = [
    {
      href: "/dashboard/curriculum",
      label: "Curriculum Generator",
      desc: "Nigerian, British or Blended curriculum outlines",
      icon: BookOpen,
      color: "bg-teal-50 text-teal-600 border-teal-200",
    },
    {
      href: "/dashboard/scheme",
      label: "Scheme of Work",
      desc: "Professional term-by-term schemes",
      icon: Calendar,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      href: "/dashboard/lesson",
      label: "Lesson Plans",
      desc: "ABCD Behavioural Objective method",
      icon: FileText,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      href: "/dashboard/resources",
      label: "Instructional Resources",
      desc: "Audio, visual and AV media suggestions",
      icon: Lightbulb,
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      href: "/dashboard/assessment",
      label: "Assessment Generator",
      desc: "Exam questions, CA tests and answer keys",
      icon: ClipboardList,
      color: "bg-amber-50 text-amber-600 border-amber-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gray-900 rounded-lg p-1.5">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 13L7.5 7L10.5 10.5L13.5 5.5L17 13"
                stroke="#14A88F"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10.5" cy="5.5" r="1.5" fill="#D4A017" />
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-lg">SMART-ED</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
            FREE PLAN
          </span>
          <span className="text-sm text-gray-500">{user.email}</span>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <LogOut size={15} />
              Log out
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome */}
        <div className="bg-gray-900 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(13,122,107,0.2),transparent_70%)]" />
          <div className="relative flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">
                Welcome back
              </p>
              <h2 className="text-3xl font-bold text-white mb-3">
                {displayName}
              </h2>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-teal-500/20 border border-teal-500/30 text-teal-400 text-xs font-bold px-3 py-1 rounded-full">
                  Free Plan Active
                </span>
                <span className="text-white/40 text-sm">{schoolName}</span>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/dashboard/curriculum"
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
              >
                <Sparkles size={15} />
                Generate Document
              </Link>
              <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-900 text-sm font-semibold px-5 py-3 rounded-xl transition-colors">
                <TrendingUp size={15} />
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>

        {/* Generator cards */}
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
            Generate Documents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`p-6 rounded-2xl border-2 bg-white hover:shadow-lg transition-all group ${action.color}`}
                >
                  <Icon size={28} className="mb-4" />
                  <p className="font-bold text-gray-900 text-base mb-2">
                    {action.label}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {action.desc}
                  </p>
                  <p className="text-xs font-semibold mt-3 group-hover:underline">
                    Generate now →
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent documents */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-5 text-lg">
              Recent Documents
            </h3>
            {documents && documents.length > 0 ? (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                        <FileText size={18} className="text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {doc.title}
                        </p>
                        <p className="text-xs text-gray-400 capitalize mt-0.5">
                          {doc.type} —{" "}
                          {new Date(doc.created_at).toLocaleDateString(
                            "en-NG",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs bg-teal-50 text-teal-600 font-semibold px-3 py-1 rounded-full border border-teal-100">
                      Ready
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText
                  size={40}
                  className="text-gray-200 mx-auto mb-4"
                />
                <p className="text-gray-500 font-medium mb-1">
                  No documents yet
                </p>
                <p className="text-gray-300 text-sm mb-5">
                  Generate your first document to see it here
                </p>
                <Link
                  href="/dashboard/curriculum"
                  className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  <Sparkles size={14} />
                  Generate First Document
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-4">
                Your Account
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Email</span>
                  <span className="text-gray-700 font-medium truncate ml-2 max-w-[160px]">
                    {user.email}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Plan</span>
                  <span className="text-teal-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">School</span>
                  <span className="text-gray-700 font-medium">
                    {schoolName}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-4">
                Premium Features
              </h3>
              {[
                "WAEC / NECO Generator",
                "Full-Year Scheme of Work",
                "School Branding",
                "DOCX Export",
                "Bloom's Taxonomy",
              ].map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2.5 py-2.5 border-b border-gray-50 last:border-0"
                >
                  <Lock size={12} className="text-gray-300 flex-shrink-0" />
                  <span className="text-xs text-gray-400">{f}</span>
                </div>
              ))}
              <button className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-gray-900 text-xs font-bold py-3 rounded-xl transition-colors">
                Unlock All Features
              </button>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5">
              <p className="text-xs font-bold text-teal-700 mb-2">
                Pro Tip
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Generate your Scheme of Work first — it becomes the master
                plan for all your lesson plans and assessments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}