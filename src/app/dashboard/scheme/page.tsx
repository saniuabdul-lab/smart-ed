"use client";

import { useState } from "react";
import { Calendar, Sparkles, Loader2, Lock, Download } from "lucide-react";

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

export default function SchemePage() {
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
    if (form.term !== "first") {
      setError(
        "Second and Third Term schemes require the Pro plan. Switching to First Term."
      );
      setForm((f) => ({ ...f, term: "first" }));
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "scheme" }),
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
        <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Calendar size={22} className="text-blue-600" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold text-gray-900">
              Scheme of Work Generator
            </h1>
            <span className="bg-teal-50 text-teal-600 border border-teal-100 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              Free · First Term Only
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            Generate a complete 13-week First Term scheme of work with
            weekly topics, objectives and evaluation methods.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Class Level
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
                Subject
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
                Curriculum
              </label>
              <select
                value={form.curriculum}
                onChange={(e) => set("curriculum", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors"
              >
                <option value="nigerian">Nigerian Curriculum (NERDC)</option>
                <option value="british">British Curriculum</option>
                <option value="combined">Combined Nigerian + British</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Term
              </label>
              <select
                value={form.term}
                onChange={(e) => set("term", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors"
              >
                <option value="first">First Term</option>
                <option value="second">Second Term (Pro)</option>
                <option value="third">Third Term (Pro)</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
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
                Pro Features
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Second and Third Term schemes, full customization, school
              branding and DOCX export.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          {loading ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center gap-4">
              <Loader2 size={36} className="animate-spin text-teal-500" />
              <p className="font-semibold text-gray-900">
                Generating scheme of work...
              </p>
            </div>
          ) : result ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900">
                  {result.subject} — {result.classLevel} — First Term
                </h3>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors">
                  <Download size={13} /> PDF (Watermarked)
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-teal-50">
                      {["Wk","Topic","Sub-Topics","Teacher Objective","Evaluation"].map((h) => (
                        <th
                          key={h}
                          className="px-3 py-2.5 text-left font-bold text-teal-700 uppercase tracking-wide border-b-2 border-teal-100 whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.weeks?.map((w: any, i: number) => (
                      <tr
                        key={w.week}
                        className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-3 py-2.5 font-mono font-bold text-teal-600 border-b border-gray-100">
                          {w.week}
                        </td>
                        <td className="px-3 py-2.5 font-semibold text-gray-900 border-b border-gray-100 min-w-[120px]">
                          {w.topic}
                        </td>
                        <td className="px-3 py-2.5 text-gray-500 border-b border-gray-100 min-w-[140px]">
                          {Array.isArray(w.subtopics)
                            ? w.subtopics.join("; ")
                            : w.subtopics}
                        </td>
                        <td className="px-3 py-2.5 text-gray-500 border-b border-gray-100 min-w-[160px]">
                          {w.teacherObjective}
                        </td>
                        <td className="px-3 py-2.5 text-gray-500 border-b border-gray-100 min-w-[140px]">
                          {w.evaluation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-2">
                <Lock size={13} className="text-amber-500 flex-shrink-0" />
                <p className="text-xs text-amber-700 font-medium">
                  Pro: Second and Third Term, full customization, school
                  branding, DOCX export.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                <Calendar size={26} className="text-gray-300" />
              </div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Ready to Generate
              </h3>
              <p className="text-gray-400 text-sm max-w-xs">
                Configure your options and click Generate to create your
                scheme of work.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}