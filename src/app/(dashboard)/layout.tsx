import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const userProfile = profile || {
    id: user.id,
    name: user.email?.split("@")[0] || "Educator",
    email: user.email || "",
    role: "teacher",
    school_name: "My School",
    school_type: "primary_secondary",
    state: "Lagos",
    plan: "free",
    created_at: new Date().toISOString(),
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar user={userProfile} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Topbar user={userProfile} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}