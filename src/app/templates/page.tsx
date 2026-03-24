"use client";

import { useState } from "react";
import { Plus, Edit3, Eye, ToggleLeft, ToggleRight, Users } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { templates as initialTemplates, Template } from "@/lib/data";
import clsx from "clsx";

export default function TemplatesPage() {
  const [templateList, setTemplateList] = useState<Template[]>(initialTemplates);

  const [showModal, setShowModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    image: "",
    color: "#000000",
  });

  // Toggle Active/Disabled
  const handleToggle = (id: string) => {
    setTemplateList((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Active" ? "Disabled" : "Active" }
          : t
      )
    );
  };

  // Create Template
  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.image) return;

    const newItem: Template = {
      id: Date.now().toString(),
      name: newTemplate.name,
      uses: 0,
      status: "Active",
      color: newTemplate.color,
      bgClass: "from-gray-50 to-gray-100",
      image: newTemplate.image,
    };

    setTemplateList((prev) => [...prev, newItem]);
    setShowModal(false);
    setNewTemplate({ name: "", image: "", color: "#000000" });
  };

  const activeCount = templateList.filter((t) => t.status === "Active").length;
  const totalUses = templateList.reduce((s, t) => s + t.uses, 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Templates</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage resume templates for students
          </p>
        </div>

        <Button variant="primary" onClick={() => setShowModal(true)}>
          <Plus size={13} /> Add Template
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <SummaryCard label="Total Templates" value={templateList.length} />
        <SummaryCard label="Active" value={activeCount} blue />
        <SummaryCard label="Total Uses" value={totalUses} amber />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-4">
        {templateList.map((template) => (
          <div
            key={template.id}
            className="bg-white border rounded-xl overflow-hidden hover:border-gray-300"
          >
            {/* IMAGE PREVIEW */}
            <div className={clsx("h-72 flex items-center justify-center bg-gradient-to-br", template.bgClass)}>
              <img
                src={template.image}
                alt={template.name}
                className="h-full object-contain"
              />
            </div>

            {/* Info */}
            <div className="p-3">
              <div className="flex justify-between mb-1">
                <h3 className="text-sm font-semibold">{template.name}</h3>
                <Badge variant={template.status === "Active" ? "green" : "red"}>
                  {template.status}
                </Badge>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                <Users size={11} />
                {template.uses} students
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit3 size={11} /> Edit
                </Button>

                <Button variant="ghost" size="sm" className="flex-1">
                  <Eye size={11} /> Preview
                </Button>

                <button
                  onClick={() => handleToggle(template.id)}
                  className="w-7 h-7 border rounded flex items-center justify-center"
                >
                  {template.status === "Active" ? (
                    <ToggleRight size={14} className="text-green-500" />
                  ) : (
                    <ToggleLeft size={14} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* ADD CARD */}
        <button
          onClick={() => setShowModal(true)}
          className="border-2 border-dashed rounded-xl flex items-center justify-center min-h-[220px]"
        >
          <Plus />
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-[300px] space-y-3">
            <h3 className="font-semibold">Create Template</h3>

            <input
              placeholder="Name"
              className="w-full border p-2 rounded"
              value={newTemplate.name}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, name: e.target.value })
              }
            />

            <input
              placeholder="Image URL"
              className="w-full border p-2 rounded"
              value={newTemplate.image}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, image: e.target.value })
              }
            />

            <input
              type="color"
              className="w-full h-10"
              value={newTemplate.color}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, color: e.target.value })
              }
            />

            <div className="flex gap-2">
              <button
                onClick={handleCreateTemplate}
                className="flex-1 bg-blue-500 text-white p-2 rounded"
              >
                Create
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Small component */
function SummaryCard({ label, value }: any) {
  return (
    <div className="bg-white border rounded-xl p-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}