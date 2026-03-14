"use client";

import { useState } from "react";
import { Plus, Bell, Info, Zap, Users, Pencil, Trash2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { announcements as initialAnnouncements, Announcement } from "@/lib/data";

const typeIcon: Record<Announcement["type"], React.ElementType> = {
  update: Bell,
  maintenance: Info,
  feature: Zap,
};

const typeStyle: Record<Announcement["type"], string> = {
  update: "bg-primary-100 text-primary-600",
  maintenance: "bg-blue-50 text-blue-600",
  feature: "bg-purple-50 text-purple-600",
};

const statusVariant: Record<Announcement["status"], "green" | "amber" | "gray"> = {
  Live: "green",
  Scheduled: "amber",
  Draft: "gray",
};

export default function AnnouncementsPage() {
  const [list, setList] = useState<Announcement[]>(initialAnnouncements);

  const handleDelete = (id: string) => {
    setList((prev) => prev.filter((a) => a.id !== id));
  };

  const liveCount = list.filter((a) => a.status === "Live").length;
  const scheduledCount = list.filter((a) => a.status === "Scheduled").length;
  const draftCount = list.filter((a) => a.status === "Draft").length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Announcements</h2>
          <p className="text-xs text-gray-400 mt-0.5">Send updates to all students</p>
        </div>
        <Button variant="primary">
          <Plus size={13} /> New Announcement
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm">{liveCount}</div>
          <div><p className="text-xs font-semibold text-gray-800">Live</p><p className="text-[10px] text-gray-400">Currently active</p></div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 font-bold text-sm">{scheduledCount}</div>
          <div><p className="text-xs font-semibold text-gray-800">Scheduled</p><p className="text-[10px] text-gray-400">Upcoming</p></div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm">{draftCount}</div>
          <div><p className="text-xs font-semibold text-gray-800">Drafts</p><p className="text-[10px] text-gray-400">Not published</p></div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {list.map((ann) => {
          const Icon = typeIcon[ann.type];
          return (
            <div key={ann.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 hover:border-gray-300 transition-colors">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${typeStyle[ann.type]}`}>
                <Icon size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-gray-800 truncate">{ann.title}</h3>
                  <Badge variant={statusVariant[ann.status]}>{ann.status}</Badge>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-2">{ann.body}</p>
                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                  <span>{ann.date}</span>
                  {ann.reach && (
                    <span className="flex items-center gap-1">
                      <Users size={10} /> {ann.reach.toLocaleString()} recipients
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="outline" size="sm">
                  <Pencil size={11} />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(ann.id)}>
                  <Trash2 size={11} />
                </Button>
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-xs text-gray-400">
            No announcements yet.
          </div>
        )}
      </div>
    </div>
  );
}
