import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, Video, Map, Briefcase, FileText, Sparkles, 
  Compass, BookOpen, MessageSquare, Info, Award, Command, CornerDownLeft, X, Rocket, Box 
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setPlatformMode?: (mode: "career" | "eamcet" | "free-edu" | "remote-jobs" | "student-os" | "new-age-schools" | "learn-with-suresh") => void;
}

const COMMAND_ITEMS = [
  {
    id: "interview",
    label: "Interview Prep Simulator",
    description: "Launch mock interviews with AI voice simulations, real-time analytics, and topic mastery tracking.",
    icon: Video,
    color: "#ec4899", // pink
    category: "Tools"
  },
  {
    id: "roadmap",
    label: "Roadmap & Vertical Timeline",
    description: "Navigate curated skill trees, milestone quizzes, and check off recommended preparation micro-tasks.",
    icon: Map,
    color: "#a855f7", // purple
    category: "Tools"
  },
  {
    id: "job-prep",
    label: "Job Prep Companion",
    description: "Access practice sheets, salary estimators, and company behavioral interview question templates.",
    icon: Briefcase,
    color: "#f59e0b", // amber
    category: "Tools"
  },
  {
    id: "resume",
    label: "ATS Resume Builder",
    description: "Build an ATS-optimized professional resume with real-time suggestion prompts.",
    icon: FileText,
    color: "#22d3ee", // cyan
    category: "Tools"
  },
  {
    id: "portfolio",
    label: "Interactive Portfolio Creator",
    description: "Design and showcase your projects with an eye-safe, high-contrast, proof-of-work template.",
    icon: Sparkles,
    color: "#10b981", // emerald
    category: "Tools"
  },
  {
    id: "tools-directory",
    label: "AI Career Tools Directory",
    description: "Browse various specialized automated assistants, code debuggers, and text enhancers.",
    icon: Compass,
    color: "#6366f1", // indigo
    category: "Explore"
  },
  {
    id: "free-platforms",
    label: "Free Learning Platforms",
    description: "Connect instantly to 70+ elite free online courses and learning tracks across India.",
    icon: BookOpen,
    color: "#3b82f6", // blue
    category: "Explore"
  },
  {
    id: "founders-prime",
    label: "FoundersPrime Capital Directory",
    description: "Unlock $500k+ in cloud credits, SaaS deals, student edge bundles, and non-dilutive grants.",
    icon: Rocket,
    color: "#e11d48", // rose-red
    category: "Explore"
  },
  {
    id: "ai-chat",
    label: "AI Advisor Chat",
    description: "Consult our real-time smart virtual advisor for career direction, mock Q&A, and live feedback.",
    icon: MessageSquare,
    color: "#14b8a6", // teal
    category: "Support"
  },
  {
    id: "tcs-nqt",
    label: "TCS NQT Cockpit",
    description: "High-intensity competitive mock papers, diagnostic tracking, and aptitude prep tests.",
    icon: Award,
    color: "#e11d48", // rose
    category: "Exam Prep"
  },
  {
    id: "3d-lab",
    label: "3D Cinematic Lab",
    description: "Experience dynamic mouse-parallax lighting and copy premium CSS scroll-driven card reveal templates.",
    icon: Box,
    color: "#22d3ee", // cyan
    category: "Explore"
  },
  {
    id: "about",
    label: "About NextRoundPrep",
    description: "Learn about the core mission, problem definitions, and proof-of-work education philosophy.",
    icon: Info,
    color: "#94a3b8", // slate
    category: "General"
  }
];

