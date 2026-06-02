"use client";

import { useState } from "react";
import { BookOpen, Sparkles, Loader2, Lock, Download } from "lucide-react";

const CLASSES = [
  "Nursery 1","Nursery 2","Kindergarten",
  "Primary 1","Primary 2","Primary 3","Primary 4","Primary 5","Primary 6",
  "JSS 1","JSS 2","JSS 3","SS 1","SS 2","SS 3",
];

const SUBJECTS = [
  "Mathematics","English Language","Basic Science","Social Studies",
  "Civic Education","Agricultural Science","Computer Studies","French",
  "Christian Religious Studies","Islamic Studies","History","Economics",
  "Biology","Chemistry","Physics","Geography","Literature in English",
  "Government","Accounting","Commerce",
];

const CURRICULA = [
  { value: "nigerian", label: "Nigerian Curriculum (NERDC)" },
  { value: "british",  label: "British Curriculum" },
  { value: "combined", label: "Combined Nigerian + British" },
];

const TERMS = [
  { value: "first",  label: "First Term" },
  { value: "second", label: "Second Term" },
  { value: "third",  label: "Third Term" },
];

export default function CurriculumPage() {
  const [form, setForm] = useState({
    classLevel: "JSS 2",
    subject: "Mathematics",
    curriculum: "nigerian",
    term: "first",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const set = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "curriculum" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data.error === "FREE_LIMIT_REACHED"
            ? "Free limit reached. Upgrade to continue."
            : data.error || "Something went wrong."
        );
        return;
      }
      setResult(data.result);
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 bg-teal-50 border border-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <BookOpen size={22} className="text-teal-600" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold text-gray-900">
              Curriculum Generator
            </h1>
            <span className="bg-teal-50 text-teal-600 border border-teal-100 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              Free · 3/week
            </span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Generate a complete NERDC-aligned curriculum outline with
            topics, sub-topics, weekly breakdown, objectives and expected
            outcomes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Class Level *
              </label>
              <select
                value={form.classLevel}
                onChange={(e) => set("classLevel", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors"
              >
                {CLASSES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Subject *
              </label>
              <select
                value={form.subject}
                onChange={(e) => set("subject", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors"
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Curriculum Type *
              </label>
              <select
                value={form.curriculum}
                onChange={(e) => set("curriculum", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors"
              >
                {CURRICULA.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Term *
              </label>
              <select
                value={form.term}
                onChange={(e) => set("term", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors"
              >
                {TERMS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Sparkles size={16} />
            )}
            {loading ? "Generating..." : "Generate with AI"}
          </button>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lock size={13} className="text-amber-500" />
              <span className="text-xs font-bold text-amber-600">
                Premium Features
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Upgrade for unlimited generations, DOCX export, school
              branding and Bloom's taxonomy integration.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          {loading ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center gap-4">
              <Loader2 size={36} className="animate-spin text-teal-500" />
              <div className="text-center">
                <p className="font-semibold text-gray-900 mb-1">
                  Generating with AI...
                </p>
                <p className="text-gray-400 text-sm">
                  Aligning with NERDC curriculum standards
                </p>
              </div>
            </div>
          ) : result ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900">
                  {result.subject} — {result.classLevel}
                </h3>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors">
                    <Download size={13} />
                    PDF (Watermarked)
                  </button>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-3 py-2 rounded-lg cursor-pointer">
                    <Lock size={11} />
                    Remove watermark in Pro
                  </div>
                </div>
              </div>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                {result.weeks?.map((week: any) => (
                  <div
                    key={week.week}
                    className="border border-gray-100 rounded-xl overflow-hidden"
                  >
                    <div className="bg-teal-50 px-4 py-2.5 flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-teal-600">
                        WEEK {week.week}
                      </span>
                      <span className="font-semibold text-gray-900 text-sm">
                        {week.topic}
                      </span>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                          Sub-Topics
                        </p>
                        {week.subtopics?.map((s: string, i: number) => (
                          <p
                            key={i}
                            className="text-xs text-gray-600 mb-1 flex gap-1.5"
                          >
                            <span className="text-teal-500 font-bold">
                              •
                            </span>
                            {s}
                          </p>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                          Objectives
                        </p>
                        {week.objectives?.map((o: string, i: number) => (
                          <p
                            key={i}
                            className="text-xs text-gray-600 mb-1 flex gap-1.5"
                          >
                            <span className="text-teal-500 font-bold">
                              →
                            </span>
                            {o}
                          </p>
                        ))}
                      </div>
                    </div>
                    {week.outcome && (
                      <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100">
                        <span className="text-xs text-gray-500">
                          <strong className="text-gray-700">
                            Outcome:
                          </strong>{" "}
                          {week.outcome}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-2">
                <Lock size={13} className="text-amber-500 flex-shrink-0" />
                <p className="text-xs text-amber-700 font-medium">
                  Pro includes clean DOCX export, school letterhead, full
                  customization and Bloom's taxonomy alignment.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                <BookOpen size={26} className="text-gray-300" />
              </div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Ready to Generate
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Configure your options and click Generate with AI to
                create your curriculum outline.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}