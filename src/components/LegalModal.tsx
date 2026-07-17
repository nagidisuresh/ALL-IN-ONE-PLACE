import React, { useState } from "react";
import { X, Shield, FileText, Compass, CheckCircle } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: "terms" | "privacy" | "accessibility";
}

export default function LegalModal({ isOpen, onClose, initialSection = "terms" }: LegalModalProps) {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<"terms" | "privacy" | "accessibility">(initialSection);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className={`relative w-full max-w-3xl h-[85vh] flex flex-col rounded-2xl border overflow-hidden shadow-2xl transition-all ${
        theme === "light"
          ? "bg-white border-slate-200 text-slate-800"
          : "bg-[#0b0b14] border-white/5 text-gray-300"
      }`}>
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between shrink-0 ${
          theme === "light" ? "border-slate-200 bg-slate-50/55" : "border-white/5 bg-white/[0.01]"
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              theme === "light" ? "bg-purple-100 text-purple-600" : "bg-purple-500/10 text-purple-400"
            }`}>
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-base font-bold tracking-tight ${theme === "light" ? "text-slate-900" : "text-white"}`}>
                Legal Documentation
              </h3>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                NextRoundPrep Platform Agreements
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
              theme === "light" ? "hover:bg-slate-100 text-slate-500" : "hover:bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className={`flex border-b shrink-0 overflow-x-auto ${
          theme === "light" ? "border-slate-200 bg-slate-50/20" : "border-white/5 bg-black/10"
        }`}>
          <button
            onClick={() => setActiveSection("terms")}
            className={`flex-1 py-3 px-4 text-xs font-bold font-mono uppercase tracking-wider border-b-2 transition-all ${
              activeSection === "terms"
                ? "border-pink-500 text-pink-500"
                : "border-transparent text-gray-500 hover:text-gray-400"
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveSection("privacy")}
            className={`flex-1 py-3 px-4 text-xs font-bold font-mono uppercase tracking-wider border-b-2 transition-all ${
              activeSection === "privacy"
                ? "border-purple-500 text-purple-500"
                : "border-transparent text-gray-500 hover:text-gray-400"
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveSection("accessibility")}
            className={`flex-1 py-3 px-4 text-xs font-bold font-mono uppercase tracking-wider border-b-2 transition-all ${
              activeSection === "accessibility"
                ? "border-cyan-500 text-cyan-500"
                : "border-transparent text-gray-500 hover:text-gray-400"
            }`}
          >
            Accessibility
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar text-xs md:text-sm leading-relaxed">
          {activeSection === "terms" && (
            <div className="space-y-4">
              <h4 className={`text-base font-bold ${theme === "light" ? "text-slate-900" : "text-white"}`}>
                Terms of Service
              </h4>
              <p className="text-gray-400 text-xs">Last Updated: July 11, 2026</p>
              
              <div className="space-y-3">
                <h5 className={`font-bold ${theme === "light" ? "text-slate-800" : "text-white"}`}>1. Acceptance of Terms</h5>
                <p>
                  By accessing or using the NextRoundPrep platform, website, interactive modules, resume templates, and learning paths, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
                </p>
                
                <h5 className={`font-bold ${theme === "light" ? "text-slate-800" : "text-white"}`}>2. Free Open Education Initiative</h5>
                <p>
                  NextRoundPrep is dedicated to facilitating 100% free discovery and links to public educational materials for students in India. We do not charge fees for accessing curations, roadmaps, or public syllabi indexes.
                </p>

                <h5 className={`font-bold ${theme === "light" ? "text-slate-800" : "text-white"}`}>3. User Conduct & Accounts</h5>
                <p>
                  Users are responsible for maintaining the confidentiality of their local states, profiles, and interview histories. NextRoundPrep reserves the right to terminate accounts that engage in fraudulent behavior, automated scraping, or misuse of the AI simulator.
                </p>

                <h5 className={`font-bold ${theme === "light" ? "text-slate-800" : "text-white"}`}>4. Intellectual Property</h5>
                <p>
                  All curriculum materials, video links, external platforms, and books listed are property of their respective owners. NextRoundPrep is an independent discovery aggregator and claims no trademark association or ownership over original host brands.
                </p>

                <h5 className={`font-bold ${theme === "light" ? "text-slate-800" : "text-white"}`}>5. Limitation of Liability</h5>
                <p>
                  NextRoundPrep provides resources "as is" without warranty. We are not responsible for off-campus placement outcomes, examination results, or validity changes in linked external sites.
                </p>
              </div>
            </div>
          )}

          {activeSection === "privacy" && (
            <div className="space-y-4">
              <h4 className={`text-base font-bold ${theme === "light" ? "text-slate-900" : "text-white"}`}>
                Privacy Policy
              </h4>
              <p className="text-gray-400 text-xs">Last Updated: July 11, 2026</p>

              <div className="space-y-3">
                <h5 className={`font-bold ${theme === "light" ? "text-slate-800" : "text-white"}`}>1. Data Collected</h5>
                <p>
                  We prioritize user privacy. Profile names, email addresses, completed roadmap steps, points, and simulated interview histories are stored safely on your device's <strong>localStorage</strong> to keep data local and secure.
                </p>

                <h5 className={`font-bold ${theme === "light" ? "text-slate-800" : "text-white"}`}>2. AI Interactions & Chat Logs</h5>
                <p>
                  Interactions with Suresh AI and the simulated interview modules may call the server-side Gemini API securely. Your personal email and sensitive credentials are never exposed to browser APIs or external loggers.
                </p>

                <h5 className={`font-bold ${theme === "light" ? "text-slate-800" : "text-white"}`}>3. Third-Party Integrations</h5>
                <p>
                  Our platform lists free external services like YouTube, GeeksforGeeks, and various learning repositories. These external services maintain independent tracking policies, cookie handlers, and data consent frameworks.
                </p>

                <h5 className={`font-bold ${theme === "light" ? "text-slate-800" : "text-white"}`}>4. Cookies</h5>
                <p>
                  We use cookies and local data nodes strictly for persistent UI preferences, user authentication status, theme choices, and language configurations. We do not operate tracking pixels or ad networks.
                </p>
              </div>
            </div>
          )}

          {activeSection === "accessibility" && (
            <div className="space-y-4">
              <h4 className={`text-base font-bold ${theme === "light" ? "text-slate-900" : "text-white"}`}>
                Accessibility Statement
              </h4>
              <p className="text-gray-400 text-xs">Last Updated: July 11, 2026</p>

              <div className="space-y-3">
                <h5 className={`font-bold ${theme === "light" ? "text-slate-800" : "text-white"}`}>Our Commitment</h5>
                <p>
                  NextRoundPrep is committed to ensuring digital accessibility for people of all abilities. We strive to create interfaces that are highly readable, fully keyboard navigable, and optimized for screen readers.
                </p>

                <h5 className={`font-bold ${theme === "light" ? "text-slate-800" : "text-white"}`}>Conformance Standard</h5>
                <p>
                  We aim to conform strictly to the Web Content Accessibility Guidelines (WCAG) 2.1 level AA standards across our digital roadmap systems, high-contrast toggle choices, and responsive forms.
                </p>

                <h5 className={`font-bold ${theme === "light" ? "text-slate-800" : "text-white"}`}>Key Features</h5>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Semantic HTML Structure:</strong> All cards, buttons, and input fields utilize descriptive IDs and label states.</li>
                  <li><strong>Color Contrast:</strong> Strict off-white light styles and high-contrast charcoal dark backgrounds for eye safety.</li>
                  <li><strong>Keyboard Navigation:</strong> Standard tab indexing enabled across custom control drawers and modals.</li>
                  <li><strong>Responsive Reflow:</strong> Clean, dynamic canvas adjustments to accommodate viewport zoom profiles without loss of structural integrity.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex items-center justify-between shrink-0 ${
          theme === "light" ? "border-slate-200 bg-slate-50" : "border-white/5 bg-[#0e0e1a]/95"
        }`}>
          <span className="text-[10px] font-mono text-gray-500">
            NextRoundPrep © 2026 Legal Division
          </span>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold py-1.5 px-3 rounded-lg hover:opacity-95 transition-all cursor-pointer"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>I Understand</span>
          </button>
        </div>
      </div>
    </div>
  );
}
