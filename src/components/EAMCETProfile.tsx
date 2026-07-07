import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  User, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Flame, 
  Bell, 
  History, 
  Trash2,
  Bookmark,
  Share2,
  Cpu,
  ChevronRight,
  ShieldCheck,
  Edit2
} from "lucide-react";
import { MOCK_COLLEGES } from "./eamcetMockData";
import { College } from "../eamcetTypes";

interface PracticeAttempt {
  id: string;
  date: string;
  subject: string;
  totalQuestions: number;
  score: number;
  accuracy: number;
  timestamp: number;
}

export default function EAMCETProfile() {
  const [userName, setUserName] = useState<string>("Aspirant");
  const [userRank, setUserRank] = useState<number>(5500);
  const [userCategory, setUserCategory] = useState<string>("OC");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>("");
  const [tempRank, setTempRank] = useState<number>(0);
  const [tempCategory, setTempCategory] = useState<string>("");

  // Practice History
  const [attempts, setAttempts] = useState<PracticeAttempt[]>([]);
  
  // Notification center states
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Registration Window Open", desc: "TGCHE has opened Phase-1 fee payment portal. Deadline is July 12.", date: "Just now", unread: true },
    { id: 2, title: "Option-Entry Guide PDF Released", desc: "Check out the recommended ordering guidelines prior to submission.", date: "2 hours ago", unread: true },
    { id: 3, title: "Mock Allotment Running", desc: "Use EAMCETPrep predictor to cross-verify potential seat allot matrices.", date: "1 day ago", unread: false }
  ]);

  // Load profile metrics from localStorage
  useEffect(() => {
    // Load User
    try {
      const savedUser = localStorage.getItem("nextroundprep_user");
      if (savedUser) {
        const u = JSON.parse(savedUser);
        setUserName(u.name || "Aspirant");
        setUserRank(u.rank || 5500);
        setUserCategory(u.category || "OC");
      } else {
        // Set fallback defaults
        const defaults = { name: "Abhinav Reddy", rank: 5420, category: "OC" };
        localStorage.setItem("nextroundprep_user", JSON.stringify(defaults));
        setUserName(defaults.name);
        setUserRank(defaults.rank);
        setUserCategory(defaults.category);
      }
    } catch (e) {
      console.error(e);
    }

    // Load History
    loadHistory();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadHistory();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const loadHistory = () => {
    try {
      const savedHistory = localStorage.getItem("eamcet_practice_history");
      if (savedHistory) {
        setAttempts(JSON.parse(savedHistory));
      } else {
        // Seed standard mock history
        const mockHist: PracticeAttempt[] = [
          { id: "h1", date: "07/04/2026", subject: "Chemistry", totalQuestions: 5, score: 4, accuracy: 80, timestamp: Date.now() - 86400000 },
          { id: "h2", date: "07/05/2026", subject: "Mathematics", totalQuestions: 5, score: 3, accuracy: 60, timestamp: Date.now() - 43200000 }
        ];
        localStorage.setItem("eamcet_practice_history", JSON.stringify(mockHist));
        setAttempts(mockHist);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditOpen = () => {
    setTempName(userName);
    setTempRank(userRank);
    setTempCategory(userCategory);
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    if (!tempName.trim()) {
      alert("Please enter a valid name.");
      return;
    }
    if (tempRank <= 0) {
      alert("Please enter a valid rank.");
      return;
    }

    const updated = { name: tempName, rank: tempRank, category: tempCategory };
    localStorage.setItem("nextroundprep_user", JSON.stringify(updated));
    setUserName(tempName);
    setUserRank(tempRank);
    setUserCategory(tempCategory);
    setIsEditing(false);

    // Dispatch storage event to keep other tabs synchronized
    window.dispatchEvent(new Event("storage"));
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to delete all practice history logs?")) {
      localStorage.removeItem("eamcet_practice_history");
      setAttempts([]);
    }
  };

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  // Saved Colleges
  const favoriteColleges = MOCK_COLLEGES.slice(0, 2);

  // Statistics summaries
  const totalSolved = attempts.reduce((acc, curr) => acc + curr.totalQuestions, 0);
  const totalCorrect = attempts.reduce((acc, curr) => acc + curr.score, 0);
  const overallAccuracy = totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;
  const activeStreak = 3; // Mock streak

  return (
    <div id="eamcet-profile-view" className="space-y-8 py-6 px-4 md:px-8 max-w-6xl mx-auto relative z-10 font-sans">
      {/* Personalized Welcome Card with glassmorphism */}
      <div className="relative rounded-3xl border border-white/5 bg-gradient-to-r from-blue-950/20 via-indigo-950/20 to-neutral-900/50 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/10 shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{userName}</h1>
              <button
                onClick={handleEditOpen}
                className="p-1.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 font-mono flex items-center gap-1.5 uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> State Academic Profile Verified
            </p>
          </div>
        </div>

        {/* Rank Badge */}
        <div className="flex gap-4 items-center shrink-0">
          <div className="bg-neutral-950/60 border border-white/5 p-4 rounded-2xl text-right font-mono min-w-32">
            <span className="text-[9px] text-gray-500 uppercase block">EAMCET Rank</span>
            <strong className="text-indigo-400 text-lg sm:text-xl font-sans tracking-tight">#{userRank}</strong>
          </div>
          <div className="bg-neutral-950/60 border border-white/5 p-4 rounded-2xl text-right font-mono min-w-28">
            <span className="text-[9px] text-gray-500 uppercase block">Category</span>
            <strong className="text-white text-lg font-sans tracking-tight">{userCategory}</strong>
          </div>
        </div>
      </div>

      {/* Profile Edit Overlay / Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0c0c16] border border-white/10 rounded-3xl max-w-sm w-full p-6 space-y-6 relative shadow-2xl"
          >
            <h2 className="text-lg font-bold text-white tracking-tight border-b border-white/5 pb-3">Update Academic Info</h2>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-gray-400 uppercase font-mono text-[9px]">Full Name</label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2.5 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-400 uppercase font-mono text-[9px]">Expected/Actual Rank</label>
                <input
                  type="number"
                  value={tempRank}
                  onChange={(e) => setTempRank(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2.5 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-400 uppercase font-mono text-[9px]">Reservation Category</label>
                <select
                  value={tempCategory}
                  onChange={(e) => setTempCategory(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                >
                  <option value="OC">OC</option>
                  <option value="BC-A">BC-A</option>
                  <option value="BC-B">BC-B</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2 text-xs font-semibold">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl"
              >
                Save Updates
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Grid: Statistics & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Statistics & Practice History column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Practice Summary Badges */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl flex flex-col justify-between">
              <span className="text-[10px] text-gray-500 font-mono uppercase">Solved MCQs</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-xl sm:text-2xl font-bold text-white">{totalSolved}</span>
                <span className="text-[10px] text-gray-400">items</span>
              </div>
            </div>
            <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl flex flex-col justify-between">
              <span className="text-[10px] text-gray-500 font-mono uppercase">Avg Accuracy</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-xl sm:text-2xl font-bold text-emerald-400">{overallAccuracy}%</span>
              </div>
            </div>
            <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl flex flex-col justify-between">
              <span className="text-[10px] text-gray-500 font-mono uppercase">Study Streak</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-xl sm:text-2xl font-bold text-amber-500 flex items-center gap-1">
                  <Flame className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
                  <span>{activeStreak}d</span>
                </span>
              </div>
            </div>
          </div>

          {/* Practice History Table */}
          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-400" />
                <span>Recent Practice History Logs</span>
              </h3>

              {attempts.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-[10px] text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1 font-mono uppercase cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Clear History
                </button>
              )}
            </div>

            {attempts.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-500">
                No mock practice logs recorded yet. Start practicing chapter quizzes!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500 uppercase">
                      <th className="py-2.5">Date</th>
                      <th className="py-2.5">Subject</th>
                      <th className="py-2.5">Score</th>
                      <th className="py-2.5">Accuracy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attempts.map((att) => (
                      <tr key={att.id} className="border-b border-white/5 text-white/90">
                        <td className="py-3 text-gray-400">{att.date}</td>
                        <td className="py-3 font-semibold">{att.subject}</td>
                        <td className="py-3">{att.score} / {att.totalQuestions}</td>
                        <td className="py-3 text-emerald-400">{att.accuracy}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Notification center column */}
        <div className="space-y-6">
          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-400" />
                <span>Live counseling Alerts</span>
              </h3>

              <button
                onClick={markAllRead}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 font-mono uppercase cursor-pointer"
              >
                Mark all read
              </button>
            </div>

            <div className="space-y-3">
              {notifications.map((not) => (
                <div
                  key={not.id}
                  className={`p-3.5 rounded-xl border relative transition-all ${
                    not.unread 
                      ? "bg-indigo-950/10 border-indigo-500/20" 
                      : "bg-white/[0.01] border-white/5"
                  }`}
                >
                  {not.unread && (
                    <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  )}
                  <h4 className="text-xs font-bold text-white">{not.title}</h4>
                  <p className="text-[11px] text-gray-400 font-light mt-1 leading-normal">{not.desc}</p>
                  <span className="text-[9px] text-gray-500 font-mono uppercase mt-2 block">{not.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Colleges Checklist */}
          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-indigo-400" />
              <span>Saved Favorite Colleges</span>
            </h3>

            <div className="space-y-3">
              {favoriteColleges.map((col) => (
                <div key={col.id} className="flex items-center justify-between p-3 bg-neutral-900/40 border border-white/5 rounded-xl text-xs">
                  <div className="space-y-0.5">
                    <strong className="text-white block font-sans">{col.name} ({col.code})</strong>
                    <span className="text-[10px] text-gray-500 font-mono uppercase">{col.district} &bull; Average {col.averagePackage} LPA</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
