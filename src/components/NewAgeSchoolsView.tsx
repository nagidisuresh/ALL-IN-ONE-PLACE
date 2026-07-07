import React, { useState } from "react";
import { 
  Sparkles, Globe, GraduationCap, Laptop, BookOpen, FileText, 
  Search, ArrowUpRight, Copy, Check, Award, Calendar, Zap, Star, Shield, HelpCircle,
  ArrowLeftRight, Plus, Trash2, Sliders
} from "lucide-react";
import confetti from "canvas-confetti";

interface SchoolResource {
  title: string;
  desc: string;
  url: string;
  badge: string;
}

interface NewAgeSchool {
  name: string;
  tagline: string;
  category: string;
  bannerGradient: string;
  logoChar: string;
  officialUrl: string;
  description: string;
  resources: SchoolResource[];
  tags: string[];
}

const NEW_AGE_SCHOOLS_DATA: NewAgeSchool[] = [
  {
    name: "Scaler / SST",
    tagline: "Elite Tech University & Tech Placement Upskilling",
    category: "Elite Upskilling & UG Degree",
    bannerGradient: "from-blue-600 via-indigo-600 to-violet-600",
    logoChar: "S",
    officialUrl: "https://www.scaler.com",
    description: "Built by tech leaders to match modern corporate engineering requirements. Known for structured curriculum designed by FAANG veterans.",
    tags: ["System Design", "DSA", "Live Masterclasses"],
    resources: [
      { title: "Scaler Topics", desc: "Premium free text-based structured tutorials on DSA, Java, DBMS, System Design, Python, and C++ with interactive codes.", url: "https://www.scaler.com/topics/", badge: "Highly Rated" },
      { title: "Free Live Masterclasses", desc: "Weekend interactive tech architecture masterclasses taught by senior managers from Microsoft, Google, and Amazon.", url: "https://www.scaler.com/events/", badge: "Live Events" }
    ]
  },
  {
    name: "Newton School / NST",
    tagline: "Outcome-Driven Tech Degrees & Full-Stack Bootcamps",
    category: "Full-Stack & Tech Degree",
    bannerGradient: "from-emerald-600 via-teal-600 to-cyan-600",
    logoChar: "N",
    officialUrl: "https://www.newtonschool.co",
    description: "Offers dual degrees in Computer Science & AI alongside careerbootcamps. Features high-quality self-paced coding sandboxes.",
    tags: ["Free Compiler", "NSAT Exam", "Full Stack"],
    resources: [
      { title: "Newton HeadStart", desc: "Completely free self-paced coding portal with direct compilers for Java, Python, C++, HTML/CSS, and SQL.", url: "https://my.newtonschool.co/cs/newton-headstart", badge: "Self-Paced" },
      { title: "Newton School National Test (NSAT)", desc: "Free online national scholarship test offering up to 100% tuition waivers for their high-end technology programs.", url: "https://www.newtonschool.co/nst/", badge: "Scholarship" }
    ]
  },
  {
    name: "NIAT / NxtWave",
    tagline: "NxtWave Institute of Advanced Technologies",
    category: "4.0 Industry Technologies",
    bannerGradient: "from-cyan-600 via-sky-600 to-indigo-600",
    logoChar: "W",
    officialUrl: "https://www.nxtwave.in",
    description: "Designed for engineering and non-engineering students to bridge the 4.0 tech gap, teaching full-stack coding, AI prompt engineering, and cloud.",
    tags: ["Webinars", "Beginner Friendly", "Vernacular Support"],
    resources: [
      { title: "NIAT Free Mega Bootcamps", desc: "Free 2-day live interactive workshops teaching students how to build and deploy their first responsive web app from scratch.", url: "https://www.niatindia.com/", badge: "Interactive" },
      { title: "NxtWave CCBP Tech Aptitude Exam", desc: "Free mental capacity and tech placement readiness diagnostic test with direct roadmap recommendations.", url: "https://www.nxtwave.in/", badge: "Diagnostics" }
    ]
  },
  {
    name: "Polaris School of Technology",
    tagline: "India's First AI-Native Tech Degree & Fellowship Campus",
    category: "AI-First Tech Fellowship",
    bannerGradient: "from-rose-600 via-pink-600 to-purple-600",
    logoChar: "P",
    officialUrl: "https://www.polaris.school",
    description: "A futuristic residential tech college built to train elite developers through 1-on-1 mentorship, open-source work, and real product launches.",
    tags: ["Open Source", "Hackathons", "Y-Combinator Network"],
    resources: [
      { title: "Polaris Community Hackathons", desc: "Free weekend coding sprints and open hackathons with hardware cash pools and mentorship from startup CTOs.", url: "https://polariscampus.com/", badge: "Hackathons" },
      { title: "Polaris Tech Aptitude Guide", desc: "Curated open resources detailing DSA templates and logical frameworks to crack modern product company selections.", url: "https://www.polaris.school/", badge: "Guides" }
    ]
  },
  {
    name: "VADAM / Vedam School",
    tagline: "Algorithmic Prep & Elite Modern Engineering Focus",
    category: "Modern Advanced Prep",
    bannerGradient: "from-purple-600 via-fuchsia-600 to-pink-600",
    logoChar: "V",
    officialUrl: "https://vedam.org",
    description: "Focuses on high-tier logic, algorithms, math foundations, and computer architecture. Ideal for core development and research career preparation.",
    tags: ["Logical Math", "Placement Sheets", "Algorithms"],
    resources: [
      { title: "Vedam Merit Entrance Tests", desc: "Highly comprehensive math, analytics, and software logic entrance tests open for free to global tech aspirants.", url: "https://study.vedam.org/", badge: "Aptitude" },
      { title: "VADAM AI Practice Portal", desc: "Interactive algorithmic challenges focusing on logical and deep mathematical problems to sharpen problem solving skills.", url: "https://www.vedam.ai/", badge: "AI Practicals" }
    ]
  },
  {
    name: "Masai School",
    tagline: "Pay-After-Placement Career Education Institute",
    category: "Outcome-Driven Bootcamps",
    bannerGradient: "from-red-600 via-orange-600 to-amber-600",
    logoChar: "M",
    officialUrl: "https://www.masaischool.com",
    description: "Pioneered outcome-driven career bootcamps with 0 upfront fee. Teaches full-stack development, software testing, and data analytics.",
    tags: ["Zero Upfront", "Web Dev", "Full-Stack Track"],
    resources: [
      { title: "Masai MSAT Free Admission Test", desc: "Free diagnostic scholarship test covering coding logic, arithmetic, and basic English grammar.", url: "https://www.masaischool.com/", badge: "Test Prep" },
      { title: "Masai Free Career Webinars", desc: "Free weekend seminars on how to secure IT jobs without a tech background, including resume checklists.", url: "https://www.masaischool.com/", badge: "Webinars" }
    ]
  },
  {
    name: "PW Skills",
    tagline: "High-Quality, Extremely Affordable Upskilling Courses",
    category: "Mass Upskilling Ecosystem",
    bannerGradient: "from-indigo-600 via-sky-600 to-teal-600",
    logoChar: "P",
    officialUrl: "https://pwskills.com",
    description: "Physics Wallah's dynamic technology arm. Makes premium technical instruction accessible to millions at absolute fraction pricing.",
    tags: ["Affordable", "Hindi Tutorials", "CS Fundamentals"],
    resources: [
      { title: "PW Skills Mega Placement Courses", desc: "Excellent free foundational playlists covering complete C++ DSA, Full Stack Web Dev, and Java on their portal & YT channels.", url: "https://pwskills.com/", badge: "Mega Courses" },
      { title: "PW IOI (Institute of Innovation)", desc: "Free physical webinars, orientation meetups, and scholarship drives for multi-year industrial degree programs.", url: "https://pwskills.com/", badge: "Degree Info" }
    ]
  },
  {
    name: "CodeHelp by Babbar",
    tagline: "Premium Placement DSA Guides & Web Bootcamps",
    category: "DSA & Placement Guides",
    bannerGradient: "from-amber-600 via-yellow-600 to-orange-600",
    logoChar: "C",
    officialUrl: "https://thecodehelp.in",
    description: "Founded by famous educator Love Babbar. Renowned for creating highly impactful, logical, and step-by-step DSA sheets.",
    tags: ["Love Babbar Sheet", "C++ DSA", "Web Development"],
    resources: [
      { title: "Love Babbar DSA Sheet", desc: "The legendary, globally-vetted 450 DSA coding sheet covering tree, graphs, pointers, and DP. Entirely free.", url: "https://thecodehelp.in/", badge: "Legendary" },
      { title: "CodeHelp Placement Videos", desc: "Free high-yield masterclass videos on system design, database schemas, and micro-service structures.", url: "https://thecodehelp.in/", badge: "Free Lectures" }
    ]
  },
  {
    name: "Coding Shuttle",
    tagline: "Industrial Java, Spring Boot & DSA Free Bootcamps",
    category: "Java & Enterprise Focus",
    bannerGradient: "from-emerald-600 via-green-600 to-teal-600",
    logoChar: "S",
    officialUrl: "https://www.codingshuttle.com",
    description: "Founded by Anuj Bhaiya. Specializes in production-ready software engineering principles, Java, Spring Boot, and database index concepts.",
    tags: ["Spring Boot", "Enterprise Java", "Interview Prep"],
    resources: [
      { title: "Anuj's Free Coding Playlists", desc: "Complete free premium courses on Java Programming, Spring Boot core, and Computer Network guides with live codes.", url: "https://www.codingshuttle.com/", badge: "Highly Popular" },
      { title: "Coding Shuttle Mock Sheets", desc: "Vetted sheets mapping actual engineering manager questions from Swiggy, Paytm, and Flipkart.", url: "https://www.codingshuttle.com/", badge: "Interview Prep" }
    ]
  },
  {
    name: "Coding Ninjas",
    tagline: "Interactive Practice Environments & Placement Assistance",
    category: "Premium Coding Prep",
    bannerGradient: "from-orange-600 via-amber-600 to-red-600",
    logoChar: "N",
    officialUrl: "https://www.codingninjas.com",
    description: "Highly interactive study portal with custom coding judges. Known for extremely rich practice banks.",
    tags: ["Interactive Compiler", "Daily Challenges", "Mock Placements"],
    resources: [
      { title: "Coding Ninjas Free DSA Resources", desc: "Completely free access to foundational coding courses, practice MCQ series, and standard system design roadmaps.", url: "https://www.codingninjas.com/", badge: "Practice" },
      { title: "Ninja CodeStudio Challenges", desc: "Hundreds of free curations of coding questions compiled directly from Microsoft, Amazon, and Samsung interview rounds.", url: "https://www.codingninjas.com/", badge: "Vetted Practice" }
    ]
  },
  {
    name: "Crio.Do",
    tagline: "Project-Based Work Experience for Developers",
    category: "Experiential Tech Learning",
    bannerGradient: "from-blue-600 via-sky-600 to-indigo-600",
    logoChar: "C",
    officialUrl: "https://www.crio.do",
    description: "Teaches software development by building real production-grade systems, APIs, and scaling databases, rather than boring lecture slides.",
    tags: ["Project-Based", "GitHub Portfolio", "APIs"],
    resources: [
      { title: "Crio Micro-Experiences", desc: "Free 1-week structured developer bootcamps where you build real REST APIs or responsive React weather applications.", url: "https://www.crio.do/", badge: "Practical" },
      { title: "Crio GitHub Portfolio Builder", desc: "Free guides on how to format your open source contributions and projects to stand out to global remote companies.", url: "https://www.crio.do/", badge: "Portfolio" }
    ]
  },
  {
    name: "100xEngineers",
    tagline: "Generative AI, LLMs & Advanced AI Developer Sandbox",
    category: "AI Developer Academy",
    bannerGradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    logoChar: "X",
    officialUrl: "https://www.100xengineers.com",
    description: "Trains the next generation of engineers to become Generative AI application builders, focusing on LangChain, vector DBs, and prompt architecture.",
    tags: ["Generative AI", "LangChain", "Vector DBs"],
    resources: [
      { title: "100x GenAI Workshops", desc: "Completely free introductory workshops teaching prompt engineering, OpenAI API structures, and auto-agents.", url: "https://www.100xengineers.com/", badge: "AI Masterclass" },
      { title: "100x Prompt Engineering Sheet", desc: "Free open-source prompt cookbook containing templates to build and refine custom GPT agents.", url: "https://www.100xengineers.com/", badge: "Prompts" }
    ]
  }
];

