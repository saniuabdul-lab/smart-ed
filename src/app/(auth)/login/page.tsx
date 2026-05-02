"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-[45%] bg-gray-900 p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(13,122,107,0.15),transparent_70%)]" />
        <Logo size="md" />
        <div className="flex-1 flex flex-col justify-center relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight mb-6">
            AI-Powered Academic Excellence<br />
            <span className="text-teal-400 italic">for Nigerian Schools</span>
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-8">
            Generate curricula, lesson plans, schemes of work and assessments
            aligned to NERDC and British Curriculum — in minutes.
          </p>
          {[
            "Nursery 1 to SS3 support",
            "Nigerian + British Curriculum",
            "NERDC-aligned outputs",
            "Instant PDF export",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 mb-3">
              <div className="w-5 h-5 rounded-full bg-teal-600/30 border border-teal-500/40 flex items-center justify-center flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4DD9C0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-white/60 text-sm">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-white/20 text-xs relative z-10">
          © 2025 SMART-ED Technologies Ltd.
        </p>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Log in to your SMART-ED dashboard
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-