export default function CommandPalette({ isOpen, onClose, activeTab, setActiveTab, setPlatformMode }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Filter command items
  const filteredItems = COMMAND_ITEMS.filter((item) => {
    const query = search.toLowerCase();
    return (
      item.label.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  });

  // Adjust selected index if it is out of bounds
  useEffect(() => {
    if (selectedIndex >= filteredItems.length) {
      setSelectedIndex(Math.max(0, filteredItems.length - 1));
    }
  }, [filteredItems, selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex].id);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  const handleSelect = (tabId: string) => {
    if (setPlatformMode) {
      if (tabId === "learn-with-suresh" || tabId.startsWith("learn-suresh-")) {
        setPlatformMode("learn-with-suresh");
        setActiveTab(tabId === "learn-with-suresh" ? "learn-suresh-home" : tabId);
      } else if (tabId.startsWith("eamcet-")) {
        setPlatformMode("eamcet");
        setActiveTab(tabId);
      } else if (tabId === "dashboard" || tabId === "calendar" || tabId === "task-manager") {
        setPlatformMode("student-os");
        setActiveTab(tabId);
      } else if (tabId.startsWith("new-age-schools-")) {
        setPlatformMode("new-age-schools");
        setActiveTab(tabId);
      } else if (tabId === "remote-dashboard") {
        setPlatformMode("remote-jobs");
        setActiveTab(tabId);
      } else if (tabId.startsWith("free-") || tabId === "free-platforms") {
        setPlatformMode("free-edu");
        setActiveTab(tabId);
      } else {
        setPlatformMode("career");
        setActiveTab(tabId);
      }
    } else {
      setActiveTab(tabId);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4">
          {/* Backdrop Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#05050a]/75 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Palette container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            ref={containerRef}
            className="w-full max-w-2xl bg-[#0f0e1a]/95 border border-white/10 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.15)] overflow-hidden flex flex-col relative z-50"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5 relative bg-black/20">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search tools, platforms, or resources... (e.g., 'resume', 'chat')"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-0 text-white placeholder-gray-500 focus:outline-none focus:ring-0 text-sm"
              />
              
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="hidden sm:inline-flex text-[9px] font-mono text-gray-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded uppercase">
                  ESC to close
                </span>
                <button 
                  onClick={onClose} 
                  className="p-1 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Results list */}
            <div className="max-h-[360px] overflow-y-auto p-2 space-y-1 scrollbar-thin">
              {filteredItems.length > 0 ? (
                (() => {
                  let lastCategory = "";
                  return filteredItems.map((item, idx) => {
                    const IconComponent = item.icon;
                    const isHighlighted = idx === selectedIndex;
                    const isActivePage = activeTab === item.id;
                    const showCategoryHeader = item.category !== lastCategory;
                    lastCategory = item.category;

                    return (
                      <React.Fragment key={item.id}>
                        {showCategoryHeader && (
                          <div className="px-3 pt-3 pb-1.5 text-[9px] font-bold font-mono tracking-wider text-gray-500 uppercase">
                            {item.category}
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => handleSelect(item.id)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`w-full text-left p-3 rounded-xl flex items-center justify-between gap-4 transition-all duration-150 select-none cursor-pointer ${
                            isHighlighted 
                              ? "bg-gradient-to-r from-[#171426] to-[#201d33] border-l-2 border-[#a855f7] pl-2.5" 
                              : "hover:bg-white/[0.01] border-l-2 border-transparent"
                          }`}
                        >
                          <div className="flex items-start gap-3.5 min-w-0">
                            {/* Icon with beautiful color theme */}
                            <div 
                              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all"
                              style={{ 
                                backgroundColor: isHighlighted ? `${item.color}15` : "rgba(255,255,255,0.02)",
                                borderColor: isHighlighted ? `${item.color}40` : "rgba(255,255,255,0.05)",
                                color: item.color
                              }}
                            >
                              <IconComponent className="w-4 h-4" />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold transition-colors ${isHighlighted ? "text-white" : "text-gray-200"}`}>
                                  {item.label}
                                </span>
                                {isActivePage && (
                                  <span className="text-[8px] font-mono font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20 uppercase shrink-0">
                                    Current
                                  </span>
                                )}
                              </div>
                              <p className="text-[10.5px] text-gray-400 truncate mt-0.5 max-w-[420px] sm:max-w-[480px]">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          {/* Interactive status indicators */}
                          <div className="flex items-center shrink-0">
                            {isHighlighted ? (
                              <div className="flex items-center gap-1 text-[9px] font-mono text-gray-400 bg-black/40 px-2 py-1 rounded border border-white/5">
                                <span>Go</span>
                                <CornerDownLeft className="w-2.5 h-2.5 text-[#a855f7]" />
                              </div>
                            ) : (
                              <Command className="w-3.5 h-3.5 text-gray-600" />
                            )}
                          </div>
                        </button>
                      </React.Fragment>
                    );
                  });
                })()
              ) : (
                <div className="py-12 text-center space-y-2">
                  <Command className="w-8 h-8 text-gray-600 mx-auto stroke-1 animate-bounce" />
                  <p className="text-xs font-semibold text-gray-300">No matching tools or resources found</p>
                  <p className="text-[10px] text-gray-500 font-mono">Try searching for simple words like "resume", "prep", or "ai".</p>
                </div>
              )}
            </div>

            {/* Visual Guide footer */}
            <div className="bg-black/40 border-t border-white/5 py-2.5 px-4 flex items-center justify-between text-[9px] text-gray-500 font-mono select-none">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="bg-white/5 border border-white/10 px-1 rounded">↑↓</span> Move
                </span>
                <span className="flex items-center gap-1">
                  <span className="bg-white/5 border border-white/10 px-1 rounded">Enter</span> Select
                </span>
                <span className="flex items-center gap-1">
                  <span className="bg-white/5 border border-white/10 px-1 rounded">Esc</span> Dismiss
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>Power Navigation</span>
                <Command className="w-3 h-3 text-[#a855f7]" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
