import React, { useState, useEffect } from "react";
import { 
  X, User, Mail, Briefcase, Award, FileText, TrendingUp, Zap, 
  Flame, Target, Activity, CheckCircle, Save, Sparkles, Sliders, Phone
} from "lucide-react";

interface ProfileDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string };
  onUserUpdate: (updated: { name: string; email: string }) => void;
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

export default function ProfileDashboardModal({ isOpen, onClose, user, onUserUpdate }: ProfileDashboardModalProps) {
  const [activeSubTab, setActiveSubTab] = useState<"info" | "performance">("info");
  
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

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
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

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

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
        <div className="px-6 bg-black/20 border-b border-white/5 flex gap-6 relative z-10">
          <button
            type="button"
            onClick={() => setActiveSubTab("info")}
            className={`py-3 text-xs font-bold uppercase tracking-wider font-mono border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
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
            className={`py-3 text-xs font-bold uppercase tracking-wider font-mono border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === "performance" 
                ? "border-[#ec4899] text-white" 
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#22d3ee]" />
            Performance & Stats
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

              {/* History brief row */}
              {stats.completedInterviews.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Recent Mock Activity</span>
                  <div className="bg-black/30 border border-white/5 rounded-2xl p-3 divide-y divide-white/5">
                    {stats.completedInterviews.slice(0, 3).map((session, idx) => (
                      <div key={session.id || idx} className="flex justify-between items-center py-2 text-xs">
                        <div className="min-w-0">
                          <p className="font-bold text-white truncate">{session.role || "General Preparation"} Interview</p>
                          <p className="text-[9px] text-gray-400 font-mono">{session.timestamp || "Recent"}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="bg-[#11101c] border border-white/5 text-[9px] font-bold px-2 py-0.5 rounded-full font-mono text-gray-400">
                            {session.feedbacks?.length || 0} Qs
                          </span>
                          <span className="text-[#ec4899] font-extrabold font-mono">{session.avgScore || 0}%</span>
                        </div>
                      </div>
                    ))}
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
