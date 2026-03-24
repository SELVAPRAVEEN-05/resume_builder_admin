"use client";

import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { users as initialUsers, User } from "@/lib/data";
import clsx from "clsx";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Plus,
  Search,
  ShieldOff,
  Trash2,
} from "lucide-react";
import { useState } from "react";

type StatusFilter = "All" | "Active" | "Disabled" | "Pending";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const [userList, setUserList] =
    useState<User[]>(initialUsers);

  // 🔹 Modal state
  const [isOpen, setIsOpen] = useState(false);

  const [newUser, setNewUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    resumes: 0,
    course: "",
    status: "Active",
    joined: "",
  });

  const courses = [
    "All",
    ...Array.from(new Set(userList.map((u) => u.course))),
  ];

  const filtered = userList.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || u.status === statusFilter;

    const matchCourse =
      courseFilter === "All" || u.course === courseFilter;

    return matchSearch && matchStatus && matchCourse;
  });

  // 🔹 Delete
  const handleDelete = (id: string) => {
    setUserList((prev) => prev.filter((u) => u.id !== id));
  };

  // 🔹 Toggle status
  const handleToggle = (id: string) => {
    setUserList((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status:
                u.status === "Active"
                  ? "Disabled"
                  : "Active",
            }
          : u,
      ),
    );
  };

  // 🔹 Add user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;

    const userToAdd: User = {
      ...newUser,
      id: Date.now().toString(),
      joined: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setUserList((prev) => [...prev, userToAdd]);
    setIsOpen(false);

    setNewUser({
      id: "",
      name: "",
      email: "",
      resumes: 0,
      course: "",
      status: "Active",
      joined: "",
    });
  };

  // 🔹 Export CSV
  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Resumes",
      "Course",
      "Status",
      "Joined",
    ];

    const rows = filtered.map((u) => [
      u.name,
      u.email,
      u.resumes,
      u.course,
      u.status,
      u.joined,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((r) => r.join(","))
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "users.csv";
    link.click();
  };

  const statusVariant = (
    s: User["status"],
  ): "green" | "amber" | "red" =>
    s === "Active"
      ? "green"
      : s === "Pending"
      ? "amber"
      : "red";

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Users
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage all registered students
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" onClick={handleExportCSV}>
            <Download size={13} /> Export CSV
          </Button>

          <Button
            variant="primary"
            onClick={() => setIsOpen(true)}
          >
            <Plus size={13} /> Add User
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 max-w-[260px]">
          <Search size={13} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="text-xs w-full outline-none bg-transparent"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value as StatusFilter,
            )
          }
          className="border rounded-lg px-3 py-2 text-xs"
        >
          {["All", "Active", "Disabled", "Pending"].map(
            (s) => (
              <option key={s}>{s}</option>
            ),
          )}
        </select>

        <select
          value={courseFilter}
          onChange={(e) =>
            setCourseFilter(e.target.value)
          }
          className="border rounded-lg px-3 py-2 text-xs"
        >
          {courses.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <p className="text-xs text-gray-400 ml-auto">
          {filtered.length} results
        </p>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              {[
                "Student",
                "Email",
                "Resumes",
                "Course",
                "Status",
                "Joined",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-2 text-xs text-gray-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={user.name} size="sm" />
                    <span className="text-xs">
                      {user.name}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 text-xs">
                  {user.email}
                </td>

                <td className="px-4 py-3 text-xs">
                  {user.resumes}
                </td>

                <td className="px-4 py-3 text-xs">
                  {user.course}
                </td>

                <td className="px-4 py-3">
                  <Badge
                    variant={statusVariant(
                      user.status,
                    )}
                  >
                    {user.status}
                  </Badge>
                </td>

                <td className="px-4 py-3 text-xs">
                  {user.joined}
                </td>

                <td className="px-4 py-3 flex gap-1">
                  {/* <Button variant="outline" size="sm">
                    <Eye size={11} /> View
                  </Button> */}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleToggle(user.id)
                    }
                  >
                    <ShieldOff size={11} />
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      handleDelete(user.id)
                    }
                  >
                    <Trash2 size={11} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-[300px] space-y-3">
            <h3 className="text-sm font-semibold">
              Add User
            </h3>

            <input
              placeholder="Name"
              className="w-full border p-2 text-xs rounded"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  name: e.target.value,
                })
              }
            />

            <input
              placeholder="Email"
              className="w-full border p-2 text-xs rounded"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  email: e.target.value,
                })
              }
            />

            <input
              placeholder="Course"
              className="w-full border p-2 text-xs rounded"
              value={newUser.course}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  course: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Resumes"
              className="w-full border p-2 text-xs rounded"
              value={newUser.resumes}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  resumes: Number(e.target.value),
                })
              }
            />

            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                onClick={handleAddUser}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}