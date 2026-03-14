import clsx from "clsx";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  icon: LucideIcon;
  iconColor: "green" | "blue" | "amber" | "purple";
}

const iconStyles = {
  green: "bg-primary-100 text-primary-600",
  blue: "bg-blue-50 text-blue-500",
  amber: "bg-amber-50 text-amber-500",
  purple: "bg-purple-50 text-purple-500",
};

export default function StatCard({
  label,
  value,
  change,
  changeType,
  icon: Icon,
  iconColor,
}: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <div className={clsx("w-8 h-8 rounded-lg flex items-center justify-center", iconStyles[iconColor])}>
          <Icon size={15} />
        </div>
      </div>
      <p className="text-2xl font-semibold text-gray-900 mb-1">{value}</p>
      <p className={clsx("text-xs flex items-center gap-1", changeType === "up" ? "text-primary-600" : "text-red-500")}>
        {changeType === "up" ? "↑" : "↓"} {change}
      </p>
    </div>
  );
}
