"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    schoolName: "",
    role: "teacher",
    schoolType: "primary_secondary",
    state: "Lagos",
  });

  const set = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      console.log("Attempting signup with:", form.email);
      console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

      const { data, error: signupError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.name,
            school_name: form.schoolName,
            role: form.role,
            school_type: form.schoolType,
            state: form.state,
          },
        },
      });

      console.log("Signup response:", data, signupError);

      if (signupError) {
        setError(signupError.message);
        setLoading(false);
        return;
      }

      if (data?.user) {
  setSuccess(true);
  setTimeout(() => {
    window.location.href = "/dashboard";
  }, 2000);
} else {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Account Created!
          </h2>
          <p className="text-gray-500">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-[45%] bg-gray-900 p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(13,122,107,0.15),transparent_70%)]" />
        <Logo size="md" />
        <div className="flex-1 flex flex-col justify-center relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Start Your
            <br />
            <span className="text-amber-400">Free Account</span>
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-8">
            Full access to all free tools. No credit card needed.
          </p>
          <div className="flex items-center gap-3 mb-4">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    s <= step
                      ? "bg-teal-500 text-white"
                      : "bg-white/10 text-white/30"
                  }`}
                >
                  {s < step ? "✓" : s}
                </div>
                <span
                  className={`text-sm ${
                    s <= step ? "text-white/80" : "text-white/30"
                  }`}
                >
                  {s === 1 ? "Account Details" : "School Profile"}
                </span>
                {s < 2 && (
                  <div className="w-8 h-px bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/20 text-xs relative z-10">
          2025 SMART-ED Technologies Ltd.
        </p>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {step === 1 ? "Create your account" : "Set up your school"}
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            {step === 1
              ? "Join thousands of Nigerian educators on SMART-ED"
              : "Tell us about your institution"}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 mb-6">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!form.name || !form.email || !form.password) {
                  setError("Please fill in all fields.");
                  return;
                }
                if (form.password.length < 6) {
                  setError("Password must be at least 6 characters.");
                  return;
                }
                setError("");
                setStep(2);
              }}
              className="space-y-5"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Mrs. Adaeze Okonkwo"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="teacher@yourschool.edu.ng"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => set("password", e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
              >
                Continue to School Setup
              </button>
              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-teal-600 font-semibold hover:underline"
                >
                  Log in
                </Link>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                  School Name *
                </label>
                <input
                  type="text"
                  value={form.schoolName}
                  onChange={(e) => set("schoolName", e.target.value)}
                  placeholder="Greenfield Academy"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                  Your Role *
                </label>
                <select
                  value={form.role}
                  onChange={(e) => set("role", e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors"
                >
                  <option value="teacher">Classroom Teacher</option>
                  <option value="admin">School Admin / Head Teacher</option>
                  <option value="coordinator">Academic Coordinator</option>
                  <option value="proprietor">School Proprietor</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                  School Type *
                </label>
                <select
                  value={form.schoolType}
                  onChange={(e) => set("schoolType", e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors"
                >
                  <option value="nursery_primary">Nursery and Primary</option>
                  <option value="primary_secondary">
                    Primary and Secondary
                  </option>
                  <option value="secondary_only">Secondary Only</option>
                  <option value="all_levels">
                    All Levels (Nursery to SS3)
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                  State *
                </label>
                <select
                  value={form.state}
                  onChange={(e) => set("state", e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors"
                >
                  {[
                    "Lagos","Abuja (FCT)","Rivers","Kano","Oyo",
                    "Anambra","Delta","Ogun","Enugu","Kaduna",
                    "Imo","Borno","Akwa Ibom","Edo","Plateau","Others",
                  ].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl text-sm transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : null}
                  {loading ? "Creating account..." : "Launch My Account"}
                </button>
              </div>
              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-teal-600 font-semibold hover:underline"
                >
                  Log in
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}