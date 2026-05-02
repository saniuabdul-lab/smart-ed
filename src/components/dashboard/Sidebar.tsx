"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/shared/Logo";
import { Profile } from "@/types";
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
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const freeNav = [
  { href: "/dashboard",            label: "Overview",             icon: Home },
  { href: "/dashboard/curriculum", label: "Curriculum Generator", icon: BookOpen },
  { href: "/dashboard/scheme",     label: "Scheme of Work",       icon: Calendar },
  { href: "/dashboard/lesson",     label: "Lesson Plans",         icon: FileText },
  { href: "/dashboard/resources",  label: "Resources",            icon: Lightbulb },
  { href: "/dashboard/assessment", label: "Assessment",           icon: ClipboardList },
  { href: "/dashboard/documents",  label: "My Documents",         icon: FolderOpen },
];

const lockedNav = [
  { label: "WAEC / NECO Generator" },
  { label: "Visual Media Recommender" },
  { label: "Approval Workflow" },
  { label: "Teacher Management" },
  { label: "School Analytics" },
];

interface SidebarProps {
  user: Profile | null;
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="w-60 bg-gray-900 h-screen flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <Logo />
      </div>

      {/* Free nav */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <p className="text-xs font-bold text-white/20 uppercase tracking-widest px-3 py-2">
          Tools
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

        {/* Locked nav */}
        <p className="text-xs font-bold text-white/10 uppercase tracking-widest px-3 py-2 mt-4 border-t border-white/5 pt-4">
          Premium Only
        </p>
        {lockedNav.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm text-white/20 cursor-not-allowed"
          >
            <Lock size={14} />
            {item.label}
          </div>
        ))}
      </nav>

      {/* Upgrade CTA */}
      <div className="p-4 border-t border-white/10">
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
          <button className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 text-xs font-bold py-2 rounded-lg transition-colors">
            View Plans
          </button>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold text-white/80 truncate">
              {user?.name || "Educator"}
            </p>
            <p className="text-xs text-white/30 capitalize">
              {user?.role || "teacher"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-white/20 hover:text-white/60 transition-colors"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}