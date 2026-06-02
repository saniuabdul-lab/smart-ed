"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Home,
  BookOpen,
  Calendar,
  FileText,
  Lightbulb,
  ClipboardList,
  FolderOpen,
  Lock,
  LogOut,
  TrendingUp,
  Crown,
  Bell,
} from "lucide-react";

const freeNav = [
  { href: "/dashboard/overview",   label: "Overview",             icon: Home },
  { href: "/dashboard/curriculum", label: "Curriculum Generator", icon: BookOpen },
  { href: "/dashboard/scheme",     label: "Scheme of Work",       icon: Calendar },
  { href: "/dashboard/lesson",     label: "Lesson Plans",         icon: FileText },
  { href: "/dashboard/resources",  label: "Resources",            icon: Lightbulb },
  { href: "/dashboard/assessment", label: "Assessment",           icon: ClipboardList },
  { href: "/dashboard/documents",  label: "My Documents",         icon: FolderOpen },
];

const lockedNav = [
  "WAEC / NECO Generator",
  "Visual Media Recommender",
  "Approval Workflow",
  "Teacher Management",
  "School Analytics",
];

const pageTitles: Record<string, string> = {
  "/dashboard/overview":    "Overview",
  "/dashboard/curriculum":  "Curriculum Generator",
  "/dashboard/scheme":      "Scheme of Work",
  "/dashboard/lesson":      "Lesson Plans",
  "/dashboard/resources":   "Instructional Resources",
  "/dashboard/assessment":  "Assessment Generator",
  "/dashboard/documents":   "My Documents",
  "/dashboard/upgrade":     "Upgrade Plan",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setUser(profile || {
        name: user.email?.split("@")[0] || "Educator",
        email: user.email,
        role: "teacher",
        school_name: "My School",
      });

      if (profile?.email) {
        localStorage.setItem("userEmail", profile.email);
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const title = pageTitles[pathname] || "Dashboard";

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="w-60 bg-gray-900 h-screen flex flex-col flex-shrink-0 overflow-hidden">
        {/* Logo */}
        <div className="p-5 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-gray-800 rounded-lg p-1.5">
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
            <span className="font-bold text-white text-lg tracking-tight">
              SMART-ED
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <p className="text-xs font-bold text-white/20 uppercase tracking-widest px-3 py-2">
            Free Tools
          </p>
          {freeNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-all ${
                  isActive
                    ? "bg-teal-600/20 text-teal-400 font-semibold"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}

          <p className="text-xs font-bold text-white/10 uppercase tracking-widest px-3 py-2 mt-4 border-t border-white/5 pt-4">
            Premium Only
          </p>
          {lockedNav.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm text-white/20 cursor-not-allowed"
            >
              <Lock size={14} />
              {item}
            </div>
          ))}
        </nav>

        {/* Upgrade CTA */}
        <div className="p-4 border-t border-white/10 flex-shrink-0">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={14} className="text-amber-400" />
              <span className="text-xs font-bold text-amber-400">
                Upgrade to Pro
              </span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed mb-3">
              Unlimited generations, DOCX export, school branding and more.
            </p>
            <Link
              href="/dashboard/upgrade"
              className="block w-full bg-amber-500 hover:bg-amber-600 text-gray-900 text-xs font-bold py-2 rounded-lg transition-colors text-center"
            >
              View Plans
            </Link>
          </div>

          {/* User info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-white/80 truncate">
                {user?.name || "Educator"}
              </p>
              <p className="text-xs text-white/30 capitalize">
                {user?.role || "teacher"} — Free Plan
              </p>
            </div>
            <button
              onClick={handleLogout}
              title="Log out"
              className="text-white/20 hover:text-white/60 transition-colors flex-shrink-0"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <div>
            <h1 className="text-base font-bold text-gray-900">{title}</h1>
            <p className="text-xs text-gray-400">
              {user?.school_name || "My School"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
              <Crown size={13} className="text-amber-500" />
              <span className="text-xs font-bold text-amber-600">
                FREE PLAN
              </span>
              <span className="text-xs text-gray-400 mx-1">·</span>
              <Link
                href="/dashboard/upgrade"
                className="text-xs text-teal-600 font-semibold hover:underline"
              >
                Upgrade →
              </Link>
            </div>
            <button className="relative w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Bell size={16} className="text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}