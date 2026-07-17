import React, { useState, useEffect } from "react";
import { 
  X, User, Mail, Briefcase, Award, FileText, TrendingUp, Zap, 
  Flame, Target, Activity, CheckCircle, Save, Sparkles, Sliders, Phone, Trophy,
  ChevronDown, ChevronUp, Download, Trash2, AlertTriangle, History, Clock, BookOpen,
  Crown, Medal, Lock, Share2, Copy, Plus, Compass, Map
} from "lucide-react";
import UserProgress from "./UserProgress";
import ProgressOverviewChart from "./ProgressOverviewChart";
import { premadeRoadmaps } from "./premadeRoadmaps";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

interface ProfileDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string };
  onUserUpdate: (updated: { name: string; email: string }) => void;
  onNavigateToRoadmap?: () => void;
  userPoints?: number;
}

interface ProfileExtras {
  targetRole: string;
  targetIndustry: string;
  experienceLevel: string;
  prepGoals: string;
  phone?: string;
  gender?: string;
  age?: string;
}

const pointBadges = [
  {
    name: "Novice Challenger",
    pointsRequired: 0,
    description: "Embark on your interview preparation journey and set up your candidate profile.",
    icon: User,
    colorClass: "from-blue-500/10 via-indigo-500/5 to-transparent border-blue-500/30 text-blue-400 hover:border-blue-500/50",
    glowClass: "shadow-[0_0_15px_rgba(59,130,246,0.1)]",
    iconBg: "bg-blue-500/20 text-blue-400"
  },
  {
    name: "Apprentice Prep",
    pointsRequired: 150,
    description: "Build initial momentum with basic roadmap milestones and profile activation.",
    icon: BookOpen,
    colorClass: "from-cyan-500/10 via-teal-500/5 to-transparent border-cyan-500/30 text-cyan-400 hover:border-cyan-500/50",
    glowClass: "shadow-[0_0_15px_rgba(6,182,212,0.1)]",
    iconBg: "bg-cyan-500/20 text-cyan-400"
  },
  {
    name: "Consistent Learner",
    pointsRequired: 300,
    description: "Demonstrate continuous study habits, maintain streak days and clear roadmap checkpoints.",
    icon: Flame,
    colorClass: "from-orange-500/10 via-red-500/5 to-transparent border-orange-500/30 text-orange-400 hover:border-orange-500/50",
    glowClass: "shadow-[0_0_15px_rgba(249,115,22,0.1)]",
    iconBg: "bg-orange-500/20 text-orange-400"
  },
  {
    name: "STAR Practitioner",
    pointsRequired: 500,
    description: "Master the core STAR structure (Situation, Task, Action, Result) in response design.",
    icon: Target,
    colorClass: "from-purple-500/10 via-pink-500/5 to-transparent border-purple-500/30 text-purple-400 hover:border-purple-500/50",
    glowClass: "shadow-[0_0_15px_rgba(168,85,247,0.1)]",
    iconBg: "bg-purple-500/20 text-purple-400"
  },
  {
    name: "Elite Candidate",
    pointsRequired: 750,
    description: "Earn high score ratings and speech delivery clarity above standard expectations.",
    icon: Medal,
    colorClass: "from-pink-500/10 via-rose-500/5 to-transparent border-pink-500/30 text-pink-400 hover:border-pink-500/50",
    glowClass: "shadow-[0_0_15px_rgba(236,72,153,0.1)]",
    iconBg: "bg-pink-500/20 text-pink-400"
  },
  {
    name: "Interview Master",
    pointsRequired: 1000,
    description: "Unlocks the ultimate capability status for 1000+ points by excelling in multi-round loops.",
    icon: Trophy,
    colorClass: "from-amber-500/10 via-yellow-500/5 to-transparent border-amber-500/30 text-amber-400 hover:border-amber-500/50",
    glowClass: "shadow-[0_0_15px_rgba(245,158,11,0.15)]",
    iconBg: "bg-amber-500/20 text-amber-400"
  },
  {
    name: "NextRound Grandmaster",
    pointsRequired: 1500,
    description: "Reach the absolute zenith of preparation, showing total mastery over stressful technical domains.",
    icon: Crown,
    colorClass: "from-rose-500/10 via-purple-500/5 to-transparent border-rose-500/30 text-rose-400 hover:border-rose-500/50",
    glowClass: "shadow-[0_0_15px_rgba(244,63,94,0.15)]",
    iconBg: "bg-rose-500/20 text-rose-400"
  }
];

