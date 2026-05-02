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
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

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

  const quickActions = [
    {
      href: "/dashboard/curriculum",
      label: "Curriculum Generator",
      desc: "Create topic outlines for any class",
      icon: BookOpen,
      color: "bg-teal-50 text-teal-600 border-teal-100",
    },
    {
      href: "/dashboard/scheme",
      label: "Scheme of Work",
      desc: "First Term automated scheme",
      icon: Calendar,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      href: "/dashboard/lesson",
      label: "Lesson Plan",
      desc: "ABCD method lesson builder",
      icon: FileText,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      href: "/dashboard/assessment",
      label: "Assessment",
      desc: "10 objectives + 3 theory questions",
      icon: ClipboardList,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
  ];

  const lockedFeatures = [
    "WAEC / NECO Generator",
    "Full-Year Scheme of Work",
    "School Branding + Letterhead",
    "DOCX Export",
    "Bloom's Taxonomy Assessment",
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Welcome banner */}
      <div className="bg-gray-900 rounded-2xl p-7 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(13,122,107,0.2),transparent_70%)]" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">
              Welcome back
            </p>
            <h2 className="text-2xl font-bold text-white mb-3">
              {profile?.name || "Educator"}
            </h2>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="bg-teal-500/20 border border-teal-500/30 text-teal-400 text-xs font-bold px-3 py-1 rounded-full">
                ● Free Plan Active
              </span>
              <span className="text-white/30 text-sm">
                {profile?.school_name || "My School"}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dashboard/curriculum"
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              <Sparkles size={14} />
              New Document
            </Link>
            <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-900 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
              <TrendingUp size={14} />
              Upgrade
            </button>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
          Quick Start
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className={`p-5 rounded-xl border-2 bg-white hover:shadow-md transition-all group ${action.color}`}
              >
                <Icon size={22} className="mb-3" />
                <p className="font-bold text-gray-900 text-sm mb-1">
                  {action.label}
                </p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {action.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent documents */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-5">Recent Documents</h3>
          {documents && documents.length > 0 ? (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center">
                      <FileText size={15} className="text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {doc.title}
                      </p>
                      <p className="text-xs text-gray-400 capitalize">
                        {doc.type} ·{" "}
                        {new Date(doc.created_at).toLocaleDateString("en-NG")}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs bg-teal-50 text-teal-600 font-semibold px-2.5 py-1 rounded-full">
                    Ready
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <FileText size={36} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No documents yet</p>
              <p className="text-gray-300 text-xs mt-1">
                Generate your first document to see it here
              </p>
            </div>
          )}
        </div>

        {/* Locked features + tip */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-4">
              Premium Features
            </h3>
            {lockedFeatures.map((f) => (
              <div
                key={f}
                className="flex items-center gap-2.5 py-2 border-b border-gray-50 last:border-0"
              >
                <Lock size={12} className="text-gray-300 flex-shrink-0" />
                <span className="text-xs text-gray-400">{f}</span>
              </div>
            ))}
            <button className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-gray-900 text-xs font-bold py-2.5 rounded-xl transition-colors">
              Unlock All Features
            </button>
          </div>

          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5">
            <p className="text-xs font-bold text-teal-700 mb-2">💡 Pro Tip</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Generate your First Term Scheme of Work first — it becomes
              the master plan for all your lesson plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}