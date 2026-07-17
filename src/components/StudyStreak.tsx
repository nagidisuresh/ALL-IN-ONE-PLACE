import React, { useState, useEffect } from "react";
import { Flame, Calendar, Award, CheckCircle2, Sparkles, PlusCircle, Info, RefreshCw } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion } from "motion/react";
import confetti from "canvas-confetti";

interface StudyStreakProps {
  className?: string;
}

export default function StudyStreak({ className = "" }: StudyStreakProps) {
  const { theme } = useTheme();
  const [history, setHistory] = useState<any[]>([]);
  const [completedDates, setCompletedDates] = useState<Set<string>>(new Set());
  const [streakStats, setStreakStats] = useState({
    currentStreak: 0,
    longestStreak: 0,
    totalSessions: 0,
    activeDaysCount: 0,
  });
  const [tooltipDay, setTooltipDay] = useState<{ dateStr: string; count: number; x: number; y: number } | null>(null);

  // Load nextroundprep_interview_history
  const loadStreakData = () => {
    const saved = localStorage.getItem("nextroundprep_interview_history");
    let parsedHistory: any[] = [];
    const dateCounts: Record<string, number> = {};
    const datesSet = new Set<string>();

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          parsedHistory = parsed;
          parsed.forEach((session: any) => {
            let sessionDate: Date;
            if (session.id && !isNaN(Number(session.id))) {
              sessionDate = new Date(Number(session.id));
            } else if (session.date) {
              sessionDate = new Date(session.date);
            } else {
              sessionDate = new Date();
            }

            // Adjust timezone to local date string
            const offset = sessionDate.getTimezoneOffset();
            const localDate = new Date(sessionDate.getTime() - offset * 60 * 1000);
            const dateStr = localDate.toISOString().split("T")[0];
            
            datesSet.add(dateStr);
            dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;
          });
        }
      } catch (e) {
        console.error("Failed to parse nextroundprep_interview_history", e);
      }
    }

    setHistory(parsedHistory);
    setCompletedDates(datesSet);

    // Calculate Streaks
    const sortedDates = Array.from(datesSet).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    let current = 0;
    let longest = 0;
    let tempStreak = 0;

    const todayStr = new Date().toISOString().split("T")[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    // Determine if streak is currently active (completed today or yesterday)
    const hasToday = datesSet.has(todayStr);
    const hasYesterday = datesSet.has(yesterdayStr);

    if (hasToday || hasYesterday) {
      let checkDate = hasToday ? new Date() : yesterday;
      let checkStr = checkDate.toISOString().split("T")[0];

      while (datesSet.has(checkStr)) {
        current++;
        checkDate.setDate(checkDate.getDate() - 1);
        checkStr = checkDate.toISOString().split("T")[0];
      }
    }

    // Calculate longest streak historically
    // To calculate longest, sort dates chronologically (oldest to newest)
    const chronoDates = Array.from(datesSet).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    if (chronoDates.length > 0) {
      let maxStreak = 0;
      let currentSeq = 0;
      let prevTime: number | null = null;

      chronoDates.forEach((dateStr) => {
        const currTime = new Date(dateStr).getTime();
        if (prevTime === null) {
          currentSeq = 1;
        } else {
          const diffDays = Math.round((currTime - prevTime) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            currentSeq++;
          } else if (diffDays > 1) {
            if (currentSeq > maxStreak) maxStreak = currentSeq;
            currentSeq = 1;
          }
        }
        prevTime = currTime;
      });
      if (currentSeq > maxStreak) maxStreak = currentSeq;
      longest = maxStreak;
    }

    // Set fallback if they are empty
    setStreakStats({
      currentStreak: Math.max(current, datesSet.size > 0 ? 1 : 0),
      longestStreak: Math.max(longest, current, datesSet.size > 0 ? 1 : 0),
      totalSessions: parsedHistory.length,
      activeDaysCount: datesSet.size,
    });
  };

  useEffect(() => {
    loadStreakData();

    // Listen to localstorage updates or sync polling
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "nextroundprep_interview_history") {
        loadStreakData();
      }
    };

    window.addEventListener("storage", handleStorage);
    const timer = setInterval(loadStreakData, 2000);

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(timer);
    };
  }, []);

  // Generate date grid for the last 12 weeks (84 days) ending today
  const generateGridDays = () => {
    const days = [];
    const now = new Date();
    
    // Start 83 days ago to have exactly 84 days (12 weeks * 7 days)
    for (let i = 83; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      
      // Determine if active
      const count = history.filter((item: any) => {
        let itemDate: Date;
        if (item.id && !isNaN(Number(item.id))) {
          itemDate = new Date(Number(item.id));
        } else if (item.date) {
          itemDate = new Date(item.date);
        } else {
          return false;
        }
        const offset = itemDate.getTimezoneOffset();
        const localItemDate = new Date(itemDate.getTime() - offset * 60 * 1000);
        return localItemDate.toISOString().split("T")[0] === dateStr;
      }).length;

      days.push({
        date: d,
        dateStr,
        count,
        label: d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
        dayOfWeek: d.getDay(),
      });
    }
    return days;
  };

  const gridDays = generateGridDays();

  // Add a simulation task completion to demonstrate live streak update!
  const simulateTaskCompletion = () => {
    const saved = localStorage.getItem("nextroundprep_interview_history") || "[]";
    try {
      const parsed = JSON.parse(saved);
      // Let's prompt a custom date or just default to today or a randomized day in the last 3 days
      const daysOffset = Math.floor(Math.random() * 3); // 0 (today), 1 (yesterday), or 2 (day before)
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() - daysOffset);

      const mockSession = {
        id: targetDate.getTime().toString(),
        title: "Practice Blitz Task Completed",
        role: "Full-Stack Software Engineer",
        date: targetDate.toISOString(),
        score: Math.floor(Math.random() * 20) + 80,
        feedback: "Excellent live response structure simulation! Keep learning.",
      };

      const updated = [mockSession, ...parsed];
      localStorage.setItem("nextroundprep_interview_history", JSON.stringify(updated));
      loadStreakData();

      // Fun micro feedback
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#a855f7", "#ec4899", "#22d3ee"],
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Reset simulated progress
  const clearSimulationHistory = () => {
    if (confirm("Reset local study progress history?")) {
      localStorage.removeItem("nextroundprep_interview_history");
      loadStreakData();
    }
  };

  return (
    <div className={`rounded-3xl border p-6 relative overflow-hidden transition-all duration-300 ${
      theme === "light"
        ? "bg-white border-slate-200/80 shadow-md shadow-slate-100/50"
        : "bg-gradient-to-b from-[#111029] to-[#090916] border-white/5 shadow-2xl"
    } ${className}`}>
      
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-bl from-purple-500/5 via-pink-500/5 to-transparent rounded-full filter blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Flame className="w-5 h-5 text-amber-500 animate-pulse fill-amber-500/20" />
            </div>
            <div>
              <h3 className={`text-base font-bold font-sans ${theme === "light" ? "text-slate-800" : "text-white"}`}>
                Your study consistency
              </h3>
              <p className="text-xs text-gray-400">
                Tracking mock interview preps, code sandboxes, & syllabus milestones.
              </p>
            </div>
          </div>
        </div>

        {/* Action button row */}
        <div className="flex items-center gap-2">
          <button
            onClick={simulateTaskCompletion}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-sans bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-all cursor-pointer"
            title="Add a mock practice session to test state persistence"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Complete Practice Session
          </button>
          
          {streakStats.totalSessions > 0 && (
            <button
              onClick={clearSimulationHistory}
              className="p-1.5 rounded-xl border border-white/5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
              title="Reset history"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Stats Summary Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
          theme === "light" ? "bg-slate-50 border-slate-100" : "bg-black/35 border-white/5"
        }`}>
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold block mb-1">Current Streak</span>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-black font-mono ${theme === "light" ? "text-slate-800" : "text-white"}`}>
              {streakStats.currentStreak}
            </span>
            <span className="text-[10px] text-amber-500 font-bold font-sans">Days 🔥</span>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
          theme === "light" ? "bg-slate-50 border-slate-100" : "bg-black/35 border-white/5"
        }`}>
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold block mb-1">Longest Streak</span>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-black font-mono ${theme === "light" ? "text-slate-800" : "text-white"}`}>
              {streakStats.longestStreak}
            </span>
            <span className="text-[10px] text-purple-400 font-bold font-sans">Days 🏆</span>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
          theme === "light" ? "bg-slate-50 border-slate-100" : "bg-black/35 border-white/5"
        }`}>
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold block mb-1">Active Days</span>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-black font-mono ${theme === "light" ? "text-slate-800" : "text-white"}`}>
              {streakStats.activeDaysCount}
            </span>
            <span className="text-[10px] text-cyan-400 font-bold font-sans">Total ⚡</span>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
          theme === "light" ? "bg-slate-50 border-slate-100" : "bg-black/35 border-white/5"
        }`}>
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold block mb-1">Total Tasks</span>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-black font-mono ${theme === "light" ? "text-slate-800" : "text-white"}`}>
              {streakStats.totalSessions}
            </span>
            <span className="text-[10px] text-pink-400 font-bold font-sans">Sessions 🎯</span>
          </div>
        </div>
      </div>

      {/* Date-Grid Container */}
      <div className="space-y-2 relative">
        <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
          <span>84 Days Ago ({new Date(Date.now() - 83*24*60*60*1000).toLocaleDateString("en-IN", {month: 'short', day: 'numeric'})})</span>
          <span>Today</span>
        </div>

        {/* Date Blocks Grid */}
        <div className="grid grid-cols-12 gap-1.5 bg-black/15 p-4 rounded-2xl border border-white/5 shadow-inner">
          {gridDays.map((day, idx) => {
            // Determine background heat levels
            let bgClass = "bg-white/[0.03] hover:bg-white/[0.1] border-white/[0.02]";
            if (theme === "light") {
              bgClass = "bg-slate-100 hover:bg-slate-200 border-slate-200/50";
            }

            if (day.count > 0) {
              if (day.count === 1) {
                bgClass = "bg-purple-500/40 hover:bg-purple-500/60 border-purple-500/55 shadow-[0_0_6px_rgba(168,85,247,0.3)]";
              } else if (day.count === 2) {
                bgClass = "bg-purple-500/70 hover:bg-purple-500/90 border-purple-500/80 shadow-[0_0_10px_rgba(168,85,247,0.5)]";
              } else {
                bgClass = "bg-gradient-to-br from-purple-500 to-pink-500 border-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.6)]";
              }
            }

            return (
              <div
                key={day.dateStr}
                className={`aspect-square rounded-md border flex items-center justify-center transition-all duration-200 cursor-pointer relative group ${bgClass}`}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const containerRect = e.currentTarget.parentElement?.getBoundingClientRect();
                  if (containerRect) {
                    setTooltipDay({
                      dateStr: day.label,
                      count: day.count,
                      x: rect.left - containerRect.left + rect.width / 2,
                      y: rect.top - containerRect.top - 36,
                    });
                  }
                }}
                onMouseLeave={() => setTooltipDay(null)}
              >
                {/* Visual spark for today block */}
                {day.dateStr === new Date().toISOString().split("T")[0] && (
                  <div className="absolute inset-0.5 rounded-sm border border-amber-400/80 animate-pulse pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

        {/* Floating Tooltip inside Grid container */}
        {tooltipDay && (
          <div
            style={{
              position: "absolute",
              left: `${tooltipDay.x}px`,
              top: `${tooltipDay.y}px`,
              transform: "translateX(-50%)",
            }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-sans font-bold shadow-xl border backdrop-blur-md transition-all z-20 whitespace-nowrap pointer-events-none ${
              theme === "light"
                ? "bg-white/95 border-slate-200 text-slate-800"
                : "bg-[#0c0b1a]/95 border-purple-500/30 text-white"
            }`}
          >
            {tooltipDay.dateStr}:{" "}
            <span className={tooltipDay.count > 0 ? "text-purple-400" : "text-gray-400"}>
              {tooltipDay.count === 0
                ? "No preps"
                : `${tooltipDay.count} task${tooltipDay.count > 1 ? "s" : ""} done`}
            </span>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-purple-500/10 border border-white/5 inline-block" />
            <span>0 Completed</span>
            <span className="w-2.5 h-2.5 rounded-sm bg-purple-500/40 border border-purple-500/50 inline-block ml-2" />
            <span>1 Session</span>
            <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-br from-purple-500 to-pink-500 inline-block ml-2" />
            <span>2+ Sessions</span>
          </div>
          <div className="flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-gray-600" />
            <span>Syncs with interview & mock compiler actions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
