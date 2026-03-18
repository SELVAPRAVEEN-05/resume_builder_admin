"use client";

import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { resumes as initialResumes, Resume } from "@/lib/data";
import clsx from "clsx";
import { Download, Eye, Search, Trash2 } from "lucide-react";
import { useState } from "react";

export default function ResumesPage() {
  const [search, setSearch] = useState("");
  const [templateFilter, setTemplateFilter] = useState("All");
  const [resumeList, setResumeList] = useState<Resume[]>(initialResumes);

  const templates = [
    "All",
    ...Array.from(new Set(initialResumes.map((r) => r.template))),
  ];

  const filtered = resumeList.filter((r) => {
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.student.toLowerCase().includes(search.toLowerCase());
    const matchTemplate =
      templateFilter === "All" || r.template === templateFilter;
    return matchSearch && matchTemplate;
  });

  const handleDelete = (id: string) => {
    setResumeList((prev) => prev.filter((r) => r.id !== id));
  };

  const templateVariant = (
    color: Resume["templateColor"],
  ): "green" | "blue" | "amber" | "purple" => color;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Resumes</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            All student-created resumes
          </p>
        </div>
        <Button variant="ghost">
          <Download size={13} /> Export All
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 max-w-[260px]">
          <Search size={13} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search resumes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs text-gray-600 placeholder-gray-400 outline-none bg-transparent w-full"
          />
        </div>
        <select
          value={templateFilter}
          onChange={(e) => setTemplateFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-500 outline-none"
        >
          {templates.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <p className="text-xs text-gray-400 ml-auto">
          {filtered.length} results
        </p>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {[
                "Resume Name",
                "Student",
                "Template",
                "Created",
                "Downloads",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((resume, i) => (
              <tr
                key={resume.id}
                className={clsx(
                  "border-b border-gray-100 hover:bg-gray-50 transition-colors",
                  i === filtered.length - 1 && "border-b-0",
                )}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={resume.template[0]} size="sm" rounded />
                    <span className="text-xs font-medium text-gray-800">
                      {resume.title}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {resume.student}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={templateVariant(resume.templateColor)}>
                    {resume.template}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {resume.created}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Download size={11} className="text-gray-400" />
                    {resume.downloads}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={resume.status === "Published" ? "blue" : "gray"}
                  >
                    {resume.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm">
                      <Eye size={11} /> Preview
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(resume.id)}
                    >
                      <Trash2 size={11} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-xs text-gray-400"
                >
                  No resumes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center">
            <span className="text-lg font-bold text-primary-600">
              {resumeList.length}
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Total Resumes</p>
            <p className="text-[10px] text-gray-400">All templates</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
            <span className="text-lg font-bold text-blue-600">
              {resumeList.filter((r) => r.status === "Published").length}
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Published</p>
            <p className="text-[10px] text-gray-400">Live resumes</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
            <span className="text-lg font-bold text-amber-600">
              {resumeList.reduce((sum, r) => sum + r.downloads, 0)}
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">
              Total Downloads
            </p>
            <p className="text-[10px] text-gray-400">Across all resumes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
