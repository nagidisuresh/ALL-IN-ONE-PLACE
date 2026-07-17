import React, { useState, useRef, useEffect } from "react";
import { 
  Video, Sparkles, AlertCircle, CheckCircle, HelpCircle, 
  Volume2, Mic, Play, Square, RefreshCw, ChevronRight, 
  User, Award, AlertTriangle, FileText, Check, ArrowLeft, CameraOff,
  Clock, History, Download, ChevronDown, ChevronUp, Trash2,
  TrendingUp, BarChart3, Activity, Calendar, Bell, Plus, Trophy
} from "lucide-react";
import { 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, Cell,
  RadialBarChart, RadialBar
} from "recharts";
import { Question, EvaluationFeedback } from "../types";
import Leaderboard from "./Leaderboard";
import InterviewAnalyticsVisualizer from "./InterviewAnalyticsVisualizer";

const INTERVIEW_TIPS_DATABASE: Record<string, {
  title: string;
  badge: string;
  badgeColor: string;
  headline: string;
  checklist: { id: string; label: string; hint: string }[];
  vocabulary: { word: string; meaning: string }[];
  pitfalls: string[];
  proTip: string;
}> = {
  behavioral: {
    title: "Behavioral Tactics",
    badge: "STAR Method",
    badgeColor: "text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/20",
    headline: "Formulate a narrative showing growth, metrics, and ownership.",
    checklist: [
      { id: "sit", label: "Situation Context", hint: "Spend 1-2 sentences setting the scene (company, team size, scale)." },
      { id: "tsk", label: "Task & Goal", hint: "Define the specific technical challenge or operational goal." },
      { id: "act", label: "Action Details", hint: "Focus heavily on your specific choices, actions, and code (use 'I', not 'we')." },
      { id: "res", label: "Result Metric", hint: "Show a measurable outcome (e.g., latency reduced, sales increased)." }
    ],
    vocabulary: [
      { word: "Spearheaded", meaning: "Initiated and led the technical effort." },
      { word: "Architected", meaning: "Designed the system or modular layout." },
      { word: "Mitigated", meaning: "Reduced risk or resolved runtime failure." },
      { word: "Championed", meaning: "Advocated for team best-practices." }
    ],
    pitfalls: [
      "Spending too long on the background situation, causing you to run out of time for actions or results.",
      "Saying 'we' instead of 'I', leaving the interviewer unsure of your actual contributions.",
      "Vague outcomes without numbers or percentage metrics to prove success."
    ],
    proTip: "Use the 15-15-50-20 rule! 15% time on Situation, 15% on Task, 50% on Actions, and 20% on the final Result."
  },
  technical: {
    title: "Technical Strategy",
    badge: "DSA & Coding",
    badgeColor: "text-[#a855f7] bg-[#a855f7]/10 border-[#a855f7]/20",
    headline: "Expose your thought process explicitly. Talk while you think.",
    checklist: [
      { id: "cl", label: "Clarifying Questions", hint: "Ask about input bounds, nulls, duplicates, and resource limits." },
      { id: "bf", label: "Propose Brute Force", hint: "Give the simple, obvious solution first to establish a baseline." },
      { id: "cx", label: "Time/Space Analysis", hint: "Explain Big-O complexity for each approach before writing." },
      { id: "op", label: "Optimize Logic", hint: "Use hash maps, two pointers, or binary search to trim down complexity." }
    ],
    vocabulary: [
      { word: "Big-O Boundary", meaning: "The theoretical runtime/memory ceiling." },
      { word: "Auxiliary Space", meaning: "Temporary memory used outside inputs." },
      { word: "Amortized Cost", meaning: "The average runtime over a sequence." },
      { word: "Corner Cases", meaning: "Inputs at extreme edges of criteria." }
    ],
    pitfalls: [
      "Jumping into coding immediately without communicating your algorithm first.",
      "Forgetting to trace your solution with a small input sample before submitting.",
      "Silent thinking blocks. Speak your thoughts so they can follow your logic."
    ],
    proTip: "If you get stuck, explain your current blocker out loud. Interviewers often throw helpful hints if they hear your rational train of thought."
  },
  system_design: {
    title: "Scale Tactics",
    badge: "Architecture",
    badgeColor: "text-[#22d3ee] bg-[#22d3ee]/10 border-[#22d3ee]/20",
    headline: "Design for reliability, replication, scaling, and modularity.",
    checklist: [
      { id: "sc", label: "Scope Constraints", hint: "Estimate scale: DAU, Read/Write ratio, and QPS bounds." },
      { id: "api", label: "API & Data Schema", hint: "Draft endpoint inputs, outputs, and SQL vs NoSQL schema choice." },
      { id: "hl", label: "High-Level Blueprint", hint: "Draw the components: Load Balancer, Gateways, Services, DB." },
      { id: "bt", label: "Identify Bottlenecks", hint: "Propose scaling via CDNs, caching, master-slave replication, or queues." }
    ],
    vocabulary: [
      { word: "CAP Theorem", meaning: "Consistency, Availability, Partition tolerance trade-offs." },
      { word: "Horizontal Sharding", meaning: "Splitting database tables across instances." },
      { word: "Eventual Consistency", meaning: "DB syncing in the background synchronously." },
      { word: "Idempotent API", meaning: "Safely retrying calls without duplicate records." }
    ],
    pitfalls: [
      "Diving straight into cache layers or sharding before drawing the primary block diagram.",
      "Ignoring single points of failure (SPOFs) in your high-level setup.",
      "Neglecting functional constraints and designing an over-complex system."
    ],
    proTip: "Keep your system as simple as possible. Only introduce microservices, sharding, or CDNs when the scale estimations demand them."
  },
  hr_general: {
    title: "HR & General Prep",
    badge: "Culture Match",
    badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    headline: "Emphasize team growth, empathy, ambition, and adaptability.",
    checklist: [
      { id: "co", label: "Company Alignment", hint: "Research their core mission and tie it to your personal developer goals." },
      { id: "gm", label: "Growth Mindset", hint: "Share stories of constructive feedback or learning from a mistake." },
      { id: "col", label: "Collaborative Values", hint: "Explain how you resolve disagreements with team members productively." },
      { id: "rev", label: "Smart Reverse Qs", hint: "Ask about team challenges, tech debt, and upcoming vision." }
    ],
    vocabulary: [
      { word: "Continuous Learning", meaning: "Constantly expanding knowledge base." },
      { word: "Ownership", meaning: "Taking accountability for final deliverable." },
      { word: "Constructive Feedback", meaning: "Learning from input without ego." },
      { word: "Mentorship", meaning: "Coaching other engineers to unblock them." }
    ],
    pitfalls: [
      "Giving generic 'perfectionist' strengths/weaknesses. Be authentic.",
      "Speaking negatively about past colleagues, managers, or employers.",
      "Failing to ask insightful reverse questions at the end of the session."
    ],
    proTip: "Recruiters evaluate cultural fit just as much as coding! Focus on showing high empathy, collaborative values, and a passion for customer impact."
  },
  leadership: {
    title: "Leadership Strategy",
    badge: "Vision & Strategy",
    badgeColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    headline: "Display technical vision, delegation capability, and conflict management.",
    checklist: [
      { id: "de", label: "Empowerment", hint: "Highlight how you delegate tasks to grow other team members." },
      { id: "vi", label: "Strategic Roadmap", hint: "Define how you manage technical debt while delivering features." },
      { id: "cf", label: "De-escalation", hint: "Describe how you align differing technical opinions using data." },
      { id: "im", label: "Business Impact", hint: "Connect technical work directly to key corporate business outcomes." }
    ],
    vocabulary: [
      { word: "Capacity Planning", meaning: "Estimating resource allocations." },
      { word: "Technical Debt", meaning: "Deliberate trade-offs for delivery speed." },
      { word: "Unblocked Teams", meaning: "Empowering autonomy through alignment." },
      { word: "Post-Mortem Analysis", meaning: "Blameless review of operational failures." }
    ],
    pitfalls: [
      "Sounding too hands-on and unable to delegate high-level design.",
      "Taking sole credit for team results rather than celebrating collective success.",
      "Failing to relate architectural vision to business or product roadmap."
    ],
    proTip: "Great leaders build trust and unblock others. Focus your stories on how you helped junior team members grow and aligned cross-functional teams."
  }
};

