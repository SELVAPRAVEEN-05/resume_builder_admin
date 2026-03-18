"use client";

import Button from "@/components/ui/Button";
import { Save } from "lucide-react";
import { useState } from "react";

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

function Toggle({ enabled, onToggle }: ToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${
        enabled ? "bg-primary-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
          enabled ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

interface SettingRowProps {
  label: string;
  description: string;
  children: React.ReactNode;
}

function SettingRow({ label, description, children }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-3 px-4 border-b border-gray-100 last:border-b-0">
      <div className="flex-1 mr-6">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
      </div>
      {children}
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {title}
        </p>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [platformName, setPlatformName] = useState("ResumeBuilder Pro");
  const [supportEmail, setSupportEmail] = useState("support@resumebuilder.in");
  const [maxResumes, setMaxResumes] = useState("5");
  const [aiReview, setAiReview] = useState(true);
  const [pdfExport, setPdfExport] = useState(true);
  const [marketplace, setMarketplace] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [publicSignup, setPublicSignup] = useState(true);

  return (
    <div className="space-y-4 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Settings</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Platform configuration and preferences
          </p>
        </div>
        <Button variant="primary">
          <Save size={13} /> Save Changes
        </Button>
      </div>

      {/* General */}
      <Section title="General">
        <SettingRow
          label="Platform Name"
          description="Displayed in emails and browser tab"
        >
          <input
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-primary-300 w-52"
          />
        </SettingRow>
        <SettingRow
          label="Support Email"
          description="Students can contact via this address"
        >
          <input
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-primary-300 w-52"
          />
        </SettingRow>
        <SettingRow
          label="Max Resumes per User"
          description="Free tier limit per student account"
        >
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={maxResumes}
              onChange={(e) => setMaxResumes(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-primary-300 w-20 text-center"
              min={1}
              max={50}
            />
            <span className="text-xs text-gray-400">resumes</span>
          </div>
        </SettingRow>
        <SettingRow
          label="Public Signup"
          description="Allow new student registrations"
        >
          <Toggle
            enabled={publicSignup}
            onToggle={() => setPublicSignup(!publicSignup)}
          />
        </SettingRow>
      </Section>

      {/* Features */}
      <Section title="Features">
        <SettingRow
          label="AI Resume Review"
          description="Enable AI-powered feedback for students"
        >
          <Toggle enabled={aiReview} onToggle={() => setAiReview(!aiReview)} />
        </SettingRow>
        <SettingRow
          label="PDF Export"
          description="Allow students to download resumes as PDF"
        >
          <Toggle
            enabled={pdfExport}
            onToggle={() => setPdfExport(!pdfExport)}
          />
        </SettingRow>
        <SettingRow
          label="Template Marketplace"
          description="Let students upload and share community templates"
        >
          <Toggle
            enabled={marketplace}
            onToggle={() => setMarketplace(!marketplace)}
          />
        </SettingRow>
        <SettingRow
          label="Email Notifications"
          description="Send activity emails to students on key events"
        >
          <Toggle
            enabled={emailNotifs}
            onToggle={() => setEmailNotifs(!emailNotifs)}
          />
        </SettingRow>
      </Section>

      {/* Security */}
      <Section title="Security">
        <SettingRow
          label="Two-Factor Authentication"
          description="Require 2FA for all admin logins"
        >
          <Toggle
            enabled={twoFactor}
            onToggle={() => setTwoFactor(!twoFactor)}
          />
        </SettingRow>
        <SettingRow
          label="Session Timeout"
          description="Auto logout after inactivity (minutes)"
        >
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-primary-300 w-20 text-center"
              min={5}
            />
            <span className="text-xs text-gray-400">minutes</span>
          </div>
        </SettingRow>
        <SettingRow
          label="Maintenance Mode"
          description="Temporarily disable access for all students"
        >
          <Toggle
            enabled={maintenanceMode}
            onToggle={() => setMaintenanceMode(!maintenanceMode)}
          />
        </SettingRow>
      </Section>

      {/* Danger Zone */}
      <div className="bg-white border border-red-200 rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 bg-red-50 border-b border-red-200">
          <p className="text-xs font-semibold text-red-500 uppercase tracking-wide">
            Danger Zone
          </p>
        </div>
        <div className="flex items-center justify-between py-3 px-4">
          <div>
            <p className="text-sm font-medium text-gray-800">
              Clear All Resume Data
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Permanently delete all student resumes. This cannot be undone.
            </p>
          </div>
          <Button variant="danger">Delete All Data</Button>
        </div>
      </div>
    </div>
  );
}
