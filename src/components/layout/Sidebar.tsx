"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Layout,
  BarChart2,
  MessageSquare,
  Bell,
  Settings,
  FileCheck,
} from "lucide-react";
import clsx from "clsx";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number | string;
}

const mainNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/users", icon: Users, badge: "1.2k" },
  { label: "Resumes", href: "/resumes", icon: FileText },
  { label: "Templates", href: "/templates", icon: Layout },
];

const insightNav: NavItem[] = [
  { label: "Analytics", href: "/analytics", icon: BarChart2 },
  { label: "Feedback", href: "/feedback", icon: MessageSquare, badge: 8 },
];

const manageNav: NavItem[] = [
  { label: "Announcements", href: "/announcements", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
];

function NavSection({ title, items }: { title: string; items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <div className="mb-2">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-3 py-2">
        {title}
      </p>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (pathname === "/" && item.href === "/dashboard");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 mb-0.5 group",
              isActive
                ? "bg-primary-100 text-primary-600"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            )}
          >
            <Icon
              size={15}
              className={clsx(
                "flex-shrink-0",
                isActive ? "text-primary-600" : "text-gray-400 group-hover:text-gray-600"
              )}
            />
            <span className="flex-1 truncate">{item.label}</span>
            {item.badge !== undefined && (
              <span
                className={clsx(
                  "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                  isActive
                    ? "bg-primary-500 text-white"
                    : "bg-primary-500 text-white"
                )}
              >
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-[220px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-gray-200">
        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <FileCheck size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 leading-none">ResumeBuilder</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <NavSection title="Main" items={mainNav} />
        <NavSection title="Insights" items={insightNav} />
        <NavSection title="Manage" items={manageNav} />
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            AD
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-800 truncate">Admin User</p>
            <p className="text-[10px] text-gray-400">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