export default function ProfileDashboardModal({ isOpen, onClose, user, onUserUpdate, onNavigateToRoadmap, userPoints = 0 }: ProfileDashboardModalProps) {
  const [activeSubTab, setActiveSubTab] = useState<"info" | "performance" | "achievements" | "roadmap">("info");
  
  // Active Roadmap State for Interactive Node Visualization
  const [activeRoadmap, setActiveRoadmap] = useState<any | null>(null);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const [roadmapQuizState, setRoadmapQuizState] = useState<Record<string, { selectedOption: number; isSubmitted: boolean; isCorrect: boolean }>>({});

  // Profile Fields State
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [targetRole, setTargetRole] = useState("Software Engineer");
  const [targetIndustry, setTargetIndustry] = useState("Technology & SaaS");
  const [experienceLevel, setExperienceLevel] = useState("Mid-Level");
  const [prepGoals, setPrepGoals] = useState("Master behavior structure and get a job at Google.");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  
  // Save Feedback state
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [activeBadge, setActiveBadge] = useState<string>("Novice Challenger");
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  // Daily goals state
  const [dailyGoals, setDailyGoals] = useState<{ id: string; text: string; completed: boolean }[]>(() => {
    const saved = localStorage.getItem("nextroundprep_daily_goals");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse daily goals", e);
      }
    }
    return [
      { id: "1", text: "Complete 1 AI Mock Interview", completed: false },
      { id: "2", text: "Review interview pacing & word depth feedback", completed: false },
      { id: "3", text: "Complete a roadmap milestone or syllabus topic", completed: false },
    ];
  });
  const [newGoalText, setNewGoalText] = useState("");

  useEffect(() => {
    localStorage.setItem("nextroundprep_daily_goals", JSON.stringify(dailyGoals));
  }, [dailyGoals]);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;
    const newGoal = {
      id: Date.now().toString(),
      text: newGoalText.trim(),
      completed: false
    };
    setDailyGoals(prev => [...prev, newGoal]);
    setNewGoalText("");
  };

  const handleToggleGoal = (id: string) => {
    setDailyGoals(prev => prev.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const handleDeleteGoal = (id: string) => {
    setDailyGoals(prev => prev.filter(g => g.id !== id));
  };

  const handleResetGoals = () => {
    const defaults = [
      { id: "1", text: "Complete 1 AI Mock Interview", completed: false },
      { id: "2", text: "Review interview pacing & word depth feedback", completed: false },
      { id: "3", text: "Complete a roadmap milestone or syllabus topic", completed: false },
    ];
    setDailyGoals(defaults);
  };

  const handleShareProgress = () => {
    // Calculate badges unlocked
    let badgeCount = 0;
    if (stats.totalSessions >= 5) badgeCount++;
    if (stats.streak >= 3) badgeCount++;
    if (stats.starScore >= 80) badgeCount++;
    if (stats.totalSessions > 0 && stats.avgWpm >= 110 && stats.avgWpm <= 150) badgeCount++;
    if (stats.avgScore >= 85) badgeCount++;
    if (userPoints && (userPoints >= 300 || stats.completedInterviews.some((session: any) => session.role?.includes("Voice")))) badgeCount++;

    const base64Email = email ? btoa(email).substring(0, 10) : "guest";
    const shareUrl = `${window.location.origin}/share/candidate?id=${base64Email}&streak=${stats.streak || 0}&xp=${userPoints || 0}&badges=${badgeCount}&rating=${stats.avgScore || 0}`;
    
    const shareText = `🚀 NextRoundPrep Profile Accomplishments:
👤 Candidate: ${name}
🔥 Current Practice Streak: ${stats.streak || 0} Days
⭐ Overall Rating Score: ${stats.avgScore || 0}%
🏆 Earned Badges: ${badgeCount} Unlocked
⚡ Total Experience: ${userPoints || 0} XP

Check out my public profile & achievements link:
${shareUrl}

Practice mock interviews and land your dream offer with NextRoundPrep!`;

    navigator.clipboard.writeText(shareText).then(() => {
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 3000);
    }).catch((err) => {
      console.error("Could not copy progress to clipboard", err);
    });
  };

  useEffect(() => {
    const savedActiveBadge = localStorage.getItem("nextroundprep_active_badge");
    if (savedActiveBadge) {
      setActiveBadge(savedActiveBadge);
    } else {
      // Default based on current points
      const eligible = pointBadges.filter(b => userPoints >= b.pointsRequired);
      if (eligible.length > 0) {
        setActiveBadge(eligible[eligible.length - 1].name);
      }
    }
  }, [isOpen, userPoints]);

  const handleSelectActiveBadge = (badgeName: string) => {
    localStorage.setItem("nextroundprep_active_badge", badgeName);
    setActiveBadge(badgeName);
    window.dispatchEvent(new CustomEvent("update-active-badge", { detail: badgeName }));
  };

  // Listen and sync achievements
  useEffect(() => {
    const loadAchievements = () => {
      const unlockedStr = localStorage.getItem("nextroundprep_unlocked_achievements") || "[]";
      try {
        setUnlockedAchievements(JSON.parse(unlockedStr));
      } catch (e) {
        setUnlockedAchievements([]);
      }
    };
    loadAchievements();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "nextroundprep_unlocked_achievements" || e.key === null) {
        loadAchievements();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    // Poll achievements state in modal
    const pollInterval = setInterval(loadAchievements, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(pollInterval);
    };
  }, [isOpen]);

  // Performance metrics state
  const [stats, setStats] = useState({
    avgScore: 0,
    totalSessions: 0,
    streak: 0,
    avgWpm: 140, // standard default pacing
    starScore: 0,
    pacingLabel: "Optimal",
    completedInterviews: [] as any[]
  });

  // Load profile extras & real-time stats from local storage
  useEffect(() => {
    if (!isOpen) return;

    // Load extra info
    const savedExtras = localStorage.getItem("nextroundprep_profile_extras");
    if (savedExtras) {
      try {
        const parsed = JSON.parse(savedExtras);
        if (parsed.targetRole) setTargetRole(parsed.targetRole);
        if (parsed.targetIndustry) setTargetIndustry(parsed.targetIndustry);
        if (parsed.experienceLevel) setExperienceLevel(parsed.experienceLevel);
        if (parsed.prepGoals) setPrepGoals(parsed.prepGoals);
        setPhone(parsed.phone || "");
        setGender(parsed.gender || "");
        setAge(parsed.age || "");
      } catch (e) {
        console.error("Failed to parse profile extras", e);
      }
    }

    // Load actual interview history stats
    const savedHistory = localStorage.getItem("nextroundprep_interview_history");
    const savedStreak = localStorage.getItem("nextroundprep_streak");
    let computedScore = 0;
    let completedCount = 0;
    let computedStreak = parseInt(savedStreak || "0", 10);
    let totalWpm = 0;
    let wpmCount = 0;
    let totalStar = 0;
    let starCount = 0;
    let historyList: any[] = [];

    if (savedHistory) {
      try {
        historyList = JSON.parse(savedHistory);
        if (Array.isArray(historyList) && historyList.length > 0) {
          completedCount = historyList.length;
          
          let totalScore = 0;
          historyList.forEach((session) => {
            totalScore += (session.avgScore || 0);
            
            // Loop feedbaks for pacing/STAR
            if (session.feedbacks) {
              session.feedbacks.forEach((fb: any) => {
                if (fb.wpm) {
                  totalWpm += fb.wpm;
                  wpmCount++;
                }
                if (fb.starAdherence !== undefined) {
                  totalStar += fb.starAdherence;
                  starCount++;
                } else {
                  // Fallback simulation
                  totalStar += (fb.score || 80);
                  starCount++;
                }
              });
            }
          });

          computedScore = Math.round(totalScore / completedCount);
        }
      } catch (e) {
        console.error("Failed to parse history in profile", e);
      }
    }

    if (computedStreak === 0 && completedCount > 0) {
      computedStreak = 3; // starter streak
    }

    const finalWpm = wpmCount > 0 ? Math.round(totalWpm / wpmCount) : 138;
    const finalStar = starCount > 0 ? Math.round(totalStar / starCount) : (completedCount > 0 ? 82 : 0);

    let pacingLabel = "Optimal (130-150 WPM)";
    if (finalWpm < 110) pacingLabel = "Slow (< 110 WPM)";
    else if (finalWpm >= 110 && finalWpm < 130) pacingLabel = "Deliberate (110-130 WPM)";
    else if (finalWpm > 150) pacingLabel = "Fast (> 150 WPM)";

    setStats({
      avgScore: computedScore,
      totalSessions: completedCount,
      streak: computedStreak,
      avgWpm: finalWpm,
      starScore: finalStar,
      pacingLabel,
      completedInterviews: historyList
    });

    // Reset feedback
    setSaveSuccess(false);
  }, [isOpen, user]);

  // Sync the active roadmap in real-time
  useEffect(() => {
    if (!isOpen) return;

    const fetchActiveRoadmap = () => {
      const saved = localStorage.getItem("nextroundprep_active_roadmap");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.steps && parsed.steps.length > 0) {
            setActiveRoadmap(parsed);
            return;
          }
        } catch (e) {
          console.error("Error parsing roadmap in modal", e);
        }
      }
      
      // If no active roadmap is saved, load the matching premade roadmap based on user's targetRole or fallback
      const premadeKeys = Object.keys(premadeRoadmaps);
      const matchedKey = premadeKeys.find(
        key => key.toLowerCase().includes(targetRole.toLowerCase())
      ) || "Frontend Developer";
      
      setActiveRoadmap(premadeRoadmaps[matchedKey] || premadeRoadmaps["Frontend Developer"]);
    };

    fetchActiveRoadmap();

    // Event listener for storage changes across windows
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "nextroundprep_active_roadmap") {
        fetchActiveRoadmap();
      }
    };

    // Periodic check since some state updates on same window don't fire "storage" events
    const intervalId = setInterval(fetchActiveRoadmap, 1000);

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(intervalId);
    };
  }, [isOpen, targetRole]);

  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(null);

  const downloadReportFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadHistoricalSessionReport = (entry: any) => {
    if (!entry || !entry.feedbacks || entry.feedbacks.length === 0) return;
    
    let mdContent = `# NextRoundPrep - Full Session Mock Interview Summary Report
    
**Role Profile:** ${entry.role}
**Interview Type:** ${entry.type}
**Level:** ${entry.level}
**Target Field:** ${entry.field}
**Session Date:** ${entry.date || entry.timestamp}
**Total Questions Evaluated:** ${entry.feedbacks.length}
**Average Overall Performance:** ${entry.avgScore || 0}%

---

## 🏆 Overall Performance Summary
${entry.feedbacks.map((item: any, idx: number) => `- **Question ${idx + 1}**: ${item.feedback?.overallScore || item.score || 0}% ("${item.question.substring(0, 60)}${item.question.length > 60 ? "..." : ""}")`).join("\n")}

---

## 🔍 Detailed Question Breakdowns
`;

    entry.feedbacks.forEach((item: any, idx: number) => {
      const fb = item.feedback || {};
      const totalFillers = fb.fillerWords ? fb.fillerWords.reduce((sum: number, f: any) => sum + f.count, 0) : 0;
      const fillerDetails = fb.fillerWords ? fb.fillerWords.map((f: any) => `- **${f.word}**: ${f.count} count(s)`).join("\n") : "";
      
      mdContent += `
### Question ${idx + 1}: "${item.question}"

- **Overall Score:** ${fb.overallScore || item.score || 0}%
- **Response Relevance (Content):** ${fb.contentScore || 0}%
- **STAR Structure Score:** ${fb.structureScore || 0}%
- **Delivery Confidence Score:** ${fb.confidenceScore || 0}%
- **Speaking Pace:** ${fb.speakingPace || 130} WPM (${fb.paceRating || "Optimal"})
- **Filler Words:** ${totalFillers} detected
${fillerDetails ? `\n**Filler Words Breakdown:**\n${fillerDetails}\n` : ""}

#### ⭐️ Strengths
${fb.strengths ? fb.strengths.map((str: any) => `- ${str}`).join("\n") : "- Confident speaking delivery and relevant answers."}

#### ⚠️ Areas for Improvement
${fb.improvements ? fb.improvements.map((imp: any) => `- ${imp}`).join("\n") : "- Build structure using distinct STAR elements."}

#### 💡 Suggested Ideal Response (STAR)
${fb.modelAnswer || "Focus response on STAR elements (Situation, Task, Action, Result) to maximize score."}

---
`;
    });

    mdContent += `\n*Generated by NextRoundPrep - Practice interviews, land the offer.*\n`;

    downloadReportFile(mdContent, `NextRoundPrep_Session_Report_${entry.id}.md`);
  };

  const deleteHistoryEntry = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this mock interview session log?")) return;
    try {
      const savedHistory = localStorage.getItem("nextroundprep_interview_history");
      if (savedHistory) {
        const historyList = JSON.parse(savedHistory);
        const updated = historyList.filter((item: any) => item.id !== id);
        localStorage.setItem("nextroundprep_interview_history", JSON.stringify(updated));
        
        // Trigger storage event to update everything else
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new CustomEvent("update-user-points"));
        
        // Re-run the calculations or update state local to modal
        const computedCount = updated.length;
        let totalScore = 0;
        let computedStreak = stats.streak;
        let totalWpm = 0;
        let wpmCount = 0;
        let totalStar = 0;
        let starCount = 0;

        updated.forEach((session: any) => {
          totalScore += (session.avgScore || 0);
          if (session.feedbacks) {
            session.feedbacks.forEach((fb: any) => {
              if (fb.wpm) {
                totalWpm += fb.wpm;
                wpmCount++;
              }
              if (fb.starAdherence !== undefined) {
                totalStar += fb.starAdherence;
                starCount++;
              } else {
                totalStar += (fb.score || 80);
                starCount++;
              }
            });
          }
        });

        const computedScore = computedCount > 0 ? Math.round(totalScore / computedCount) : 0;
        const finalWpm = wpmCount > 0 ? Math.round(totalWpm / wpmCount) : 138;
        const finalStar = starCount > 0 ? Math.round(totalStar / starCount) : 0;

        let pacingLabel = "Optimal (130-150 WPM)";
        if (finalWpm < 110) pacingLabel = "Slow (< 110 WPM)";
        else if (finalWpm >= 110 && finalWpm < 130) pacingLabel = "Deliberate (110-130 WPM)";
        else if (finalWpm > 150) pacingLabel = "Fast (> 150 WPM)";

        setStats({
          avgScore: computedScore,
          totalSessions: computedCount,
          streak: computedStreak,
          avgWpm: finalWpm,
          starScore: finalStar,
          pacingLabel,
          completedInterviews: updated
        });

        if (expandedHistoryId === id) setExpandedHistoryId(null);
      }
    } catch (err) {
      console.error("Failed to delete history entry:", err);
    }
  };

  if (!isOpen) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save primary info
    onUserUpdate({ name, email });

    // Save extra info
    const extras: ProfileExtras = {
      targetRole,
      targetIndustry,
      experienceLevel,
      prepGoals,
      phone,
      gender,
      age
    };
    localStorage.setItem("nextroundprep_profile_extras", JSON.stringify(extras));

    // Sync to Firestore if authenticated
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        await setDoc(userRef, {
          name,
          email,
          ...extras
        }, { merge: true });
      }
    } catch (err) {
      console.error("Failed to sync profile update to Firestore", err);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const totalGoals = dailyGoals.length;
  const completedGoals = dailyGoals.filter(g => g.completed).length;
  const completionPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  // SVG dimensions & calculations
  const radius = 36;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Main Glass Modal */}
      <div className="relative w-full max-w-3xl rounded-[24px] bg-[#15141f] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col max-h-[90vh] text-left">
        {/* Decorative ambient background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-tr from-[#ec4899]/10 to-[#a855f7]/10 rounded-full filter blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ec4899] to-[#a855f7] flex items-center justify-center text-white shrink-0 shadow-lg shadow-pink-500/10">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Candidate Dashboard & Profile</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">Customize preparation criteria and monitor your interview capability rating.</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-navigation Tab Selector */}
        <div className="px-6 bg-black/20 border-b border-white/5 flex gap-6 relative z-10 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveSubTab("info")}
            className={`py-3 text-xs font-bold uppercase tracking-wider font-mono border-b-2 transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSubTab === "info" 
                ? "border-[#ec4899] text-white" 
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#ec4899]" />
            Personal Profile Info
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("performance")}
            className={`py-3 text-xs font-bold uppercase tracking-wider font-mono border-b-2 transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSubTab === "performance" 
                ? "border-[#ec4899] text-white" 
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#22d3ee]" />
            Performance & Stats
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("achievements")}
            className={`py-3 text-xs font-bold uppercase tracking-wider font-mono border-b-2 transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSubTab === "achievements" 
                ? "border-[#ec4899] text-white" 
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            Achievements & Badges
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("roadmap")}
            className={`py-3 text-xs font-bold uppercase tracking-wider font-mono border-b-2 transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSubTab === "roadmap" 
                ? "border-[#ec4899] text-white" 
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-pink-500" />
            Interactive Roadmap
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 relative z-10">
          {/* TAB 1: Personal Profile Fields Setup ("Ask Information") */}
          {activeSubTab === "info" && (
            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-1">
                    <User className="w-3 h-3 text-[#ec4899]" /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full glass-input bg-[#11101c] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 outline-none"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#22d3ee]" /> Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full glass-input bg-[#11101c] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 outline-none"
                    placeholder="Enter email address"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-1">
                    <Phone className="w-3 h-3 text-pink-400" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full glass-input bg-[#11101c] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 outline-none"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-1">
                    <User className="w-3 h-3 text-[#a855f7]" /> Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full glass-input bg-[#11101c] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                {/* Age */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-1">
                    <Activity className="w-3 h-3 text-emerald-400" /> Age (Years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full glass-input bg-[#11101c] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 outline-none"
                    placeholder="Enter your age"
                  />
                </div>

                {/* Target Role */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-[#a855f7]" /> Target Role / Job Title
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full glass-input bg-[#11101c] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 outline-none"
                    placeholder="e.g. Senior Frontend Engineer"
                  />
                </div>

                {/* Target Industry */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-1">
                    <Target className="w-3 h-3 text-emerald-400" /> Target Field / Industry
                  </label>
                  <input
                    type="text"
                    value={targetIndustry}
                    onChange={(e) => setTargetIndustry(e.target.value)}
                    className="w-full glass-input bg-[#11101c] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 outline-none"
                    placeholder="e.g. AI & Robotics, FinTech"
                  />
                </div>

                {/* Experience Level Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-500" /> Experience Level
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full glass-input bg-[#11101c] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="Entry-Level">Entry-Level / College Graduate</option>
                    <option value="Junior">Junior Candidate (1-2 Years)</option>
                    <option value="Mid-Level">Mid-Level Engineer/Professional (3-5 Years)</option>
                    <option value="Senior">Senior Professional (6-10 Years)</option>
                    <option value="Lead-Staff">Lead / Staff / Director (10+ Years)</option>
                  </select>
                </div>

                {/* Preparation Goals / Bio */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-1">
                    <FileText className="w-3 h-3 text-pink-400" /> Target Goals & Bio
                  </label>
                  <textarea
                    rows={3}
                    value={prepGoals}
                    onChange={(e) => setPrepGoals(e.target.value)}
                    className="w-full glass-input bg-[#11101c] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 outline-none resize-none"
                    placeholder="e.g. Master response structuring under stress, reduce filler words, and stand out in FAANG interviews."
                  />
                </div>
              </div>

              {/* Status Feedbacks and Save Controls */}
              <div className="pt-2 flex items-center justify-between gap-4">
                {saveSuccess ? (
                  <span className="text-emerald-400 font-bold font-mono text-[10px] flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/20 px-3 py-1.5 rounded-xl animate-fade-in">
                    <CheckCircle className="w-3.5 h-3.5" /> PROFILE UPDATED SUCCESSFULLY!
                  </span>
                ) : (
                  <span className="text-gray-500 text-[10px] font-mono">
                    Changes sync back instantly to your candidate leaderboard.
                  </span>
                )}

                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#ec4899] to-[#a855f7] hover:opacity-95 text-white font-extrabold text-xs py-2.5 px-5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#ec4899]/10"
                >
                  <Save className="w-4 h-4" />
                  Save Dashboard Profile
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Performance Dashboard Stats ("What is the performance") */}
          {activeSubTab === "performance" && (
            <div className="space-y-6">
              {/* Share Progress and Header bar */}
              <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Performance & Analytics</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Track your preparation capability, earn XP, and unlock milestones.</p>
                </div>
                <button
                  type="button"
                  onClick={handleShareProgress}
                  className={`font-bold font-mono text-[10.5px] px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border shadow-sm ${
                    showCopiedToast
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-[#a855f7]/10 hover:bg-[#a855f7]/20 border-[#a855f7]/20 hover:border-[#a855f7]/40 text-purple-400 hover:text-purple-300"
                  }`}
                >
                  {showCopiedToast ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      Public Link Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                      Share Progress
                    </>
                  )}
                </button>
              </div>

              {/* Gamified XP and Level Banner */}
              <div className="bg-gradient-to-r from-amber-500/10 via-[#a855f7]/10 to-transparent border border-amber-500/15 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_0_20px_rgba(245,158,11,0.05)] relative overflow-hidden">
                {/* Sparkle background element */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
                  <Sparkles className="w-24 h-24 text-amber-400" />
                </div>
                
                <div className="space-y-1 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-extrabold uppercase tracking-widest font-mono">
                      Level {Math.floor(userPoints / 500) + 1} Candidate
                    </span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-400 text-xs font-mono font-medium">Active Title: <span className="text-pink-400 font-extrabold">{activeBadge}</span></span>
                  </div>
                  <h4 className="text-base font-bold text-white font-sans">
                    Your Learning Experience
                  </h4>
                  <p className="text-xs text-gray-400">
                    You earn <span className="text-amber-400 font-bold">100 XP</span> per completed roadmap step, and <span className="text-amber-400 font-bold">250 XP</span> per mock interview!
                  </p>
                </div>

                <div className="flex items-center gap-3 relative z-10">
                  <div className="bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-center min-w-[90px] shadow-inner">
                    <span className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest font-mono">Total XP</span>
                    <span className="text-xl font-black text-amber-400 font-mono tracking-tight">{userPoints} XP</span>
                  </div>
                  <div className="bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-center min-w-[100px] shadow-inner">
                    <span className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest font-mono">Next Level</span>
                    <span className="text-[11px] font-bold text-gray-400 font-mono block mt-0.5">
                      {500 - (userPoints % 500)} XP needed
                    </span>
                  </div>
                </div>
              </div>

              {/* Bento Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Rating Stat */}
                <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex flex-col justify-between h-28 relative overflow-hidden">
                  <div className="absolute right-2 top-2 text-[#ec4899] bg-[#ec4899]/10 p-1.5 rounded-lg">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider font-mono">Avg Rating</span>
                  <div>
                    <h4 className="text-2xl font-extrabold text-white font-display">
                      {stats.avgScore > 0 ? `${stats.avgScore}%` : "—"}
                    </h4>
                    <p className="text-[9px] text-gray-400 font-mono mt-0.5">Overall rating score</p>
                  </div>
                </div>

                {/* Total sessions Stat */}
                <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex flex-col justify-between h-28 relative overflow-hidden">
                  <div className="absolute right-2 top-2 text-[#22d3ee] bg-[#22d3ee]/10 p-1.5 rounded-lg">
                    <Target className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider font-mono">Completed</span>
                  <div>
                    <h4 className="text-2xl font-extrabold text-white font-display">{stats.totalSessions}</h4>
                    <p className="text-[9px] text-gray-400 font-mono mt-0.5">Mock interviews</p>
                  </div>
                </div>

                {/* Streak Stat */}
                <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex flex-col justify-between h-28 relative overflow-hidden">
                  <div className="absolute right-2 top-2 text-[#a855f7] bg-[#a855f7]/10 p-1.5 rounded-lg animate-pulse">
                    <Flame className="w-4 h-4 fill-[#a855f7]/10" />
                  </div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider font-mono">Streak</span>
                  <div>
                    <h4 className="text-2xl font-extrabold text-white font-display">{stats.streak} Days</h4>
                    <p className="text-[9px] text-gray-400 font-mono mt-0.5">Continuous practice</p>
                  </div>
                </div>

                {/* Speaking speed Stat */}
                <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex flex-col justify-between h-28 relative overflow-hidden">
                  <div className="absolute right-2 top-2 text-emerald-400 bg-emerald-500/10 p-1.5 rounded-lg">
                    <Activity className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider font-mono">Avg Pacing</span>
                  <div>
                    <h4 className="text-2xl font-extrabold text-white font-display">{stats.avgWpm} WPM</h4>
                    <p className="text-[9px] text-emerald-400 font-mono font-bold mt-0.5">{stats.pacingLabel}</p>
                  </div>
                </div>
              </div>

              {/* Daily Goals Widget Section */}
              <div className="bg-black/20 border border-white/5 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                      <Target className="w-4.5 h-4.5 text-pink-500 animate-pulse" /> Daily Preparation Goals
                    </h4>
                    <p className="text-[10px] text-gray-400">
                      Stay on track by completing actionable daily tasks. Set custom career milestones or use standard prep tasks!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetGoals}
                    className="text-[9px] text-gray-400 hover:text-pink-400 font-mono font-bold transition-all cursor-pointer flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-xl border border-white/5 hover:border-pink-500/20 w-fit shrink-0 self-start sm:self-center"
                  >
                    Reset Defaults
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  {/* Left Side: Goals List & Form (Column span 8) */}
                  <div className="md:col-span-8 space-y-3.5">
                    {/* Add Custom Goal Form */}
                    <form onSubmit={handleAddGoal} className="flex gap-2">
                      <input
                        type="text"
                        value={newGoalText}
                        onChange={(e) => setNewGoalText(e.target.value)}
                        placeholder="Add a custom daily preparation goal..."
                        className="flex-1 glass-input bg-[#11101c] border border-white/5 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 outline-none"
                        maxLength={80}
                      />
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-[#ec4899] to-[#a855f7] hover:opacity-95 text-white font-extrabold text-[11px] px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 shrink-0 shadow-md shadow-[#ec4899]/10"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Goal
                      </button>
                    </form>

                    {/* Goals List */}
                    {dailyGoals.length === 0 ? (
                      <div className="text-center py-6 border border-dashed border-white/5 rounded-xl bg-black/10">
                        <p className="text-[11px] text-gray-500 font-mono">No active preparation goals for today.</p>
                        <p className="text-[9px] text-gray-600 mt-1">Type in a task above and click 'Add Goal' to begin tracking!</p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                        {dailyGoals.map((goal) => (
                          <div
                            key={goal.id}
                            className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border transition-all ${
                              goal.completed
                                ? "bg-emerald-500/5 border-emerald-500/10 text-gray-400"
                                : "bg-black/30 border-white/5 text-white hover:border-white/10"
                            }`}
                          >
                            <label className="flex items-center gap-2.5 cursor-pointer min-w-0 flex-1 select-none">
                              <input
                                type="checkbox"
                                checked={goal.completed}
                                onChange={() => handleToggleGoal(goal.id)}
                                className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-black/40 cursor-pointer shrink-0 accent-purple-500"
                              />
                              <span className={`text-[11.5px] font-medium leading-relaxed truncate ${
                                goal.completed ? "line-through text-gray-500" : "text-gray-200"
                              }`}>
                                {goal.text}
                              </span>
                            </label>

                            <button
                              type="button"
                              onClick={() => handleDeleteGoal(goal.id)}
                              className="text-gray-500 hover:text-rose-400 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
                              title="Delete Goal"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Side: Progress Circle Visual (Column span 4) */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center py-3 border border-white/5 md:border-l md:border-y-0 md:border-r-0 border-t md:pt-3 pt-5 md:mt-0 mt-2 rounded-2xl md:rounded-none bg-black/10 md:bg-transparent">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        <defs>
                          <linearGradient id="goalProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#a855f7" />
                          </linearGradient>
                        </defs>
                        {/* Background track circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r={radius}
                          className="stroke-white/5 fill-none"
                          strokeWidth={strokeWidth}
                        />
                        {/* Interactive progress track */}
                        {totalGoals > 0 && (
                          <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            stroke="url(#goalProgressGrad)"
                            className="fill-none transition-all duration-700 ease-out"
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                          />
                        )}
                      </svg>
                      {/* Centered Stats text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xl font-black text-white font-mono leading-none tracking-tight">
                          {completionPercentage}%
                        </span>
                        <span className="text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest mt-1">
                          Completed
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 text-center">
                      <span className="text-[10px] font-mono font-bold text-gray-400 block">
                        {completedGoals} of {totalGoals} Goals Done
                      </span>
                      {totalGoals > 0 && completionPercentage === 100 ? (
                        <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wider animate-pulse mt-0.5 block">
                          🚀 Daily Goal Achieved!
                        </span>
                      ) : totalGoals > 0 ? (
                        <span className="text-[8.5px] text-gray-500 font-mono mt-0.5 block">
                          Keep going for today's milestone!
                        </span>
                      ) : (
                        <span className="text-[8.5px] text-gray-500 font-mono mt-0.5 block">
                          Add tasks to begin
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === "achievements" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Achievements & Badges</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">View your earned preparation milestones, equip badges, and unlock custom active titles.</p>
                </div>
              </div>

              {/* Career Achievements & Milestones section */}
              <div className="bg-black/20 border border-white/5 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Trophy className="w-4.5 h-4.5 text-amber-500 animate-pulse" /> Career Milestones & Achievements
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("nextroundprep_unlocked_achievements");
                      window.dispatchEvent(new Event("storage"));
                    }}
                    className="text-[10px] text-gray-400 hover:text-purple-400 font-mono font-bold transition-all cursor-pointer flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-xl border border-white/5 hover:border-purple-500/30"
                  >
                    Reset Achievements
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Achievement 1: Roadmap Champion */}
                  <div className={`p-4 rounded-xl border flex gap-3.5 transition-all relative overflow-hidden ${
                    unlockedAchievements.includes("full_roadmap_completed")
                      ? "bg-gradient-to-br from-purple-950/20 to-pink-950/20 border-purple-500/30 shadow-md shadow-purple-950/5 text-white"
                      : "bg-black/40 border-white/5 opacity-60 text-gray-500"
                  }`}>
                    <div className={`p-2.5 rounded-lg shrink-0 flex items-center justify-center h-10 w-10 ${
                      unlockedAchievements.includes("full_roadmap_completed")
                        ? "bg-purple-500/15 border border-purple-500/30 text-purple-400 font-bold"
                        : "bg-white/5 border border-white/5 text-gray-600"
                    }`}>
                      <Trophy className={`w-5 h-5 ${unlockedAchievements.includes("full_roadmap_completed") ? "animate-bounce" : ""}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h5 className={`font-sans font-extrabold text-xs tracking-tight ${unlockedAchievements.includes("full_roadmap_completed") ? "text-white" : "text-gray-400"}`}>
                          Milestone Champion
                        </h5>
                        {unlockedAchievements.includes("full_roadmap_completed") ? (
                          <span className="text-[8px] font-bold font-mono uppercase text-purple-400 bg-purple-500/15 border border-purple-500/20 px-1.5 py-0.5 rounded-full">
                            Unlocked
                          </span>
                        ) : (
                          <span className="text-[8px] font-bold font-mono uppercase text-gray-500 bg-white/5 border border-white/5 px-1.5 py-0.5 rounded-full">
                            Locked
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                        Fully complete every milestone on your active prep syllabus roadmap.
                      </p>
                    </div>
                  </div>

                  {/* Achievement 2: Interview Specialist */}
                  <div className={`p-4 rounded-xl border flex gap-3.5 transition-all relative overflow-hidden ${
                    unlockedAchievements.includes("five_interviews_completed")
                      ? "bg-gradient-to-br from-cyan-950/20 to-purple-950/20 border-cyan-500/30 shadow-md shadow-cyan-950/5 text-white"
                      : "bg-black/40 border-white/5 opacity-60 text-gray-500"
                  }`}>
                    <div className={`p-2.5 rounded-lg shrink-0 flex items-center justify-center h-10 w-10 ${
                      unlockedAchievements.includes("five_interviews_completed")
                        ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 font-bold"
                        : "bg-white/5 border border-white/5 text-gray-600"
                    }`}>
                      <Sparkles className={`w-5 h-5 ${unlockedAchievements.includes("five_interviews_completed") ? "animate-pulse" : ""}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h5 className={`font-sans font-extrabold text-xs tracking-tight ${unlockedAchievements.includes("five_interviews_completed") ? "text-white" : "text-gray-400"}`}>
                          Interview Specialist
                        </h5>
                        {unlockedAchievements.includes("five_interviews_completed") ? (
                          <span className="text-[8px] font-bold font-mono uppercase text-cyan-400 bg-cyan-500/15 border border-cyan-500/20 px-1.5 py-0.5 rounded-full">
                            Unlocked
                          </span>
                        ) : (
                          <span className="text-[8px] font-bold font-mono uppercase text-gray-500 bg-white/5 border border-white/5 px-1.5 py-0.5 rounded-full">
                            Locked
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                        Complete at least 5 customized simulated AI mock interview sessions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Point-Based Badge System */}
              <div className="bg-black/20 border border-white/5 rounded-2xl p-5 space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-white/5">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                      <Trophy className="w-4.5 h-4.5 text-amber-500 animate-pulse" /> Cumulative Points Badge System
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Unlock prestigious profile ranks and custom active titles as you earn XP. Click any unlocked badge to equip it!
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-mono font-medium">Equipped Rank:</span>
                    <span className="text-xs font-black text-pink-400 bg-pink-500/10 border border-pink-500/25 px-2.5 py-1 rounded-xl">
                      {activeBadge}
                    </span>
                  </div>
                </div>

                {/* Point badges grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {pointBadges.map((badge, idx) => {
                    const isUnlocked = userPoints >= badge.pointsRequired;
                    const isSelected = activeBadge === badge.name;
                    const IconComponent = badge.icon;
                    const pointsLeft = badge.pointsRequired - userPoints;

                    return (
                      <button
                        type="button"
                        key={idx}
                        disabled={!isUnlocked}
                        onClick={() => handleSelectActiveBadge(badge.name)}
                        className={`group text-left p-4 rounded-xl border flex flex-col justify-between h-40 transition-all duration-300 relative overflow-hidden focus:outline-none ${
                          isUnlocked
                            ? `bg-gradient-to-br ${badge.colorClass} ${badge.glowClass} ${
                                isSelected 
                                  ? "border-pink-500 ring-1 ring-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.15)] bg-[#1a1223]/80" 
                                  : "bg-black/40 hover:scale-[1.02]"
                              } cursor-pointer`
                            : "bg-black/60 border-white/5 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        {/* Decorative glow inside card */}
                        {isUnlocked && (
                          <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-white/5 rounded-full filter blur-md opacity-20 group-hover:scale-150 transition-all duration-500" />
                        )}

                        <div className="flex items-start justify-between w-full relative z-10">
                          <div className={`p-2 rounded-xl transition-transform duration-300 ${
                            isUnlocked ? `${badge.iconBg} group-hover:scale-110` : "bg-white/5 text-gray-500"
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className={`text-[8px] font-mono font-extrabold px-2 py-0.5 rounded-full uppercase flex items-center gap-1 border ${
                            isUnlocked 
                              ? isSelected
                                ? "text-pink-400 bg-pink-500/20 border-pink-500/30"
                                : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                              : "text-gray-500 bg-white/5 border-white/5"
                          }`}>
                            {!isUnlocked ? (
                              <>
                                <Lock className="w-2.5 h-2.5 inline shrink-0" />
                                Locked
                              </>
                            ) : isSelected ? (
                                "Active Rank"
                            ) : (
                                "Unlocked"
                            )}
                          </span>
                        </div>

                        <div className="space-y-1 relative z-10 mt-3">
                          <h5 className={`text-xs font-bold tracking-tight transition-colors duration-300 ${
                            isUnlocked ? "text-white group-hover:text-pink-400" : "text-gray-400"
                          }`}>
                            {badge.name}
                          </h5>
                          <p className="text-[10px] text-gray-400 leading-tight line-clamp-2">
                            {badge.description}
                          </p>
                        </div>

                        <div className="mt-2 text-[9px] font-mono text-gray-500 border-t border-white/5 pt-2 flex justify-between items-center w-full relative z-10">
                          <span>Req: {badge.pointsRequired} XP</span>
                          {isUnlocked ? (
                            <span className="text-emerald-400 font-bold font-mono">
                              {isSelected ? "★ Equipped" : "Click to Equip"}
                            </span>
                          ) : (
                            <span className="text-rose-400 font-bold font-mono">
                              +{pointsLeft} XP needed
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Earned Milestones & Performance Badges */}
              <div className="bg-black/20 border border-white/5 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Award className="w-4.5 h-4.5 text-purple-400 animate-pulse" /> Performance Achievements
                  </h4>
                  <span className="text-[10px] text-gray-400 font-mono">
                    Earned via speech delivery metrics and practice consistency
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Badge 1: Interview Marathoner */}
                  {(() => {
                    const isUnlocked = stats.totalSessions >= 5;
                    const progress = stats.totalSessions;
                    return (
                      <div className={`p-4 rounded-xl border flex flex-col justify-between h-36 transition-all duration-300 relative overflow-hidden ${
                        isUnlocked
                          ? "bg-gradient-to-br from-amber-500/10 via-purple-500/5 to-transparent border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.07)] text-white"
                          : "bg-black/40 border-white/5 opacity-60"
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className={`p-2 rounded-lg ${
                            isUnlocked ? "bg-amber-500/20 text-amber-400" : "bg-white/5 text-gray-500"
                          }`}>
                            <Trophy className="w-5 h-5" />
                          </div>
                          <span className={`text-[8px] font-bold font-mono px-1.5 py-0.5 rounded-full uppercase ${
                            isUnlocked 
                              ? "text-amber-400 bg-amber-500/15 border border-amber-500/20" 
                              : "text-gray-500 bg-white/5"
                          }`}>
                            {isUnlocked ? "Unlocked" : "Locked"}
                          </span>
                        </div>
                        <div className="space-y-1 mt-2">
                          <h5 className={`text-xs font-bold tracking-tight ${isUnlocked ? "text-white" : "text-gray-400"}`}>
                            Interview Marathoner
                          </h5>
                          <p className="text-[10px] text-gray-400 leading-tight">
                            Complete 5 mock interview sessions.
                          </p>
                        </div>
                        <div className="mt-2 text-[9px] font-mono text-gray-500">
                          Progress: {progress}/5
                        </div>
                      </div>
                    );
                  })()}

                  {/* Badge 2: Consistency Legend */}
                  {(() => {
                    const isUnlocked = stats.streak >= 3;
                    const progress = stats.streak;
                    return (
                      <div className={`p-4 rounded-xl border flex flex-col justify-between h-36 transition-all duration-300 relative overflow-hidden ${
                        isUnlocked
                          ? "bg-gradient-to-br from-orange-500/10 via-red-500/5 to-transparent border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.07)] text-white"
                          : "bg-black/40 border-white/5 opacity-60"
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className={`p-2 rounded-lg ${
                            isUnlocked ? "bg-orange-500/20 text-orange-400 animate-pulse" : "bg-white/5 text-gray-500"
                          }`}>
                            <Flame className="w-5 h-5" />
                          </div>
                          <span className={`text-[8px] font-bold font-mono px-1.5 py-0.5 rounded-full uppercase ${
                            isUnlocked 
                              ? "text-orange-400 bg-orange-500/15 border border-orange-500/20" 
                              : "text-gray-500 bg-white/5"
                          }`}>
                            {isUnlocked ? "Unlocked" : "Locked"}
                          </span>
                        </div>
                        <div className="space-y-1 mt-2">
                          <h5 className={`text-xs font-bold tracking-tight ${isUnlocked ? "text-white" : "text-gray-400"}`}>
                            Consistency Legend
                          </h5>
                          <p className="text-[10px] text-gray-400 leading-tight">
                            Maintain a study streak of 3+ days.
                          </p>
                        </div>
                        <div className="mt-2 text-[9px] font-mono text-gray-500">
                          Progress: {progress}/3 days
                        </div>
                      </div>
                    );
                  })()}

                  {/* Badge 3: STAR Scholar */}
                  {(() => {
                    const isUnlocked = stats.starScore >= 80;
                    const progress = stats.starScore;
                    return (
                      <div className={`p-4 rounded-xl border flex flex-col justify-between h-36 transition-all duration-300 relative overflow-hidden ${
                        isUnlocked
                          ? "bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.07)] text-white"
                          : "bg-black/40 border-white/5 opacity-60"
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className={`p-2 rounded-lg ${
                            isUnlocked ? "bg-purple-500/20 text-purple-400" : "bg-white/5 text-gray-500"
                          }`}>
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <span className={`text-[8px] font-bold font-mono px-1.5 py-0.5 rounded-full uppercase ${
                            isUnlocked 
                              ? "text-purple-400 bg-purple-500/15 border border-purple-500/20" 
                              : "text-gray-500 bg-white/5"
                          }`}>
                            {isUnlocked ? "Unlocked" : "Locked"}
                          </span>
                        </div>
                        <div className="space-y-1 mt-2">
                          <h5 className={`text-xs font-bold tracking-tight ${isUnlocked ? "text-white" : "text-gray-400"}`}>
                            STAR Scholar
                          </h5>
                          <p className="text-[10px] text-gray-400 leading-tight">
                            Achieve a STAR score of 80%+.
                          </p>
                        </div>
                        <div className="mt-2 text-[9px] font-mono text-gray-500">
                          Progress: {progress > 0 ? `${progress}%` : "No data"}/80%
                        </div>
                      </div>
                    );
                  })()}

                  {/* Badge 4: Eloquent Orator */}
                  {(() => {
                    const isUnlocked = stats.totalSessions > 0 && stats.avgWpm >= 110 && stats.avgWpm <= 150;
                    const progress = stats.avgWpm;
                    return (
                      <div className={`p-4 rounded-xl border flex flex-col justify-between h-36 transition-all duration-300 relative overflow-hidden ${
                        isUnlocked
                          ? "bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.07)] text-white"
                          : "bg-black/40 border-white/5 opacity-60"
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className={`p-2 rounded-lg ${
                            isUnlocked ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-gray-500"
                          }`}>
                            <Activity className="w-5 h-5" />
                          </div>
                          <span className={`text-[8px] font-bold font-mono px-1.5 py-0.5 rounded-full uppercase ${
                            isUnlocked 
                              ? "text-emerald-400 bg-emerald-500/15 border border-emerald-500/20" 
                              : "text-gray-500 bg-white/5"
                          }`}>
                            {isUnlocked ? "Unlocked" : "Locked"}
                          </span>
                        </div>
                        <div className="space-y-1 mt-2">
                          <h5 className={`text-xs font-bold tracking-tight ${isUnlocked ? "text-white" : "text-gray-400"}`}>
                            Eloquent Orator
                          </h5>
                          <p className="text-[10px] text-gray-400 leading-tight">
                            Average pacing of 110-150 WPM.
                          </p>
                        </div>
                        <div className="mt-2 text-[9px] font-mono text-gray-500">
                          Progress: {stats.totalSessions > 0 ? `${progress} WPM` : "No data"}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Badge 5: Elite Performer */}
                  {(() => {
                    const isUnlocked = stats.avgScore >= 85;
                    const progress = stats.avgScore;
                    return (
                      <div className={`p-4 rounded-xl border flex flex-col justify-between h-36 transition-all duration-300 relative overflow-hidden ${
                        isUnlocked
                          ? "bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.07)] text-white"
                          : "bg-black/40 border-white/5 opacity-60"
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className={`p-2 rounded-lg ${
                            isUnlocked ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-gray-500"
                          }`}>
                            <Zap className="w-5 h-5" />
                          </div>
                          <span className={`text-[8px] font-bold font-mono px-1.5 py-0.5 rounded-full uppercase ${
                            isUnlocked 
                              ? "text-cyan-400 bg-cyan-500/15 border border-cyan-500/20" 
                              : "text-gray-500 bg-white/5"
                          }`}>
                            {isUnlocked ? "Unlocked" : "Locked"}
                          </span>
                        </div>
                        <div className="space-y-1 mt-2">
                          <h5 className={`text-xs font-bold tracking-tight ${isUnlocked ? "text-white" : "text-gray-400"}`}>
                            Elite Performer
                          </h5>
                          <p className="text-[10px] text-gray-400 leading-tight">
                            Average score of 85% or above.
                          </p>
                        </div>
                        <div className="mt-2 text-[9px] font-mono text-gray-500">
                          Progress: {progress}%/85%
                        </div>
                      </div>
                    );
                  })()}

                  {/* Badge 6: Doubt Buster */}
                  {(() => {
                    const isUnlocked = userPoints >= 300 || stats.completedInterviews.some((session: any) => session.role?.includes("Voice"));
                    return (
                      <div className={`p-4 rounded-xl border flex flex-col justify-between h-36 transition-all duration-300 relative overflow-hidden ${
                        isUnlocked
                          ? "bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.07)] text-white"
                          : "bg-black/40 border-white/5 opacity-60"
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className={`p-2 rounded-lg ${
                            isUnlocked ? "bg-pink-500/20 text-pink-400" : "bg-white/5 text-gray-500"
                          }`}>
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <span className={`text-[8px] font-bold font-mono px-1.5 py-0.5 rounded-full uppercase ${
                            isUnlocked 
                              ? "text-pink-400 bg-pink-500/15 border border-pink-500/20" 
                              : "text-gray-500 bg-white/5"
                          }`}>
                            {isUnlocked ? "Unlocked" : "Locked"}
                          </span>
                        </div>
                        <div className="space-y-1 mt-2">
                          <h5 className={`text-xs font-bold tracking-tight ${isUnlocked ? "text-white" : "text-gray-400"}`}>
                            Active Inquirer
                          </h5>
                          <p className="text-[10px] text-gray-400 leading-tight">
                            Accumulate 300+ XP or ask a voice query.
                          </p>
                        </div>
                        <div className="mt-2 text-[9px] font-mono text-gray-500">
                          Progress: {userPoints} XP
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {activeSubTab === "roadmap" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Interactive Career Roadmap</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Visualize your complete engineering preparation roadmap, study core syllabus theory, and solve topic quizzes.</p>
                </div>
              </div>

              {!activeRoadmap ? (
                <div className="bg-[#11101c]/60 border border-white/5 rounded-2xl p-10 text-center space-y-4">
                  <Compass className="w-10 h-10 text-pink-500 animate-spin mx-auto" />
                  <p className="text-xs text-gray-400 font-mono">Loading your active career roadmap...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Roadmap stats header bar */}
                  <div className="bg-gradient-to-r from-[#11101c] via-[#1a1223] to-[#11101c] border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-5">
                    <div className="space-y-1 text-center md:text-left">
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <span className="px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 text-[10px] font-extrabold uppercase tracking-widest font-mono">
                          Active Path
                        </span>
                        <span className="text-gray-500 text-xs">•</span>
                        <span className="text-gray-400 text-xs font-mono font-bold text-white">{activeRoadmap.title || "Career Syllabus"}</span>
                      </div>
                      <h4 className="text-base font-bold text-white font-sans mt-1">
                        Syllabus Progress Tracker
                      </h4>
                      <p className="text-xs text-gray-400">
                        Select nodes to view theory, unlock resources, and test your knowledge. Completing steps grants <span className="text-amber-400 font-bold">100 XP</span>!
                      </p>
                    </div>

                    {/* Progress indicator */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-center min-w-[110px] shadow-inner">
                        <span className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest font-mono">Completed</span>
                        <span className="text-lg font-black text-emerald-400 font-mono tracking-tight">
                          {activeRoadmap.steps.filter((s: any) => s.completed).length} / {activeRoadmap.steps.length}
                        </span>
                      </div>

                      <div className="bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-center min-w-[110px] shadow-inner">
                        <span className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest font-mono">Overall Progress</span>
                        <span className="text-lg font-black text-pink-500 font-mono tracking-tight">
                          {Math.round((activeRoadmap.steps.filter((s: any) => s.completed).length / activeRoadmap.steps.length) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Nodes Canvas Grid */}
                  <div className="relative bg-[#0d0c16]/60 border border-white/5 rounded-2xl p-6 overflow-hidden">
                    {/* Decorative background visual graph lines or grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1e2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1e2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />
                    
                    <div className="relative z-10 flex flex-col lg:flex-row gap-6">
                      {/* Sidebar Node Map Navigator (The Connected Nodes Chain) */}
                      <div className="w-full lg:w-5/12 bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col justify-center relative">
                        <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2">
                          <Compass className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: "8s" }} />
                          Connected Syllabus Nodes
                        </h5>
                        
                        {/* The SVG Connection Path behind the nodes */}
                        <div className="relative flex flex-col gap-6 items-start pl-6 py-2">
                          {/* Absolute vertical glow line */}
                          <div className="absolute left-[39px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500 via-pink-500 to-purple-600 opacity-20" />
                          {/* Active/Completed filled connection progress line */}
                          <div 
                            className="absolute left-[39px] top-4 w-0.5 bg-gradient-to-b from-emerald-500 to-pink-500 transition-all duration-500" 
                            style={{ 
                              bottom: `${Math.max(0, 100 - (activeRoadmap.steps.filter((s: any) => s.completed).length / activeRoadmap.steps.length) * 100)}%` 
                            }}
                          />

                          {activeRoadmap.steps.map((step: any, idx: number) => {
                            const isCompleted = step.completed;
                            const isSelected = selectedNodeIndex === idx;
                            const isUnlocked = idx === 0 || activeRoadmap.steps[idx - 1]?.completed;
                            
                            return (
                              <button
                                key={step.id}
                                type="button"
                                onClick={() => setSelectedNodeIndex(idx)}
                                className={`flex items-center gap-4 w-full text-left relative z-10 group focus:outline-none transition-all duration-300 ${
                                  isSelected ? "scale-[1.02]" : "hover:translate-x-1"
                                }`}
                              >
                                {/* Circle Node with glowing border */}
                                <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 shrink-0 ${
                                  isCompleted 
                                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]" 
                                    : isUnlocked
                                      ? isSelected
                                        ? "bg-pink-500/15 border-pink-500 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.4)] animate-pulse"
                                        : "bg-pink-950/20 border-pink-500/50 text-pink-300 shadow-[0_0_8px_rgba(236,72,153,0.15)]"
                                      : "bg-[#11101c] border-white/10 text-gray-600"
                                }`}>
                                  <span className="text-[11px] font-mono font-bold">
                                    {isCompleted ? "✓" : idx + 1}
                                  </span>
                                  
                                  {!isUnlocked && (
                                    <div className="absolute -right-1 -bottom-1 bg-black border border-white/10 rounded-full p-0.5 text-gray-500 scale-75">
                                      <Lock className="w-2.5 h-2.5" />
                                    </div>
                                  )}
                                </div>

                                {/* Step Label Block */}
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className={`text-[10px] font-mono uppercase font-bold ${
                                      isSelected 
                                        ? "text-pink-400" 
                                        : isCompleted
                                          ? "text-emerald-400"
                                          : isUnlocked
                                            ? "text-pink-200"
                                            : "text-gray-500"
                                    }`}>
                                      Module 0{idx + 1}
                                    </span>
                                    <span className="text-[9px] text-gray-500 font-mono font-medium">{step.duration}</span>
                                  </div>
                                  <h6 className={`text-xs font-bold font-sans truncate transition-colors duration-300 ${
                                    isSelected 
                                      ? "text-white" 
                                      : isCompleted
                                        ? "text-gray-200 group-hover:text-white"
                                        : isUnlocked
                                          ? "text-gray-300 group-hover:text-white"
                                          : "text-gray-600"
                                  }`}>
                                    {step.title}
                                  </h6>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Detailed selected step card view panel (Right Side) */}
                      <div className="flex-1 min-w-0 bg-black/30 border border-white/5 rounded-xl p-5 flex flex-col justify-between space-y-4 relative overflow-hidden">
                        <div className="absolute -right-24 -top-24 w-48 h-48 bg-pink-500/5 rounded-full filter blur-3xl pointer-events-none" />
                        
                        {activeRoadmap.steps[selectedNodeIndex] && (() => {
                          const step = activeRoadmap.steps[selectedNodeIndex];
                          const isCompleted = step.completed;
                          const isUnlocked = selectedNodeIndex === 0 || activeRoadmap.steps[selectedNodeIndex - 1]?.completed;
                          
                          return (
                            <div className="space-y-4 relative z-10">
                              {/* Detail Title Header */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[9px] font-mono font-extrabold uppercase bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded-full text-pink-400">
                                      Module 0{selectedNodeIndex + 1}
                                    </span>
                                    <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                                      isCompleted 
                                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
                                        : isUnlocked
                                          ? "text-pink-400 bg-pink-500/10 border-pink-500/20 animate-pulse"
                                          : "text-gray-500 bg-white/5 border-white/5"
                                    }`}>
                                      {isCompleted ? "Completed" : isUnlocked ? "In Progress" : "Locked"}
                                    </span>
                                  </div>
                                  <h5 className="text-sm font-extrabold text-white leading-tight mt-1.5">{step.title}</h5>
                                </div>
                                <span className="text-xs text-gray-400 font-mono shrink-0 font-semibold">{step.duration} focus</span>
                              </div>

                              {/* Description */}
                              <p className="text-[11px] text-gray-300 leading-relaxed font-sans">{step.description}</p>

                              {/* Core Syllabus Theory block */}
                              <div className="bg-[#11101c]/90 border border-purple-500/10 p-3 rounded-lg space-y-1.5">
                                <div className="text-[9px] font-bold font-mono text-purple-400 uppercase tracking-wider flex items-center gap-1">
                                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                                  Core Syllabus Theory Deep-Dive
                                </div>
                                <p className="text-[10px] text-gray-400 leading-relaxed whitespace-pre-line font-mono">{step.theory}</p>
                              </div>

                              {/* Resource Links block */}
                              {step.resources && step.resources.length > 0 && (
                                <div className="space-y-1.5">
                                  <div className="text-[9px] font-bold font-mono text-gray-400 uppercase tracking-wider">
                                    Curated Learning Materials
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {step.resources.map((res: any, rIdx: number) => (
                                      <a
                                        key={rIdx}
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-[10px] text-pink-400 hover:text-pink-300 bg-pink-500/5 border border-pink-500/10 hover:border-pink-500/35 px-2.5 py-1 rounded-lg transition-all font-mono"
                                      >
                                        <span>{res.name}</span>
                                        <span className="text-[8px] opacity-75 font-bold uppercase">({res.type})</span>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Syllabus Interactive Quiz block */}
                              {step.quiz && (
                                <div className="border border-white/5 rounded-lg p-3 bg-black/40 space-y-3">
                                  <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-1">
                                      <Zap className="w-3 h-3 text-amber-500" /> Topic Challenge Quiz
                                    </span>
                                    <span className="text-[8px] font-mono text-gray-500">Earn +25 XP Bonus</span>
                                  </div>
                                  
                                  <p className="text-[10.5px] text-white leading-relaxed font-sans">{step.quiz.question}</p>
                                  
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {step.quiz.options.map((option: string, oIdx: number) => {
                                      const quizState = roadmapQuizState[step.id];
                                      const isSubmitted = quizState?.isSubmitted;
                                      const isSelected = quizState?.selectedOption === oIdx;
                                      const isCorrect = step.quiz.correctIndex === oIdx;
                                      
                                      let btnStyle = "bg-[#11101c] border-white/5 text-gray-300 hover:bg-white/5 hover:border-white/10";
                                      if (isSubmitted) {
                                        if (isCorrect) {
                                          btnStyle = "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold";
                                        } else if (isSelected) {
                                          btnStyle = "bg-rose-500/10 border-rose-500/40 text-rose-400 font-bold";
                                        } else {
                                          btnStyle = "bg-[#11101c] border-white/5 text-gray-600 opacity-60";
                                        }
                                      } else if (isSelected) {
                                        btnStyle = "bg-pink-500/10 border-pink-500 text-pink-400 font-semibold";
                                      }
                                      
                                      return (
                                        <button
                                          key={oIdx}
                                          type="button"
                                          disabled={isSubmitted || !isUnlocked}
                                          onClick={() => {
                                            setRoadmapQuizState(prev => ({
                                              ...prev,
                                              [step.id]: { selectedOption: oIdx, isSubmitted: false, isCorrect: false }
                                            }));
                                          }}
                                          className={`p-2 rounded-lg border text-[10px] text-left transition-all ${btnStyle} ${
                                            isSubmitted ? "cursor-default" : "cursor-pointer hover:scale-[1.01]"
                                          }`}
                                        >
                                          {option}
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {/* Quiz Submit Actions & Explanation */}
                                  {roadmapQuizState[step.id] && (() => {
                                    const qState = roadmapQuizState[step.id];
                                    const isSubmitted = qState.isSubmitted;
                                    const isSelected = qState.selectedOption !== undefined;
                                    
                                    return (
                                      <div className="space-y-2 pt-1 border-t border-white/5">
                                        {!isSubmitted ? (
                                          <div className="flex justify-end">
                                            <button
                                              type="button"
                                              disabled={!isSelected}
                                              onClick={() => {
                                                const isCorrect = qState.selectedOption === step.quiz.correctIndex;
                                                setRoadmapQuizState(prev => {
                                                  const next = { ...prev };
                                                  next[step.id] = { ...prev[step.id], isSubmitted: true, isCorrect };
                                                  return next;
                                                });
                                                
                                                if (isCorrect) {
                                                  // Dispatch to sync points globally
                                                  window.dispatchEvent(new CustomEvent("update-user-points"));
                                                }
                                              }}
                                              className={`px-3 py-1 rounded-lg font-bold font-mono text-[9px] uppercase transition-all ${
                                                isSelected
                                                  ? "bg-pink-500 text-white hover:opacity-95 cursor-pointer shadow-md shadow-pink-500/10"
                                                  : "bg-white/5 text-gray-500 cursor-not-allowed"
                                              }`}
                                            >
                                              Submit Answer
                                            </button>
                                          </div>
                                        ) : (
                                          <div className="space-y-1.5">
                                            <div className={`text-[9.5px] font-mono font-bold flex items-center gap-1 ${
                                              qState.isCorrect ? "text-emerald-400" : "text-rose-400"
                                            }`}>
                                              {qState.isCorrect ? (
                                                <>🎉 Correct! Topic Mastered!</>
                                              ) : (
                                                <>❌ Incorrect. Let's learn from this!</>
                                              )}
                                            </div>
                                            <p className="text-[10px] text-gray-400 font-mono leading-relaxed bg-[#11101c]/60 p-2 rounded border border-white/5">
                                              <strong>Explanation:</strong> {step.quiz.explanation}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })()}
                                </div>
                              )}

                              {/* Save Status Checkbox Button */}
                              <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="text-[10px] text-gray-400 font-mono">
                                  {isCompleted ? (
                                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                                      <CheckCircle className="w-3.5 h-3.5" /> This milestone is fully complete!
                                    </span>
                                  ) : isUnlocked ? (
                                    <span>Ready to finalize this topic syllabus?</span>
                                  ) : (
                                    <span className="text-gray-500 flex items-center gap-1">
                                      <Lock className="w-3.5 h-3.5" /> Unlock previous modules first.
                                    </span>
                                  )}
                                </div>

                                <button
                                  type="button"
                                  disabled={!isUnlocked}
                                  onClick={() => {
                                    // Toggle roadmap step completion inside state & local storage!
                                    const updatedSteps = activeRoadmap.steps.map((s: any, sIdx: number) => 
                                      sIdx === selectedNodeIndex ? { ...s, completed: !s.completed } : s
                                    );
                                    const updatedRoadmap = { ...activeRoadmap, steps: updatedSteps };
                                    
                                    // Persist to nextroundprep_active_roadmap
                                    localStorage.setItem("nextroundprep_active_roadmap", JSON.stringify(updatedRoadmap));
                                    setActiveRoadmap(updatedRoadmap);
                                    
                                    // Trigger standard syncing events so points and other modules update immediately!
                                    window.dispatchEvent(new CustomEvent("update-user-points"));
                                    window.dispatchEvent(new Event("storage"));
                                  }}
                                  className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all duration-300 flex items-center gap-1.5 ${
                                    !isUnlocked
                                      ? "bg-white/5 border border-white/5 text-gray-500 cursor-not-allowed"
                                      : isCompleted
                                        ? "bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 cursor-pointer"
                                        : "bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white cursor-pointer shadow-lg shadow-pink-500/10"
                                  }`}
                                >
                                  {isCompleted ? (
                                    <>
                                      <CheckCircle className="w-3.5 h-3.5" />
                                      Mark as Incomplete
                                    </>
                                  ) : (
                                    <>
                                      <Zap className="w-3.5 h-3.5 animate-pulse" />
                                      Mark Milestone Completed
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSubTab === "performance" && (
            <div className="space-y-6">
              {/* Roadmap step progression tracker */}
              <UserProgress onNavigateToRoadmap={onNavigateToRoadmap} />

              {/* Chart Progress Overview */}
              <ProgressOverviewChart />

              {/* STAR method and qualitative performance radar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/20 border border-white/5 rounded-2xl p-5 space-y-4">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" /> Key Skill Performance indicators
                  </h4>

                  <div className="space-y-3.5">
                    {/* STAR Alignment */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="text-gray-400 font-mono font-bold">STAR Method Alignment</span>
                        <span className="text-white font-extrabold">{stats.starScore > 0 ? `${stats.starScore}%` : "80% (Est)"}</span>
                      </div>
                      <div className="w-full bg-[#11101c] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[#ec4899] to-[#a855f7] h-1.5 rounded-full"
                          style={{ width: `${stats.starScore > 0 ? stats.starScore : 80}%` }}
                        />
                      </div>
                    </div>

                    {/* Speech Clarity */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="text-gray-400 font-mono font-bold">Speech Clarity & Tone</span>
                        <span className="text-white font-extrabold">{stats.totalSessions > 0 ? "85%" : "82% (Est)"}</span>
                      </div>
                      <div className="w-full bg-[#11101c] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[#22d3ee] to-[#a855f7] h-1.5 rounded-full"
                          style={{ width: stats.totalSessions > 0 ? "85%" : "82%" }}
                        />
                      </div>
                    </div>

                    {/* Technical Vocabulary */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="text-gray-400 font-mono font-bold">Technical Word Depth</span>
                        <span className="text-white font-extrabold">{stats.totalSessions > 0 ? "78%" : "75% (Est)"}</span>
                      </div>
                      <div className="w-full bg-[#11101c] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] h-1.5 rounded-full"
                          style={{ width: stats.totalSessions > 0 ? "78%" : "75%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Insight Card */}
                <div className="bg-gradient-to-br from-[#11101c] to-[#15141f] border border-[#22d3ee]/10 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 bg-[#22d3ee]/10 border border-[#22d3ee]/25 py-1 px-2.5 rounded-xl w-fit">
                      <Sparkles className="w-3.5 h-3.5 text-[#22d3ee]" />
                      <span className="text-[9px] font-bold text-[#22d3ee] uppercase tracking-widest font-mono">AI Recommendation</span>
                    </div>

                    <h5 className="text-xs font-bold text-white leading-snug">
                      {stats.totalSessions === 0 
                        ? "Start your mock journey to receive customized delivery recommendations."
                        : `Excellent job keeping up a ${stats.streak}-day streak!`}
                    </h5>
                    <p className="text-[10px] text-gray-400 leading-relaxed font-mono">
                      {stats.totalSessions === 0 
                        ? "Currently, we are estimating your base behavioral performance. Initiate an interview evaluation on the 'Interview' tab to activate speech diagnostics, pace tracking, and STAR content parsing."
                        : stats.avgWpm > 150 
                          ? `Your speaking pacing of ${stats.avgWpm} WPM is slightly fast. Try focusing on controlled breathing and structural pausing between sentences to increase readability.`
                          : `You have achieved an optimal delivery pace of ${stats.avgWpm} WPM and a strong average STAR rating of ${stats.avgScore}%. Focus on refining target job details to unlock specialized domain-specific questions.`}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-3 text-[10px] text-gray-500 font-mono flex items-center justify-between">
                    <span>Performance Rating Status</span>
                    <span className="text-[#22d3ee] font-bold uppercase">
                      {stats.totalSessions === 0 ? "Pending Evaluation" : stats.avgScore >= 85 ? "High Caliber Candidate" : "Improving Candidate"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Interview History & Feedback Reviewer */}
              {stats.completedInterviews.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <History className="w-4 h-4 text-[#ec4899] animate-pulse" /> Detailed Interview History & feedback reviewer
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {stats.completedInterviews.length} Session(s) Recorded
                    </span>
                  </div>
                  
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                    {stats.completedInterviews.map((entry, idx) => {
                      const isExpanded = expandedHistoryId === entry.id;
                      return (
                        <div 
                          key={entry.id || idx} 
                          className={`bg-[#11101c] rounded-xl border transition-all ${
                            isExpanded ? "border-[#a855f7]/40 bg-[#141223] shadow-lg shadow-purple-500/5" : "border-white/5 hover:border-white/10"
                          }`}
                        >
                          {/* Summary Row */}
                          <div 
                            onClick={() => setExpandedHistoryId(isExpanded ? null : entry.id)}
                            className="p-4 flex items-center justify-between gap-4 cursor-pointer select-none"
                          >
                            <div className="min-w-0 flex-1 space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[9px] font-mono font-bold text-[#22d3ee] uppercase bg-[#22d3ee]/10 px-2 py-0.5 rounded">
                                  {entry.type || "Interview"}
                                </span>
                                <span className="text-[9px] text-gray-500 font-mono flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> {entry.date || entry.timestamp || "Recent"}
                                </span>
                              </div>
                              <h4 className="text-xs font-bold text-white truncate">
                                {entry.role || "General Capability Preparation"}
                              </h4>
                              <p className="text-[11px] text-gray-400 truncate flex items-center gap-1">
                                <BookOpen className="w-3 h-3 text-purple-400" /> {entry.level || "Mid-level"} • {entry.feedbacks?.length || 0} Question(s) Evaluated
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-3 shrink-0">
                              <div className="text-right">
                                <span className={`inline-block font-mono font-bold text-xs px-2.5 py-1 rounded-lg ${
                                  (entry.avgScore || 0) >= 80 
                                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/10" 
                                    : (entry.avgScore || 0) >= 60 
                                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/10" 
                                      : "bg-rose-500/15 text-rose-400 border border-rose-500/10"
                                }`}>
                                  {entry.avgScore || 0}%
                                </span>
                                <div className="text-[8px] text-gray-500 font-mono mt-0.5 uppercase tracking-wider">Rating</div>
                              </div>
                              
                              <button 
                                type="button" 
                                className="text-gray-400 hover:text-white p-1 transition-colors"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-[#a855f7]" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-gray-500" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Expanded Details Panel */}
                          {isExpanded && (
                            <div className="px-4 pb-4 pt-1 border-t border-white/5 space-y-4 text-xs animate-fade-in bg-[#0b0a13]/50 rounded-b-xl">
                              <div className="grid grid-cols-2 gap-2 pt-2">
                                <button
                                  type="button"
                                  onClick={() => downloadHistoricalSessionReport(entry)}
                                  className="w-full bg-[#1b1a2e] hover:bg-white/10 border border-white/5 py-2 px-3 rounded-lg text-white font-semibold flex items-center justify-center gap-1.5 transition-all text-[11px] cursor-pointer"
                                >
                                  <Download className="w-3.5 h-3.5 text-[#22d3ee]" />
                                  Download Report (.md)
                                </button>
                                <button
                                  type="button"
                                  onClick={() => downloadHistoricalSessionReport(entry)}
                                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 py-2 px-3 rounded-lg text-white font-bold flex items-center justify-center gap-1.5 transition-all text-[11px] cursor-pointer"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  Download PDF / Print
                                </button>
                              </div>

                              <div className="space-y-3">
                                <div className="text-gray-400 font-mono text-[9px] tracking-wider uppercase font-bold">Evaluated Questions Breakdown:</div>
                                {entry.feedbacks?.map((item: any, qIdx: number) => {
                                  const fb = item.feedback || {};
                                  return (
                                    <div key={qIdx} className="bg-[#121122] p-3 rounded-lg border border-white/5 space-y-3">
                                      <div className="flex justify-between items-start gap-3">
                                        <p className="font-bold text-white text-[11px] leading-relaxed flex-1">
                                          Q{qIdx + 1}: "{item.question}"
                                        </p>
                                        <span className="text-xs font-mono font-bold text-[#ec4899] bg-[#ec4899]/10 px-2 py-0.5 rounded">
                                          {fb.overallScore || item.score || 0}%
                                        </span>
                                      </div>

                                      <div className="grid grid-cols-3 gap-1.5 pt-1 text-center font-mono text-[9px]">
                                        <div className="bg-white/5 p-1 rounded">
                                          <div className="text-gray-400">Content</div>
                                          <div className="text-white font-bold">{fb.contentScore || 0}%</div>
                                        </div>
                                        <div className="bg-white/5 p-1 rounded">
                                          <div className="text-gray-400">STAR Structure</div>
                                          <div className="text-white font-bold">{fb.structureScore || 0}%</div>
                                        </div>
                                        <div className="bg-white/5 p-1 rounded">
                                          <div className="text-gray-400">Delivery</div>
                                          <div className="text-white font-bold">{fb.confidenceScore || 0}%</div>
                                        </div>
                                      </div>

                                      {fb.speakingPace && (
                                        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded text-[10px] text-gray-300 font-mono">
                                          <Activity className="w-3.5 h-3.5 text-[#22d3ee]" />
                                          <span>Speaking Pace: <strong>{fb.speakingPace} WPM</strong> ({fb.paceRating || "Optimal"})</span>
                                        </div>
                                      )}

                                      {/* Strengths & Improvements */}
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[11px]">
                                        <div className="bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
                                          <div className="text-emerald-400 font-semibold mb-1.5 flex items-center gap-1">
                                            <CheckCircle className="w-3.5 h-3.5" /> Strengths
                                          </div>
                                          <ul className="list-disc pl-3.5 text-gray-300 space-y-1 text-[10px] leading-relaxed">
                                            {fb.strengths?.map((str: string, sIdx: number) => (
                                              <li key={sIdx}>{str}</li>
                                            )) || <li>Great communication and core content delivery.</li>}
                                          </ul>
                                        </div>
                                        <div className="bg-rose-500/5 p-2 rounded-lg border border-rose-500/10">
                                          <div className="text-rose-400 font-semibold mb-1.5 flex items-center gap-1">
                                            <AlertTriangle className="w-3.5 h-3.5" /> To Improve
                                          </div>
                                          <ul className="list-disc pl-3.5 text-gray-300 space-y-1 text-[10px] leading-relaxed">
                                            {fb.improvements?.map((imp: string, iIdx: number) => (
                                              <li key={iIdx}>{imp}</li>
                                            )) || <li>Incorporate more specific metrics or results.</li>}
                                          </ul>
                                        </div>
                                      </div>

                                      {/* Accordion sub-blocks for Transcripts & Model Answers */}
                                      <div className="space-y-1.5 pt-1">
                                        {item.answer && (
                                          <details className="group">
                                            <summary className="text-[10px] text-gray-400 hover:text-white transition-colors cursor-pointer select-none font-mono py-1 flex items-center gap-1.5">
                                              <span className="transition-transform group-open:rotate-90 inline-block text-[8px]">▶</span>
                                              Show Your Transcript Response
                                            </summary>
                                            <div className="p-2.5 bg-black/40 rounded-lg border border-white/5 mt-1 font-sans text-gray-300 text-[11px] leading-relaxed whitespace-pre-wrap">
                                              {item.answer}
                                            </div>
                                          </details>
                                        )}

                                        {fb.modelAnswer && (
                                          <details className="group">
                                            <summary className="text-[10px] text-purple-400 hover:text-purple-300 transition-colors cursor-pointer select-none font-mono py-1 flex items-center gap-1.5">
                                              <span className="transition-transform group-open:rotate-90 inline-block text-[8px]">▶</span>
                                              View Suggested STAR Response
                                            </summary>
                                            <div className="p-2.5 bg-purple-950/10 border border-purple-500/10 rounded-lg mt-1 font-sans text-purple-200 text-[11px] leading-relaxed whitespace-pre-wrap">
                                              {fb.modelAnswer}
                                            </div>
                                          </details>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="flex justify-end pt-2 border-t border-white/5">
                                <button
                                  type="button"
                                  onClick={(e) => deleteHistoryEntry(entry.id, e)}
                                  className="text-gray-500 hover:text-rose-400 flex items-center gap-1 text-[10px] font-mono transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  Delete Session Log
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
