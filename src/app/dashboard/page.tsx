"use client";

import {
  Users,
  FileText,
  Download,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import {
  registrationData,
  templateDistribution,
  users,
  resumes,
} from "@/lib/data";

const recentUsers = users.slice(0, 4);
const recentResumes = resumes.slice(0, 4);

const templateColors: Record<string, "green" | "blue" | "amber" | "purple"> = {
  Modern: "green",
  Classic: "amber",
  Creative: "purple",
};

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="Total Users" value="12,483" change="8.2% vs last month" changeType="up" icon={Users} iconColor="green" />
        <StatCard label="Total Resumes" value="34,921" change="12.4% vs last month" changeType="up" icon={FileText} iconColor="blue" />
        <StatCard label="Downloads" value="9,204" change="1.1% vs last month" changeType="down" icon={Download} iconColor="amber" />
        <StatCard label="New Users Today" value="147" change="24 from yesterday" changeType="up" icon={UserPlus} iconColor="purple" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-5 gap-4">
        {/* Bar Chart */}
        <Card className="col-span-3">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Registrations & Resumes</h3>
              <p className="text-xs text-gray-400 mt-0.5">Last 6 months overview</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary-500 inline-block" />Registrations</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-300 inline-block" />Resumes</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={registrationData} barSize={10} barGap={4}>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} width={35} />
              <Tooltip
                contentStyle={{ fontSize: 11, border: "1px solid #E5E7EB", borderRadius: 8, boxShadow: "none" }}
                cursor={{ fill: "#F9FAFB" }}
              />
              <Bar dataKey="registrations" fill="#10B981" radius={[3, 3, 0, 0]} />
              <Bar dataKey="resumes" fill="#93C5FD" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie Chart */}
        <Card className="col-span-2">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">Template Usage</h3>
          <p className="text-xs text-gray-400 mb-3">Distribution by type</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={90} height={90}>
              <PieChart>
                <Pie data={templateDistribution} cx="50%" cy="50%" innerRadius={25} outerRadius={40} dataKey="value" strokeWidth={0}>
                  {templateDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-1.5 flex-1">
              {templateDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-[11px]">
                  <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-gray-700 flex-1">{item.name}</span>
                  <span className="text-gray-400 font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-2 gap-4">
        {/* Recent Users */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Recent Users</h3>
            <Link href="/users" className="text-xs text-primary-500 hover:text-primary-600 flex items-center gap-1">
              View all <ArrowRight size={11} />
            </Link>
          </div>
          <div className="space-y-0">
            {recentUsers.map((user, i) => (
              <div key={user.id} className={`flex items-center gap-2.5 py-2 ${i < recentUsers.length - 1 ? "border-b border-gray-100" : ""}`}>
                <Avatar name={user.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800 truncate">{user.name}</p>
                  <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                </div>
                <Badge variant={user.status === "Active" ? "green" : user.status === "Pending" ? "amber" : "red"}>
                  {user.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Resumes */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Recent Resumes</h3>
            <Link href="/resumes" className="text-xs text-primary-500 hover:text-primary-600 flex items-center gap-1">
              View all <ArrowRight size={11} />
            </Link>
          </div>
          <div className="space-y-0">
            {recentResumes.map((resume, i) => (
              <div key={resume.id} className={`flex items-center gap-2.5 py-2 ${i < recentResumes.length - 1 ? "border-b border-gray-100" : ""}`}>
                <Avatar name={resume.template[0]} size="sm" rounded />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800 truncate">{resume.title}</p>
                  <p className="text-[10px] text-gray-400">{resume.template} · {resume.student}</p>
                </div>
                <span className="text-[10px] text-gray-400 flex-shrink-0">{resume.created.split(",")[0]}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