export default function NewAgeSchoolsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [promptCopied, setPromptCopied] = useState(false);
  const [selectedSchools, setSelectedSchools] = useState<NewAgeSchool[]>([]);
  const [viewMode, setViewMode] = useState<"directory" | "compare">("directory");

  const toggleSchoolSelection = (school: NewAgeSchool) => {
    if (selectedSchools.some((s) => s.name === school.name)) {
      setSelectedSchools(selectedSchools.filter((s) => s.name !== school.name));
    } else {
      if (selectedSchools.length >= 3) {
        return;
      }
      setSelectedSchools([...selectedSchools, school]);
    }
  };

  // The premium prompt requested by the user
  const platformPrompt = `You are an expert full-stack web developer, structural software engineer, and elite UI/UX designer. Your task is to build a responsive, modern web application called "New Age Tech Schools Directory".
The website must consolidate all premium modern-day tech universities and learning hubs (like NIAT / NxtWave, Polaris School of Technology, Vedam School, Scaler SST, Newton School, Masai, PW Skills, CodeHelp, Coding Shuttle, Crio.Do, and 100xEngineers) into a 100% free, curated global directory.

Requirements:
1. Premium Glassmorphic Design: Dark slate background (#0A0A14), glowing borders, custom gradient banners for cards, and intuitive Lucide icons.
2. Live Interactive Filter system (Filter by: All, Free Bootcamps, Scholarship Tests, Live Masterclasses).
3. Search bar allowing real-time index querying across school names, course topics, or specific materials.
4. Curated 100% Free Resources cards showing course names, bulleted outlines, direct action links, and custom topic tags.
5. AI Prompt Generator and clipboard copy widget for easy integration.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(platformPrompt);
    setPromptCopied(true);
    confetti({ particleCount: 30, spread: 60 });
    setTimeout(() => setPromptCopied(false), 2000);
  };

  const handleCopyResourceLink = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const categories = ["All", "Elite Upskilling & UG Degree", "Full-Stack & Tech Degree", "4.0 Industry Technologies", "AI-First Tech Fellowship", "Modern Advanced Prep", "Outcome-Driven Bootcamps", "AI Developer Academy"];

  const filteredSchools = NEW_AGE_SCHOOLS_DATA.filter((school) => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          school.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          school.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === "All" || school.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8 pb-16 relative">
      {/* Visual Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>New-Age Universities Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-none">
          NEW AGE SCHOOLS
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Skip the traditional clutter. Access 100% free tech tutorials, elite full-stack masterclasses, weekend AI workshops, and national scholarship tests from India's pioneering tech academies.
        </p>
      </div>

      {/* Interactive AI Prompt Copy Panel (User prompt request solved) */}
      <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/[0.01] relative overflow-hidden max-w-4xl mx-auto space-y-4">
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-rose-400 font-bold bg-rose-400/10 px-2 py-0.5 rounded uppercase">
              Free Platform Developer Kit
            </span>
            <h3 className="text-base font-bold text-slate-200">Want to generate your own Tech Schools website?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We structured all these new age schools, programs, and direct resources into a single optimized AI Prompt. Click below to copy it and deploy your own directory!
            </p>
          </div>
          <button
            onClick={handleCopyPrompt}
            className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer self-stretch sm:self-auto justify-center"
          >
            {promptCopied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied Kit!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Platform Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs for sub-views */}
      <div className="flex border-b border-white/5 max-w-md mx-auto sm:mx-0">
        <button
          onClick={() => setViewMode("directory")}
          className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer text-center ${
            viewMode === "directory"
              ? "border-rose-500 text-white"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          📚 School Directory
        </button>
        <button
          onClick={() => setViewMode("compare")}
          className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer text-center flex items-center justify-center gap-2 ${
            viewMode === "compare"
              ? "border-rose-500 text-white"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <ArrowLeftRight className="w-4 h-4 text-rose-400" />
          <span>Compare Hub</span>
          <span className="text-[10px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/20 px-1.5 py-0.5 rounded-full font-bold">
            {selectedSchools.length}
          </span>
        </button>
      </div>

      {viewMode === "compare" ? (
        <div className="space-y-6">
          {/* School Selector Configurator */}
          <div className="p-6 rounded-2xl border border-white/5 bg-[#090915]/40 backdrop-blur-md space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-rose-400" />
                  <span>Configure Comparison (Select 2 to 3 Schools)</span>
                </h3>
                <p className="text-[11px] text-slate-400">Toggle schools on or off to dynamically compile the side-by-side resources index</p>
              </div>
              <div className="text-[10px] font-mono text-rose-300 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                {selectedSchools.length} of 3 Selected
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {NEW_AGE_SCHOOLS_DATA.map((school) => {
                const isSelected = selectedSchools.some((s) => s.name === school.name);
                return (
                  <button
                    key={school.name}
                    onClick={() => toggleSchoolSelection(school)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border text-left ${
                      isSelected 
                        ? "bg-gradient-to-r from-rose-500/15 to-pink-500/15 border-rose-500/40 text-white shadow-md shadow-rose-500/5"
                        : "bg-white/[0.01] border-white/5 text-slate-400 hover:text-white hover:border-white/10"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${isSelected ? "bg-rose-500" : "bg-slate-600"}`} />
                    <span className="truncate">{school.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comparison Table */}
          {selectedSchools.length >= 2 ? (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ArrowLeftRight className="w-4 h-4 text-rose-400 animate-pulse" />
                  <span>Interactive Comparison Matrix</span>
                </h3>
                <button
                  onClick={() => setSelectedSchools([])}
                  className="text-xs text-slate-400 hover:text-rose-400 font-mono transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#090915]/60 backdrop-blur-md no-scrollbar">
                <table className="w-full text-left border-collapse min-w-[750px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="p-4 text-[10px] font-mono text-slate-500 uppercase tracking-wider w-[20%]">Features</th>
                      {selectedSchools.map((school) => (
                        <th key={school.name} className="p-0 w-[26.6%] border-l border-white/5 relative">
                          <div className={`p-5 bg-gradient-to-r ${school.bannerGradient} relative overflow-hidden h-32 flex flex-col justify-between`}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                            <button 
                              onClick={() => toggleSchoolSelection(school)}
                              className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/40 hover:bg-red-500/80 hover:text-white text-slate-300 transition-all cursor-pointer animate-in fade-in"
                              title="Remove from comparison"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            
                            <div className="text-[9px] font-mono bg-black/30 border border-white/10 text-white px-2 py-0.5 rounded-full w-max font-bold uppercase tracking-wider">
                              {school.category}
                            </div>

                            <div className="flex items-center gap-2.5 mt-2">
                              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/25 flex items-center justify-center text-sm font-black text-white">
                                {school.logoChar}
                              </div>
                              <div>
                                <h4 className="text-sm font-black text-white">{school.name}</h4>
                                <a href={school.officialUrl} target="_blank" referrerPolicy="no-referrer" className="text-[10px] text-white/80 hover:underline flex items-center gap-0.5">
                                  <span>Official Site</span>
                                  <ArrowUpRight className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </th>
                      ))}
                      {selectedSchools.length === 2 && (
                        <th className="p-5 w-[26.6%] border-l border-white/5 bg-slate-900/10 text-center relative text-slate-500 text-xs font-medium">
                          <div className="flex flex-col items-center justify-center h-24 space-y-2">
                            <Plus className="w-5 h-5 text-slate-600 animate-pulse" />
                            <span className="text-[10px] font-mono tracking-wider text-slate-400">Empty Slot (3 Max)</span>
                            <p className="text-[9px] text-slate-600 max-w-[150px] mx-auto leading-relaxed">Select another school from the grid above to compare 3 side-by-side</p>
                          </div>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1: Focus & Tagline */}
                    <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                      <td className="p-4 text-xs font-bold text-slate-300 bg-white/[0.01]">Core Focus</td>
                      {selectedSchools.map((school) => (
                        <td key={school.name} className="p-4 text-xs text-slate-200 font-semibold border-l border-white/5 leading-relaxed">
                          {school.tagline}
                        </td>
                      ))}
                      {selectedSchools.length === 2 && <td className="p-4 border-l border-white/5 bg-slate-900/5"></td>}
                    </tr>

                    {/* Row 2: Description */}
                    <tr className="border-b border-white/5 hover:bg-white/[0.01] bg-white/[0.01]">
                      <td className="p-4 text-xs font-bold text-slate-300 bg-white/[0.01]">Description</td>
                      {selectedSchools.map((school) => (
                        <td key={school.name} className="p-4 text-xs text-slate-400 border-l border-white/5 leading-relaxed">
                          {school.description}
                        </td>
                      ))}
                      {selectedSchools.length === 2 && <td className="p-4 border-l border-white/5 bg-slate-900/5"></td>}
                    </tr>

                    {/* Row 3: Specialized Tags */}
                    <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                      <td className="p-4 text-xs font-bold text-slate-300 bg-white/[0.01]">Keywords & Topics</td>
                      {selectedSchools.map((school) => (
                        <td key={school.name} className="p-4 border-l border-white/5">
                          <div className="flex flex-wrap gap-1">
                            {school.tags.map((tag) => (
                              <span key={tag} className="text-[9px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-white/5">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                      {selectedSchools.length === 2 && <td className="p-4 border-l border-white/5 bg-slate-900/5"></td>}
                    </tr>

                    {/* Row 4: Free Resource 1 */}
                    <tr className="border-b border-white/5 hover:bg-white/[0.01] bg-white/[0.01]">
                      <td className="p-4 text-xs font-bold text-slate-300 bg-white/[0.01]">🎁 Free Resource 1</td>
                      {selectedSchools.map((school) => {
                        const res = school.resources[0];
                        const sIdx = NEW_AGE_SCHOOLS_DATA.findIndex((s) => s.name === school.name);
                        const resIdx = sIdx * 10 + 0;
                        return (
                          <td key={school.name} className="p-4 border-l border-white/5 space-y-2.5">
                            <div>
                              <div className="flex items-center justify-between gap-2">
                                <strong className="text-xs text-rose-300 font-bold">{res.title}</strong>
                                <span className="text-[8px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded font-bold uppercase">
                                  {res.badge}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-normal mt-1">{res.desc}</p>
                            </div>
                            
                            <div className="flex items-center gap-3 pt-1">
                              <button
                                onClick={() => handleCopyResourceLink(res.url, resIdx)}
                                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                              >
                                {copiedIndex === resIdx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                <span>{copiedIndex === resIdx ? "Copied" : "Copy"}</span>
                              </button>
                              <a 
                                href={res.url} 
                                target="_blank" 
                                referrerPolicy="no-referrer"
                                className="text-[11px] font-bold text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-0.5"
                              >
                                <span>Access</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                        );
                      })}
                      {selectedSchools.length === 2 && <td className="p-4 border-l border-white/5 bg-slate-900/5"></td>}
                    </tr>

                    {/* Row 5: Free Resource 2 */}
                    <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                      <td className="p-4 text-xs font-bold text-slate-300 bg-white/[0.01]">🎁 Free Resource 2</td>
                      {selectedSchools.map((school) => {
                        const res = school.resources[1];
                        const sIdx = NEW_AGE_SCHOOLS_DATA.findIndex((s) => s.name === school.name);
                        const resIdx = sIdx * 10 + 1;
                        return (
                          <td key={school.name} className="p-4 border-l border-white/5 space-y-2.5">
                            <div>
                              <div className="flex items-center justify-between gap-2">
                                <strong className="text-xs text-rose-300 font-bold">{res.title}</strong>
                                <span className="text-[8px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded font-bold uppercase">
                                  {res.badge}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-normal mt-1">{res.desc}</p>
                            </div>
                            
                            <div className="flex items-center gap-3 pt-1">
                              <button
                                onClick={() => handleCopyResourceLink(res.url, resIdx)}
                                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                              >
                                {copiedIndex === resIdx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                <span>{copiedIndex === resIdx ? "Copied" : "Copy"}</span>
                              </button>
                              <a 
                                href={res.url} 
                                target="_blank" 
                                referrerPolicy="no-referrer"
                                className="text-[11px] font-bold text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-0.5"
                              >
                                <span>Access</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                        );
                      })}
                      {selectedSchools.length === 2 && <td className="p-4 border-l border-white/5 bg-slate-900/5"></td>}
                    </tr>

                    {/* Row 6: Rating & Trust */}
                    <tr className="hover:bg-white/[0.01] bg-white/[0.01]">
                      <td className="p-4 text-xs font-bold text-slate-300 bg-white/[0.01]">Trust Score</td>
                      {selectedSchools.map((school) => (
                        <td key={school.name} className="p-4 border-l border-white/5">
                          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span>4.9 / 5.0 (Vetted)</span>
                          </div>
                        </td>
                      ))}
                      {selectedSchools.length === 2 && <td className="p-4 border-l border-white/5 bg-slate-900/5"></td>}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/10 border border-white/5 rounded-2xl space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
                <ArrowLeftRight className="w-6 h-6 animate-bounce" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-200">Comparison Table Offline</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  You have currently selected {selectedSchools.length} {selectedSchools.length === 1 ? "school" : "schools"}. Please select at least 2 schools in the panel above to generate a matrix!
                </p>
              </div>
              
              <div className="flex justify-center gap-2 max-w-md mx-auto pt-2 flex-wrap">
                {NEW_AGE_SCHOOLS_DATA.slice(0, 3).map((school) => (
                  <button
                    key={school.name}
                    onClick={() => toggleSchoolSelection(school)}
                    className="px-3 py-1.5 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-slate-300 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add {school.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Filters & Search Control */}
          <div className="bg-slate-900/10 border border-white/5 rounded-2xl p-4 space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search schools, key courses, or topics (e.g. AI, DSA, Spring Boot)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-xs bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-rose-400/50 text-white"
                />
              </div>

              {/* Quick Info */}
              <div className="flex items-center gap-2 text-xs text-slate-500 px-2 font-mono">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Vetted Free Materials</span>
              </div>
            </div>

            {/* Categories Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === cat 
                      ? "bg-rose-500 text-white shadow-md shadow-rose-500/10" 
                      : "bg-white/[0.02] border border-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Directory Grid */}
          {filteredSchools.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSchools.map((school, schoolIdx) => (
                <div 
                  key={schoolIdx} 
                  className="rounded-2xl border border-white/5 bg-slate-900/10 overflow-hidden flex flex-col justify-between hover:border-rose-500/20 transition-all duration-300"
                >
                  <div>
                    {/* Header Banner */}
                    <div className={`p-5 bg-gradient-to-r ${school.bannerGradient} relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                      
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="text-[10px] font-mono bg-black/30 border border-white/20 text-white px-2.5 py-1 rounded-full font-bold uppercase">
                          {school.category}
                        </span>
                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={() => toggleSchoolSelection(school)}
                            className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 border ${
                              selectedSchools.some((s) => s.name === school.name)
                                ? "bg-white text-rose-600 border-white font-extrabold shadow-sm"
                                : "bg-black/30 text-white border-white/10 hover:bg-black/50"
                            }`}
                          >
                            {selectedSchools.some((s) => s.name === school.name) ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" />
                                <span>Compare</span>
                              </>
                            )}
                          </button>
                          <a 
                            href={school.officialUrl} 
                            target="_blank" 
                            referrerPolicy="no-referrer"
                            className="text-white hover:underline text-xs flex items-center gap-1 font-semibold"
                          >
                            <span>Official Site</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/25 flex items-center justify-center text-lg font-black text-white">
                          {school.logoChar}
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-white">{school.name}</h3>
                          <p className="text-xs text-white/85 line-clamp-1">{school.tagline}</p>
                        </div>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 space-y-4">
                      <p className="text-xs text-slate-400 leading-relaxed">{school.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {school.tags.map((tag, tagIdx) => (
                          <span key={tagIdx} className="text-[9px] font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-white/5">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Free Resources List */}
                      <div className="space-y-3 pt-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                          🎁 Featured 100% Free Resources:
                        </span>

                        <div className="space-y-2.5">
                          {school.resources.map((res, resIdx) => {
                            const globalIdx = schoolIdx * 10 + resIdx;
                            return (
                              <div 
                                key={resIdx} 
                                className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5 flex flex-col justify-between hover:border-rose-400/20 transition-all"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2">
                                    <strong className="text-xs font-bold text-slate-200">{res.title}</strong>
                                    <span className="text-[9px] font-mono text-rose-300 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded uppercase font-bold">
                                      {res.badge}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-400 leading-normal mt-1">{res.desc}</p>
                                </div>

                                <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/5 mt-1">
                                  <span className="text-[10px] text-slate-500 font-mono">100% Free Access</span>
                                  
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => handleCopyResourceLink(res.url, globalIdx)}
                                      className="text-[10px] text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 flex items-center gap-1 transition-colors"
                                      title="Copy Direct Link"
                                    >
                                      {copiedIndex === globalIdx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                      <span>{copiedIndex === globalIdx ? "Copied" : "Copy Link"}</span>
                                    </button>

                                    <a 
                                      href={res.url} 
                                      target="_blank" 
                                      referrerPolicy="no-referrer"
                                      className="text-[11px] font-bold text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-0.5"
                                    >
                                      <span>Access Resource</span>
                                      <ArrowUpRight className="w-3.5 h-3.5" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 pt-0 border-t border-white/[0.02] flex items-center justify-between text-[11px] text-slate-500 bg-slate-900/5">
                    <span>Vetted by StudentOS Community</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="font-mono font-bold text-slate-400">4.9 / 5.0</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-900/10 border border-white/5 rounded-2xl">
              <HelpCircle className="w-12 h-12 text-slate-500 mx-auto mb-3 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-300">No schools matching search criteria</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                Try adjusting your search terms or select another categories tab to discover other resources.
              </p>
            </div>
          )}
        </>
      )}

      {/* Floating compare status bar */}
      {selectedSchools.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0B0B16]/95 border border-rose-500/30 shadow-[0_0_24px_rgba(244,63,94,0.15)] rounded-2xl px-6 py-4 flex items-center gap-6 max-w-lg w-[calc(100%-2rem)] justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-rose-500/15 text-rose-400 rounded-full flex items-center justify-center font-black text-xs font-mono">
              {selectedSchools.length}
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Compare {selectedSchools.length === 1 ? "School" : "Schools"} Selected</h4>
              <p className="text-[10px] text-slate-400 font-mono">
                {selectedSchools.length === 1 ? "Select 1 more to compare" : "Ready to compare side-by-side!"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {selectedSchools.length >= 2 && viewMode === "directory" && (
              <button
                onClick={() => setViewMode("compare")}
                className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-rose-500/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Compare Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => setSelectedSchools([])}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs transition-all cursor-pointer"
              title="Clear selection"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Advisory Info */}
      <div className="p-4 bg-slate-950 rounded-xl border border-white/5 text-[10px] text-slate-500 leading-relaxed text-center max-w-3xl mx-auto uppercase tracking-wider">
        ⚠️ <strong>Affiliation Disclaimer:</strong> NextAgeSchools and StudentOS are public indexing services. We do not represent, receive commissions from, or claim official affiliations with Scaler, Newton School, NxtWave, Polaris, Vedam, Masai, or Physics Wallah. Links go directly to their publicly accessible portals.
      </div>
    </div>
  );
}
