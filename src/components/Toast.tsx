import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Trophy, Sparkles, X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import confetti from "canvas-confetti";
import { useTheme } from "./ThemeProvider";

export type ToastType = "success" | "error" | "info" | "achievement";

export interface Toast {
  id: string;
  title: string;
  description: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (title: string, description: string, type?: ToastType, duration?: number) => void;
  showAchievement: (title: string, description: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const { theme } = useTheme();

  const showToast = (title: string, description: string, type: ToastType = "info", duration = 5000) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, title, description, type, duration }]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const showAchievement = (title: string, description: string) => {
    showToast(title, description, "achievement", 6000);
    // Burst beautiful celebration confetti!
    try {
      // Confetti burst pattern 1
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#a855f7", "#ec4899", "#22d3ee", "#f59e0b"]
      });
      
      // Secondary delayed burst for maximum delight
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#a855f7", "#ec4899", "#22d3ee"]
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#a855f7", "#ec4899", "#22d3ee"]
        });
      }, 350);
    } catch (e) {
      console.error("Failed to throw confetti", e);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Automated achievements trigger based on localStorage changes
  useEffect(() => {
    const checkAchievements = () => {
      const activeRoadmapStr = localStorage.getItem("nextroundprep_active_roadmap");
      const interviewHistoryStr = localStorage.getItem("nextroundprep_interview_history");
      
      const unlockedStr = localStorage.getItem("nextroundprep_unlocked_achievements") || "[]";
      let unlocked: string[] = [];
      try {
        unlocked = JSON.parse(unlockedStr);
      } catch (e) {
        unlocked = [];
      }

      let changed = false;

      // 1. Check Full Roadmap Completed
      if (activeRoadmapStr && !unlocked.includes("full_roadmap_completed")) {
        try {
          const parsed = JSON.parse(activeRoadmapStr);
          if (parsed && Array.isArray(parsed.steps) && parsed.steps.length > 0) {
            const allCompleted = parsed.steps.every((s: any) => s.completed);
            if (allCompleted) {
              unlocked.push("full_roadmap_completed");
              changed = true;
              showAchievement(
                "Milestone Champion",
                `Amazing job! You have fully completed every single milestone on the "${parsed.title || "active roadmap"}"!`
              );
            }
          }
        } catch (e) {
          console.error("Error evaluating roadmap achievement", e);
        }
      }

      // 2. Check 5 Interviews Completed
      if (interviewHistoryStr && !unlocked.includes("five_interviews_completed")) {
        try {
          const parsed = JSON.parse(interviewHistoryStr);
          if (Array.isArray(parsed) && parsed.length >= 5) {
            unlocked.push("five_interviews_completed");
            changed = true;
            showAchievement(
              "Interview Specialist",
              "Incredible commitment! You've polished your skills by completing 5 mock interview sessions!"
            );
          }
        } catch (e) {
          console.error("Error evaluating interview achievement", e);
        }
      }

      if (changed) {
        localStorage.setItem("nextroundprep_unlocked_achievements", JSON.stringify(unlocked));
        // Force state sync event
        window.dispatchEvent(new Event("storage"));
      }
    };

    // Run check immediately and then poll to respond to user actions
    checkAchievements();
    const interval = setInterval(checkAchievements, 1500);

    const handleStorage = (e: StorageEvent) => {
      if (
        e.key === "nextroundprep_active_roadmap" ||
        e.key === "nextroundprep_interview_history"
      ) {
        checkAchievements();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, showAchievement }}>
      {children}
      
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-100 flex flex-col gap-3 max-w-sm w-[calc(100vw-40px)] pointer-events-none" id="toast-container-root">
        <AnimatePresence>
          {toasts.map((toast) => {
            const isAchievement = toast.type === "achievement";
            
            // Theme colors
            let containerBg = theme === "light" 
              ? "bg-white/95 border-slate-200/80 shadow-md shadow-slate-200/50 text-slate-800" 
              : "bg-[#0b0a14]/95 border-white/10 text-white";
            
            if (isAchievement) {
              containerBg = "bg-gradient-to-r from-[#1c0f38] via-[#120724] to-[#0a0514] border-purple-500/30 text-white shadow-purple-900/10";
            } else if (toast.type === "success") {
              containerBg = theme === "light"
                ? "bg-emerald-50/95 border-emerald-200 shadow-md text-emerald-900"
                : "bg-[#0b1410]/95 border-emerald-500/20 text-white";
            } else if (toast.type === "error") {
              containerBg = theme === "light"
                ? "bg-rose-50/95 border-rose-200 shadow-md text-rose-900"
                : "bg-[#140b0b]/95 border-rose-500/20 text-white";
            }

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, y: -20, transition: { duration: 0.2 } }}
                layout
                className="pointer-events-auto w-full"
              >
                <div className={`p-4 rounded-2xl border backdrop-blur-md shadow-xl flex gap-3.5 items-start relative overflow-hidden group transition-all duration-300 ${containerBg}`}>
                  
                  {/* Glowing background animation for Achievement */}
                  {isAchievement && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 via-pink-500/5 to-transparent pointer-events-none animate-pulse" />
                  )}
                  
                  {/* Icon Container */}
                  <div className={`p-2 rounded-xl flex items-center justify-center shrink-0 ${
                    isAchievement
                      ? "bg-purple-500/20 border border-purple-500/30 text-purple-400"
                      : toast.type === "success"
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500"
                      : toast.type === "error"
                      ? "bg-rose-500/10 border border-rose-500/20 text-rose-500"
                      : "bg-cyan-500/10 border border-cyan-500/20 text-cyan-500"
                  }`}>
                    {isAchievement ? (
                      <Trophy className="w-5 h-5 text-purple-400 animate-bounce" />
                    ) : toast.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : toast.type === "error" ? (
                      <AlertCircle className="w-5 h-5" />
                    ) : (
                      <Sparkles className="w-5 h-5" />
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0 pr-4">
                    <p className={`font-mono text-[9px] uppercase tracking-widest font-bold ${
                      isAchievement ? "text-purple-400" : "text-gray-500"
                    }`}>
                      {isAchievement ? "Achievement Unlocked!" : toast.type === "info" ? "Notification" : toast.type}
                    </p>
                    <h4 className={`font-sans font-extrabold text-sm tracking-tight mt-0.5 leading-snug ${
                      theme === "light" && !isAchievement ? "text-slate-900" : "text-white"
                    }`}>
                      {toast.title}
                    </h4>
                    <p className={`text-xs mt-1 leading-relaxed ${
                      theme === "light" && !isAchievement ? "text-slate-600" : "text-gray-300"
                    }`}>
                      {toast.description}
                    </p>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="p-1 rounded-lg text-gray-500 hover:text-gray-200 hover:bg-white/5 transition-colors cursor-pointer shrink-0 absolute top-3 right-3"
                    aria-label="Dismiss notification"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  {/* Progress bar loader at bottom */}
                  <div className="absolute bottom-0 left-0 h-[3px] bg-black/10 w-full">
                    <motion.div
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: (toast.duration || 5000) / 1000, ease: "linear" }}
                      className={`h-full ${
                        isAchievement
                          ? "bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500"
                          : toast.type === "success"
                          ? "bg-emerald-500"
                          : toast.type === "error"
                          ? "bg-rose-500"
                          : "bg-cyan-500"
                      }`}
                    />
                  </div>

                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </ToastContext.Provider>
  );
}
