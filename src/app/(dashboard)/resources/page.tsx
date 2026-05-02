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

  const categories = result ? [
    { title: "Visual Teaching Aids",    key: "visualAids",        color: "teal" },
    { title: "Hands-On Activities",     key: "handOnActivities",  color: "blue" },
    { title: "Local Nigerian Context",  key: "localContext",      color: "amber" },
    { title: "Digital Resources",       key: "digitalResources",  color: "purple" },
    { title: "Low-Cost Materials",      key: "lowCostMaterials",  color: "green" },
  ] : [];

  const colorMap: Record<string, string> = {
    teal:   "bg-teal-50 border-teal-100 text-teal-700",
    blue:   "bg-blue-50 border-blue-100 text-blue-700",
    amber:  "bg-amber-50 border-amber-100 text-amber-700",
    purple: "bg-purple-50 border-purple-100 text-purple-700",
    green:  "bg-green-50 border-green-100 text-green-700",
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
            Discover locally-relevant, low-cost teaching aids and materials
            for your class and subject.
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
                {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Subject *
              </label>
              <select
                value={form.subje