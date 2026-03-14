"use client";

import { useState } from "react";
import { Plus, Edit3, Eye, ToggleLeft, ToggleRight, Users } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { templates as initialTemplates, Template } from "@/lib/data";
import clsx from "clsx";

function TemplateMiniPreview({ color }: { color: string }) {
  return (
    <div
      className="w-14 h-20 bg-white rounded-md border border-black/10 p-1.5 flex flex-col gap-1 shadow-sm"
    >
      <div className="h-2.5 rounded-sm w-full" style={{ background: color, opacity: 0.7 }} />
      <div className="h-1 rounded-sm w-full bg-gray-200" />
      <div className="h-1 rounded-sm w-3/4 bg-gray-200" />
      <div className="h-1 rounded-sm w-full bg-gray-100" />
      <div className="h-1 rounded-sm w-2/3 bg-gray-100" />
      <div className="h-1 rounded-sm w-full bg-gray-200" />
      <div className="h-1 rounded-sm w-1/2 bg-gray-100" />
    </div>
  );
}

export default function TemplatesPage() {
  const [templateList, setTemplateList] = useState<Template[]>(initialTemplates);

  const handleToggle = (id: string) => {
    setTemplateList((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Active" ? "Disabled" : "Active" }
          : t
      )
    );
  };

  const activeCount = templateList.filter((t) => t.status === "Active").length;
  const totalUses = templateList.reduce((s, t) => s + t.uses, 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Templates</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage resume templates for students</p>
        </div>
        <Button variant="primary">
          <Plus size={13} /> Add Template
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm">{templateList.length}</div>
          <div><p className="text-xs font-semibold text-gray-800">Total Templates</p><p className="text-[10px] text-gray-400">All time</p></div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm">{activeCount}</div>
          <div><p className="text-xs font-semibold text-gray-800">Active</p><p className="text-[10px] text-gray-400">Currently live</p></div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 font-bold text-sm">
            {(totalUses / 1000).toFixed(1)}k
          </div>
          <div><p className="text-xs font-semibold text-gray-800">Total Uses</p><p className="text-[10px] text-gray-400">Across all templates</p></div>
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-3 gap-4">
        {templateList.map((template) => (
          <div key={template.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
            {/* Preview Area */}
            <div
              className={clsx("h-32 flex items-center justify-center bg-gradient-to-br", template.bgClass)}
            >
              <TemplateMiniPreview color={template.color} />
            </div>

            {/* Info */}
            <div className="p-3">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-sm font-semibold text-gray-800">{template.name}</h3>
                <Badge variant={template.status === "Active" ? "green" : "red"}>
                  {template.status}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-3">
                <Users size={11} />
                <span>{template.uses.toLocaleString()} students</span>
              </div>

              {/* Usage bar */}
              <div className="mb-3">
                <div className="w-full h-1.5 bg-gray-100 rounded-full">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: `${Math.min((template.uses / 5500) * 100, 100)}%`,
                      background: template.color,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Button variant="outline" size="sm" className="flex-1 justify-center">
                  <Edit3 size={11} /> Edit
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 justify-center">
                  <Eye size={11} /> Preview
                </Button>
                <button
                  onClick={() => handleToggle(template.id)}
                  className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  title={template.status === "Active" ? "Disable" : "Enable"}
                >
                  {template.status === "Active" ? (
                    <ToggleRight size={14} className="text-primary-500" />
                  ) : (
                    <ToggleLeft size={14} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <button className="bg-white border-2 border-dashed border-gray-200 rounded-xl h-full min-h-[220px] flex flex-col items-center justify-center gap-2 hover:border-primary-300 hover:bg-primary-50/30 transition-all group">
          <div className="w-9 h-9 rounded-full bg-gray-100 group-hover:bg-primary-100 flex items-center justify-center transition-colors">
            <Plus size={16} className="text-gray-400 group-hover:text-primary-500" />
          </div>
          <p className="text-xs text-gray-400 group-hover:text-primary-500 font-medium transition-colors">
            Add New Template
          </p>
        </button>
      </div>
    </div>
  );
}
