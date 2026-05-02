import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { FileText, Download, Eye } from "lucide-react";

export default async function DocumentsPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const typeColors: Record<string, string> = {
    curriculum: "bg-teal-50 text-teal-600",
    scheme:     "bg-blue-50 text-blue-600",
    lesson:     "bg-purple-50 text-purple-600",
    assessment: "bg-amber-50 text-amber-600",
    resource:   "bg-green-50 text-green-600",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Documents</h1>
          <p className="text-gray-500 text-sm mt-1">
            {documents?.length || 0} documents generated
          </p>
        </div>
        <span className="bg-teal-50 text-teal-600 border border-teal-100 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
          Free Plan
        </span>
      </div>

      {documents && documents.length > 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-gray-100 bg-gray-50">
            {["Document", "Type", "Status", "Actions"].map((h) => (
              <span key={h} className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                {h}
              </span>
            ))}
          </div>

          {documents.map((doc, i) => (
            <div
              key={doc.id}
              className={`grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-4 items-center ${
                i < documents.length - 1 ? "border-b border-gray-50" : ""
              } hover:bg-gray-50 transition-colors`}
            >
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {doc.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(doc.created_at).toLocaleDateString("en-NG", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${typeColors[doc.type] || "bg-gray-50 text-gray-600"}`}>
                {doc.type}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-600">
                ● Ready
              </span>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors">
                  <Eye size={11} /> View
                </button>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors">
                  <Download size={11} /> PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-5">
            <FileText size={30} className="text-gray-200" />
          </div>
          <h3 className="font-bold text-gray-700 text-lg mb-2">
            No documents yet
          </h3>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
            Generate your first curriculum, lesson plan or assessment
            and it will appear here.
          </p>
        </div>
      )}
    </div>
  );
}