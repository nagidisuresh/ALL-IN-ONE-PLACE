import React, { useState, useEffect } from "react";
import { 
  Map, Sparkles, BookOpen, CheckSquare, Award, ExternalLink, 
  HelpCircle, CheckCircle2, Circle, Trophy, ListTodo, AlertCircle,
  ChevronRight, Check, Calendar, Lock, Flame, Zap, Target, Compass, Activity
} from "lucide-react";
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip
} from "recharts";
import { Roadmap, RoadmapStep } from "../types";
import CareerPathCanvas from "./CareerPathCanvas";
import { premadeRoadmaps } from "./premadeRoadmaps";

// Dynamic prep task generator based on selected goal and step index
const getPrepTasksForStep = (goal: string, stepIndex: number): string[] => {
  const normalizedGoal = goal.toLowerCase();
  
  if (normalizedGoal.includes("frontend")) {
    if (stepIndex === 0) {
      return [
        "Code a pixel-perfect CSS Layout using Grid/Flexbox",
        "Verify contrast ratios and ARIA landmarks for accessibility",
        "Verify fluid responsiveness under a 360px width viewport"
      ];
    } else if (stepIndex === 1) {
      return [
        "Construct a fetch utility with global try/catch error boundaries",
        "Implement Promise.all to load parallel dashboard components",
        "Audit and throttle slow REST endpoints with delay helpers"
      ];
    } else if (stepIndex === 2) {
      return [
        "Build a memoized key list and profile render counts",
        "Design a custom reuse state hook for user forms",
        "Analyze virtual DOM reconciliation in Chrome DevTools"
      ];
    } else if (stepIndex === 3) {
      return [
        "Migrate nested states to central Zustand actions",
        "Measure and optimize main bundle sizes for initial load",
        "Implement code splitting with React.lazy and Suspense"
      ];
    } else {
      return [
        "Write 3 robust click-interaction specs with Vitest or Playwright",
        "Configure automated lint checks in GitHub actions",
        "Verify site speed benchmarks to exceed 90+ Lighthouse score"
      ];
    }
  } else if (normalizedGoal.includes("backend")) {
    if (stepIndex === 0) {
      return [
        "Draft relational schemas normalized up to 3NF",
        "Validate SQL indexing speedups in live query consoles",
        "Confirm cascade triggers on deleted parent entities"
      ];
    } else if (stepIndex === 1) {
      return [
        "Build secure REST endpoints with Express & TypeScript",
        "Integrate Helmet.js middleware for safe HTTP headers",
        "Implement API rate limiting on public endpoints"
      ];
    } else if (stepIndex === 2) {
      return [
        "Verify connection pool parameters under load conditions",
        "Configure automated database backup scripts",
        "Ensure query promises are handled without blockages"
      ];
    } else if (stepIndex === 3) {
      return [
        "Configure Redis cache layers for highly fetched routes",
        "Measure backend latency metrics under high request rates",
        "Integrate a concurrent batch task processor queue"
      ];
    } else {
      return [
        "Write container builds using multi-stage Alpine Dockerfiles",
        "Establish server health routes checking database status",
        "Set up structured file logging using winston transport"
      ];
    }
  } else if (normalizedGoal.includes("full-stack") || normalizedGoal.includes("full stack")) {
    if (stepIndex === 0) {
      return [
        "Create standard shared TypeScript interfaces for payloads",
        "Validate API requests using schema parsing engines like Zod",
        "Establish dual lint-checks for front and backend folders"
      ];
    } else if (stepIndex === 1) {
      return [
        "Implement user sign-in flows using secure JWT tokens",
        "Configure cookie headers with HTTP-only and SameSite flags",
        "Build clean visual loaders during active async fetches"
      ];
    } else if (stepIndex === 2) {
      return [
        "Deploy database migrations with safe rollback mechanisms",
        "Generate presigned URLs for direct user media uploads",
        "Resolve transaction lock-ups under concurrent writes"
      ];
    } else if (stepIndex === 3) {
      return [
        "Enable real-time synchronization utilizing event relays",
        "Run build analysis for heavy client and server dependencies",
        "Monitor API routes for slow relational database query loops"
      ];
    } else {
      return [
        "Write robust end-to-end user journeys with Playwright",
        "Verify localized docker-compose environments run cleanly",
        "Integrate centralized error tracking for uncaught exceptions"
      ];
    }
  } else if (normalizedGoal.includes("data") || normalizedGoal.includes("ml") || normalizedGoal.includes("machine")) {
    if (stepIndex === 0) {
      return [
        "Clean null records and replace missing feature tags in Pandas",
        "Create distribution histograms to locate outliers",
        "Map categorical string labels to numeric vector metrics"
      ];
    } else if (stepIndex === 1) {
      return [
        "Aggregate user purchase stats using SQL multi-table JOINs",
        "Calculate rolling transaction metrics with window functions",
        "Optimize complex query layouts utilizing CTE blocks"
      ];
    } else if (stepIndex === 2) {
      return [
        "Split training splits and evaluate model cross-validation",
        "Optimize model parameters using grid search techniques",
        "Verify precision-recall curves against validation data"
      ];
    } else if (stepIndex === 3) {
      return [
        "Evaluate feature significance levels using Chi-Square tests",
        "Establish boundary ranges for statistical confidence",
        "Build clean interactive visual plots for business reporting"
      ];
    } else {
      return [
        "Package predictions inside simple FastAPI microservice endpoints",
        "Monitor prediction drift logs against production values",
        "Configure scheduling engines to update training models"
      ];
    }
  }

  // Fallback defaults
  if (stepIndex === 0) {
    return [
      "Review domain standards and master primary terms",
      "Configure standard developer environment and toolsets",
      "Draft a basic proof-of-concept demonstrating core patterns"
    ];
  } else if (stepIndex === 1) {
    return [
      "Create high-level flow diagrams mapping system components",
      "Write active mock operations with varied dummy values",
      "Map basic validation layers with default error triggers"
    ];
  } else if (stepIndex === 2) {
    return [
      "Decompose nested functions into modular classes or hooks",
      "Profile processing delays and apply memory caching",
      "Review security safeguards on incoming dynamic variables"
    ];
  } else if (stepIndex === 3) {
    return [
      "Set up global store states for tracking user preferences",
      "Run compilation analysis to strip dead imports and assets",
      "Test endpoint integration under standard network delays"
    ];
  } else {
    return [
      "Run full-scope system checks for boundary exception inputs",
      "Draft complete setup and configuration documentation",
      "Deploy finished builds to host platforms and verify telemetry"
    ];
  }
};

