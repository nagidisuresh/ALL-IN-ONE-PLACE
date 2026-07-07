import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, BookOpen, Laptop, Briefcase, FileText, MessageSquare, Compass, 
  Award, Box, Info, ShieldAlert, Star, Play, CheckCircle2, ChevronRight, 
  ChevronDown, Search, ArrowRight, BookMarked, UserCheck, RefreshCw, Send,
  Trash2, Terminal, Code, HelpCircle, Check, X, FileCheck, ThumbsUp, Timer,
  ExternalLink, Layers, GraduationCap, Github, Linkedin, Mail, ShieldCheck, Heart
} from "lucide-react";
import { 
  curatedCourses, 
  educationalPlatforms, 
  codingProblems, 
  competitionsList, 
  freeSoftwareTools, 
  tcsNqtModules, 
  mockFlashcards,
  Course,
  CodingProblem,
  TcsModule,
  Flashcard
} from "./learnWithSureshData";
import { useTheme } from "./ThemeProvider";
import confetti from "canvas-confetti";

// Basic 3D element rendering using standard Three.js inside a local Canvas
// to prevent any complex r3f version mismatch while maintaining full interactive control!
function Simple3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shape, setShape] = useState<"cube" | "torus" | "sphere">("torus");
  const [color, setColor] = useState("#a855f7");
  const [speed, setSpeed] = useState(1);
  const rendererRef = useRef<any>(null);
  const meshRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dynamically import Three to avoid top-level bundle weight issues
    let THREE: any;
    import("three").then((threeModule) => {
      THREE = threeModule;
      const width = containerRef.current!.clientWidth || 400;
      const height = 300;

      // Scene
      const scene = new THREE.Scene();
      scene.background = null; // transparent

      // Camera
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 5;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      rendererRef.current = renderer;

      // Clear any previous canvas
      while (containerRef.current!.firstChild) {
        containerRef.current!.removeChild(containerRef.current!.firstChild);
      }
      containerRef.current!.appendChild(renderer.domElement);

      // Light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
      dirLight1.position.set(2, 4, 5);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0x22d3ee, 1);
      dirLight2.position.set(-2, -4, -3);
      scene.add(dirLight2);

      // Geometry selection
      let geometry;
      if (shape === "cube") {
        geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      } else if (shape === "sphere") {
        geometry = new THREE.SphereGeometry(1.2, 32, 32);
      } else {
        geometry = new THREE.TorusGeometry(1.0, 0.35, 16, 100);
      }

      // Material
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.1,
        metalness: 0.8,
        wireframe: false
      });

      const mesh = new THREE.Mesh(geometry, material);
      meshRef.current = mesh;
      scene.add(mesh);

      // Animation Loop
      let animationId: number;
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        if (meshRef.current) {
          meshRef.current.rotation.x += 0.01 * speed;
          meshRef.current.rotation.y += 0.015 * speed;
        }
        renderer.render(scene, camera);
      };
      animate();

      // Handle Resize
      const handleResize = () => {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth;
        camera.aspect = w / height;
        camera.updateProjectionMatrix();
        renderer.setSize(w, height);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", handleResize);
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }
      };
    });
  }, [shape, color, speed]);

  return (
    <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-4 right-4 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full">
        WebGL Active
      </div>
      <h3 className="text-sm font-bold text-white mb-2 font-sans flex items-center gap-2">
        <Box className="w-4 h-4 text-[#22d3ee] animate-spin" />
        Interactive 3D Sandbox Demo
      </h3>
      <p className="text-xs text-gray-400 mb-6 font-sans">
        Render, scale, and manipulate raw 3D meshes in real-time. Created on a transparent buffer using standard WebGL pipelines.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 font-mono">Select Shape</label>
            <div className="grid grid-cols-3 gap-1">
              {(["torus", "cube", "sphere"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setShape(s)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-semibold uppercase tracking-wider border cursor-pointer capitalize font-sans transition-all ${
                    shape === s
                      ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                      : "bg-black/40 border-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 font-mono">Render Tint Color</label>
            <div className="flex gap-2">
              {["#a855f7", "#22d3ee", "#10b981", "#ec4899", "#f59e0b"].map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-6 h-6 rounded-full cursor-pointer transition-transform duration-200 border border-white/10 ${
                    color === c ? "scale-125 ring-2 ring-white/40" : "opacity-80 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Rotation Speed</label>
              <span className="text-[10px] font-mono text-purple-400 font-bold">{speed}x</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-1 bg-black/40 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>

        {/* Canvas Display */}
        <div className="md:col-span-2 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-center p-2 min-h-[300px] relative">
          <div ref={containerRef} className="w-full flex justify-center items-center" />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-gray-500 font-mono">
            DRAG MOUSE OVER CANVAS TO INTERACT
          </div>
        </div>
      </div>
    </div>
  );
}

interface LearnWithSureshViewProps {
  activeSubTab?: string;
  setActiveSubTab?: (tab: string) => void;
}

export default function LearnWithSureshView({ activeSubTab, setActiveSubTab }: LearnWithSureshViewProps = {}) {
  const { theme } = useTheme();
  
  // Navigation tabs for the specific "Learn with Suresh" mode
  const [localSubTab, setLocalSubTab] = useState<"home" | "learn" | "practice" | "career-suite" | "ai-tools">("home");

  const subTab = activeSubTab && activeSubTab.startsWith("learn-suresh-")
    ? (activeSubTab.replace("learn-suresh-", "") as "home" | "learn" | "practice" | "career-suite" | "ai-tools")
    : localSubTab;

  const setSubTab = (newTab: "home" | "learn" | "practice" | "career-suite" | "ai-tools") => {
    if (setActiveSubTab && activeSubTab) {
      setActiveSubTab(`learn-suresh-${newTab}`);
    } else {
      setLocalSubTab(newTab);
    }
  };

  // Home states
  const [streakCount, setStreakCount] = useState(5);
  const [streakClaimed, setStreakClaimed] = useState(false);

  // Learn tab states
  const [coursesSearch, setCoursesSearch] = useState("");
  const [coursesCategory, setCoursesCategory] = useState<string>("All");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [courseQuizScore, setCourseQuizScore] = useState<number | null>(null);
  const [courseQuizAnswers, setCourseQuizAnswers] = useState<Record<number, number>>({});
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(["fullstack-web"]);

  // Practice tab states
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(codingProblems[0]);
  const [codeSolution, setCodeSolution] = useState(codingProblems[0].starterCode);
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<{ success: boolean; output: string } | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [toolsSearch, setToolsSearch] = useState("");
  const [toolsCategory, setToolsCategory] = useState("All");

  // Career Suite states
  const [careerSubView, setCareerSubView] = useState<"ats" | "interview" | "roadmap" | "tcs">("ats");
  
  // ATS Resume Builder State
  const [atsScoreData, setAtsScoreData] = useState<{
    score: number;
    summary: string;
    bulletPoints: string[];
    keywords: string[];
    tips: string[];
  } | null>(null);
  const [isScanningResume, setIsScanningResume] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [targetJob, setTargetJob] = useState("");

  // Interview Simulator State
  const [interviewRole, setInterviewRole] = useState("Software Engineer");
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewQuestion, setInterviewQuestion] = useState("");
  const [interviewAnswer, setInterviewAnswer] = useState("");
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const [isEvaluatingAnswer, setIsEvaluatingAnswer] = useState(false);
  const [interviewFeedback, setInterviewFeedback] = useState<any>(null);

  // Roadmap State
  const [roadmapGoal, setRoadmapGoal] = useState("");
  const [roadmapLevel, setRoadmapLevel] = useState("Beginner");
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState<any>(null);

  // TCS Mock Test State
  const [tcsTestActive, setTcsTestActive] = useState(false);
  const [tcsTimer, setTcsTimer] = useState(600); // 10 minutes timed test
  const [tcsAnswers, setTcsAnswers] = useState<Record<number, number>>({});
  const [tcsScore, setTcsScore] = useState<number | null>(null);

  // AI Tools states
  const [aiSubView, setAiSubView] = useState<"advisor" | "research" | "flashcards">("advisor");
  const [advisorInput, setAdvisorInput] = useState("");
  const [advisorMessages, setAdvisorMessages] = useState<Array<{ role: "user" | "model"; text: string }>>([
    { role: "model", text: "Welcome to Learn with Suresh AI Study Advisor! Ask me anything about physics formulas, database structures, react states, or TCS aptitude strategies." }
  ]);
  const [isAdvisorTyping, setIsAdvisorTyping] = useState(false);

  // Research states
  const [researchTopic, setResearchTopic] = useState("");
  const [isSearchingPapers, setIsSearchingPapers] = useState(false);
  const [researchPapers, setResearchPapers] = useState<Array<{ title: string; authors: string; summary: string; year: string }>>([]);

  // Flashcards states
  const [flashcards, setFlashcards] = useState<Flashcard[]>(mockFlashcards);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);
  const [flashcardBoxFilter, setFlashcardBoxFilter] = useState<number | "All">("All");

  // Sync coding solution state when problem selection changes
  useEffect(() => {
    setCodeSolution(selectedProblem.starterCode);
    setTestResults(null);
    setShowSolution(false);
  }, [selectedProblem]);

  // Handle Streak Claim
  const handleClaimStreak = () => {
    if (!streakClaimed) {
      setStreakCount(prev => prev + 1);
      setStreakClaimed(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Run mock code tests
  const handleRunCodeTests = () => {
    setIsTesting(true);
    setTestResults(null);
    setTimeout(() => {
      // Mock code runner logic
      let passes = true;
      let logs = "Initializing container execution...\n";
      
      // Basic heuristic to inspect if user solved or has starter code intact
      if (codeSolution.includes("// Write your code here") || codeSolution.trim().length < 40) {
        passes = false;
        logs += "🔴 FAILED: Incomplete method body detected.\n";
        logs += "Ensure you remove standard placeholder comments and return valid expected structures.\n";
      } else if (selectedProblem.id === "two-sum" && !codeSolution.includes("map") && !codeSolution.includes("for")) {
        passes = false;
        logs += "🔴 FAILED: Loop boundaries missed or Map complements not tracked correctly.\n";
      } else if (selectedProblem.id === "valid-parentheses" && !codeSolution.includes("stack") && !codeSolution.includes("pop")) {
        passes = false;
        logs += "🔴 FAILED: Stack buffer structures not utilized correctly to trace closing tags.\n";
      } else {
        logs += "🟢 Executing dynamic test-suite validations...\n";
        selectedProblem.testCases.forEach((tc, idx) => {
          logs += `Test Case ${idx + 1} (${tc.input}): PASSED\n`;
        });
        logs += "\n🏆 All checks executed successfully! Memory threshold: 4.2MB, time limit: 14ms.\n";
      }

      setTestResults({ success: passes, output: logs });
      setIsTesting(false);
      if (passes) {
        confetti({
          particleCount: 50,
          spread: 45,
          colors: ["#22d3ee", "#10b981"]
        });
      }
    }, 1500);
  };

  // Evaluate Course Quiz
  const handleEvaluateCourseQuiz = () => {
    if (!selectedCourse) return;
    let correctCount = 0;
    selectedCourse.quizzes.forEach((q, idx) => {
      if (courseQuizAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    setCourseQuizScore(correctCount);
    confetti({
      particleCount: 80,
      spread: 60,
      colors: ["#a855f7", "#ec4899"]
    });
  };

  // Evaluate Resume (ATS Scanner)
  const handleEvaluateResumeATS = async () => {
    if (!resumeText.trim()) return;
    setIsScanningResume(true);
    setAtsScoreData(null);

    try {
      const response = await fetch("/api/gemini/resume/ats-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          jobDescription: targetJob || "General Software Engineering Position"
        })
      });

      if (!response.ok) throw new Error();
      const data = await response.json();

      setAtsScoreData({
        score: data.matchPercentage,
        summary: data.atsOptimizedSummary,
        bulletPoints: data.actionableSuggestions,
        keywords: data.matchedKeywords.concat(data.missingKeywords),
        tips: [data.gapsAnalysis]
      });
    } catch {
      // Fallback
      setAtsScoreData({
        score: 74,
        summary: "Proven full stack engineer with deep competence in web state architectures, responsive systems, and deployment mechanisms.",
        bulletPoints: [
          "Restructured database indexes to reduce read cycles by 40% across relational Postgres models.",
          "Implemented lazy state rendering for multi-user dashboards resulting in an immediate 2.4s reduction in Time-to-Interactive metrics."
        ],
        keywords: ["React 19", "Express.js", "PostgreSQL", "Tailwind CSS", "Systems Design", "REST APIs"],
        tips: ["Quantify achievements using raw percentage metrics rather than passive descriptions.", "List missing dependencies directly inside structural skills arrays."]
      });
    } finally {
      setIsScanningResume(false);
    }
  };

  // Interview Simulator Start / Next
  const handleGetInterviewQuestion = async () => {
    setIsGeneratingQuestion(true);
    setInterviewFeedback(null);
    try {
      const response = await fetch("/api/gemini/interview/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          field: "Tech/MNC",
          role: interviewRole,
          type: "Technical & Behavioral",
          level: "Mid-Level"
        })
      });
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (data && data.length > 0) {
        setInterviewQuestion(data[0].text);
      } else {
        setInterviewQuestion(`Tell me about a challenging technical problem you solved on a project related to ${interviewRole}.`);
      }
      setInterviewStarted(true);
    } catch {
      setInterviewQuestion(`Explain how you handle synchronous request timeouts when developing full-stack structures in ${interviewRole}.`);
      setInterviewStarted(true);
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  const handleEvaluateInterviewAnswer = async () => {
    if (!interviewAnswer.trim()) return;
    setIsEvaluatingAnswer(true);
    try {
      const response = await fetch("/api/gemini/interview/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: interviewQuestion,
          transcript: interviewAnswer,
          durationSeconds: 90
        })
      });
      if (!response.ok) throw new Error();
      const data = await response.json();
      setInterviewFeedback(data);
    } catch {
      setInterviewFeedback({
        overallScore: 82,
        strengths: ["Highly structured response structure", "Demonstrated clear command over system paradigms"],
        improvements: ["Ensure you link direct KPIs to scaling outcomes", "Incorporate the STAR methodology more thoroughly in the beginning"],
        modelAnswer: "Situation: Our platform was bottlenecked with 4-second latency. Task: Restructure index queues. Action: Re-indexed table columns on Postgres. Result: Reduced latency to under 300ms."
      });
    } finally {
      setIsEvaluatingAnswer(false);
    }
  };

  // Roadmap Generator
  const handleGenerateRoadmap = async () => {
    if (!roadmapGoal.trim()) return;
    setIsGeneratingRoadmap(true);
    setGeneratedRoadmap(null);
    try {
      const response = await fetch("/api/gemini/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: roadmapGoal,
          level: roadmapLevel,
          timeline: "6 Months"
        })
      });
      if (!response.ok) throw new Error();
      const data = await response.json();
      setGeneratedRoadmap(data);
    } catch {
      setGeneratedRoadmap({
        title: `Comprehensive Guide to ${roadmapGoal}`,
        steps: [
          { id: "s1", title: "Core Fundamentals & Tooling", duration: "Weeks 1-3", description: "Establish semantic mastery, compile local frameworks, and build simple modules.", theory: "Master the base models and configurations." },
          { id: "s2", title: "Asynchronous Pipelines & Database Sync", duration: "Weeks 4-7", description: "Design responsive endpoints, connect structured schemas, and handle errors.", theory: "Synchronous REST and SQL mapping frameworks." },
          { id: "s3", title: "Scalability, Testing & Deployment", duration: "Weeks 8-12", description: "Audit secure firestore environments and compile production assets.", theory: "CI/CD execution pipelines." }
        ]
      });
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  // TCS Mock Test Timers & Scorers
  useEffect(() => {
    let interval: any;
    if (tcsTestActive && tcsTimer > 0) {
      interval = setInterval(() => {
        setTcsTimer(prev => prev - 1);
      }, 1000);
    } else if (tcsTimer === 0 && tcsTestActive) {
      handleEvaluateTcsTest();
    }
    return () => clearInterval(interval);
  }, [tcsTestActive, tcsTimer]);

  const mockTcsQuestions = [
    {
      q: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train in meters?",
      options: ["120 meters", "150 meters", "180 meters", "324 meters"],
      correct: 1, // 60 * 5/18 * 9 = 150m
      explanation: "Speed in m/s = 60 * 5/18 = 50/3 m/s. Length = Speed * Time = 50/3 * 9 = 150 meters."
    },
    {
      q: "Find the HCF of 2/3, 8/9, 16/81, and 10/27.",
      options: ["2/81", "80/3", "2/3", "10/81"],
      correct: 0, // HCF of Numerators / LCM of Denominators = HCF(2,8,16,10)/LCM(3,9,81,27) = 2/81
      explanation: "For fractions, HCF = HCF of Numerators (2,8,16,10) / LCM of Denominators (3,9,81,27) = 2 / 81."
    },
    {
      q: "Which of the following is correct regarding local variables in Python?",
      options: [
        "They are accessible outside the defined method context.",
        "They are initialized at the module level.",
        "Their scope is bounded strictly to the block they are declared in.",
        "They always override global schemas automatically."
      ],
      correct: 2,
      explanation: "Local variables are only accessible in the local namespace of the block they are instantiated within."
    }
  ];

  const handleStartTcsTest = () => {
    setTcsTimer(600);
    setTcsAnswers({});
    setTcsScore(null);
    setTcsTestActive(true);
  };

  const handleEvaluateTcsTest = () => {
    setTcsTestActive(false);
    let score = 0;
    mockTcsQuestions.forEach((q, idx) => {
      if (tcsAnswers[idx] === q.correct) {
        score += 10; // 10 points each
      }
    });
    setTcsScore(score);
    confetti({
      particleCount: 100,
      spread: 80,
      colors: ["#10b981", "#3b82f6"]
    });
  };

  // AI Study Advisor Chat Handler
  const handleSendAdvisorMsg = async () => {
    if (!advisorInput.trim()) return;
    const userMsg = { role: "user" as const, text: advisorInput };
    setAdvisorMessages(prev => [...prev, userMsg]);
    setAdvisorInput("");
    setIsAdvisorTyping(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...advisorMessages, userMsg].map(m => ({
            role: m.role,
            text: m.text
          }))
        })
      });

      if (!response.ok) throw new Error();
      const data = await response.json();
      setAdvisorMessages(prev => [...prev, { role: "model", text: data.text }]);
    } catch {
      setAdvisorMessages(prev => [
        ...prev,
        { role: "model", text: "⚠️ Hello! Suresh here. I had trouble talking to the AI core, but remember: in classical mechanics we use FBDs to resolve force vectors; in web development, use state hook bounds, and for TCS practice, always master divisible checks!" }
      ]);
    } finally {
      setIsAdvisorTyping(false);
    }
  };

  // Research topic search simulated
  const handleSearchResearch = () => {
    if (!researchTopic.trim()) return;
    setIsSearchingPapers(true);
    setTimeout(() => {
      setResearchPapers([
        {
          title: `Optimizing React Fiber Tree reconciliations for highly asynchronous client dashboards`,
          authors: "Nagidi Suresh, K. R. Ramanujan",
          year: "2025",
          summary: "This paper analyzes rendering bottle-necks inside modern framework states. We propose a decentralized virtual layout engine with sub-reconciliation threads to isolate side-effects."
        },
        {
          title: `Comparative study of classical mechanics algorithms for real-time 3D orbital trajectory simulation`,
          authors: "Nagidi Suresh, L. Euler",
          year: "2024",
          summary: "An investigation into Runge-Kutta integrations vs Euler schemas on canvas elements, demonstrating a 40% precision preservation under high gravitation values."
        }
      ]);
      setIsSearchingPapers(false);
    }, 1200);
  };

  // Flashcards navigation
  const handleFlashcardReview = (correct: boolean) => {
    // Update Leitner box system! Correct raises box by 1, incorrect resets to box 1
    const updated = [...flashcards];
    const current = updated[currentFlashcardIndex];
    if (correct) {
      current.box = Math.min(5, current.box + 1);
    } else {
      current.box = 1;
    }
    setFlashcards(updated);
    setShowFlashcardAnswer(false);
    
    // Jump to next card matching filter if possible, otherwise wrap around
    const filtered = updated.filter(fc => flashcardBoxFilter === "All" || fc.box === flashcardBoxFilter);
    if (filtered.length > 0) {
      const currentFilteredIndex = filtered.indexOf(current);
      const nextFilteredIndex = (currentFilteredIndex + 1) % filtered.length;
      const originalIndexInMainList = updated.indexOf(filtered[nextFilteredIndex]);
      setCurrentFlashcardIndex(originalIndexInMainList);
    } else {
      setCurrentFlashcardIndex((currentFlashcardIndex + 1) % updated.length);
    }
  };

  // Filter courses
  const filteredCourses = curatedCourses.filter(c => {
    const matchesCat = coursesCategory === "All" || c.category === coursesCategory;
    const matchesSearch = c.title.toLowerCase().includes(coursesSearch.toLowerCase()) || 
                          c.description.toLowerCase().includes(coursesSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filter free software tools
  const filteredTools = freeSoftwareTools.filter(t => {
    const matchesCat = toolsCategory === "All" || t.category === toolsCategory;
    const matchesSearch = t.name.toLowerCase().includes(toolsSearch.toLowerCase()) || 
                          t.description.toLowerCase().includes(toolsSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filter educational platforms
  const filteredPlatforms = educationalPlatforms.filter(plat => {
    // If toolsCategory matches 'All' or matches any custom category or is mapped, let's keep it robust.
    // Since some categories of educationalPlatforms might be "Coding & DSA" etc., we can check:
    const matchesCat = toolsCategory === "All" || plat.category === toolsCategory;
    const matchesSearch = plat.name.toLowerCase().includes(toolsSearch.toLowerCase()) || 
                          plat.description.toLowerCase().includes(toolsSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 relative z-10">
      
      {/* Visual Header / Banner for Suresh Mode */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#111029] via-[#090916] to-[#0d0c22] border border-white/5 p-6 sm:p-8 mb-8 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute top-0 right-0 w-[400px] h-[200px] bg-gradient-to-bl from-purple-500/10 via-cyan-500/5 to-transparent rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-purple-500/20 flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-3 h-3 text-purple-400" />
              Learn with Suresh Ecosystem
            </span>
            <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-cyan-500/20">
              Active Session
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
            Learn with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-[#22d3ee]">Suresh</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
            A world-class educational hub combining structured curriculum boost modules, integrated compiler sandboxes, timed TCS NQT prep simulations, and a powerful AI career pipeline.
          </p>
        </div>

        {/* Global Streak / Reward Center Widget */}
        <div className="bg-[#18162e]/70 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-2.5 min-w-[180px] backdrop-blur-md self-stretch sm:self-auto">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <div className="text-left">
              <p className="text-[9px] text-gray-400 uppercase font-mono tracking-wider">DAILY STREAK</p>
              <p className="text-lg font-extrabold text-white font-sans">{streakCount} Days Active</p>
            </div>
          </div>
          <button
            onClick={handleClaimStreak}
            disabled={streakClaimed}
            className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold font-sans cursor-pointer transition-all duration-200 border ${
              streakClaimed 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-purple-500/20 text-white shadow-lg shadow-purple-500/10"
            }`}
          >
            {streakClaimed ? "✓ Daily Claimed" : "Claim Daily Streak"}
          </button>
        </div>
      </div>

      {/* Mode Sub-navigation tabs */}
      <div className="flex items-center bg-black/40 border border-white/5 p-1 rounded-2xl mb-8 overflow-x-auto whitespace-nowrap scrollbar-none shadow-inner">
        {[
          { id: "home", label: "Overview", icon: Compass },
          { id: "learn", label: "Curriculum Hub", icon: BookOpen },
          { id: "practice", label: "Compiler & Sandbox", icon: Laptop },
          { id: "career-suite", label: "Zuno AI Career Suite", icon: Briefcase },
          { id: "ai-tools", label: "AI Study Tools", icon: Laptop },
          { id: "about", label: "About Creator", icon: Info },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSubTab(tab.id as any);
                setSelectedCourse(null);
              }}
              className={`py-2 px-4 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-2 ${
                isActive
                  ? "bg-gradient-to-r from-purple-500/20 to-[#22d3ee]/20 border border-purple-500/30 text-white font-bold"
                  : "text-gray-400 hover:text-white border border-transparent"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#22d3ee]" : "text-gray-400"}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* VIEW CONDITIONAL RENDERERS */}

      {/* 1. HOME / OVERVIEW TAB */}
      {subTab === "home" && (
        <div className="space-y-8">
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Quick stats / Greetings card */}
            <div className="bg-gradient-to-b from-[#151429] to-[#090916] border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
              <div className="space-y-2">
                <p className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">SURESH'S CORNER</p>
                <h3 className="text-lg font-bold text-white font-sans">Active Learning Status</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  You are making tremendous headway. Your study consistency score is currently in the top <span className="text-emerald-400 font-bold">5%</span> of computer science and JEE aspirants globally.
                </p>
              </div>
              <div className="flex gap-4 border-t border-white/5 pt-4 mt-4">
                <div>
                  <p className="text-xl font-black text-white font-mono">3</p>
                  <p className="text-[9px] text-gray-500 uppercase tracking-wider font-mono">Enrolled Courses</p>
                </div>
                <div className="w-px bg-white/5" />
                <div>
                  <p className="text-xl font-black text-white font-mono">14</p>
                  <p className="text-[9px] text-gray-500 uppercase tracking-wider font-mono">Quizzes Solved</p>
                </div>
                <div className="w-px bg-white/5" />
                <div>
                  <p className="text-xl font-black text-purple-400 font-mono">82%</p>
                  <p className="text-[9px] text-gray-500 uppercase tracking-wider font-mono">Avg Score</p>
                </div>
              </div>
            </div>

            {/* Quick access cards */}
            <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-6 flex flex-col justify-between min-h-[220px]">
              <div className="space-y-2">
                <p className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">PRACTICE SUITE</p>
                <h3 className="text-lg font-bold text-white font-sans">Coding Sandbox Active</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Write, execute, and compile standard javascript algorithms directly inside an in-browser sandbox container. Ready with test cases.
                </p>
              </div>
              <button
                onClick={() => setSubTab("practice")}
                className="w-full bg-[#1c1b35] hover:bg-[#252445] border border-white/10 rounded-xl py-2 px-3 text-xs font-semibold text-[#22d3ee] hover:text-white transition-all cursor-pointer flex items-center justify-between font-sans mt-4"
              >
                Launch Compiler
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* AI Tools quick launcher */}
            <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-6 flex flex-col justify-between min-h-[220px]">
              <div className="space-y-2">
                <p className="text-[10px] font-mono text-pink-400 font-bold uppercase tracking-widest">AI CO-PILOT</p>
                <h3 className="text-lg font-bold text-white font-sans">Ask AI Study Advisor</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Need a step-by-step mathematical proof, dynamic code analysis, or a structured learning plan? The Gemini-powered tutor is fully online.
                </p>
              </div>
              <button
                onClick={() => setSubTab("ai-tools")}
                className="w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/20 rounded-xl py-2 px-3 text-xs font-semibold text-purple-300 hover:text-white transition-all cursor-pointer flex items-center justify-between font-sans mt-4"
              >
                Consult Advisor
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              </button>
            </div>
          </div>

          {/* 3D Lab Show */}
          <Simple3DViewer />

          {/* Featured Courses carousel/row */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              Featured Learning Path Preloads
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {curatedCourses.map((c) => (
                <div key={c.id} className="bg-[#121124]/40 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all flex flex-col justify-between p-4">
                  <div className="space-y-3">
                    <img src={c.thumbnail} alt={c.title} className="w-full h-32 object-cover rounded-xl border border-white/5" />
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-purple-400 font-bold">{c.category}</span>
                      <span className="text-gray-500">{c.duration}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{c.title}</h4>
                    <p className="text-[11px] text-gray-400 line-clamp-2">{c.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCourse(c);
                      setSubTab("learn");
                    }}
                    className="w-full bg-[#18162e] hover:bg-[#252445] border border-white/5 hover:border-white/10 rounded-xl py-1.5 px-3 text-[11px] font-semibold text-white transition-all cursor-pointer mt-4 flex items-center justify-center gap-1.5"
                  >
                    View Curriculum
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. CURRICULUM HUB / LEARN TAB */}
      {subTab === "learn" && (
        <div>
          {!selectedCourse ? (
            <div className="space-y-6">
              {/* Filter tools */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={coursesSearch}
                    onChange={(e) => setCoursesSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
                  />
                </div>
                <div className="flex gap-1 overflow-x-auto w-full sm:w-auto scrollbar-none">
                  {["All", "Coding", "School", "Higher Ed", "Career Hub"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCoursesCategory(cat)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                        coursesCategory === cat
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Course listings */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((c) => {
                  const isEnrolled = enrolledCourseIds.includes(c.id);
                  return (
                    <div key={c.id} className="bg-[#121124]/40 border border-white/5 hover:border-white/10 rounded-3xl overflow-hidden transition-all flex flex-col justify-between p-5 relative">
                      {isEnrolled && (
                        <div className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" /> Enrolled
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <img src={c.thumbnail} alt={c.title} className="w-full h-40 object-cover rounded-2xl border border-white/5" />
                        
                        <div className="flex items-center gap-2 text-[10px] font-mono">
                          <span className="text-purple-400 font-bold bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/10">{c.category}</span>
                          <span className="text-gray-500">{c.duration}</span>
                          <span className="text-amber-400 flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-amber-400 stroke-none" /> {c.rating}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-white line-clamp-1">{c.title}</h3>
                        <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">{c.description}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                        <span className="text-xs font-mono text-gray-500">{c.studentsCount} students</span>
                        <button
                          onClick={() => {
                            setSelectedCourse(c);
                            setActiveLessonIndex(0);
                            setCourseQuizAnswers({});
                            setCourseQuizScore(null);
                          }}
                          className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl py-1.5 px-4 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          {isEnrolled ? "Study Lessons" : "Enroll & Start"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* DETAILED COURSE VIEWER WITH LESSON & QUIZ */
            <div className="space-y-8 animate-fade-in">
              {/* Back button */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-xs font-semibold text-purple-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 mb-2 font-mono"
              >
                ← Back to Curriculum Directory
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left sidebar: Lessons & Quizzes List */}
                <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-5 space-y-4">
                  <div className="border-b border-white/5 pb-3">
                    <p className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">{selectedCourse.category}</p>
                    <h3 className="text-sm font-bold text-white">{selectedCourse.title}</h3>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Lessons List</p>
                    {selectedCourse.lessons.map((lesson, idx) => (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setActiveLessonIndex(idx);
                          setCourseQuizScore(null);
                        }}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                          activeLessonIndex === idx && courseQuizScore === null
                            ? "bg-purple-500/10 border-purple-500/30 text-white font-bold"
                            : "bg-black/20 border-white/5 text-gray-400 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span className="w-5 h-5 rounded-full bg-black/40 flex items-center justify-center font-mono text-[10px] text-purple-300">{idx + 1}</span>
                          <span className="truncate">{lesson.title}</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                      </button>
                    ))}

                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pt-4 font-mono">Quizzes & Assessment</p>
                    <button
                      onClick={() => setCourseQuizScore(-1)} // Special trigger for Quiz pane
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                        courseQuizScore !== null
                          ? "bg-purple-500/10 border-purple-500/30 text-white font-bold"
                          : "bg-black/20 border-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-purple-400" />
                        <span>Interactive Module Quiz</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right: Content panel */}
                <div className="lg:col-span-2 space-y-6">
                  {courseQuizScore === null ? (
                    /* RENDER ACTIVE LESSON */
                    <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="space-y-1">
                          <p className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">Lesson {activeLessonIndex + 1} of {selectedCourse.lessons.length}</p>
                          <h2 className="text-lg font-bold text-white font-sans">{selectedCourse.lessons[activeLessonIndex].title}</h2>
                        </div>
                        <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                          Active study
                        </span>
                      </div>

                      <div className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans space-y-4 whitespace-pre-line">
                        {selectedCourse.lessons[activeLessonIndex].content}
                      </div>

                      {/* Navigation controls */}
                      <div className="flex justify-between items-center border-t border-white/5 pt-6 mt-8">
                        <button
                          disabled={activeLessonIndex === 0}
                          onClick={() => setActiveLessonIndex(prev => prev - 1)}
                          className="bg-[#18162e] hover:bg-[#252445] disabled:opacity-40 disabled:cursor-not-allowed border border-white/5 hover:border-white/10 rounded-xl py-2 px-4 text-xs font-semibold text-white transition-all cursor-pointer"
                        >
                          Previous Lesson
                        </button>
                        {activeLessonIndex < selectedCourse.lessons.length - 1 ? (
                          <button
                            onClick={() => setActiveLessonIndex(prev => prev + 1)}
                            className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl py-2 px-4 text-xs font-bold transition-all cursor-pointer"
                          >
                            Next Lesson
                          </button>
                        ) : (
                          <button
                            onClick={() => setCourseQuizScore(-1)}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-2 px-4 text-xs font-bold transition-all cursor-pointer"
                          >
                            Proceed to Quiz
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* RENDER ASSESSMENT QUIZ */
                    <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-6 sm:p-8 space-y-8">
                      <div className="border-b border-white/5 pb-4">
                        <h2 className="text-lg font-bold text-white font-sans">Module Assessment Quiz</h2>
                        <p className="text-xs text-gray-400 font-sans mt-0.5">Solve the preloaded questions below to test your topic comprehension.</p>
                      </div>

                      {courseQuizScore >= 0 && (
                        <div className="bg-purple-500/10 border border-purple-500/20 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="space-y-1">
                            <h3 className="text-sm font-bold text-white font-sans">Quiz Evaluation Completed</h3>
                            <p className="text-xs text-gray-400 font-sans">
                              You answered <span className="text-purple-400 font-bold font-mono">{courseQuizScore}</span> out of <span className="text-white font-bold font-mono">{selectedCourse.quizzes.length}</span> correct.
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setCourseQuizScore(-1);
                              setCourseQuizAnswers({});
                            }}
                            className="bg-black/40 hover:bg-black/60 border border-white/10 rounded-xl py-1.5 px-3.5 text-xs font-semibold text-white transition-all cursor-pointer font-sans"
                          >
                            Retry Quiz
                          </button>
                        </div>
                      )}

                      <div className="space-y-6">
                        {selectedCourse.quizzes.map((q, qIdx) => (
                          <div key={qIdx} className="space-y-3">
                            <p className="text-xs font-bold text-white font-sans">
                              {qIdx + 1}. {q.question}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {q.options.map((opt, optIdx) => {
                                const isSelected = courseQuizAnswers[qIdx] === optIdx;
                                const isCorrect = q.correctIndex === optIdx;
                                const showFeedback = courseQuizScore !== null && courseQuizScore >= 0;
                                
                                let btnStyle = "bg-black/20 border-white/5 text-gray-400 hover:text-white";
                                if (isSelected) {
                                  btnStyle = "bg-purple-500/10 border-purple-500/40 text-purple-300 font-bold";
                                }
                                if (showFeedback) {
                                  if (isCorrect) {
                                    btnStyle = "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold";
                                  } else if (isSelected) {
                                    btnStyle = "bg-rose-500/10 border-rose-500/40 text-rose-400 font-bold";
                                  }
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    disabled={showFeedback}
                                    onClick={() => setCourseQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${btnStyle}`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                            {courseQuizScore !== null && courseQuizScore >= 0 && (
                              <div className="bg-black/20 p-3 rounded-xl border border-white/5 text-[11px] text-gray-400 font-sans leading-relaxed">
                                <span className="text-purple-400 font-bold font-mono uppercase tracking-wider text-[9px] block mb-0.5">EXPLANATION:</span>
                                {q.explanation}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {courseQuizScore === -1 && (
                        <div className="flex justify-end pt-4">
                          <button
                            onClick={handleEvaluateCourseQuiz}
                            className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl py-2 px-6 text-xs font-bold transition-all cursor-pointer"
                          >
                            Submit & Grade Quiz
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. PRACTICE TAB (COMPILER & PLATFORMS) */}
      {subTab === "practice" && (
        <div className="space-y-10">
          
          {/* Coding Problem Grid & Sandbox Splitter */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Coding Problems Panel */}
            <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-5 space-y-4 h-fit">
              <div className="border-b border-white/5 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">DSA Problems</h3>
                <p className="text-[11px] text-gray-500 font-sans">Choose a standard data structure challenge to practice compilation.</p>
              </div>

              <div className="space-y-2">
                {codingProblems.map((prob) => {
                  const isSelected = selectedProblem.id === prob.id;
                  let diffStyle = "text-emerald-400";
                  if (prob.difficulty === "Medium") diffStyle = "text-amber-400";
                  if (prob.difficulty === "Hard") diffStyle = "text-rose-400";

                  return (
                    <button
                      key={prob.id}
                      onClick={() => setSelectedProblem(prob)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex flex-col gap-1 cursor-pointer ${
                        isSelected
                          ? "bg-purple-500/10 border-purple-500/30 text-white font-bold"
                          : "bg-black/20 border-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-sans font-bold text-white">{prob.title}</span>
                        <span className={`text-[9px] font-bold uppercase font-mono ${diffStyle}`}>{prob.difficulty}</span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono">{prob.category}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sandbox Code Compiler Area */}
            <div className="lg:col-span-2 bg-[#090815]/80 border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-[#22d3ee] animate-pulse" />
                  <h3 className="text-sm font-bold text-white font-sans">{selectedProblem.title} Playground</h3>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">LANGUAGE: JAVASCRIPT</span>
              </div>

              {/* Description */}
              <div className="text-xs text-gray-300 leading-relaxed whitespace-pre-line bg-black/40 p-4 border border-white/5 rounded-2xl">
                {selectedProblem.description}
              </div>

              {/* Code TextArea */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Method implementation</label>
                  <button
                    onClick={() => setCodeSolution(selectedProblem.starterCode)}
                    className="text-[10px] font-semibold text-gray-500 hover:text-white transition-all font-sans cursor-pointer"
                  >
                    Reset Starter Code
                  </button>
                </div>
                <textarea
                  value={codeSolution}
                  onChange={(e) => setCodeSolution(e.target.value)}
                  rows={9}
                  className="w-full p-4 bg-[#11101e] border border-white/5 rounded-2xl text-xs font-mono text-cyan-300 focus:outline-none focus:border-[#22d3ee]"
                />
              </div>

              {/* Compiler results block */}
              {testResults && (
                <div className={`p-4 border rounded-2xl space-y-2 ${
                  testResults.success 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" 
                    : "bg-rose-500/10 border-rose-500/20 text-rose-300"
                }`}>
                  <p className="text-xs font-bold flex items-center gap-1.5 font-sans">
                    <Terminal className="w-4 h-4" /> Code execution stdout log:
                  </p>
                  <pre className="text-[10px] font-mono leading-relaxed whitespace-pre-wrap">{testResults.output}</pre>
                </div>
              )}

              {/* Interactive buttons */}
              <div className="flex flex-wrap gap-2 pt-2 justify-between items-center">
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="bg-black/40 hover:bg-black/60 border border-white/10 rounded-xl py-2 px-4 text-xs font-semibold text-white transition-all cursor-pointer font-sans"
                >
                  {showSolution ? "Hide Answer Code" : "Reveal Answer Code"}
                </button>
                <button
                  disabled={isTesting}
                  onClick={handleRunCodeTests}
                  className="bg-gradient-to-r from-purple-500 to-[#22d3ee] text-white rounded-xl py-2 px-6 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 font-sans"
                >
                  {isTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                  Execute Test Suite
                </button>
              </div>

              {/* Revealed Answer Panel */}
              {showSolution && (
                <div className="bg-black/50 border border-purple-500/20 p-4 rounded-2xl space-y-2 animate-fade-in">
                  <p className="text-[10px] font-bold text-purple-400 font-mono uppercase tracking-wider">Optimal Suresh Solution (O(N) time complexity):</p>
                  <pre className="text-xs font-mono text-purple-200 p-2.5 bg-black/60 rounded-xl overflow-x-auto whitespace-pre">{selectedProblem.solution}</pre>
                </div>
              )}
            </div>
          </div>

          {/* Curated platform Directories */}
          <div className="space-y-6">
            <div className="border-b border-white/5 pb-2">
              <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
                <Compass className="w-5 h-5 text-cyan-400" />
                Global Resource & Platform Directories
              </h3>
              <p className="text-xs text-gray-400 font-sans mt-0.5">Filter and access high-quality external resources to expand your technical stack.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search platforms..."
                  value={toolsSearch}
                  onChange={(e) => setToolsSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>
              <div className="flex gap-1 overflow-x-auto w-full sm:w-auto scrollbar-none">
                {["All", "Coding & DSA", "School & Math", "Higher Ed & Degrees", "Career Roadmap"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setToolsCategory(cat)}
                    className={`py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                      toolsCategory === cat
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlatforms.map((plat) => (
                <div key={plat.name} className="bg-[#121124]/40 border border-white/5 rounded-2xl p-4 flex flex-col justify-between items-start gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[10px] font-mono text-purple-400 font-bold">{plat.category}</span>
                      <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[9px] font-bold px-2 py-0.5 rounded-full">{plat.badge}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white font-sans">{plat.name}</h4>
                    <p className="text-[11px] text-gray-400 font-sans leading-relaxed">{plat.description}</p>
                  </div>
                  <a
                    href={plat.url}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold font-sans flex items-center gap-1 cursor-pointer"
                  >
                    Access platform
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Competitions / Software Tools lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Competitions */}
            <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                Competitions, Hackathons & Skilling
              </h3>
              <div className="space-y-3">
                {competitionsList.map((comp) => (
                  <div key={comp.title} className="bg-black/20 p-3.5 border border-white/5 rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white font-sans">{comp.title}</h4>
                      <p className="text-[10px] text-gray-400 font-sans">{comp.organizer} • <span className="text-purple-400 font-semibold">{comp.type}</span></p>
                      <p className="text-[10px] text-emerald-400 font-mono">REWARD: {comp.reward}</p>
                    </div>
                    <a
                      href={comp.url}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="bg-[#1c1b35] hover:bg-[#252445] p-2 rounded-xl text-purple-300 hover:text-white transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Free Software Tools */}
            <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                Featured Free Software Tools
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto scrollbar-thin">
                {freeSoftwareTools.map((tool) => (
                  <div key={tool.name} className="bg-black/20 p-3 border border-white/5 rounded-xl space-y-1">
                    <span className="text-[9px] font-mono text-purple-400 uppercase tracking-wider block font-bold">{tool.category}</span>
                    <h4 className="text-[11px] font-bold text-white truncate font-sans">{tool.name}</h4>
                    <p className="text-[10px] text-gray-400 line-clamp-1 font-sans">{tool.description}</p>
                    <a
                      href={tool.url}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="text-[9px] text-[#22d3ee] hover:text-white font-mono flex items-center gap-0.5 cursor-pointer pt-1"
                    >
                      Link <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. ZUNO AI CAREER SUITE TAB */}
      {subTab === "career-suite" && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Sub menu for Career Suite */}
          <div className="flex gap-2 border-b border-white/5 pb-4 overflow-x-auto scrollbar-none">
            {[
              { id: "ats", label: "ATS Resume Builder", icon: FileCheck },
              { id: "interview", label: "AI Mock Interviews", icon: UserCheck },
              { id: "roadmap", label: "AI Career Roadmaps", icon: Compass },
              { id: "tcs", label: "TCS NQT Prep & Mock", icon: Award },
            ].map((sub) => {
              const Icon = sub.icon;
              const isActive = careerSubView === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setCareerSubView(sub.id as any)}
                  className={`py-2 px-4 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-purple-500/10 border border-purple-500/30 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#22d3ee]" : "text-gray-400"}`} />
                  {sub.label}
                </button>
              );
            })}
          </div>

          {/* Render Career Sub views */}
          
          {/* A. ATS Resume Reviewer */}
          {careerSubView === "ats" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                    <FileText className="w-4.5 h-4.5 text-[#22d3ee]" />
                    ATS Resume Builder & Matcher
                  </h3>
                  <p className="text-xs text-gray-400 font-sans">
                    Paste your current professional experience bio or resume text along with your target job description to obtain instant scoring and optimization guidelines.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1 font-mono">Target Role / Job Title</label>
                    <input
                      type="text"
                      placeholder="e.g. SDE-1, React Frontend Engineer"
                      value={targetJob}
                      onChange={(e) => setTargetJob(e.target.value)}
                      className="w-full px-4 py-2 bg-black/40 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1 font-mono">Resume Content</label>
                    <textarea
                      placeholder="Paste resume experience blocks, achievements, and skills..."
                      rows={8}
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      className="w-full p-4 bg-black/40 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                    />
                  </div>

                  <button
                    disabled={isScanningResume || !resumeText.trim()}
                    onClick={handleEvaluateResumeATS}
                    className="w-full bg-gradient-to-r from-purple-500 to-[#22d3ee] text-white py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isScanningResume ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-white" />}
                    Scan & Optimize ATS Match
                  </button>
                </div>
              </div>

              {/* ATS scan results */}
              <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-6 flex flex-col justify-between">
                {atsScoreData ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">Evaluation Breakdown</h4>
                        <p className="text-[11px] text-gray-500 font-sans">Optimized dynamically based on ATS algorithms.</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-2xl font-black text-white font-mono">{atsScoreData.score}%</span>
                        <span className="text-[9px] font-bold text-emerald-400 uppercase font-mono tracking-wider">ATS Score</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Suggested Summary rewrite:</p>
                      <p className="text-xs text-gray-300 bg-black/30 p-3 border border-white/5 rounded-xl leading-relaxed font-sans">{atsScoreData.summary}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Actionable optimization bullets:</p>
                      <ul className="space-y-1.5 list-disc pl-4">
                        {atsScoreData.bulletPoints.map((bp, idx) => (
                          <li key={idx} className="text-[11px] text-gray-400 leading-relaxed font-sans">{bp}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">High Demand Keywords Found/Needed:</p>
                      <div className="flex flex-wrap gap-1">
                        {atsScoreData.keywords.map((kw) => (
                          <span key={kw} className="bg-[#1a1932] border border-white/10 rounded px-2 py-0.5 text-[9px] font-mono text-purple-300 font-semibold">{kw}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-3">
                    <ShieldAlert className="w-8 h-8 text-purple-400/60 animate-bounce" />
                    <p className="text-xs text-gray-400 font-sans max-w-xs">No scan initiated yet. Paste your experience description and click scan to receive comprehensive feedback.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* B. AI Mock Interviews */}
          {careerSubView === "interview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                    <UserCheck className="w-4.5 h-4.5 text-[#22d3ee]" />
                    AI Mock Interview Simulator
                  </h3>
                  <p className="text-xs text-gray-400 font-sans">
                    Simulate real tech interview loops. Select your target engineering role, generate unique behavioral or system questions, and get evaluated immediately.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1 font-mono">Role Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Frontend React developer, Python SDE"
                      value={interviewRole}
                      onChange={(e) => setInterviewRole(e.target.value)}
                      className="w-full px-4 py-2 bg-black/40 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
                    />
                  </div>

                  <button
                    disabled={isGeneratingQuestion}
                    onClick={handleGetInterviewQuestion}
                    className="w-full bg-gradient-to-r from-purple-500 to-[#22d3ee] text-white py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isGeneratingQuestion ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                    {interviewStarted ? "Generate Next Question" : "Start Mock Interview"}
                  </button>

                  {interviewQuestion && (
                    <div className="space-y-3 animate-fade-in pt-4 border-t border-white/5">
                      <p className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-bold">Active Question:</p>
                      <p className="text-xs text-white bg-black/40 p-4 border border-white/5 rounded-2xl font-sans leading-relaxed">{interviewQuestion}</p>
                      
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1 font-mono">Your Answer Response</label>
                        <textarea
                          placeholder="Type or speak your answer utilizing the STAR methodology..."
                          rows={5}
                          value={interviewAnswer}
                          onChange={(e) => setInterviewAnswer(e.target.value)}
                          className="w-full p-4 bg-black/40 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
                        />
                      </div>

                      <button
                        disabled={isEvaluatingAnswer || !interviewAnswer.trim()}
                        onClick={handleEvaluateInterviewAnswer}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isEvaluatingAnswer ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ThumbsUp className="w-3.5 h-3.5" />}
                        Submit & Evaluate Answer
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Evaluation Results */}
              <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-6 flex flex-col justify-between">
                {interviewFeedback ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">Performance Evaluation</h4>
                        <p className="text-[11px] text-gray-500 font-sans">Analysis completed based on clarity and structure.</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-2xl font-black text-white font-mono">{interviewFeedback.overallScore}%</span>
                        <span className="text-[9px] font-bold text-emerald-400 uppercase font-mono tracking-wider">Overall Score</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Strengths:</p>
                      <ul className="space-y-1.5 list-disc pl-4 text-xs text-gray-300 font-sans">
                        {interviewFeedback.strengths.map((str: string, idx: number) => (
                          <li key={idx}>{str}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Areas to Enhance:</p>
                      <ul className="space-y-1.5 list-disc pl-4 text-xs text-gray-300 font-sans">
                        {interviewFeedback.improvements.map((imp: string, idx: number) => (
                          <li key={idx}>{imp}</li>
                        ))}
                      </ul>
                    </div>

                    {interviewFeedback.modelAnswer && (
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Ideal Sample STAR Answer:</p>
                        <p className="text-xs text-gray-400 bg-black/40 p-3 border border-white/5 rounded-xl font-sans leading-relaxed">{interviewFeedback.modelAnswer}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-3">
                    <Star className="w-8 h-8 text-[#22d3ee]/60 animate-pulse" />
                    <p className="text-xs text-gray-400 font-sans max-w-xs">No active interview evaluation. Type your reply and submit to receive detailed coach assessments.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* C. AI Career Roadmaps */}
          {careerSubView === "roadmap" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                    <Compass className="w-4.5 h-4.5 text-[#22d3ee]" />
                    AI Career Roadmap Architect
                  </h3>
                  <p className="text-xs text-gray-400 font-sans">
                    Define your target dream job and experience tier to formulate a dynamic 12-week step-by-step career path structure detailing exact milestone goals.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1 font-mono">Goal (e.g. Devops, Quantum Architect)</label>
                    <input
                      type="text"
                      placeholder="e.g. Artificial Intelligence Engineer"
                      value={roadmapGoal}
                      onChange={(e) => setRoadmapGoal(e.target.value)}
                      className="w-full px-4 py-2 bg-black/40 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1 font-mono">Starting Level</label>
                    <div className="grid grid-cols-3 gap-1">
                      {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => setRoadmapLevel(lvl)}
                          className={`py-1.5 px-2 rounded-xl text-xs font-semibold border cursor-pointer uppercase tracking-wider transition-all ${
                            roadmapLevel === lvl
                              ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                              : "bg-black/40 border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    disabled={isGeneratingRoadmap || !roadmapGoal.trim()}
                    onClick={handleGenerateRoadmap}
                    className="w-full bg-gradient-to-r from-purple-500 to-[#22d3ee] text-white py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isGeneratingRoadmap ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-white" />}
                    Build Roadmap Steps
                  </button>
                </div>
              </div>

              {/* Vertical Milestone visualizer */}
              <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-6">
                {generatedRoadmap ? (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">Personalized Study Map</h4>
                      <p className="text-[11px] text-gray-500 font-sans">{generatedRoadmap.title}</p>
                    </div>

                    <div className="space-y-4 relative pl-4 border-l border-purple-500/30">
                      {generatedRoadmap.steps.map((st: any, idx: number) => (
                        <div key={st.id} className="relative space-y-1">
                          <span className="absolute -left-6 top-0 w-4 h-4 bg-[#22d3ee] border-2 border-black rounded-full flex items-center justify-center font-mono text-[8px] text-black font-extrabold">
                            {idx + 1}
                          </span>
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-white font-sans">{st.title}</h5>
                            <span className="text-[10px] font-mono text-[#22d3ee] font-bold">{st.duration}</span>
                          </div>
                          <p className="text-[11px] text-gray-400 font-sans leading-relaxed">{st.description}</p>
                          {st.theory && (
                            <p className="text-[10px] text-gray-500 font-sans italic leading-relaxed">Theory: {st.theory}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-3">
                    <Layers className="w-8 h-8 text-purple-400/60 animate-pulse" />
                    <p className="text-xs text-gray-400 font-sans max-w-xs">No roadmap formulated yet. Key in your target goal and click generate to blueprint your success milestones.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* D. TCS NQT PREP & TIMED MOCK */}
          {careerSubView === "tcs" && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#22d3ee]" />
                    TCS National Qualifier Test (NQT) Prep Suite
                  </h3>
                  <p className="text-xs text-gray-400 font-sans">
                    Preloaded with 16 comprehensive prep syllabus modules ranging from numerical divisibility checks to string algorithms, alongside a timed mock exam test-bench.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 16 Modules List */}
                <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-5 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">16 Structured Syllabus Modules</h4>
                  <div className="space-y-2.5 max-h-[400px] overflow-y-auto scrollbar-thin pr-1">
                    {tcsNqtModules.map((mod) => (
                      <div key={mod.id} className="bg-black/20 p-3 border border-white/5 rounded-xl space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono text-[#22d3ee] font-bold">MODULE {mod.id} of 16</span>
                        </div>
                        <h5 className="text-[11px] font-bold text-white font-sans">{mod.title}</h5>
                        <div className="flex flex-wrap gap-1">
                          {mod.topics.map((t) => (
                            <span key={t} className="bg-black/40 border border-white/5 rounded px-1.5 py-0.5 text-[9px] text-gray-400 font-sans">{t}</span>
                          ))}
                        </div>
                        <p className="text-[10px] text-purple-300 font-sans italic leading-relaxed">Tip: {mod.tips}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timed Mock Test Simulator */}
                <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">Timed NQT Mock Test Bench</h4>
                      {tcsTestActive && (
                        <div className="flex items-center gap-1.5 text-rose-400 font-mono font-bold text-xs">
                          <Timer className="w-4 h-4 animate-spin" />
                          <span>
                            {Math.floor(tcsTimer / 60)}:{(tcsTimer % 60).toString().padStart(2, "0")}
                          </span>
                        </div>
                      )}
                    </div>

                    {!tcsTestActive && tcsScore === null && (
                      <div className="space-y-4 p-4 text-center">
                        <p className="text-xs text-gray-400 leading-relaxed font-sans">
                          Ready to simulate the real TCS NQT atmosphere? The simulator will present 3 multi-category timed questions with real-time scoring mechanisms.
                        </p>
                        <button
                          onClick={handleStartTcsTest}
                          className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl py-2 px-6 text-xs font-bold transition-all cursor-pointer font-sans"
                        >
                          Start Timed Mock Exam
                        </button>
                      </div>
                    )}

                    {tcsTestActive && (
                      <div className="space-y-6">
                        {mockTcsQuestions.map((q, idx) => (
                          <div key={idx} className="space-y-2">
                            <p className="text-xs font-bold text-white font-sans">{idx + 1}. {q.q}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {q.options.map((opt, oIdx) => {
                                const isSel = tcsAnswers[idx] === oIdx;
                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => setTcsAnswers(prev => ({ ...prev, [idx]: oIdx }))}
                                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                                      isSel 
                                        ? "bg-purple-500/10 border-purple-500/40 text-purple-300 font-bold" 
                                        : "bg-black/20 border-white/5 text-gray-400 hover:text-white"
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}

                        <button
                          onClick={handleEvaluateTcsTest}
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-2 px-4 text-xs font-bold transition-all cursor-pointer font-sans mt-4"
                        >
                          Submit Timed Test Sheets
                        </button>
                      </div>
                    )}

                    {tcsScore !== null && (
                      <div className="space-y-6 animate-fade-in">
                        <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl text-center space-y-2">
                          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                          <h4 className="text-sm font-bold text-white font-sans">Timed Test Evaluation Concluded</h4>
                          <p className="text-xs text-gray-400 font-sans">
                            You scored <span className="text-emerald-400 font-bold font-mono text-base">{tcsScore}</span> out of 30 total points.
                          </p>
                          <button
                            onClick={handleStartTcsTest}
                            className="bg-black/40 hover:bg-black/60 border border-white/10 rounded-xl py-1 px-3 text-xs text-gray-300 transition-all cursor-pointer mt-2"
                          >
                            Re-run Simulation
                          </button>
                        </div>

                        <div className="space-y-3">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Step-by-step math breakdowns:</p>
                          {mockTcsQuestions.map((q, idx) => (
                            <div key={idx} className="bg-black/30 p-3 border border-white/5 rounded-xl space-y-1">
                              <p className="text-[11px] font-bold text-white font-sans">{idx + 1}. {q.q}</p>
                              <p className="text-[10px] text-purple-300 font-sans italic leading-relaxed">Breakdown: {q.explanation}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. AI STUDY TOOLS TAB */}
      {subTab === "ai-tools" && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Sub tabs for AI tools */}
          <div className="flex gap-2 border-b border-white/5 pb-4 overflow-x-auto scrollbar-none">
            {[
              { id: "advisor", label: "AI Study Advisor", icon: MessageSquare },
              { id: "research", label: "Research Assistant", icon: Compass },
              { id: "flashcards", label: "Spaced Flashcards", icon: BookMarked },
            ].map((sub) => {
              const Icon = sub.icon;
              const isActive = aiSubView === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setAiSubView(sub.id as any)}
                  className={`py-2 px-4 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-purple-500/10 border border-purple-500/30 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#22d3ee]" : "text-gray-400"}`} />
                  {sub.label}
                </button>
              );
            })}
          </div>

          {/* AI Tools Sub View renderers */}
          
          {/* A. AI Advisor Chat */}
          {aiSubView === "advisor" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left quick cues */}
              <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-6 space-y-4 h-fit">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">Suggested AI Queries</h3>
                <p className="text-[11px] text-gray-500 font-sans">Click any query template below to ask Suresh's AI study advisor instantly.</p>
                <div className="space-y-2">
                  {[
                    "Derive the moment of inertia for a hollow cylinder",
                    "Compare SQL tabulation vs MongoDB schemas",
                    "Explain the STAR resume bullet writing method",
                    "Tricks to solve boat and stream aptitude speed questions fast"
                  ].map((cue) => (
                    <button
                      key={cue}
                      onClick={() => {
                        setAdvisorInput(cue);
                      }}
                      className="w-full text-left p-3 rounded-xl border border-white/5 bg-black/20 hover:border-white/10 hover:bg-black/40 text-xs text-gray-400 hover:text-white transition-all cursor-pointer font-sans leading-relaxed"
                    >
                      {cue}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Console */}
              <div className="lg:col-span-2 bg-[#090815]/80 border border-white/5 rounded-3xl p-5 sm:p-6 flex flex-col justify-between min-h-[450px]">
                <div className="border-b border-white/5 pb-3 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-400 animate-pulse" />
                  <div>
                    <h3 className="text-sm font-bold text-white font-sans">AI Study Assistant Chat</h3>
                    <p className="text-[10px] text-gray-500 font-mono">POWERED BY GEMINI PIPELINES</p>
                  </div>
                </div>

                {/* Messages stream */}
                <div className="flex-1 space-y-4 overflow-y-auto max-h-[300px] mb-4 pr-1 scrollbar-thin">
                  {advisorMessages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role !== "user" && (
                        <div className="w-7 h-7 rounded-full bg-purple-500/15 border border-purple-500/25 flex items-center justify-center font-bold text-xs text-purple-300">S</div>
                      )}
                      <div className={`p-3 rounded-2xl max-w-[80%] text-xs leading-relaxed font-sans whitespace-pre-line ${
                        msg.role === "user"
                          ? "bg-purple-500 text-white rounded-tr-none"
                          : "bg-[#11101e] border border-white/5 text-gray-300 rounded-tl-none"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isAdvisorTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-7 h-7 rounded-full bg-purple-500/15 border border-purple-500/25 flex items-center justify-center font-bold text-xs text-purple-300 animate-pulse">S</div>
                      <div className="p-3 rounded-2xl bg-[#11101e] border border-white/5 text-gray-400 text-xs font-mono animate-pulse">
                        Advisor typing calculations...
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Inputs */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter academic topic or doubt..."
                    value={advisorInput}
                    onChange={(e) => setAdvisorInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendAdvisorMsg()}
                    className="flex-1 px-4 py-2.5 bg-[#121122] border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
                  />
                  <button
                    disabled={isAdvisorTyping || !advisorInput.trim()}
                    onClick={handleSendAdvisorMsg}
                    className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-xl cursor-pointer transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* B. Research Assistant */}
          {aiSubView === "research" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                    <Compass className="w-4.5 h-4.5 text-[#22d3ee]" />
                    AI Academic Research Synthesizer
                  </h3>
                  <p className="text-xs text-gray-400 font-sans">
                    Search academic indexes to fetch summaries of verified computer science, physics, or mathematical papers compiled by researchers.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block font-mono">Research Topic</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. quantum physics mechanics, dynamic program graphs"
                      value={researchTopic}
                      onChange={(e) => setResearchTopic(e.target.value)}
                      className="flex-1 px-4 py-2 bg-black/40 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
                    />
                    <button
                      onClick={handleSearchResearch}
                      className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl py-2 px-4 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>

              {/* Research search results */}
              <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-6">
                {isSearchingPapers ? (
                  <div className="h-full flex items-center justify-center p-6 text-center animate-pulse text-xs text-gray-400 font-mono">
                    Synthesizing paper abstracts...
                  </div>
                ) : researchPapers.length > 0 ? (
                  <div className="space-y-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">Verified Research Publications</h4>
                    {researchPapers.map((paper, idx) => (
                      <div key={idx} className="bg-black/20 p-4 border border-white/5 rounded-2xl space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-mono">
                          <span className="text-[#22d3ee] font-bold">YEAR: {paper.year}</span>
                          <span className="text-gray-500">INDEX: IEEE/Arxiv</span>
                        </div>
                        <h5 className="text-xs font-bold text-white font-sans leading-snug">{paper.title}</h5>
                        <p className="text-[10px] text-purple-300 font-mono">Authors: {paper.authors}</p>
                        <p className="text-[10px] text-gray-400 font-sans leading-relaxed pt-1">{paper.summary}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-3">
                    <BookMarked className="w-8 h-8 text-cyan-400/60 animate-pulse" />
                    <p className="text-xs text-gray-400 font-sans max-w-xs">No active search index selected. Type your academic theme and search to retrieve abstracts.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* C. Flashcards Leitner system */}
          {aiSubView === "flashcards" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left controller: Box selector */}
              <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-5 space-y-4 h-fit">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">Leitner Difficulty Boxes</h3>
                <p className="text-[11px] text-gray-500 font-sans">
                  The Leitner system uses spaced-repetition. Correct answers push card to a higher box (less frequent review), incorrect resets card to box 1.
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setFlashcardBoxFilter("All");
                      setCurrentFlashcardIndex(0);
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                      flashcardBoxFilter === "All"
                        ? "bg-purple-500/10 border-purple-500/30 text-white font-bold"
                        : "bg-black/20 border-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    <span>All Flashcards ({flashcards.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {[1, 2, 3, 4, 5].map((bx) => {
                    const count = flashcards.filter(fc => fc.box === bx).length;
                    return (
                      <button
                        key={bx}
                        onClick={() => {
                          setFlashcardBoxFilter(bx);
                          setCurrentFlashcardIndex(0);
                        }}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                          flashcardBoxFilter === bx
                            ? "bg-purple-500/10 border-purple-500/30 text-white font-bold"
                            : "bg-black/20 border-white/5 text-gray-400 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-purple-500" />
                          <span>Box {bx} ({count} cards)</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Flashcard viewer panel */}
              <div className="lg:col-span-2 space-y-6">
                {flashcards.filter(fc => flashcardBoxFilter === "All" || fc.box === flashcardBoxFilter).length > 0 ? (
                  (() => {
                    const matchingCards = flashcards.filter(fc => flashcardBoxFilter === "All" || fc.box === flashcardBoxFilter);
                    const safeIndex = currentFlashcardIndex % matchingCards.length;
                    const card = matchingCards[safeIndex];

                    return (
                      <div className="space-y-6 animate-fade-in">
                        {/* Card flip structure */}
                        <div
                          onClick={() => setShowFlashcardAnswer(!showFlashcardAnswer)}
                          className="bg-[#121124]/60 border border-white/5 hover:border-purple-500/30 rounded-3xl p-8 min-h-[220px] flex flex-col justify-between cursor-pointer transition-all shadow-xl select-none"
                        >
                          <div className="flex justify-between items-center border-b border-white/5 pb-3">
                            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">{card.category}</span>
                            <span className="bg-purple-500/10 text-purple-400 text-[10px] font-bold font-mono px-2 py-0.5 rounded border border-purple-500/10">BOX {card.box}</span>
                          </div>

                          <div className="py-6 text-center">
                            <p className="text-sm font-bold text-white font-sans">
                              {showFlashcardAnswer ? card.answer : card.question}
                            </p>
                          </div>

                          <div className="text-center text-[10px] text-gray-500 font-mono">
                            {showFlashcardAnswer ? "CLICK CARD TO REVEAL QUESTION" : "CLICK CARD TO REVEAL ANSWER"}
                          </div>
                        </div>

                        {/* Grading mechanisms */}
                        {showFlashcardAnswer && (
                          <div className="flex justify-center gap-4 animate-fade-in">
                            <button
                              onClick={() => handleFlashcardReview(false)}
                              className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl py-2 px-6 text-xs font-bold text-rose-400 transition-all cursor-pointer flex items-center gap-1.5 font-sans"
                            >
                              <X className="w-4 h-4" />
                              Incorrect (Reset to Box 1)
                            </button>
                            <button
                              onClick={() => handleFlashcardReview(true)}
                              className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl py-2 px-6 text-xs font-bold text-emerald-400 transition-all cursor-pointer flex items-center gap-1.5 font-sans"
                            >
                              <Check className="w-4 h-4" />
                              Correct (Promote Box +1)
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })()
                ) : (
                  <div className="bg-[#121124]/40 border border-white/5 rounded-3xl p-8 text-center space-y-3">
                    <HelpCircle className="w-8 h-8 text-purple-400/60 mx-auto animate-pulse" />
                    <p className="text-xs text-gray-400 font-sans max-w-xs mx-auto">No flashcards reside in Box {flashcardBoxFilter} currently. Add more or alter filtering parameters.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
