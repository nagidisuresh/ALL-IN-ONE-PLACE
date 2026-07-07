import React, { useState, useMemo, useEffect } from "react";
import { 
  Trophy, Search, Flame, Award, Medal, Users, TrendingUp, 
  ChevronRight, ArrowUpRight, Target, Sparkles, Star, Zap
} from "lucide-react";

interface LeaderboardEntry {
  id: string;
  name: string;
  avatarInitials: string;
  role: string;
  category: "Engineering" | "Product" | "Design" | "Other";
  avgScore: number;
  streak: number;
  isCurrentUser?: boolean;
}

export default function Leaderboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Engineering" | "Product" | "Design" | "Other">("All");
  const [sortBy, setSortBy] = useState<"score" | "streak">("score");

  // Dynamic user data derived from local storage
  const [currentUserData, setCurrentUserData] = useState<{ name: string; score: number; streak: number } | null>(null);

  useEffect(() => {
    // 1. Get current logged in user
    const savedUser = localStorage.getItem("nextroundprep_user");
    let userName = "You";
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        if (u && u.name) userName = u.name;
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }

    // 2. Get user session history to compute real avg score
    const savedHistory = localStorage.getItem("nextroundprep_interview_history");
    let computedScore = 0;
    let hasHistory = false;
    if (savedHistory) {
      try {
        const historyList = JSON.parse(savedHistory);
        if (Array.isArray(historyList) && historyList.length > 0) {
          hasHistory = true;
          const total = historyList.reduce((acc, curr) => acc + (curr.avgScore || 0), 0);
          computedScore = Math.round(total / historyList.length);
        }
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }

    // 3. Retrieve or initialize user streak
    const savedStreak = localStorage.getItem("nextroundprep_streak");
    let computedStreak = 0;
    if (savedStreak) {
      computedStreak = parseInt(savedStreak, 10) || 0;
    } else if (hasHistory) {
      computedStreak = 3; // Give a starter streak if they have completed interviews but no streak stored
      localStorage.setItem("nextroundprep_streak", "3");
    }

    setCurrentUserData({
      name: userName,
      score: computedScore,
      streak: computedStreak
    });
  }, []);

  // Set up mock users
  const mockCompetitors: LeaderboardEntry[] = useMemo(() => [
    { id: "comp-1", name: "Sarah Chen", avatarInitials: "SC", role: "Staff Software Engineer", category: "Engineering", avgScore: 96, streak: 15 },
    { id: "comp-2", name: "Alex Mercer", avatarInitials: "AM", role: "Senior Product Manager", category: "Product", avgScore: 94, streak: 12 },
    { id: "comp-3", name: "Elena Rostova", avatarInitials: "ER", role: "Frontend Developer", category: "Engineering", avgScore: 92, streak: 8 },
    { id: "comp-4", name: "Marcus Aurelius", avatarInitials: "MA", role: "Engineering Lead", category: "Engineering", avgScore: 90, streak: 10 },
    { id: "comp-5", name: "Nia Toliver", avatarInitials: "NT", role: "Lead UX Designer", category: "Design", avgScore: 89, streak: 5 },
    { id: "comp-6", name: "Yuki Sato", avatarInitials: "YS", role: "Technical Program Manager", category: "Product", avgScore: 88, streak: 14 },
    { id: "comp-7", name: "Rajesh Patel", avatarInitials: "RP", role: "Solutions Architect", category: "Engineering", avgScore: 87, streak: 7 },
    { id: "comp-8", name: "Jordan Lee", avatarInitials: "JL", role: "Senior Interaction Designer", category: "Design", avgScore: 85, streak: 4 },
    { id: "comp-9", name: "David Kim", avatarInitials: "DK", role: "Data Scientist", category: "Other", avgScore: 83, streak: 6 },
    { id: "comp-10", name: "Chloe Dupont", avatarInitials: "CD", role: "Product Specialist", category: "Product", avgScore: 81, streak: 3 },
  ], []);

  // Merge current user with mock competitors
  const fullLeaderboard: LeaderboardEntry[] = useMemo(() => {
    if (!currentUserData) return mockCompetitors;

    const userEntry: LeaderboardEntry = {
      id: "current-user-entry",
      name: currentUserData.name,
      avatarInitials: currentUserData.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U",
      role: currentUserData.score > 0 ? "Active Candidate" : "Getting Started 🚀",
      category: "Engineering", // Default category
      avgScore: currentUserData.score,
      streak: currentUserData.streak,
      isCurrentUser: true
    };

    return [...mockCompetitors, userEntry];
  }, [currentUserData, mockCompetitors]);

  // Filter, Search and Sort the list
  const processedLeaderboard = useMemo(() => {
    let list = [...fullLeaderboard];

    // Filter by category
    if (selectedCategory !== "All") {
      list = list.filter(entry => entry.category === selectedCategory || (entry.isCurrentUser && selectedCategory === "Engineering"));
    }

    // Search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter(entry => 
        entry.name.toLowerCase().includes(q) || 
        entry.role.toLowerCase().includes(q)
      );
    }

    // Sort entries
    if (sortBy === "score") {
      list.sort((a, b) => b.avgScore - a.avgScore || b.streak - a.streak);
    } else {
      list.sort((a, b) => b.streak - a.streak || b.avgScore - a.avgScore);
    }

    return list;
  }, [fullLeaderboard, selectedCategory, searchQuery, sortBy]);

  // Find user rank and overall statistics
  const userRankStats = useMemo(() => {
    if (!currentUserData) return { rank: 0, percentile: 100 };
    
    // Sort entire list by score to find overall rank
    const sortedAll = [...fullLeaderboard].sort((a, b) => b.avgScore - a.avgScore);
    const userIndex = sortedAll.findIndex(entry => entry.isCurrentUser);
    const rank = userIndex !== -1 ? userIndex + 1 : sortedAll.length;
    const percentile = Math.round(((sortedAll.length - rank) / sortedAll.length) * 100);

    return { rank, percentile };
  }, [currentUserData, fullLeaderboard]);

  return (
    <div className="space-y-6 animate-fade-in text-left">
      {/* 1. Header Banner & Info */}
      <div className="bg-gradient-to-r from-[#ec4899]/10 to-[#a855f7]/10 border border-[#ec4899]/20 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ec4899] to-[#a855f7] flex items-center justify-center text-white shrink-0 shadow-lg">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Global Candidate Leaderboard</h4>
            <p className="text-[11px] text-gray-300 mt-1 leading-relaxed max-w-xl">
              Measure your preparation discipline against candidates globally. Complete mock interviews, maintain speaking streaks, and boost your AI assessment ratings to rise through the ranks.
            </p>
          </div>
        </div>
        
        {/* Rapid stats summary for logged-in user */}
        {currentUserData && (
          <div className="flex items-center gap-4 bg-black/30 border border-white/5 py-2 px-4 rounded-xl shrink-0">
            <div className="text-center">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono">Your Rank</p>
              <p className="text-xs font-bold text-[#22d3ee] mt-0.5">#{userRankStats.rank}</p>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="text-center">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono">Average Rating</p>
              <p className="text-xs font-bold text-[#ec4899] mt-0.5">{currentUserData.score > 0 ? `${currentUserData.score}%` : "—"}</p>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="text-center">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono">Streak</p>
              <p className="text-xs font-bold text-[#a855f7] flex items-center gap-0.5 mt-0.5 justify-center">
                <Flame className="w-3.5 h-3.5 fill-[#a855f7]/10 text-[#a855f7]" />
                {currentUserData.streak}d
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 2. Top Standings - Trio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* First Place Podium Card */}
        <div className="bg-[#15141f] border border-amber-500/30 rounded-2xl p-5 relative overflow-hidden flex flex-col items-center text-center shadow-[0_8px_30px_rgb(245,158,11,0.05)]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full filter blur-xl pointer-events-none" />
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-mono font-bold text-sm shadow-md mb-3">
            1
          </div>
          <div className="w-12 h-12 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-full flex items-center justify-center font-bold text-white text-base shadow-lg border border-amber-500/20 mb-2">
            SC
          </div>
          <h5 className="text-xs font-bold text-white flex items-center gap-1">
            Sarah Chen
            <Medal className="w-3.5 h-3.5 text-amber-500" />
          </h5>
          <p className="text-[10px] text-gray-400 font-mono mt-0.5">Staff Software Engineer</p>
          <div className="mt-4 flex gap-4 w-full justify-center text-xs border-t border-white/5 pt-3">
            <div>
              <p className="text-[9px] text-gray-500 font-mono">AVG RATING</p>
              <p className="font-bold text-amber-500">96%</p>
            </div>
            <div className="w-px h-5 bg-white/10" />
            <div>
              <p className="text-[9px] text-gray-500 font-mono">STREAK</p>
              <p className="font-bold text-amber-500 flex items-center gap-0.5">
                <Flame className="w-3.5 h-3.5 fill-amber-500/10 text-amber-500" />
                15d
              </p>
            </div>
          </div>
        </div>

        {/* Second Place Podium Card */}
        <div className="bg-[#15141f] border border-slate-300/20 rounded-2xl p-5 relative overflow-hidden flex flex-col items-center text-center shadow-[0_8px_30px_rgb(148,163,184,0.02)]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-slate-300/5 rounded-full filter blur-xl pointer-events-none" />
          <div className="w-10 h-10 rounded-full bg-slate-300/10 border border-slate-300/20 flex items-center justify-center text-slate-300 font-mono font-bold text-sm shadow-md mb-3">
            2
          </div>
          <div className="w-12 h-12 bg-gradient-to-tr from-slate-300 to-slate-400 rounded-full flex items-center justify-center font-bold text-white text-base shadow-lg border border-slate-300/20 mb-2">
            AM
          </div>
          <h5 className="text-xs font-bold text-white flex items-center gap-1">
            Alex Mercer
            <Medal className="w-3.5 h-3.5 text-slate-300" />
          </h5>
          <p className="text-[10px] text-gray-400 font-mono mt-0.5">Senior Product Manager</p>
          <div className="mt-4 flex gap-4 w-full justify-center text-xs border-t border-white/5 pt-3">
            <div>
              <p className="text-[9px] text-gray-500 font-mono">AVG RATING</p>
              <p className="font-bold text-slate-300">94%</p>
            </div>
            <div className="w-px h-5 bg-white/10" />
            <div>
              <p className="text-[9px] text-gray-500 font-mono">STREAK</p>
              <p className="font-bold text-slate-300 flex items-center gap-0.5">
                <Flame className="w-3.5 h-3.5 fill-slate-300/10 text-slate-300" />
                12d
              </p>
            </div>
          </div>
        </div>

        {/* Third Place Podium Card */}
        <div className="bg-[#15141f] border border-amber-700/20 rounded-2xl p-5 relative overflow-hidden flex flex-col items-center text-center shadow-[0_8px_30px_rgb(180,83,9,0.01)]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-700/5 rounded-full filter blur-xl pointer-events-none" />
          <div className="w-10 h-10 rounded-full bg-amber-700/10 border border-amber-700/20 flex items-center justify-center text-amber-700 font-mono font-bold text-sm shadow-md mb-3">
            3
          </div>
          <div className="w-12 h-12 bg-gradient-to-tr from-amber-600 to-amber-700 rounded-full flex items-center justify-center font-bold text-white text-base shadow-lg border border-amber-700/20 mb-2">
            ER
          </div>
          <h5 className="text-xs font-bold text-white flex items-center gap-1">
            Elena Rostova
            <Medal className="w-3.5 h-3.5 text-amber-600" />
          </h5>
          <p className="text-[10px] text-gray-400 font-mono mt-0.5">Frontend Developer</p>
          <div className="mt-4 flex gap-4 w-full justify-center text-xs border-t border-white/5 pt-3">
            <div>
              <p className="text-[9px] text-gray-500 font-mono">AVG RATING</p>
              <p className="font-bold text-amber-600">92%</p>
            </div>
            <div className="w-px h-5 bg-white/10" />
            <div>
              <p className="text-[9px] text-gray-500 font-mono">STREAK</p>
              <p className="font-bold text-amber-600 flex items-center gap-0.5">
                <Flame className="w-3.5 h-3.5 fill-amber-700/10 text-amber-600" />
                8d
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filtering and Searching Header bar */}
      <div className="flex flex-col sm:flex-row gap-3.5 justify-between items-center bg-black/20 p-3 rounded-2xl border border-white/5">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search candidate..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass-input text-white rounded-xl py-2 pl-10 pr-4 text-xs outline-none bg-[#11101c]"
          />
        </div>

        {/* Filters and Sorters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
          {/* Category tabs */}
          <div className="flex bg-[#11101c] p-1 rounded-xl border border-white/5">
            {(["All", "Engineering", "Product", "Design"] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`py-1 px-3 text-[10px] font-bold uppercase tracking-wider font-mono rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#ec4899] text-white font-extrabold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort selection drop dropdown */}
          <div className="flex items-center gap-1.5 bg-[#11101c] py-1 px-3.5 rounded-xl border border-white/5 text-[10px] font-mono">
            <span className="text-gray-500 font-bold uppercase">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "score" | "streak")}
              className="bg-transparent text-[#22d3ee] font-bold outline-none cursor-pointer"
            >
              <option value="score">Rating %</option>
              <option value="streak">Streak Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Ranked List */}
      <div className="bg-black/30 border border-white/5 rounded-2xl overflow-hidden shadow-lg">
        {processedLeaderboard.length === 0 ? (
          <div className="py-12 px-6 text-center space-y-2">
            <Users className="w-8 h-8 text-gray-600 mx-auto" />
            <p className="text-xs font-semibold text-white">No candidates found</p>
            <p className="text-[10px] text-gray-400">Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {processedLeaderboard.map((entry, index) => {
              // Retrieve actual original rank in overall dataset to keep rank absolute
              const overallSorted = [...fullLeaderboard].sort((a, b) => {
                if (sortBy === "score") {
                  return b.avgScore - a.avgScore || b.streak - a.streak;
                } else {
                  return b.streak - a.streak || b.avgScore - a.avgScore;
                }
              });
              const rank = overallSorted.findIndex(e => e.id === entry.id) + 1;
              const isTop3 = rank <= 3;

              return (
                <div 
                  key={entry.id}
                  className={`flex items-center justify-between py-3.5 px-4.5 transition-all text-xs ${
                    entry.isCurrentUser 
                      ? "bg-gradient-to-r from-[#ec4899]/5 via-[#a855f7]/5 to-transparent border-l-2 border-l-[#ec4899]" 
                      : "hover:bg-white/[0.01]"
                  }`}
                >
                  <div className="flex items-center gap-4.5 min-w-0">
                    {/* Rank representation */}
                    <div className="w-7 text-center shrink-0">
                      {isTop3 ? (
                        <span className={`inline-flex items-center justify-center w-5.5 h-5.5 rounded-full font-mono font-bold text-[10px] ${
                          rank === 1 ? "bg-amber-500/25 text-amber-500 border border-amber-500/40" :
                          rank === 2 ? "bg-slate-300/25 text-slate-300 border border-slate-300/40" :
                          "bg-amber-700/25 text-amber-600 border border-amber-700/40"
                        }`}>
                          {rank}
                        </span>
                      ) : (
                        <span className="text-gray-500 font-mono font-medium text-[11px]">{rank}</span>
                      )}
                    </div>

                    {/* Candidate User Avatar */}
                    <div className="relative shrink-0">
                      <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center font-bold text-xs ${
                        entry.isCurrentUser 
                          ? "bg-gradient-to-tr from-[#ec4899] to-[#a855f7] text-white border border-[#ec4899]/30 shadow-md"
                          : "bg-[#1c1a2e] text-gray-300 border border-white/5"
                      }`}>
                        {entry.avatarInitials}
                      </div>
                      
                      {entry.streak >= 10 && (
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-tr from-[#ec4899] to-[#a855f7] flex items-center justify-center text-[8px] border border-[#11101c]" title="Pro Candidate">
                          🔥
                        </span>
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold truncate ${entry.isCurrentUser ? "text-[#ec4899] font-extrabold" : "text-white"}`}>
                          {entry.name}
                        </span>
                        {entry.isCurrentUser && (
                          <span className="bg-[#ec4899]/15 text-[#ec4899] border border-[#ec4899]/20 text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider font-mono">
                            YOU
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 font-mono truncate mt-0.5">{entry.role}</p>
                    </div>
                  </div>

                  {/* Rating Score & Streak Status */}
                  <div className="flex items-center gap-6 shrink-0 font-mono">
                    {/* Performance Rating */}
                    <div className="text-right">
                      <p className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">Rating</p>
                      <p className={`font-bold ${
                        entry.avgScore >= 90 ? "text-emerald-400" :
                        entry.avgScore >= 80 ? "text-[#22d3ee]" :
                        entry.avgScore > 0 ? "text-gray-300" :
                        "text-gray-500 font-normal italic"
                      }`}>
                        {entry.avgScore > 0 ? `${entry.avgScore}%` : "No attempts"}
                      </p>
                    </div>

                    {/* Streak Count */}
                    <div className="text-right min-w-[50px]">
                      <p className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">Streak</p>
                      <p className="font-bold text-white flex items-center gap-0.5 justify-end">
                        <Flame className={`w-3.5 h-3.5 ${
                          entry.streak >= 10 ? "text-[#ec4899] fill-[#ec4899]/15" :
                          entry.streak > 0 ? "text-gray-300" : "text-gray-600"
                        }`} />
                        <span className={entry.streak > 0 ? "text-white" : "text-gray-600"}>
                          {entry.streak}d
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Personal Encouragement Message / Invitation */}
      {currentUserData && currentUserData.score === 0 && (
        <div className="bg-[#11101c]/60 border border-[#22d3ee]/25 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#22d3ee]/10 flex items-center justify-center text-[#22d3ee] shrink-0">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Ready to join the leaderboard?</p>
              <p className="text-[10px] text-gray-400">Complete your first mock interview session to calculate your average rating and start your streak!</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              // Find button elements or set states via callbacks if possible,
              // for now we trigger focus by telling them or resetting view:
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-[#22d3ee] to-[#a855f7] hover:opacity-95 text-white font-bold py-1.5 px-3.5 rounded-xl text-[10px] flex items-center gap-1 shrink-0 transition-all cursor-pointer shadow-md shadow-[#22d3ee]/10"
          >
            Start Practice Session
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
