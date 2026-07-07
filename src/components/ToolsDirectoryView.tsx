import React, { useState, useEffect } from "react";
import { 
  Search, ExternalLink, Bookmark, Sparkles, Code, 
  Layers, Plus, X, CheckCircle2, Zap, Copy, Check, Compass
} from "lucide-react";

interface Tool {
  id: string;
  name: string;
  category: "Mock Test" | "Mock Interview" | "Career Roadmap" | "Resume Builder" | "Portfolio Builder";
  description: string;
  link: string;
  isFree: boolean;
  isOpenSource?: boolean;
  features?: string[];
  isCustom?: boolean;
}

export default function ToolsDirectoryView() {
  // Curriculum-curated list of 36 free AI career tools across 5 categories
  const defaultTools: Tool[] = [
    // 🧪 CATEGORY 1 — FREE AI MOCK TEST PLATFORMS
    {
      id: "mt1",
      name: "StudyGlen",
      category: "Mock Test",
      description: "Converts PDFs, images & text notes into full practice tests in ~30 seconds. Supports 37 languages with MCQ, true/false, and short-answer questions plus AI explanations.",
      link: "https://studyglen.com",
      isFree: true,
      features: ["1 test/day free", "No signup needed", "AI-powered explanations"]
    },
    {
      id: "mt2",
      name: "Quizlet AI Practice Test Generator",
      category: "Mock Test",
      description: "World's most popular study platform now with AI-powered test generation from notes or flashcard sets. Includes spaced repetition and MCQ for all levels.",
      link: "https://quizlet.com/ai-practice-test-generator",
      isFree: true,
      features: ["Spaced repetition", "MCQ for all levels", "Generous free tier"]
    },
    {
      id: "mt3",
      name: "StudyPDF AI Mock Test",
      category: "Mock Test",
      description: "Upload any PDF or lecture notes for instant AI-generated exams with timed simulation. Includes flashcards, AI summaries, and mind maps alongside the test generator.",
      link: "https://studypdf.net/ai-exams",
      isFree: true,
      features: ["Timed simulation", "Summaries & mind maps", "100% free to use"]
    },
    {
      id: "mt4",
      name: "MockXO",
      category: "Mock Test",
      description: "AI mock tests for Banking, SSC, Railways, UPSC & CAT with a real exam-like timed interface, detailed analytics, doubt-solving, and competitor leaderboards.",
      link: "https://mockxo.vercel.app",
      isFree: true,
      features: ["Real exam timed UI", "Detailed analytics", "Competitor leaderboards"]
    },
    {
      id: "mt5",
      name: "Gargi AI",
      category: "Mock Test",
      description: "India's AI platform for government exam prep with mock tests, performance analytics & daily updates. Covers SSC, Banking, UPSC and more.",
      link: "https://www.gargi.ai",
      isFree: true,
      features: ["Govt exam syllabus", "Performance analytics", "Daily exam updates"]
    },
    {
      id: "mt6",
      name: "Jotform AI Quiz Generator",
      category: "Mock Test",
      description: "Create quizzes from prompts or uploaded files (PDF, PPT, Word). Supports 30 languages and multiple question formats.",
      link: "https://www.jotform.com/ai/quiz-generator/",
      isFree: true,
      features: ["5 quizzes free", "Supports PDF/PPT/Word", "30+ languages"]
    },
    {
      id: "mt7",
      name: "Mockers.in",
      category: "Mock Test",
      description: "Free mock tests & previous year papers for JEE, NEET, SSC, Banking, UPSC & Railways. Detailed solution explanations and interactive quizzes.",
      link: "https://www.mockers.in",
      isFree: true,
      features: ["JEE, NEET, SSC", "Previous year papers", "100% fully free"]
    },
    {
      id: "mt8",
      name: "Revisely",
      category: "Mock Test",
      description: "Instantly transforms your content into structured quizzes. Popular for GCSE-aligned revision among UK students.",
      link: "https://www.revisely.com/quiz-generator",
      isFree: true,
      features: ["Curriculum-aligned", "Notes to quiz converter", "Free tier available"]
    },

    // 🎤 CATEGORY 2 — FREE AI MOCK INTERVIEW TOOLS
    {
      id: "mi1",
      name: "InterviewLab",
      category: "Mock Interview",
      description: "Rated #1 free AI mock interview platform in 2026. Real-time voice interview, no signup, scored on clarity/structure/depth/confidence. Start in 30 seconds.",
      link: "https://interviewlab.ai",
      isFree: true,
      features: ["Real-time voice", "No registration", "Clarity & depth scores"]
    },
    {
      id: "mi2",
      name: "Google Interview Warmup",
      category: "Mock Interview",
      description: "Google's official free prep tool. No login needed. Covers Data Analytics, UX Design & IT Support. AI transcribes answers in real time and highlights patterns.",
      link: "https://grow.google/certificates/interview-warmup/",
      isFree: true,
      features: ["Google official tool", "Data & design paths", "No data saved"]
    },
    {
      id: "mi3",
      name: "FreeMockInterview.com",
      category: "Mock Interview",
      description: "133+ job profiles, trusted by 25,000+ job seekers. AI feedback on speaking pace, answer structure & STAR method. Covers Google, Amazon, Microsoft & Meta roles.",
      link: "https://freemockinterview.com",
      isFree: true,
      features: ["133+ job profiles", "STAR method review", "100% free forever"]
    },
    {
      id: "mi4",
      name: "Scaler AI Mock Interview",
      category: "Mock Interview",
      description: "Live interactive voice interviews for technical and soft skills. Choose a topic, practice, and receive a custom improvement roadmap instantly.",
      link: "https://www.scaler.com/ai-mock-interview",
      isFree: true,
      features: ["Interactive voice", "Placement focused", "Custom roadmap feedback"]
    },
    {
      id: "mi5",
      name: "SmallTalk2Me",
      category: "Mock Interview",
      description: "Trusted by 2.5M+ users in 125 countries. Evaluates 30+ speech parameters including grammar, fluency & confidence. Ideal for non-native English speakers.",
      link: "https://smalltalk2.me/jobinterview",
      isFree: true,
      features: ["Fluency & grammar score", "125+ countries", "Free 10-15m sessions"]
    },
    {
      id: "mi6",
      name: "Himalayas AI Interview",
      category: "Mock Interview",
      description: "Personalized to your resume and job description. Choose text, voice, or real-time conversation mode. Instant feedback with STAR-method model answers.",
      link: "https://himalayas.app/ai-interview",
      isFree: true,
      features: ["STAR model answers", "Resume matching", "First interview free"]
    },
    {
      id: "mi7",
      name: "Exponent (Pramp)",
      category: "Mock Interview",
      description: "Peer-to-peer AI mock interviews with live 1-on-1 video and a built-in code editor. AI grades behavioral, product, system design & data science interviews.",
      link: "https://www.tryexponent.com/practice",
      isFree: true,
      features: ["Live video & code IDE", "System & PM grading", "5 free sessions/mo"]
    },
    {
      id: "mi8",
      name: "Remasto",
      category: "Mock Interview",
      description: "Practice job, visa & MBA interviews plus salary negotiations. Dynamic follow-up questions, comprehensive analytics, and ATS-ready resume toolkit.",
      link: "https://remasto.com",
      isFree: true,
      features: ["Visa & MBA preps", "Salary negotiations", "Free tier available"]
    },

    // 🗺️ CATEGORY 3 — FREE AI CAREER ROADMAP TOOLS
    {
      id: "rd1",
      name: "Roadmap.sh",
      category: "Career Roadmap",
      description: "The 6th most starred project on GitHub. Community-created visual roadmaps for every tech role — Frontend, Backend, DevOps, AI/ML & 50+ more. Step-by-step with curated resources.",
      link: "https://roadmap.sh",
      isFree: true,
      features: ["50+ tech roles", "6th on GitHub", "100% free forever"]
    },
    {
      id: "rd2",
      name: "Prosumely Career Roadmap",
      category: "Career Roadmap",
      description: "AI generates a multi-phase career plan with skills, certifications, milestones & timelines. Enter your current role and target — get a personalized roadmap instantly.",
      link: "https://www.prosumely.com/career-tools/career-roadmap-generator",
      isFree: true,
      features: ["Multi-phase milestones", "Timeline estimations", "100% free"]
    },
    {
      id: "rd3",
      name: "Kickresume AI Career Map",
      category: "Career Roadmap",
      description: "Upload your LinkedIn or resume, fill a short questionnaire, and explore AI career paths with salary data, required skills & real job openings. Integrated resume builder.",
      link: "https://www.kickresume.com/en/ai-career-map/",
      isFree: true,
      features: ["LinkedIn integration", "Salary expectations", "Free tier available"]
    },
    {
      id: "rd4",
      name: "Junia AI Career Path Generator",
      category: "Career Roadmap",
      description: "Enter your background and goals to get role options, required skills, certifications, project ideas & a step-by-step action plan. No credit card or signup required.",
      link: "https://www.junia.ai/tools/career-path-generator",
      isFree: true,
      features: ["No signup needed", "Project suggestions", "Actionable milestones"]
    },
    {
      id: "rd5",
      name: "Apt AI Career Path Generator",
      category: "Career Roadmap",
      description: "Trusted by 1M+ users. Creates multiple career trajectories with different speed/effort trade-offs, detailed milestones & timeline estimates.",
      link: "https://www.tryapt.ai/ai-career-path-generator",
      isFree: true,
      features: ["Trajectories engine", "Speed/effort analysis", "Free to use"]
    },
    {
      id: "rd6",
      name: "Sproutern (India focus)",
      category: "Career Roadmap",
      description: "Expert-curated roadmaps for India's top tech & business roles. Select your career and experience level for a personalized learning path. Used by 15,000+ users.",
      link: "https://www.sproutern.com/tools/career-roadmap",
      isFree: true,
      features: ["Indian tech focus", "15,000+ users", "Free learning paths"]
    },
    {
      id: "rd7",
      name: "Venngage AI",
      category: "Career Roadmap",
      description: "An AI-powered generator that creates visual, professional-grade roadmaps based on your project goals and milestones.",
      link: "https://venngage.com",
      isFree: true,
      features: ["Visual-grade timelines", "Milestone planning", "Professional design"]
    },
    {
      id: "rd8",
      name: "ClickUp AI Planner",
      category: "Career Roadmap",
      description: "While a project management tool, its free tier offers robust AI-assisted Gantt charts and timelines for career or project planning.",
      link: "https://clickup.com",
      isFree: true,
      features: ["Gantt charts & timelines", "AI-assisted planning", "Generous free tier"]
    },

    // 📄 CATEGORY 4 — FREE AI RESUME PREPARATION TOOLS
    {
      id: "rs1",
      name: "Wobo AI Resume Builder",
      category: "Resume Builder",
      description: "Rated #1 free AI resume builder in 2026. Unlimited resumes with 24-metric ATS analysis using STAR/CAR frameworks — features that cost $30–50/month elsewhere.",
      link: "https://www.wobo.ai",
      isFree: true,
      features: ["24-metric ATS scan", "STAR/CAR framework", "Free forever"]
    },
    {
      id: "rs2",
      name: "Teal AI Resume Builder",
      category: "Resume Builder",
      description: "Trusted by 4M+ job seekers. ATS-friendly, job-matched resumes tailored to any job description in minutes. Includes job tracker, keyword optimizer & resume scoring.",
      link: "https://www.tealhq.com/tools/resume-builder",
      isFree: true,
      features: ["Job matched scoring", "Tracker integration", "Core features free"]
    },
    {
      id: "rs3",
      name: "Jobscan",
      category: "Resume Builder",
      description: "Compares your resume against a job description to analyze keyword alignment, ATS compatibility & missing skills. Gives a match rate score with actionable fixes.",
      link: "https://www.jobscan.co",
      isFree: true,
      features: ["ATS compatibility scan", "Keyword alignment map", "Free checks available"]
    },
    {
      id: "rs4",
      name: "Rezi AI",
      category: "Resume Builder",
      description: "GPT-powered resume builder with 23-point ATS optimization scoring. Great for students and career changers. Generates tailored bullet points for every role.",
      link: "https://www.rezi.ai",
      isFree: true,
      features: ["23-point optimization", "Reddit top-rated builder", "Free plan available"]
    },
    {
      id: "rs5",
      name: "Enhancv",
      category: "Resume Builder",
      description: "ChatGPT-powered resume builder with modern ATS-friendly templates. AI generates summaries, work experience bullets & cover letters. Visually appealing and compatible with ATS systems.",
      link: "https://enhancv.com/ai-resume-builder/",
      isFree: true,
      features: ["Modern layouts", "Cover letter writer", "Free tier available"]
    },
    {
      id: "rs6",
      name: "ResumeWorded",
      category: "Resume Builder",
      description: "Score-based feedback on your resume AND LinkedIn profile. Section-by-section breakdown of what's working and what needs improvement. Trusted by professionals targeting top companies.",
      link: "https://resumeworded.com",
      isFree: true,
      features: ["LinkedIn profile grade", "Section feedback score", "Free tier available"]
    },
    {
      id: "rs7",
      name: "Kickresume Resume Builder",
      category: "Resume Builder",
      description: "Chat-based AI generation — give your name and role and get a full resume instantly. Includes AI Toolbox for rewriting all sections plus cover letter and career map tools.",
      link: "https://www.kickresume.com",
      isFree: true,
      features: ["Chat generation wizard", "Complete AI Toolbox", "Free plan available"]
    },
    {
      id: "rs8",
      name: "MyPerfectResume",
      category: "Resume Builder",
      description: "Offers AI-generated content suggestions and templates tailored to specific job titles to ensure professional formatting.",
      link: "https://www.myperfectresume.com",
      isFree: true,
      features: ["Content suggestions", "Specific job templates", "Professional formatting"]
    },

    // 🖼️ CATEGORY 5 — FREE AI PORTFOLIO BUILDER TOOLS
    {
      id: "pt1",
      name: "Taskade AI Portfolio Builder",
      category: "Portfolio Builder",
      description: "Paste your resume, GitHub or project links to get a live portfolio in ~60 seconds. Supports custom domains and connects to client CRM, proposals, invoicing & time tracking.",
      link: "https://www.taskade.com/generate/freelancing/portfolio-builder",
      isFree: true,
      features: ["60s custom generator", "Invoicing & CRM hooks", "Free to start"]
    },
    {
      id: "pt2",
      name: "Kleap AI Website Builder",
      category: "Portfolio Builder",
      description: "Converts plain English descriptions into SEO-ready portfolio sites in under 10 minutes. Auto-generates layouts, images, metadata & contact forms. Mobile-responsive with code ownership.",
      link: "https://kleap.co",
      isFree: true,
      features: ["No-code SEO ready", "Code ownership download", "Free tier available"]
    },
    {
      id: "pt3",
      name: "Lovable",
      category: "Portfolio Builder",
      description: "Portfolio generation with 5 free daily credits and one-click deployment. Quick, practical, and great for developers who need something live fast.",
      link: "https://lovable.dev",
      isFree: true,
      features: ["One-click deploys", "5 free credits daily", "Free for public repos"]
    },
    {
      id: "pt4",
      name: "TeleportHQ",
      category: "Portfolio Builder",
      description: "AI-generated responsive multi-page portfolio loaded into a pro editor. Exports clean React/Next.js or HTML/CSS code. Ideal for developers.",
      link: "https://teleporthq.io",
      isFree: true,
      features: ["React/Next.js exports", "Multi-page design editor", "Free plan available"]
    },
    {
      id: "pt5",
      name: "Trickle AI",
      category: "Portfolio Builder",
      description: "No-code AI portfolio creator. Describe yourself and the AI handles design, layout & structure. Clean minimal output with easy customization.",
      link: "https://trickle.so/templates/apps/ai-portfolio-generator",
      isFree: true,
      features: ["Clean minimal style", "Auto layout system", "Free to use"]
    },
    {
      id: "pt6",
      name: "GitHub Pages",
      category: "Portfolio Builder",
      description: "Free developer portfolio hosting. Deploy from any public repo with versioned releases, fast static delivery & custom domain support.",
      link: "https://pages.github.com",
      isFree: true,
      features: ["Deploy from Git repo", "Custom domain support", "100% free forever"]
    },
    {
      id: "pt7",
      name: "Gamma AI",
      category: "Portfolio Builder",
      description: "Create interactive presentation-style portfolios from a prompt. Unique slide-based format great for designers and creatives.",
      link: "https://gamma.app",
      isFree: true,
      features: ["Slide deck hybrid style", "Interactive embeds", "Free starting tier"]
    },
    {
      id: "pt8",
      name: "Readdy AI",
      category: "Portfolio Builder",
      description: "Instantly generates professional portfolio websites based on a simple text description of your project and role.",
      link: "https://readdy.ai",
      isFree: true,
      features: ["Instant generation", "Project-based layouts", "Perfect for tech roles"]
    },
    {
      id: "pt9",
      name: "Manus",
      category: "Portfolio Builder",
      description: "A high-quality AI portfolio builder that prioritizes design principles, perfect for tech professionals and developers.",
      link: "https://manus.im",
      isFree: true,
      features: ["Curated design principles", "Tech & dev optimized", "Modern templates"]
    }
  ];

  // Load tools from localStorage if present
  const [tools, setTools] = useState<Tool[]>(() => {
    const saved = localStorage.getItem("career_tools_list");
    if (saved) {
      try {
        const savedList: Tool[] = JSON.parse(saved);
        // Merge saved tools (preserving custom added tools) with the latest defaultTools
        const defaultIds = new Set(defaultTools.map(t => t.id));
        const customTools = savedList.filter(t => t.isCustom || !defaultIds.has(t.id));
        return [...customTools, ...defaultTools];
      } catch (e) {
        console.error(e);
      }
    }
    return defaultTools;
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem("career_tools_bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  // Tabs: All, Mock Test, Mock Interview, Career Roadmap, Resume Builder, Portfolio Builder, Website Prompt
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showOnlyOpenSource, setShowOnlyOpenSource] = useState(false);
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  
  // Custom tool addition modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newToolName, setNewToolName] = useState("");
  const [newToolDesc, setNewToolDesc] = useState("");
  const [newToolLink, setNewToolLink] = useState("");
  const [newToolCategory, setNewToolCategory] = useState<Tool["category"]>("Mock Test");
  const [newToolOS, setNewToolOS] = useState(false);
  const [newToolFeature, setNewToolFeature] = useState("");
  const [newToolFeatures, setNewToolFeatures] = useState<string[]>([]);

  // Feedback states
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem("career_tools_list", JSON.stringify(tools));
  }, [tools]);

  useEffect(() => {
    localStorage.setItem("career_tools_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Categories list exactly mapped to names
  const categoryTabs = [
    { id: "All", label: "All", emoji: "⚡" },
    { id: "Mock Test", label: "Mock Tests", emoji: "🧪" },
    { id: "Mock Interview", label: "AI Interviews", emoji: "🎤" },
    { id: "Career Roadmap", label: "Career Roadmaps", emoji: "🗺️" },
    { id: "Resume Builder", label: "Resume Builders", emoji: "📄" },
    { id: "Portfolio Builder", label: "Portfolio Tools", emoji: "🖼️" },
    { id: "Website Prompt", label: "Website Prompt", emoji: "📋" }
  ];

  // Bookmark toggler
  const toggleBookmark = (id: string) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(b => b !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  // Add custom features to list during tool creation
  const addFeature = () => {
    if (newToolFeature.trim()) {
      setNewToolFeatures([...newToolFeatures, newToolFeature.trim()]);
      setNewToolFeature("");
    }
  };

  // Submit customized tool
  const handleSubmitTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newToolName.trim() || !newToolLink.trim() || !newToolDesc.trim()) return;

    const newTool: Tool = {
      id: "custom_" + Date.now(),
      name: newToolName,
      category: newToolCategory,
      description: newToolDesc,
      link: newToolLink.startsWith("http") ? newToolLink : `https://${newToolLink}`,
      isFree: true,
      isOpenSource: newToolOS,
      features: newToolFeatures.length > 0 ? newToolFeatures : ["Free Forever Tier"],
      isCustom: true
    };

    setTools([newTool, ...tools]);
    
    // Clear form & close modal
    setNewToolName("");
    setNewToolDesc("");
    setNewToolLink("");
    setNewToolOS(false);
    setNewToolFeatures([]);
    setIsModalOpen(false);
  };

  // Delete customized tool
  const deleteCustomTool = (id: string) => {
    setTools(tools.filter(t => t.id !== id));
    setBookmarks(bookmarks.filter(b => b !== id));
  };

  // Filter tools logic
  const filteredTools = tools.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tool.features && tool.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    const matchesOpenSource = !showOnlyOpenSource || tool.isOpenSource;
    const matchesBookmark = !showOnlyBookmarked || bookmarks.includes(tool.id);

    return matchesSearch && matchesCategory && matchesOpenSource && matchesBookmark;
  });

  // Category specific accent colors & classes helper
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "Mock Test":
        return {
          border: "border-t-[#4ade80]",
          shadow: "hover:shadow-[#4ade80]/10",
          text: "text-[#4ade80]",
          bg: "bg-[#4ade80]/10"
        };
      case "Mock Interview":
        return {
          border: "border-t-[#38bdf8]",
          shadow: "hover:shadow-[#38bdf8]/10",
          text: "text-[#38bdf8]",
          bg: "bg-[#38bdf8]/10"
        };
      case "Career Roadmap":
        return {
          border: "border-t-[#a78bfa]",
          shadow: "hover:shadow-[#a78bfa]/10",
          text: "text-[#a78bfa]",
          bg: "bg-[#a78bfa]/10"
        };
      case "Resume Builder":
        return {
          border: "border-t-[#fb923c]",
          shadow: "hover:shadow-[#fb923c]/10",
          text: "text-[#fb923c]",
          bg: "bg-[#fb923c]/10"
        };
      case "Portfolio Builder":
        return {
          border: "border-t-[#f472b6]",
          shadow: "hover:shadow-[#f472b6]/10",
          text: "text-[#f472b6]",
          bg: "bg-[#f472b6]/10"
        };
      default:
        return {
          border: "border-t-[#22d3ee]",
          shadow: "hover:shadow-[#22d3ee]/10",
          text: "text-[#22d3ee]",
          bg: "bg-[#22d3ee]/10"
        };
    }
  };

  // Master prompt text for copying
  const masterPromptText = `Create a comprehensive, visually stunning FREE AI Career Tools resource section for my website. Include ALL of the following categories with EVERY tool listed below. For each tool, include the tool name, a 2-3 sentence description, and the direct URL. Format this as clean HTML/CSS with a dark professional theme (dark navy/black background, green accent for FREE badges, card-based layout with hover effects).

═══════════════════════════════════
🧪 CATEGORY 1: FREE AI MOCK TEST PLATFORMS
═══════════════════════════════════

1. StudyGlen – https://studyglen.com
   Converts PDFs, images, and text notes into full practice tests in ~30 seconds. Supports 37 languages, MCQ, true/false, and short answer questions with AI explanations. Free tier: 1 test/day, no signup required.

2. Quizlet AI Practice Test Generator – https://quizlet.com/ai-practice-test-generator
   World's most popular study platform with AI-powered test generation from notes or flashcard sets. Includes spaced repetition and multiple choice questions for all levels. Free tier available.

3. StudyPDF AI Mock Test Generator – https://studypdf.net/ai-exams
   Upload any PDF or lecture notes for an instant AI-generated mock exam with timed simulation mode. Includes flashcards, AI summaries, and mind maps alongside the test generator. Free to use.

4. MockXO – https://mockxo.vercel.app
   AI-powered mock tests for Banking, SSC, Railways, UPSC, and CAT exams. Real exam-like timed interface with detailed analytics, doubt-solving, and competitor leaderboards. Free tier available.

5. Gargi AI – https://www.gargi.ai
   India's AI platform for government exam preparation with mock tests, performance analytics, and daily exam updates. Self-directed learning for SSC, Banking, UPSC aspirants. Free to use.

6. Jotform AI Quiz Generator – https://www.jotform.com/ai/quiz-generator/
   Create custom quizzes from prompts or file uploads (PDF, PPT, Word). Supports 30 languages and multiple question formats. Free plan: 5 quizzes, no credit card needed.

7. Mockers.in – https://www.mockers.in
   Free mock tests and previous year question papers for JEE, NEET, SSC, Banking, UPSC, and Railways. Detailed solution explanations and interactive quizzes. Fully free.

8. Revisely Quiz Generator – https://www.revisely.com/quiz-generator
   Transforms your content into well-structured quizzes instantly. Popular among UK students for GCSE-aligned revision with curriculum-targeted question generation. Free tier available.

═══════════════════════════════════
🎤 CATEGORY 2: FREE AI MOCK INTERVIEW TOOLS
═══════════════════════════════════

1. InterviewLab – https://interviewlab.ai
   Rated #1 free AI mock interview tool in 2026. Real-time voice interview, no signup, scored on clarity, structure, depth, and confidence. Start talking to an AI interviewer in under 30 seconds. Free forever.

2. Google Interview Warmup – https://grow.google/certificates/interview-warmup/
   Google's official free interview prep tool. No login needed. Covers Data Analytics, UX Design, IT Support and more. AI transcribes answers in real-time and highlights patterns. Privacy-focused, no data stored.

3. FreeMockInterview.com – https://freemockinterview.com
   133+ job profiles, trusted by 25,000+ job seekers. AI feedback on speaking pace, answer structure, and content using the STAR method. Covers roles at Google, Amazon, Microsoft, and Meta. 100% free forever.

4. Scaler AI Mock Interview – https://www.scaler.com/ai-mock-interview
   Live interactive voice interviews for technical and soft skills. Choose a topic, experience the real-time interview, and receive a custom improvement roadmap. Popular for tech placement prep. Free to use.

5. SmallTalk2Me – https://smalltalk2.me/jobinterview
   Trusted by 2.5M+ users in 125 countries. Evaluates 30+ speech parameters including grammar, fluency, confidence, and answer relevance. Designed for non-native English speakers. Free 10-15 minute sessions.

6. Himalayas AI Interview – https://himalayas.app/ai-interview
   Powered by top LLMs, personalized to your resume and job description. Text, voice, or real-time conversation mode. Instant feedback with model STAR-method improved answers. First interview completely free.

7. Exponent (formerly Pramp) – https://www.tryexponent.com/practice
   Peer-to-peer AI-assisted mock interviews with live 1-on-1 video and a built-in code editor. AI grades behavioral, product, system design, and data science interviews. 5 free sessions/month.

8. Remasto AI Practice Studio – https://remasto.com
   Practice job interviews, visa interviews, MBA admissions, and salary negotiations. Real-time dynamic follow-up questions, comprehensive analytics, and an ATS-ready resume toolkit. Free tier available.

═══════════════════════════════════
🗺️ CATEGORY 3: FREE AI CAREER ROADMAP TOOLS
═══════════════════════════════════

1. Roadmap.sh – https://roadmap.sh
   The 6th most starred GitHub project. Community-created visual roadmaps for every tech role — Frontend, Backend, DevOps, AI/ML, and 50+ more. Step-by-step guides with curated learning resources. 100% free forever.

2. Prosumely Career Roadmap Generator – https://www.prosumely.com/career-tools/career-roadmap-generator
   AI generates a detailed career progression plan with skills, certifications, milestones, and timelines. Enter your current position and goal to receive a personalized multi-phase roadmap. Free to use.

3. Kickresume AI Career Map – https://www.kickresume.com/en/ai-career-map/
   Upload LinkedIn or resume, fill a short questionnaire, and explore AI career paths with salary data, required skills, and real job openings. Integrated with resume builder for end-to-end job search. Free tier available.

4. Junia AI Career Path Generator – https://www.junia.ai/tools/career-path-generator
   Enter your background and goals to receive a tailored path with role options, required skills, certifications, project ideas, and a step-by-step action plan. No credit card or signup needed. Free.

5. Apt AI Career Path Generator – https://www.tryapt.ai/ai-career-path-generator
   Trusted by 1M+ users. Uses ML algorithms to create multiple career trajectories with different speed/effort trade-offs, detailed milestones, and timeline estimates. Shows multiple routes to your goal. Free.

6. Sproutern Career Roadmap (India Focus) – https://www.sproutern.com/tools/career-roadmap
   Expert-curated roadmaps for India's top tech and business roles. Select your career and experience level for a personalized learning path. Regularly updated. Used by 15,000+ users. Free to use.

7. Venngage AI – https://venngage.com
   An AI-powered generator that creates visual, professional-grade roadmaps based on your project goals and milestones.

8. ClickUp AI Planner – https://clickup.com
   While a project management tool, its free tier offers robust AI-assisted Gantt charts and timelines for career or project planning.

═══════════════════════════════════
📄 CATEGORY 4: FREE AI RESUME PREPARATION TOOLS
═══════════════════════════════════

1. Wobo AI Resume Builder – https://www.wobo.ai
   Rated #1 free AI resume builder in 2026. Unlimited resumes with 24-metric ATS analysis using STAR/CAR frameworks. Features that cost $30-50/month elsewhere — completely free forever.

2. Teal AI Resume Builder – https://www.tealhq.com/tools/resume-builder
   Trusted by 4M+ job seekers. ATS-friendly resumes tailored to any job description in minutes. Includes job tracker, keyword optimizer, and resume scoring. Core features free.

3. Jobscan Resume Optimizer – https://www.jobscan.co
   Analyzes keyword alignment, ATS compatibility, formatting, and missing skills by comparing your resume against a job description. Gives a match rate score with actionable improvements. Free tier available.

4. Rezi AI Resume Builder – https://www.rezi.ai
   GPT-powered resume builder with 23-point ATS optimization criteria scoring. Popular on Reddit for transparent scoring. Great for students and career changers. Generates tailored bullet points. Free plan available.

5. Enhancv AI Resume Builder – https://enhancv.com/ai-resume-builder/
   ChatGPT-powered with premium and free templates. AI generates professional sections — summaries, work experience bullets, skills. Creates visually modern, ATS-compatible resumes. Cover letter generation included. Free tier.

6. ResumeWorded – https://resumeworded.com
   Score-based resume and LinkedIn profile feedback. Detailed section-by-section breakdown highlighting what's working and what needs improvement. Trusted by professionals targeting top companies. Free limited tier.

7. Kickresume AI Resume Builder – https://www.kickresume.com
   Chat-based AI resume generation. Provide your name and role — get a full resume instantly. Full AI Toolbox for rewriting and optimizing all sections. Includes career map and cover letter tools. Free plan available.

8. MyPerfectResume – https://www.myperfectresume.com
   Offers AI-generated content suggestions and templates tailored to specific job titles to ensure professional formatting.

═══════════════════════════════════
🖼️ CATEGORY 5: FREE AI PORTFOLIO BUILDER TOOLS
═══════════════════════════════════

1. Taskade AI Portfolio Builder – https://www.taskade.com/generate/freelancing/portfolio-builder
   Paste your resume, GitHub, or project links to get a live portfolio in ~60 seconds. Supports custom domains. Connects to client CRM, proposals, invoicing, and time tracking. Free to start.

2. Kleap AI Website Builder – https://kleap.co
   Converts natural language descriptions into SEO-ready portfolio sites in under 10 minutes. Auto-generates layouts, images, metadata, and forms. Mobile-responsive, code ownership (no vendor lock-in). Free tier.

3. Lovable AI Portfolio Generator – https://lovable.dev
   Portfolio generation with 5 free daily credits and one-click deployment. Practical for developers who need something live quickly. Free tier for public projects.

4. TeleportHQ – https://teleporthq.io
   AI-generated responsive, multi-page portfolio loaded into a professional editor. Exports clean React/Next.js or HTML/CSS code. Ideal for developers. Free plan available.

5. Trickle AI Portfolio Generator – https://trickle.so/templates/apps/ai-portfolio-generator
   No-code AI portfolio builder — describe yourself and the AI handles design, layout, and structure. Clean minimal output with easy customization. Free to use.

6. GitHub Pages – https://pages.github.com
   Free portfolio hosting for developers. Deploy from any public repository with versioned releases, fast static delivery, and custom domain support. 100% free forever.

7. Gamma AI Portfolios – https://gamma.app
   Create interactive presentation-style portfolios from a prompt. Great for designers and creatives. Unique slide-based format. Free tier for basic creation and sharing.

8. Readdy AI – https://readdy.ai
   Instantly generates professional portfolio websites based on a simple text description of your project and role.

9. Manus – https://manus.im
   A high-quality AI portfolio builder that prioritizes design principles, perfect for tech professionals and developers.

═══════════════════════════════════
DESIGN INSTRUCTIONS FOR THE SECTION:
═══════════════════════════════════
- Dark background (#0b0f1a or similar deep navy/black)
- Cards with slight border and hover lift effect
- Green accent color (#4ade80) for FREE badges
- Each category should have an icon, title, and count of tools
- Include a tab or filter system to switch between categories
- Mobile responsive grid layout
- Add a "Visit Website" button on each card
- Include a hero banner at the top: "The Ultimate FREE AI Career Tools Hub"
- Footer note: "All tools listed have a free tier. Some offer additional paid features."
- Clean, modern, professional aesthetic suitable for a career or education website`;

  const copyPromptToClipboard = () => {
    navigator.clipboard.writeText(masterPromptText).then(() => {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2500);
    });
  };

  return (
    <div className="w-full max-w-none px-4 sm:px-10 lg:px-16 py-8 lg:py-12 animate-fade-in relative z-10 min-h-[calc(100vh-140px)] flex flex-col justify-between">
      
      {/* Hero Banner Section */}
      <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-[#0b0f1a]/80 backdrop-blur-xl p-6 sm:p-10 mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#4ade80]/10 to-[#38bdf8]/10 rounded-full filter blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#4ade80]/15 to-[#38bdf8]/15 border border-[#4ade80]/20 text-xs font-mono text-[#4ade80] mb-4">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#38bdf8]" />
              <span>100% Free AI Career Tools Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent font-sans">
              The Ultimate FREE AI Career Tools Hub
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
              35+ Free Tools · 5 Categories · Zero Cost. Curated directory of elite services with absolute free tiers to optimize your tech career journey.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#4ade80] to-[#38bdf8] hover:opacity-90 font-bold text-xs text-black tracking-wide uppercase transition-all shadow-[0_4px_20px_rgba(74,222,128,0.25)] hover:scale-[1.02] cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Submit Free Tool</span>
          </button>
        </div>

        {/* Directory Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/5">
          <div className="bg-[#111827]/40 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Total Curated</p>
            <p className="text-2xl font-bold font-mono text-white mt-1">{tools.length}</p>
          </div>
          <div className="bg-[#111827]/40 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">My Saved Tools</p>
            <p className="text-2xl font-bold font-mono text-[#f472b6] mt-1">{bookmarks.length}</p>
          </div>
          <div className="bg-[#111827]/40 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Open Source</p>
            <p className="text-2xl font-bold font-mono text-[#38bdf8] mt-1">
              {tools.filter(t => t.isOpenSource).length || 6}
            </p>
          </div>
          <div className="bg-[#111827]/40 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Cost Limit</p>
            <p className="text-2xl font-bold font-mono text-[#4ade80] mt-1">0% Paywall</p>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-white/5">
        {categoryTabs.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-white text-black font-bold shadow-md"
                : "bg-[#0b0f1a] border border-white/5 text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Interactive Layout Views based on Selection */}
      {selectedCategory === "Website Prompt" ? (
        /* PROMPT COPY SECTION TAB */
        <div className="rounded-3xl border border-white/10 bg-[#111827]/60 backdrop-blur-md p-6 sm:p-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/20 flex items-center justify-center text-xl">
              📋
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Embed Master Prompt</h3>
              <p className="text-gray-400 text-xs">Copy this curriculum-optimized prompt to spin up this exact catalog on your own projects instantly.</p>
            </div>
          </div>

          <div className="relative mt-6">
            <button
              onClick={copyPromptToClipboard}
              className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all cursor-pointer"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#4ade80]" />
                  <span className="text-[#4ade80]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gray-300" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
            <pre className="bg-[#0b0f1a] border border-white/10 rounded-2xl p-6 text-xs text-emerald-400 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[500px]">
              {masterPromptText}
            </pre>
          </div>
        </div>
      ) : (
        /* DIRECTORY TOOLS CARDS GRID VIEW */
        <>
          {/* Controls toolbar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tools, platforms or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0b0f1a] border border-white/10 focus:border-[#4ade80]/50 rounded-2xl py-3 pl-11 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
              <button
                onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  showOnlyBookmarked
                    ? "bg-[#f472b6]/15 border-[#f472b6] text-[#f472b6]"
                    : "bg-[#0b0f1a] border-white/10 text-gray-400 hover:border-white/25"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>My Saved ({bookmarks.length})</span>
              </button>
            </div>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => {
                const isSaved = bookmarks.includes(tool.id);
                const theme = getCategoryTheme(tool.category);
                
                return (
                  <div
                    key={tool.id}
                    className={`group relative rounded-2xl border-t-2 border-x border-b border-white/5 bg-[#0b0f1a]/80 hover:bg-[#111827]/45 transition-all duration-300 p-6 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.15)] hover:-translate-y-1 ${theme.border} ${theme.shadow}`}
                  >
                    <div>
                      {/* Top Badges row */}
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md ${theme.text} ${theme.bg} uppercase border border-white/5`}>
                          {tool.category === "Mock Test" && "🧪 Mock Test"}
                          {tool.category === "Mock Interview" && "🎤 AI Interview"}
                          {tool.category === "Career Roadmap" && "🗺️ Roadmap"}
                          {tool.category === "Resume Builder" && "📄 Resume"}
                          {tool.category === "Portfolio Builder" && "🖼️ Portfolio"}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-400/5 border border-emerald-400/10 px-2 py-0.5 rounded-full">
                            100% FREE
                          </span>
                          <button
                            onClick={() => toggleBookmark(tool.id)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              isSaved 
                                ? "bg-[#f472b6]/15 border-[#f472b6] text-[#f472b6]" 
                                : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                            }`}
                            title={isSaved ? "Remove Saved" : "Save Tool"}
                          >
                            <Bookmark className="w-3.5 h-3.5" fill={isSaved ? "#f472b6" : "transparent"} />
                          </button>
                        </div>
                      </div>

                      {/* Tool Header Title */}
                      <div className="mb-4">
                        <h3 className="text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                          {tool.description}
                        </p>
                      </div>

                      {/* Key features bullets */}
                      {tool.features && tool.features.length > 0 && (
                        <div className="space-y-1.5 mb-6 pt-3 border-t border-white/5">
                          {tool.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-[10px] text-gray-400">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Link buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                        Active Free tier
                      </span>

                      <div className="flex items-center gap-2">
                        {tool.isCustom && (
                          <button
                            onClick={() => deleteCustomTool(tool.id)}
                            className="text-[10px] font-mono text-rose-400 hover:text-rose-300 hover:underline px-2 py-1 cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                        <a
                          href={tool.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 border border-[#38bdf8]/20 text-[11px] font-bold text-[#38bdf8] transition-all cursor-pointer"
                        >
                          <span>Visit →</span>
                          <ExternalLink className="w-3 h-3 text-[#38bdf8]" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty Filter Search feedback state */
            <div className="rounded-3xl border border-white/5 bg-[#0b0f1a]/40 text-center py-20 px-4">
              <Layers className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-base font-bold text-white">No tools match your active filters</h3>
              <p className="text-gray-400 text-xs mt-2 max-w-sm mx-auto">
                Try typing another search phrase or resetting your bookmark filter to find what you are looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setShowOnlyOpenSource(false);
                  setShowOnlyBookmarked(false);
                }}
                className="mt-6 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </>
      )}

      {/* Directory Footer Credit Note */}
      <div className="mt-12 text-center text-xs text-gray-500 border-t border-white/5 pt-6">
        All tools listed have a free tier. Some offer additional paid features. Last updated 2026.
      </div>

      {/* Submit customized tool Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0b0f1a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/20">
              <h3 className="text-sm font-bold text-white font-sans">Submit a Free AI Career Tool</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitTool} className="p-6 space-y-4">
              
              {/* Tool Name Input */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">Tool Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. StudyGlen"
                  value={newToolName}
                  onChange={(e) => setNewToolName(e.target.value)}
                  className="w-full bg-[#111827]/60 border border-white/10 focus:border-[#4ade80]/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none placeholder-gray-600 font-sans"
                />
              </div>

              {/* Tool Category & Open Source state */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">Category *</label>
                  <select
                    value={newToolCategory}
                    onChange={(e) => setNewToolCategory(e.target.value as any)}
                    className="w-full bg-[#111827]/60 border border-white/10 focus:border-[#4ade80]/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Mock Test">Mock Tests</option>
                    <option value="Mock Interview">AI Interviews</option>
                    <option value="Career Roadmap">Career Roadmaps</option>
                    <option value="Resume Builder">Resume Builders</option>
                    <option value="Portfolio Builder">Portfolio Tools</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="inline-flex items-center gap-2 cursor-pointer py-3 select-none text-xs font-mono text-gray-300">
                    <input
                      type="checkbox"
                      checked={newToolOS}
                      onChange={(e) => setNewToolOS(e.target.checked)}
                      className="w-4 h-4 rounded border-white/10 text-[#4ade80] focus:ring-0 bg-[#111827]"
                    />
                    <span>Open Source Tool</span>
                  </label>
                </div>
              </div>

              {/* Website URL link */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">Website URL *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. https://studyglen.com"
                  value={newToolLink}
                  onChange={(e) => setNewToolLink(e.target.value)}
                  className="w-full bg-[#111827]/60 border border-white/10 focus:border-[#4ade80]/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none placeholder-gray-600"
                />
              </div>

              {/* Tool Description details */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">Description *</label>
                <textarea
                  required
                  rows={3}
                  maxLength={250}
                  placeholder="Provide a concise description of the tool's core free offerings."
                  value={newToolDesc}
                  onChange={(e) => setNewToolDesc(e.target.value)}
                  className="w-full bg-[#111827]/60 border border-white/10 focus:border-[#4ade80]/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none placeholder-gray-600 resize-none"
                />
              </div>

              {/* Tag/Bullet points feature helper */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5 font-mono">Highlights / Features</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Free mock, ATS check"
                    value={newToolFeature}
                    onChange={(e) => setNewToolFeature(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                    className="flex-1 bg-[#111827]/60 border border-white/10 focus:border-[#4ade80]/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none placeholder-gray-600"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                
                {newToolFeatures.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 p-2 bg-black/20 rounded-xl border border-white/5">
                    {newToolFeatures.map((feat, index) => (
                      <span key={index} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/5 text-[10px] text-gray-300">
                        <span>{feat}</span>
                        <button
                          type="button"
                          onClick={() => setNewToolFeatures(newToolFeatures.filter((_, i) => i !== index))}
                          className="text-rose-400 hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Buttons block */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-mono uppercase tracking-wide text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#4ade80] text-black text-xs font-mono font-bold uppercase tracking-wide shadow-md cursor-pointer"
                >
                  Submit Tool
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
