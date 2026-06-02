"use client";

import { useState } from "react";
import { Lightbulb, Sparkles, Loader2, Lock, Download } from "lucide-react";

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

export default function ResourcesPage() {
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
        body: JSON.stringify({ ...form, type: "resource" }),
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

  const categories = result
    ? [
        { title: "Visual Teaching Aids",   key: "visualAids",          color: "teal"   },
        { title: "Audio Resources",        key: "audioResources",      color: "blue"   },
        { title: "Audio Visual Resources", key: "audioVisualResources",color: "purple" },
        { title: "Hands-On Activities",    key: "handOnActivities",    color: "green"  },
        { title: "Local Nigerian Context", key: "localNigerianContext", color: "amber"  },
        { title: "Digital Resources",      key: "digitalResources",    color: "indigo" },
        { title: "Low-Cost Materials",     key: "lowCostMaterials",    color: "pink"   },
        { title: "Teaching Tips",          key: "teachingTips",        color: "teal"   },
      ]
    : [];

  const colorMap: Record<string, string> = {
    teal:   "bg-teal-50 border-teal-100 text-teal-700",
    blue:   "bg-blue-50 border-blue-100 text-blue-700",
    purple: "bg-purple-50 border-purple-100 text-purple-700",
    green:  "bg-green-50 border-green-100 text-green-700",
    amber:  "bg-amber-50 border-amber-100 text-amber-700",
    indigo: "bg-indigo-50 border-indigo-100 text-indigo-700",
    pink:   "bg-pink-50 border-pink-100 text-pink-700",
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Lightbulb size={22} className="text-green-600" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold text-gray-900">
              Instructional Resource Suggestions
            </h1>
            <span className="bg-teal-50 text-teal-600 border border-teal-100 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              Free · 10/month
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            Discover audio, visual, audio-visual and other locally-relevant
            teaching aids and materials for your class and subject.
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
                Topic (Optional)
              </label>
              <input
                type="text"
                value={form.topic}
                onChange={(e) => set("topic", e.target.value)}
                placeholder="e.g. Photosynthesis"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors"
              />
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
                Pro Features
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Advanced digital resource recommendations, video links and
              downloadable classroom kits.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          {loading ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center gap-4">
              <Loader2 size={36} className="animate-spin text-teal-500" />
              <p className="font-semibold text-gray-900">
                Finding the best resources...
              </p>
            </div>
          ) : result ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">
                  Resources — {result.subject} ({result.classLevel})
                </h3>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg">
                  <Download size={13} /> Export
                </button>
              </div>
              {categories.map((cat) => {
                const items = result[cat.key];
                if (!items || items.length === 0) return null;
                return (
                  <div
                    key={cat.key}
                    className="border border-gray-100 rounded-xl overflow-hidden"
                  >
                    <div
                      className={`px-4 py-2.5 border-b ${colorMap[cat.color]}`}
                    >
                      <span className="text-xs font-bold uppercase tracking-wide">
                        {cat.title}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      {items.map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg
                              width="8"
                              height="8"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#0D7A6B"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-600 leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-2">
                <Lock size={13} className="text-amber-500 flex-shrink-0" />
                <p className="text-xs text-amber-700 font-medium">
                  Pro includes advanced digital resources, video
                  recommendations and downloadable classroom kits.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                <Lightbulb size={26} className="text-gray-300" />
              </div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Ready to Generate
              </h3>
              <p className="text-gray-400 text-sm max-w-xs">
                Select your class and subject then click Generate to
                discover teaching resources.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}