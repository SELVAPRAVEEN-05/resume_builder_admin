"use client";

import { usePathname } from "next/navigation";
import { Search, Bell, User } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/users": "Users",
  "/resumes": "Resumes",
  "/templates": "Templates",
  "/analytics": "Analytics",
  "/feedback": "Feedback",
  "/announcements": "Announcements",
  "/settings": "Settings",
};

export default function Topbar() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <header className="h-[52px] bg-white border-b border-gray-200 flex items-center px-5 gap-3 flex-shrink-0">
      <h1 className="text-[15px] font-semibold text-gray-900 flex-1">{title}</h1>

      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5 text-xs text-gray-400 w-44">
        <Search size={13} className="flex-shrink-0" />
        <span>Search anything...</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="relative w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={14} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary-500 rounded-full border border-white" />
        </button>
        <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <User size={14} />
        </button>
      </div>
    </header>
  );
}