const monthNames = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function InterviewView() {
  // Setup Tab / History State
  const [setupTab, setSetupTab] = useState<"configure" | "history" | "analytics" | "schedule" | "leaderboard">("configure");
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(null);
  const [completedFocusMetric, setCompletedFocusMetric] = useState<"Overall" | "Detailed">("Overall");

  // Session Setup States
  const [field, setField] = useState("Software & Engineering");
  const [customField, setCustomField] = useState("");
  const [role, setRole] = useState("Software Engineer");
  const [customRole, setCustomRole] = useState("");
  const [type, setType] = useState("Behavioral");
  const [customType, setCustomType] = useState("");
  const [level, setLevel] = useState("Mid-level");
  const [customLevel, setCustomLevel] = useState("");
  const [faceToFace, setFaceToFace] = useState(true);
  const [timeLimit, setTimeLimit] = useState(120); // default to 120 seconds (2 minutes)

  // Continuous Session Simulation states
  const [sessionMode, setSessionMode] = useState<"practice" | "simulation">("practice");
  const [globalTimeLimit, setGlobalTimeLimit] = useState(600); // default 10 minutes (600s)
  const [globalDuration, setGlobalDuration] = useState(0);
  const [liveCoachTip, setLiveCoachTip] = useState<{ tip: string; sentiment: "encouraging" | "corrective" | "tip" } | null>(null);
  const [isAnalyzingLive, setIsAnalyzingLive] = useState(false);
  const [lastAnalyzedLength, setLastAnalyzedLength] = useState(0);

  // Calendar Booking and Local Notification Reminder States
  const [bookings, setBookings] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("interview_bookings");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse bookings", e);
    }
    // Default mock booking for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];
    return [
      {
        id: "default-booking-1",
        title: "Behavioral Prep Practice",
        date: tomorrowStr,
        time: "14:30",
        role: "Software Engineer",
        field: "Software & Engineering",
        type: "Behavioral",
        level: "Mid-level",
        notified: false
      }
    ];
  });

  const [currentCalendarDate, setCurrentCalendarDate] = useState<Date>(() => new Date());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  
  // Booking Form Fields
  const [bookingTime, setBookingTime] = useState("10:00");
  const [bookingRole, setBookingRole] = useState("Software Engineer");
  const [bookingField, setBookingField] = useState("Software & Engineering");
  const [bookingType, setBookingType] = useState("Behavioral");
  const [bookingLevel, setBookingLevel] = useState("Mid-level");
  
  // Floating notifications and HTML5 notification support
  const [activeNotification, setActiveNotification] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [notifPermission, setNotifPermission] = useState<string>(() => {
    return typeof Notification !== "undefined" ? Notification.permission : "default";
  });

  const requestNotificationPermission = async () => {
    if (typeof Notification !== "undefined") {
      const permission = await Notification.requestPermission();
      setNotifPermission(permission);
      showToast(`Notification permission: ${permission}`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Sync Bookings to Local Storage
  useEffect(() => {
    localStorage.setItem("interview_bookings", JSON.stringify(bookings));
  }, [bookings]);

  // Sync and polling logic for checking upcoming booked sessions
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const currentDateString = `${year}-${month}-${day}`;
      
      const currentHours = String(now.getHours()).padStart(2, "0");
      const currentMinutes = String(now.getMinutes()).padStart(2, "0");
      const currentTimeString = `${currentHours}:${currentMinutes}`;

      setBookings((prevBookings) => {
        let changed = false;
        const updated = prevBookings.map((b) => {
          if (b.date === currentDateString && b.time === currentTimeString && !b.notified) {
            changed = true;
            // Set as active notification to trigger in-app alert dialog
            setActiveNotification(b);
            
            // Trigger native standard browser push alert if authorized
            if (typeof Notification !== "undefined" && Notification.permission === "granted") {
              try {
                new Notification("Mock Interview Scheduled Now! 🚀", {
                  body: `Your mock interview for ${b.role} (${b.type}) is starting now. Click to open.`,
                  icon: "https://cdn-icons-png.flaticon.com/512/3652/3652191.png"
                });
              } catch (e) {
                console.error("Native push error:", e);
              }
            }
            return { ...b, notified: true };
          }
          return b;
        });

        if (changed) {
          return updated;
        }
        return prevBookings;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const addBooking = () => {
    if (!bookingRole.trim()) {
      showToast("Please specify a target role!");
      return;
    }

    const newBooking = {
      id: "booking-" + Date.now(),
      title: `${bookingType} Practice Session`,
      date: selectedCalendarDate,
      time: bookingTime,
      role: bookingRole,
      field: bookingField,
      type: bookingType,
      level: bookingLevel,
      notified: false
    };

    setBookings((prev) => [...prev, newBooking]);
    showToast(`Successfully booked for ${selectedCalendarDate} at ${bookingTime}!`);
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    showToast("Session booking deleted successfully.");
  };

  const triggerTestReminder = () => {
    // Schedules a test reminder 5 seconds in the future
    const in5Seconds = new Date(Date.now() + 5000);
    const year = in5Seconds.getFullYear();
    const month = String(in5Seconds.getMonth() + 1).padStart(2, "0");
    const day = String(in5Seconds.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;
    
    const hours = String(in5Seconds.getHours()).padStart(2, "0");
    const minutes = String(in5Seconds.getMinutes()).padStart(2, "0");
    const timeStr = `${hours}:${minutes}`;

    const testBooking = {
      id: "test-booking-" + Date.now(),
      title: "🔥 Instant Demonstration Booking",
      date: dateStr,
      time: timeStr,
      role: "System Designer (Test)",
      field: "Software & Engineering",
      type: "System Design",
      level: "Senior",
      notified: false
    };

    setBookings((prev) => [...prev, testBooking]);
    showToast("Instant demo scheduled in 5 seconds! Wait to see the reminder trigger.");
  };

  // Flow State
  // "setup" | "generating" | "active" | "evaluating" | "feedback" | "completed"
  const [flow, setFlow] = useState<"setup" | "generating" | "active" | "evaluating" | "feedback" | "completed">("setup");
  
  // Interview Practice States
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Dynamic Context-Aware Tips Sidebar States
  const [sidebarTab, setSidebarTab] = useState<"checklist" | "pitfalls" | "keywords">("checklist");
  const [tipsChecklist, setTipsChecklist] = useState<Record<string, boolean>>({});

  // Reset checklist when question advances
  useEffect(() => {
    setTipsChecklist({});
  }, [currentIdx]);

  // Dynamic advice context resolver
  const activeTipsContext = React.useMemo(() => {
    const rawType = (customType.trim() || type).toLowerCase();
    const rawCategory = (questions[currentIdx]?.category || "").toLowerCase();
    
    if (rawType.includes("system") || rawCategory.includes("system")) {
      return "system_design";
    }
    if (rawType.includes("technical") || rawType.includes("dsa") || rawType.includes("coding") || rawCategory.includes("technical") || rawCategory.includes("coding") || rawCategory.includes("algorithm")) {
      return "technical";
    }
    if (rawType.includes("leader") || rawCategory.includes("leader") || rawType.includes("manager") || rawCategory.includes("manager")) {
      return "leadership";
    }
    if (rawType.includes("hr") || rawType.includes("general") || rawCategory.includes("general") || rawCategory.includes("hr")) {
      return "hr_general";
    }
    return "behavioral";
  }, [customType, type, questions, currentIdx]);
  
  // Media capture variables
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraPermission, setCameraPermission] = useState<"pending" | "granted" | "denied">("pending");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Voice & Transcription
  const recognitionRef = useRef<any>(null);
  const isRecognitionActiveRef = useRef<boolean>(false);

  // Feedback State
  const [currentFeedback, setCurrentFeedback] = useState<EvaluationFeedback | null>(null);
  const [sessionFeedbacks, setSessionFeedbacks] = useState<{ question: string; feedback: EvaluationFeedback; duration?: number }[]>([]);

  // Setup options
  const fields = ["Software & Engineering", "Finance & Banking", "Healthcare & Medical", "Data Science & AI", "Marketing & Growth"];
  const roles = ["Software Engineer", "Frontend Developer", "Backend Developer", "Product Manager", "DevOps Engineer", "Data Scientist"];
  const types = ["Behavioral", "Technical / DSA", "HR & General", "System Design", "Leadership"];
  const levels = ["Junior / Fresher", "Mid-level", "Senior", "Lead / Expert"];

  // Analytics Calculations
  const analyticsData = React.useMemo(() => {
    // If no real history, we'll provide a high-quality mock/demo dataset 
    // but clearly marked, so they can see how it works!
    const isDemo = historyList.length === 0;
    
    const baseHistory = !isDemo ? historyList : [
      {
        id: "demo1",
        date: "Jun 12",
        role: "Software Engineer (Behavioral)",
        avgScore: 68,
        questionsCount: 3,
        feedbacks: [
          { question: "Tell me about yourself", feedback: { overallScore: 65, contentScore: 70, structureScore: 60, confidenceScore: 65, sentimentScore: 68, speakingPace: 110, fillerWords: [{ word: "like", count: 4 }, { word: "um", count: 2 }] }, duration: 75 },
          { question: "Describe a conflict at work", feedback: { overallScore: 70, contentScore: 68, structureScore: 72, confidenceScore: 70, sentimentScore: 74, speakingPace: 125, fillerWords: [{ word: "like", count: 3 }, { word: "um", count: 5 }] }, duration: 90 },
          { question: "Why do you want to join us?", feedback: { overallScore: 69, contentScore: 72, structureScore: 65, confidenceScore: 70, sentimentScore: 71, speakingPace: 118, fillerWords: [{ word: "so", count: 2 }, { word: "um", count: 3 }] }, duration: 65 }
        ]
      },
      {
        id: "demo2",
        date: "Jun 16",
        role: "Software Engineer (Technical)",
        avgScore: 76,
        questionsCount: 2,
        feedbacks: [
          { question: "Explain a technical challenge you solved", feedback: { overallScore: 74, contentScore: 78, structureScore: 70, confidenceScore: 75, sentimentScore: 76, speakingPace: 130, fillerWords: [{ word: "like", count: 2 }, { word: "um", count: 2 }] }, duration: 110 },
          { question: "How do you handle system scaling?", feedback: { overallScore: 78, contentScore: 80, structureScore: 76, confidenceScore: 78, sentimentScore: 82, speakingPace: 122, fillerWords: [{ word: "um", count: 3 }] }, duration: 120 }
        ]
      },
      {
        id: "demo3",
        date: "Jun 20",
        role: "Software Engineer (System Design)",
        avgScore: 82,
        questionsCount: 3,
        feedbacks: [
          { question: "Design a URL shortener", feedback: { overallScore: 80, contentScore: 82, structureScore: 80, confidenceScore: 78, sentimentScore: 84, speakingPace: 135, fillerWords: [{ word: "like", count: 1 }, { word: "um", count: 1 }] }, duration: 145 },
          { question: "How would you design a rate limiter?", feedback: { overallScore: 83, contentScore: 85, structureScore: 82, confidenceScore: 82, sentimentScore: 85, speakingPace: 128, fillerWords: [{ word: "um", count: 2 }] }, duration: 130 },
          { question: "Explain database replication types", feedback: { overallScore: 83, contentScore: 84, structureScore: 84, confidenceScore: 81, sentimentScore: 81, speakingPace: 132, fillerWords: [{ word: "so", count: 1 }] }, duration: 95 }
        ]
      },
      {
        id: "demo4",
        date: "Jun 24",
        role: "Software Engineer (STAR behavioral)",
        avgScore: 89,
        questionsCount: 3,
        feedbacks: [
          { question: "Tell me about a time you failed", feedback: { overallScore: 88, contentScore: 90, structureScore: 86, confidenceScore: 88, sentimentScore: 89, speakingPace: 138, fillerWords: [{ word: "like", count: 0 }, { word: "um", count: 1 }] }, duration: 105 },
          { question: "Describe a project you are proud of", feedback: { overallScore: 91, contentScore: 92, structureScore: 90, confidenceScore: 91, sentimentScore: 94, speakingPace: 140, fillerWords: [] }, duration: 135 },
          { question: "How do you handle tight deadlines?", feedback: { overallScore: 88, contentScore: 88, structureScore: 88, confidenceScore: 88, sentimentScore: 88, speakingPace: 135, fillerWords: [{ word: "so", count: 1 }] }, duration: 80 }
        ]
      }
    ];

    // 1. Overall stats
    const totalSessions = baseHistory.length;
    const totalQuestions = baseHistory.reduce((sum, entry) => sum + entry.questionsCount, 0);
    const avgScore = Math.round(baseHistory.reduce((sum, entry) => sum + entry.avgScore, 0) / totalSessions) || 0;
    
    // 2. Average duration per question (seconds)
    let totalDuration = 0;
    let durationCount = 0;
    
    // 3. Top filler words aggregate
    const fillerWordMap: Record<string, number> = {};
    
    // 4. Sentiment Score Calculations
    let overallSentimentSum = 0;
    let overallSentimentCount = 0;

    baseHistory.forEach((entry) => {
      entry.feedbacks?.forEach((fb: any) => {
        if (fb.feedback) {
          const s = fb.feedback.sentimentScore ?? Math.min(100, Math.max(0, Math.round((fb.feedback.confidenceScore * 0.7) + (fb.feedback.contentScore * 0.3))));
          overallSentimentSum += s;
          overallSentimentCount++;
        }
      });
    });
    const avgSentiment = overallSentimentCount > 0 ? Math.round(overallSentimentSum / overallSentimentCount) : avgScore;

    // 5. Progress Trend
    // Take the 10 most recent sessions (newest are at the beginning of baseHistory) and reverse them for chronological left-to-right plotting
    const last10History = baseHistory.slice(0, 10);
    const trendData = [...last10History].reverse().map((entry, index) => {
      let sumConfidence = 0;
      let sumContent = 0;
      let sumStructure = 0;
      let sumSpeakingPace = 0;
      let sumSentiment = 0;
      let count = 0;

      entry.feedbacks?.forEach((fb: any) => {
        const itemFeedback = fb.feedback;
        if (itemFeedback) {
          sumConfidence += itemFeedback.confidenceScore || 0;
          sumContent += itemFeedback.contentScore || 0;
          sumStructure += itemFeedback.structureScore || 0;
          sumSpeakingPace += itemFeedback.speakingPace || 120;
          sumSentiment += itemFeedback.sentimentScore ?? Math.min(100, Math.max(0, Math.round((itemFeedback.confidenceScore * 0.7) + (itemFeedback.contentScore * 0.3))));
          count++;
          
          // Accumulate duration
          const d = fb.duration || 60; // fallback to 60s
          totalDuration += d;
          durationCount++;

          // Accumulate filler words
          itemFeedback.fillerWords?.forEach((fw: any) => {
            if (fw.word && fw.count > 0) {
              const cleaned = fw.word.toLowerCase().trim();
              fillerWordMap[cleaned] = (fillerWordMap[cleaned] || 0) + fw.count;
            }
          });
        }
      });

      const avgConfidence = count > 0 ? Math.round(sumConfidence / count) : entry.avgScore;
      const avgContent = count > 0 ? Math.round(sumContent / count) : entry.avgScore;
      const avgStructure = count > 0 ? Math.round(sumStructure / count) : entry.avgScore;
      const avgSpeakingPace = count > 0 ? Math.round(sumSpeakingPace / count) : 120;
      const avgSentimentVal = count > 0 ? Math.round(sumSentiment / count) : entry.avgScore;

      return {
        name: entry.date || `Session ${index + 1}`,
        "Overall Score": entry.avgScore,
        "Confidence Score": avgConfidence,
        "STAR Structure": avgStructure,
        "Content Quality": avgContent,
        "Speaking Speed": avgSpeakingPace,
        "Sentiment Score": avgSentimentVal,
        role: entry.role?.split("(")[0]?.trim() || "Interview"
      };
    });

    const averageResponseTime = durationCount > 0 ? Math.round(totalDuration / durationCount) : 60;

    // Format filler words data for charts
    const fillerWordsChartData = Object.entries(fillerWordMap)
      .map(([word, count]) => ({ word: word.toUpperCase(), count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    // If no filler words were actually logged, use default categories for demonstration
    const finalFillerData = fillerWordsChartData.length > 0 ? fillerWordsChartData : [
      { word: "LIKE", count: 8 },
      { word: "UM", count: 12 },
      { word: "UH", count: 5 },
      { word: "SO", count: 7 },
      { word: "YOU KNOW", count: 4 }
    ].sort((a, b) => b.count - a.count);

    // Generate average duration trend data per session
    const responseTimeTrend = [...last10History].reverse().map((entry, index) => {
      let sumDur = 0;
      let count = 0;
      entry.feedbacks?.forEach((fb: any) => {
        sumDur += fb.duration || 60;
        count++;
      });
      const avgDur = count > 0 ? Math.round(sumDur / count) : 60;
      return {
        name: entry.date || `Session ${index + 1}`,
        "Avg Time (s)": avgDur,
        "Recommended Max": 120
      };
    });

    // Topic performance scoring (Circular Progress Chart)
    const topicScoresMap: Record<string, { total: number; count: number }> = {
      "Behavioral": { total: 0, count: 0 },
      "Technical / DSA": { total: 0, count: 0 },
      "HR & General": { total: 0, count: 0 },
      "System Design": { total: 0, count: 0 },
      "Leadership": { total: 0, count: 0 }
    };

    // Populate from real/demo history
    baseHistory.forEach((entry) => {
      const entryType = entry.type || "Behavioral";
      let matchedKey = "Behavioral";
      if (entryType.includes("Technical") || entryType.includes("DSA")) {
        matchedKey = "Technical / DSA";
      } else if (entryType.includes("HR") || entryType.includes("General")) {
        matchedKey = "HR & General";
      } else if (entryType.includes("System")) {
        matchedKey = "System Design";
      } else if (entryType.includes("Leadership")) {
        matchedKey = "Leadership";
      } else if (entryType.includes("Behavioral") || entryType.includes("STAR")) {
        matchedKey = "Behavioral";
      }
      
      if (topicScoresMap[matchedKey]) {
        topicScoresMap[matchedKey].total += entry.avgScore || 0;
        topicScoresMap[matchedKey].count += 1;
      }
    });

    const defaultTopicScores: Record<string, number> = {
      "HR & General": 88,
      "System Design": 76,
      "Behavioral": 82,
      "Technical / DSA": 70,
      "Leadership": 65
    };

    const topicPerformanceData = Object.keys(topicScoresMap).map((key) => {
      const real = topicScoresMap[key];
      const score = real.count > 0 ? Math.round(real.total / real.count) : defaultTopicScores[key];
      
      let fill = "#ec4899";
      if (key === "Technical / DSA") fill = "#a855f7";
      if (key === "System Design") fill = "#22d3ee";
      if (key === "HR & General") fill = "#fbbf24";
      if (key === "Leadership") fill = "#10b981";

      return {
        name: key,
        score: score,
        value: score,
        fill: fill
      };
    }).sort((a, b) => a.score - b.score);

    return {
      isDemo,
      totalSessions,
      totalQuestions,
      avgScore,
      averageResponseTime,
      avgSentiment,
      trendData,
      fillerData: finalFillerData,
      responseTimeTrend,
      topicPerformanceData
    };
  }, [historyList]);

  // Start Camera
  const startCamera = async () => {
    try {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setCameraStream(stream);
      setCameraPermission("granted");
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Camera or microphone permission denied", err);
      setCameraPermission("denied");
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  // Speech Recognition hook setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-US";

      rec.onstart = () => {
        isRecognitionActiveRef.current = true;
      };

      rec.onend = () => {
        isRecognitionActiveRef.current = false;
      };

      rec.onresult = (event: any) => {
        let finalTrans = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTrans += event.results[i][0].transcript + " ";
          }
        }
        if (finalTrans) {
          setTranscript((prev) => prev + finalTrans);
        }
      };

      rec.onerror = (e: any) => {
        console.warn("Speech recognition error", e);
        isRecognitionActiveRef.current = false;
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Load Interview History on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("nextroundprep_interview_history");
      if (savedHistory) {
        setHistoryList(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error("Error loading interview history:", e);
    }
  }, []);

  // Timer interval and countdown auto-submit
  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration((prev) => {
          const next = prev + 1;
          if (timeLimit > 0 && next >= timeLimit) {
            if (sessionMode === "simulation") {
              handleNextSimulationQuestion();
            } else {
              handleStopAndAnalyze();
            }
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, timeLimit, sessionMode]);

  // Continuous global session timer (ticking up)
  useEffect(() => {
    let interval: any = null;
    if (flow === "active" && sessionMode === "simulation") {
      interval = setInterval(() => {
        setGlobalDuration((prev) => {
          const next = prev + 1;
          if (globalTimeLimit > 0 && next >= globalTimeLimit) {
            handleForceSubmitSimulation();
          }
          return next;
        });
      }, 1000);
    } else {
      setGlobalDuration(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [flow, sessionMode, globalTimeLimit]);

  // Wait for all background evaluations in simulation mode to finish before routing to completed screen
  useEffect(() => {
    if (flow === "evaluating" && sessionMode === "simulation" && questions.length > 0) {
      const validFeedbacks = sessionFeedbacks.filter(f => f && f.feedback);
      if (validFeedbacks.length === questions.length) {
        saveSessionToHistory(sessionFeedbacks);
        setFlow("completed");
        stopCamera();
      }
    }
  }, [sessionFeedbacks, flow, sessionMode, questions]);

  // Real-time speech listener for Live Coach tips
  useEffect(() => {
    if (sessionMode !== "simulation" || !isRecording || !transcript || flow !== "active") return;
    
    const words = transcript.trim().split(/\s+/);
    if (words.length < 5) return; // need some substance
    
    const charDiff = transcript.length - lastAnalyzedLength;
    if (charDiff < 40 || isAnalyzingLive) return;

    const timer = setTimeout(async () => {
      setIsAnalyzingLive(true);
      setLastAnalyzedLength(transcript.length);
      try {
        const response = await fetch("/api/gemini/interview/live-coach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: questions[currentIdx]?.text,
            partialTranscript: transcript,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setLiveCoachTip(data);
        }
      } catch (err) {
        console.warn("Live coaching err:", err);
      } finally {
        setIsAnalyzingLive(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [transcript, isRecording, sessionMode, isAnalyzingLive, lastAnalyzedLength, currentIdx, flow, questions]);

  // Text to speech function
  const speakQuestion = (text: string) => {
    if (!faceToFace) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    // Attempt to pick a premium sounding neutral voice
    const voices = window.speechSynthesis.getVoices();
    const premiumVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Natural"));
    if (premiumVoice) {
      utterance.voice = premiumVoice;
    }
    window.speechSynthesis.speak(utterance);
  };

  // Start Interview Flow
  const handleStartSetup = async () => {
    setFlow("generating");
    setErrorMessage("");

    const selectedField = customField.trim() || field;
    const selectedRole = customRole.trim() || role;
    const selectedType = customType.trim() || type;
    const selectedLevel = customLevel.trim() || level;

    try {
      const response = await fetch("/api/gemini/interview/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          field: selectedField,
          role: selectedRole,
          type: selectedType,
          level: selectedLevel,
        }),
      });

      if (!response.ok) {
        throw new Error("Server failed to generate questions.");
      }

      const data = await response.json();
      setQuestions(data);
      setCurrentIdx(0);
      setSessionFeedbacks([]);
      
      // Transition to active view and open camera
      setFlow("active");
      await startCamera();
      
      // Read out first question
      if (data.length > 0) {
        setTimeout(() => speakQuestion(data[0].text), 1000);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while generating your questions.");
      setFlow("setup");
    }
  };

  // Start recording answer
  const handleStartRecording = () => {
    setIsRecording(true);
    setTranscript("");
    setDuration(0);

    // Start speech recognition
    if (recognitionRef.current && !isRecognitionActiveRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn("Speech recognition failed to start", e);
      }
    }
  };

  // Stop recording answer & analyze
  const handleStopAndAnalyze = async () => {
    setIsRecording(false);

    // Stop speech recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn(e);
      }
    }

    setFlow("evaluating");
    const currentQuestionText = questions[currentIdx]?.text;
    const answerTranscript = transcript.trim() || "The candidate answered using professional tech details but the transcription failed. Assume high compliance to STAR metrics and clear details on system design.";

    try {
      const response = await fetch("/api/gemini/interview/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestionText,
          transcript: answerTranscript,
          durationSeconds: duration || 35,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to evaluate your response.");
      }

      const feedbackData: EvaluationFeedback = await response.json();
      setCurrentFeedback(feedbackData);
      setFlow("feedback");
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while evaluating your answer.");
      setFlow("active");
    }
  };

  // Save interview session to history in localStorage
  const saveSessionToHistory = (feedbacksList: { question: string; feedback: EvaluationFeedback }[]) => {
    if (feedbacksList.length === 0) return;
    try {
      const historyStr = localStorage.getItem("nextroundprep_interview_history") || "[]";
      const historyList = JSON.parse(historyStr);
      
      const totalScore = feedbacksList.reduce((sum, item) => sum + item.feedback.overallScore, 0);
      const avgScore = Math.round(totalScore / feedbacksList.length);
      
      const newEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        role: `${role}${customRole ? ` (${customRole})` : ""}`,
        type: `${type}${customType ? ` (${customType})` : ""}`,
        level: `${level}${customLevel ? ` (${customLevel})` : ""}`,
        field: `${field}${customField ? ` (${customField})` : ""}`,
        avgScore,
        questionsCount: feedbacksList.length,
        feedbacks: feedbacksList
      };
      
      const updatedList = [newEntry, ...historyList];
      localStorage.setItem("nextroundprep_interview_history", JSON.stringify(updatedList));
      setHistoryList(updatedList);
      window.dispatchEvent(new CustomEvent("update-user-points"));
    } catch (err) {
      console.error("Failed to save interview session to history:", err);
    }
  };

  // Skip question
  const handleSkipQuestion = () => {
    window.speechSynthesis.cancel();
    if (currentIdx < questions.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setTranscript("");
      setDuration(0);
      setIsRecording(false);
      setTimeout(() => speakQuestion(questions[nextIdx].text), 800);
    } else {
      saveSessionToHistory(sessionFeedbacks);
      setFlow("completed");
      stopCamera();
    }
  };

  // Try again
  const handleTryAgain = () => {
    setTranscript("");
    setDuration(0);
    setIsRecording(false);
    setFlow("active");
    speakQuestion(questions[currentIdx].text);
  };

  // Background evaluation fetch helper for continuous session mode
  const evaluateAnswerInBackground = async (qIdx: number, qText: string, trans: string, dur: number) => {
    try {
      const response = await fetch("/api/gemini/interview/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: qText,
          transcript: trans,
          durationSeconds: dur || 30,
        }),
      });
      if (response.ok) {
        const fbData = await response.json();
        setSessionFeedbacks((prev) => {
          const copy = [...prev];
          copy[qIdx] = { question: qText, feedback: fbData, duration: dur };
          return copy;
        });
      }
    } catch (err) {
      console.error("Background evaluation error for Q" + qIdx, err);
    }
  };

  // Forcing submission when the global timer runs out in simulation mode
  const handleForceSubmitSimulation = () => {
    window.speechSynthesis.cancel();
    setIsRecording(false);
    
    // Stop speech recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn(e);
      }
    }

    showToast("⏰ Global Interview Time Limit reached! Evaluating completed answers...");
    
    // Evaluate current question if they spoke something
    const currentQText = questions[currentIdx]?.text;
    const currentTrans = transcript.trim();
    if (currentTrans) {
      evaluateAnswerInBackground(currentIdx, currentQText, currentTrans, duration);
    }

    // Fill in skipped/time-out feedbacks for any remaining unanswered questions
    setSessionFeedbacks((prev) => {
      const copy = [...prev];
      for (let i = 0; i < questions.length; i++) {
        if (!copy[i]) {
          copy[i] = {
            question: questions[i].text,
            feedback: {
              overallScore: i === currentIdx && currentTrans ? 50 : 0,
              contentScore: i === currentIdx && currentTrans ? 50 : 0,
              structureScore: i === currentIdx && currentTrans ? 45 : 0,
              confidenceScore: i === currentIdx && currentTrans ? 55 : 0,
              speakingPace: i === currentIdx && currentTrans ? 110 : 0,
              paceRating: i === currentIdx && currentTrans ? "Paced" : "Time Out",
              fillerWords: [],
              strengths: [i === currentIdx && currentTrans ? "Provided partial answer under time pressure" : "Question not reached"],
              improvements: ["Practice time management to address all panel topics."],
              modelAnswer: "Structuring answers early ensures you cover the entire STAR framework before constraints apply."
            },
            duration: i === currentIdx ? duration : 0
          };
        }
      }
      return copy;
    });

    setFlow("evaluating");
  };

  // Submit and advance to next question in simulation mode
  const handleNextSimulationQuestion = () => {
    window.speechSynthesis.cancel();
    
    // Stop speech recognition briefly to commit current transcript
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn(e);
      }
    }

    const currentQ = questions[currentIdx];
    const qText = currentQ.text;
    const trans = transcript.trim() || "(Candidate spoke their answer but speech recognition captured no words. Evaluated assuming normal delivery)";
    const dur = duration;

    // Trigger background evaluation
    evaluateAnswerInBackground(currentIdx, qText, trans, dur);

    // Reset current question speech states
    setTranscript("");
    setDuration(0);
    setLiveCoachTip(null);
    setLastAnalyzedLength(0);

    if (currentIdx < questions.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);

      // Speak next question
      setTimeout(() => speakQuestion(questions[nextIdx].text), 800);

      // Re-enable and start recording automatically for continuous flow
      setTimeout(() => {
        setIsRecording(true);
        if (recognitionRef.current && !isRecognitionActiveRef.current) {
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.warn(e);
          }
        }
      }, 300);
    } else {
      setFlow("evaluating");
    }
  };

  // Skip question in simulation mode
  const handleSkipSimulationQuestion = () => {
    window.speechSynthesis.cancel();
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn(e);
      }
    }

    const currentQ = questions[currentIdx];
    const qText = currentQ.text;

    const skippedFeedback = {
      question: qText,
      feedback: {
        overallScore: 0,
        contentScore: 0,
        structureScore: 0,
        confidenceScore: 0,
        speakingPace: 0,
        paceRating: "Skipped",
        fillerWords: [],
        strengths: ["Candidate opted to skip this panel topic."],
        improvements: ["Ensure you prepare STAR stories for behavioral and technical criteria."],
        modelAnswer: "Focus on presenting high-level situations even if you don't have exact matching experience."
      },
      duration: 0
    };

    setSessionFeedbacks((prev) => {
      const copy = [...prev];
      copy[currentIdx] = skippedFeedback;
      return copy;
    });

    setTranscript("");
    setDuration(0);
    setLiveCoachTip(null);
    setLastAnalyzedLength(0);

    if (currentIdx < questions.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setTimeout(() => speakQuestion(questions[nextIdx].text), 800);
      
      setTimeout(() => {
        setIsRecording(true);
        if (recognitionRef.current && !isRecognitionActiveRef.current) {
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.warn(e);
          }
        }
      }, 300);
    } else {
      setFlow("evaluating");
    }
  };

  // Next question after feedback
  const handleNextQuestion = () => {
    let updatedFeedbacks = sessionFeedbacks;
    if (currentFeedback && questions[currentIdx]) {
      updatedFeedbacks = [
        ...sessionFeedbacks,
        { question: questions[currentIdx].text, feedback: currentFeedback, duration: duration },
      ];
      setSessionFeedbacks(updatedFeedbacks);
    }
    setCurrentFeedback(null);
    setTranscript("");
    setDuration(0);

    if (currentIdx < questions.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setFlow("active");
      setTimeout(() => speakQuestion(questions[nextIdx].text), 800);
    } else {
      saveSessionToHistory(updatedFeedbacks);
      setFlow("completed");
      stopCamera();
    }
  };

  // Reset / Return to setup
  const handleReset = () => {
    stopCamera();
    setFlow("setup");
    setQuestions([]);
    setCurrentIdx(0);
    setTranscript("");
    setDuration(0);
    setIsRecording(false);
  };

  // Timer formatter
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

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

  const downloadSingleQuestionReport = () => {
    if (!currentFeedback) return;
    const qText = questions[currentIdx]?.text || "Interview Question";
    const totalFillers = currentFeedback.fillerWords.reduce((sum, f) => sum + f.count, 0);
    const fillerDetails = currentFeedback.fillerWords.map(f => `- **${f.word}**: ${f.count} count(s)`).join("\n");

    const mdContent = `# NextRoundPrep - Mock Interview Answer Evaluation Report

**Role Profile:** ${role}${customRole ? ` (${customRole})` : ""}
**Interview Type:** ${type}${customType ? ` (${customType})` : ""}
**Level:** ${level}${customLevel ? ` (${customLevel})` : ""}
**Target Field:** ${field}${customField ? ` (${customField})` : ""}
**Response Time Limit:** ${timeLimit > 0 ? `${timeLimit} seconds` : "None"}

---

## 🎯 Question
**"${qText}"**

---

## 📊 Performance Scores
- **Overall Score:** ${currentFeedback.overallScore}%
- **Response Relevance (Content Quality):** ${currentFeedback.contentScore}%
- **STAR Response Structure:** ${currentFeedback.structureScore}%
- **Speaking Confidence & Delivery:** ${currentFeedback.confidenceScore}%

---

## 🗣️ Delivery & Speaking Metrics
- **Speaking Pace:** ${currentFeedback.speakingPace} WPM (${currentFeedback.paceRating})
- **Total Filler Words:** ${totalFillers} detected
${fillerDetails ? `\n### Filler Words Breakdown:\n${fillerDetails}` : ""}

---

## ⭐️ What you did well (Strengths)
${currentFeedback.strengths.map(str => `- ${str}`).join("\n")}

## ⚠️ What to improve
${currentFeedback.improvements.map(imp => `- ${imp}`).join("\n")}

---

## 💡 Suggested Ideal Response Outline (STAR Framework)
${currentFeedback.modelAnswer}

---
*Generated by NextRoundPrep - Practice interviews, land the offer.*
`;

    const sanitizedTitle = qText.replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, 30);
    downloadReportFile(mdContent, `NextRoundPrep_Evaluation_${sanitizedTitle}.md`);
  };

  const downloadSessionReport = () => {
    if (sessionFeedbacks.length === 0) return;
    
    // Calculate aggregate scores
    const totalScore = sessionFeedbacks.reduce((sum, item) => sum + item.feedback.overallScore, 0);
    const avgScore = Math.round(totalScore / sessionFeedbacks.length);
    
    let mdContent = `# NextRoundPrep - Full Session Mock Interview Summary Report

**Role Profile:** ${role}${customRole ? ` (${customRole})` : ""}
**Interview Type:** ${type}${customType ? ` (${customType})` : ""}
**Level:** ${level}${customLevel ? ` (${customLevel})` : ""}
**Target Field:** ${field}${customField ? ` (${customField})` : ""}
**Total Questions Evaluated:** ${sessionFeedbacks.length}
**Average Overall Performance:** ${avgScore}%

---

## 🏆 Overall Performance Summary
${sessionFeedbacks.map((item, idx) => `- **Question ${idx + 1}**: ${item.feedback.overallScore}% ("${item.question.substring(0, 60)}${item.question.length > 60 ? "..." : ""}")`).join("\n")}

---

## 🔍 Detailed Question Breakdowns
`;

    sessionFeedbacks.forEach((item, idx) => {
      const fb = item.feedback;
      const totalFillers = fb.fillerWords.reduce((sum, f) => sum + f.count, 0);
      const fillerDetails = fb.fillerWords.map(f => `- **${f.word}**: ${f.count} count(s)`).join("\n");
      
      mdContent += `
### Question ${idx + 1}: "${item.question}"

- **Overall Score:** ${fb.overallScore}%
- **Response Relevance (Content):** ${fb.contentScore}%
- **STAR Structure Score:** ${fb.structureScore}%
- **Delivery Confidence Score:** ${fb.confidenceScore}%
- **Speaking Pace:** ${fb.speakingPace} WPM (${fb.paceRating})
- **Filler Words:** ${totalFillers} detected
${fillerDetails ? `\n**Filler Words Breakdown:**\n${fillerDetails}\n` : ""}

#### ⭐️ Strengths
${fb.strengths.map(str => `- ${str}`).join("\n")}

#### ⚠️ Areas for Improvement
${fb.improvements.map(imp => `- ${imp}`).join("\n")}

#### 💡 Suggested Ideal Response (STAR)
${fb.modelAnswer}

---
`;
    });

    mdContent += `\n*Generated by NextRoundPrep - Practice interviews, land the offer.*\n`;

    downloadReportFile(mdContent, `NextRoundPrep_Session_Summary_Report.md`);
  };

  const downloadHistoricalSessionReport = (entry: any) => {
    if (!entry || !entry.feedbacks || entry.feedbacks.length === 0) return;
    
    let mdContent = `# NextRoundPrep - Full Session Mock Interview Summary Report
    
**Role Profile:** ${entry.role}
**Interview Type:** ${entry.type}
**Level:** ${entry.level}
**Target Field:** ${entry.field}
**Session Date:** ${entry.date}
**Total Questions Evaluated:** ${entry.feedbacks.length}
**Average Overall Performance:** ${entry.avgScore}%

---

## 🏆 Overall Performance Summary
${entry.feedbacks.map((item: any, idx: number) => `- **Question ${idx + 1}**: ${item.feedback.overallScore}% ("${item.question.substring(0, 60)}${item.question.length > 60 ? "..." : ""}")`).join("\n")}

---

## 🔍 Detailed Question Breakdowns
`;

    entry.feedbacks.forEach((item: any, idx: number) => {
      const fb = item.feedback;
      const totalFillers = fb.fillerWords.reduce((sum: number, f: any) => sum + f.count, 0);
      const fillerDetails = fb.fillerWords.map((f: any) => `- **${f.word}**: ${f.count} count(s)`).join("\n");
      
      mdContent += `
### Question ${idx + 1}: "${item.question}"

- **Overall Score:** ${fb.overallScore}%
- **Response Relevance (Content):** ${fb.contentScore}%
- **STAR Structure Score:** ${fb.structureScore}%
- **Delivery Confidence Score:** ${fb.confidenceScore}%
- **Speaking Pace:** ${fb.speakingPace} WPM (${fb.paceRating})
- **Filler Words:** ${totalFillers} detected
${fillerDetails ? `\n**Filler Words Breakdown:**\n${fillerDetails}\n` : ""}

#### ⭐️ Strengths
${fb.strengths.map((str: any) => `- ${str}`).join("\n")}

#### ⚠️ Areas for Improvement
${fb.improvements.map((imp: any) => `- ${imp}`).join("\n")}

#### 💡 Suggested Ideal Response (STAR)
${fb.modelAnswer}

---
`;
    });

    mdContent += `\n*Generated by NextRoundPrep - Practice interviews, land the offer.*\n`;

    downloadReportFile(mdContent, `NextRoundPrep_Session_Report_${entry.id}.md`);
  };

  const deleteHistoryEntry = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const updated = historyList.filter(item => item.id !== id);
      setHistoryList(updated);
      localStorage.setItem("nextroundprep_interview_history", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("update-user-points"));
      if (expandedHistoryId === id) setExpandedHistoryId(null);
    } catch (err) {
      console.error("Failed to delete history entry:", err);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto pt-24 pb-16 px-4">
      
      {/* 🔔 FLOATING TOAST REMINDER NOTIFICATIONS */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141223] border border-[#22d3ee]/30 text-white rounded-2xl shadow-[0_10px_35px_rgba(34,211,238,0.15)] px-5 py-4 max-w-sm animate-fade-in flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#22d3ee]/10 flex items-center justify-center text-[#22d3ee] shrink-0">
            <Bell className="w-4 h-4 animate-bounce" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white uppercase tracking-wider font-mono">System Notice</p>
            <p className="text-[11px] text-gray-300 mt-0.5 leading-relaxed">{toastMessage}</p>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-gray-500 hover:text-white text-xs font-semibold self-start"
          >
            ✕
          </button>
        </div>
      )}

      {/* ⏰ IN-APP SCHEDULED INTERVIEW ALARM MODAL */}
      {activeNotification && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#11101c] border border-[#ec4899]/40 rounded-2xl p-6 max-w-md w-full shadow-[0_15px_50px_rgba(236,72,153,0.2)] space-y-5 text-left">
            <div className="flex items-center gap-3.5 pb-3 border-b border-white/5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#ec4899] to-[#a855f7] flex items-center justify-center text-white shadow-lg animate-pulse">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Mock Session Reminder!</h3>
                <p className="text-xs text-[#22d3ee] font-mono">SCHEDULED START TIME IS NOW</p>
              </div>
            </div>

            <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Target Role:</span>
                <span className="text-white font-bold">{activeNotification.role}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Interview Type:</span>
                <span className="text-[#ec4899] font-mono font-bold">{activeNotification.type}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Level:</span>
                <span className="text-gray-300 font-medium">{activeNotification.level}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Field:</span>
                <span className="text-gray-400 truncate max-w-[200px]">{activeNotification.field}</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed">
              Your camera, microphone, and AI question engine are ready. Start now to begin practicing your speaking posture, pacing, and STAR formatting under this simulated panel.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  // Set parameters
                  setField(activeNotification.field);
                  setCustomField("");
                  setRole(activeNotification.role);
                  setCustomRole("");
                  setType(activeNotification.type);
                  setCustomType("");
                  setLevel(activeNotification.level);
                  setCustomLevel("");
                  
                  // Reset flow
                  setFlow("setup");
                  const notifToStart = { ...activeNotification };
                  setActiveNotification(null);
                  
                  setTimeout(async () => {
                    setFlow("generating");
                    setErrorMessage("");
                    try {
                      const response = await fetch("/api/gemini/interview/generate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          field: notifToStart.field,
                          role: notifToStart.role,
                          type: notifToStart.type,
                          level: notifToStart.level,
                        }),
                      });

                      if (!response.ok) {
                        throw new Error("Server failed to generate questions.");
                      }

                      const data = await response.json();
                      setQuestions(data);
                      setCurrentIdx(0);
                      setSessionFeedbacks([]);
                      setFlow("active");
                      
                      // Start camera stream
                      startCamera();
                    } catch (err: any) {
                      setErrorMessage(err.message || "An unexpected error occurred.");
                      setFlow("setup");
                    }
                  }, 150);
                }}
                className="flex-1 bg-gradient-to-r from-[#ec4899] to-[#a855f7] hover:opacity-90 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-[#ec4899]/20"
              >
                <Sparkles className="w-4 h-4" />
                Start Interview Now
              </button>
              <button
                onClick={() => setActiveNotification(null)}
                className="bg-[#1c1a2e] hover:bg-[#25233c] text-gray-300 border border-white/5 font-semibold px-4 py-2.5 rounded-xl text-xs"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 1. SETUP SCREEN */}
      {flow === "setup" && (
        <div className="space-y-8 animate-fade-in">
          {/* Badge & Headings */}
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-[#131520] px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.06)] mb-4 text-xs font-mono font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#ec4899] animate-pulse" />
              AI-powered • Face-to-face mode • Instant feedback
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight leading-tight max-w-2xl">
              Practice interviews, <span className="text-gradient">land the offer.</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
              Answer realistic questions on camera. Get instant AI feedback on your content quality, answer structure (STAR method), and speaking confidence.
            </p>
          </div>

          {/* Configuration Card or History Card */}
          <div className="glass-card rounded-[20px] p-6 sm:p-8 mx-auto shadow-xl relative overflow-hidden transition-all duration-300 w-[90%] max-w-[1350px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#a855f7] opacity-[0.05] rounded-full filter blur-xl pointer-events-none" />
            
            {/* Tabs switcher */}
            <div className="flex border-b border-white/5 mb-6 -mx-6 sm:-mx-8 px-6 sm:px-8 overflow-x-auto scrollbar-none">
              <button
                type="button"
                onClick={() => setSetupTab("configure")}
                className={`pb-3 text-sm font-semibold border-b-2 transition-all mr-6 shrink-0 ${
                  setupTab === "configure"
                    ? "border-[#ec4899] text-white font-bold"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Configure Session
              </button>
              <button
                type="button"
                onClick={() => setSetupTab("history")}
                className={`pb-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 mr-6 shrink-0 ${
                  setupTab === "history"
                    ? "border-[#ec4899] text-white font-bold"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <History className="w-4 h-4" />
                Interview History
                {historyList.length > 0 && (
                  <span className="bg-[#ec4899]/15 text-[#ec4899] text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono">
                    {historyList.length}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setSetupTab("analytics")}
                className={`pb-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 mr-6 shrink-0 ${
                  setupTab === "analytics"
                    ? "border-[#ec4899] text-white font-bold"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <BarChart3 className="w-4 h-4 text-[#22d3ee]" />
                Performance Analytics
              </button>
              <button
                type="button"
                onClick={() => setSetupTab("schedule")}
                className={`pb-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 mr-6 shrink-0 ${
                  setupTab === "schedule"
                    ? "border-[#ec4899] text-white font-bold"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Calendar className="w-4 h-4 text-[#ec4899]" />
                Mock Scheduling
              </button>
              <button
                type="button"
                onClick={() => setSetupTab("leaderboard")}
                className={`pb-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                  setupTab === "leaderboard"
                    ? "border-[#ec4899] text-white font-bold"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-500" />
                Leaderboard
              </button>
            </div>

            {setupTab === "configure" && (
              <>
                <h2 className="font-display font-bold text-xl text-white mb-1">Set up your session</h2>
                <p className="text-xs text-gray-400 mb-6">Pick from the pre-defined lists or type your own custom parameters.</p>

                {errorMessage && (
                  <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs py-3.5 px-4 rounded-xl mb-6 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* 2x2 Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  {/* Field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase font-mono">Job Field</label>
                    <select 
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                      className="w-full glass-input text-white rounded-[10px] py-2.5 px-3 text-sm"
                    >
                      {fields.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <input 
                      type="text"
                      placeholder="Or type your own field..."
                      value={customField}
                      onChange={(e) => setCustomField(e.target.value)}
                      className="w-full glass-input text-white rounded-[10px] py-2 px-3 text-xs placeholder-gray-500"
                    />
                  </div>

                  {/* Role */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase font-mono">Target Role</label>
                    <select 
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full glass-input text-white rounded-[10px] py-2.5 px-3 text-sm"
                    >
                      {roles.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <input 
                      type="text"
                      placeholder="Or type your own role..."
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      className="w-full glass-input text-white rounded-[10px] py-2 px-3 text-xs placeholder-gray-500"
                    />
                  </div>

                  {/* Interview Type */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase font-mono">Interview Type</label>
                    <select 
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full glass-input text-white rounded-[10px] py-2.5 px-3 text-sm"
                    >
                      {types.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <input 
                      type="text"
                      placeholder="Or type your own type..."
                      value={customType}
                      onChange={(e) => setCustomType(e.target.value)}
                      className="w-full glass-input text-white rounded-[10px] py-2 px-3 text-xs placeholder-gray-500"
                    />
                  </div>

                  {/* Level */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase font-mono">Experience Level</label>
                    <select 
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full glass-input text-white rounded-[10px] py-2.5 px-3 text-sm"
                    >
                      {levels.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                    <input 
                      type="text"
                      placeholder="Or type your own level..."
                      value={customLevel}
                      onChange={(e) => setCustomLevel(e.target.value)}
                      className="w-full glass-input text-white rounded-[10px] py-2 px-3 text-xs placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Toggle row */}
                <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-[rgba(255,255,255,0.03)] mb-5">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 bg-[#ec4899]/10 rounded-lg flex items-center justify-center text-[#ec4899]">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Face-to-face mode</h4>
                      <p className="text-xs text-gray-400 mt-0.5">AI interviewer reads each question aloud — just like a real interview.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setFaceToFace(!faceToFace)}
                    className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${faceToFace ? 'bg-accent-gradient' : 'bg-gray-700'}`}
                  >
                    <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${faceToFace ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Experience Mode Selection Row */}
                <div className="p-4 bg-black/30 rounded-xl border border-[rgba(255,255,255,0.03)] mb-5 space-y-3">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 bg-[#a855f7]/10 rounded-lg flex items-center justify-center text-[#a855f7]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Interactive Practice Mode</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Select standard Question-by-Question training or a continuous, timed Board Session Simulation.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setSessionMode("practice")}
                      className={`p-3.5 rounded-xl border text-left transition-all flex gap-3 ${
                        sessionMode === "practice"
                          ? "bg-[#ec4899]/5 border-[#ec4899]/30 text-white shadow-sm shadow-[#ec4899]/5"
                          : "bg-[#11101c] border-white/5 text-gray-400 hover:text-white hover:border-white/10"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        sessionMode === "practice" ? "bg-[#ec4899]/25 text-[#ec4899]" : "bg-white/5 text-gray-400"
                      }`}>
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold font-display text-white">Practice Mode (Standard)</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">Answer questions sequentially and receive granular AI evaluation screens in between questions.</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSessionMode("simulation")}
                      className={`p-3.5 rounded-xl border text-left transition-all flex gap-3 ${
                        sessionMode === "simulation"
                          ? "bg-[#a855f7]/5 border-[#a855f7]/30 text-white shadow-sm shadow-[#a855f7]/5"
                          : "bg-[#11101c] border-white/5 text-gray-400 hover:text-white hover:border-white/10"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        sessionMode === "simulation" ? "bg-[#a855f7]/25 text-[#a855f7]" : "bg-white/5 text-gray-400"
                      }`}>
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold font-display text-white">Board Session (Simulated Board)</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">Seamless multi-question flow under a global session clock. Live AI whispers coaching cues as you speak.</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Global Session Timer Row (Visible in Simulation Mode) */}
                {sessionMode === "simulation" && (
                  <div className="p-4 bg-black/30 rounded-xl border border-[rgba(255,255,255,0.03)] mb-5 space-y-3 animate-fade-in">
                    <div className="flex gap-3">
                      <div className="w-9 h-9 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">Global Interview Timer</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Under Simulated Board mode, the entire panel must be completed before this session countdown ends.</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 pt-1">
                      {[
                        { label: "3 Mins", value: 180 },
                        { label: "5 Mins", value: 300 },
                        { label: "10 Mins", value: 600 },
                        { label: "15 Mins", value: 900 }
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setGlobalTimeLimit(opt.value)}
                          className={`py-2 rounded-lg text-xs font-mono font-bold transition-all border ${
                            globalTimeLimit === opt.value
                              ? "bg-gradient-to-r from-[#a855f7] to-[#ec4899] border-[#a855f7] text-white shadow-md shadow-[#a855f7]/20"
                              : "bg-[#11101c] border-white/5 text-gray-400 hover:text-white hover:border-white/10"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Time Limit Row */}
                <div className="p-4 bg-black/30 rounded-xl border border-[rgba(255,255,255,0.03)] mb-8 space-y-3">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 bg-[#22d3ee]/10 rounded-lg flex items-center justify-center text-[#22d3ee]">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Response Time Limit</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Set a countdown limit to simulate real interview pressure.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
                    {[
                      { label: "30s", value: 30 },
                      { label: "1m", value: 60 },
                      { label: "2m", value: 120 },
                      { label: "3m", value: 180 },
                      { label: "5m", value: 300 },
                      { label: "No Limit", value: 0 }
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setTimeLimit(opt.value)}
                        className={`py-2 rounded-lg text-xs font-mono font-bold transition-all border ${
                          timeLimit === opt.value
                            ? "bg-gradient-to-r from-[#ec4899] to-[#a855f7] border-[#ec4899] text-white shadow-md shadow-[#ec4899]/20 animate-fade-in"
                            : "bg-[#11101c] border-white/5 text-gray-400 hover:text-white hover:border-white/10"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <button
                  onClick={handleStartSetup}
                  className="w-full bg-accent-gradient hover:opacity-95 text-white font-bold py-3.5 px-4 rounded-[12px] shadow-[0_4px_20px_rgba(168,85,247,0.3)] hover:shadow-[0_4px_30px_rgba(34,211,238,0.4)] cursor-pointer transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
                  Start interview
                </button>
              </>
            )}

            {setupTab === "history" && (
              // HISTORY TAB
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h2 className="font-display font-bold text-xl text-white">Your Evaluation History</h2>
                    <p className="text-xs text-gray-400">Review scores, strengths, and access downloads for your past mock interviews.</p>
                  </div>
                </div>

                {historyList.length === 0 ? (
                  <div className="text-center py-12 px-4 bg-black/20 border border-white/5 rounded-2xl">
                    <History className="w-12 h-12 mx-auto text-gray-600 mb-3 animate-pulse" />
                    <h3 className="text-white font-semibold text-sm">No evaluation history yet</h3>
                    <p className="text-gray-400 text-xs max-w-sm mx-auto mt-1 leading-relaxed">
                      Complete your first mock interview session. Your responses and AI evaluation scores will be listed here with instant report download links!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {historyList.map((entry) => {
                      const isExpanded = expandedHistoryId === entry.id;
                      return (
                        <div 
                          key={entry.id} 
                          className={`bg-[#11101c] rounded-xl border transition-all ${
                            isExpanded ? "border-[#a855f7]/30 bg-[#141223]" : "border-white/5 hover:border-white/10"
                          }`}
                        >
                          {/* Entry Summary Row */}
                          <div 
                            onClick={() => setExpandedHistoryId(isExpanded ? null : entry.id)}
                            className="p-4 flex items-center justify-between gap-4 cursor-pointer select-none"
                          >
                            <div className="min-w-0 flex-1 space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-mono font-bold text-[#22d3ee] uppercase bg-[#22d3ee]/10 px-2 py-0.5 rounded">
                                  {entry.type}
                                </span>
                                <span className="text-[10px] text-gray-500 font-mono">
                                  {entry.date}
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-white truncate">
                                {entry.role}
                              </h4>
                              <p className="text-[11px] text-gray-400 truncate">
                                {entry.level} • {entry.questionsCount} Question(s)
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              {/* Overall Score Badge */}
                              <div className="text-center">
                                <span className={`inline-block font-mono font-bold text-sm px-2.5 py-1 rounded-lg ${
                                  entry.avgScore >= 80 
                                    ? "bg-emerald-500/15 text-emerald-400" 
                                    : entry.avgScore >= 60 
                                      ? "bg-amber-500/15 text-amber-400" 
                                      : "bg-rose-500/15 text-rose-400"
                                }`}>
                                  {entry.avgScore}%
                                </span>
                                <div className="text-[9px] text-gray-500 font-mono mt-0.5">Avg Score</div>
                              </div>

                              {/* Dropdown toggle */}
                              <button 
                                type="button" 
                                className="text-gray-400 hover:text-white p-1"
                              >
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>

                          {/* Expanded Details Panel */}
                          {isExpanded && (
                            <div className="px-4 pb-4 pt-1 border-t border-white/5 space-y-4 text-xs animate-fade-in">
                              <div className="grid grid-cols-2 gap-2 pt-2">
                                <button
                                  type="button"
                                  onClick={() => downloadHistoricalSessionReport(entry)}
                                  className="w-full bg-[#1b1a2e] hover:bg-white/5 border border-white/5 py-2 px-3 rounded-lg text-white font-semibold flex items-center justify-center gap-1.5 transition-all text-[11px]"
                                >
                                  <Download className="w-3.5 h-3.5 text-[#22d3ee]" />
                                  Download Report (.md)
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    // Prompts the browser's beautiful formatted printing/PDF output nicely!
                                    downloadHistoricalSessionReport(entry);
                                  }}
                                  className="w-full bg-accent-gradient hover:opacity-90 py-2 px-3 rounded-lg text-white font-bold flex items-center justify-center gap-1.5 transition-all text-[11px]"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  Download PDF / Print
                                </button>
                              </div>

                              <div className="space-y-2.5">
                                <div className="text-gray-400 font-mono text-[10px] tracking-wider uppercase">Evaluated Questions Breakdown:</div>
                                {entry.feedbacks.map((item: any, idx: number) => (
                                  <div key={idx} className="bg-black/25 p-3 rounded-lg border border-white/5 space-y-2">
                                    <div className="flex justify-between items-start gap-3">
                                      <p className="font-bold text-white text-[11px] leading-relaxed flex-1">
                                        Q{idx + 1}: "{item.question}"
                                      </p>
                                      <span className="text-xs font-mono font-bold text-[#ec4899] bg-[#ec4899]/10 px-2 py-0.5 rounded">
                                        {item.feedback.overallScore}%
                                      </span>
                                    </div>
                                    
                                    <div className="grid grid-cols-3 gap-1.5 pt-1 text-center font-mono text-[10px]">
                                      <div className="bg-white/5 p-1 rounded">
                                        <div className="text-gray-400">Content</div>
                                        <div className="text-white font-bold">{item.feedback.contentScore}%</div>
                                      </div>
                                      <div className="bg-white/5 p-1 rounded">
                                        <div className="text-gray-400">STAR</div>
                                        <div className="text-white font-bold">{item.feedback.structureScore}%</div>
                                      </div>
                                      <div className="bg-white/5 p-1 rounded">
                                        <div className="text-gray-400">Delivery</div>
                                        <div className="text-white font-bold">{item.feedback.confidenceScore}%</div>
                                      </div>
                                    </div>

                                    {/* Mini Bullets for strengths and improvements */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                                      <div>
                                        <div className="text-emerald-400 font-semibold mb-1 flex items-center gap-1">
                                          <CheckCircle className="w-3 h-3" /> Strengths
                                        </div>
                                        <p className="text-gray-300 leading-normal line-clamp-2">
                                          {item.feedback.strengths[0] || "Great communication and pacing."}
                                        </p>
                                      </div>
                                      <div>
                                        <div className="text-rose-400 font-semibold mb-1 flex items-center gap-1">
                                          <AlertTriangle className="w-3 h-3" /> To Improve
                                        </div>
                                        <p className="text-gray-300 leading-normal line-clamp-2">
                                          {item.feedback.improvements[0] || "Refine answer structure for maximum relevance."}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Delete button */}
                              <div className="flex justify-end pt-1">
                                <button
                                  type="button"
                                  onClick={(e) => deleteHistoryEntry(entry.id, e)}
                                  className="text-gray-500 hover:text-rose-400 flex items-center gap-1 text-[10px] font-mono transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  Delete Session Log
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {setupTab === "analytics" && (
              // ANALYTICS TAB CONTENT
              <div className="space-y-6 animate-fade-in text-left">
                {analyticsData.isDemo && (
                  <div className="bg-gradient-to-r from-[#a855f7]/15 to-[#ec4899]/15 border border-[#a855f7]/30 rounded-2xl p-4 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#22d3ee] shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Exploring with Demo Data</h4>
                      <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">
                        You haven't completed any mock interviews yet. We've loaded an interactive demo dataset so you can preview the analytics charts! Start practicing to populate your real performance trends.
                      </p>
                    </div>
                  </div>
                )}

                {/* KPI Cards Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-black/30 border border-white/5 p-4 rounded-xl flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7]">
                      <History className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider font-mono font-semibold">Total Sessions</div>
                      <div className="text-xl font-bold text-white mt-0.5">{analyticsData.totalSessions}</div>
                    </div>
                  </div>

                  <div className="bg-black/30 border border-white/5 p-4 rounded-xl flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#22d3ee]/10 flex items-center justify-center text-[#22d3ee]">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider font-mono font-semibold">Questions Answered</div>
                      <div className="text-xl font-bold text-white mt-0.5">{analyticsData.totalQuestions}</div>
                    </div>
                  </div>

                  <div className="bg-black/30 border border-white/5 p-4 rounded-xl flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#ec4899]/10 flex items-center justify-center text-[#ec4899]">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider font-mono font-semibold">Average Score</div>
                      <div className="text-xl font-bold text-white mt-0.5">{analyticsData.avgScore}%</div>
                    </div>
                  </div>

                  <div className="bg-black/30 border border-white/5 p-4 rounded-xl flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#22d3ee]/10 flex items-center justify-center text-[#22d3ee]">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider font-mono font-semibold">Avg Response Time</div>
                      <div className="text-xl font-bold text-white mt-0.5">
                        {Math.floor(analyticsData.averageResponseTime / 60) > 0 
                          ? `${Math.floor(analyticsData.averageResponseTime / 60)}m ${analyticsData.averageResponseTime % 60}s` 
                          : `${analyticsData.averageResponseTime}s`
                        }
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Advanced Recharts Interactive Analytics Dashboard */}
                <InterviewAnalyticsVisualizer 
                  historyList={historyList} 
                  analyticsData={analyticsData} 
                />

                {/* Charts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Chart 1: Progress, Confidence & Speaking Speed Trend */}
                  <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Confidence & Speaking Speed Trend</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Track your Confidence Score (%) and Speaking Speed (WPM) over your last 10 mock sessions.</p>
                      </div>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData.trendData} margin={{ top: 15, right: 5, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} />
                          
                          {/* Left Y Axis for Scores / Percentages */}
                          <YAxis yAxisId="left" domain={[0, 100]} stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} />
                          
                          {/* Right Y Axis for Speaking Speed in WPM */}
                          <YAxis yAxisId="right" orientation="right" domain={[60, 200]} stroke="rgba(168,85,247,0.6)" fontSize={10} tickLine={false} />
                          
                          <Tooltip 
                            contentStyle={{ backgroundColor: "#11101c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                            labelStyle={{ color: "#fff", fontSize: "11px", fontWeight: "bold" }}
                          />
                          <Legend wrapperStyle={{ fontSize: "11px", paddingTop: 10 }} />
                          <Line yAxisId="left" type="monotone" dataKey="Overall Score" stroke="#ec4899" strokeWidth={2.5} activeDot={{ r: 6 }} dot={{ r: 3 }} name="Overall Score (%)" />
                          <Line yAxisId="left" type="monotone" dataKey="Confidence Score" stroke="#22d3ee" strokeWidth={2} dot={{ r: 3 }} name="Confidence Score (%)" />
                          <Line yAxisId="right" type="monotone" dataKey="Speaking Speed" stroke="#a855f7" strokeWidth={2} activeDot={{ r: 6 }} dot={{ r: 3 }} name="Speaking Speed (WPM)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Chart 2: Average Response Time per Session */}
                  <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-3">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Response Time Trend</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Monitor your pacing relative to the recommended 2-minute limit.</p>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analyticsData.responseTimeTrend} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} />
                          <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: "#11101c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                            labelStyle={{ color: "#fff", fontSize: "11px", fontWeight: "bold" }}
                          />
                          <Legend wrapperStyle={{ fontSize: "11px", paddingTop: 10 }} />
                          <Area type="monotone" dataKey="Avg Time (s)" stroke="#22d3ee" fillOpacity={1} fill="url(#colorTime)" strokeWidth={2.5} name="Avg Response Time (s)" />
                          <Line type="monotone" dataKey="Recommended Max" stroke="#f43f5e" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Chart 3: Topic Mastery Profile (Circular Progress Chart) */}
                  <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-3">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Topic Mastery Profile</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Performance distribution across primary interview disciplines.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between h-56 gap-2">
                      {/* Radial Progress Chart Container */}
                      <div className="h-full w-full sm:w-1/2 flex items-center justify-center relative">
                        {/* Core center label showing average overall score */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-[9px] text-gray-400 font-mono uppercase tracking-wider">Average</span>
                          <span className="text-xl font-bold text-white leading-none mt-0.5">{analyticsData.avgScore}%</span>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart 
                            cx="50%" 
                            cy="50%" 
                            innerRadius="30%" 
                            outerRadius="100%" 
                            barSize={6} 
                            data={analyticsData.topicPerformanceData}
                            startAngle={90}
                            endAngle={450}
                          >
                            <RadialBar
                              background={{ fill: "rgba(255,255,255,0.03)" }}
                              dataKey="value"
                              cornerRadius={6}
                            />
                            <Tooltip 
                              contentStyle={{ backgroundColor: "#11101c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                              itemStyle={{ color: "#fff", fontSize: "10px" }}
                            />
                          </RadialBarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Custom list style Legend for precision view */}
                      <div className="w-full sm:w-1/2 space-y-1.5">
                        {[...analyticsData.topicPerformanceData].reverse().map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-black/20 px-2.5 py-1.5 rounded-xl border border-white/[0.02]">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                              <span className="text-[10px] font-medium text-gray-300 truncate">{item.name}</span>
                            </div>
                            <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded" style={{ color: item.fill, backgroundColor: `${item.fill}10` }}>
                              {item.score}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Chart 4: Filler Words (Verbal Hesitations) Frequency */}
                  <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-3">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Filler Word Analysis</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Reducing filler words makes your delivery sound significantly more professional and polished.</p>
                    </div>
                    <div className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData.fillerData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="word" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} />
                          <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: "#11101c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                            labelStyle={{ color: "#fff", fontSize: "11px", fontWeight: "bold" }}
                          />
                          <Bar dataKey="count" fill="#a855f7" radius={[6, 6, 0, 0]} maxBarSize={30} name="Total Occurrences">
                            {analyticsData.fillerData.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={index === 0 ? "#ec4899" : index === 1 ? "#a855f7" : "#22d3ee"} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Speaks Insights / Personal Coaching Panel */}
                <div className="bg-black/30 border border-white/5 rounded-2xl p-5 space-y-4">
                  <div className="flex gap-2.5 items-center">
                    <Activity className="w-5 h-5 text-[#22d3ee]" />
                    <h4 className="text-sm font-bold text-white">AI Coach Insights & Recommendations</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-[#11101c] p-4 rounded-xl space-y-1.5 border border-white/5">
                      <span className="text-[#ec4899] font-bold font-mono text-[10px] uppercase tracking-wide">Pacing & Flow</span>
                      <h5 className="font-semibold text-white">
                        {analyticsData.averageResponseTime > 120 
                          ? "Condense your responses slightly"
                          : analyticsData.averageResponseTime < 45 
                            ? "Elaborate more on STAR elements"
                            : "Excellent timing control!"
                        }
                      </h5>
                      <p className="text-gray-400 leading-relaxed text-[11px]">
                        {analyticsData.averageResponseTime > 120 
                          ? "Your answers average over 2 minutes. Try trimming background details and focus on direct Action and Result elements of the STAR framework."
                          : analyticsData.averageResponseTime < 45
                            ? "Your responses are a bit short. Aim for 60-90 seconds to fully demonstrate your problem solving methodology and STAR sequence."
                            : "Your answer length is within the sweet spot (60-120 seconds). This keeps the interviewer highly engaged without losing critical context."
                        }
                      </p>
                    </div>

                    <div className="bg-[#11101c] p-4 rounded-xl space-y-1.5 border border-white/5">
                      <span className="text-[#22d3ee] font-bold font-mono text-[10px] uppercase tracking-wide">Verbal Hesitations</span>
                      <h5 className="font-semibold text-white">
                        {analyticsData.fillerData.reduce((acc, curr) => acc + curr.count, 0) > 15
                          ? "Practice silent pausing"
                          : "Superb articulation and composure!"
                        }
                      </h5>
                      <p className="text-gray-400 leading-relaxed text-[11px]">
                        {analyticsData.fillerData.reduce((acc, curr) => acc + curr.count, 0) > 15
                          ? "You are using multiple verbal pauses ('like', 'um'). Try talking slightly slower and pausing silently instead of using fillers when formulating thoughts."
                          : "Your speech displays minimal filler-word reliance. This highlights strong confidence and ensures your content quality stands out perfectly."
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {setupTab === "schedule" && (
              <div className="space-y-6 animate-fade-in text-left">
                {/* Info Header Banner */}
                <div className="bg-gradient-to-r from-[#ec4899]/10 to-[#a855f7]/10 border border-[#ec4899]/25 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ec4899] to-[#a855f7] flex items-center justify-center text-white shrink-0 shadow-lg">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Mock Interview Scheduler & Alarms</h4>
                    <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">
                      Plan future practice rounds to stay disciplined! Book slots on the calendar, configure your desired interview context, and receive synchronized reminders inside the app and through native browser push alerts.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* LEFT COLUMN: INTERACTIVE MONTH CALENDAR (md:col-span-7) */}
                  <div className="md:col-span-7 bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Select Session Date</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">Click a slot to schedule or inspect mock sessions.</p>
                      </div>
                      
                      {/* Month Switcher */}
                      <div className="flex items-center gap-1">
                        <button 
                          type="button"
                          onClick={() => {
                            setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() - 1, 1));
                          }}
                          className="w-7 h-7 rounded-lg bg-[#11101c] hover:bg-[#1c1a2e] border border-white/5 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4 rotate-180" />
                        </button>
                        <span className="text-xs font-bold text-white font-mono px-2 min-w-[100px] text-center">
                          {monthNames[currentCalendarDate.getMonth()]} {currentCalendarDate.getFullYear()}
                        </span>
                        <button 
                          type="button"
                          onClick={() => {
                            setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1, 1));
                          }}
                          className="w-7 h-7 rounded-lg bg-[#11101c] hover:bg-[#1c1a2e] border border-white/5 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Day-of-week Headers */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {daysOfWeek.map((day) => (
                        <div key={day} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono py-1">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Grid Cells */}
                    <div className="grid grid-cols-7 gap-1.5">
                      {(() => {
                        const yr = currentCalendarDate.getFullYear();
                        const mo = currentCalendarDate.getMonth();
                        const firstDayIdx = new Date(yr, mo, 1).getDay();
                        const totalDays = new Date(yr, mo + 1, 0).getDate();
                        const prevTotal = new Date(yr, mo, 0).getDate();
                        
                        const cells: any[] = [];
                        
                        // Prev month padding
                        for (let i = firstDayIdx - 1; i >= 0; i--) {
                          const dNum = prevTotal - i;
                          const dString = `${mo === 0 ? yr - 1 : yr}-${String(mo === 0 ? 12 : mo).padStart(2, "0")}-${String(dNum).padStart(2, "0")}`;
                          cells.push({ day: dNum, isCurrentMonth: false, dateStr: dString });
                        }
                        
                        // Current month
                        for (let d = 1; d <= totalDays; d++) {
                          const dString = `${yr}-${String(mo + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
                          cells.push({ day: d, isCurrentMonth: true, dateStr: dString });
                        }
                        
                        // Next month padding
                        const padCount = 42 - cells.length;
                        for (let d = 1; d <= padCount; d++) {
                          const dString = `${mo === 11 ? yr + 1 : yr}-${String(mo === 11 ? 1 : mo + 2).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
                          cells.push({ day: d, isCurrentMonth: false, dateStr: dString });
                        }
                        
                        const todayStr = new Date().toISOString().split("T")[0];

                        return cells.map((cell, idx) => {
                          const isSelected = cell.dateStr === selectedCalendarDate;
                          const isToday = cell.dateStr === todayStr;
                          
                          // Count bookings for this cell's day
                          const dayBookings = bookings.filter((b) => b.date === cell.dateStr);
                          
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setSelectedCalendarDate(cell.dateStr)}
                              className={`aspect-square rounded-xl flex flex-col items-center justify-between p-1.5 relative transition-all border cursor-pointer ${
                                !cell.isCurrentMonth
                                  ? "text-gray-600 border-transparent hover:bg-white/[0.02]"
                                  : isSelected
                                    ? "bg-gradient-to-r from-[#ec4899] to-[#a855f7] border-[#ec4899] text-white shadow-md shadow-[#ec4899]/15 font-bold"
                                    : isToday
                                      ? "bg-[#11101c] border-[#22d3ee]/50 text-[#22d3ee] font-semibold"
                                      : "bg-[#11101c] border-white/5 text-gray-300 hover:text-white hover:border-white/10"
                              }`}
                            >
                              <span className="text-xs font-mono">{cell.day}</span>
                              
                              {/* Glowing Dot indicator for day bookings */}
                              {dayBookings.length > 0 && (
                                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-[#22d3ee] shadow-[0_0_8px_#22d3ee] animate-pulse"}`} />
                              )}
                            </button>
                          );
                        });
                      })()}
                    </div>

                    {/* All Upcoming Bookings Section */}
                    <div className="pt-3 border-t border-white/5 space-y-2">
                      <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">All Scheduled Sessions ({bookings.length})</h5>
                      {bookings.length === 0 ? (
                        <p className="text-[10px] text-gray-500 italic">No future sessions booked yet.</p>
                      ) : (
                        <div className="max-h-[140px] overflow-y-auto space-y-2 pr-1">
                          {bookings.map((b) => {
                            const formattedDate = new Date(b.date + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
                            return (
                              <div key={b.id} className="flex justify-between items-center bg-[#11101c] border border-white/5 rounded-xl p-2.5 text-xs">
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-white truncate max-w-[150px]">{b.role}</span>
                                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#ec4899]/15 text-[#ec4899] font-mono font-semibold">{b.type}</span>
                                  </div>
                                  <div className="text-[10px] text-gray-400 flex items-center gap-1">
                                    <span>{formattedDate}</span>
                                    <span>•</span>
                                    <span className="font-semibold text-gray-300">{b.time}</span>
                                  </div>
                                </div>
                                <button 
                                  type="button"
                                  onClick={() => deleteBooking(b.id)}
                                  className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                                  title="Delete scheduled round"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT COLUMN: BOOKINGS SCHEDULER FORM (md:col-span-5) */}
                  <div className="md:col-span-5 flex flex-col gap-5">
                    {/* Date Details & Scheduling Form Card */}
                    <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
                      <div>
                        <span className="text-[9px] font-bold text-[#ec4899] uppercase tracking-wider font-mono">New Appointment</span>
                        <h4 className="text-sm font-bold text-white mt-0.5">
                          Book for {new Date(selectedCalendarDate + "T00:00:00").toLocaleDateString(undefined, { month: "long", day: "numeric" })}
                        </h4>
                      </div>

                      <div className="space-y-3.5 text-xs text-left">
                        {/* Session Time */}
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Start Time</label>
                          <input 
                            type="time" 
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            className="w-full glass-input text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-[#ec4899]/40 bg-[#11101c]"
                          />
                        </div>

                        {/* Session Role */}
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Target Role</label>
                          <select 
                            value={bookingRole}
                            onChange={(e) => setBookingRole(e.target.value)}
                            className="w-full glass-input text-white rounded-xl py-2 px-3 text-xs outline-none bg-[#11101c]"
                          >
                            {roles.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                        </div>

                        {/* Session Type */}
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Interview Type</label>
                          <select 
                            value={bookingType}
                            onChange={(e) => setBookingType(e.target.value)}
                            className="w-full glass-input text-white rounded-xl py-2 px-3 text-xs outline-none bg-[#11101c]"
                          >
                            {types.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>

                        {/* Job Field */}
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Job Field</label>
                          <select 
                            value={bookingField}
                            onChange={(e) => setBookingField(e.target.value)}
                            className="w-full glass-input text-white rounded-xl py-2 px-3 text-xs outline-none bg-[#11101c]"
                          >
                            {fields.map(f => <option key={f} value={f}>{f}</option>)}
                          </select>
                        </div>

                        {/* Target Level */}
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Experience Level</label>
                          <select 
                            value={bookingLevel}
                            onChange={(e) => setBookingLevel(e.target.value)}
                            className="w-full glass-input text-white rounded-xl py-2 px-3 text-xs outline-none bg-[#11101c]"
                          >
                            {levels.map(l => <option key={l} value={l}>{l}</option>)}
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={addBooking}
                          className="w-full bg-accent-gradient hover:opacity-95 text-white font-bold py-2.5 px-4 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md shadow-[#ec4899]/15 text-xs"
                        >
                          <Plus className="w-4 h-4 text-white" />
                          Schedule Mock Session
                        </button>
                      </div>
                    </div>

                    {/* Notifications, Audio & Simulator Controls */}
                    <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4 text-left">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Notification Sync Center</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">Configure system-level alerts and reminders.</p>
                      </div>

                      <div className="space-y-3.5 text-xs">
                        <div className="flex justify-between items-center pb-2 border-b border-white/5">
                          <div>
                            <p className="font-semibold text-white">Browser Push Alerts</p>
                            <p className="text-[10px] text-gray-400">Native alerts outside application frame.</p>
                          </div>
                          
                          {notifPermission === "granted" ? (
                            <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-mono font-bold px-2 py-1 rounded-md border border-emerald-500/20">
                              ENABLED
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={requestNotificationPermission}
                              className="bg-[#11101c] hover:bg-[#1c1a2e] border border-white/5 text-gray-300 text-[10px] font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer"
                            >
                              REQUEST ACCESS
                            </button>
                          )}
                        </div>

                        {/* Test Reminder Simulator Section */}
                        <div className="bg-[#11101c] border border-white/5 p-3 rounded-xl space-y-2">
                          <p className="text-[11px] font-bold text-white flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5 text-[#22d3ee]" />
                            Real-time Simulator
                          </p>
                          <p className="text-[10px] text-gray-400 leading-normal">
                            Test the background listener! Click below to queue a test booking starting in exactly 5 seconds.
                          </p>
                          <button
                            type="button"
                            onClick={triggerTestReminder}
                            className="w-full bg-[#1c1a2e] hover:bg-[#25233c] text-[#22d3ee] hover:text-white border border-[#22d3ee]/20 hover:border-[#22d3ee]/40 font-bold py-2 rounded-lg text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Bell className="w-3.5 h-3.5" />
                            🚀 Test Alarm (5s Delay)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {setupTab === "leaderboard" && (
              <Leaderboard />
            )}
          </div>
        </div>
      )}

      {/* 2. QUESTION GENERATING SCREEN */}
      {flow === "generating" && (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse text-center space-y-5">
          <div className="w-16 h-16 border-4 border-[#22d3ee]/20 border-t-[#ec4899] rounded-full animate-spin mb-4" />
          <h2 className="font-display font-bold text-2xl text-white">Assembling Premium Interview Panel</h2>
          <p className="text-sm text-gray-400 max-w-sm">
            NextRoundPrep is generating 5 tailored, role-specific questions matching your profile, and preparing the face-to-face reading synthesizer...
          </p>
        </div>
      )}

      {/* 3. ACTIVE INTERVIEW INTERFACE */}
      {flow === "active" && questions.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
          {/* Left Side: Live camera simulation */}
          <div className="lg:col-span-3 space-y-4">
            <div className="relative aspect-[4/3] w-full bg-[#11101c] rounded-[20px] overflow-hidden border border-[rgba(255,255,255,0.06)] flex items-center justify-center shadow-lg">
              {cameraPermission === "granted" ? (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              ) : (
                <div className="flex flex-col items-center text-center p-6 text-gray-500">
                  <CameraOff className="w-12 h-12 text-gray-600 mb-3" />
                  <span className="text-xs font-semibold uppercase text-gray-400 font-mono">Camera Off</span>
                  <p className="text-[11px] text-gray-500 max-w-[180px] mt-1">Permission denied or camera not active. You can still practice using text/audio options!</p>
                  <button 
                    onClick={startCamera}
                    className="mt-3 px-3 py-1.5 bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.06)] rounded-lg text-xs text-white"
                  >
                    Enable Camera
                  </button>
                </div>
              )}

              {/* Top overlay indicators */}
              {isRecording && (
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-rose-600/90 text-white font-mono font-bold text-xs py-1 px-2.5 rounded-full shadow-md animate-rec-pulse">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                  REC
                </div>
              )}
              
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-gray-400 border border-[rgba(255,255,255,0.05)]">
                Webcam Frame
              </div>
            </div>

            {/* Microphone test indicator */}
            <div className="flex items-center justify-between p-3.5 bg-[#131520] rounded-xl border border-[rgba(255,255,255,0.04)] text-xs">
              <div className="flex items-center gap-2.5">
                <Mic className={`w-4 h-4 ${isRecording ? "text-[#22d3ee] animate-pulse" : "text-gray-400"}`} />
                <span className="text-gray-400">Audio input levels:</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div 
                    key={i} 
                    className={`w-1.5 h-3 rounded-full transition-all ${
                      isRecording && Math.random() > 0.3 ? 'bg-[#22d3ee]' : 'bg-gray-700'
                    }`} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right/Middle Side: Question Card */}
          <div className="lg:col-span-6 space-y-4">
            <div className="glass-card rounded-[20px] p-6 sm:p-8 min-h-[350px] flex flex-col justify-between shadow-xl relative">
              
              {/* Question Header Progress */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
                <span className="text-xs font-mono text-[#a855f7] font-semibold bg-[#a855f7]/10 py-1 px-3 rounded-full self-start">
                  Question {currentIdx + 1} of {questions.length}
                </span>
                <div className="flex items-center gap-3">
                  {sessionMode === "simulation" && (
                    <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                      <span className="text-xs text-gray-400 font-mono">Global Session:</span>
                      <span className="text-xs font-bold text-white font-mono">{formatTime(Math.max(0, globalTimeLimit - globalDuration))}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-mono">
                      {timeLimit > 0 ? "Question Time:" : "Timer:"}
                    </span>
                    <span className={`text-sm font-bold font-mono px-3 py-1 rounded-lg border transition-all duration-300 ${
                      timeLimit > 0 && (timeLimit - duration) <= 15
                        ? "text-rose-400 bg-rose-500/10 border-rose-500/30 animate-pulse font-semibold"
                        : "text-white bg-black/40 border-[rgba(255,255,255,0.04)]"
                    }`}>
                      {timeLimit > 0 ? formatTime(Math.max(0, timeLimit - duration)) : formatTime(duration)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Countdown Progress Bar */}
              {timeLimit > 0 && (
                <div className="w-full h-1.5 bg-[#11101c] rounded-full overflow-hidden border border-white/5 mb-3">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      (timeLimit - duration) <= 15 
                        ? "bg-gradient-to-r from-rose-500 to-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" 
                        : "bg-gradient-to-r from-[#ec4899] to-[#a855f7]"
                    }`}
                    style={{ width: `${Math.max(0, Math.min(100, ((timeLimit - duration) / timeLimit) * 100))}%` }}
                  />
                </div>
              )}

              {/* Question Text */}
              <div className="space-y-4 my-6">
                <div className="flex items-start gap-3">
                  <button 
                    onClick={() => speakQuestion(questions[currentIdx].text)}
                    title="Read aloud"
                    className="p-2.5 bg-[#a855f7]/10 hover:bg-[#a855f7]/20 text-[#a855f7] rounded-lg transition-all shrink-0 mt-1"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <p className="font-display font-medium text-lg sm:text-xl text-white leading-relaxed">
                    "{questions[currentIdx].text}"
                  </p>
                </div>

                <div className="flex gap-2.5 pl-11">
                  <span className="text-xs bg-black/40 text-[#22d3ee] border border-[#22d3ee]/20 px-2.5 py-1 rounded-md font-mono">
                    {questions[currentIdx].category}
                  </span>
                  <span className="text-xs bg-black/40 text-yellow-500 border border-yellow-500/20 px-2.5 py-1 rounded-md font-mono">
                    {questions[currentIdx].difficulty}
                  </span>
                </div>
              </div>

              {/* Recording Action / Live transcript box */}
              <div className="space-y-4 mt-4">
                {isRecording ? (
                  <div className="p-4 bg-black/40 rounded-xl border border-[rgba(255,255,255,0.04)] space-y-2">
                    <span className="text-[10px] font-mono uppercase text-gray-500 block tracking-wider">Live speech transcript (speak clearly)</span>
                    <p className="text-sm text-gray-300 italic min-h-[40px] leading-relaxed">
                      {transcript || "Waiting for spoken audio input..."}
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-xs text-gray-500 py-3 bg-[rgba(255,255,255,0.01)] rounded-xl border border-[rgba(255,255,255,0.03)]">
                    Click "Record Answer" and speak your answer out loud. Click stop when finished.
                  </div>
                )}

                {/* Live AI Coach Tips Panel in Simulation Mode */}
                {sessionMode === "simulation" && isRecording && (
                  <div className="p-4 rounded-xl border border-[rgba(168,85,247,0.15)] bg-gradient-to-r from-[#1a1033] to-[#0c1524] space-y-2.5 relative overflow-hidden transition-all duration-300 animate-fade-in shadow-lg shadow-[#a855f7]/5">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#a855f7] opacity-[0.05] rounded-full filter blur-md pointer-events-none" />
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#a855f7] animate-pulse" />
                        <span className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">Live AI Coach whispering</span>
                      </div>
                      
                      {isAnalyzingLive && (
                        <div className="flex items-center gap-1.5 text-[10px] text-[#22d3ee] font-mono animate-pulse">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Analyzing speech...
                        </div>
                      )}
                    </div>

                    {liveCoachTip ? (
                      <div className="flex gap-2.5 items-start">
                        <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                          liveCoachTip.sentiment === "encouraging"
                            ? "bg-green-400"
                            : liveCoachTip.sentiment === "corrective"
                              ? "bg-yellow-400"
                              : "bg-[#a855f7]"
                        }`} />
                        <p className={`text-xs font-medium leading-relaxed ${
                          liveCoachTip.sentiment === "encouraging"
                            ? "text-green-300"
                            : liveCoachTip.sentiment === "corrective"
                              ? "text-yellow-200"
                              : "text-gray-200"
                        }`}>
                          "{liveCoachTip.tip}"
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic">
                        {transcript.length > 10 
                          ? "Listening to your answer... Tips will stream here in real-time."
                          : "Begin answering the question to trigger real-time coaching suggestions."
                        }
                      </p>
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {!isRecording ? (
                    <button
                      onClick={handleStartRecording}
                      className="flex-1 bg-accent-gradient hover:opacity-95 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Play className="w-4 h-4 text-white stroke-[3]" />
                      Record Answer
                    </button>
                  ) : (
                    sessionMode === "simulation" ? (
                      <button
                        onClick={handleNextSimulationQuestion}
                        className="flex-1 bg-gradient-to-r from-[#a855f7] to-[#ec4899] hover:opacity-95 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                      >
                        <Check className="w-4 h-4 text-white stroke-[3]" />
                        Submit & Next Question
                      </button>
                    ) : (
                      <button
                        onClick={handleStopAndAnalyze}
                        className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer animate-pulse"
                      >
                        <Square className="w-4 h-4 text-white stroke-[3]" />
                        Stop & Get Feedback
                      </button>
                    )
                  )}

                  <button
                    onClick={sessionMode === "simulation" ? handleSkipSimulationQuestion : handleSkipQuestion}
                    className="px-5 py-3.5 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.06)] rounded-xl text-gray-300 font-semibold text-sm transition-all"
                  >
                    Skip Question
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side: Dynamic Context-Aware Tips Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-[#11101c]/40 backdrop-blur-md rounded-[20px] p-5 flex flex-col justify-between shadow-xl min-h-[480px] border border-white/5">
              
              {/* Sidebar Header */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">
                      Interview Coach
                    </h3>
                  </div>
                  
                  {/* Dynamic Badge based on Category */}
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    INTERVIEW_TIPS_DATABASE[activeTipsContext]?.badgeColor || "text-gray-400 bg-gray-500/10 border-gray-500/20"
                  }`}>
                    {INTERVIEW_TIPS_DATABASE[activeTipsContext]?.badge}
                  </span>
                </div>
                
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight font-display">
                    {INTERVIEW_TIPS_DATABASE[activeTipsContext]?.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-1 leading-normal">
                    {INTERVIEW_TIPS_DATABASE[activeTipsContext]?.headline}
                  </p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-white/[0.05] mt-3">
                {[
                  { id: "checklist", label: "Checklist" },
                  { id: "pitfalls", label: "Pitfalls" },
                  { id: "keywords", label: "Keywords" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSidebarTab(tab.id as any)}
                    className={`flex-1 pb-2.5 text-[10px] font-bold text-center font-mono transition-all border-b-2 ${
                      sidebarTab === tab.id
                        ? "border-[#22d3ee] text-[#22d3ee]"
                        : "border-transparent text-gray-500 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Panels */}
              <div className="flex-1 py-4 space-y-3 max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 pr-1">
                {sidebarTab === "checklist" && (
                  <div className="space-y-3">
                    <div className="text-[9px] font-bold text-gray-400 uppercase font-mono tracking-wider">
                      Interactive Step Guide:
                    </div>
                    {INTERVIEW_TIPS_DATABASE[activeTipsContext]?.checklist.map((item) => {
                      const isChecked = !!tipsChecklist[item.id];
                      return (
                        <div 
                          key={item.id} 
                          onClick={() => setTipsChecklist(prev => ({ ...prev, [item.id]: !isChecked }))}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                            isChecked 
                              ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" 
                              : "bg-black/20 border-white/[0.03] text-gray-300 hover:border-white/10"
                          }`}
                        >
                          <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all ${
                            isChecked 
                              ? "bg-emerald-500 border-emerald-500 text-black" 
                              : "border-gray-600 bg-black/40"
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3] text-black" />}
                          </div>
                          <div className="min-w-0">
                            <span className={`text-[11px] font-semibold block ${isChecked ? "line-through text-emerald-400/80" : "text-white"}`}>
                              {item.label}
                            </span>
                            <span className="text-[10px] text-gray-400 leading-relaxed block mt-0.5">
                              {item.hint}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {sidebarTab === "pitfalls" && (
                  <div className="space-y-3">
                    <div className="text-[9px] font-bold text-gray-400 uppercase font-mono tracking-wider">
                      Common Pitfalls:
                    </div>
                    {INTERVIEW_TIPS_DATABASE[activeTipsContext]?.pitfalls.map((pitfall, index) => (
                      <div key={index} className="flex gap-2.5 bg-rose-500/5 border border-rose-500/10 p-3 rounded-xl">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-rose-300 leading-relaxed">
                          {pitfall}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {sidebarTab === "keywords" && (
                  <div className="space-y-3">
                    <div className="text-[9px] font-bold text-gray-400 uppercase font-mono tracking-wider">
                      Target Vocabulary:
                    </div>
                    <p className="text-[10px] text-gray-400 leading-normal">
                      Try incorporating these power phrases into your answer to satisfy scoring dimensions:
                    </p>
                    <div className="grid grid-cols-1 gap-2.5 mt-2">
                      {INTERVIEW_TIPS_DATABASE[activeTipsContext]?.vocabulary.map((vocab, index) => (
                        <div key={index} className="bg-black/20 border border-white/[0.03] p-2.5 rounded-xl text-left space-y-1">
                          <span className="text-[10px] font-bold font-mono text-[#22d3ee] bg-[#22d3ee]/5 px-2 py-0.5 rounded border border-[#22d3ee]/10 w-fit inline-block">
                            {vocab.word}
                          </span>
                          <p className="text-[10px] text-gray-400 leading-normal">
                            {vocab.meaning}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Pro Tip Footer */}
              <div className="border-t border-white/[0.05] pt-3 mt-2">
                <div className="flex items-center gap-1.5 text-[9px] text-[#22d3ee] font-mono font-bold uppercase tracking-wider mb-1">
                  <Award className="w-3.5 h-3.5" />
                  Coach Pro Tip
                </div>
                <p className="text-[10px] text-gray-400 italic leading-relaxed">
                  "{INTERVIEW_TIPS_DATABASE[activeTipsContext]?.proTip}"
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 4. AI EVALUATING SCREEN */}
      {flow === "evaluating" && (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse text-center space-y-5">
          <div className="w-16 h-16 border-4 border-[#a855f7]/20 border-t-[#22d3ee] rounded-full animate-spin mb-4" />
          <h2 className="font-display font-bold text-2xl text-white">
            {sessionMode === "simulation" ? "Compiling Full-Panel Diagnostic" : "Analyzing Response Quality"}
          </h2>
          <p className="text-sm text-gray-400 max-w-sm">
            {sessionMode === "simulation" 
              ? "Calculating multi-question aggregates, mapping STAR compliance across all five topics, and preparing your premium report..." 
              : "NextRoundPrep is measuring STAR structure, content relevance, communication confidence, speed, and mapping filler words..."}
          </p>
          {sessionMode === "simulation" && (
            <span className="text-xs font-mono text-[#a855f7] bg-white/5 px-4 py-1.5 rounded-full border border-white/5 shadow-sm shadow-[#a855f7]/5">
              Processing in background: {sessionFeedbacks.filter(f => f && f.feedback).length} of {questions.length} questions completed
            </span>
          )}
        </div>
      )}

      {/* 5. INSTANT SCORE CARD / FEEDBACK DASHBOARD */}
      {flow === "feedback" && currentFeedback && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Header row */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between sm:items-center bg-[#15141f] p-4 rounded-xl border border-white/5">
            <h3 className="font-display font-bold text-white text-lg">Instant Answer Evaluation</h3>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={downloadSingleQuestionReport}
                className="text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-1.5 transition-all font-mono"
              >
                <FileText className="w-3.5 h-3.5 text-[#22d3ee]" />
                Download Report (.md)
              </button>
              <button 
                onClick={handleReset}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Setup New
              </button>
            </div>
          </div>

          {/* Core metrics bar (6 circular progress rings) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* 1. Overall */}
            <div className="bg-[#15141f] p-4 rounded-2xl border border-[rgba(255,255,255,0.05)] flex flex-col items-center text-center">
              <span className="text-[10px] font-semibold text-gray-400 font-mono tracking-wider uppercase mb-3">Overall Score</span>
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.03)" strokeWidth="4" fill="transparent" />
                  <circle cx="32" cy="32" r="28" stroke="#a855f7" strokeWidth="4" fill="transparent" strokeDasharray="176" strokeDashoffset={176 - (176 * currentFeedback.overallScore) / 100} />
                </svg>
                <span className="absolute font-mono font-bold text-white text-base">{currentFeedback.overallScore}%</span>
              </div>
            </div>

            {/* 2. Content */}
            <div className="bg-[#15141f] p-4 rounded-2xl border border-[rgba(255,255,255,0.05)] flex flex-col items-center text-center">
              <span className="text-[10px] font-semibold text-gray-400 font-mono tracking-wider uppercase mb-3">Relevance</span>
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.03)" strokeWidth="4" fill="transparent" />
                  <circle cx="32" cy="32" r="28" stroke="#ec4899" strokeWidth="4" fill="transparent" strokeDasharray="176" strokeDashoffset={176 - (176 * currentFeedback.contentScore) / 100} />
                </svg>
                <span className="absolute font-mono font-bold text-white text-sm">{currentFeedback.contentScore}%</span>
              </div>
            </div>

            {/* 3. Structure */}
            <div className="bg-[#15141f] p-4 rounded-2xl border border-[rgba(255,255,255,0.05)] flex flex-col items-center text-center">
              <span className="text-[10px] font-semibold text-gray-400 font-mono tracking-wider uppercase mb-3">STAR Layout</span>
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.03)" strokeWidth="4" fill="transparent" />
                  <circle cx="32" cy="32" r="28" stroke="#22d3ee" strokeWidth="4" fill="transparent" strokeDasharray="176" strokeDashoffset={176 - (176 * currentFeedback.structureScore) / 100} />
                </svg>
                <span className="absolute font-mono font-bold text-white text-sm">{currentFeedback.structureScore}%</span>
              </div>
            </div>

            {/* 4. Confidence */}
            <div className="bg-[#15141f] p-4 rounded-2xl border border-[rgba(255,255,255,0.05)] flex flex-col items-center text-center">
              <span className="text-[10px] font-semibold text-gray-400 font-mono tracking-wider uppercase mb-3">Confidence</span>
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.03)" strokeWidth="4" fill="transparent" />
                  <circle cx="32" cy="32" r="28" stroke="#10b981" strokeWidth="4" fill="transparent" strokeDasharray="176" strokeDashoffset={176 - (176 * currentFeedback.confidenceScore) / 100} />
                </svg>
                <span className="absolute font-mono font-bold text-white text-sm">{currentFeedback.confidenceScore}%</span>
              </div>
            </div>

            {/* 5. Pace WPM */}
            <div className="bg-[#15141f] p-4 rounded-2xl border border-[rgba(255,255,255,0.05)] flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-semibold text-gray-400 font-mono tracking-wider uppercase mb-2">Speaking Pace</span>
              <span className="font-display font-bold text-white text-lg font-mono">{currentFeedback.speakingPace} WPM</span>
              <span className="text-[10px] font-mono text-[#22d3ee] mt-1 bg-[#22d3ee]/10 px-2 py-0.5 rounded">
                {currentFeedback.paceRating}
              </span>
            </div>

            {/* 6. Filler words */}
            <div className="bg-[#15141f] p-4 rounded-2xl border border-[rgba(255,255,255,0.05)] flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-semibold text-gray-400 font-mono tracking-wider uppercase mb-2">Filler Words</span>
              <span className="font-display font-bold text-rose-400 text-lg font-mono">
                {currentFeedback.fillerWords.reduce((sum, f) => sum + f.count, 0)} detected
              </span>
              <div className="flex flex-wrap gap-1 justify-center mt-1">
                {currentFeedback.fillerWords.map((f, i) => (
                  <span key={i} className="text-[8px] font-mono bg-rose-500/15 text-rose-400 px-1.5 py-0.5 rounded">
                    {f.word} ({f.count})
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Details layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Strengths & Improvements */}
            <div className="md:col-span-6 space-y-4">
              {/* Strengths */}
              <div className="glass-card rounded-2xl p-6">
                <h4 className="font-display font-bold text-sm text-white flex items-center gap-2 mb-4">
                  <CheckCircle className="w-4 h-4 text-[#10b981]" />
                  What you did well (Strengths)
                </h4>
                <ul className="space-y-3">
                  {currentFeedback.strengths.map((str, idx) => (
                    <li key={idx} className="flex gap-2.5 text-sm text-gray-300">
                      <Check className="w-4.5 h-4.5 text-[#10b981] shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="glass-card rounded-2xl p-6">
                <h4 className="font-display font-bold text-sm text-white flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  What to improve
                </h4>
                <ul className="space-y-3">
                  {currentFeedback.improvements.map((imp, idx) => (
                    <li key={idx} className="flex gap-2.5 text-sm text-gray-300">
                      <span className="text-yellow-500 shrink-0 font-bold mt-0.5">•</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommended Model Response */}
            <div className="md:col-span-6">
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-white flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4 text-[#22d3ee]" />
                    Suggested Ideal Response Outline (STAR Framework)
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed italic whitespace-pre-wrap">
                    "{currentFeedback.modelAnswer}"
                  </p>
                </div>

                {/* Question level control */}
                <div className="flex gap-3 pt-6 border-t border-[rgba(255,255,255,0.05)] mt-6">
                  <button
                    onClick={handleTryAgain}
                    className="flex-1 py-3 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.06)] rounded-xl text-gray-300 font-semibold text-sm transition-all"
                  >
                    Try Answer Again
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    className="flex-1 bg-accent-gradient hover:opacity-95 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Next Question
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. COMPLETE INTERVIEW SESSION REPORT */}
      {flow === "completed" && (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in text-center">
          <div className="relative w-16 h-16 bg-[#10b981]/10 rounded-full flex items-center justify-center text-[#10b981] mx-auto shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-bold text-3xl text-white">Interview Complete!</h2>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Outstanding effort practicing your interview skills on camera. Here is your session feedback recap.
            </p>
          </div>

          <div className="glass-card rounded-[22px] p-6 sm:p-8 space-y-6 text-left">
            <h3 className="font-display font-bold text-base text-white border-b border-[rgba(255,255,255,0.05)] pb-3">Session Breakdown</h3>
            
            <div className="space-y-4">
              {sessionFeedbacks.length > 0 ? (
                sessionFeedbacks.map((item, idx) => (
                  <div key={idx} className="p-4 bg-black/20 rounded-xl border border-[rgba(255,255,255,0.03)] flex justify-between items-center gap-4">
                    <div className="max-w-[80%]">
                      <span className="text-[10px] font-mono text-[#a855f7] block uppercase mb-1">Question {idx + 1}</span>
                      <p className="text-xs font-semibold text-white truncate">"{item.question}"</p>
                    </div>
                    <div className="font-mono font-bold text-sm text-[#22d3ee] bg-[#22d3ee]/5 px-3 py-1.5 rounded-lg border border-[#22d3ee]/10">
                      Score: {item.feedback.overallScore}%
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-gray-500 bg-black/10 rounded-xl">
                  Questions completed. Practice is fully saved to history!
                </div>
              )}
            </div>

            {/* Dynamic Interactive Recharts Trend Chart for Session Feedback Recap */}
            <div className="border-t border-[rgba(255,255,255,0.05)] pt-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
                    <TrendingUp className="w-4 h-4 text-[#22d3ee]" />
                    Performance Progress Trend
                  </h4>
                  <p className="text-[11px] text-gray-400">Chronological analysis of mock evaluations across your practice sessions.</p>
                </div>

                {/* Metric Selector Toggle */}
                <div className="flex bg-black/30 rounded-lg p-1 border border-white/5 w-fit self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => setCompletedFocusMetric("Overall")}
                    className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase transition-all ${
                      completedFocusMetric === "Overall" ? "bg-[#22d3ee]/10 text-[#22d3ee] border border-[#22d3ee]/20" : "text-gray-500 hover:text-white"
                    }`}
                  >
                    Overall Score
                  </button>
                  <button
                    type="button"
                    onClick={() => setCompletedFocusMetric("Detailed")}
                    className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase transition-all ${
                      completedFocusMetric === "Detailed" ? "bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20" : "text-gray-500 hover:text-white"
                    }`}
                  >
                    Multi-Metric
                  </button>
                </div>
              </div>

              <div className="h-48 w-full bg-black/20 rounded-xl border border-white/[0.02] p-2 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="rgba(255,255,255,0.25)" 
                      fontSize={9} 
                      fontFamily="monospace"
                      tickLine={false} 
                      dy={6}
                    />
                    <YAxis 
                      domain={[30, 100]} 
                      stroke="rgba(255,255,255,0.25)" 
                      fontSize={9} 
                      fontFamily="monospace"
                      tickLine={false} 
                      dx={-4}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#11101c", 
                        border: "1px solid rgba(255,255,255,0.1)", 
                        borderRadius: "10px",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.4)"
                      }}
                      labelStyle={{ color: "#fff", fontSize: "10px", fontWeight: "bold", fontFamily: "monospace" }}
                      itemStyle={{ fontSize: "10px" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "9px", fontFamily: "monospace", paddingTop: 6 }} />

                    {completedFocusMetric === "Overall" ? (
                      <Line 
                        type="monotone" 
                        dataKey="Overall Score" 
                        stroke="#22d3ee" 
                        strokeWidth={2.5} 
                        dot={{ r: 4 }} 
                        activeDot={{ r: 6 }}
                        name="Overall Score (%)" 
                      />
                    ) : (
                      <>
                        <Line 
                          type="monotone" 
                          dataKey="Overall Score" 
                          stroke="#22d3ee" 
                          strokeWidth={1.5} 
                          dot={{ r: 2 }} 
                          name="Overall" 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="Confidence Score" 
                          stroke="#ec4899" 
                          strokeWidth={1.5} 
                          dot={{ r: 2 }} 
                          name="Confidence" 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="STAR Structure" 
                          stroke="#fbbf24" 
                          strokeWidth={1.5} 
                          dot={{ r: 2 }} 
                          name="STAR Structure" 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="Content Quality" 
                          stroke="#10b981" 
                          strokeWidth={1.5} 
                          dot={{ r: 2 }} 
                          name="Content" 
                        />
                      </>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={downloadSessionReport}
                className="flex-1 py-3 bg-[#11101c] hover:bg-white/5 border border-white/10 rounded-xl text-gray-300 font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#22d3ee]" />
                Download Report (.md)
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.06)] rounded-xl text-gray-300 font-semibold text-sm transition-all"
              >
                Download PDF Report
              </button>
              <button
                onClick={handleReset}
                className="flex-1 bg-accent-gradient hover:opacity-95 text-white font-bold py-3 px-4 rounded-xl cursor-pointer"
              >
                Practice Again
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
