import React, { useState, useEffect } from "react";
import { 
  Sparkles, Globe, GraduationCap, Laptop, BookOpen, FileText, 
  Compass, Award, Rocket, Box, Info, Bookmark, Play, Pause, 
  RotateCcw, Trash2, Plus, Check, Clock, Brain, AlertTriangle, 
  TrendingUp, Calendar, Heart, Send, CheckCircle2, ArrowRight, 
  Copy, PhoneCall, Shield, Search, Award as BadgeIcon, Users, 
  ChevronRight, ArrowUpRight, Smile, Briefcase, Zap, Star
} from "lucide-react";
import confetti from "canvas-confetti";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  Legend,
  AreaChart,
  Area
} from "recharts";

// Dynamic mock database of resources, roadmaps, and helplines
const FREE_STUDY_RESOURCES = [
  { name: "Khan Academy", url: "https://www.khanacademy.org", category: "K-12 & STEM", desc: "Completely free school curricula, math, and foundational science courses." },
  { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu", category: "University", desc: "Syllabus-based materials and lectures directly from actual MIT courses." },
  { name: "NPTEL / SWAYAM", url: "https://swayam.gov.in", category: "India / CSE", desc: "Government of India initiative offering engineering courses with credit transfer." },
  { name: "freeCodeCamp", url: "https://www.freecodecamp.org", category: "Coding", desc: "Learn to code through interactive tutorials and earn globally recognized certs." },
  { name: "The Odin Project", url: "https://www.theodinproject.com", category: "Coding", desc: "Outstanding full-stack JavaScript and Ruby curriculum." },
  { name: "CS50 Harvard", url: "https://pll.harvard.edu/course/cs50-introduction-computer-science", category: "University", desc: "The gold standard of introductory Computer Science lectures." }
];

const OPPORTUNITIES_DATA = [
  { name: "National Scholarship Portal (India)", provider: "Government of India", url: "https://scholarships.gov.in", type: "Scholarship", prize: "Full Tuition Match", deadline: "Varies" },
  { name: "Buddy4Study Explorer", provider: "Buddy4Study Team", url: "https://www.buddy4study.com", type: "Scholarship", prize: "Up to ₹50,000/yr", deadline: "Ongoing" },
  { name: "Forage Virtual Internships", provider: "Global Employers", url: "https://www.theforage.com", type: "Internship", prize: "Free Experience Certs", deadline: "Self-paced" },
  { name: "Google Cloud Skills Boost", provider: "Google AI", url: "https://www.cloudskillsboost.google", type: "Certificate", prize: "Cloud Badges", deadline: "Free Access" },
  { name: "Devpost Hackathon Portal", provider: "Devpost Global", url: "https://devpost.com", type: "Hackathon", prize: "$10,000 Average Pool", deadline: "Weekly" }
];

const CAREER_ROADMAPS = [
  {
    id: "fullstack",
    title: "Full-Stack Software Engineer",
    icon: Laptop,
    badge: "Most Demanded",
    steps: [
      { name: "Frontend Core", desc: "Learn HTML, Tailwind CSS, Responsive Design. Source control with Git.", cert: "freeCodeCamp Responsive Web Design" },
      { name: "React Framework", desc: "Master custom state hooks, interactive state management, and build SPAs.", cert: "Meta Front-End Developer Cert" },
      { name: "Backend & Databases", desc: "Implement Express servers, API routing, and integrate PostgreSQL databases.", cert: "NPTEL DBMS / SWAYAM Certificate" },
      { name: "Deployment & Portfolios", desc: "Deploy your server to production hosting and publish a custom portfolio page.", cert: "Vercel / GitHub Pages Sandbox" }
    ]
  },
  {
    id: "ai-engineer",
    title: "AI & ML Systems Engineer",
    icon: Brain,
    badge: "Cutting-Edge",
    steps: [
      { name: "Math & Python Fundamentals", desc: "Deep dive in linear algebra, calculus, and standard numpy/pandas scripting.", cert: "Kaggle Python & Pandas" },
      { name: "Machine Learning Foundations", desc: "Build algorithms (Regression, Decision Trees, SVM) using Scikit-Learn.", cert: "DeepLearning.AI ML Specialization" },
      { name: "Deep Learning & LLMs", desc: "Fine-tune pre-trained models on Hugging Face; study Prompt Engineering.", cert: "Google Cloud Generative AI Path" },
      { name: "AI Agent Orchestration", desc: "Build full stack apps using LLMs, LangChain, and real-time AI tools.", cert: "StudentOS AI Practitioner Badge" }
    ]
  }
];

const MOCK_QUESTIONS = [
  { q: "What is the worst-case time complexity of searching in a Balanced Binary Search Tree (such as an AVL tree)?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], correct: 1 },
  { q: "Which protocol is utilized for mapping IP addresses securely to physical MAC addresses on a local area network?", options: ["DHCP", "DNS", "ARP", "NAT"], correct: 2 },
  { q: "What database term ensures database operations are completed fully or rolled back entirely to prevent data corruption?", options: ["Isolation", "Consistency", "Durability", "Atomicity"], correct: 3 },
  { q: "Which standard JavaScript array method creates a new array populated with the results of calling a provided function?", options: ["filter()", "map()", "reduce()", "forEach()"], correct: 1 },
  { q: "Which CPU scheduling algorithm gives preemption and allocates a fixed time slice (quantum) to each active process?", options: ["First-Come First-Served", "Shortest Job First", "Priority Scheduling", "Round Robin"], correct: 3 }
];

const STUDY_HOURS_DATA = [
  { day: "Mon", Hours: 4.5, Goal: 6 },
  { day: "Tue", Hours: 6.2, Goal: 6 },
  { day: "Wed", Hours: 3.8, Goal: 6 },
  { day: "Thu", Hours: 7.5, Goal: 6 },
  { day: "Fri", Hours: 5.0, Goal: 6 },
  { day: "Sat", Hours: 8.5, Goal: 6 },
  { day: "Sun", Hours: 4.0, Goal: 6 }
];

const GOAL_PROGRESS_DATA = [
  { name: "Week 1", "Completion %": 65, Target: 100 },
  { name: "Week 2", "Completion %": 78, Target: 100 },
  { name: "Week 3", "Completion %": 85, Target: 100 },
  { name: "Week 4", "Completion %": 92, Target: 100 },
  { name: "Week 5", "Completion %": 95, Target: 100 },
  { name: "Week 6", "Completion %": 102, Target: 100 }
];

export default function StudentOSView() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "ai-tutor" | "vault" | "career" | "productivity" | "wellness" | "opportunities" | "resume-prep" | "community" | "new-age-schools">("dashboard");

  // Motivational Quote Ticker
  const quotes = [
    "Your background does not define your future. Focus on building today's skills.",
    "Exams test your preparation, not your ultimate potential. Breathe, you've got this.",
    "The biggest gap in study is fragmentation. Organize your day, organize your future.",
    "Success is the continuous accumulation of small daily streaks. Build your chain."
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  // localStates persisted in localStorage
  const [streak, setStreak] = useState(() => Number(localStorage.getItem("studentos_streak") || "5"));
  const [attendedClasses, setAttendedClasses] = useState(() => Number(localStorage.getItem("studentos_attended") || "24"));
  const [totalClasses, setTotalClasses] = useState(() => Number(localStorage.getItem("studentos_total") || "30"));
  
  // Tasks list (local storage)
  const [tasks, setTasks] = useState<{ id: string; text: string; done: boolean; category: string }[]>(() => {
    const saved = localStorage.getItem("studentos_tasks");
    return saved ? JSON.parse(saved) : [
      { id: "1", text: "Complete DSA Arrays mock assessment", done: false, category: "Academic" },
      { id: "2", text: "Revise 4-7-8 breathing when stressed", done: true, category: "Wellness" },
      { id: "3", text: "Download official syllabus and check notes", done: false, category: "Academic" }
    ];
  });
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("Academic");

  // Daily Goals list (local storage)
  const [dailyGoals, setDailyGoals] = useState<{ id: string; text: string; completed: boolean }[]>(() => {
    const saved = localStorage.getItem("studentos_daily_goals");
    return saved ? JSON.parse(saved) : [
      { id: "g1", text: "Study DSA for 2 Hours", completed: false },
      { id: "g2", text: "Complete 1 Practice Test", completed: false },
      { id: "g3", text: "Do 5 Minutes Meditation", completed: true },
      { id: "g4", text: "Drink 3L of Water", completed: false }
    ];
  });
  const [newGoalText, setNewGoalText] = useState("");

  // AI Tutor States
  const [aiApiKey, setAiApiKey] = useState(() => localStorage.getItem("studentos_ai_key") || "");
  const [isKeySaved, setIsKeySaved] = useState(() => !!localStorage.getItem("studentos_ai_key"));
  const [aiChat, setAiChat] = useState<{ role: "user" | "model" | "system"; text: string }[]>([
    { role: "model", text: "👋 Hello! I am your integrated **StudentOS AI Study & Wellness Mentor**. Ask me any doubt about coding, DSA, maths, exam prep, or speak about study stress. Try one of the quick prompts below!" }
  ]);
  const [aiQuery, setAiQuery] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; status: string }[]>([]);

  // Academic Vault states
  const [vaultTab, setVaultTab] = useState<"syllabus" | "notes" | "pyqs" | "exam">("notes");
  const [searchTerm, setSearchTerm] = useState("");
  
  // MCQ Simulator States
  const [currentExamIndex, setCurrentExamIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [examTime, setExamTime] = useState(180); // 3 mins
  const [isExamRunning, setIsExamRunning] = useState(false);

  // Productivity states
  const [pomoTime, setPomoTime] = useState(1500); // 25 mins
  const [isPomoRunning, setIsPomoRunning] = useState(false);

  // Wellness States
  const [stressLevel, setStressLevel] = useState<number | null>(null);
  const [moodLog, setMoodLog] = useState<string[]>([]);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"Inhale" | "Hold" | "Exhale" | "Ready">("Ready");
  const [breathTimer, setBreathTimer] = useState(0);

  // Career states
  const [selectedCareerId, setSelectedCareerId] = useState<string>("fullstack");

  // Community Forum State
  const [posts, setPosts] = useState<{ id: string; author: string; title: string; category: string; votes: number; answers: number }[]>([
    { id: "p1", author: "Nagidi S.", title: "How to avoid burning out during extreme exam cycles in tier-3 colleges?", category: "Wellness", votes: 24, answers: 3 },
    { id: "p2", author: "Rajesh K.", title: "Are virtual mock simulations on Forage really considered work experience by recruiters?", category: "Career", votes: 15, answers: 2 },
    { id: "p3", author: "Priya M.", title: "Best SWAYAM course recommendations for Database Management system credentials?", category: "Academic", votes: 8, answers: 1 }
  ]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Academic");

  // Resume builder states
  const [resumeText, setResumeText] = useState("");
  const [resumeScore, setResumeScore] = useState<number | null>(null);
  const [resumeFeedback, setResumeFeedback] = useState<string[]>([]);

  // Local storage save triggers
  useEffect(() => {
    localStorage.setItem("studentos_streak", streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("studentos_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("studentos_attended", attendedClasses.toString());
    localStorage.setItem("studentos_total", totalClasses.toString());
  }, [attendedClasses, totalClasses]);

  useEffect(() => {
    localStorage.setItem("studentos_daily_goals", JSON.stringify(dailyGoals));
  }, [dailyGoals]);

  // Motivational quote cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  // Pomodoro timer effect
  useEffect(() => {
    let interval: any = null;
    if (isPomoRunning && pomoTime > 0) {
      interval = setInterval(() => {
        setPomoTime((prev) => prev - 1);
      }, 1000);
    } else if (pomoTime === 0 && isPomoRunning) {
      setIsPomoRunning(false);
      setPomoTime(1500);
      confetti({ particleCount: 80, spread: 60 });
      alert("⏱️ Focus session complete! Take a relaxing deep breath.");
    }
    return () => clearInterval(interval);
  }, [isPomoRunning, pomoTime]);

  // Exam Countdown effect
  useEffect(() => {
    let interval: any = null;
    if (isExamRunning && examTime > 0 && !isExamSubmitted) {
      interval = setInterval(() => {
        setExamTime((prev) => prev - 1);
      }, 1000);
    } else if (examTime === 0 && isExamRunning) {
      setIsExamRunning(false);
      setIsExamSubmitted(true);
    }
    return () => clearInterval(interval);
  }, [isExamRunning, examTime, isExamSubmitted]);

  // Breathing loop
  useEffect(() => {
    let timer: any = null;
    if (isBreathing) {
      if (breathPhase === "Inhale") {
        timer = setTimeout(() => {
          setBreathPhase("Hold");
          setBreathTimer(7);
        }, 4000);
      } else if (breathPhase === "Hold") {
        timer = setTimeout(() => {
          setBreathPhase("Exhale");
          setBreathTimer(8);
        }, 7000);
      } else if (breathPhase === "Exhale") {
        timer = setTimeout(() => {
          setBreathPhase("Inhale");
          setBreathTimer(4);
        }, 8000);
      }
    }
    return () => clearTimeout(timer);
  }, [isBreathing, breathPhase]);

  // Breath visual timer countdown
  useEffect(() => {
    let timer: any = null;
    if (isBreathing && breathTimer > 0) {
      timer = setInterval(() => {
        setBreathTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathing, breathTimer]);

  // Attendance validation
  const attendanceRate = totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;
  const classesNeeded = Math.max(0, Math.ceil((0.75 * totalClasses - attendedClasses) / 0.25));

  // Tasks statistics for the Daily Radial Progress
  const completedTasksCount = tasks.filter(t => t.done).length;
  const totalTasksCount = tasks.length;
  const completedTaskPercentage = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  // Daily Goals statistics
  const completedGoalsCount = dailyGoals.filter(g => g.completed).length;
  const totalGoalsCount = dailyGoals.length;
  const dailyGoalsPercentage = totalGoalsCount > 0 ? Math.round((completedGoalsCount / totalGoalsCount) * 100) : 0;

  // Add Task handler
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: newTaskText, done: false, category: newTaskCategory }]);
    setNewTaskText("");
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const updatedDone = !t.done;
        if (updatedDone) {
          confetti({ particleCount: 20, colors: ["#22d3ee", "#10b981"] });
        }
        return { ...t, done: updatedDone };
      }
      return t;
    }));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Daily Goals handlers
  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;
    setDailyGoals([...dailyGoals, { id: Date.now().toString(), text: newGoalText, completed: false }]);
    setNewGoalText("");
    confetti({ particleCount: 15, colors: ["#3b82f6", "#c084fc"] });
  };

  const handleToggleGoal = (id: string) => {
    setDailyGoals(dailyGoals.map(g => {
      if (g.id === id) {
        const updatedCompleted = !g.completed;
        if (updatedCompleted) {
          confetti({ particleCount: 30, colors: ["#10b981", "#3b82f6"] });
        }
        return { ...g, completed: updatedCompleted };
      }
      return g;
    }));
  };

  const handleDeleteGoal = (id: string) => {
    setDailyGoals(dailyGoals.filter(g => g.id !== id));
  };

  // AI Response Simulation
  const simulateAiResponse = (userQuery: string) => {
    setIsAiTyping(true);
    const text = userQuery.toLowerCase();
    
    setTimeout(() => {
      let reply = "";
      if (text.includes("binary tree") || text.includes("dsa") || text.includes("traversal")) {
        reply = "🌳 **Binary Tree Traversal Explained simply:**\n\n1. **In-Order (Left, Root, Right):** Visits elements in sorted order if it's a BST.\n2. **Pre-Order (Root, Left, Right):** Outstanding for copy-pasting structure or creating duplicates.\n3. **Post-Order (Left, Right, Root):** Best for deleting trees bottom-up (deleting leaves before parent nodes).\n\n*💡 Remember: Depth-First Searches use a Stack (recursion), whereas Breadth-First Searches use a Queue.*";
      } else if (text.includes("flashcard") || text.includes("summary")) {
        reply = "🎴 **Core Flashcards Generated:**\n\n- **Card 1 (Front):** What is the atomic requirement in ACID DBMS transactions?\n- **Card 1 (Back):** Atomicity means all transactions succeed completely or rollback completely.\n\n- **Card 2 (Front):** State two advantages of NPTEL or SWAYAM.\n- **Card 2 (Back):** 100% Free access to IIT faculties + actual credits transfer to engineering college registers.";
      } else if (text.includes("stress") || text.includes("anxiety") || text.includes("motivation")) {
        reply = "💚 **Study Stress Management Strategy:**\n\n1. **Don't sit looking at the blank screen.** Write down a single line of pseudocode or study for exactly 2 minutes. This defeats inertia.\n2. Try the **4-7-8 Breathing Technique** built right inside our Wellness Haven tab.\n3. Your worth is never measured by a competitive percentile card. Step back, drink water, and repeat your study streak tomorrow.";
      } else {
        reply = `🎓 **StudentOS Mentor response to: "${userQuery}"**\n\nThis is a highly structured query. Here is my strategic advice:\n- Check the **Opportunities Hub** to see if this matches free SWAYAM/NPTEL credentials.\n- Keep your focus sharp using our built-in **Pomodoro clock**.\n- Maintain your study streak of **${streak} days** to unlock higher leaderboards!`;
      }

      setAiChat((prev) => [...prev, { role: "model", text: reply }]);
      setIsAiTyping(false);
    }, 1200);
  };

  const handleSendAiMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    const q = aiQuery;
    setAiChat((prev) => [...prev, { role: "user", text: q }]);
    setAiQuery("");
    simulateAiResponse(q);
  };

  // Mock Upload trigger
  const handleMockUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newFile = { name: file.name, size: `${(file.size / 1024).toFixed(1)} KB`, status: "Parsed successfully" };
      setUploadedFiles([...uploadedFiles, newFile]);
      confetti({ particleCount: 30 });
      setAiChat((prev) => [...prev, { 
        role: "model", 
        text: `🧠 **File "${file.name}" Parsed successfully!** I have scanned the text structure. You can now press "Generate Flashcards" or ask questions directly related to this document.`
      }]);
    }
  };

  // Stress Level assessment calculator
  const calculateStressScore = (answers: number[]) => {
    const sum = answers.reduce((a, b) => a + b, 0);
    setStressLevel(sum);
    confetti({ particleCount: 40 });
  };

  // Submit MCQ Mock Test
  const handleSubmitMockExam = () => {
    setIsExamSubmitted(true);
    setIsExamRunning(false);
    confetti({ particleCount: 80, spread: 80 });
  };

  // Reset MCQ Mock Test
  const handleResetMockExam = () => {
    setSelectedAnswers({});
    setIsExamSubmitted(false);
    setExamTime(180);
    setIsExamRunning(true);
    setCurrentExamIndex(0);
  };

  // Resume ATS Parser Simulator
  const handleScoreResume = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeText.length < 15) {
      alert("Please write or paste a more detailed resume structure first.");
      return;
    }
    const score = Math.min(98, Math.max(45, 55 + Math.round(resumeText.length / 20)));
    setResumeScore(score);
    
    // Custom tips
    const feedback = [];
    if (!resumeText.toLowerCase().includes("git") && !resumeText.toLowerCase().includes("github")) {
      feedback.push("Add 'GitHub portfolio links' under the contact header to verify engineering projects.");
    }
    if (!resumeText.toLowerCase().includes("dsa") && !resumeText.toLowerCase().includes("structures")) {
      feedback.push("Missing core keywords: 'Data Structures & Algorithms'. Recruiters filter for this first.");
    }
    if (resumeText.length < 100) {
      feedback.push("Elaborate on specific project outcomes. Describe exact metrics (e.g., 'Optimized memory bandwidth by 15%').");
    } else {
      feedback.push("Perfect length. Outstanding formatting with action-oriented verbs.");
    }
    setResumeFeedback(feedback);
    confetti({ particleCount: 50 });
  };

  // Add Community post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim()) return;
    setPosts([
      { id: Date.now().toString(), author: "You (StudentOS)", title: newPostTitle, category: newPostCategory, votes: 1, answers: 0 },
      ...posts
    ]);
    setNewPostTitle("");
    confetti({ particleCount: 20 });
  };

  return (
    <div className="w-full min-h-screen bg-[#07070F] text-white p-3 sm:p-6 lg:p-8 rounded-3xl border border-white/5 backdrop-blur-md relative overflow-hidden">
      
      {/* Background radial effects */}
      <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 border-b border-white/10 pb-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-3">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>StudentOS Super Platform Live MVP</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-cyan-400 bg-clip-text text-transparent">
            StudentOS Workspace
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Consolidating studying, planning, career pathways, wellness check-ins, and scholarship opportunities into one beautiful, single-screen dashboard.
          </p>
        </div>

        {/* Global Stats bar */}
        <div className="flex flex-wrap items-center gap-4 bg-white/[0.02] border border-white/5 p-3 rounded-2xl">
          <div className="px-3 border-r border-white/5">
            <span className="text-[10px] uppercase font-mono text-slate-500">Study Streak</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-lg font-bold text-amber-400">🔥 {streak} Days</span>
              <button onClick={() => setStreak(prev => prev + 1)} className="text-[10px] bg-amber-400/15 text-amber-300 px-1 py-0.5 rounded hover:bg-amber-400/30">+</button>
            </div>
          </div>
          <div className="px-3 border-r border-white/5">
            <span className="text-[10px] uppercase font-mono text-slate-500">Tasks Completed</span>
            <div className="text-lg font-bold text-cyan-400 mt-0.5">{completedTasksCount}/{totalTasksCount} ({completedTaskPercentage}%)</div>
          </div>
          <div className="px-3">
            <span className="text-[10px] uppercase font-mono text-slate-500">Attendance Tracker</span>
            <div className={`text-lg font-bold mt-0.5 ${attendanceRate >= 75 ? 'text-emerald-400' : 'text-red-400'}`}>
              {attendanceRate.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Motivational Quote Box */}
      <div className="p-3.5 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl mb-8 flex items-center justify-between text-xs text-indigo-200 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <Brain className="w-5 h-5 text-indigo-400 animate-pulse flex-shrink-0" />
          <span><strong className="text-indigo-300 font-bold">Daily Quote:</strong> "{quotes[quoteIndex]}"</span>
        </div>
        <button 
          onClick={() => setQuoteIndex((prev) => (prev + 1) % quotes.length)}
          className="text-[10px] font-mono text-slate-500 hover:text-white border border-white/5 px-2 py-0.5 rounded transition-all cursor-pointer"
        >
          Next Quote
        </button>
      </div>

      {/* Main Multi-Tab System Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Side Tab Switcher (3 cols on desktop) */}
        <div className="lg:col-span-3 space-y-2">
          <p className="text-[10px] font-mono uppercase text-slate-500 tracking-widest pl-2 mb-2">StudentOS Hubs</p>
          {[
            { id: "dashboard", label: "Command Dashboard", icon: Compass, color: "text-indigo-400" },
            { id: "ai-tutor", label: "AI Tutor & Doubts", icon: Sparkles, color: "text-cyan-400" },
            { id: "vault", label: "Academic Vault", icon: BookOpen, color: "text-amber-400" },
            { id: "productivity", label: "Peak Productivity", icon: Clock, color: "text-emerald-400" },
            { id: "wellness", label: "Wellness Haven", icon: Heart, color: "text-pink-400" },
            { id: "career", label: "Roadmaps & Career", icon: Rocket, color: "text-purple-400" },
            { id: "resume-prep", label: "ATS Resume & Prep", icon: FileText, color: "text-orange-400" },
            { id: "opportunities", label: "Opportunities Finder", icon: Globe, color: "text-teal-400" },
            { id: "community", label: "Community Forum", icon: Users, color: "text-blue-400" }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isSelected 
                    ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg" 
                    : "bg-white/[0.02] border border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isSelected ? "text-white" : tab.color}`} />
                  <span>{tab.label}</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-600" />
              </button>
            );
          })}

          <div className="p-4 bg-slate-900/30 rounded-xl border border-white/5 space-y-2.5 mt-6 text-xs text-slate-500">
            <span className="font-bold text-slate-300 block">💡 Did you know?</span>
            <p className="leading-relaxed">All of your customized tasks, study milestones, attendance rates, and streaks are safely cached in your local browser state storage.</p>
          </div>
        </div>

        {/* Right Side Main Viewport Content (9 cols) */}
        <div className="lg:col-span-9 bg-slate-950/40 border border-white/5 rounded-2xl p-4 sm:p-6 min-h-[550px] relative">
          
          {/* TAB: COMMAND DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">Welcome Back to StudentOS!</h2>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                  Ready to eliminate platform fragmentation? Today you can study high-yield DBMS notes, check your upcoming Mock Exam timer, log your daily study habit, or explore global scholarship opportunities. All on a single screen!
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <button onClick={() => setActiveTab("ai-tutor")} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask AI Tutor Doubts</span>
                  </button>
                  <button onClick={() => setActiveTab("vault")} className="px-4 py-2 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>Open Handwritten Notes</span>
                  </button>
                  <button onClick={() => setActiveTab("wellness")} className="px-4 py-2 bg-pink-500/10 border border-pink-500/20 text-pink-300 hover:bg-pink-500/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer">
                    <Heart className="w-3.5 h-3.5" />
                    <span>CBT Stress Relief</span>
                  </button>
                </div>
              </div>

              {/* Grid of Command stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
                
                {/* Daily Goals Widget */}
                <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/20 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-300">Daily Goals Hub</h3>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-400/10 px-2 py-0.5 rounded">
                        {dailyGoalsPercentage}% Done
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Toggle goals to stay on track today</p>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-800/40 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full transition-all duration-500"
                      style={{ width: `${dailyGoalsPercentage}%` }}
                    />
                  </div>

                  {/* Goal items list */}
                  <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1 scrollbar-thin">
                    {dailyGoals.map((g) => (
                      <div 
                        key={g.id} 
                        className={`flex items-center justify-between p-2 rounded-lg border transition-all text-xs ${
                          g.completed 
                            ? "bg-emerald-500/5 border-emerald-500/10 text-slate-400 line-through" 
                            : "bg-black/25 border-white/5 text-slate-200"
                        }`}
                      >
                        <button 
                          onClick={() => handleToggleGoal(g.id)}
                          className="flex items-center gap-2 text-left flex-1 cursor-pointer"
                        >
                          <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center flex-shrink-0 ${g.completed ? "bg-emerald-500 border-emerald-400" : "border-slate-600"}`}>
                            {g.completed && <Check className="w-2.5 h-2.5 text-slate-900 stroke-[3]" />}
                          </div>
                          <span className="truncate max-w-[140px]">{g.text}</span>
                        </button>
                        
                        <button 
                          onClick={() => handleDeleteGoal(g.id)}
                          className="text-slate-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                          title="Delete Goal"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {dailyGoals.length === 0 && (
                      <div className="text-center text-slate-500 text-[11px] py-4">No daily goals yet. Add one below!</div>
                    )}
                  </div>

                  {/* Add goal mini-form */}
                  <form onSubmit={handleAddGoal} className="flex gap-1.5 mt-2">
                    <input 
                      type="text" 
                      placeholder="Add a daily goal..." 
                      value={newGoalText}
                      onChange={(e) => setNewGoalText(e.target.value)}
                      className="flex-1 bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                    <button 
                      type="submit" 
                      className="bg-cyan-600 hover:bg-cyan-500 text-white p-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                {/* SVG Radial Task completed widget */}
                <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/20 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-300 mb-1">Daily Task Completed Progress</h3>
                    <p className="text-xs text-slate-500">Visualizing completed tasks for the current study day</p>
                  </div>
                  
                  <div className="flex items-center gap-6 my-4">
                    {/* SVG Radial Progress Ring */}
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="48" cy="48" r="38" className="stroke-slate-800 fill-none stroke-[8]" />
                        <circle cx="48" cy="48" r="38" 
                          className="stroke-cyan-500 fill-none stroke-[8] transition-all duration-500" 
                          strokeDasharray={2 * Math.PI * 38} 
                          strokeDashoffset={2 * Math.PI * 38 * (1 - completedTaskPercentage / 100)} 
                        />
                      </svg>
                      <div className="absolute text-center">
                        <span className="text-xl font-extrabold text-white">{completedTaskPercentage}%</span>
                        <span className="block text-[8px] uppercase font-mono text-slate-500">Done</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                        <span className="text-slate-300">{completedTasksCount} Completed Tasks</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                        <span className="text-slate-500">{totalTasksCount - completedTasksCount} Remaining Tasks</span>
                      </div>
                    </div>
                  </div>

                  <button onClick={() => setActiveTab("productivity")} className="text-[11px] font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-bold">
                    <span>Manage Kanban Planner</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Quick actions tracker and tips */}
                <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/20 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-300 mb-1">CBT Stress Relief & Health</h3>
                    <p className="text-xs text-slate-500">Helplines & emotional relief tools</p>
                  </div>

                  <div className="bg-pink-500/5 p-3.5 rounded-xl border border-pink-500/10 space-y-2 my-3">
                    <span className="text-[10px] font-mono text-pink-400 font-bold uppercase tracking-wider block">Crisis Helpline India</span>
                    <div className="flex items-center gap-2 justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <PhoneCall className="w-3.5 h-3.5 text-pink-400 animate-bounce" />
                        <span className="font-bold">Tele-MANAS: 14416</span>
                      </div>
                      <span className="text-[10px] bg-pink-400/20 text-pink-300 px-2 py-0.5 rounded uppercase font-mono font-bold">Free 24/7 Support</span>
                    </div>
                  </div>

                  <button onClick={() => setActiveTab("wellness")} className="text-[11px] font-mono text-pink-400 hover:text-pink-300 flex items-center gap-1 font-bold">
                    <span>Open Wellness Haven</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Study Analytics Section */}
              <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span>Study Analytics & Goals Tracker</span>
                    </h3>
                    <p className="text-[11px] text-slate-400">Track your weekly study hours and goal completion rates</p>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    Live Performance
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Chart 1: Bar Chart of Study Hours */}
                  <div className="bg-black/30 border border-white/5 p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-300">Weekly Study Hours</h4>
                      <span className="text-[10px] text-slate-500 font-mono">Daily Target: 6 hrs</span>
                    </div>
                    <div className="h-[200px] w-full text-slate-300">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={STUDY_HOURS_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} />
                          <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: "#020617", borderColor: "#334155", borderRadius: "8px" }}
                            labelStyle={{ color: "#94a3b8", fontWeight: "bold", fontSize: "11px" }}
                            itemStyle={{ color: "#22d3ee", fontSize: "11px" }}
                          />
                          <Bar dataKey="Hours" fill="#0D9488" radius={[4, 4, 0, 0]} name="Study Hours" />
                          <Bar dataKey="Goal" fill="#312e81" opacity={0.5} radius={[4, 4, 0, 0]} name="Goal Hours" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 text-[10px] font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-[#0D9488] rounded" />
                        <span className="text-slate-400">Actual Hours</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-indigo-950 rounded border border-indigo-900/30" />
                        <span className="text-slate-400">Daily Goal (6h)</span>
                      </div>
                    </div>
                  </div>

                  {/* Chart 2: Line Chart of Goal Progress */}
                  <div className="bg-black/30 border border-white/5 p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-300">Syllabus & Goals Completion Rate</h4>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">102% Achieved</span>
                    </div>
                    <div className="h-[200px] w-full text-slate-300">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={GOAL_PROGRESS_DATA} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                          <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: "#020617", borderColor: "#334155", borderRadius: "8px" }}
                            labelStyle={{ color: "#94a3b8", fontWeight: "bold", fontSize: "11px" }}
                            itemStyle={{ color: "#c084fc", fontSize: "11px" }}
                          />
                          <Line type="monotone" dataKey="Completion %" stroke="#c084fc" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                          <Line type="monotone" dataKey="Target" stroke="#334155" strokeWidth={1} strokeDasharray="5 5" dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 text-[10px] font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-0.5 bg-[#c084fc] inline-block" />
                        <span className="text-slate-400">Weekly Progress</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 border-b border-dashed border-slate-400 inline-block" />
                        <span className="text-slate-400">Syllabus Target</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive study habits shelf */}
              <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Current Task Planner</h3>
                  <span className="text-[10px] text-slate-500 font-mono">Real-time validation</span>
                </div>

                <div className="space-y-2">
                  {tasks.slice(0, 3).map(t => (
                    <div 
                      key={t.id} 
                      onClick={() => handleToggleTask(t.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        t.done 
                          ? "bg-emerald-500/5 border-emerald-500/20 text-slate-400 line-through" 
                          : "bg-slate-950 border-white/5 text-slate-200 hover:border-indigo-500/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${t.done ? "bg-emerald-500 border-emerald-400" : "border-slate-600"}`}>
                          {t.done && <Check className="w-2.5 h-2.5 text-slate-900 stroke-[3]" />}
                        </div>
                        <span className="text-xs">{t.text}</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase font-mono">{t.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: AI TUTOR & CHAT */}
          {activeTab === "ai-tutor" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left Side Upload Mock Zone (5 cols) */}
                <div className="md:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/30 space-y-4">
                    <h3 className="text-sm font-bold text-slate-200">Interactive Syllabus & Notes Dropzone</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Simulate uploading handwritten PDFs, syllabus documents, or study records. Our AI immediately processes context to let you test doubts or generate quiz sets.
                    </p>

                    {/* Drag Zone */}
                    <div className="border-2 border-dashed border-white/10 hover:border-cyan-500/50 rounded-xl p-6 text-center transition-all relative cursor-pointer">
                      <input 
                        type="file" 
                        accept=".pdf,.txt,.docx,.png"
                        onChange={handleMockUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                      <GraduationCap className="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-bounce" />
                      <span className="text-xs font-bold block text-slate-200">Upload PDF / TXT Document</span>
                      <span className="text-[10px] text-slate-500 block mt-1">Accepts up to 15MB</span>
                    </div>

                    {/* Uploaded Files list */}
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2 mt-4">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Processed Files:</span>
                        {uploadedFiles.map((f, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="font-semibold text-slate-300 truncate max-w-[120px]">{f.name}</span>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-mono">{f.status}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl space-y-2">
                    <h4 className="text-xs font-bold text-indigo-300">💡 Smart Suggestions</h4>
                    <p className="text-[11px] text-slate-400">After uploading a syllabus file, click "Generate Flashcards" on the right side AI to quickly produce practice MCQ cards!</p>
                  </div>
                </div>

                {/* Right Side Chat Terminal (7 cols) */}
                <div className="md:col-span-7 p-4 bg-slate-950/80 rounded-2xl border border-white/10 flex flex-col justify-between min-h-[420px]">
                  
                  {/* Chat top header with API Key details */}
                  <div className="border-b border-white/5 pb-3 mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">Active AI Tutor Node</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-500">API Gateway:</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase">
                        Active Simulation
                      </span>
                    </div>
                  </div>

                  {/* Chat messages stream */}
                  <div className="flex-1 overflow-y-auto space-y-4 max-h-[280px] pr-1.5 scrollbar-thin">
                    {aiChat.map((m, idx) => (
                      <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`p-3 rounded-2xl max-w-[90%] text-xs leading-relaxed ${
                          m.role === "user" 
                            ? "bg-indigo-600 text-white rounded-br-none" 
                            : "bg-white/[0.04] border border-white/5 text-slate-200 rounded-bl-none"
                        }`}>
                          <div className="whitespace-pre-wrap">{m.text}</div>
                        </div>
                      </div>
                    ))}

                    {isAiTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white/[0.04] border border-white/5 p-3 rounded-2xl rounded-bl-none text-xs text-slate-400 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-100" />
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-200" />
                          <span>StudentOS AI is conceptualizing...</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick trigger actions */}
                  <div className="flex flex-wrap gap-1.5 my-3 pt-3 border-t border-white/5">
                    <button onClick={() => simulateAiResponse("Explain binary tree traversal simply")} className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/5 px-2 py-1 rounded-lg">
                      🌲 Tree Traversals
                    </button>
                    <button onClick={() => simulateAiResponse("Generate 3 core flashcards from my notes")} className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/5 px-2 py-1 rounded-lg">
                      🎴 Generate Flashcards
                    </button>
                    <button onClick={() => simulateAiResponse("Help with exam anxiety and stress relief")} className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/5 px-2 py-1 rounded-lg">
                      💚 Exam Stress Helper
                    </button>
                  </div>

                  {/* Message Input form */}
                  <form onSubmit={handleSendAiMessage} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask the AI Tutor anything about study or coding..."
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      className="flex-1 text-xs bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500/50 text-white"
                    />
                    <button type="submit" className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all cursor-pointer">
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ACADEMIC VAULT */}
          {activeTab === "vault" && (
            <div className="space-y-6 animate-fade-in">
              {/* Vault controller header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg font-bold">Academic Vault Explorer</h2>
                </div>

                <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5">
                  {(["notes", "pyqs", "exam"] as const).map((vt) => (
                    <button
                      key={vt}
                      onClick={() => setVaultTab(vt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer uppercase font-mono ${
                        vaultTab === vt 
                          ? "bg-amber-400 text-slate-900" 
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {vt}
                    </button>
                  ))}
                </div>
              </div>

              {/* SEARCH BOX */}
              {vaultTab !== "exam" && (
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search notes, textbooks, subjects, universities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-xs bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-amber-400/50 text-white"
                  />
                </div>
              )}

              {/* VIEW: Handwritten Notes */}
              {vaultTab === "notes" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Data Structures & Algorithms Handwritten Guide", provider: "IIT Faculty notes", semester: "Semester 3", tags: ["Tree", "Graph", "Complexity"], pages: "48 Pages" },
                    { title: "Relational Database Management Systems Notes", provider: "AKTU syllabus notes", semester: "Semester 4", tags: ["SQL", "Normalization", "Indexing"], pages: "32 Pages" },
                    { title: "Operating Systems Lecture Slides Copy", provider: "Anna University prep", semester: "Semester 4", tags: ["Paging", "Deadlock", "Scheduling"], pages: "54 Pages" },
                    { title: "Computer Networks foundational textbook PDF", provider: "MIT course copy", semester: "Semester 5", tags: ["TCP/IP", "Subnetting", "DNS"], pages: "112 Pages" }
                  ].filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))).map((n, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-white/5 bg-slate-900/30 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded uppercase font-bold">
                            {n.semester}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{n.pages}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-200">{n.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-1">{n.provider}</p>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {n.tags.map((t, idx2) => (
                            <span key={idx2} className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500">100% Free Access</span>
                        <a 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`File "${n.title}" has been added to your bookmark shelf dashboard successfully!`);
                            confetti({ particleCount: 20 });
                          }}
                          className="text-[11px] font-bold text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <span>Download / Save</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* VIEW: PYQs */}
              {vaultTab === "pyqs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { exam: "GATE CSE 2025 Paper Solutions", category: "Competitive Exam", year: "2025 Solved", desc: "Detailed step-by-step math and coding answers." },
                    { exam: "AKTU University DBMS Dec 2024 Question paper", category: "University Paper", year: "2024", desc: "Official examination copy with normalized schema solutions." },
                    { exam: "JEE Advanced 2024 Mathematics paper", category: "Competitive Exam", year: "2024 Solved", desc: "Swayam-vetted mathematical solutions." },
                    { exam: "VTU Operating Systems 2023 Solved Questions", category: "University Paper", year: "2023", desc: "Practical record solutions." }
                  ].filter(p => p.exam.toLowerCase().includes(searchTerm.toLowerCase())).map((p, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-white/5 bg-slate-900/30 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded uppercase font-bold">
                            {p.category}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{p.year}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-200">{p.exam}</h4>
                        <p className="text-[11px] text-slate-400 mt-1">{p.desc}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500">Official Link</span>
                        <a 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Solving simulation file "${p.exam}" loaded into local memory.`);
                          }}
                          className="text-[11px] font-bold text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          <span>Solve Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* VIEW: Mock Exam MCQ Simulator */}
              {vaultTab === "exam" && (
                <div className="p-5 rounded-2xl border border-amber-400/20 bg-amber-400/[0.02] space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                      DSA & Computer Science Mock Assessment
                    </span>

                    {isExamRunning && !isExamSubmitted && (
                      <span className="text-xs font-mono font-bold text-red-400 animate-pulse">
                        ⏱️ Time Remaining: {Math.floor(examTime / 60)}:{(examTime % 60).toString().padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  {!isExamRunning && !isExamSubmitted && (
                    <div className="text-center py-8 space-y-4">
                      <GraduationCap className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
                      <h4 className="text-sm font-bold">Ready to start your 3-minute challenge?</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                        This simulator tests 5 core CS questions. Once started, the countdown begins. Submit anytime for instant scoring.
                      </p>
                      <button 
                        onClick={handleResetMockExam}
                        className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-all cursor-pointer"
                      >
                        Start Mock Test
                      </button>
                    </div>
                  )}

                  {isExamRunning && !isExamSubmitted && (
                    <div className="space-y-4">
                      {/* Progress header */}
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Question {currentExamIndex + 1} of {MOCK_QUESTIONS.length}</span>
                        <span>Multi-Choice Single correct option</span>
                      </div>

                      {/* Question text */}
                      <p className="text-sm font-bold text-slate-100">{MOCK_QUESTIONS[currentExamIndex].q}</p>

                      {/* Options */}
                      <div className="space-y-2">
                        {MOCK_QUESTIONS[currentExamIndex].options.map((option, idx) => {
                          const isSelected = selectedAnswers[currentExamIndex] === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => setSelectedAnswers({ ...selectedAnswers, [currentExamIndex]: idx })}
                              className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                                isSelected 
                                  ? "bg-amber-400/20 border-amber-400 text-amber-300" 
                                  : "bg-slate-950 border-white/5 text-slate-300 hover:bg-slate-900"
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>

                      {/* Nav bar */}
                      <div className="flex justify-between items-center pt-4 border-t border-white/5">
                        <button
                          disabled={currentExamIndex === 0}
                          onClick={() => setCurrentExamIndex(prev => prev - 1)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 rounded disabled:opacity-50 text-xs"
                        >
                          Previous
                        </button>

                        <button
                          onClick={() => {
                            if (currentExamIndex < MOCK_QUESTIONS.length - 1) {
                              setCurrentExamIndex(prev => prev + 1);
                            } else {
                              handleSubmitMockExam();
                            }
                          }}
                          className="px-4 py-1.5 bg-amber-400 text-slate-950 font-bold rounded text-xs"
                        >
                          {currentExamIndex === MOCK_QUESTIONS.length - 1 ? "Submit Exam" : "Next Question"}
                        </button>
                      </div>
                    </div>
                  )}

                  {isExamSubmitted && (
                    <div className="p-6 rounded-xl bg-black/40 border border-white/5 space-y-4">
                      <h4 className="text-base font-extrabold text-white text-center">🎉 Mock Assessment Submitted!</h4>
                      
                      {/* Calculator */}
                      {(() => {
                        let score = 0;
                        MOCK_QUESTIONS.forEach((q, idx) => {
                          if (selectedAnswers[idx] === q.correct) score += 20;
                        });
                        return (
                          <div className="space-y-4 text-center">
                            <div className="inline-flex flex-col items-center justify-center p-6 bg-slate-900 rounded-2xl">
                              <span className="text-3xl font-black text-amber-400">{score}/100</span>
                              <span className="text-[10px] uppercase font-mono text-slate-500 mt-1">Diagnostic Score</span>
                            </div>

                            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                              {score >= 80 
                                ? "Outstanding! You have exceptional mastery over memory complexities and data structures."
                                : "Excellent try. We suggest checking the Data Structures guides in the Handwritten Notes folder."}
                            </p>

                            <button
                              onClick={handleResetMockExam}
                              className="px-5 py-2 bg-slate-900 border border-white/10 hover:border-white/20 text-white rounded-xl text-xs font-bold transition-all"
                            >
                              Retry Simulation
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB: PEAK PRODUCTIVITY */}
          {activeTab === "productivity" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left Side: Pomodoro (5 cols) */}
                <div className="md:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/30 text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase font-bold text-emerald-400 mb-2">
                      <Clock className="w-4 h-4" />
                      <span>Pomodoro focus timer</span>
                    </div>

                    <div className="text-5xl font-black font-mono tracking-wider text-white">
                      {Math.floor(pomoTime / 60).toString().padStart(2, "0")}
                      <span className="animate-pulse text-emerald-400">:</span>
                      {(pomoTime % 60).toString().padStart(2, "0")}
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono uppercase">Deep study loop active</p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPomoRunning(!isPomoRunning)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isPomoRunning 
                            ? "bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20" 
                            : "bg-emerald-600 hover:bg-emerald-500 text-white"
                        }`}
                      >
                        {isPomoRunning ? "Pause timer" : "Start Focus"}
                      </button>

                      <button
                        onClick={() => {
                          setIsPomoRunning(false);
                          setPomoTime(1500);
                        }}
                        className="p-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-slate-950 text-slate-400 hover:text-white"
                        title="Reset"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Attendance Tracker */}
                  <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/30 space-y-4">
                    <h3 className="text-sm font-bold text-slate-200">Attendance calculator (Minimum 75%)</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span>Attended Classes: <strong className="text-white">{attendedClasses}</strong></span>
                        <div className="flex gap-1">
                          <button onClick={() => setAttendedClasses(prev => Math.max(0, prev - 1))} className="bg-slate-800 text-white p-1 rounded hover:bg-slate-700">-</button>
                          <button onClick={() => setAttendedClasses(prev => prev + 1)} className="bg-slate-800 text-white p-1 rounded hover:bg-slate-700">+</button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span>Total Classes: <strong className="text-white">{totalClasses}</strong></span>
                        <div className="flex gap-1">
                          <button onClick={() => setTotalClasses(prev => Math.max(attendedClasses, prev - 1))} className="bg-slate-800 text-white p-1 rounded hover:bg-slate-700">-</button>
                          <button onClick={() => setTotalClasses(prev => prev + 1)} className="bg-slate-800 text-white p-1 rounded hover:bg-slate-700">+</button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/5">
                        <div className="flex justify-between items-center text-xs">
                          <span>Current Rate:</span>
                          <span className={`font-bold ${attendanceRate >= 75 ? "text-emerald-400" : "text-red-400"}`}>
                            {attendanceRate.toFixed(1)}%
                          </span>
                        </div>
                        {attendanceRate < 75 && (
                          <p className="text-[11px] text-red-400 mt-1 flex items-start gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            <span>Warning! You must attend at least {classesNeeded} consecutive classes to cross 75%.</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Kanban Tasks list (7 cols) */}
                <div className="md:col-span-7 p-5 bg-slate-900/30 rounded-2xl border border-white/5 space-y-4">
                  <h3 className="text-sm font-bold text-slate-200">Kanban-style Study Tasks Planner</h3>

                  <form onSubmit={handleAddTask} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Write a new task..."
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      className="flex-1 text-xs bg-slate-950 border border-white/10 rounded-xl px-3 py-2 outline-none focus:border-emerald-500/50 text-white"
                    />
                    <select
                      value={newTaskCategory}
                      onChange={(e) => setNewTaskCategory(e.target.value)}
                      className="text-xs bg-slate-950 border border-white/10 rounded-xl px-2 outline-none focus:border-emerald-500/50"
                    >
                      <option value="Academic">Academic</option>
                      <option value="Wellness">Wellness</option>
                      <option value="Career">Career</option>
                    </select>
                    <button type="submit" className="px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs">
                      Add
                    </button>
                  </form>

                  {/* Tasks lists */}
                  <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                    {tasks.map(t => (
                      <div 
                        key={t.id} 
                        className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                          t.done 
                            ? "bg-emerald-500/[0.02] border-emerald-500/10 text-slate-500 line-through" 
                            : "bg-black/30 border-white/5 text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleToggleTask(t.id)}
                            className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all ${
                              t.done ? "bg-emerald-500 border-emerald-400" : "border-slate-600"
                            }`}
                          >
                            {t.done && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
                          </button>
                          <span className="text-xs">{t.text}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase font-mono">{t.category}</span>
                          <button 
                            onClick={() => handleDeleteTask(t.id)} 
                            className="text-slate-500 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: WELLNESS HAVEN */}
          {activeTab === "wellness" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left Side: 4-7-8 breathing visualizer & Assessment (5 cols) */}
                <div className="md:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl border border-pink-400/20 bg-pink-400/[0.02] text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase font-bold text-pink-400">
                      <Heart className="w-4 h-4" />
                      <span>4-7-8 breathing visualizer</span>
                    </div>

                    <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                      <div className={`absolute inset-0 rounded-full bg-pink-500/10 border-2 border-pink-500/30 transition-all duration-[4000ms] ${
                        isBreathing && breathPhase === "Inhale" ? "scale-110" : ""
                      } ${
                        isBreathing && breathPhase === "Exhale" ? "scale-90" : ""
                      }`} />
                      
                      <div className="z-10 text-center">
                        <span className="text-sm font-extrabold block text-pink-300">{breathPhase}</span>
                        {isBreathing && <span className="text-xs font-mono text-slate-500">{breathTimer}s</span>}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (isBreathing) {
                          setIsBreathing(false);
                          setBreathPhase("Ready");
                        } else {
                          setIsBreathing(true);
                          setBreathPhase("Inhale");
                          setBreathTimer(4);
                        }
                      }}
                      className="w-full py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-bold transition-all"
                    >
                      {isBreathing ? "Stop Breathing Exercise" : "Start Breathing Loop"}
                    </button>
                  </div>

                  {/* Stress checker Assessment */}
                  <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/30 space-y-3">
                    <h3 className="text-sm font-bold text-slate-200">Stress quick check</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">Rate your anxiety levels over the last 3 days to calibrate suggestions:</p>
                    
                    <div className="flex gap-1.5 justify-between">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          onClick={() => calculateStressScore([val, val + 1])}
                          className="flex-1 py-2 bg-slate-900 hover:bg-pink-500/10 border border-white/5 text-xs rounded-xl"
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                    {stressLevel !== null && (
                      <div className="text-xs text-center mt-2 text-pink-300 font-bold bg-pink-500/5 p-2 rounded-lg">
                        Assessment result: {stressLevel > 6 ? "High Study Fatigue (Take a walk)" : "Optimal focus levels"}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: HELPLINE DIRECTORY (7 cols) */}
                <div className="md:col-span-7 p-5 bg-slate-900/30 rounded-2xl border border-white/5 space-y-4">
                  <div className="border-b border-white/5 pb-2">
                    <h3 className="text-sm font-bold text-slate-200">Verified Free Helpline Directory (India)</h3>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Confidential & 100% Free support always available</span>
                  </div>

                  <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                    {[
                      { name: "Tele-MANAS", contact: "14416 / 1-800-891-4416", desc: "Government of India 24/7 mental health service in 20+ regional languages." },
                      { name: "iCALL (TISS)", contact: "icallhelpline.org", desc: "Run by Tata Institute of Social Sciences, telephone and email counseling." },
                      { name: "Vandrevala Foundation", contact: "+91 9999 666 555", desc: "Free 24x7x365 support for depression, anxiety, and school distress." },
                      { name: "AASRA Helpline", contact: "91-9820466726", desc: "Crisis intervention and suicide prevention helpline active day & night." }
                    ].map((h, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-pink-500/10 transition-all">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <strong className="text-white font-bold">{h.name}</strong>
                          <span className="font-mono text-pink-400 font-bold bg-pink-500/5 border border-pink-500/10 px-2 py-0.5 rounded">
                            {h.contact}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal">{h.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 text-[10px] text-slate-500 leading-normal border border-white/5">
                    <strong>⚠️ Disclaimer:</strong> StudentOS wellness modules do not substitute professional psychiatric assistance. If you are in high emergency crisis, please call Tele-MANAS (14416) immediately.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CAREER ROADMAPS */}
          {activeTab === "career" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-sm font-bold text-slate-200 uppercase font-mono tracking-wider">Expandable Career Roadmaps</h3>
                
                <div className="flex gap-2">
                  {CAREER_ROADMAPS.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedCareerId(r.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedCareerId === r.id 
                          ? "bg-purple-600 text-white" 
                          : "bg-slate-900 text-slate-400 hover:text-white"
                      }`}
                    >
                      {r.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Roadmap Timeline */}
              {(() => {
                const selected = CAREER_ROADMAPS.find(r => r.id === selectedCareerId);
                if (!selected) return null;
                return (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-full font-mono font-bold uppercase">
                        {selected.badge}
                      </span>
                    </div>

                    <div className="space-y-4 relative border-l-2 border-purple-500/20 pl-6 ml-3">
                      {selected.steps.map((step, idx) => (
                        <div key={idx} className="relative group p-4 rounded-xl border border-white/5 bg-slate-900/10 hover:border-purple-500/20 transition-all">
                          {/* Circle on timeline */}
                          <div className="absolute left-[-31px] top-4 w-4 h-4 rounded-full bg-purple-600 border-4 border-slate-950 group-hover:scale-125 transition-all" />
                          
                          <div className="flex items-start justify-between gap-4 mb-1">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-200">{step.name}</h4>
                            <span className="text-[10px] text-purple-400 font-mono font-bold bg-purple-400/5 px-2 py-0.5 rounded">
                              {step.cert}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed mb-2">{step.desc}</p>
                          <span className="text-[10px] text-slate-500 font-mono block">Recommended Site: SWAYAM/NPTEL</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB: OPPORTUNITIES FINDER */}
          {activeTab === "opportunities" && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-4 bg-teal-500/5 border border-teal-500/10 rounded-2xl">
                <span className="text-xs font-bold text-teal-400 block mb-1">💡 Real-Time Opportunities aggregator</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We collect vetted scholarships, remote internship simulations, and global hackathons directly matching tuition requirements.
                </p>
              </div>

              {/* Opportunities Grid */}
              <div className="space-y-3">
                {OPPORTUNITIES_DATA.map((o, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-white/5 bg-slate-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-teal-500/20 transition-all">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-teal-400 font-bold bg-teal-400/5 px-2 py-0.5 rounded uppercase border border-teal-500/10">
                          {o.type}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">{o.provider}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-200">{o.name}</h4>
                    </div>

                    <div className="flex items-center gap-4 justify-between w-full sm:w-auto">
                      <div className="text-right sm:text-right">
                        <span className="text-xs font-extrabold text-teal-400 block">{o.prize}</span>
                        <span className="text-[10px] text-slate-500 font-mono">Deadline: {o.deadline}</span>
                      </div>
                      <a 
                        href={o.url} 
                        target="_blank" 
                        referrerPolicy="no-referrer"
                        className="p-2 bg-slate-900 hover:bg-slate-800 border border-white/5 rounded-xl transition-all"
                      >
                        <ArrowUpRight className="w-4 h-4 text-slate-400 hover:text-white" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ATS RESUME PREP */}
          {activeTab === "resume-prep" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left: Input Textarea (7 cols) */}
                <div className="md:col-span-7 space-y-4">
                  <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/20 space-y-4">
                    <h3 className="text-sm font-bold text-slate-200">ATS Resume Optimizer Simulator</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Type or paste your technical resume content. Our algorithm checks for crucial keywords (like DSA, Git, specific full-stack tech) to compute a structural score.
                    </p>

                    <form onSubmit={handleScoreResume} className="space-y-4">
                      <textarea
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste your resume content here (E.g., Priya Sharma, B.Tech CSE, Experience with React...)"
                        rows={10}
                        className="w-full text-xs bg-black/40 border border-white/10 rounded-xl p-3.5 outline-none focus:border-indigo-500/50 text-white font-mono"
                      />

                      <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all">
                        Analyze Resume Score
                      </button>
                    </form>
                  </div>
                </div>

                {/* Right: Score and advice (5 cols) */}
                <div className="md:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/30 text-center space-y-4 min-h-[300px] flex flex-col justify-center">
                    {resumeScore !== null ? (
                      <div className="space-y-4">
                        <div className="inline-flex flex-col items-center justify-center p-6 bg-slate-900 rounded-2xl border border-white/5">
                          <span className={`text-3xl font-black ${resumeScore >= 75 ? "text-emerald-400" : "text-amber-400"}`}>
                            {resumeScore}/100
                          </span>
                          <span className="text-[10px] uppercase font-mono text-slate-500 mt-1">ATS Compatibility</span>
                        </div>

                        <div className="space-y-2 text-left">
                          <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block">Suggestions:</span>
                          {resumeFeedback.map((tip, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                              <span className="text-cyan-400 mt-0.5">•</span>
                              <span>{tip}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <FileText className="w-10 h-10 text-slate-500 mx-auto animate-pulse" />
                        <h4 className="text-sm font-bold">No resume scored yet</h4>
                        <p className="text-xs text-slate-500">Paste your content on the left to review your scoring dashboard.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: COMMUNITY FORUM */}
          {activeTab === "community" && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/30 space-y-4">
                <h3 className="text-sm font-bold text-slate-200">Student Discussion Forum (Moderated)</h3>
                
                <form onSubmit={handleCreatePost} className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/5">
                  <input
                    type="text"
                    placeholder="Write your discussion topic or problem..."
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full text-xs bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500/50 text-white"
                  />
                  <div className="flex justify-between items-center">
                    <select
                      value={newPostCategory}
                      onChange={(e) => setNewPostCategory(e.target.value)}
                      className="text-xs bg-slate-950 border border-white/10 rounded-xl px-2 py-1 outline-none"
                    >
                      <option value="Academic">Academic</option>
                      <option value="Career">Career</option>
                      <option value="Wellness">Wellness</option>
                    </select>
                    <button type="submit" className="px-5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all">
                      Publish Topic
                    </button>
                  </div>
                </form>

                {/* Discussions stream */}
                <div className="space-y-3">
                  {posts.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl border border-white/5 bg-slate-900/10 flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 font-mono">By {p.author}</span>
                          <span className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">#{p.category}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-200 leading-normal">{p.title}</h4>
                      </div>

                      <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
                        <button 
                          onClick={() => {
                            setPosts(posts.map(post => post.id === p.id ? { ...post, votes: post.votes + 1 } : post));
                            confetti({ particleCount: 10 });
                          }}
                          className="hover:text-indigo-400 flex items-center gap-1"
                        >
                          <span>🔺</span>
                          <span>{p.votes}</span>
                        </button>
                        <span>💬 {p.answers}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* External Verified Platforms aggregated list */}
      <div className="mt-12 pt-6 border-t border-white/5 relative z-10">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-4 text-center">
          Verified Free Student Resources Directory
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FREE_STUDY_RESOURCES.map((site, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/20 border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[9px] font-mono text-cyan-400 bg-cyan-400/5 border border-cyan-400/20 px-2 py-0.5 rounded uppercase font-bold">
                    {site.category}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">{site.name}</h4>
                <p className="text-[11px] text-slate-400 leading-normal mt-1">{site.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-right">
                <a 
                  href={site.url} 
                  target="_blank" 
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:underline"
                >
                  <span>Visit {site.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[9px] text-slate-500 font-mono text-center mt-6 uppercase tracking-wider">
          * Note: StudentOS aggregates external open source tools for convenience. We are not affiliated with third-party providers.
        </p>
      </div>

    </div>
  );
}
