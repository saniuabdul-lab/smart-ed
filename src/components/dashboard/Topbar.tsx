"use client";

import { usePathname } from "next/navigation";
import { Bell, Crown } from "lucide-react";

interface TopbarProps {
  user: {
    name: string;
    school_name?: string | null;
  };
}

const pageTitles: Record<string, string> = {
  "/dashboard":            "Overview",
  "/dashboard/curriculum": "Curriculum Generator",
  "/dashboard/scheme":     "Scheme of Work",
  "/dashboard/lesson":     "Lesson Plans",
  "/dashboard/resources":  "Instructional Resources",
  "/dashboard/assessment": "Assessment Generator",
  "/dashboard/documents":  "My Documents",
};

export default function Topbar({ user }: TopbarProps) {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Dashboard";

  return (
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
          <span className="text-xs font-bold text-amber-600">FREE PLAN</span>
          <span className="text-xs text-gray-400 mx-1">·</span>
          <span className="text-xs text-teal-600 font-semibold cursor-pointer hover:underline">
            Upgrade →
          </span>
        </div>
        <button className="relative w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
          <Bell size={16} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
      </div>
    </div>
  );
}