"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import Card from "@/components/ui/Card";
import { registrationData, templates } from "@/lib/data";
import { TrendingUp, TrendingDown } from "lucide-react";

const kpiData = [
  { label: "Avg. Session Time", value: "14.2 min", change: "+2.3 min", up: true, color: "text-primary-600" },
  { label: "Download Rate", value: "26.4%", change: "-0.8%", up: false, color: "text-blue-600" },
  { label: "30-day Retention", value: "71.8%", change: "+5.1%", up: true, color: "text-purple-600" },
];

const dailyActive = [
  { day: "Mon", users: 820 },
  { day: "Tue", users: 940 },
  { day: "Wed", users: 880 },
  { day: "Thu", users: 1050 },
  { day: "Fri", users: 990 },
  { day: "Sat", users: 720 },
  { day: "Sun", users: 650 },
];

const maxTemplateUses = Math.max(...templates.map((t) => t.uses));

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Analytics</h2>
          <p className="text-xs text-gray-400 mt-0.5">Platform performance overview</p>
        </div>
        <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-500 outline-none">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      {/* Big Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <p className="text-xs text-gray-400 mb-1">Total Registered Users</p>
          <p className="text-3xl font-bold text-primary-500">15</p>
          <p className="text-xs text-primary-500 mt-1">↑ 8.2% from last month</p>
          <ResponsiveContainer width="100%" height={60} className="mt-3">
            <BarChart data={registrationData} barSize={8}>
              <Bar dataKey="registrations" fill="#10B981" radius={[2, 2, 0, 0]} opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <p className="text-xs text-gray-400 mb-1">Total Resumes Created</p>
          <p className="text-3xl font-bold text-blue-500">34</p>
          <p className="text-xs text-primary-500 mt-1">↑ 12.4% from last month</p>
          <ResponsiveContainer width="100%" height={60} className="mt-3">
            <BarChart data={registrationData} barSize={8}>
              <Bar dataKey="resumes" fill="#93C5FD" radius={[2, 2, 0, 0]} opacity={0.9} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-3">
        {kpiData.map((kpi) => (
          <Card key={kpi.label}>
            <p className="text-xs text-gray-400 mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className={`text-xs mt-1 flex items-center gap-1 ${kpi.up ? "text-primary-500" : "text-gray-400"}`}>
              {kpi.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {kpi.change} from last month
            </p>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-5 gap-4">
        {/* Daily Active Users Line Chart */}
        <Card className="col-span-3">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">Daily Active Users</h3>
          <p className="text-xs text-gray-400 mb-4">This week</p>
          <ResponsiveContainer width="100%" height={130}>
            <LineChart data={dailyActive}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} width={40} />
              <Tooltip
                contentStyle={{ fontSize: 11, border: "1px solid #E5E7EB", borderRadius: 8, boxShadow: "none" }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 3, fill: "#10B981" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Template Performance */}
        <Card className="col-span-2">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">Templates by Downloads</h3>
          <p className="text-xs text-gray-400 mb-4">All time</p>
          <div className="space-y-3">
            {templates.map((t) => (
              <div key={t.id} className="flex items-center gap-2">
                <span className="text-[11px] text-gray-600 w-28 truncate flex-shrink-0">{t.name}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.round((t.uses / maxTemplateUses) * 100)}%`,
                      background: t.color,
                    }}
                  />
                </div>
                <span className="text-[11px] text-gray-400 w-10 text-right flex-shrink-0">
                  {t.uses}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Registration Trend */}
      <Card>
        <h3 className="text-sm font-semibold text-gray-800 mb-1">Monthly Registration vs Resume Creation</h3>
        <p className="text-xs text-gray-400 mb-4">6-month comparison</p>
        <div className="flex items-center gap-4 mb-3">
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-3 h-0.5 bg-primary-500 inline-block rounded" /> Registrations
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-3 h-0.5 bg-blue-400 inline-block rounded" /> Resumes Created
          </span>
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={registrationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} width={40} />
            <Tooltip contentStyle={{ fontSize: 11, border: "1px solid #E5E7EB", borderRadius: 8, boxShadow: "none" }} />
            <Line type="monotone" dataKey="registrations" stroke="#10B981" strokeWidth={2} dot={{ r: 3, fill: "#10B981" }} />
            <Line type="monotone" dataKey="resumes" stroke="#93C5FD" strokeWidth={2} dot={{ r: 3, fill: "#93C5FD" }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
