import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Search, 
  Bookmark, 
  Globe, 
  GraduationCap, 
  Laptop, 
  Heart, 
  Check, 
  ExternalLink, 
  AlertCircle, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  Lightbulb, 
  TrendingUp, 
  Send, 
  Clock, 
  ArrowRight, 
  Info, 
  Copy, 
  RotateCcw, 
  Play, 
  Pause, 
  Plus, 
  Trash2, 
  Award, 
  HelpCircle, 
  Briefcase, 
  FileText, 
  Flame, 
  Zap, 
  Brain, 
  LayoutDashboard 
} from "lucide-react";
import confetti from "canvas-confetti";

interface PainPoint {
  id: string;
  problem: string;
  severity: 1 | 2 | 3 | 4 | 5;
  category: "India" | "Global" | "Both";
  percentage: string;
  description: string;
  symptoms: string[];
  solutionApproach: string;
  recommendedInternalTab?: string;
  externalResourceUrl?: string;
}

interface WebConcept {
  name: string;
  slogan: string;
  suitability: string;
  colorScheme: string;
  badgeColor: string;
  keyFeatures: string[];
}

export default function StudentProblemsHub() {
  const [activeSubTab, setActiveSubTab] = useState<"pain-points" | "prompt-builder" | "naming" | "simulator">("pain-points");
  
  // Custom states
  const [copiedText, setCopiedText] = useState(false);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<number | "All">("All");
  const [categoryFilter, setCategoryFilter] = useState<"All" | "India" | "Global">("All");

  // Master Prompt Customizer States
  const [targetAudience, setTargetAudience] = useState("All Student Backgrounds (K12 to College)");
  const [selectedModules, setSelectedModules] = useState<string[]>([
    "AI Doubt-Solving Tutor", "Interactive Study Roadmaps", "Free Courses Aggregator", "Resume Builder", "Scholarship & Hackathon Finder"
  ]);
  const [designTheme, setDesignTheme] = useState("Dark Obsidian & Cyber Teal Accent");
  const [includeGamification, setIncludeGamification] = useState(true);

  // Simulator: Pomodoro Timer States
  const [pomoTime, setPomoTime] = useState(1500); // 25 mins
  const [pomoActive, setPomoActive] = useState(false);
  const [pomoCompleted, setPomoCompleted] = useState(0);

  // Simulator: Habit Tracker States
  const [habits, setHabits] = useState<{ id: string; text: string; done: boolean }[]>([
    { id: "1", text: "Read research paper or clean technical docs", done: false },
    { id: "2", text: "Solve 1 Daily Coding Challenge", done: true },
    { id: "3", text: "Revise math formulas or notes", done: false },
  ]);
  const [newHabitText, setNewHabitText] = useState("");
  const [streakCount, setStreakCount] = useState(4);
  const [userXp, setUserXp] = useState(320);

  // Simulator: AI Doubts Solver Simulation
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<string>("");
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Pomodoro effect
  useEffect(() => {
    let interval: any = null;
    if (pomoActive && pomoTime > 0) {
      interval = setInterval(() => {
        setPomoTime((prev) => prev - 1);
      }, 1000);
    } else if (pomoTime === 0 && pomoActive) {
      setPomoActive(false);
      setPomoTime(1500);
      setPomoCompleted((prev) => prev + 1);
      confetti({ particleCount: 60, spread: 60, colors: ["#0D9488", "#22d3ee"] });
    }
    return () => clearInterval(interval);
  }, [pomoActive, pomoTime]);

  const handlePomoReset = () => {
    setPomoActive(false);
    setPomoTime(1500);
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitText.trim()) return;
    const next = [...habits, { id: Date.now().toString(), text: newHabitText, done: false }];
    setHabits(next);
    setNewHabitText("");
  };

  const handleToggleHabit = (id: string) => {
    const next = habits.map(h => {
      if (h.id === id) {
        const isDone = !h.done;
        if (isDone) {
          setUserXp((prev) => prev + 50);
          confetti({ particleCount: 20, colors: ["#10b981"] });
        } else {
          setUserXp((prev) => Math.max(0, prev - 50));
        }
        return { ...h, done: isDone };
      }
      return h;
    });
    setHabits(next);
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  // Preset Simulated AI Doubt responses
  const handleSimulateAiResponse = (preset?: string) => {
    const query = preset || aiQuery;
    if (!query) return;

    setIsAiTyping(true);
    setAiResponse("");

    const responses: { [key: string]: string } = {
      "roadmap": `**🎯 B.Tech Computer Science Semester-Wise Action Plan (2026 Edition)**\n\n- **Year 1**: Strengthen fundamentals in C/C++, discrete mathematics, and command-line interfaces. Complete CS50!\n- **Year 2**: Master Data Structures & Algorithms (DSA), study Computer Networks (CN), and build a clean full-stack web project.\n- **Year 3**: Apply for 100% free virtual internships on Forage. Prepare resumes with FlowCV and practice on LeetCode.\n- **Year 4**: Target off-campus hiring, build a portfolio with responsive display layouts, and network with mentors on LinkedIn!`,
      "scholarships": `**🏆 High-Value Student Opportunity Guide**\n\n- **National Scholarship Portal (NSP India)**: Complete government scholarships matching tuition fees.\n- **Buddy4Study**: Direct database for searching state-funded and corporate educational awards.\n- **Google Summer of Code (GSoC)**: Incredible worldwide open-source virtual internship paying massive stipends.\n- **Hackathons**: Discover student hackathons on Unstop or Devpost to win real cash prizes!`,
      "stress": `**🧠 3 Scientifically-Backed Study Stress Management Tips**\n\n1. **The 50-10 Focus Loop**: Study deeply for 50 minutes, then do a 10-minute non-digital screen-free walk. Never look at social media on your breaks!\n2. **Defeat the Blank Slate**: If you are unmotivated, set a 2-minute timer and write just 1 line of notes or code. Once you start, friction disappears.\n3. **Box Breathing**: Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds. Instantly dials down adrenaline.`
    };

    let reply = "I am generating your study plan... Checking global education repositories.";
    if (query.toLowerCase().includes("roadmap") || query.toLowerCase().includes("b.tech") || query.toLowerCase().includes("semester")) {
      reply = responses["roadmap"];
    } else if (query.toLowerCase().includes("scholarship") || query.toLowerCase().includes("free") || query.toLowerCase().includes("opportunity")) {
      reply = responses["scholarships"];
    } else if (query.toLowerCase().includes("stress") || query.toLowerCase().includes("anxiety") || query.toLowerCase().includes("motivation")) {
      reply = responses["stress"];
    } else {
      reply = `**💡 Study Mentor Response to: "${query}"**\n\nThis is an excellent query. Here is a custom strategic solution:\n1. Use **MIT OpenCourseWare** or **Khan Academy** to search for free, top-tier textbook tutorials.\n2. Dedicate at least 45 minutes daily to deep focus without online distractions using a Pomodoro Timer.\n3. Build 1 real-world project to solidify the concept. Practice over passive reading is the key!`;
    }

    let i = 0;
    const timer = setInterval(() => {
      setAiResponse((prev) => prev + reply.charAt(i));
      i++;
      if (i >= reply.length) {
        clearInterval(timer);
        setIsAiTyping(false);
      }
    }, 15);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(masterPrompt);
    setCopiedText(true);
    triggerConfetti();
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleCopyName = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    triggerConfetti();
    setTimeout(() => setCopiedName(null), 2500);
  };

  // Naming Suggestions based on Indian + Global student research
  const suggestedNames: WebConcept[] = [
    {
      name: "EduUniverse",
      slogan: "One Dashboard, Unlimited Educational Discovery",
      suitability: "Best for comprehensive portals merging school curricula (like Khan Academy) with global roadmaps.",
      colorScheme: "Midnight Obsidian and Neon Emerald Teal",
      badgeColor: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
      keyFeatures: ["All-in-one search engine", "Integrated subject directories", "Free textbook trackers"]
    },
    {
      name: "ScholarPulse",
      slogan: "The Heartbeat of Student Academics & Opportunities",
      suitability: "Perfect if you want to focus heavily on scholarship tracking, student competitions, and internships.",
      colorScheme: "Cosmic Indigo and Vibrant Pink",
      badgeColor: "bg-pink-500/10 text-pink-300 border border-pink-500/20",
      keyFeatures: ["Opportunity tracker feed", "Weekly alert automation", "Direct scholarship filtering"]
    },
    {
      name: "UniGrid",
      slogan: "Universal Skill and Career Placement Roadmaps",
      suitability: "Top-tier choice for engineering/technical student guidance, code practice, and resume building.",
      colorScheme: "Deep Slate and Electric Cyan",
      badgeColor: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
      keyFeatures: ["Visual roadmap timelines", "Skill badging & checklists", "Company-wise hiring pathways"]
    },
    {
      name: "StudySphere",
      slogan: "A Harmonious Haven for Modern Learners",
      suitability: "Excellent for visual learners, productivity enthusiasts, daily habit checkers, and student welfare.",
      colorScheme: "Soft Charcoal and Warm Amber Glow",
      badgeColor: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
      keyFeatures: ["Active Pomodoro sandboxes", "Dynamic goal planners", "Stress reduction and wellness guidelines"]
    },
    {
      name: "Campustry",
      slogan: "The Perfect Chemistry of Student Life, Careers, & Community",
      suitability: "Great for collaborative peer study circles, mentor bookings, and local senior discussions.",
      colorScheme: "Royal Violet and Bright Sunset Yellow",
      badgeColor: "bg-purple-500/10 text-purple-300 border border-purple-500/20",
      keyFeatures: ["Peer group boards", "Mentor directory databases", "Vetted college predictor guides"]
    }
  ];

  // Research pain points
  const painPoints: PainPoint[] = [
    {
      id: "career-uncertainty",
      problem: "Career and Stream Confusion (Post 10th / 12th)",
      severity: 5,
      category: "India",
      percentage: "74% Approx.",
      description: "Students lack clarity on which streams, degrees, or fields match their skill sets and interests, leading to parental or peer-forced choices.",
      symptoms: ["Choosing streams solely based on marks", "High anxiety before competitive exams", "Regretting course selection in college"],
      solutionApproach: "Interactive visual career pathways showing exact curriculum, job payouts, and real-world work conditions.",
      recommendedInternalTab: "free-after10th"
    },
    {
      id: "roadmaps-missing",
      problem: "Complete Lack of Actionable Semester/Skill Roadmaps",
      severity: 5,
      category: "Global",
      percentage: "80% Approx.",
      description: "Students have no step-by-step sequential guide outlining what subjects, online certificates, and projects they should prioritize each semester.",
      symptoms: ["Endless scrolling on YouTube", "Wasting hours downloading irrelevant guides", "Learning outdated tech stacks"],
      solutionApproach: "Visual roadmap nodes featuring custom checkpoints, free course tags, and recommended timeline goals.",
      recommendedInternalTab: "free-coding"
    },
    {
      id: "scattered-info",
      problem: "Fragmented & Scattered Learning Resources",
      severity: 5,
      category: "Both",
      percentage: "90% Approx.",
      description: "Syllabi, lecture notes, textbook solutions, previous year papers (PYQs), and mock tests are scattered across thousands of sketchy websites with ads.",
      symptoms: ["Wasting 2+ hours daily searching instead of studying", "Accidentally downloading malware", "Struggling with mismatched syllabus"],
      solutionApproach: "A single unified search dashboard that queries textbook links, verified subject resources, and open platforms.",
      recommendedInternalTab: "free-subjects"
    },
    {
      id: "scam-jobs",
      problem: "Fake Opportunities & Scam Placements",
      severity: 4,
      category: "India",
      percentage: "65% Approx.",
      description: "Scam boards charge student fees for job applications or registration, and list false remote internship postings.",
      symptoms: ["Receiving fake offer letters", "Demands for screening fee payments", "Unpaid data entry scams"],
      solutionApproach: "Curate location-independent boards with robust tax/scam guidelines, emphasizing 100% free browse models.",
      recommendedInternalTab: "free-platforms"
    },
    {
      id: "expensive-coaching",
      problem: "Prohibitively Expensive Exam Coaching",
      severity: 5,
      category: "India",
      percentage: "85% Approx.",
      description: "Competitive entrance exams require coaching centers charging lakhs, locking out underprivileged or rural students.",
      symptoms: ["Massive financial debt on families", "Discrepancies in rural student ranks", "High pressure in tier-3 environments"],
      solutionApproach: "Incorporate free, high-quality open courses like IIT-NPTEL, Swayam, and expert formula sheets.",
      recommendedInternalTab: "free-subjects"
    },
    {
      id: "internships-placement",
      problem: "Struggling to Locate Real Work Gigs & Internships",
      severity: 4,
      category: "Global",
      percentage: "70% Approx.",
      description: "Students lack formal workplace experiences but are locked out of entry-level jobs because they require '2 years experience'.",
      symptoms: ["Dozens of rejected job applications", "Fictional resumes", "Inability to pass live corporate screenings"],
      solutionApproach: "Introduce simulated virtual corporate programs (like Forage) and micro-internships needing no prior background.",
      recommendedInternalTab: "free-simulations"
    },
    {
      id: "scholarships-lost",
      problem: "Scholarship & Opportunity Invisibility",
      severity: 4,
      category: "Both",
      percentage: "60% Approx.",
      description: "Billions of dollars in government and private educational scholarships go unused yearly because students do not know they exist.",
      symptoms: ["Dropping out of college due to fees", "Taking heavy student loan interest", "Missing application deadlines"],
      solutionApproach: "Curated national and global databases containing application alerts, eligibility checks, and real guides."
    },
    {
      id: "mental-health",
      problem: "Overwhelming Exam Stress and Anxiety",
      severity: 5,
      category: "Both",
      percentage: "88% Approx.",
      description: "Crushing exam expectations from universities and parents cause students to burn out, losing motivation and sleep.",
      symptoms: ["Severe insomnia during exams", "Fear of failure paralysis", "Lack of positive study habits"],
      solutionApproach: "Integrate built-in focus techniques (like Pomodoro), clean task trackers, and accessible peer wellness workbooks."
    }
  ];

  // Dynamic filter for pain points
  const filteredPainPoints = painPoints.filter(p => {
    const matchesSearch = 
      p.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.solutionApproach.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity = severityFilter === "All" || p.severity === severityFilter;
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter || p.category === "Both";

    return matchesSearch && matchesSeverity && matchesCategory;
  });

  // Interactive Prompt building block logic
  const handleToggleModule = (module: string) => {
    if (selectedModules.includes(module)) {
      setSelectedModules(selectedModules.filter(m => m !== module));
    } else {
      setSelectedModules([...selectedModules, module]);
    }
  };

  const masterPrompt = `Build a modern, world-class AI-powered student super platform that solves the daily academic and career problems of students from school, undergraduate, and competitive exam backgrounds.

Mission:
Create a single platform where students never need to switch between multiple websites. The platform should combine studying, career planning, skill development, placements, and productivity tools.

Target Audience:
- ${targetAudience}

Core Functional Modules:
${selectedModules.map(m => `- ${m}`).join("\n")}
- Gamified XP, Study Streaks, and Level Badges: ${includeGamification ? "ENABLED (Highly Interactive)" : "DISABLED"}

Design Requirements:
- Theme styling: ${designTheme}
- Mobile-first, fast-loading responsive viewport
- Glassmorphic card grids, beautiful typography, clean whitespace
- Interactive search engine, custom filtering, and intuitive layout

Goal:
Create a highly visual, zero-friction, incredibly helpful student platform that saves hours of searching and helps students successfully transition from education to employment.`;

  return (
    <div className="w-full min-h-screen bg-[#0F172A]/40 text-white p-4 sm:p-8 rounded-3xl border border-white/5 backdrop-blur-md">
      
      {/* Header Banner */}
      <div className="border-b border-white/10 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-3">
            <Brain className="w-3.5 h-3.5 animate-pulse" />
            <span>EduFree Hub Research Module</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight font-display text-white">
            Student Problem Solver & Project Creator
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            We analyzed the biggest friction points Indian and global students face daily. 
            Use this interactive workspace to explore research, pick website names, generate AI builder prompts, and simulate dream solutions!
          </p>
        </div>

        {/* Brand Name suggestions ticker */}
        <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center max-w-xs">
          <p className="text-[10px] font-mono uppercase text-teal-400 tracking-wider">💡 Suggested Site Name</p>
          <p className="text-base font-bold text-white mt-1">EduUniverse ✨</p>
          <span className="text-[9px] text-slate-500">Perfect for multi-resource directories</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-4 mb-8">
        {[
          { id: "pain-points", label: "1. Research & Pain Points", icon: AlertCircle, color: "text-[#ec4899] bg-[#ec4899]/10" },
          { id: "naming", label: "2. Site Naming Station", icon: Award, color: "text-amber-400 bg-amber-400/10" },
          { id: "prompt-builder", label: "3. Interactive Prompt Builder", icon: Sparkles, color: "text-[#22d3ee] bg-[#22d3ee]/10" },
          { id: "simulator", label: "4. Live Feature Simulator", icon: LayoutDashboard, color: "text-emerald-400 bg-emerald-400/10" }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isActive 
                  ? "bg-white text-slate-900 font-extrabold shadow-lg" 
                  : "bg-slate-900/50 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-indigo-600" : ""}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      <div className="space-y-6">
        
        {/* TAB 1: Pain Points & Solutions */}
        {activeSubTab === "pain-points" && (
          <div className="space-y-6 animate-fade-in">
            {/* Context Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl border border-[#ec4899]/25 bg-[#ec4899]/5">
                <span className="text-xl">🇮🇳</span>
                <h4 className="text-sm font-bold text-slate-200 mt-2">Indian Student Dilemmas</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Struggling with post-10th/12th career uncertainty, scattered syllabus links, expensive coaching blocks, and lack of real job roadmaps.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-pink-400 font-mono font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Severity Check: Critical</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-[#22d3ee]/25 bg-[#22d3ee]/5">
                <span className="text-xl">🌍</span>
                <h4 className="text-sm font-bold text-slate-200 mt-2">Global Student Struggles</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Burdened with student debt, invisible scholarship programs, high exam anxiety, and a total lack of structured coding/AI mentor guidelines.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-cyan-400 font-mono font-bold">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Reach: Worldwide</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-200">The Solution Model</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Instead of separate platforms, build a **Student Super Platform** consolidating resources, roadmaps, opportunities, and timers in one hub.
                  </p>
                </div>
                <button
                  onClick={() => setActiveSubTab("prompt-builder")}
                  className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <span>Build This Site Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Pain Points Directory List */}
            <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold">Interactive Pain Points Directory</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Explore each researched problem, the exact symptoms students experience, and our architectural solution.</p>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search struggles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="text-xs bg-black/40 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 outline-none focus:border-purple-500/50 text-white placeholder:text-gray-500 w-36 sm:w-48"
                    />
                  </div>

                  <select
                    value={categoryFilter}
                    onChange={(e: any) => setCategoryFilter(e.target.value)}
                    className="text-xs bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 outline-none text-white focus:border-purple-500/50"
                  >
                    <option value="All">All Regions</option>
                    <option value="India">India Only</option>
                    <option value="Global">Global Only</option>
                  </select>

                  <select
                    value={severityFilter === "All" ? "All" : severityFilter}
                    onChange={(e: any) => setSeverityFilter(e.target.value === "All" ? "All" : Number(e.target.value))}
                    className="text-xs bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 outline-none text-white focus:border-purple-500/50"
                  >
                    <option value="All">All Severities</option>
                    <option value="5">★★★★★ Critical</option>
                    <option value="4">★★★★☆ High</option>
                  </select>
                </div>
              </div>

              {/* Grid of struggles */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPainPoints.length > 0 ? (
                  filteredPainPoints.map((p) => (
                    <div 
                      key={p.id}
                      className="p-5 rounded-xl border border-white/5 bg-slate-950/40 hover:border-indigo-500/30 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Title & Badges */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                            {p.problem}
                          </h4>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-bold uppercase">
                              {p.category}
                            </span>
                            <span className="text-[9px] font-bold text-amber-400 bg-amber-400/15 border border-amber-400/20 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <span>{"★".repeat(p.severity)}</span>
                              <span>{"☆".repeat(5 - p.severity)}</span>
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                          {p.description}
                        </p>

                        {/* Symptoms bullet list */}
                        <div className="mb-4 space-y-1 bg-black/20 p-3 rounded-lg border border-white/5">
                          <span className="text-[10px] font-mono text-pink-400 uppercase tracking-wider font-bold">Daily Symptoms:</span>
                          <div className="space-y-1">
                            {p.symptoms.map((s, idx) => (
                              <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                                <span className="text-red-400 mt-0.5">•</span>
                                <span>{s}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Solution approach */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">Solution Approach:</span>
                          <p className="text-[11px] text-slate-200 leading-relaxed">
                            {p.solutionApproach}
                          </p>
                        </div>
                      </div>

                      {/* Action trigger to showcase site tabs solving this */}
                      {p.recommendedInternalTab && (
                        <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[10px] text-slate-500 font-mono">
                            Impact: {p.percentage} of users
                          </span>
                          <button
                            onClick={() => {
                              // We can simulate solving it or redirect to the sub-tab!
                              const element = document.getElementById("pills-selector-bar");
                              if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                              }
                              setActiveSubTab("simulator");
                              // preset aiQuery to solve that problem
                              setAiQuery(`How do I solve: ${p.problem}?`);
                              handleSimulateAiResponse(`How do I solve: ${p.problem}?`);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer transition-all"
                          >
                            <span>Simulate Solution</span>
                            <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12 text-slate-500 text-xs">
                    No student problems match your search criteria. Try adjusting the dropdown filters.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Site Naming Station */}
        {activeSubTab === "naming" && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Website Naming Station & Concept Guide</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                You asked: <span className="italic text-slate-200">"FROM THAT WHICH NAME I PUT TO THAT WEBSITE."</span> 
                Here are 5 premium, tailored brand identity concepts designed specifically to solve student pain points. Click to copy your favorite!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                {suggestedNames.map((concept) => {
                  const isCopied = copiedName === concept.name;
                  return (
                    <div 
                      key={concept.name}
                      className="p-5 rounded-xl border border-white/5 bg-slate-950/50 hover:border-amber-400/30 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Name Header */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h4 className="text-base font-extrabold text-white tracking-tight">
                            {concept.name}
                          </h4>
                          <span className={`text-[9px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 rounded ${concept.badgeColor}`}>
                            Concept
                          </span>
                        </div>

                        {/* Slogan */}
                        <p className="text-xs font-medium text-amber-300 italic mb-3">
                          "{concept.slogan}"
                        </p>

                        <p className="text-[11px] text-slate-400 leading-normal mb-4">
                          {concept.suitability}
                        </p>

                        {/* Visuals */}
                        <div className="space-y-1.5 text-[11px] mb-4 border-t border-b border-white/5 py-3">
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-mono">Suggested Theme:</span>
                            <span className="text-slate-300 font-bold">{concept.colorScheme}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-mono">Simulated Domain:</span>
                            <span className="text-teal-400 font-mono underline">{concept.name.toLowerCase()}.org</span>
                          </div>
                        </div>

                        {/* Highlighted Modules */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">Key Focus Modules:</span>
                          <div className="flex flex-wrap gap-1">
                            {concept.keyFeatures.map((f, i) => (
                              <span key={i} className="text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Copy Action */}
                      <button
                        onClick={() => handleCopyName(concept.name)}
                        className={`mt-6 w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isCopied 
                            ? "bg-emerald-600 text-white" 
                            : "bg-amber-400 hover:bg-amber-500 text-slate-900"
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Name Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Brand Package</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Interactive Prompt Builder */}
        {activeSubTab === "prompt-builder" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* Controls Panel (7 columns) */}
            <div className="lg:col-span-5 p-6 bg-slate-900/40 rounded-2xl border border-white/5 space-y-6">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2 text-[#22d3ee]">
                  <Sparkles className="w-5 h-5" />
                  <span>Configure Master AI Prompt</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Customize your student platform settings below. The prompt updates in real-time, ready for you to paste into Claude or Gemini!
                </p>
              </div>

              {/* Target Audience */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wide text-slate-400 block">
                  Target Student Base
                </label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500/50 text-slate-200"
                >
                  <option value="All Student Backgrounds (K12 to College)">All Student Backgrounds (K12 to College)</option>
                  <option value="Indian Competitive Aspirants (EAMCET, JEE, NEET)">Indian Competitive Aspirants (EAMCET, JEE, NEET)</option>
                  <option value="Engineering & B.Tech CSE Students">Engineering & B.Tech CSE Students</option>
                  <option value="Global Digital Nomads & Freelance Aspirants">Global Digital Nomads & Freelance Aspirants</option>
                </select>
              </div>

              {/* Modules Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wide text-slate-400 block">
                  Include Modules ({selectedModules.length} selected)
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {[
                    "AI Doubt-Solving Tutor",
                    "Interactive Study Roadmaps",
                    "Free Courses Aggregator",
                    "Resume Builder",
                    "Scholarship & Hackathon Finder",
                    "Gamified Daily Habit Tracker",
                    "Notes & PYQ Library Dashboard",
                    "Active Focus Pomodoro Clock",
                    "Placement & Mock Exam Simulator",
                    "Vetted Colleges & Predictor Tools"
                  ].map((mod) => {
                    const isChecked = selectedModules.includes(mod);
                    return (
                      <button
                        key={mod}
                        type="button"
                        onClick={() => handleToggleModule(mod)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${
                          isChecked 
                            ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300" 
                            : "bg-slate-950/60 border-white/5 text-slate-400 hover:text-white"
                        }`}
                      >
                        <span>{mod}</span>
                        {isChecked ? (
                          <Check className="w-3.5 h-3.5 text-cyan-400" />
                        ) : (
                          <Plus className="w-3.5 h-3.5 text-slate-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Theme selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wide text-slate-400 block">
                  Design Aesthetics
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Dark Obsidian & Cyber Teal Accent",
                    "Midnight Aurora (Purple & Cyan Glow)",
                    "Soft Slate & Ivory (Sophisticated Light)",
                    "High-Contrast Retro Terminal Style"
                  ].map((themeOpt) => (
                    <button
                      key={themeOpt}
                      onClick={() => setDesignTheme(themeOpt)}
                      className={`p-2 rounded-lg text-[10px] font-bold border transition-all text-center cursor-pointer ${
                        designTheme === themeOpt 
                          ? "bg-white text-slate-900 border-white font-extrabold" 
                          : "bg-slate-950 border-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      {themeOpt.split(" (")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gamified Check */}
              <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-white/5 text-xs">
                <div>
                  <span className="font-bold block">XP & Leaderboards Gamification</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Encourage study consistency with XP.</span>
                </div>
                <input
                  type="checkbox"
                  checked={includeGamification}
                  onChange={(e) => setIncludeGamification(e.target.checked)}
                  className="w-4 h-4 text-cyan-500 border-white/10 rounded focus:ring-0 cursor-pointer accent-cyan-400"
                />
              </div>
            </div>

            {/* Prompt Output Panel (5 columns) */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 bg-slate-950 rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Generated System Prompt</span>
                  </div>
                  <span className="text-[9px] bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 font-mono px-1.5 py-0.5 rounded font-bold uppercase">
                    Ready to Use
                  </span>
                </div>

                {/* Textarea container styled like IDE */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs font-mono text-slate-300 leading-relaxed overflow-y-auto max-h-[380px] scrollbar-thin select-all whitespace-pre-wrap">
                  {masterPrompt}
                </div>
              </div>

              {/* Action Button */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[10px] text-slate-500 leading-normal max-w-sm text-center sm:text-left">
                  This customized prompt is fully optimized to instruct LLMs to code this full student website cleanly!
                </p>
                <button
                  onClick={handleCopyPrompt}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    copiedText 
                      ? "bg-emerald-600 text-white shadow-emerald-600/10" 
                      : "bg-cyan-400 hover:bg-cyan-500 text-slate-900 shadow-cyan-400/10"
                  }`}
                >
                  {copiedText ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied Prompt to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Master Prompt</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Live Feature Simulator */}
        {activeSubTab === "simulator" && (
          <div className="space-y-8 animate-fade-in">
            {/* Top overview alert */}
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-2xl flex items-start gap-3">
              <Lightbulb className="w-5 h-5 mt-0.5 text-amber-400 animate-pulse flex-shrink-0" />
              <div>
                <p className="text-xs font-bold font-mono uppercase tracking-wider">🔬 Interactive Super-Platform Preview Sandbox</p>
                <p className="text-xs text-slate-300 mt-1">
                  We simulated three core modules of your dream platform: an active **Pomodoro Timer**, a gamified **Habit Tracker**, and an **AI Doubt Solver**! 
                  Interact with them to see how beautiful and fast a student-focused super app can behave.
                </p>
              </div>
            </div>

            {/* Simulator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Pomodoro & Habit (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* ⏱️ POMODORO TIMER MODULE */}
                <div className="p-5 bg-slate-900/40 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2 text-pink-400 font-bold text-xs font-mono uppercase">
                      <Clock className="w-4 h-4" />
                      <span>Active Pomodoro Focus</span>
                    </div>
                    {pomoCompleted > 0 && (
                      <span className="text-[9px] bg-pink-500/10 text-pink-300 px-2 py-0.5 rounded font-mono font-bold uppercase border border-pink-500/20">
                        {pomoCompleted} Done
                      </span>
                    )}
                  </div>

                  <div className="text-center py-4">
                    {/* Time Display */}
                    <div className="text-4xl font-black font-mono tracking-tight text-white">
                      {Math.floor(pomoTime / 60).toString().padStart(2, "0")}
                      <span className="animate-pulse text-pink-400">:</span>
                      {(pomoTime % 60).toString().padStart(2, "0")}
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-widest">Deep Focus State</p>
                  </div>

                  {/* Timer Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPomoActive(!pomoActive)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        pomoActive 
                          ? "bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20" 
                          : "bg-pink-600 hover:bg-pink-500 text-white"
                      }`}
                    >
                      {pomoActive ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause Focus</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Start Focus Loop</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handlePomoReset}
                      className="p-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-slate-950 text-slate-400 hover:text-white cursor-pointer transition-all"
                      title="Reset Timer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 📝 DAILY HABIT CHECKLIST (GAMIFIED) */}
                <div className="p-5 bg-slate-900/40 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-mono uppercase">
                      <Flame className="w-4 h-4 animate-bounce" />
                      <span>Habits & Streak Engine</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <div className="flex items-center gap-1 text-amber-400">
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold">{streakCount} Days</span>
                      </div>
                      <div className="flex items-center gap-1 text-cyan-400">
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold">{userXp} XP</span>
                      </div>
                    </div>
                  </div>

                  {/* List of habits */}
                  <div className="space-y-2">
                    {habits.map((h) => (
                      <div 
                        key={h.id} 
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                          h.done 
                            ? "bg-emerald-500/5 border-emerald-500/20 text-slate-400" 
                            : "bg-slate-950/60 border-white/5 text-slate-200"
                        }`}
                      >
                        <button
                          onClick={() => handleToggleHabit(h.id)}
                          className="flex items-center gap-2 text-left text-xs cursor-pointer"
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                            h.done 
                              ? "bg-emerald-500 border-emerald-500 text-white" 
                              : "border-white/20"
                          }`}>
                            {h.done && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className={h.done ? "line-through text-slate-500" : ""}>{h.text}</span>
                        </button>

                        <button 
                          onClick={() => handleDeleteHabit(h.id)}
                          className="text-slate-600 hover:text-red-400 p-1 rounded transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Habit Form */}
                  <form onSubmit={handleAddHabit} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add custom daily goal..."
                      value={newHabitText}
                      onChange={(e) => setNewHabitText(e.target.value)}
                      className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-emerald-500/50 text-white"
                    />
                    <button
                      type="submit"
                      className="px-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Column: AI Tutor Doubt simulation (7 cols) */}
              <div className="lg:col-span-7 p-5 bg-slate-900/40 rounded-2xl border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs font-mono uppercase">
                      <Brain className="w-4 h-4" />
                      <span>AI Doubt Tutor Simulator</span>
                    </div>
                    <span className="text-[9px] bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 font-mono px-2 py-0.5 rounded font-bold uppercase">
                      Vetted Responses
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-normal mb-4">
                    Type a study/career question or click one of our curated high-importance presets to watch the AI mentor resolve it:
                  </p>

                  {/* Presets Row */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <button
                      onClick={() => {
                        setAiQuery("Give me a CSE Semester-wise roadmap");
                        handleSimulateAiResponse("roadmap");
                      }}
                      className="text-[10px] bg-slate-950 border border-white/5 hover:border-cyan-400/30 text-slate-300 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      🎓 Semester CSE Roadmap
                    </button>
                    <button
                      onClick={() => {
                        setAiQuery("Where to find scholarship list?");
                        handleSimulateAiResponse("scholarships");
                      }}
                      className="text-[10px] bg-slate-950 border border-white/5 hover:border-cyan-400/30 text-slate-300 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      💰 Scholarship Database
                    </button>
                    <button
                      onClick={() => {
                        setAiQuery("I feel exam stress & anxiety");
                        handleSimulateAiResponse("stress");
                      }}
                      className="text-[10px] bg-slate-950 border border-white/5 hover:border-cyan-400/30 text-slate-300 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      🧠 Overcoming Study Stress
                    </button>
                  </div>

                  {/* AI Response Output Block */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 min-h-48 flex flex-col justify-between mb-4">
                    {aiResponse || isAiTyping ? (
                      <div className="text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-wrap select-text">
                        {aiResponse}
                        {isAiTyping && (
                          <span className="inline-block w-1.5 h-3 bg-cyan-400 ml-1 animate-pulse" />
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center text-slate-500 py-10 gap-2">
                        <HelpCircle className="w-8 h-8 text-slate-600 animate-pulse" />
                        <p className="text-xs">No active query running. Type below or select a preset above.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Input query field */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask anything (e.g. 'How to build fullstack portfolio as fresher?')..."
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSimulateAiResponse();
                    }}
                    disabled={isAiTyping}
                    className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-cyan-500/50 text-white disabled:opacity-50"
                  />
                  <button
                    onClick={() => handleSimulateAiResponse()}
                    disabled={isAiTyping || !aiQuery.trim()}
                    className="px-4 bg-cyan-400 hover:bg-cyan-500 text-slate-900 rounded-xl text-xs font-bold cursor-pointer transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ask AI</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