export default function RoadmapView() {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [timeline, setTimeline] = useState("12 weeks");
  
  // Loading & State variables
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  // Active step drawer / details view
  const [activeStepId, setActiveStepId] = useState<string | null>(null);

  // View representation tab
  const [activeRoadmapTab, setActiveRoadmapTab] = useState<"milestones" | "timeline">("milestones");

  // Track checked preparation tasks
  const [prepTasksChecked, setPrepTasksChecked] = useState<Record<string, boolean>>({});

  // Quick quiz states for milestones
  // Stores stepId: selectedOptionIndex mapping
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Load active roadmap from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("nextroundprep_active_roadmap");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.steps) {
          setRoadmap(parsed);
          setGoal(parsed.goal || parsed.title || "");
          setLevel(parsed.level || "Beginner");
          setTimeline(parsed.timeline || "12 weeks");
          if (parsed.steps.length > 0) {
            setActiveStepId(parsed.steps[0].id);
          }
        }
      } catch (e) {
        console.error("Failed to parse saved roadmap", e);
      }
    }
  }, []);

  const roleChips = [
    "Frontend Developer", 
    "Backend Developer", 
    "Full-Stack Engineer", 
    "Data Scientist", 
    "ML Engineer", 
    "Product Manager", 
    "DevOps Engineer", 
    "UX Designer", 
    "Mobile Developer"
  ];

  const handleSelectGoal = (selectedRole: string) => {
    setGoal(selectedRole);
    setErrorMessage("");
    const matched = premadeRoadmaps[selectedRole];
    if (matched) {
      setRoadmap(matched);
      localStorage.setItem("nextroundprep_active_roadmap", JSON.stringify(matched));
      if (matched.steps && matched.steps.length > 0) {
        setActiveStepId(matched.steps[0].id);
      }
      // Reset quiz states for fresh exploration
      setQuizAnswers({});
      setQuizSubmitted({});
    } else {
      // Clear roadmap if we click a custom node that requires generation
      setRoadmap(null);
      localStorage.removeItem("nextroundprep_active_roadmap");
      setActiveStepId(null);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) {
      setErrorMessage("Please specify your target goal or role.");
      return;
    }

    setIsGenerating(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/gemini/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: goal.trim(),
          level,
          timeline,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate career roadmap.");
      }

      const data: Roadmap = await response.json();
      setRoadmap(data);
      localStorage.setItem("nextroundprep_active_roadmap", JSON.stringify(data));
      if (data.steps && data.steps.length > 0) {
        setActiveStepId(data.steps[0].id);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while calling the Roadmap builder.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Confetti triggering function
  const triggerConfetti = () => {
    import("canvas-confetti").then((confetti) => {
      const duration = 3.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 28, spread: 360, ticks: 60, zIndex: 1000 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 45 * (timeLeft / duration);
        // Fire double-sided bursts
        confetti.default({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
        });
        confetti.default({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
        });
      }, 250);
    }).catch(err => {
      console.error("Failed to load canvas-confetti", err);
    });
  };

  // Checkbox toggle for roadmap steps
  const handleToggleStepCompletion = (stepId: string) => {
    if (!roadmap) return;
    
    const wasCompleted = roadmap.steps.every(step => step.completed);
    
    const updatedSteps = roadmap.steps.map(step => {
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
    
    const isCompletedNow = updatedSteps.every(step => step.completed);
    
    // Trigger confetti if we just crossed into 100% completion
    if (!wasCompleted && isCompletedNow && updatedSteps.length > 0) {
      triggerConfetti();
    }
    
    const updatedRoadmap = { ...roadmap, steps: updatedSteps };
    setRoadmap(updatedRoadmap);
    localStorage.setItem("nextroundprep_active_roadmap", JSON.stringify(updatedRoadmap));
    window.dispatchEvent(new CustomEvent("update-user-points"));
  };

  // Answer quiz for a specific step
  const handleSelectQuizOption = (stepId: string, optionIdx: number) => {
    setQuizAnswers(prev => ({ ...prev, [stepId]: optionIdx }));
    setQuizSubmitted(prev => ({ ...prev, [stepId]: true }));
  };

  // Calculate percentage progress
  const calculateProgressPercent = () => {
    if (!roadmap || roadmap.steps.length === 0) return 0;
    const completedCount = roadmap.steps.filter(step => step.completed).length;
    return Math.round((completedCount / roadmap.steps.length) * 100);
  };

  const progressPercent = calculateProgressPercent();

  return (
    <div className="w-full max-w-5xl mx-auto pt-24 pb-16 px-4">
      {/* Headings */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#131520] px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.06)] mb-4 text-xs font-mono font-medium tracking-wide">
          <Map className="w-3.5 h-3.5 text-[#ec4899]" />
          <span>🗺 Career Roadmap</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight leading-tight max-w-2xl">
          From goal to <span className="text-gradient">first offer.</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
          Tell us where you want to go. We'll build a step-by-step career path with curated theory, interactive checks, and resources — and track your progression.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Config Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-[20px] p-6 sm:p-7 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#22d3ee]/5 rounded-full filter blur-xl" />
            
            <h2 className="font-display font-bold text-lg text-white mb-1">New roadmap</h2>
            <p className="text-xs text-gray-400 mb-6">Build a hyper-personalized professional curriculum</p>

            {errorMessage && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs py-3.5 px-4 rounded-xl mb-6 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleGenerate} className="space-y-5">
              
              {/* Target Goal Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase font-mono">Your Target Goal</label>
                <input 
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full glass-input text-white rounded-[10px] py-3 px-4 text-sm"
                  disabled={isGenerating}
                />
              </div>

              {/* Suggested goal chips */}
              <div className="space-y-1.5">
                <span className="block text-[10px] font-mono text-gray-500">SUGGESTED TECH PATHWAYS</span>
                <div className="flex flex-wrap gap-1.5">
                  {roleChips.map(chip => (
                    <button
                      type="button"
                      key={chip}
                      onClick={() => handleSelectGoal(chip)}
                      className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                        goal === chip 
                          ? 'bg-accent-gradient text-white border-transparent shadow-sm' 
                          : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase font-mono">Starting Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full glass-input text-white rounded-[10px] py-2.5 px-3 text-xs"
                    disabled={isGenerating}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase font-mono">Timeline</label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full glass-input text-white rounded-[10px] py-2.5 px-3 text-xs"
                    disabled={isGenerating}
                  >
                    <option value="4 weeks">4 weeks</option>
                    <option value="8 weeks">8 weeks</option>
                    <option value="12 weeks">12 weeks</option>
                    <option value="24 weeks">24 weeks</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-accent-gradient hover:opacity-95 text-white font-bold py-3.5 px-4 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 mt-4"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Assembling Path...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate roadmap
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Visualization / Step Viewer */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Subtle 3D Career Path Visualization */}
          <CareerPathCanvas activeGoal={roadmap ? roadmap.goal : goal} onSelectGoal={handleSelectGoal} />
          
          {/* EMPTY STATE */}
          {!roadmap && (
            <div className="glass-card rounded-[20px] p-8 text-center flex flex-col items-center justify-center min-h-[180px] shadow-lg border-dashed relative">
              <div className="w-12 h-12 bg-[rgba(255,255,255,0.02)] rounded-full flex items-center justify-center text-gray-500 mb-3 border border-[rgba(255,255,255,0.04)]">
                <Map className="w-5 h-5" />
              </div>
              <p className="text-gray-300 font-display font-semibold text-sm">Select a 3D Node or Custom Goal</p>
              <p className="text-xs text-gray-500 max-w-xs mt-1">
                Click any interactive node on the 3D constellation above to instantly load a curated pathway, or configure custom specs on the left.
              </p>
            </div>
          )}

          {/* ACTIVE ROADMAP VIEW */}
          {roadmap && (
            <div className="space-y-6 animate-fade-in">
              {/* Enhanced Visual Progression Board */}
              {(() => {
                const getRankDetails = (percent: number) => {
                  if (percent === 100) {
                    return {
                      title: "Career Pathfinder Master 👑",
                      description: "Incredible effort! You have completed all milestones on this path.",
                      color: "text-emerald-400"
                    };
                  } else if (percent >= 80) {
                    return {
                      title: "Expert Strategist 🏆",
                      description: "Almost there! You are in the top tier of path progression.",
                      color: "text-purple-400"
                    };
                  } else if (percent >= 60) {
                    return {
                      title: "Advanced Specialist 🛠️",
                      description: "Fabulous depth of knowledge. Keep pushing to the final offering.",
                      color: "text-indigo-400"
                    };
                  } else if (percent >= 40) {
                    return {
                      title: "Core Practitioner ⚙️",
                      description: "You have built standard core patterns. Keep testing your skills.",
                      color: "text-[#22d3ee]"
                    };
                  } else if (percent >= 20) {
                    return {
                      title: "Apprentice Pathfinder 🚀",
                      description: "You've successfully taken your first steps. Growth lies ahead!",
                      color: "text-[#ec4899]"
                    };
                  } else {
                    return {
                      title: "Novice Explorer 🎯",
                      description: "Select your active step and check the box to start progressing.",
                      color: "text-gray-400"
                    };
                  }
                };

                const rank = getRankDetails(progressPercent);
                const totalSteps = roadmap.steps.length;
                const completedSteps = roadmap.steps.filter(step => step.completed).length;
                const quizzesCorrectCount = roadmap.steps.filter(step => {
                  const answer = quizAnswers[step.id];
                  return answer !== undefined && answer === step.quiz.correctIndex;
                }).length;

                return (
                  <div className="glass-card rounded-[22px] border border-white/5 bg-[#0b0f1a]/80 backdrop-blur-xl p-5 sm:p-6 shadow-[0_15px_30px_rgba(0,0,0,0.3)] space-y-6">
                    
                    {/* Upper stats row */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        {/* SVG Radial Circular Progress */}
                        <div className="relative shrink-0 w-16 h-16 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            {/* Background ring */}
                            <circle
                              cx="32"
                              cy="32"
                              r="26"
                              className="stroke-gray-800 fill-none"
                              strokeWidth="5"
                            />
                            {/* Foreground glowing ring */}
                            <circle
                              cx="32"
                              cy="32"
                              r="26"
                              className="stroke-[#a855f7] fill-none transition-all duration-500 ease-out"
                              strokeWidth="5"
                              strokeDasharray="163.3"
                              strokeDashoffset={163.3 - (163.3 * progressPercent) / 100}
                              strokeLinecap="round"
                            />
                          </svg>
                          {/* Inner percentage text */}
                          <span className="absolute font-display font-black text-xs text-white tracking-tighter">
                            {progressPercent}%
                          </span>
                        </div>

                        {/* Rank description and titles */}
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block font-bold">CURRENT RANK</span>
                          <h4 className={`font-display font-bold text-sm sm:text-base ${rank.color}`}>
                            {rank.title}
                          </h4>
                          <p className="text-[11px] text-gray-400 max-w-xs leading-relaxed">
                            {rank.description}
                          </p>
                          {progressPercent === 100 && (
                            <button
                              type="button"
                              onClick={triggerConfetti}
                              className="mt-2 inline-flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 py-1 px-2.5 rounded-lg text-[10px] font-mono font-bold tracking-wide transition-all shadow-md cursor-pointer select-none"
                            >
                              🎉 Celebrate Again!
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Right hand quick stats widgets */}
                      <div className="grid grid-cols-2 gap-3 w-full sm:w-auto sm:min-w-[200px]">
                        <div className="bg-black/30 border border-white/[0.03] rounded-xl p-3 text-center space-y-0.5">
                          <span className="text-[9px] font-mono text-gray-500 block uppercase">Milestones</span>
                          <span className="font-mono text-xs font-bold text-white block">
                            {completedSteps} / {totalSteps}
                          </span>
                        </div>
                        <div className="bg-black/30 border border-white/[0.03] rounded-xl p-3 text-center space-y-0.5">
                          <span className="text-[9px] font-mono text-gray-500 block uppercase">Quizzes Passed</span>
                          <span className="font-mono text-xs font-bold text-[#22d3ee] block">
                            {quizzesCorrectCount} / {totalSteps}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quest Interactive Timeline Mini-Map Track */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                          <Map className="w-3.5 h-3.5 text-[#22d3ee]" />
                          Interactive Quest Track
                        </span>
                        <span className="text-[9px] font-mono text-gray-500">Click node to navigate steps</span>
                      </div>

                      <div className="relative mt-2 px-1 py-5 bg-black/40 rounded-2xl border border-white/5">
                        {/* Background track line */}
                        <div className="absolute top-[37px] left-10 right-10 h-[3px] bg-gray-800 rounded-full">
                          <div 
                            className="h-full bg-accent-gradient transition-all duration-500"
                            style={{ 
                              width: `${
                                totalSteps > 1 
                                  ? (completedSteps / (totalSteps - 1)) * 100 
                                  : 100
                              }%` 
                            }}
                          />
                        </div>

                        {/* Nodes line */}
                        <div className="relative z-10 flex justify-between items-center px-4 sm:px-6">
                          {roadmap.steps.map((step, idx) => {
                            const isStepActive = activeStepId === step.id;
                            const isStepCompleted = step.completed;
                            const hasQuizCorrect = quizSubmitted[step.id] && quizAnswers[step.id] === step.quiz.correctIndex;

                            return (
                              <div 
                                key={step.id} 
                                onClick={() => setActiveStepId(step.id)}
                                className="flex flex-col items-center cursor-pointer select-none group relative"
                              >
                                {/* Glowing node wrapper */}
                                <div 
                                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                                    isStepActive
                                      ? "bg-[#11101c] border-2 border-[#a855f7] shadow-[0_0_12px_rgba(168,85,247,0.6)] scale-110"
                                      : isStepCompleted
                                        ? "bg-[#10b981]/10 border-2 border-[#10b981] text-[#10b981]"
                                        : "bg-[#181a26] border border-white/10 text-gray-400 group-hover:border-white/30 group-hover:text-white"
                                  }`}
                                >
                                  {isStepCompleted ? (
                                    <Check className="w-4 h-4 stroke-[3]" />
                                  ) : (
                                    <span className="font-mono text-xs font-bold">
                                      {idx + 1}
                                    </span>
                                  )}

                                  {/* Quiz completion small star dot */}
                                  {hasQuizCorrect && (
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#22d3ee] rounded-full border border-black flex items-center justify-center text-[7px] text-black font-bold">
                                      ★
                                    </span>
                                  )}
                                </div>

                                {/* Floating timeline duration */}
                                <span 
                                  className={`text-[9px] font-mono mt-2 max-w-[80px] text-center truncate ${
                                    isStepActive 
                                      ? "text-[#a855f7] font-bold" 
                                      : isStepCompleted 
                                        ? "text-[#10b981]" 
                                        : "text-gray-500"
                                  }`}
                                >
                                  {step.duration}
                                </span>

                                {/* Popup Tooltip on Hover */}
                                <div className="absolute bottom-12 scale-0 group-hover:scale-100 transition-all duration-200 origin-bottom bg-slate-900 border border-white/10 text-white rounded-lg p-2.5 text-xs w-44 shadow-xl pointer-events-none z-30">
                                  <p className="font-semibold text-white mb-0.5 truncate">{step.title}</p>
                                  <p className="text-[10px] text-gray-400 line-clamp-2 leading-snug">{step.description}</p>
                                  <div className="flex items-center gap-1.5 mt-1">
                                    <span className={`w-1.5 h-1.5 rounded-full ${isStepCompleted ? 'bg-emerald-400' : 'bg-gray-600'}`} />
                                    <span className="text-[9px] text-gray-400 uppercase tracking-wider font-mono">
                                      {isStepCompleted ? 'Completed' : 'Locked'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })()}

              {/* Tab Selector for View Types */}
              <div className="flex bg-[#131520] p-1 rounded-xl border border-white/5 w-fit">
                <button
                  type="button"
                  onClick={() => setActiveRoadmapTab("milestones")}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-2 ${
                    activeRoadmapTab === "milestones"
                      ? "bg-accent-gradient text-white shadow"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <ListTodo className="w-3.5 h-3.5" />
                  MILESTONE GUIDE
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRoadmapTab("timeline")}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-2 ${
                    activeRoadmapTab === "timeline"
                      ? "bg-accent-gradient text-white shadow"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  VERTICAL TIMELINE & PREP
                </button>
              </div>

              {activeRoadmapTab === "milestones" ? (
                /* List of Milestones */
                <div className="space-y-4">
                  {roadmap.steps.map((step, idx) => {
                    const isActive = activeStepId === step.id;
                    const hasQuizAnswered = quizSubmitted[step.id];
                    
                    return (
                      <div 
                        key={step.id} 
                        id={step.id}
                        className={`glass-card rounded-[18px] transition-all duration-200 overflow-hidden ${
                          isActive 
                            ? 'border-[rgba(168,85,247,0.3)] bg-[rgba(21,20,31,0.95)]' 
                            : 'hover:bg-[rgba(21,20,31,0.5)]'
                        }`}
                      >
                        {/* Step Summary Row */}
                        <div 
                          onClick={() => setActiveStepId(step.id)}
                          className="p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-4">
                            {/* Check Completion Circle */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleStepCompletion(step.id);
                              }}
                              className="text-gray-500 hover:text-[#22d3ee] transition-all"
                            >
                              {step.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-[#22d3ee] fill-[#22d3ee]/10 stroke-[2.5]" />
                              ) : (
                                <Circle className="w-5 h-5 stroke-[2]" />
                              )}
                            </button>

                            <div>
                              <span className="text-[10px] font-mono text-[#ec4899] font-semibold">
                                STEP {idx + 1} • {step.duration}
                              </span>
                              <h3 className="font-display font-semibold text-sm sm:text-base text-white mt-0.5">
                                {step.title}
                              </h3>
                            </div>
                          </div>

                          <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${isActive ? 'rotate-90 text-[#a855f7]' : ''}`} />
                        </div>

                        {/* Step Details Dropdown */}
                        {isActive && (
                          <div className="px-5 pb-6 pt-1 border-t border-[rgba(255,255,255,0.03)] space-y-5 animate-fade-in">
                            {/* Short Description */}
                            <p className="text-xs text-gray-400 leading-relaxed bg-black/20 p-3 rounded-lg border border-[rgba(255,255,255,0.02)]">
                              {step.description}
                            </p>

                            {/* Theory Section */}
                            <div className="space-y-1.5">
                              <span className="text-[10px] font-mono font-semibold text-gray-400 tracking-wider uppercase flex items-center gap-1">
                                <BookOpen className="w-3 h-3 text-[#22d3ee]" />
                                Core Theory & Guidelines
                              </span>
                              <p className="text-xs text-gray-300 leading-relaxed">
                                {step.theory}
                              </p>
                            </div>

                            {/* Interactive Quick Quiz */}
                            <div className="p-4 bg-[rgba(168,85,247,0.03)] rounded-xl border border-[rgba(168,85,247,0.08)] space-y-3">
                              <span className="text-[10px] font-mono font-semibold text-[#a855f7] tracking-wider uppercase flex items-center gap-1">
                                <HelpCircle className="w-3 h-3" />
                                Quick Knowledge Check
                              </span>
                              
                              <p className="text-xs text-white font-medium">
                                {step.quiz.question}
                              </p>

                              <div className="grid grid-cols-1 gap-2">
                                {step.quiz.options.map((option, oIdx) => {
                                  const isSelected = quizAnswers[step.id] === oIdx;
                                  const isCorrect = step.quiz.correctIndex === oIdx;
                                  
                                  return (
                                    <button
                                      key={oIdx}
                                      type="button"
                                      onClick={() => handleSelectQuizOption(step.id, oIdx)}
                                      disabled={hasQuizAnswered}
                                      className={`w-full text-left text-xs p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                                        hasQuizAnswered
                                          ? isCorrect
                                            ? 'bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981] font-semibold'
                                            : isSelected
                                              ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                                              : 'bg-black/10 border-[rgba(255,255,255,0.02)] text-gray-500'
                                          : 'bg-black/30 border-[rgba(255,255,255,0.04)] text-gray-300 hover:text-white hover:bg-black/50 hover:border-[rgba(255,255,255,0.08)]'
                                      }`}
                                    >
                                      <span>{option}</span>
                                      {hasQuizAnswered && isCorrect && <Check className="w-3.5 h-3.5 text-[#10b981]" />}
                                    </button>
                                  );
                                })}
                              </div>

                              {hasQuizAnswered && (
                                <p className="text-[11px] text-[#a855f7] bg-[#a855f7]/5 p-2 rounded border border-[#a855f7]/10 leading-relaxed mt-2 font-mono">
                                  💡 <strong>Explanation:</strong> {step.quiz.explanation}
                                </p>
                              )}
                            </div>

                            {/* Curated Resources */}
                            <div className="space-y-2">
                              <span className="text-[10px] font-mono font-semibold text-gray-400 tracking-wider uppercase flex items-center gap-1">
                                <ListTodo className="w-3 h-3 text-[#ec4899]" />
                                Curated Resource Links
                              </span>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {step.resources.map((resource, rIdx) => (
                                  <a
                                    key={rIdx}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-black/40 hover:bg-black/60 border border-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.08)] rounded-xl flex items-center justify-between gap-2 group transition-all"
                                  >
                                    <div>
                                      <span className="text-[9px] font-mono font-medium text-gray-500 uppercase">{resource.type}</span>
                                      <h4 className="text-xs font-semibold text-white group-hover:text-[#22d3ee] truncate max-w-[150px] sm:max-w-[200px] mt-0.5">
                                        {resource.name}
                                      </h4>
                                    </div>
                                    <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#22d3ee] shrink-0" />
                                  </a>
                                ))}
                              </div>
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Vertical Timeline Visualization */
                (() => {
                  const completedCount = roadmap.steps.filter(step => step.completed).length;
                  const totalCount = roadmap.steps.length || 5;
                  const completionRatio = completedCount / totalCount;

                  const readinessScores = [
                    { subject: "Technical Skills", score: Math.round(40 + 55 * completionRatio), fullMark: 100 },
                    { subject: "Problem Solving", score: Math.round(35 + 55 * completionRatio), fullMark: 100 },
                    { subject: "System Design", score: Math.round(25 + 65 * completionRatio), fullMark: 100 },
                    { subject: "Portfolio & Projects", score: Math.round(30 + 65 * completionRatio), fullMark: 100 },
                    { subject: "Mock Readiness", score: Math.round(20 + 75 * completionRatio), fullMark: 100 },
                  ];

                  const getInsightForPath = (goalName: string, ratio: number) => {
                    if (ratio === 1) {
                      return `You've achieved 100% preparation readiness for ${goalName}! Complete mock interviews and resume reviews to unlock your first offers.`;
                    } else if (ratio >= 0.6) {
                      return `Excellent! You have solid foundational knowledge. Double down on portfolio projects and practice mock behavioral questions to round out your profile.`;
                    } else {
                      return `You are in the foundational stage of your ${goalName} path. Work on core theories and check off the recommended micro-tasks below to build early traction.`;
                    }
                  };

                  return (
                    <div className="space-y-6 animate-fade-in">
                      {/* Stats & Radar Chart Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Recharts Radar Chart */}
                        <div className="bg-black/40 border border-white/5 rounded-2xl p-5 space-y-4">
                          <div>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                              <Activity className="w-3.5 h-3.5 text-[#a855f7]" />
                              Preparation Readiness Radar
                            </h4>
                            <p className="text-[11px] text-gray-400 mt-0.5">Metrics scale as you check off milestones and recommended tasks.</p>
                          </div>
                          <div className="h-52 w-full flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={readinessScores}>
                                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 9, fontFamily: "monospace" }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#475569", fontSize: 8 }} />
                                <Radar name="Readiness" dataKey="score" stroke="#a855f7" fill="#a855f7" fillOpacity={0.15} />
                                <Tooltip 
                                  contentStyle={{ backgroundColor: "#11101c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                                  itemStyle={{ color: "#fff", fontSize: "10px" }}
                                />
                              </RadarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Dynamic Path Advisor Insight */}
                        <div className="bg-black/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                          <div className="space-y-3">
                            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 text-[10px] font-mono text-[#fbbf24] font-bold uppercase tracking-wider">
                              <Compass className="w-3 h-3 text-[#fbbf24]" />
                              AI PATH ADVISOR
                            </div>
                            <h4 className="text-sm font-bold text-white font-display">Targeting: {roadmap.goal}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">
                              {getInsightForPath(roadmap.goal, completionRatio)}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-white/5 space-y-2">
                            <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                              <span>Milestone completion rate:</span>
                              <span className="text-white font-bold">{completedCount} / {totalCount} ({Math.round(completionRatio * 100)}%)</span>
                            </div>
                            <div className="w-full bg-[#181a26] h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-accent-gradient h-full transition-all duration-500"
                                style={{ width: `${completionRatio * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Vertical Timeline container */}
                      <div className="relative pl-2 sm:pl-4 space-y-8 pt-2">
                        {/* Vertical timeline connector line */}
                        <div className="absolute left-[21px] sm:left-[25px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#a855f7]/40 via-[#22d3ee]/20 to-gray-800" />

                        {roadmap.steps.map((step, idx) => {
                          const isCompleted = step.completed;
                          const isActiveFocus = !isCompleted && (idx === 0 || roadmap.steps.slice(0, idx).every(s => s.completed));
                          const isLocked = !isCompleted && !isActiveFocus;
                          
                          const suggestedTasks = getPrepTasksForStep(roadmap.goal, idx);
                          
                          // Count checked tasks for this step
                          const stepCheckedCount = suggestedTasks.filter((_, tIdx) => 
                            prepTasksChecked[`${step.id}-task-${tIdx}`]
                          ).length;
                          
                          const allTasksDone = stepCheckedCount === suggestedTasks.length;

                          return (
                            <div key={step.id} className="relative pl-10 sm:pl-12 transition-all duration-300">
                              
                              {/* Timeline node icon indicator */}
                              <div className={`absolute left-0 top-1.5 w-11 h-11 rounded-full flex items-center justify-center transition-all z-10 ${
                                isCompleted 
                                  ? "bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]" 
                                  : isActiveFocus
                                    ? "bg-amber-500/10 border-2 border-[#fbbf24] text-[#fbbf24] shadow-[0_0_15px_rgba(245,158,11,0.35)] animate-pulse"
                                    : "bg-[#0d0f1a] border border-white/10 text-gray-600"
                              }`}>
                                {isCompleted ? (
                                  <Check className="w-5 h-5 stroke-[2.5]" />
                                ) : isActiveFocus ? (
                                  <Flame className="w-5 h-5 fill-amber-500/20" />
                                ) : (
                                  <Lock className="w-4 h-4" />
                                )}
                              </div>

                              {/* Content Card */}
                              <div className={`glass-card rounded-[20px] p-5 sm:p-6 transition-all duration-300 border ${
                                isActiveFocus 
                                  ? "border-[#fbbf24]/30 bg-[#16120e]/60" 
                                  : isCompleted 
                                    ? "border-emerald-500/20 bg-[#0d1612]/30" 
                                    : "border-white/5 bg-black/25 opacity-70"
                              }`}>
                                
                                {/* Card Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.04] pb-4 mb-4">
                                  <div>
                                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold">
                                      {step.duration} • MILESTONE {idx + 1}
                                    </span>
                                    <h3 className="text-sm sm:text-base font-bold text-white font-display mt-0.5">
                                      {step.title}
                                    </h3>
                                  </div>
                                  <div>
                                    {isCompleted ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                                        ✓ COMPLETED
                                      </span>
                                    ) : isActiveFocus ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#fbbf24] bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 animate-pulse">
                                        ⚡ ACTIVE FOCUS
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-gray-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                                        🔒 LOCKED
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                                  {step.description}
                                </p>

                                {/* Suggested Tasks Panel */}
                                <div className="bg-black/35 border border-white/[0.03] rounded-xl p-4 space-y-3.5">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                                      <Target className="w-3.5 h-3.5 text-[#22d3ee]" />
                                      RECOMMENDED PREP CHECKLIST
                                    </span>
                                    <span className="text-[10px] font-mono text-gray-400">
                                      Task progress: <strong className="text-white">{stepCheckedCount} / {suggestedTasks.length}</strong>
                                    </span>
                                  </div>

                                  {/* Small tasks progress bar */}
                                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-gradient-to-r from-[#22d3ee] to-[#a855f7] transition-all duration-300"
                                      style={{ width: `${(stepCheckedCount / suggestedTasks.length) * 100}%` }}
                                    />
                                  </div>

                                  {/* Checklist Items */}
                                  <div className="space-y-2 pt-1">
                                    {suggestedTasks.map((task, tIdx) => {
                                      const taskKey = `${step.id}-task-${tIdx}`;
                                      const isChecked = !!prepTasksChecked[taskKey];

                                      return (
                                        <label 
                                          key={tIdx}
                                          className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${
                                            isChecked 
                                              ? "bg-emerald-500/[0.02] border-emerald-500/10 text-gray-500 line-through" 
                                              : isLocked 
                                                ? "border-transparent text-gray-500 pointer-events-none"
                                                : "bg-black/20 border-white/[0.02] hover:border-white/10 text-gray-300 hover:text-white"
                                          }`}
                                        >
                                          <input 
                                            type="checkbox"
                                            checked={isChecked}
                                            disabled={isLocked}
                                            onChange={() => {
                                              setPrepTasksChecked(prev => ({
                                                ...prev,
                                                [taskKey]: !prev[taskKey]
                                              }));
                                            }}
                                            className="mt-0.5 rounded border-white/20 bg-black text-[#22d3ee] focus:ring-[#22d3ee] cursor-pointer"
                                          />
                                          <span className="text-xs leading-normal select-none">
                                            {task}
                                          </span>
                                        </label>
                                      );
                                    })}
                                  </div>

                                  {/* Phase Complete Message Banner */}
                                  {allTasksDone && !isLocked && (
                                    <div className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg flex items-center gap-1.5 animate-bounce mt-1">
                                      <span>🎉 Milestone Prep Tasks Complete! Now study the theory and pass the Quiz!</span>
                                    </div>
                                  )}
                                </div>

                                {/* Footer Action buttons */}
                                <div className="flex flex-wrap gap-2.5 justify-end mt-4">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveStepId(step.id);
                                      setActiveRoadmapTab("milestones");
                                      // Scroll slightly to let them view
                                      setTimeout(() => {
                                        const element = document.getElementById(step.id);
                                        if (element) {
                                          element.scrollIntoView({ behavior: "smooth", block: "center" });
                                        }
                                      }, 100);
                                    }}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-gray-300 hover:text-white transition-all cursor-pointer"
                                  >
                                    <BookOpen className="w-3.5 h-3.5" />
                                    <span>Read Theory & Quiz</span>
                                  </button>

                                  {!isCompleted && isActiveFocus && (
                                    <button
                                      type="button"
                                      onClick={() => handleToggleStepCompletion(step.id)}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all cursor-pointer"
                                    >
                                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                                      <span>Mark Milestone Complete</span>
                                    </button>
                                  )}
                                </div>

                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
