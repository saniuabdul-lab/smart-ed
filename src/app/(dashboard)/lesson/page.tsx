"use client";

import { useState } from "react";
import { FileText, Sparkles, Loader2, Lock, Download } from "lucide-react";

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

export default function LessonPage() {
  const [form, setForm] = useState({
    classLevel: "JSS 2",
    subject: "Mathematics",
    curriculum: "nigerian",
    topic: "",
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
        body: JSON.stringify({ ...form, type: "lesson" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error === "FREE_LIMIT_REACHED"
          ? "Free limit reached. Upgrade to continue."
          : data.error || "Something went wrong.");
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
        <div className="w-12 h-12 bg-purple-50 border border-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <FileText size={22} className="text-purple-600" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold text-gray-900">Lesson Plan Builder</h1>
            <span className="bg-teal-50 text-teal-600 border border-teal-100 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              Free · 8/month
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            Create structured lesson plans using the ABCD Objective Method.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Class Level *</label>
              <select value={form.classLevel} onChange={(e) => set("classLevel", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors">
                {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Subject *</label>
              <select value={form.subject} onChange={(e) => set("subject", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors">
                {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Curriculum *</label>
              <select value={form.curriculum} onChange={(e) => set("curriculum", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors">
                <option value="nigerian">Nigerian Curriculum (NERDC)</option>
                <option value="british">British Curriculum</option>
                <option value="combined">Combined Nigerian + British</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Topic (Optional)</label>
              <input type="text" value={form.topic} onChange={(e) => set("topic", e.target.value)}
                placeholder="e.g. Quadratic Equations"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors" />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">{error}</div>
          )}

          <button onClick={handleGenerate} disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {loading ? "Generating..." : "Generate with AI"}
          </button>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lock size={13} className="text-amber-500" />
              <span className="text-xs font-bold text-amber-600">Pro Features</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              SMART Objectives, 5E Model, unlimited generations and DOCX export.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          {loading ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center gap-4">
              <Loader2 size={36} className="animate-spin text-teal-500" />
              <p className="font-semibold text-gray-900">Building your lesson plan...</p>
            </div>
          ) : result ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">{result.subject}: {result.topic}</h3>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors">
                  <Download size={13} /> PDF (Watermarked)
                </button>
              </div>

              {/* Info strip */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-teal-50 rounded-xl p-3">
                {[["Class", result.classLevel],["Subject", result.subject],["Duration", result.duration],["Method", result.method]].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-xs text-teal-600 font-bold uppercase tracking-wide">{k}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">{v}</p>
                  </div>
                ))}
              </div>

              {/* ABCD Objectives */}
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-100">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">ABCD Learning Objective</span>
                </div>
                <div className="p-4 space-y-3">
                  {result.objectives && Object.entries(result.objectives).map(([key, val]: [string, any]) => (
                    <div key={key} className="flex gap-3">
                      <div className="w-6 h-6 bg-teal-600 rounded-md flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold text-white">
                        {key.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-teal-600 uppercase">{key}: </span>
                        <span className="text-sm text-gray-600">{val}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teacher activities */}
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-100">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Teacher Activities</span>
                </div>
                <div className="p-4 space-y-3">
                  {result.teacherActivities?.map((a: any, i: number) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-5 h-5 bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-xs font-semibold text-teal-600">{i + 1}</div>
                      <div>
                        <span className="text-xs font-bold text-gray-700">{a.step}: </span>
                        <span className="text-xs text-gray-500">{a.activity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evaluation */}
              {result.evaluation && (
                <div className="border border-gray-100 rounded-xl p-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Evaluation</p>
                  {result.evaluation.questions?.map((q: string, i: number) => (
                    <p key={i} className="text-xs text-gray-600 mb-2 flex gap-2">
                      <span className="font-bold text-teal-600">{i + 1}.</span>{q}
                    </p>
                  ))}
                </div>
              )}

              <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-2">
                <Lock size={13} className="text-amber-500 flex-shrink-0" />
                <p className="text-xs text-amber-700 font-medium">
                  Pro unlocks SMART Objectives, 5E Model and complete scheme integration.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                <FileText size={26} className="text-gray-300" />
              </div>
              <h3 className="font-semibold text-gray-700 mb-2">Ready to Generate</h3>
              <p className="text-gray-400 text-sm max-w-xs">Configure your options and click Generate to build your lesson plan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}