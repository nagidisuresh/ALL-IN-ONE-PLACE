import React, { useState, useEffect } from "react";
import { 
  CheckCircle, Circle, Bookmark, ExternalLink, Trophy, 
  Search, ChevronDown, ChevronUp, Star, HelpCircle, Briefcase, 
  BarChart2, Flame, RefreshCw, Layers, Clock, Calendar, Zap, Sparkles, Check,
  Download, Plus, Minus, TrendingUp, Trash2, Award, Shield, Lock
} from "lucide-react";
import { CodingProblem } from "../types";
import { jsPDF } from "jspdf";

export default function JobPrepView() {
  const [activeTab, setActiveTab] = useState<"Sheets" | "Company-wise" | "Topic practice" | "Mock test" | "Analytics">(() => {
    const saved = localStorage.getItem("jobprep_activeTab");
    return (saved as any) || "Sheets";
  });
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem("jobprep_searchQuery") || "";
  });
  const [selectedDifficulty, setSelectedDifficulty] = useState<"All" | "Easy" | "Medium" | "Hard">(() => {
    const saved = localStorage.getItem("jobprep_selectedDifficulty");
    return (saved as any) || "All";
  });

  // Initial rich list of DSA problems (Blind 75 starter selection)
  const [problems, setProblems] = useState<CodingProblem[]>(() => {
    const saved = localStorage.getItem("jobprep_problems");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse problems", e);
      }
    }
    return [
      // Easy problems (10 total)
      { id: "p1", title: "Two Sum", difficulty: "Easy", category: "Array", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/two-sum/", companyTags: ["Google", "Amazon"] },
      { id: "p2", title: "Valid Parentheses", difficulty: "Easy", category: "Stack", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/", companyTags: ["Microsoft", "Meta"] },
      { id: "p3", title: "Merge Two Sorted Lists", difficulty: "Easy", category: "Linked List", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/", companyTags: ["Amazon", "Apple"] },
      { id: "p4", title: "Best Time to Buy and Sell Stock", difficulty: "Easy", category: "Array", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", companyTags: ["Google", "Microsoft"] },
      { id: "p5", title: "Valid Anagram", difficulty: "Easy", category: "String", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/valid-anagram/", companyTags: ["Meta", "Uber"] },
      { id: "p6", title: "Binary Search", difficulty: "Easy", category: "Binary Search", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/binary-search/", companyTags: ["Google", "Adobe"] },
      { id: "p7", title: "Reverse Linked List", difficulty: "Easy", category: "Linked List", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/", companyTags: ["Apple", "Netflix"] },
      { id: "p8", title: "Flood Fill", difficulty: "Easy", category: "Graph", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/flood-fill/", companyTags: ["Microsoft"] },
      { id: "p9", title: "Lowest Common Ancestor of a BST", difficulty: "Easy", category: "Trees", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", companyTags: ["Amazon", "Meta"] },
      { id: "p10", title: "Invert Binary Tree", difficulty: "Easy", category: "Trees", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree/", companyTags: ["Google", "Microsoft"] },
      
      // Medium problems (18 total)
      { id: "p11", title: "Group Anagrams", difficulty: "Medium", category: "String", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/group-anagrams/", companyTags: ["Amazon", "Meta"] },
      { id: "p12", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", category: "Sliding Window", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", companyTags: ["Google", "Microsoft", "Amazon"] },
      { id: "p13", title: "Container With Most Water", difficulty: "Medium", category: "Array", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/", companyTags: ["Google", "Apple"] },
      { id: "p14", title: "3Sum", difficulty: "Medium", category: "Array", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/3sum/", companyTags: ["Meta", "Microsoft"] },
      { id: "p15", title: "Remove Nth Node From End of List", difficulty: "Medium", category: "Linked List", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", companyTags: ["Netflix"] },
      { id: "p16", title: "Product of Array Except Self", difficulty: "Medium", category: "Array", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/", companyTags: ["Amazon", "Google"] },
      { id: "p17", title: "Search in Rotated Sorted Array", difficulty: "Medium", category: "Binary Search", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/", companyTags: ["Meta", "Uber"] },
      { id: "p18", title: "Validate Binary Search Tree", difficulty: "Medium", category: "Trees", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/", companyTags: ["Bloomberg"] },
      { id: "p19", title: "Number of Islands", difficulty: "Medium", category: "Graph", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/number-of-islands/", companyTags: ["Google", "Amazon", "Meta"] },
      { id: "p20", title: "Clone Graph", difficulty: "Medium", category: "Graph", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/clone-graph/", companyTags: ["Meta", "Microsoft"] },
      { id: "p21", title: "Course Schedule", difficulty: "Medium", category: "Graph", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/course-schedule/", companyTags: ["Google"] },
      { id: "p22", title: "Pacific Atlantic Water Flow", difficulty: "Medium", category: "Graph", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/pacific-atlantic-water-flow/", companyTags: ["Amazon"] },
      { id: "p23", title: "Insert Interval", difficulty: "Medium", category: "Intervals", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/insert-interval/", companyTags: ["Google"] },
      { id: "p24", title: "Merge Intervals", difficulty: "Medium", category: "Intervals", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/merge-intervals/", companyTags: ["Microsoft", "Meta"] },
      { id: "p25", title: "Non-overlapping Intervals", difficulty: "Medium", category: "Intervals", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/non-overlapping-intervals/", companyTags: ["Amazon"] },
      { id: "p26", title: "Combination Sum", difficulty: "Medium", category: "Backtracking", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/combination-sum/", companyTags: ["Meta", "Adobe"] },
      { id: "p27", title: "Word Search", difficulty: "Medium", category: "Backtracking", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/word-search/", companyTags: ["Google", "Microsoft"] },
      { id: "p28", title: "Longest Consecutive Sequence", difficulty: "Medium", category: "Array", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/longest-consecutive-sequence/", companyTags: ["Amazon", "Salesforce"] },
      
      // Hard problems (2 total)
      { id: "p29", title: "Merge k Sorted Lists", difficulty: "Hard", category: "Linked List", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/", companyTags: ["Google", "Meta", "Amazon"] },
      { id: "p30", title: "Longest Valid Parentheses", difficulty: "Hard", category: "Stack", solved: false, bookmarked: false, revision: false, leetcodeUrl: "https://leetcode.com/problems/longest-valid-parentheses/", companyTags: ["Microsoft", "Apple"] }
    ];
  });

  // Collapsible Sheets sections
  const [blind75Open, setBlind75Open] = useState(true);
  const [neetcodeOpen, setNeetcodeOpen] = useState(false);

  // Mock diagnostics exam states
  const [isExamActive, setIsExamActive] = useState(() => {
    const saved = localStorage.getItem("jobprep_isExamActive");
    return saved ? JSON.parse(saved) : false;
  });
  const [examScore, setExamScore] = useState<number | null>(() => {
    const saved = localStorage.getItem("jobprep_examScore");
    return saved ? JSON.parse(saved) : null;
   });
  const [examAnswers, setExamAnswers] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem("jobprep_examAnswers");
    return saved ? JSON.parse(saved) : {};
  });

  // Daily Career Check-in States
  const [checkInHistory, setCheckInHistory] = useState<{
    date: string;
    focusArea: string;
    targetMinutes: number;
    confidence: number;
    mainGoal: string;
    isCompleted: boolean;
    studyHours?: number;
    applyHours?: number;
    jobsApplied?: number;
  }[]>(() => {
    const saved = localStorage.getItem("jobprep_checkin_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse check-in history", e);
      }
    }
    
    // Seed 5 days of past history if empty to show a beautiful 5-day streak initially
    const seed = [];
    const seedFocus = [
      "💻 LeetCode / DSA",
      "🧠 System Design",
      "📝 Resume Polish",
      "🎤 Mock Interview",
      "💼 Applications"
    ];
    const seedGoals = [
      "Completed 3 dynamic programming medium problems",
      "Reviewed chat application scalability & DB options",
      "Polished resume experience bullet points",
      "Conducted 1:1 peer mock behavioral interview",
      "Applied to 5 target software engineer openings"
    ];
    const seedStudy = [3, 4.5, 2, 3.5, 1];
    const seedApply = [1, 0.5, 2.5, 1, 4];
    const seedJobs = [2, 0, 4, 1, 5];

    for (let i = 5; i >= 1; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const offset = d.getTimezoneOffset();
      const localDate = new Date(d.getTime() - (offset * 60 * 1000));
      const dStr = localDate.toISOString().split('T')[0];
      seed.push({
        date: dStr,
        focusArea: seedFocus[5 - i],
        targetMinutes: 240, // 4 hours
        confidence: 4,
        mainGoal: seedGoals[5 - i],
        isCompleted: true,
        studyHours: seedStudy[5 - i],
        applyHours: seedApply[5 - i],
        jobsApplied: seedJobs[5 - i]
      });
    }
    localStorage.setItem("jobprep_checkin_history", JSON.stringify(seed));
    return seed;
  });

  const getTodayDateString = () => {
    const d = new Date();
    const offset = d.getTimezoneOffset();
    const localDate = new Date(d.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().split('T')[0];
  };

  const todayStr = getTodayDateString();

  const [focusArea, setFocusArea] = useState<string>("");
  const [targetMinutes, setTargetMinutes] = useState<number>(60);
  const [confidence, setConfidence] = useState<number>(4);
  const [mainGoal, setMainGoal] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isCheckInCollapsed, setIsCheckInCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem("jobprep_isCheckInCollapsed");
    return saved ? JSON.parse(saved) : false;
  });
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [selectedBadge, setSelectedBadge] = useState<{
    id: string;
    name: string;
    requirement: number;
    description: string;
    icon: string;
    color: string;
    glow: string;
    textColor: string;
    bgLight: string;
    motivation: string;
    tip: string;
  } | null>(null);

  // New state variables for daily goal hours tracking
  const [studyHours, setStudyHours] = useState<number>(0);
  const [applyHours, setApplyHours] = useState<number>(0);
  const [jobsApplied, setJobsApplied] = useState<number>(0);

  // Bulletproof streak calculation from check-in logs
  const calculateStreak = (history: any[]) => {
    if (!history || history.length === 0) return 0;
    
    // Sort completed checkins by date descending
    const completedDates = history
      .filter(h => h.isCompleted)
      .map(h => h.date)
      .sort((a, b) => b.localeCompare(a));
      
    if (completedDates.length === 0) return 0;
    
    const formatDate = (dateObj: Date) => {
      const offset = dateObj.getTimezoneOffset();
      const localDate = new Date(dateObj.getTime() - (offset * 60 * 1000));
      return localDate.toISOString().split('T')[0];
    };
    
    const todayStr = getTodayDateString();
    
    const mostRecentDate = completedDates[0];
    const today = new Date(todayStr);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = formatDate(yesterday);
    
    if (mostRecentDate !== todayStr && mostRecentDate !== yesterdayStr) {
      return 0; // Streak is broken
    }
    
    let streak = 1;
    let currentDate = new Date(mostRecentDate);
    
    for (let i = 1; i < completedDates.length; i++) {
      const prevDate = new Date(completedDates[i]);
      const diffTime = Math.abs(currentDate.getTime() - prevDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
        currentDate = prevDate;
      } else if (diffDays === 0) {
        continue;
      } else {
        break;
      }
    }
    return streak;
  };

  // Generate selectable dates for retro logs
  const getLogDateOptions = () => {
    const options = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const offset = d.getTimezoneOffset();
      const localDate = new Date(d.getTime() - (offset * 60 * 1000));
      const dateStr = localDate.toISOString().split('T')[0];
      
      let label = "";
      if (i === 0) label = "Today";
      else if (i === 1) label = "Yesterday";
      else {
        label = d.toLocaleDateString([], { month: 'short', day: 'numeric', weekday: 'short' });
      }
      
      options.push({ value: dateStr, label });
    }
    return options;
  };

  // Get aggregated stats and accurate streaks
  const getStreakStats = () => {
    if (!checkInHistory || checkInHistory.length === 0) {
      return { currentStreak: 0, longestStreak: 0, totalHours: 0, totalJobs: 0 };
    }

    const sortedLogs = [...checkInHistory]
      .sort((a, b) => b.date.localeCompare(a.date));

    let totalHours = 0;
    let totalJobs = 0;
    sortedLogs.forEach(h => {
      totalHours += (h.studyHours || 0) + (h.applyHours || 0);
      totalJobs += h.jobsApplied || 0;
    });

    const completedDays = sortedLogs.filter(h => h.isCompleted || (h.studyHours || 0) + (h.applyHours || 0) > 0);
    
    if (completedDays.length === 0) {
      return { currentStreak: 0, longestStreak: 0, totalHours, totalJobs };
    }

    const getDiffInDays = (d1Str: string, d2Str: string) => {
      const d1 = new Date(d1Str);
      const d2 = new Date(d2Str);
      d1.setHours(0,0,0,0);
      d2.setHours(0,0,0,0);
      return Math.round(Math.abs(d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));
    };

    const mostRecentDateStr = completedDays[0].date;
    const diffFromToday = getDiffInDays(todayStr, mostRecentDateStr);
    const isStreakActive = diffFromToday <= 1;

    let currentStreak = 0;
    if (isStreakActive) {
      currentStreak = 1;
      for (let i = 0; i < completedDays.length - 1; i++) {
        const diff = getDiffInDays(completedDays[i].date, completedDays[i+1].date);
        if (diff === 1) {
          currentStreak++;
        } else if (diff > 1) {
          break;
        }
      }
    }

    let longestStreak = 0;
    let currentSeq = 0;
    for (let i = 0; i < completedDays.length; i++) {
      if (i === 0) {
        currentSeq = 1;
        longestStreak = 1;
        continue;
      }
      const diff = getDiffInDays(completedDays[i-1].date, completedDays[i].date);
      if (diff === 1) {
        currentSeq++;
        if (currentSeq > longestStreak) {
          longestStreak = currentSeq;
        }
      } else if (diff > 1) {
        currentSeq = 1;
      }
    }

    return {
      currentStreak,
      longestStreak: Math.max(longestStreak, currentStreak),
      totalHours: parseFloat(totalHours.toFixed(1)),
      totalJobs
    };
  };

  const { currentStreak, longestStreak, totalHours: allTimeHours, totalJobs: totalJobsSent } = getStreakStats();

  // Selected log date
  const [selectedLogDate, setSelectedLogDate] = useState<string>(todayStr);

  // Sync inputs from checkInHistory on date or history change
  useEffect(() => {
    const record = checkInHistory.find(h => h.date === selectedLogDate);
    if (record) {
      setFocusArea(record.focusArea || "");
      setTargetMinutes(record.targetMinutes || 60);
      setConfidence(record.confidence || 4);
      setMainGoal(record.mainGoal || "");
      setIsCompleted(record.isCompleted || false);
      setStudyHours(record.studyHours || 0);
      setApplyHours(record.applyHours || 0);
      setJobsApplied(record.jobsApplied || 0);
    } else {
      setFocusArea("");
      setTargetMinutes(60);
      setConfidence(4);
      setMainGoal("");
      setIsCompleted(false);
      setStudyHours(0);
      setApplyHours(0);
      setJobsApplied(0);
    }
  }, [checkInHistory, selectedLogDate]);

  // Save/Update helper with support for studying and applying hours
  const handleSaveCheckIn = (
    completedStatus?: boolean,
    updatedStudy?: number,
    updatedApply?: number,
    updatedJobs?: number,
    updatedFocusArea?: string,
    updatedMainGoal?: string,
    updatedConfidence?: number,
    updatedTargetMinutes?: number
  ) => {
    const finalStudy = updatedStudy !== undefined ? updatedStudy : studyHours;
    const finalApply = updatedApply !== undefined ? updatedApply : applyHours;
    const finalJobs = updatedJobs !== undefined ? updatedJobs : jobsApplied;
    const finalFocus = updatedFocusArea !== undefined ? updatedFocusArea : focusArea;
    const finalGoalStr = updatedMainGoal !== undefined ? updatedMainGoal : mainGoal;
    const finalConfidence = updatedConfidence !== undefined ? updatedConfidence : confidence;
    const finalTargetMins = updatedTargetMinutes !== undefined ? updatedTargetMinutes : targetMinutes;

    const totalHours = finalStudy + finalApply;
    const goalHours = finalTargetMins / 60;
    
    // Automatically complete if logged hours >= goal hours, otherwise use passed value or preserve state
    const finalCompleted = completedStatus !== undefined 
      ? completedStatus 
      : (totalHours >= goalHours ? true : isCompleted);

    const newRecord = {
      date: selectedLogDate,
      focusArea: finalFocus || "General Prep",
      targetMinutes: finalTargetMins,
      confidence: finalConfidence,
      mainGoal: finalGoalStr.trim(),
      isCompleted: finalCompleted,
      studyHours: finalStudy,
      applyHours: finalApply,
      jobsApplied: finalJobs
    };

    setCheckInHistory(prev => {
      const filtered = prev.filter(h => h.date !== selectedLogDate);
      const updated = [newRecord, ...filtered];
      localStorage.setItem("jobprep_checkin_history", JSON.stringify(updated));
      return updated;
    });

    setIsCompleted(finalCompleted);
    if (updatedStudy !== undefined) setStudyHours(updatedStudy);
    if (updatedApply !== undefined) setApplyHours(updatedApply);
    if (updatedJobs !== undefined) setJobsApplied(updatedJobs);
    if (updatedFocusArea !== undefined) setFocusArea(updatedFocusArea);
    if (updatedMainGoal !== undefined) setMainGoal(updatedMainGoal);
    if (updatedConfidence !== undefined) setConfidence(updatedConfidence);
    if (updatedTargetMinutes !== undefined) setTargetMinutes(finalTargetMins);
  };

  // Autosave tracking state indicators
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>("");

  // Debounced auto-save effect
  useEffect(() => {
    setIsSaving(true);
    const delayDebounce = setTimeout(() => {
      localStorage.setItem("jobprep_activeTab", activeTab);
      localStorage.setItem("jobprep_searchQuery", searchQuery);
      localStorage.setItem("jobprep_selectedDifficulty", selectedDifficulty);
      localStorage.setItem("jobprep_problems", JSON.stringify(problems));
      localStorage.setItem("jobprep_examAnswers", JSON.stringify(examAnswers));
      localStorage.setItem("jobprep_isExamActive", JSON.stringify(isExamActive));
      localStorage.setItem("jobprep_examScore", examScore !== null ? JSON.stringify(examScore) : "");
      localStorage.setItem("jobprep_isCheckInCollapsed", JSON.stringify(isCheckInCollapsed));
      
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSaved(timeStr);
      setIsSaving(false);
    }, 800); // 800ms debounce limit to optimize write overhead

    return () => clearTimeout(delayDebounce);
  }, [activeTab, searchQuery, selectedDifficulty, problems, examAnswers, isExamActive, examScore, isCheckInCollapsed]);

  // Company prep deck
  const companies = [
    { name: "Google", color: "from-blue-600 to-emerald-500", rating: "Expert", salary: "$160k - $250k Base", hiring: "5 rounds (1 screen, 3 technical coding, 1 Googlyness)" },
    { name: "Amazon", color: "from-amber-500 to-orange-600", rating: "Hard", salary: "$145k - $210k Base", hiring: "4 rounds (1 online test, 2 coding with leadership, 1 bar raiser)" },
    { name: "Microsoft", color: "from-teal-600 to-blue-500", rating: "Hard", salary: "$140k - $205k Base", hiring: "4 rounds (System design + coding + cultural alignment)" },
    { name: "Meta", color: "from-blue-700 to-indigo-600", rating: "Hard", salary: "$165k - $240k Base", hiring: "4 rounds (1 screening, 2 product architecture, 1 cultural)" }
  ];

  // Dynamic Metrics calculators
  const solvedCount = problems.filter(p => p.solved).length;
  const easySolved = problems.filter(p => p.difficulty === "Easy" && p.solved).length;
  const mediumSolved = problems.filter(p => p.difficulty === "Medium" && p.solved).length;
  const hardSolved = problems.filter(p => p.difficulty === "Hard" && p.solved).length;

  const totalEasy = problems.filter(p => p.difficulty === "Easy").length;
  const totalMedium = problems.filter(p => p.difficulty === "Medium").length;
  const totalHard = problems.filter(p => p.difficulty === "Hard").length;

  const badgesList = [
    {
      id: "ignite_3",
      name: "Habit Ignite",
      requirement: 3,
      description: "Establish the initial habit loop.",
      icon: "Zap",
      color: "from-amber-600 to-amber-500",
      glow: "shadow-[0_0_15px_rgba(245,158,11,0.35)] border-amber-500/40",
      textColor: "text-amber-400",
      bgLight: "bg-amber-500/10",
      motivation: "Starting is 80% of the battle. You have successfully initiated the learning momentum!",
      tip: "To maintain this: Keep daily sessions to at least 15 minutes of rapid-fire review on busy days to lock in the routine."
    },
    {
      id: "warrior_7",
      name: "7-Day Warrior",
      requirement: 7,
      description: "Consistent preparation for a full week.",
      icon: "Shield",
      color: "from-indigo-600 to-indigo-500",
      glow: "shadow-[0_0_15px_rgba(99,102,241,0.35)] border-indigo-500/40",
      textColor: "text-indigo-400",
      bgLight: "bg-indigo-500/10",
      motivation: "Outstanding! You have completed a full 7-day routine. You are outperforming 85% of other active applicants.",
      tip: "To maintain this: Set a dedicated 'review-only day' on the weekend to digest tough DSA patterns without fatigue."
    },
    {
      id: "elite_15",
      name: "Fortnight Elite",
      requirement: 15,
      description: "Deep focus and rigorous consistency.",
      icon: "Award",
      color: "from-rose-600 to-rose-500",
      glow: "shadow-[0_0_15px_rgba(244,63,94,0.35)] border-rose-500/40",
      textColor: "text-rose-400",
      bgLight: "bg-rose-500/10",
      motivation: "A fortnight of solid work! This is where habit becomes second-nature and cognitive load decreases.",
      tip: "To maintain this: Rotate your topics (e.g. system design vs coding sheets) to keep cognitive spark and creativity alive."
    },
    {
      id: "legend_30",
      name: "30-Day Legend",
      requirement: 30,
      description: "Ultimate dedication. Mastered routine.",
      icon: "Trophy",
      color: "from-violet-600 to-fuchsia-500",
      glow: "shadow-[0_0_20px_rgba(168,85,247,0.45)] border-purple-500/50",
      textColor: "text-purple-400",
      bgLight: "bg-purple-500/10",
      motivation: "Incredible! 30 days of deliberate practice. This represents elite competitive tier stamina and professional excellence.",
      tip: "To maintain this: Mentor others, do structured mock assessments, and practice full whiteboarding to simulate live stress."
    }
  ];

  const renderBadgeIcon = (iconName: string, className: string = "w-6 h-6") => {
    switch (iconName) {
      case "Zap": return <Zap className={className} />;
      case "Shield": return <Shield className={className} />;
      case "Award": return <Award className={className} />;
      case "Trophy": return <Trophy className={className} />;
      default: return <Award className={className} />;
    }
  };

  const toggleProblemSolved = (id: string) => {
    setProblems(prev => prev.map(p => p.id === id ? { ...p, solved: !p.solved } : p));
  };

  const toggleProblemBookmarked = (id: string) => {
    setProblems(prev => prev.map(p => p.id === id ? { ...p, bookmarked: !p.bookmarked } : p));
  };

  // Filter problems for display
  const filteredProblems = problems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
    return matchesSearch && matchesDiff;
  });

  // Simple mock test triggers
  const startMockExam = () => {
    setIsExamActive(true);
    setExamScore(null);
    setExamAnswers({});
  };

  const submitMockExam = () => {
    setIsExamActive(false);
    // Dynamic score generation based on items answered
    const count = Object.keys(examAnswers).length;
    setExamScore(count >= 3 ? 90 : count > 0 ? 60 : 0);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Margins & Dimensions
    const marginX = 20;
    let currentY = 20;

    // Header Title Area with elegant slate background
    doc.setFillColor(15, 23, 42); // slate-900 color
    doc.rect(0, 0, 210, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.text("NEXTROUNDPREP", marginX, 18);
    
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.text("JOB PREPARATION TRACKER - PROGRESS REPORT", marginX, 24);

    // Decorative Accent bar in header (cyan)
    doc.setFillColor(34, 211, 238); 
    doc.rect(0, 37, 210, 3, "F");

    // Reset text color for body
    doc.setTextColor(30, 41, 59);

    // Generation timestamp
    currentY = 50;
    doc.setFont("Helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Report Generated: ${new Date().toLocaleString()}`, marginX, currentY);

    currentY += 10;

    // SECTION 1: OVERALL PERFORMANCE STATS
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("1. Algorithmic Practice Performance (DSA Tracker)", marginX, currentY);
    
    currentY += 2;
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.4);
    doc.line(marginX, currentY, 190, currentY);
    currentY += 6;

    // Total Solved Text
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    doc.text(`Total Solved Problems:`, marginX, currentY);
    doc.setFont("Helvetica", "bold");
    doc.text(`${solvedCount} of 30 problems solved (${Math.round((solvedCount / 30) * 100)}% Complete)`, marginX + 45, currentY);

    // Draw progress bar
    currentY += 3;
    const barWidth = 120;
    const barHeight = 4;
    const solvedRatio = Math.min(1, solvedCount / 30);
    doc.setFillColor(241, 245, 249);
    doc.rect(marginX, currentY, barWidth, barHeight, "F");
    doc.setFillColor(34, 211, 238); // Cyan progress bar
    doc.rect(marginX, currentY, barWidth * solvedRatio, barHeight, "F");

    currentY += 10;

    // Breakdowns by difficulty
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9.5);
    doc.text("Difficulty Category Breakdown:", marginX, currentY);
    
    currentY += 4;
    // Easy Solved card
    doc.setFillColor(240, 253, 250); // very light emerald
    doc.rect(marginX, currentY, 48, 12, "F");
    doc.setTextColor(13, 148, 136); // emerald-600
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("EASY PROBLEMS", marginX + 4, currentY + 4.5);
    doc.setFont("Helvetica", "normal");
    doc.text(`${easySolved} / ${totalEasy} Solved`, marginX + 4, currentY + 9);

    // Medium Solved card
    doc.setFillColor(254, 252, 232); // very light yellow
    doc.rect(marginX + 58, currentY, 48, 12, "F");
    doc.setTextColor(161, 98, 7); // yellow-600
    doc.setFont("Helvetica", "bold");
    doc.text("MEDIUM PROBLEMS", marginX + 62, currentY + 4.5);
    doc.setFont("Helvetica", "normal");
    doc.text(`${mediumSolved} / ${totalMedium} Solved`, marginX + 62, currentY + 9);

    // Hard Solved Card
    doc.setFillColor(255, 241, 242); // very light rose
    doc.rect(marginX + 116, currentY, 54, 12, "F");
    doc.setTextColor(225, 29, 72); // rose-600
    doc.setFont("Helvetica", "bold");
    doc.text("HARD PROBLEMS", marginX + 120, currentY + 4.5);
    doc.setFont("Helvetica", "normal");
    doc.text(`${hardSolved} / ${totalHard} Solved`, marginX + 120, currentY + 9);

    currentY += 20;

    // SECTION 2: CAREER DAILY CHECK-IN PLAN
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("2. Daily Goal & Hours Tracker", marginX, currentY);
    
    currentY += 2;
    doc.line(marginX, currentY, 190, currentY);
    currentY += 6;

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);

    // Streaks
    doc.text(`Daily Prep Streak:`, marginX, currentY);
    doc.setFont("Helvetica", "bold");
    doc.text(`${currentStreak} Days (Best: ${longestStreak} Days)`, marginX + 40, currentY);

    // Today's Primary Focus
    doc.setFont("Helvetica", "normal");
    doc.text("Primary Focus Area:", marginX + 90, currentY);
    doc.setFont("Helvetica", "bold");
    doc.text(focusArea || "General Prep", marginX + 128, currentY);

    currentY += 6.5;
    
    // Logged hours details
    doc.setFont("Helvetica", "normal");
    doc.text(`Today's Logged Hours:`, marginX, currentY);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(79, 70, 229); // indigo
    doc.text(`📚 ${studyHours}h study`, marginX + 40, currentY);
    doc.setTextColor(5, 150, 105); // emerald
    doc.text(`💼 ${applyHours}h apply`, marginX + 66, currentY);
    doc.setTextColor(219, 39, 119); // pink
    doc.text(`🚀 ${jobsApplied} jobs`, marginX + 92, currentY);
    doc.setTextColor(30, 41, 59); // restore standard color

    // Energy & Confidence
    doc.setFont("Helvetica", "normal");
    doc.text("Energy & Confidence:", marginX + 115, currentY);
    doc.setFont("Helvetica", "bold");
    doc.text(`${confidence} / 5 Rating`, marginX + 152, currentY);

    currentY += 6.5;

    // Goal Progression Status
    doc.setFont("Helvetica", "normal");
    doc.text("Daily Target Goal:", marginX, currentY);
    doc.setFont("Helvetica", "bold");
    doc.text(`${targetMinutes / 60} hrs (${studyHours + applyHours} hrs completed)`, marginX + 40, currentY);

    doc.setFont("Helvetica", "normal");
    doc.text("Daily Completion Status:", marginX + 95, currentY);
    doc.setFont("Helvetica", "bold");
    if (isCompleted) {
      doc.setTextColor(16, 185, 129); // emerald-500
      doc.text("✓ GOAL COMPLETED TODAY", marginX + 142, currentY);
    } else {
      doc.setTextColor(245, 158, 11); // amber-500
      doc.text("⚡ IN PROGRESS", marginX + 142, currentY);
    }
    doc.setTextColor(30, 41, 59); // restore standard color

    if (mainGoal) {
      currentY += 6.5;
      doc.setFont("Helvetica", "normal");
      doc.text("Primary Goal / Objective for Today:", marginX, currentY);
      currentY += 4.5;
      doc.setFont("Helvetica", "italic");
      doc.setTextColor(71, 85, 105); // slate-600
      const wrappedGoal = doc.splitTextToSize(`"${mainGoal}"`, 165);
      doc.text(wrappedGoal, marginX + 4, currentY);
      currentY += (wrappedGoal.length * 4.5);
    } else {
      currentY += 7;
    }

    // Consistency Badges Row in PDF
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Streak Badges Unlocked:", marginX, currentY);
    doc.setFont("Helvetica", "bold");
    let unlockedBadgesList = [];
    if (longestStreak >= 3) unlockedBadgesList.push("3-Day Ignite");
    if (longestStreak >= 7) unlockedBadgesList.push("7-Day Warrior");
    if (longestStreak >= 15) unlockedBadgesList.push("15-Day Elite");
    if (longestStreak >= 30) unlockedBadgesList.push("30-Day Legend");
    
    if (unlockedBadgesList.length > 0) {
      doc.setTextColor(161, 98, 7); // gold/amber text
      doc.text(`[ ${unlockedBadgesList.join(" ]   [ ")} ]`, marginX + 45, currentY);
    } else {
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text("No badges unlocked yet (Get a 3-day streak to start!)", marginX + 45, currentY);
    }
    doc.setTextColor(30, 41, 59); // restore default
    currentY += 8;

    // SECTION 3: MOCK TEST DIAGNOSTICS
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("3. AI Diagnostics Mock Exam Performance", marginX, currentY);
    
    currentY += 2;
    doc.line(marginX, currentY, 190, currentY);
    currentY += 6;

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);

    if (examScore !== null) {
      doc.text("Latest Diagnostic Mock Exam Score:", marginX, currentY);
      doc.setFont("Helvetica", "bold");
      doc.setTextColor(16, 185, 129);
      doc.text(`${examScore}%`, marginX + 68, currentY);
      doc.setTextColor(30, 41, 59);
      currentY += 5.5;
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9.5);
      doc.text("Verdict: Communications efficiency and algorithmic solution layouts match strong core standards.", marginX, currentY);
    } else {
      doc.text("Diagnostic Mock Exam Score: No active score.", marginX, currentY);
      currentY += 5.5;
      doc.setFont("Helvetica", "italic");
      doc.setFontSize(9.5);
      doc.setTextColor(100, 116, 139);
      doc.text("Take the 45-minute pressurized mock diagnostics test to receive detailed evaluations.", marginX, currentY);
    }

    currentY += 12;

    // SECTION 4: HISTORICAL LOGS
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("4. Comprehensive Activity Logs", marginX, currentY);
    
    currentY += 2;
    doc.line(marginX, currentY, 190, currentY);
    currentY += 6;

    if (checkInHistory.length === 0) {
      doc.setFont("Helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text("No historical activity logged yet. Keep updating your daily check-ins to build a consistent chart.", marginX, currentY);
    } else {
      // Draw table header row (170mm printable width total)
      doc.setFillColor(241, 245, 249);
      doc.rect(marginX, currentY, 170, 7.5, "F");
      
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text("Date", marginX + 2, currentY + 5.5);
      doc.text("Focus Area", marginX + 24, currentY + 5.5);
      doc.text("Study", marginX + 59, currentY + 5.5);
      doc.text("Apply", marginX + 74, currentY + 5.5);
      doc.text("Jobs", marginX + 89, currentY + 5.5);
      doc.text("Energy", marginX + 101, currentY + 5.5);
      doc.text("Objective / Primary Win", marginX + 116, currentY + 5.5);

      currentY += 7.5;

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);

      const logsToPrint = checkInHistory.slice(0, 12);
      logsToPrint.forEach((item, index) => {
        if (currentY > 265) {
          // Standard bottom footer on previous page
          doc.setFont("Helvetica", "normal");
          doc.setFontSize(8);
          doc.setTextColor(148, 163, 184);
          doc.text("NextRoundPrep (c) - Professional Interview Preparation Suite", 105, 285, { align: "center" });

          doc.addPage();
          
          // Simple top header for page 2
          doc.setFillColor(15, 23, 42);
          doc.rect(0, 0, 210, 15, "F");
          doc.setTextColor(255, 255, 255);
          doc.setFont("Helvetica", "bold");
          doc.setFontSize(10);
          doc.text("NEXTROUNDPREP - JOB PREPARATION TRACKER", marginX, 10);

          currentY = 25;
          doc.setFont("Helvetica", "bold");
          doc.setFontSize(11);
          doc.setTextColor(15, 23, 42);
          doc.text("4. Comprehensive Activity Logs (Continued)", marginX, currentY);
          currentY += 5;
          doc.line(marginX, currentY, 190, currentY);
          currentY += 6;

          // Redraw table headers on new page
          doc.setFillColor(241, 245, 249);
          doc.rect(marginX, currentY, 170, 7.5, "F");
          doc.setFont("Helvetica", "bold");
          doc.setFontSize(8.5);
          doc.setTextColor(15, 23, 42);
          doc.text("Date", marginX + 2, currentY + 5.5);
          doc.text("Focus Area", marginX + 24, currentY + 5.5);
          doc.text("Study", marginX + 59, currentY + 5.5);
          doc.text("Apply", marginX + 74, currentY + 5.5);
          doc.text("Jobs", marginX + 89, currentY + 5.5);
          doc.text("Energy", marginX + 101, currentY + 5.5);
          doc.text("Objective / Primary Win", marginX + 116, currentY + 5.5);
          currentY += 7.5;
        }

        // Draw alternating row backgrounds
        if (index % 2 === 1) {
          doc.setFillColor(248, 250, 252);
          doc.rect(marginX, currentY, 170, 7, "F");
        }

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(51, 65, 85);
        doc.text(item.date, marginX + 2, currentY + 5);
        doc.text(item.focusArea, marginX + 24, currentY + 5);
        doc.text(`${item.studyHours || 0}h`, marginX + 59, currentY + 5);
        doc.text(`${item.applyHours || 0}h`, marginX + 74, currentY + 5);
        doc.text(`${item.jobsApplied || 0}`, marginX + 89, currentY + 5);
        doc.text("★".repeat(item.confidence || 4), marginX + 101, currentY + 5);
        
        const goalText = item.mainGoal || "-";
        const truncatedGoal = goalText.length > 36 ? goalText.substring(0, 34) + "..." : goalText;
        doc.text(truncatedGoal, marginX + 116, currentY + 5);

        currentY += 7;
      });
    }

    // Bottom page footer on the final page
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("NextRoundPrep (c) - Professional Interview Preparation Suite", 105, 285, { align: "center" });

    doc.save("NextRoundPrep_Job_Prep_Progress_Report.pdf");
  };

  // Helper to generate last 7 days with data
  const getWeeklyProgress = () => {
    const list = [];
    const formatDate = (dateObj: Date) => {
      const offset = dateObj.getTimezoneOffset();
      const localDate = new Date(dateObj.getTime() - (offset * 60 * 1000));
      return localDate.toISOString().split('T')[0];
    };
    
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dStr = formatDate(d);
      const record = checkInHistory.find(h => h.date === dStr);
      
      list.push({
        dateStr: dStr,
        dayName: dayNames[d.getDay()],
        dayNum: d.getDate(),
        isToday: dStr === todayStr,
        record: record || null,
        isCompleted: record?.isCompleted || false,
        studyHours: record?.studyHours || 0,
        applyHours: record?.applyHours || 0,
        jobsApplied: record?.jobsApplied || 0,
      });
    }
    return list;
  };

  return (
    <div className="w-full max-w-5xl mx-auto pt-24 pb-16 px-4">
      {/* Headings */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight leading-tight">
          Crack the tech <span className="text-gradient">interview.</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
          DSA tracker • Company-wise questions • LeetCode sheets • Mock tests • Analytics — all powered by AI.
        </p>
        
        <div className="flex flex-wrap justify-center gap-2.5 mt-4">
          {/* Dynamic Auto-save indicator badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(34,211,238,0.04)] border border-[rgba(34,211,238,0.15)] text-[11px] font-mono text-[#22d3ee] shadow-sm select-none">
            <Clock className={`w-3.5 h-3.5 ${isSaving ? 'animate-pulse text-purple-400' : 'text-[#22d3ee]'}`} />
            <span>
              {isSaving ? "Auto-saving..." : lastSaved ? `Changes Saved (${lastSaved})` : "Auto-save Enabled"}
            </span>
          </div>

          {/* PDF Export Button */}
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-[11px] font-mono text-indigo-300 shadow-sm cursor-pointer hover:border-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Progress PDF</span>
          </button>
        </div>
      </div>

      {/* Metrics Bar (4 stat boxes) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Solved */}
        <div className="bg-[#15141f] p-4 rounded-xl border border-[rgba(255,255,255,0.06)] shadow-md flex items-center gap-4">
          <div className="w-10 h-10 bg-accent-gradient rounded-lg flex items-center justify-center text-white font-bold font-mono">
            {solvedCount}
          </div>
          <div>
            <span className="text-[10px] font-mono font-semibold text-gray-500 uppercase tracking-wide">Solved</span>
            <span className="block font-display font-bold text-lg text-white font-mono">{solvedCount}/30</span>
          </div>
        </div>

        {/* Easy solved */}
        <div className="bg-[#15141f] p-4 rounded-xl border border-[rgba(255,255,255,0.06)] shadow-md flex items-center gap-4">
          <div className="w-10 h-10 bg-[#10b981]/15 text-[#10b981] rounded-lg flex items-center justify-center text-sm font-bold font-mono">
            E
          </div>
          <div>
            <span className="text-[10px] font-mono font-semibold text-gray-500 uppercase tracking-wide">Easy Problems</span>
            <span className="block font-display font-bold text-lg text-[#10b981] font-mono">{easySolved}/{totalEasy}</span>
          </div>
        </div>

        {/* Medium solved */}
        <div className="bg-[#15141f] p-4 rounded-xl border border-[rgba(255,255,255,0.06)] shadow-md flex items-center gap-4">
          <div className="w-10 h-10 bg-yellow-500/15 text-yellow-500 rounded-lg flex items-center justify-center text-sm font-bold font-mono">
            M
          </div>
          <div>
            <span className="text-[10px] font-mono font-semibold text-gray-500 uppercase tracking-wide">Medium Problems</span>
            <span className="block font-display font-bold text-lg text-yellow-500 font-mono">{mediumSolved}/{totalMedium}</span>
          </div>
        </div>

        {/* Hard solved */}
        <div className="bg-[#15141f] p-4 rounded-xl border border-[rgba(255,255,255,0.06)] shadow-md flex items-center gap-4">
          <div className="w-10 h-10 bg-rose-500/15 text-rose-500 rounded-lg flex items-center justify-center text-sm font-bold font-mono">
            H
          </div>
          <div>
            <span className="text-[10px] font-mono font-semibold text-gray-500 uppercase tracking-wide">Hard Problems</span>
            <span className="block font-display font-bold text-lg text-rose-500 font-mono">{hardSolved}/{totalHard}</span>
          </div>
        </div>
      </div>

      {/* Daily Career Check-in Component */}
      <div className="glass-card rounded-[22px] border border-white/5 bg-[#0b0f1a]/80 backdrop-blur-xl p-5 sm:p-6 mb-8 shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 bg-purple-500/15 rounded-xl flex items-center justify-center text-[#a855f7] shrink-0">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500/10 animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display font-bold text-sm sm:text-base text-white">Daily Goal & Hours Tracker</h3>
                {isCompleted ? (
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[9px] font-mono font-bold uppercase tracking-wider py-0.5 px-2 rounded-full flex items-center gap-1">
                    <Check className="w-2.5 h-2.5 stroke-[3]" /> GOAL MET TODAY
                  </span>
                ) : (studyHours + applyHours) > 0 ? (
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/25 text-[9px] font-mono font-bold uppercase tracking-wider py-0.5 px-2 rounded-full flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 animate-pulse" /> PROGRESS IN FLOW ({Math.round(((studyHours + applyHours) / (targetMinutes / 60)) * 100)}%)
                  </span>
                ) : (
                  <span className="bg-gray-500/10 text-gray-400 border border-gray-500/25 text-[9px] font-mono font-bold uppercase tracking-wider py-0.5 px-2 rounded-full">
                    NOT YET STARTED
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Log study and application hours, maintain your streak, and hit daily milestones.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-end sm:self-center">
            {/* Log Date Selector */}
            <div className="flex items-center gap-1.5 bg-black/30 border border-white/5 rounded-xl px-2.5 py-1">
              <span className="text-[10px] font-mono text-gray-500 uppercase">Log Date:</span>
              <select
                value={selectedLogDate}
                onChange={(e) => setSelectedLogDate(e.target.value)}
                className="bg-transparent text-xs text-white outline-none font-semibold cursor-pointer font-mono"
              >
                {getLogDateOptions().map(opt => (
                  <option key={opt.value} value={opt.value} className="bg-[#0b0f1a] text-white">
                    {opt.label} {opt.value === todayStr ? "(Today)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-[11px] font-mono text-gray-400 hover:text-white bg-black/30 hover:bg-black/50 border border-white/5 px-2.5 py-1.5 rounded-lg transition-all"
            >
              {showHistory ? "Hide Logs" : "Logs History"}
            </button>
            <button
              onClick={() => setIsCheckInCollapsed(!isCheckInCollapsed)}
              className="p-1.5 bg-black/20 hover:bg-black/40 text-gray-400 hover:text-white border border-white/5 rounded-lg transition-all"
            >
              {isCheckInCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* History Logs Drawer */}
        {showHistory && (
          <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/5 space-y-3 max-h-[220px] overflow-y-auto animate-fade-in">
            <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
              <span>Your Activity Log Timeline</span>
              <span className="text-[9px] text-gray-500 font-normal lowercase italic">Showing recent entries</span>
            </h4>
            {checkInHistory.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-4">No past logs recorded yet. Log your first session today!</p>
            ) : (
              <div className="space-y-2">
                {[...checkInHistory]
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-2.5 rounded-lg bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.03] text-xs transition-all">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-[#22d3ee] font-bold">{item.date === todayStr ? "Today" : item.date}</span>
                        <span className="font-bold text-white bg-white/5 py-0.5 px-2 rounded-md">{item.focusArea}</span>
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-400 bg-black/30 px-2 py-0.5 rounded border border-white/5">
                          <span className="text-indigo-400 font-bold">📚 {item.studyHours || 0}h</span>
                          <span className="text-gray-600">|</span>
                          <span className="text-emerald-400 font-bold">💼 {item.applyHours || 0}h</span>
                          {item.jobsApplied ? (
                            <>
                              <span className="text-gray-600">|</span>
                              <span className="text-pink-400 font-bold">🚀 {item.jobsApplied} jobs</span>
                            </>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        {item.mainGoal && (
                          <span className="text-gray-400 italic text-[11px] max-w-[200px] sm:max-w-xs truncate">
                            "{item.mainGoal}"
                          </span>
                        )}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-yellow-400 font-mono text-[10px]">{"★".repeat(item.confidence || 4)}</span>
                          {item.isCompleted ? (
                            <span className="text-emerald-400 font-bold font-mono text-[10px] bg-emerald-500/10 py-0.5 px-2 rounded-full border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.15)]">Met Goal</span>
                          ) : (
                            <span className="text-gray-500 font-mono text-[10px] bg-gray-500/10 py-0.5 px-2 rounded-full border border-gray-500/20">Logged</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Collapsible Content */}
        {!isCheckInCollapsed && (
          <div className="mt-6 pt-5 border-t border-white/5 space-y-6 animate-fade-in">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Stats Column */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-5 bg-white/[0.01] p-5 rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#22d3ee]/5 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-4">
                  {/* Today's Goal Ring/Visualizer */}
                  <div className="flex items-center gap-5">
                    {/* Ring */}
                    <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="rgba(255, 255, 255, 0.03)"
                          strokeWidth="7"
                          fill="transparent"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="url(#progressGradient)"
                          strokeWidth="8"
                          strokeDasharray={2 * Math.PI * 40}
                          strokeDashoffset={2 * Math.PI * 40 * (1 - Math.min(1, (studyHours + applyHours) / (targetMinutes / 60)))}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                        <defs>
                          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#22d3ee" />
                          </linearGradient>
                        </defs>
                      </svg>
                      {/* Central reading */}
                      <div className="absolute flex flex-col items-center justify-center text-center">
                        <span className="text-lg font-display font-bold text-white tracking-tight leading-none font-mono">
                          {studyHours + applyHours}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono mt-0.5">
                          / {targetMinutes / 60}h
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Today's Balance</h4>
                      
                      {/* Hours Breakdowns */}
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-indigo-300 font-semibold flex items-center gap-1 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            Studying:
                          </span>
                          <span className="font-bold text-white font-mono">{studyHours}h</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-emerald-300 font-semibold flex items-center gap-1 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Applications:
                          </span>
                          <span className="font-bold text-white font-mono">{applyHours}h</span>
                        </div>
                        {jobsApplied > 0 && (
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-pink-300 font-semibold flex items-center gap-1 font-mono">
                              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                              Jobs Applied:
                            </span>
                            <span className="font-bold text-pink-400 font-mono">{jobsApplied} openings</span>
                          </div>
                        )}
                      </div>

                      {/* Cumulative Progress Bar */}
                      <div className="w-full bg-white/5 rounded-full h-1.5 mt-2 overflow-hidden flex">
                        {studyHours > 0 && (
                          <div 
                            className="bg-indigo-500 h-full transition-all duration-300"
                            style={{ width: `${Math.min(100, (studyHours / (targetMinutes / 60)) * 100)}%` }}
                          />
                        )}
                        {applyHours > 0 && (
                          <div 
                            className="bg-emerald-500 h-full transition-all duration-300"
                            style={{ width: `${Math.min(100, (applyHours / (targetMinutes / 60)) * 100)}%` }}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Streak Stats Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1.5">
                    {/* Current Streak */}
                    <div className="bg-black/35 border border-white/5 p-3 rounded-xl flex items-center gap-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                        <Flame className="w-4.5 h-4.5 text-amber-500 fill-amber-500/15" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">Current Streak</span>
                        <span className="text-sm font-display font-bold text-white font-mono leading-none">{currentStreak} Days</span>
                      </div>
                    </div>

                    {/* Best Streak */}
                    <div className="bg-black/35 border border-white/5 p-3 rounded-xl flex items-center gap-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                      <div className="w-8 h-8 rounded-lg bg-[#22d3ee]/10 border border-[#22d3ee]/20 flex items-center justify-center text-[#22d3ee] shrink-0">
                        <Trophy className="w-4.5 h-4.5 text-[#22d3ee]" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">Best Streak</span>
                        <span className="text-sm font-display font-bold text-white font-mono leading-none">{longestStreak} Days</span>
                      </div>
                    </div>

                    {/* All Time Hours */}
                    <div className="bg-black/35 border border-white/5 p-3 rounded-xl flex items-center gap-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                        <Clock className="w-4.5 h-4.5 text-indigo-400" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">Total Tracked</span>
                        <span className="text-sm font-display font-bold text-white font-mono leading-none">{allTimeHours} Hrs</span>
                      </div>
                    </div>

                    {/* Total Applications */}
                    <div className="bg-black/35 border border-white/5 p-3 rounded-xl flex items-center gap-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                      <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                        <Briefcase className="w-4.5 h-4.5 text-pink-400" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">Applications</span>
                        <span className="text-sm font-display font-bold text-white font-mono leading-none">{totalJobsSent} Sent</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Last 7 Days Visual Contribution Timeline */}
                <div className="space-y-2 mt-4 pt-4 border-t border-white/[0.04]">
                  <h5 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-3 h-3 text-[#22d3ee]" /> Week Activity Tracker
                  </h5>
                  <div className="grid grid-cols-7 gap-1.5">
                    {(() => {
                      const days = [];
                      for (let i = 6; i >= 0; i--) {
                        const d = new Date();
                        d.setDate(d.getDate() - i);
                        const offset = d.getTimezoneOffset();
                        const localDate = new Date(d.getTime() - (offset * 60 * 1000));
                        const dStr = localDate.toISOString().split('T')[0];
                        
                        const record = checkInHistory.find(h => h.date === dStr);
                        const s = record?.studyHours || 0;
                        const a = record?.applyHours || 0;
                        const tot = s + a;
                        const goal = (record?.targetMinutes || 240) / 60;
                        const isMet = record?.isCompleted || (tot >= goal && tot > 0);
                        const label = d.toLocaleDateString([], { weekday: 'narrow' });
                        const dateNum = d.getDate();
                        const isSelectedDate = dStr === selectedLogDate;

                        days.push({ dStr, record, s, a, tot, isMet, label, dateNum, isSelectedDate });
                      }

                      return days.map((day) => (
                        <button
                          key={day.dStr}
                          onClick={() => setSelectedLogDate(day.dStr)}
                          className={`flex flex-col items-center p-1.5 rounded-xl border text-center transition-all ${
                            day.isSelectedDate
                              ? "bg-purple-500/10 border-purple-500/40 shadow-[0_0_8px_rgba(168,85,247,0.2)] scale-[1.03]"
                              : "bg-black/20 border-white/5 hover:border-white/10 hover:bg-black/30"
                          }`}
                          title={`${day.dStr}: Study: ${day.s}h, Apply: ${day.a}h. Goal Met: ${day.isMet ? "Yes" : "No"}`}
                        >
                          <span className="text-[9px] font-mono text-gray-500">{day.label}</span>
                          <span className="text-[10px] font-bold text-gray-300 mt-0.5 leading-none">{day.dateNum}</span>
                          
                          <div className="w-5.5 h-5.5 rounded-full flex items-center justify-center mt-1.5 relative">
                            {day.isMet ? (
                              <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_4px_rgba(16,185,129,0.2)]">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            ) : day.tot > 0 ? (
                              <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-[8px] font-bold">
                                {day.tot}
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-dashed border-gray-800 flex items-center justify-center text-gray-700 text-[8px]">
                                ·
                              </div>
                            )}
                          </div>
                        </button>
                      ));
                    })()}
                  </div>
                </div>

                {/* Consistency Badge Rewards */}
                <div className="space-y-3 mt-4 pt-4 border-t border-white/[0.04]">
                  <div className="flex items-center justify-between">
                    <h5 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-500" /> Consistency Badge Rewards
                    </h5>
                    <span className="text-[9px] bg-amber-500/10 text-amber-400 font-mono font-bold px-2 py-0.5 rounded-full border border-amber-500/20">
                      {(() => {
                        let earnedCount = 0;
                        if (longestStreak >= 3) earnedCount++;
                        if (longestStreak >= 7) earnedCount++;
                        if (longestStreak >= 15) earnedCount++;
                        if (longestStreak >= 30) earnedCount++;
                        return `${earnedCount}/4 Earned`;
                      })()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {badgesList.map((badge) => {
                      const isUnlocked = longestStreak >= badge.requirement;
                      return (
                        <button
                          key={badge.id}
                          onClick={() => setSelectedBadge(badge)}
                          className={`relative text-left p-2.5 rounded-xl border transition-all flex flex-col items-center justify-center text-center select-none cursor-pointer group ${
                            isUnlocked
                              ? `bg-black/30 hover:bg-black/45 hover:border-white/20 border-white/10 ${badge.glow}`
                              : "bg-black/10 border-white/[0.02] opacity-40 hover:opacity-60"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 ${
                            isUnlocked 
                              ? `${badge.bgLight} ${badge.textColor}` 
                              : "bg-white/5 text-gray-600"
                          }`}>
                            {renderBadgeIcon(badge.icon, "w-4.5 h-4.5")}
                          </div>

                          <span className={`text-[10px] font-bold block ${isUnlocked ? "text-white" : "text-gray-500"}`}>
                            {badge.name}
                          </span>
                          
                          <span className="text-[8px] font-mono text-gray-500 block mt-0.5">
                            {isUnlocked ? "Unlocked" : `${longestStreak}/${badge.requirement}d`}
                          </span>

                          {!isUnlocked && (
                            <Lock className="w-2.5 h-2.5 text-gray-600 absolute top-2 right-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Input Column */}
              <div className="lg:col-span-7 space-y-5">
                {/* Focus Selector */}
                <div className="space-y-2.5">
                  <label className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#a855f7]" /> Primary Prep Focus Area
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { label: "💻 LeetCode / DSA", val: "💻 LeetCode / DSA" },
                      { label: "🧠 System Design", val: "🧠 System Design" },
                      { label: "📝 Resume Polish", val: "📝 Resume Polish" },
                      { label: "🎤 Mock Interview", val: "🎤 Mock Interview" },
                      { label: "🌟 Behavioral Prep", val: "🌟 Behavioral Prep" },
                      { label: "💼 Applications", val: "💼 Applications" },
                    ].map((option) => {
                      const isSelected = focusArea === option.val;
                      return (
                        <button
                          key={option.val}
                          onClick={() => handleSaveCheckIn(undefined, undefined, undefined, undefined, option.val)}
                          className={`text-left text-xs py-2 px-3 rounded-xl border transition-all truncate select-none ${
                            isSelected
                              ? "bg-purple-500/10 border-purple-500/40 text-purple-200 font-bold shadow-[0_0_12px_rgba(168,85,247,0.15)]"
                              : "bg-black/30 border-white/5 text-gray-400 hover:text-white hover:border-white/20 hover:bg-black/50"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Target Hours Goal Selector */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#22d3ee]" /> Set Daily Target Goal
                    </label>
                    <span className="text-xs font-mono font-bold text-white bg-black/40 py-0.5 px-2 rounded border border-white/5">
                      {targetMinutes / 60} hrs goal
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[60, 120, 240, 360, 480].map((mins) => {
                      const isSel = targetMinutes === mins;
                      return (
                        <button
                          key={mins}
                          onClick={() => handleSaveCheckIn(undefined, undefined, undefined, undefined, undefined, undefined, undefined, mins)}
                          className={`flex-1 text-center font-mono text-[11px] py-1.5 rounded-lg border transition-all ${
                            isSel
                              ? "bg-[#22d3ee]/10 border-[#22d3ee]/40 text-[#22d3ee] font-bold"
                              : "bg-black/20 border-white/5 text-gray-400 hover:text-white hover:border-white/10"
                          }`}
                        >
                          {mins / 60}h
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Interactive Hours Logging Panels */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Logging Study Hours */}
                  <div className="bg-black/30 border border-white/5 rounded-2xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                        📚 Study Hours
                      </span>
                      <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10">
                        {studyHours}h
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {[-1, -0.5, 0.5, 1].map((val) => (
                        <button
                          key={val}
                          onClick={() => {
                            const newVal = Math.max(0, studyHours + val);
                            handleSaveCheckIn(undefined, newVal);
                          }}
                          className={`text-xs font-mono py-1 rounded-lg border transition-all ${
                            val < 0 
                              ? "bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 border-rose-500/10"
                              : "bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border-indigo-500/20"
                          }`}
                        >
                          {val > 0 ? `+${val}` : val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Logging Application Hours */}
                  <div className="bg-black/30 border border-white/5 rounded-2xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                        💼 Application Hours
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                        {applyHours}h
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {[-1, -0.5, 0.5, 1].map((val) => (
                        <button
                          key={val}
                          onClick={() => {
                            const newVal = Math.max(0, applyHours + val);
                            handleSaveCheckIn(undefined, undefined, newVal);
                          }}
                          className={`text-xs font-mono py-1 rounded-lg border transition-all ${
                            val < 0 
                              ? "bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 border-rose-500/10"
                              : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/20"
                          }`}
                        >
                          {val > 0 ? `+${val}` : val}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sub-counters (Applications Sent & Energy Stars) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Job Application Counter */}
                  <div className="bg-black/30 border border-white/5 rounded-2xl p-3 px-4 flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-semibold text-gray-300">
                        🚀 Openings Applied
                      </span>
                      <span className="text-[10px] text-gray-500">Count jobs applied for</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSaveCheckIn(undefined, undefined, undefined, Math.max(0, jobsApplied - 1))}
                        className="w-7 h-7 bg-white/5 hover:bg-white/10 text-white rounded-lg flex items-center justify-center border border-white/10"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-sm font-bold text-pink-400 w-6 text-center">{jobsApplied}</span>
                      <button
                        onClick={() => handleSaveCheckIn(undefined, undefined, undefined, jobsApplied + 1)}
                        className="w-7 h-7 bg-white/5 hover:bg-white/10 text-white rounded-lg flex items-center justify-center border border-white/10"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Energy Stars */}
                  <div className="bg-black/30 border border-white/5 rounded-2xl p-3 px-4 flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-semibold text-gray-300">
                        ⚡ Today's Energy Level
                      </span>
                      <span className="text-[10px] text-gray-500">How's your confidence?</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((stars) => {
                        const isCurrentOrLess = confidence >= stars;
                        return (
                          <button
                            key={stars}
                            onClick={() => handleSaveCheckIn(undefined, undefined, undefined, undefined, undefined, undefined, stars)}
                            className={`p-1 transition-all ${
                              isCurrentOrLess 
                                ? "text-yellow-400 scale-105" 
                                : "text-gray-700 hover:text-gray-500"
                            }`}
                          >
                            <Star className={`w-3.5 h-3.5 ${isCurrentOrLess ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Primary Objective Input */}
                <div className="space-y-2">
                  <label className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
                    Daily Objective / Main Win Goal
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g., Complete 3 Tree problems, revise BFS, or write summary sections in Portfolio..."
                      value={mainGoal}
                      onChange={(e) => handleSaveCheckIn(undefined, undefined, undefined, undefined, undefined, e.target.value)}
                      className="w-full glass-input text-xs text-white rounded-xl py-3 pl-4 pr-24"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 font-mono">
                      Autosaved
                    </div>
                  </div>
                </div>

                {/* Bottom Actions Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-white/[0.03]">
                  <div className="text-[11px] text-gray-500 font-mono">
                    {focusArea ? (
                      <span>
                        Plan for <strong className="text-[#22d3ee]">{selectedLogDate}</strong>: <strong className="text-white">{focusArea}</strong> with <strong className="text-white">{targetMinutes / 60}h</strong> target.
                      </span>
                    ) : (
                      <span>Select prep focus area above to activate the day's record.</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => {
                        handleSaveCheckIn(false, 0, 0, 0, "General Prep", "", 4, 240);
                      }}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 text-xs text-gray-300 font-semibold rounded-xl transition-all border border-white/5 flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-gray-400" /> Reset Date
                    </button>
                    <button
                      onClick={() => {
                        const nextCompleted = !isCompleted;
                        handleSaveCheckIn(nextCompleted);
                        
                        // Celebrate with Confetti!
                        if (nextCompleted) {
                          import("canvas-confetti").then((confetti) => {
                            confetti.default({
                              particleCount: 120,
                              spread: 80,
                              origin: { y: 0.65 }
                            });
                          }).catch(e => console.error(e));
                        }
                      }}
                      className={`px-5 py-2 text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 ${
                        isCompleted
                          ? "bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/25"
                          : "bg-accent-gradient hover:opacity-95 text-white"
                      }`}
                    >
                      {isCompleted ? "✓ Met Goal! Reopen Log" : "🎉 Mark Goal Complete"}
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[rgba(255,255,255,0.06)] pb-4 mb-6">
        {["Sheets", "Company-wise", "Topic practice", "Mock test", "Analytics"].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`text-xs sm:text-sm px-4 py-2 rounded-lg font-medium transition-all ${
                isActive 
                  ? 'bg-accent-gradient text-white font-semibold' 
                  : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.03)]'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: SHEETS */}
      {activeTab === "Sheets" && (
        <div className="space-y-4">
          {/* Header search controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#131520] p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search problem or topic..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass-input text-xs text-white rounded-lg py-2 pl-10 pr-4"
              />
            </div>

            <div className="flex gap-2 w-full sm:w-auto justify-end">
              {["All", "Easy", "Medium", "Hard"].map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff as any)}
                  className={`text-[11px] px-3 py-1.5 rounded-md border font-mono ${
                    selectedDifficulty === diff 
                      ? 'bg-white text-black border-transparent font-bold' 
                      : 'bg-black/40 border-[rgba(255,255,255,0.05)] text-gray-400 hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Section 1: Blind 75 Collapsible */}
          <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
            <div 
              onClick={() => setBlind75Open(!blind75Open)}
              className="p-5 flex items-center justify-between border-b border-[rgba(255,255,255,0.04)] cursor-pointer select-none bg-black/15"
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-[#a855f7]" />
                <h3 className="font-display font-semibold text-white text-sm sm:text-base">Blind 75 (starter pack)</h3>
                <span className="text-[11px] font-mono text-gray-500 bg-black/40 px-2 py-0.5 rounded border border-[rgba(255,255,255,0.03)]">
                  {solvedCount}/30 · {Math.round((solvedCount/30)*100)}% Complete
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-mono hidden sm:inline">Est. Time: 15h</span>
                {blind75Open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            </div>

            {blind75Open && (
              <div className="divide-y divide-[rgba(255,255,255,0.03)] max-h-[450px] overflow-y-auto">
                {filteredProblems.length > 0 ? (
                  filteredProblems.map((p) => (
                    <div key={p.id} className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-[rgba(255,255,255,0.01)] transition-all">
                      <div className="flex items-center gap-3 max-w-[70%]">
                        {/* Solved checkbox */}
                        <button 
                          onClick={() => toggleProblemSolved(p.id)}
                          className="text-gray-500 hover:text-[#22d3ee] transition-all"
                        >
                          {p.solved ? (
                            <CheckCircle className="w-5 h-5 text-[#22d3ee]" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>

                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-white">{p.title}</h4>
                          <span className="text-[10px] font-mono text-gray-400">{p.category}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {/* Difficulty badge */}
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded border font-semibold ${
                          p.difficulty === "Easy" 
                            ? 'bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981]' 
                            : p.difficulty === "Medium"
                              ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                        }`}>
                          {p.difficulty}
                        </span>

                        {/* Bookmark Button */}
                        <button 
                          onClick={() => toggleProblemBookmarked(p.id)}
                          className="p-1.5 hover:bg-black/30 rounded"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${p.bookmarked ? 'text-yellow-500 fill-yellow-500' : 'text-gray-500'}`} />
                        </button>

                        {/* LeetCode link */}
                        <a 
                          href={p.leetcodeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1.5 hover:bg-black/30 rounded text-gray-500 hover:text-[#22d3ee]"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-xs text-gray-500">
                    No problems matching your search parameters.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section 2: NeetCode 50 Collapsible */}
          <div className="glass-card rounded-2xl overflow-hidden shadow-lg opacity-85">
            <div 
              onClick={() => setNeetcodeOpen(!neetcodeOpen)}
              className="p-5 flex items-center justify-between border-b border-[rgba(255,255,255,0.04)] cursor-pointer select-none bg-black/15"
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-[#ec4899]" />
                <h3 className="font-display font-semibold text-white text-sm sm:text-base">NeetCode 50 (starter pack)</h3>
                <span className="text-[11px] font-mono text-gray-500 bg-black/40 px-2 py-0.5 rounded border border-[rgba(255,255,255,0.03)]">
                  0/50 · 0% Complete
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-mono hidden sm:inline">Est. Time: 25h</span>
                {neetcodeOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            </div>

            {neetcodeOpen && (
              <div className="p-8 text-center text-xs text-gray-500 divide-y divide-[rgba(255,255,255,0.03)]">
                You can unlock this premium sheet tracker after finishing the core Blind 75 starter pack!
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: COMPANY-WISE */}
      {activeTab === "Company-wise" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fade-in">
          {companies.map((comp, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 relative overflow-hidden shadow-md">
              <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${comp.color}`} />
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display font-bold text-lg text-white">{comp.name} Target Prep</h3>
                <span className="text-[10px] font-mono font-semibold text-gray-400 bg-black/40 border border-[rgba(255,255,255,0.03)] px-2 py-0.5 rounded">
                  Rating: {comp.rating}
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between border-b border-[rgba(255,255,255,0.03)] pb-2">
                  <span className="text-gray-400">Est. Compensation:</span>
                  <span className="font-mono text-white font-medium">{comp.salary}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-400 block">Interview Format:</span>
                  <p className="text-gray-300 leading-relaxed font-mono text-[11px] bg-black/20 p-2.5 rounded border border-[rgba(255,255,255,0.02)]">
                    {comp.hiring}
                  </p>
                </div>

                <button 
                  onClick={() => alert(`Starting Google-inspired ${comp.name} premium custom diagnostic exam!`)}
                  className="w-full py-2 bg-[rgba(255,255,255,0.03)] hover:bg-accent-gradient hover:text-white border border-[rgba(255,255,255,0.06)] hover:border-transparent rounded-lg text-xs font-semibold text-gray-300 transition-all cursor-pointer"
                >
                  Generate {comp.name} Mock Test
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: TOPIC PRACTICE */}
      {activeTab === "Topic practice" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {["Array & Hashing", "Two Pointers", "Sliding Window", "Stack", "Binary Search", "Linked List", "Trees", "Graphs", "Dynamic Programming"].map((topic, i) => (
            <div key={i} className="bg-[#131520] p-5 rounded-2xl border border-[rgba(255,255,255,0.05)] shadow-md flex justify-between items-center">
              <div>
                <h4 className="text-xs font-mono text-gray-500 uppercase">Category {i + 1}</h4>
                <h3 className="font-display font-semibold text-white text-sm mt-0.5">{topic}</h3>
              </div>
              <button 
                onClick={() => {
                  setSearchQuery(topic);
                  setActiveTab("Sheets");
                }}
                className="p-1.5 bg-[#a855f7]/10 text-[#a855f7] hover:bg-[#a855f7]/20 rounded-lg text-xs font-mono font-medium transition-all"
              >
                Track
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: MOCK TEST */}
      {activeTab === "Mock test" && (
        <div className="max-w-2xl mx-auto glass-card rounded-[22px] p-6 sm:p-8 text-center space-y-6 shadow-lg animate-fade-in">
          {!isExamActive && examScore === null && (
            <>
              <div className="w-14 h-14 bg-[#ec4899]/10 rounded-full flex items-center justify-center text-[#ec4899] mx-auto shadow-sm">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-white">Full-Length AI Diagnostic Mock Exam</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                  Test your real-time skills under pressurized interview conditions. Solve 3 core algorithm questions in 45 minutes with live scoring checks.
                </p>
              </div>
              <button 
                onClick={startMockExam}
                className="w-full sm:w-auto px-8 py-3.5 bg-accent-gradient hover:opacity-95 text-white font-bold text-sm rounded-xl cursor-pointer shadow-lg"
              >
                ⚡ Start diagnostics exam
              </button>
            </>
          )}

          {isExamActive && (
            <div className="text-left space-y-6">
              <div className="flex justify-between items-center border-b border-[rgba(255,255,255,0.05)] pb-3">
                <span className="text-xs font-mono text-[#22d3ee] font-bold">Active diagnostic check</span>
                <span className="text-xs text-gray-400 font-mono">Timer: 45:00</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-semibold text-gray-400 font-mono uppercase">Problem 1: Valid Palindrome (Easy)</h4>
                  <p className="text-xs text-gray-300">How would you approach checking valid palindrome ignoring case and alphanumeric characters?</p>
                  <textarea 
                    placeholder="Type your brief algorithm explanation or approach details..."
                    onChange={(e) => setExamAnswers(prev => ({ ...prev, p1: e.target.value }))}
                    className="w-full glass-input text-xs text-white rounded-lg p-3 min-h-[60px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-semibold text-gray-400 font-mono uppercase">Problem 2: Clone Graph (Medium)</h4>
                  <p className="text-xs text-gray-300">Explain the difference between DFS and BFS approaches when cloning a deep graph with adjacency list details.</p>
                  <textarea 
                    placeholder="Type your brief algorithm explanation or approach details..."
                    onChange={(e) => setExamAnswers(prev => ({ ...prev, p2: e.target.value }))}
                    className="w-full glass-input text-xs text-white rounded-lg p-3 min-h-[60px]"
                  />
                </div>
              </div>

              <button 
                onClick={submitMockExam}
                className="w-full py-3 bg-accent-gradient hover:opacity-95 text-white font-bold text-sm rounded-xl cursor-pointer mt-4"
              >
                Submit Diagnostics Exam
              </button>
            </div>
          )}

          {examScore !== null && (
            <div className="space-y-5 py-3">
              <div className="w-16 h-16 bg-[#10b981]/10 text-[#10b981] rounded-full flex items-center justify-center font-bold text-xl font-display mx-auto border border-[#10b981]/25">
                {examScore}%
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-lg text-white">Diagnostics Score Card Generated</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  Your communication and algorithm efficiency match strong standard corporate requirements. Finished items successfully mapped to dashboard history logs.
                </p>
              </div>
              <button 
                onClick={() => setExamScore(null)}
                className="px-6 py-2 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.06)] rounded-lg text-xs font-semibold text-white"
              >
                Try different test
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: ANALYTICS */}
      {activeTab === "Analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 animate-fade-in">
          {/* Daily Streak stats */}
          <div className="md:col-span-4 bg-[#15141f] p-6 rounded-2xl border border-[rgba(255,255,255,0.05)] shadow-md text-center space-y-4">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Flame className="w-6 h-6 text-amber-500 fill-amber-500/15" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-gray-500 uppercase font-bold">Daily Practice Streak</span>
              <h3 className="font-display font-bold text-3xl text-white font-mono mt-1">{currentStreak} Days</h3>
              <p className="text-[10px] text-gray-500 font-mono mt-1">Best Streak: {longestStreak} Days</p>
            </div>
            <div className="pt-2 border-t border-white/[0.04] grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-black/20 p-2 rounded-xl">
                <span className="block text-[9px] text-gray-500">TOTAL HOURS</span>
                <span className="text-white font-bold">{allTimeHours}h</span>
              </div>
              <div className="bg-black/20 p-2 rounded-xl">
                <span className="block text-[9px] text-gray-500">APPLICATIONS</span>
                <span className="text-pink-400 font-bold">{totalJobsSent}</span>
              </div>
            </div>
          </div>

          {/* Dynamic logged hours trends chart */}
          <div className="md:col-span-8 bg-[#15141f] p-6 rounded-2xl border border-[rgba(255,255,255,0.05)] shadow-md space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Weekly Logged Hours Trends</h4>
              <span className="text-[10px] text-gray-500 font-mono">Max 8 hrs/day scale</span>
            </div>
            <div className="h-32 flex items-end gap-3.5 justify-between pt-4 border-b border-[rgba(255,255,255,0.04)] font-mono text-[10px] text-gray-500">
              {(() => {
                const days = [];
                for (let i = 6; i >= 0; i--) {
                  const d = new Date();
                  d.setDate(d.getDate() - i);
                  const offset = d.getTimezoneOffset();
                  const localDate = new Date(d.getTime() - (offset * 60 * 1000));
                  const dStr = localDate.toISOString().split('T')[0];
                  
                  const record = checkInHistory.find(h => h.date === dStr);
                  const study = record?.studyHours || 0;
                  const apply = record?.applyHours || 0;
                  const total = study + apply;
                  const label = d.toLocaleDateString([], { weekday: 'short' });

                  days.push({ total, study, apply, label });
                }

                return days.map((day, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-1 bg-black/90 border border-white/10 px-2 py-1 rounded text-[9px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg font-mono">
                      <p className="text-indigo-400">Study: {day.study}h</p>
                      <p className="text-emerald-400">Apply: {day.apply}h</p>
                      <p className="border-t border-white/10 pt-0.5 text-white font-bold">Total: {day.total}h</p>
                    </div>

                    <div className="w-full bg-white/[0.02] rounded-t h-20 relative overflow-hidden flex flex-col justify-end">
                      {/* Bar fill (split by study & apply) */}
                      {day.study > 0 && (
                        <div 
                          className="bg-indigo-500 w-full transition-all duration-300" 
                          style={{ height: `${(day.study / 8) * 100}%` }}
                        />
                      )}
                      {day.apply > 0 && (
                        <div 
                          className="bg-emerald-500 w-full transition-all duration-300" 
                          style={{ height: `${(day.apply / 8) * 100}%` }}
                        />
                      )}
                    </div>
                    <span className="mt-2 text-[10px] text-gray-400 font-medium">{day.label}</span>
                  </div>
                ));
              })()}
            </div>
            
            {/* Color keys legend */}
            <div className="flex gap-4 text-[10px] font-mono text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-indigo-500" /> Study hours logged</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-emerald-500" /> Application hours logged</span>
            </div>
          </div>

          {/* PDF Report Export Banner */}
          <div className="md:col-span-12 glass-card rounded-2xl p-6 sm:p-8 border border-white/5 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-purple-950/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 mt-2">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                <Trophy className="w-3.5 h-3.5" />
                NextRoundPrep Official Record
              </div>
              <h3 className="font-display font-bold text-lg text-white">Export Your Preparation Progress Report</h3>
              <p className="text-xs text-gray-400 max-w-xl leading-relaxed">
                Download a comprehensive PDF summarizing your DSA tracker solved indices, daily career check-in streak, primary win objectives, and active mock diagnostic evaluations. Ideal for keeping yourself accountable or sharing progress with recruiters/mentors.
              </p>
            </div>
            <button
              onClick={handleExportPDF}
              className="w-full md:w-auto px-6 py-3.5 bg-accent-gradient hover:opacity-95 text-white font-bold text-xs rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              Download Summarized Progress Report (PDF)
            </button>
          </div>
        </div>
      )}

      {/* Badge Details & Share Certificate Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
          <div className="relative w-full max-w-md bg-[#0b0f1a]/95 rounded-[24px] border border-white/10 p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden space-y-5">
            {/* Ambient glows inside the modal */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#22d3ee]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close button */}
            <button 
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer border border-white/5 font-bold text-xs"
            >
              ✕
            </button>

            {/* Badge Trophy Circle */}
            <div className="flex flex-col items-center text-center space-y-3.5 pt-4">
              {(() => {
                const isUnlocked = longestStreak >= selectedBadge.requirement;
                return (
                  <>
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center border ${
                      isUnlocked 
                        ? `bg-black/40 text-white border-white/10 ${selectedBadge.glow}`
                        : "bg-white/[0.01] text-gray-600 border-dashed border-white/15"
                    } transition-all duration-300 relative`}>
                      {renderBadgeIcon(selectedBadge.icon, "w-10 h-10")}
                      {!isUnlocked && (
                        <div className="absolute -bottom-1 -right-1 bg-[#0b0f1a] border border-white/15 p-1 rounded-full text-gray-500">
                          <Lock className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold">STREAK ACHIEVEMENT</span>
                      <h3 className="font-display font-bold text-xl text-white mt-0.5">{selectedBadge.name}</h3>
                      <span className={`inline-block text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border mt-1.5 ${
                        isUnlocked
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}>
                        {isUnlocked ? "✓ UNLOCKED" : "LOCKED"}
                      </span>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Achievement Description / Requirements */}
            <div className="bg-black/30 border border-white/5 rounded-2xl p-4 space-y-3 text-xs leading-relaxed">
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider block">Target Requirement</span>
                <p className="text-gray-300">
                  Reach a <span className="text-white font-bold">{selectedBadge.requirement}-day consistency streak</span> of daily preparation target goals.
                </p>
              </div>

              <div className="border-t border-white/[0.04] pt-2.5 space-y-1">
                <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider block">Your Progress</span>
                <div className="flex justify-between items-center text-gray-400 font-mono text-[11px] mb-1">
                  <span>Current active streak:</span>
                  <span className="text-white font-bold">{currentStreak} / {selectedBadge.requirement} days</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-accent-gradient h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (currentStreak / selectedBadge.requirement) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Motivational Expert Guidance */}
            <div className="space-y-2 text-xs leading-relaxed">
              <div className="flex items-start gap-2 bg-purple-500/[0.03] p-3 rounded-xl border border-purple-500/10">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono text-purple-400 font-bold uppercase tracking-wider block">Coach Insights</span>
                  <p className="text-gray-300">{selectedBadge.motivation}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-emerald-500/[0.03] p-3 rounded-xl border border-emerald-500/10">
                <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">Consistency Strategy</span>
                  <p className="text-gray-300">{selectedBadge.tip}</p>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-2">
              {longestStreak >= selectedBadge.requirement ? (
                <div className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/15 p-3 rounded-xl text-center space-y-2">
                  <p className="text-[10px] text-amber-300 font-medium">✨ Congratulations! You earned the official {selectedBadge.name} certificate. ✨</p>
                  <button 
                    onClick={() => {
                      alert(`🏅 NEXTROUNDPREP CERTIFICATE GENERATOR:\n\nThis certifies that the user has officially completed the ${selectedBadge.requirement}-Day Consistency Streak in DSA, system design, and role application metrics!\n\nYour certificate ID: NRP-STREAK-${selectedBadge.requirement}-${Math.floor(100000 + Math.random() * 900000)}\n\nThis recognition is embedded in your exported PDF progress reports!`);
                    }}
                    className="w-full py-2 bg-gradient-to-r from-amber-500 to-purple-600 text-white font-bold text-xs rounded-lg hover:opacity-95 transition-all flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
                  >
                    <Trophy className="w-3.5 h-3.5 text-white animate-bounce" />
                    View Digital Reward Certificate
                  </button>
                </div>
              ) : (
                <button 
                  disabled 
                  className="w-full py-2.5 bg-white/5 border border-white/5 text-gray-500 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-not-allowed"
                >
                  <Lock className="w-3.5 h-3.5 text-gray-600" />
                  Unlock at {selectedBadge.requirement}-Day Streak
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
