import React, { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";
import { Roadmap, RoadmapStep } from "../types";
import { 
  Trophy, CheckCircle2, Circle, Sparkles, Map, 
  TrendingUp, Award, Compass, ArrowRight, Zap
} from "lucide-react";

interface UserProgressProps {
  onNavigateToRoadmap?: () => void;
}

const localTranslations = {
  en: {
    progressTitle: "Roadmap Progression",
    noActiveRoadmap: "No Active Roadmap Found",
    noActiveRoadmapDesc: "Generate or select a personalized career roadmap to begin tracking your milestones here.",
    buildRoadmapBtn: "Build Your Roadmap",
    completed: "Completed",
    milestones: "Milestones",
    nextMilestone: "Next Milestone",
    congrats: "All milestones completed! Outstanding work!",
    streakGlow: "Continuous progression boosts your learning index.",
    step: "Step",
  },
  hi: {
    progressTitle: "रोडमैप प्रगति",
    noActiveRoadmap: "कोई सक्रिय रोडमैप नहीं मिला",
    noActiveRoadmapDesc: "अपने मील के पत्थर को ट्रैक करना शुरू करने के लिए एक व्यक्तिगत करियर रोडमैप बनाएं या चुनें।",
    buildRoadmapBtn: "अपना रोडमैप बनाएं",
    completed: "पूरा किया",
    milestones: "मील के पत्थर",
    nextMilestone: "अगला मील का पत्थर",
    congrats: "सभी मील के पत्थर पूरे हो गए! उत्कृष्ट कार्य!",
    streakGlow: "लगातार प्रगति आपके सीखने के सूचकांक को बढ़ाती है।",
    step: "कदम",
  },
  te: {
    progressTitle: "రోడ్‌మ్యాప్ పురోగతి",
    noActiveRoadmap: "క్రియశీల రోడ్‌మ్యాప్ ఏదీ కనుగొనబడలేదు",
    noActiveRoadmapDesc: "ఇక్కడ మీ మైలురాళ్లను ట్రాక్ చేయడం ప్రారంభించడానికి వ్యక్తిగతీకరించిన కెరీర్ రోడ్‌మ్యాప్‌ను సృష్టించండి లేదా ఎంచుకోండి.",
    buildRoadmapBtn: "మీ రోడ్‌మ్యాప్‌ను రూపొందించండి",
    completed: "పూర్తయింది",
    milestones: "మైలురాళ్లు",
    nextMilestone: "తదుపరి మైలురాయి",
    congrats: "అన్ని మైలురాళ్లు విజయవంతంగా పూర్తయ్యాయి! అద్భుతమైన పని!",
    streakGlow: "నిరంతర పురోగతి మీ అభ్యాస సూచికను పెంచుతుంది.",
    step: "దశ",
  }
};

export default function UserProgress({ onNavigateToRoadmap }: UserProgressProps) {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  // Safely translate text
  const t = (key: keyof typeof localTranslations["en"]) => {
    const lang = (language as "en" | "hi" | "te") || "en";
    return localTranslations[lang]?.[key] || localTranslations["en"][key];
  };

  const loadRoadmap = () => {
    const saved = localStorage.getItem("nextroundprep_active_roadmap");
    if (saved) {
      try {
        const parsed: Roadmap = JSON.parse(saved);
        if (parsed && parsed.steps) {
          setRoadmap(parsed);
        }
      } catch (e) {
        console.error("Failed to parse roadmap in UserProgress", e);
      }
    } else {
      setRoadmap(null);
    }
  };

  // Initial load and listen for storage updates (e.g. from the active Roadmap tab)
  useEffect(() => {
    loadRoadmap();

    // Listen to local storage changes to keep synced in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "nextroundprep_active_roadmap") {
        loadRoadmap();
      }
    };

    // Check periodically since state changes inside same tab don't always fire storage events
    const interval = setInterval(loadRoadmap, 1000);

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (!roadmap || !roadmap.steps || roadmap.steps.length === 0) {
    return (
      <div className={`p-6 rounded-2xl border flex flex-col items-center justify-center text-center space-y-4 ${
        theme === "light"
          ? "bg-slate-50/50 border-slate-200"
          : "bg-white/[0.01] border-white/5"
      }`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          theme === "light" ? "bg-pink-100 text-pink-600" : "bg-pink-500/10 text-pink-400"
        }`}>
          <Compass className="w-6 h-6 animate-pulse" />
        </div>
        <div className="space-y-1">
          <h4 className={`text-sm font-bold tracking-tight uppercase font-mono ${
            theme === "light" ? "text-slate-800" : "text-white"
          }`}>
            {t("noActiveRoadmap")}
          </h4>
          <p className="text-[11px] text-gray-400 max-w-xs leading-relaxed">
            {t("noActiveRoadmapDesc")}
          </p>
        </div>
        {onNavigateToRoadmap && (
          <button
            type="button"
            onClick={onNavigateToRoadmap}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-lg shadow-pink-500/20 hover:opacity-95 transition-all cursor-pointer"
          >
            <Map className="w-3.5 h-3.5" />
            <span>{t("buildRoadmapBtn")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  // Calculate metrics
  const totalSteps = roadmap.steps.length;
  const completedSteps = roadmap.steps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedSteps / totalSteps) * 100) || 0;

  // Find next pending step
  const nextPendingStep = roadmap.steps.find((s) => !s.completed);

  // SVG Circle details
  const radius = 42;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const handleToggleStepLocal = (stepId: string) => {
    const updatedSteps = roadmap.steps.map((step) => {
      if (step.id === stepId) {
        const nextCompleted = !step.completed;
        return { 
          ...step, 
          completed: nextCompleted,
          completedAt: nextCompleted ? new Date().toISOString() : undefined
        };
      }
      return step;
    });

    const updatedRoadmap = { ...roadmap, steps: updatedSteps };
    setRoadmap(updatedRoadmap);
    localStorage.setItem("nextroundprep_active_roadmap", JSON.stringify(updatedRoadmap));
    window.dispatchEvent(new CustomEvent("update-user-points"));
  };

  return (
    <div className={`rounded-2xl border p-5 relative overflow-hidden transition-all ${
      theme === "light"
        ? "bg-white border-slate-200 shadow-sm"
        : "bg-white/[0.02] border-white/5"
    }`}>
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full filter blur-xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-pink-500" />
          <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${
            theme === "light" ? "text-slate-800" : "text-white"
          }`}>
            {t("progressTitle")}
          </h4>
        </div>
        <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
          theme === "light"
            ? "bg-slate-100 text-slate-600"
            : "bg-white/5 text-gray-400"
        }`}>
          {roadmap.title}
        </span>
      </div>

      {/* Grid: Circular Indicator + Text Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center mb-5">
        
        {/* Left Side: Circular SVG Progress */}
        <div className="sm:col-span-4 flex justify-center">
          <div className="relative flex items-center justify-center">
            {/* SVG Circle Graph */}
            <svg
              height={radius * 2}
              width={radius * 2}
              className="transform -rotate-90"
            >
              {/* Outer Background Circle */}
              <circle
                stroke={theme === "light" ? "#f1f5f9" : "rgba(255, 255, 255, 0.05)"}
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Foreground Progress Circle */}
              <circle
                stroke="url(#progressGlow)"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + " " + circumference}
                style={{ strokeDashoffset, transition: "stroke-dashoffset 0.6s ease" }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Gradients declaration inside SVG */}
              <defs>
                <linearGradient id="progressGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Percentage Tag */}
            <div className="absolute flex flex-col items-center">
              <span className={`text-lg font-black font-display tracking-tight ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}>
                {progressPercent}%
              </span>
              <span className="text-[7px] text-gray-500 font-bold uppercase tracking-widest font-mono">
                {t("completed")}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Metrics & Status Descriptions */}
        <div className="sm:col-span-8 space-y-2.5">
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-2.5 rounded-xl border ${
              theme === "light" ? "bg-slate-50 border-slate-100" : "bg-black/20 border-white/5"
            }`}>
              <span className="block text-[8px] font-bold text-gray-500 uppercase font-mono tracking-wider">{t("milestones")}</span>
              <h5 className={`text-base font-extrabold font-display ${
                theme === "light" ? "text-slate-800" : "text-white"
              }`}>
                {completedSteps} / {totalSteps}
              </h5>
            </div>
            
            <div className={`p-2.5 rounded-xl border ${
              theme === "light" ? "bg-slate-50 border-slate-100" : "bg-black/20 border-white/5"
            }`}>
              <span className="block text-[8px] font-bold text-gray-500 uppercase font-mono tracking-wider">LEVEL / TIMELINE</span>
              <h5 className={`text-xs font-bold leading-tight ${
                theme === "light" ? "text-slate-700" : "text-gray-300"
              }`}>
                {roadmap.level} · {roadmap.timeline}
              </h5>
            </div>
          </div>

          {/* Helper or streak info */}
          <p className="text-[10px] text-gray-400 font-mono leading-relaxed flex items-start gap-1">
            <Sparkles className="w-3 h-3 text-pink-500 shrink-0 mt-0.5" />
            <span>
              {progressPercent === 100 ? t("congrats") : t("streakGlow")}
            </span>
          </p>
        </div>
      </div>

      {/* Next Milestone preview & quick checker list */}
      <div className="border-t border-white/5 pt-4 space-y-3">
        {/* Milestone checklist header */}
        <span className="block text-[9px] font-bold text-gray-400 uppercase font-mono tracking-widest">
          {t("nextMilestone")} & Milestones Tracker
        </span>

        {/* Interactive Milestone Checkboxes */}
        <div className="space-y-2 max-h-44 overflow-y-auto custom-scrollbar pr-1">
          {roadmap.steps.map((step, idx) => (
            <div 
              key={step.id || idx}
              onClick={() => handleToggleStepLocal(step.id)}
              className={`group flex items-center justify-between p-2 rounded-xl border text-left cursor-pointer transition-all ${
                step.completed
                  ? theme === "light"
                    ? "bg-slate-50/80 border-slate-100 opacity-75"
                    : "bg-white/[0.01] border-white/5 opacity-60"
                  : theme === "light"
                    ? "bg-white border-slate-200 hover:border-pink-500/40"
                    : "bg-black/20 border-white/5 hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <button
                  type="button"
                  className="focus:outline-none transition-transform active:scale-95 shrink-0"
                >
                  {step.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-pink-500 fill-pink-500/10" />
                  ) : (
                    <Circle className={`w-4 h-4 transition-colors ${
                      theme === "light" ? "text-slate-300 group-hover:text-pink-500" : "text-white/15 group-hover:text-pink-400"
                    }`} />
                  )}
                </button>
                <div className="min-w-0">
                  <p className={`text-[11px] font-bold truncate transition-colors ${
                    step.completed
                      ? theme === "light" ? "text-slate-500 line-through" : "text-gray-500 line-through"
                      : theme === "light" ? "text-slate-800" : "text-white"
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-[9px] text-gray-500 font-mono">
                    {t("step")} {idx + 1} · {step.duration}
                  </p>
                </div>
              </div>
              <span className={`text-[8px] font-bold font-mono px-1.5 py-0.5 rounded ${
                step.completed
                  ? theme === "light" ? "bg-emerald-50 text-emerald-600" : "bg-emerald-500/10 text-emerald-400"
                  : theme === "light" ? "bg-slate-100 text-slate-500" : "bg-white/5 text-gray-400"
              }`}>
                {step.completed ? t("completed").toUpperCase() : "PENDING"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
