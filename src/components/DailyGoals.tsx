import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle, Flame, Sparkles, Award, Zap, HelpCircle } from "lucide-react";
import { doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";

interface Goal {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  category: string;
}

export default function DailyGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [currentXp, setCurrentXp] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const defaultGoals: Goal[] = [
    {
      id: "goal-1",
      title: "Take a Mock Interview",
      description: "Complete 1 full AI Interview Loop to practice speaking pacing and STAR delivery.",
      xp: 50,
      completed: false,
      category: "Interview",
    },
    {
      id: "goal-2",
      title: "Optimize Your Resume",
      description: "Analyze and improve your resume score inside the Resume Enhancer tool.",
      xp: 40,
      completed: false,
      category: "Resume",
    },
    {
      id: "goal-3",
      title: "Solve a Roadmap Quiz",
      description: "Complete at least 1 milestone quiz from your customized prep roadmap.",
      xp: 30,
      completed: false,
      category: "Quiz",
    },
    {
      id: "goal-4",
      title: "Consult Career Coach",
      description: "Ask NextRound AI Career Coach for feedback or a preparation strategy tip.",
      xp: 25,
      completed: false,
      category: "Career Coach",
    },
  ];

  // Monitor user state and fetch current points
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserId(user.uid);
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setCurrentXp(userSnap.data().points ?? 0);
          }
        } catch (err) {
          console.error("Error reading user points:", err);
        }
      } else {
        setUserId(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Initialize goals from localStorage (for persistence across daily resets)
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const savedGoalsKey = `nextround_daily_goals_${today}`;
    const saved = localStorage.getItem(savedGoalsKey);

    if (saved) {
      try {
        setGoals(JSON.parse(saved));
      } catch (e) {
        setGoals(defaultGoals);
      }
    } else {
      // Clear older days keys to save storage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("nextround_daily_goals_")) {
          localStorage.removeItem(key);
        }
      }
      setGoals(defaultGoals);
      localStorage.setItem(savedGoalsKey, JSON.stringify(defaultGoals));
    }
  }, []);

  // Sync goals state back to localStorage
  const saveGoalsState = (updatedGoals: Goal[]) => {
    const today = new Date().toISOString().split("T")[0];
    const savedGoalsKey = `nextround_daily_goals_${today}`;
    localStorage.setItem(savedGoalsKey, JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
  };

  const handleToggleComplete = async (goalId: string) => {
    if (!userId) return;

    const updatedGoals = goals.map((g) => {
      if (g.id === goalId) {
        const newStatus = !g.completed;
        
        // Update XP in Firebase & Local state
        if (newStatus) {
          // Add XP Points
          try {
            const userRef = doc(db, "users", userId);
            updateDoc(userRef, {
              points: increment(g.xp),
            }).then(() => {
              setCurrentXp(prev => prev + g.xp);
            });
            
            // Pop confetti!
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.8 },
              colors: ["#ec4899", "#a855f7", "#22d3ee"],
            });
          } catch (err) {
            console.error("Error adding XP:", err);
          }
        } else {
          // Remove XP Points if unchecked
          try {
            const userRef = doc(db, "users", userId);
            updateDoc(userRef, {
              points: increment(-g.xp),
            }).then(() => {
              setCurrentXp(prev => Math.max(0, prev - g.xp));
            });
          } catch (err) {
            console.error("Error removing XP:", err);
          }
        }

        return { ...g, completed: newStatus };
      }
      return g;
    });

    saveGoalsState(updatedGoals);
  };

  const completedCount = goals.filter((g) => g.completed).length;
  const progressPercent = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

  return (
    <div className="bg-[#15141f] border border-white/5 rounded-3xl p-6 relative overflow-hidden text-left shadow-xl">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-gradient-to-bl from-[#ec4899]/5 to-transparent rounded-full filter blur-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#ec4899]/10 text-[#ec4899] border border-[#ec4899]/20">
              <Zap className="w-5 h-5 text-[#ec4899] animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                Daily Study Goals
              </h4>
              <p className="text-[10px] text-gray-400">
                Hit daily targets to maximize retention & skyrocket your stand.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-black/30 border border-white/5 py-1 px-3 rounded-xl shrink-0 text-center">
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest font-mono block">Goals Finished</span>
          <span className="text-xs font-mono font-bold text-[#ec4899]">
            {completedCount}/{goals.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-5 space-y-1.5">
        <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
          <span>Today's Progress</span>
          <span className="text-[#22d3ee] font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full bg-white/[0.03] rounded-full h-1.5 border border-white/[0.02]">
          <div 
            style={{ width: `${progressPercent}%` }}
            className="bg-gradient-to-r from-[#ec4899] to-[#22d3ee] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(236,72,153,0.3)]"
          />
        </div>
      </div>

      {/* Checklist List */}
      <div className="space-y-3">
        {goals.map((goal, idx) => (
          <div 
            key={goal.id}
            onClick={() => handleToggleComplete(goal.id)}
            className={`flex items-start gap-4 p-3.5 rounded-2xl border transition-all cursor-pointer select-none group ${
              goal.completed 
                ? "bg-white/[0.01] border-emerald-500/10 opacity-70" 
                : "bg-black/20 border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
            }`}
          >
            {/* Checkbox Trigger */}
            <div className="shrink-0 mt-0.5">
              {goal.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/10" />
              ) : (
                <Circle className="w-5 h-5 text-gray-500 group-hover:text-gray-400 transition-colors" />
              )}
            </div>

            {/* Content text */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 justify-between">
                <span className={`text-xs font-bold transition-all ${
                  goal.completed ? "line-through text-gray-500" : "text-white"
                }`}>
                  {goal.title}
                </span>
                
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  goal.completed 
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : "bg-[#ec4899]/10 text-[#ec4899]"
                }`}>
                  +{goal.xp} XP
                </span>
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                {goal.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Motivator Footer */}
      {completedCount === goals.length && goals.length > 0 && (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-5 p-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-center flex items-center justify-center gap-2"
        >
          <Award className="w-4 h-4 text-emerald-400 animate-bounce" />
          <span className="text-[10px] text-emerald-400 font-bold font-mono uppercase tracking-wider">
            Incredible! Daily Checklist Completed 🌟
          </span>
        </motion.div>
      )}
    </div>
  );
}
