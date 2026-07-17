import React, { useState, useEffect, useRef } from "react";
import { Mic, Sparkles, LogOut, Video, Map, Route, Briefcase, FileText, MessageSquare, Sun, Moon, ChevronDown, User, Compass, BookOpen, Info, Award, Rocket, Box, Globe, GraduationCap, Laptop, Bookmark } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  platformMode: "career" | "eamcet" | "free-edu" | "remote-jobs" | "student-os" | "new-age-schools" | "learn-with-suresh";
  setPlatformMode: (mode: "career" | "eamcet" | "free-edu" | "remote-jobs" | "student-os" | "new-age-schools" | "learn-with-suresh") => void;
  user: { email: string; name: string } | null;
  onLogout: () => void;
  onOpenProfile: () => void;
  userPoints?: number;
}

export default function Navbar({ activeTab, setActiveTab, platformMode, setPlatformMode, user, onLogout, onOpenProfile, userPoints = 0 }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const careerNavItems = [
    { id: "interview", label: "Interview", icon: Video },
    { id: "roadmap", label: "Roadmap", icon: Map },
    { id: "job-prep", label: "Job Prep", icon: Briefcase },
    { id: "resume", label: "Resume", icon: FileText },
    { id: "tools-directory", label: "AI Tools", icon: Compass },
    { id: "free-platforms", label: "Free Platforms", icon: BookOpen },
    { id: "founders-prime", label: "FoundersPrime", icon: Rocket },
    { id: "tcs-nqt", label: "TCS NQT", icon: Award },
  ];

  const eamcetNavItems = [
    { id: "eamcet-home", label: "Home", icon: Compass },
    { id: "eamcet-plans", label: "Study Plans", icon: BookOpen },
    { id: "eamcet-practice", label: "Practice MCQs", icon: Sparkles },
    { id: "eamcet-resources", label: "Materials & PYQs", icon: FileText },
    { id: "eamcet-tips", label: "Expert Tips", icon: Award },
    { id: "eamcet-counseling", label: "Counseling Hub", icon: Map },
    { id: "eamcet-profile", label: "Personal Details", icon: User },
  ];

  const freeEduNavItems = [
    { id: "free-platforms", label: "Global Directory", icon: Globe },
    { id: "free-after10th", label: "After 10th Guide", icon: GraduationCap },
    { id: "free-coding", label: "IT & Coding Careers", icon: Laptop },
    { id: "free-subjects", label: "Subject Resources", icon: BookOpen },
    { id: "free-textbooks", label: "Free Books & Textbooks", icon: FileText },
    { id: "free-simulations", label: "Interactive Tools", icon: Sparkles },
    { id: "free-dashboard", label: "My Bookmark Shelf", icon: Bookmark },
    { id: "portfolio", label: "Portfolio", icon: Sparkles },
    { id: "ai-chat", label: "AI Chat", icon: MessageSquare },
  ];

  const remoteJobsNavItems = [
    { id: "remote-dashboard", label: "Remote Board", icon: Briefcase },
  ];

  const learnSureshNavItems = [
    { id: "learn-suresh-home", label: "Overview", icon: Compass },
    { id: "learn-suresh-learn", label: "Curriculum Hub", icon: BookOpen },
    { id: "learn-suresh-practice", label: "Compiler & Sandbox", icon: Laptop },
    { id: "learn-suresh-career-suite", label: "Zuno AI Career Suite", icon: Briefcase },
    { id: "learn-suresh-ai-tools", label: "AI Study Tools", icon: Laptop },
  ];

  const navItems = 
    platformMode === "career" 
      ? careerNavItems 
      : platformMode === "eamcet" 
        ? eamcetNavItems 
        : platformMode === "free-edu"
          ? freeEduNavItems
          : platformMode === "remote-jobs"
            ? remoteJobsNavItems
            : platformMode === "learn-with-suresh"
              ? learnSureshNavItems
              : [];

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a14]/90 backdrop-blur-md flex flex-col transition-all duration-200">
      {/* Top Row: Brand & Profile Actions */}
      <div className="h-16 px-4 sm:px-8 flex items-center justify-between w-full">
        {/* Left: Logo, Wordmark & Mode Switcher */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div 
            className="flex items-center gap-2.5 cursor-pointer" 
            onClick={() => {
              if (platformMode === "career") {
                setPlatformMode("learn-with-suresh");
                setActiveTab("learn-suresh-home");
              } else if (platformMode === "eamcet") {
                setActiveTab("eamcet-home");
              } else if (platformMode === "free-edu") {
                setActiveTab("free-problems-hub");
              } else if (platformMode === "remote-jobs") {
                setActiveTab("remote-dashboard");
              } else if (platformMode === "student-os") {
                setActiveTab("dashboard");
              } else if (platformMode === "new-age-schools") {
                setActiveTab("new-age-schools-home");
              } else if (platformMode === "learn-with-suresh") {
                setActiveTab("learn-suresh-home");
              }
            }}
          >
            {platformMode === "career" && (
              <div className="relative w-9 h-9 bg-gradient-to-tr from-[#ec4899] via-[#a855f7] to-[#22d3ee] flex items-center justify-center rounded-full shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                <Mic className="w-4 h-4 text-white stroke-[2]" />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full border border-[#0a0a14] flex items-center justify-center">
                  <div className="w-1 h-1 bg-[#ec4899] rounded-full"></div>
                </div>
              </div>
            )}
            {platformMode === "eamcet" && (
              <div className="relative w-9 h-9 bg-gradient-to-tr from-[#3b82f6] via-[#a855f7] to-[#10b981] flex items-center justify-center rounded-full shadow-[0_0_12px_rgba(59,130,246,0.3)]">
                <BookOpen className="w-4 h-4 text-white stroke-[2]" />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full border border-[#0a0a14] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full"></div>
                </div>
              </div>
            )}
            {platformMode === "free-edu" && (
              <div className="relative w-9 h-9 bg-gradient-to-tr from-[#a855f7] via-[#22d3ee] to-[#10b981] flex items-center justify-center rounded-full shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                <GraduationCap className="w-4 h-4 text-white stroke-[2]" />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full border border-[#0a0a14] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#22d3ee] rounded-full"></div>
                </div>
              </div>
            )}
            {platformMode === "remote-jobs" && (
              <div className="relative w-9 h-9 bg-gradient-to-tr from-[#0D9488] via-[#22d3ee] to-[#3b82f6] flex items-center justify-center rounded-full shadow-[0_0_12px_rgba(13,148,136,0.3)]">
                <Briefcase className="w-4 h-4 text-white stroke-[2]" />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full border border-[#0a0a14] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#0D9488] rounded-full"></div>
                </div>
              </div>
            )}
            {platformMode === "student-os" && (
              <div className="relative w-9 h-9 bg-gradient-to-tr from-[#6366f1] via-pink-500 to-cyan-400 flex items-center justify-center rounded-full shadow-[0_0_12px_rgba(99,102,241,0.4)] animate-pulse">
                <Sparkles className="w-4 h-4 text-white stroke-[2]" />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full border border-[#0a0a14] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#6366f1] rounded-full"></div>
                </div>
              </div>
            )}
            {platformMode === "new-age-schools" && (
              <div className="relative w-9 h-9 bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-500 flex items-center justify-center rounded-full shadow-[0_0_12px_rgba(244,63,94,0.4)] animate-pulse">
                <GraduationCap className="w-4 h-4 text-white stroke-[2]" />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full border border-[#0a0a14] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                </div>
              </div>
            )}
            {platformMode === "learn-with-suresh" && (
              <div className="relative w-9 h-9 bg-gradient-to-tr from-[#a855f7] via-[#f59e0b] to-[#22d3ee] flex items-center justify-center rounded-full shadow-[0_0_12px_rgba(168,85,247,0.4)] animate-pulse">
                <GraduationCap className="w-4 h-4 text-white stroke-[2]" />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full border border-[#0a0a14] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#a855f7] rounded-full"></div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 font-sans uppercase">
                {platformMode === "career" ? "Career Hub" : 
                 platformMode === "eamcet" ? "EAMCET Hub" : 
                 platformMode === "free-edu" ? "EduFree Hub" : 
                 platformMode === "remote-jobs" ? "Remote Jobs" : 
                 platformMode === "student-os" ? "StudentOS" : 
                 platformMode === "learn-with-suresh" ? "Learn with Suresh" : 
                 "New Age Schools"}
              </span>
            </div>
          </div>

          {/* Sliding Switcher */}
          (
            <div className="flex items-center bg-black/40 border border-white/5 p-1 rounded-2xl text-[11px] font-medium backdrop-blur-md shadow-inner gap-1 overflow-x-auto max-w-[280px] sm:max-w-none pb-2 pt-1 px-1.5 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent">
              <button
                type="button"
                onClick={() => {
                  setPlatformMode("learn-with-suresh");
                  setActiveTab("learn-suresh-home");
                }}
                className={`px-3 py-1 rounded-full transition-all duration-300 font-sans cursor-pointer whitespace-nowrap ${
                  platformMode === "learn-with-suresh"
                    ? "bg-gradient-to-r from-[#a855f7] via-[#f59e0b] to-[#22d3ee] text-white shadow-md shadow-purple-500/10 font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Learn with Suresh 🎓
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlatformMode("eamcet");
                  setActiveTab("eamcet-home");
                }}
                className={`px-3 py-1 rounded-full transition-all duration-300 font-sans cursor-pointer whitespace-nowrap ${
                  platformMode === "eamcet"
                    ? "bg-gradient-to-r from-[#3b82f6] to-[#10b981] text-white shadow-md shadow-blue-500/10 font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                EAMCET Hub
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlatformMode("free-edu");
                  setActiveTab("free-problems-hub");
                }}
                className={`px-3 py-1 rounded-full transition-all duration-300 font-sans cursor-pointer whitespace-nowrap ${
                  platformMode === "free-edu"
                    ? "bg-gradient-to-r from-[#a855f7] to-[#22d3ee] text-white shadow-md shadow-purple-500/10 font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Free Education
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlatformMode("career");
                  setActiveTab("interview");
                }}
                className={`px-3 py-1 rounded-full transition-all duration-300 font-sans cursor-pointer whitespace-nowrap ${
                  platformMode === "career"
                    ? "bg-gradient-to-r from-[#ec4899] via-[#a855f7] to-[#6366f1] text-white shadow-md shadow-pink-500/10 font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Career Hub 🎯
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlatformMode("remote-jobs");
                  setActiveTab("remote-dashboard");
                }}
                className={`px-3 py-1 rounded-full transition-all duration-300 font-sans cursor-pointer whitespace-nowrap ${
                  platformMode === "remote-jobs"
                    ? "bg-gradient-to-r from-[#0D9488] to-[#22d3ee] text-white shadow-md shadow-teal-500/10 font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Remote Jobs
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlatformMode("student-os");
                  setActiveTab("dashboard");
                }}
                className={`px-3 py-1 rounded-full transition-all duration-300 font-sans cursor-pointer whitespace-nowrap ${
                  platformMode === "student-os"
                    ? "bg-gradient-to-r from-[#6366f1] via-pink-500 to-cyan-400 text-white shadow-md shadow-indigo-500/10 font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                StudentOS ✨
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlatformMode("new-age-schools");
                  setActiveTab("new-age-schools-home");
                }}
                className={`px-3 py-1 rounded-full transition-all duration-300 font-sans cursor-pointer whitespace-nowrap ${
                  platformMode === "new-age-schools"
                    ? "bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white shadow-md shadow-rose-500/10 font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                New Age Schools 🎓
              </button>
            </div>
          )
        </div>

        {/* Right: Actions & Language Selector */}
        <div className="flex items-center gap-3">
          {/* Simple Premium Language Toggle Button */}
          <div className="flex items-center bg-[#11101c] border border-white/10 rounded-xl p-0.5 overflow-hidden">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                language === "en"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                language === "hi"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              हिं
            </button>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              {/* Quick Search / Command Palette Button */}
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("open-command-palette"));
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10 text-xs text-gray-400 hover:text-white transition-all cursor-pointer font-mono"
                title="Press Ctrl+K or Cmd+K to open Command Palette"
              >
                <Compass className="w-3.5 h-3.5 text-[#22d3ee] animate-pulse" />
                <span className="hidden sm:inline text-xs font-semibold">{t("search")}</span>
                <span className="bg-black/40 px-1.5 py-0.5 rounded text-[9px] border border-white/10 text-gray-400 font-bold">
                  Ctrl K
                </span>
              </button>

              {/* Points/XP Badge */}
              <div 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-bold font-mono tracking-wide shadow-[0_0_12px_rgba(245,158,11,0.15)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                onClick={onOpenProfile}
                title="Your learning experience points (XP)"
              >
                <Award className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
                <span className="font-extrabold">{userPoints} XP</span>
              </div>

              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 bg-gradient-to-tr from-[#ec4899] to-[#a855f7] rounded-full flex items-center justify-center font-bold text-white text-xs border border-white/20">
                    {userInitial}
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-64 rounded-2xl bg-[#11101c] border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.5)] z-50 overflow-hidden animate-fade-in">
                    {/* Profile Header */}
                    <div className="px-4 py-3.5 border-b border-white/5 bg-black/20">
                      <p className="text-xs font-bold text-white tracking-wide truncate">{user.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono truncate mt-0.5">{user.email}</p>
                    </div>

                    {/* Profile Dashboard link option */}
                    <div className="p-2 border-b border-white/5">
                      <button
                        type="button"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          onOpenProfile();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-[#22d3ee] font-bold flex items-center justify-between transition-all cursor-pointer"
                      >
                        <span className="flex items-center gap-2 text-xs">
                          <User className="w-4 h-4 text-[#ec4899]" />
                          <span>{t("myDashboard")}</span>
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      </button>
                    </div>

                    {/* Theme Settings row */}
                    <div className="px-4 py-3.5 border-b border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">{t("themeMode")}</span>
                        <span className="text-[10px] font-mono text-[#22d3ee] font-bold">
                          {theme === "light" ? "HIGH-CONTRAST LIGHT" : "DARK"}
                        </span>
                      </div>
                      
                      <button
                        type="button"
                        onClick={toggleTheme}
                        className="w-full bg-[#0a0a14] hover:bg-[#15141f] border border-white/5 hover:border-white/10 rounded-xl py-2 px-3 flex items-center justify-between text-xs text-gray-300 hover:text-white transition-all cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          {theme === "light" ? (
                            <>
                              <Sun className="w-4 h-4 text-[#ec4899]" />
                              <span>{t("useDarkMode")}</span>
                            </>
                          ) : (
                            <>
                              <Moon className="w-4 h-4 text-[#a855f7]" />
                              <span>{t("useLightMode")}</span>
                            </>
                          )}
                        </span>
                      </button>
                    </div>

                    {/* Log out option */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-3 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-2 transition-all font-semibold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      {t("signOut")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setActiveTab("interview")}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:opacity-90 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 cursor-pointer"
            >
              {t("signIn")}
            </button>
          )}
        </div>
      </div>

      {/* Row 2: Scrollable Sub-navbar (Always visible on all screens with horizontal swipe/scroll) */}
      {user && (
        <div className="w-full border-t border-white/5 bg-[#0e0d1a]/50 px-4 sm:px-8 flex items-center gap-5 overflow-x-auto whitespace-nowrap py-3 scrollbar-thin scrollbar-thumb-purple-500/60 scrollbar-track-transparent">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const accentColorClass = 
              platformMode === "career" 
                ? "text-[#ec4899]" 
                : platformMode === "eamcet" 
                  ? "text-[#3b82f6]" 
                  : platformMode === "free-edu"
                    ? "text-[#a855f7]"
                    : platformMode === "learn-with-suresh"
                      ? "text-[#f59e0b]"
                      : "text-[#0D9488]";
            const dotBgClass = 
              platformMode === "career" 
                ? "bg-[#ec4899] shadow-[0_0_8px_rgba(236,72,153,0.8)]" 
                : platformMode === "eamcet" 
                  ? "bg-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.8)]" 
                  : platformMode === "free-edu"
                    ? "bg-[#a855f7] shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                    : platformMode === "learn-with-suresh"
                      ? "bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                      : "bg-[#0D9488] shadow-[0_0_8px_rgba(13,148,136,0.8)]";

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative py-1 px-1 flex items-center gap-2 text-xs font-semibold transition-all duration-200 cursor-pointer flex-shrink-0 ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? accentColorClass : "text-gray-400"}`} />
                <span>
                  {item.id === "interview" ? t("interview") :
                   item.id === "roadmap" ? t("roadmap") :
                   item.id === "developer-roadmaps" ? t("devRoadmaps") :
                   item.id === "job-prep" ? t("jobPrep") :
                   item.id === "resume" ? t("resume") :
                   item.id === "portfolio" ? t("portfolio") :
                   item.id === "tools-directory" ? t("aiTools") :
                   item.id === "free-platforms" ? t("freePlatforms") :
                   item.id === "founders-prime" ? t("foundersPrime") :
                   item.id === "ai-chat" ? t("aiChat") :
                   item.id === "3d-lab" ? t("threeDLab") :
                   item.id === "about" ? t("about") :
                   item.id === "tcs-nqt" ? t("tcsNqt") :
                   item.id === "eamcet-home" ? t("eamcetHome") :
                   item.id === "eamcet-plans" ? t("eamcetPlans") :
                   item.id === "eamcet-practice" ? t("eamcetPractice") :
                   item.id === "eamcet-resources" ? t("eamcetResources") :
                   item.id === "eamcet-tips" ? t("eamcetTips") :
                   item.id === "eamcet-counseling" ? t("eamcetCounseling") :
                   item.id === "eamcet-profile" ? t("eamcetProfile") :
                   item.id === "free-problems-hub" ? t("studentPainSolver") :
                   item.id === "free-after10th" ? t("after10thGuide") :
                   item.id === "free-coding" ? t("codingCareers") :
                   item.id === "free-subjects" ? t("subjectResources") :
                   item.id === "free-textbooks" ? t("freeBooks") :
                   item.id === "free-simulations" ? t("interactiveTools") :
                   item.id === "free-dashboard" ? t("bookmarkShelf") :
                   item.label}
                </span>
                {isActive && (
                  <span className={`w-1.5 h-1.5 rounded-full absolute -bottom-1.5 left-1/2 -translate-x-1/2 animate-pulse ${dotBgClass}`} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
