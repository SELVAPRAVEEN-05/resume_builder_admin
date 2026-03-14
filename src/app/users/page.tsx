"use client";

import { useState } from "react";
import { Search, Plus, Download, ChevronLeft, ChevronRight, Eye, ShieldOff, Trash2 } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { users as initialUsers, User } from "@/lib/data";
import clsx from "clsx";

type StatusFilter = "All" | "Active" | "Disabled" | "Pending";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const [userList, setUserList] = useState<User[]>(initialUsers);

  const courses = ["All", ...Array.from(new Set(initialUsers.map((u) => u.course)))];

  const filtered = userList.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || u.status === statusFilter;
    const matchCourse = courseFilter === "All" || u.course === courseFilter;
    return matchSearch && matchStatus && matchCourse;
  });

  const handleDelete = (id: string) => {
    setUserList((prev) => prev.filter((u) => u.id !== id));
  };

  const handleToggle = (id: string) => {
    setUserList((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Disabled" : "Active" }
          : u
      )
    );
  };

  const statusVariant = (s: User["status"]): "green" | "amber" | "red" =>
    s === "Active" ? "green" : s === "Pending" ? "amber" : "red";

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Users</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage all registered students</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost">
            <Download size={13} /> Export CSV
          </Button>
          <Button variant="primary">
            <Plus size={13} /> Add User
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 max-w-[260px]">
          <Search size={13} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs text-gray-600 placeholder-gray-400 outline-none bg-transparent w-full"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-500 outline-none"
        >
          {["All", "Active", "Disabled", "Pending"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-500 outline-none"
        >
          {courses.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <p className="text-xs text-gray-400 ml-auto">{filtered.length} results</p>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {["Student", "Email", "Resumes", "Course", "Status", "Joined", "Actions"].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, i) => (
              <tr key={user.id} className={clsx("border-b border-gray-100 hover:bg-gray-50 transition-colors", i === filtered.length - 1 && "border-b-0")}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={user.name} size="sm" />
                    <span className="text-xs font-medium text-gray-800">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">{user.email}</td>
                <td className="px-4 py-3 text-xs text-gray-600 font-medium">{user.resumes}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{user.course}</td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant(user.status)}>{user.status}</Badge>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">{user.joined}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm">
                      <Eye size={11} /> View
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleToggle(user.id)}>
                      <ShieldOff size={11} />
                      {user.status === "Disabled" ? "Enable" : "Disable"}
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                      <Trash2 size={11} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-xs text-gray-400">
                  No users found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          Showing {filtered.length} of {initialUsers.length} users
        </p>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50">
            <ChevronLeft size={13} />
          </button>
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              className={clsx(
                "w-7 h-7 rounded-lg text-xs font-medium",
                p === 1
                  ? "bg-primary-500 text-white"
                  : "border border-gray-200 text-gray-500 hover:bg-gray-50"
              )}
            >
              {p}
            </button>
          ))}
          <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50">
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
