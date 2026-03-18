"use client";

import { AlertCircle, Eye, EyeOff, FileCheck, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));

    if (email === "admin@resumebuilder.in" && password === "admin123") {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── Left Panel ── */}
      <div className="hidden lg:flex w-[52%] bg-[#10B981] flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full bg-white/5 pointer-events-none" />

        {/* Grid overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <FileCheck size={18} className="text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-none">
              ResumeBuilder
            </p>
            <p className="text-white/60 text-[11px] mt-0.5">Admin Console</p>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="relative z-10 space-y-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 space-y-3 max-w-sm">
            {/* Window dots */}
            <div className="flex items-center gap-1.5 mb-4">
              <div className="w-2 h-2 rounded-full bg-white/30" />
              <div className="w-2 h-2 rounded-full bg-white/30" />
              <div className="w-2 h-2 rounded-full bg-white/30" />
            </div>

            {/* Mini stat cards */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Total Users", value: "12" },
                { label: "Resumes", value: "34" },
                { label: "Downloads", value: "52" },
                { label: "New Today", value: "1" },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 rounded-xl p-3">
                  <p className="text-white/50 text-[10px] mb-1">{s.label}</p>
                  <p className="text-white font-semibold text-sm">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Mini bar chart */}
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-white/50 text-[10px] mb-2">
                Monthly Registrations
              </p>
              <div className="flex items-end gap-1.5 h-10">
                {[35, 52, 48, 61, 73, 88].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-white/40"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1.5">
                {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m) => (
                  <span key={m} className="text-[9px] text-white/40">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div>
            <h2 className="text-white text-2xl font-bold leading-snug">
              Manage students,
              <br />
              resumes &amp; templates
            </h2>
            <p className="text-white/60 text-sm mt-2 leading-relaxed">
              Everything you need to run the ResumeBuilder platform — all in one
              clean dashboard.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="relative z-10 text-white/40 text-xs">
          © 2025 ResumeBuilder. All rights reserved.
        </p>
      </div>

      {/* ── Right Panel — Login Form ── */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[380px] space-y-7">
          {/* Mobile brand */}
          <div className="lg:hidden flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#10B981] rounded-xl flex items-center justify-center">
              <FileCheck size={16} className="text-white" />
            </div>
            <p className="text-sm font-semibold text-gray-900">
              ResumeBuilder Admin
            </p>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-sm text-gray-400 mt-1">
              Sign in to your admin account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Error alert */}
            {error && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-3.5 py-3">
                <AlertCircle
                  size={14}
                  className="text-red-500 flex-shrink-0 mt-0.5"
                />
                <p className="text-xs text-red-600 leading-relaxed">{error}</p>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter the email"
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-[#10B981] hover:text-[#059669] font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer group select-none">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#10B981] rounded"
              />
              <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                Keep me signed in for 30 days
              </span>
            </label>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#10B981] hover:bg-[#059669] disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
