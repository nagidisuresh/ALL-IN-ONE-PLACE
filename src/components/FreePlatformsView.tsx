import React, { useState, useEffect } from "react";
import { Search, ExternalLink, Bookmark, Sparkles, GraduationCap, Laptop, Globe, BookOpen, Heart, Check, Trash2, Sliders, AlertCircle } from "lucide-react";

// Import Modular EduFree Hub Components
import After10thGuide from "./free-edu/After10thGuide";
import CodingCareers from "./free-edu/CodingCareers";
import SubjectResources from "./free-edu/SubjectResources";
import FreeTextbooks from "./free-edu/FreeTextbooks";
import InteractiveTools from "./free-edu/InteractiveTools";
import BookmarkDashboard from "./free-edu/BookmarkDashboard";
import StudentProblemsHub from "./free-edu/StudentProblemsHub";

interface Platform {
  name: string;
  category: "Education" | "Software & Tech" | "Language" | "Multi-subject" | "Kids";
  description: string;
  link: string;
}

interface FreePlatformsViewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function FreePlatformsView({ activeTab, setActiveTab }: FreePlatformsViewProps) {
  const platforms: Platform[] = [
    {
      name: "Khan Academy",
      category: "Education",
      description: "Free K-12 and college prep in math, science, computing, history, art, economics and more. Used in 190+ countries.",
      link: "https://www.khanacademy.org"
    },
    {
      name: "Coursera (Audit Free)",
      category: "Multi-subject",
      description: "Audit thousands of university courses from top schools like Stanford, Yale, Google for free. Certificates cost extra.",
      link: "https://www.coursera.org"
    },
    {
      name: "edX (Audit Free)",
      category: "Multi-subject",
      description: "MOOCs from MIT, Harvard, Berkeley and 160+ institutions. Audit most courses at no cost.",
      link: "https://www.edx.org"
    },
    {
      name: "MIT OpenCourseWare",
      category: "Education",
      description: "Free lecture notes, exams, and videos from actual MIT courses — undergraduate through graduate.",
      link: "https://ocw.mit.edu"
    },
    {
      name: "freeCodeCamp",
      category: "Software & Tech",
      description: "Full-stack web dev, data science, and Python curriculum — all free, with certifications. Non-profit.",
      link: "https://www.freecodecamp.org"
    },
    {
      name: "The Odin Project",
      category: "Software & Tech",
      description: "Open-source full-stack web development curriculum. HTML, CSS, JS, Ruby, Node — fully free.",
      link: "https://www.theodinproject.com"
    },
    {
      name: "CS50 (Harvard)",
      category: "Software & Tech",
      description: "Harvard's intro to computer science. Free to audit on edX; one of the most popular courses globally.",
      link: "https://cs50.harvard.edu"
    },
    {
      name: "Codecademy (Free tier)",
      category: "Software & Tech",
      description: "Interactive coding lessons in Python, JS, SQL, HTML/CSS. Free plan covers core content.",
      link: "https://www.codecademy.com"
    },
    {
      name: "W3Schools",
      category: "Software & Tech",
      description: "Reference and tutorials for web technologies — HTML, CSS, JS, Python, SQL, PHP and more.",
      link: "https://www.w3schools.com"
    },
    {
      name: "Google Digital Garage",
      category: "Multi-subject",
      description: "Free digital marketing, data, and career courses from Google. Certificates awarded on completion.",
      link: "https://learndigital.withgoogle.com/digitalgarage"
    },
    {
      name: "Google Skillshop",
      category: "Software & Tech",
      description: "Free training on Google Ads, Analytics, YouTube, and more Google tools. Official certifications included.",
      link: "https://skillshop.withgoogle.com"
    },
    {
      name: "Microsoft Learn",
      category: "Software & Tech",
      description: "Free learning paths for Azure, Power Platform, GitHub, AI, and developer tools with badges.",
      link: "https://learn.microsoft.com"
    },
    {
      name: "AWS Training (Free)",
      category: "Software & Tech",
      description: "Free cloud training and foundational AWS courses. Great for cloud beginner to associate level.",
      link: "https://aws.amazon.com/training/digital"
    },
    {
      name: "IBM SkillsBuild",
      category: "Multi-subject",
      description: "Free tech and professional skills training from IBM. Covers AI, cybersecurity, cloud, data science.",
      link: "https://skillsbuild.org"
    },
    {
      name: "Duolingo",
      category: "Language",
      description: "Gamified language learning app for 40+ languages. Completely free with optional premium tier.",
      link: "https://www.duolingo.com"
    },
    {
      name: "BBC Learning English",
      category: "Language",
      description: "Free English lessons from the BBC — videos, grammar, vocabulary, pronunciation for all levels.",
      link: "https://www.bbc.co.uk/learningenglish"
    },
    {
      name: "Open Culture",
      category: "Multi-subject",
      description: "Curated links to 1,700+ free online courses from top universities worldwide, plus free ebooks and films.",
      link: "https://www.openculture.com"
    },
    {
      name: "Alison",
      category: "Multi-subject",
      description: "Over 4,000 free courses and diplomas in business, IT, health, languages, and more. Global platform.",
      link: "https://alison.com"
    },
    {
      name: "Udemy (Free courses)",
      category: "Multi-subject",
      description: "Thousands of free courses available — filter by price $0. Broad topics from coding to photography.",
      link: "https://www.udemy.com"
    },
    {
      name: "YouTube Learning",
      category: "Multi-subject",
      description: "Countless free tutorials, lectures, and full courses on every subject. Best free learning resource on earth.",
      link: "https://www.youtube.com/learning"
    },
    {
      name: "Crash Course (YouTube)",
      category: "Education",
      description: "High-quality, fast-paced videos covering history, science, literature, economics, and more. Completely free.",
      link: "https://www.youtube.com/@crashcourse"
    },
    {
      name: "LinkedIn Learning (Trial)",
      category: "Multi-subject",
      description: "Professional skills, design, business, and tech courses. 1-month free trial available.",
      link: "https://www.linkedin.com/learning"
    },
    {
      name: "Skillshare (Free trial)",
      category: "Multi-subject",
      description: "Creative and design courses — illustration, photography, writing, UX. Free trial access.",
      link: "https://www.skillshare.com"
    },
    {
      name: "OpenLearn (Open University)",
      category: "Education",
      description: "Free courses from The Open University UK covering arts, science, health, business and more.",
      link: "https://www.open.edu/openlearn"
    },
    {
      name: "FutureLearn (Free)",
      category: "Multi-subject",
      description: "Short free courses from UK and global universities. Topics span business, tech, health, society.",
      link: "https://www.futurelearn.com"
    },
    {
      name: "Swayam (India)",
      category: "Multi-subject",
      description: "India's national MOOC platform — free courses from IITs, IIMs and central universities.",
      link: "https://swayam.gov.in"
    },
    {
      name: "NPTEL",
      category: "Education",
      description: "National Programme on Technology Enhanced Learning — free engineering and science courses from IITs.",
      link: "https://nptel.ac.in"
    },
    {
      name: "Class Central",
      category: "Multi-subject",
      description: "Aggregator of 100,000+ free online courses from universities worldwide. Excellent discovery tool.",
      link: "https://www.classcentral.com"
    },
    {
      name: "Codecombat",
      category: "Kids",
      description: "Learn Python and JavaScript by playing a game. Great for students aged 8–18.",
      link: "https://www.codecombat.com"
    },
    {
      name: "Scratch",
      category: "Kids",
      description: "MIT's visual programming language for kids. Free to use, millions of projects shared globally.",
      link: "https://scratch.mit.edu"
    },
    {
      name: "Code.org",
      category: "Kids",
      description: "Free coding education for K-12. Hour of Code and full CS curriculum for schools and homes.",
      link: "https://code.org"
    },
    {
      name: "Typing.com",
      category: "Education",
      description: "Free typing lessons for all ages — beginner to advanced. Used widely in schools.",
      link: "https://www.typing.com"
    },
    {
      name: "GCFGlobal",
      category: "Education",
      description: "Free literacy, math, technology, and job skills for adults. Excellent for foundational learners.",
      link: "https://edu.gcfglobal.org"
    },
    {
      name: "Cybrary",
      category: "Software & Tech",
      description: "Free cybersecurity training platform. Courses for beginners to advanced security professionals.",
      link: "https://www.cybrary.it"
    },
    {
      name: "Kaggle Learn",
      category: "Software & Tech",
      description: "Free micro-courses in Python, data science, ML, SQL, and AI from Kaggle. Hands-on notebooks.",
      link: "https://www.kaggle.com/learn"
    },
    {
      name: "fast.ai",
      category: "Software & Tech",
      description: "Free practical deep learning course. Top-down, code-first approach — highly regarded globally.",
      link: "https://www.fast.ai"
    },
    {
      name: "Elements of AI",
      category: "Software & Tech",
      description: "Free AI literacy course from the University of Helsinki. Available in 30+ languages.",
      link: "https://www.elementsofai.com"
    },
    {
      name: "Brilliant.org (Free tier)",
      category: "Education",
      description: "Interactive STEM learning — math, logic, CS, science. Free tier available with daily challenges.",
      link: "https://brilliant.org"
    },
    {
      name: "Wolfram MathWorld",
      category: "Education",
      description: "World's most extensive mathematics resource — free reference for all levels.",
      link: "https://mathworld.wolfram.com"
    },
    {
      name: "OpenStax",
      category: "Education",
      description: "Free peer-reviewed open textbooks for college courses in math, science, business, social sciences.",
      link: "https://openstax.org"
    },
    {
      name: "Project Gutenberg",
      category: "Education",
      description: "60,000+ free ebooks — classics, literature, history. Legal free downloads globally.",
      link: "https://www.gutenberg.org"
    },
    {
      name: "Internet Archive",
      category: "Multi-subject",
      description: "Free books, movies, music, software, and educational media. Massive digital library.",
      link: "https://archive.org"
    },
    {
      name: "Coursera for Campus",
      category: "Education",
      description: "Free access for students at enrolled institutions — check if your university is enrolled.",
      link: "https://www.coursera.org/campus"
    },
    {
      name: "Stanford Online (Free)",
      category: "Education",
      description: "Free access to select Stanford courses and lectures across engineering, medicine, business.",
      link: "https://online.stanford.edu"
    },
    {
      name: "Yale Open Courses",
      category: "Education",
      description: "Free video lectures from Yale's most popular courses — available on YouTube and the Yale site.",
      link: "https://oyc.yale.edu"
    },
    {
      name: "Saylor Academy",
      category: "Multi-subject",
      description: "100% free college-level courses with certificates. Self-paced, no login required to start.",
      link: "https://www.saylor.org"
    },
    {
      name: "GoodThink (TED-Ed)",
      category: "Education",
      description: "Free animated educational videos on science, history, math, literature — from TED Education.",
      link: "https://ed.ted.com"
    },
    {
      name: "Memrise",
      category: "Language",
      description: "Free language learning using spaced repetition and real-world video clips. 20+ languages.",
      link: "https://www.memrise.com"
    },
    {
      name: "LingQ",
      category: "Language",
      description: "Learn languages through reading and listening. Large library of content; free tier available.",
      link: "https://www.lingq.com"
    },
    {
      name: "Anki",
      category: "Language",
      description: "Free flashcard app using spaced repetition. Popular for language learning and medical studies.",
      link: "https://apps.ankiweb.net"
    },
    {
      name: "Rosetta Stone (Trial)",
      category: "Language",
      description: "Immersive language learning software. Free trial available; used widely in schools globally.",
      link: "https://www.rosettastone.com"
    },
    {
      name: "GitHub Learning Lab",
      category: "Software & Tech",
      description: "Free interactive Git and GitHub courses. Learn by doing inside real repositories.",
      link: "https://github.com/apps/github-learning-lab"
    },
    {
      name: "DevDocs",
      category: "Software & Tech",
      description: "Free API documentation browser for 100+ programming languages and frameworks. Offline-capable.",
      link: "https://devdocs.io"
    },
    {
      name: "Exercism",
      category: "Software & Tech",
      description: "Free coding exercises and mentoring in 65+ programming languages. Community-driven.",
      link: "https://exercism.org"
    },
    {
      name: "LeetCode (Free tier)",
      category: "Software & Tech",
      description: "Algorithm and data structure practice problems. Essential for coding interviews. Free tier available.",
      link: "https://leetcode.com"
    },
    {
      name: "HackerRank (Free)",
      category: "Software & Tech",
      description: "Free coding challenges in 35+ languages, plus interview prep tracks.",
      link: "https://www.hackerrank.com"
    },
    {
      name: "Replit",
      category: "Software & Tech",
      description: "Browser-based coding environment — free to use for most purposes. Great for beginners.",
      link: "https://replit.com"
    },
    {
      name: "Coursera Google Certificates",
      category: "Software & Tech",
      description: "Google Career Certificates in IT, data analytics, UX design — financial aid available for free.",
      link: "https://grow.google/certificates"
    },
    {
      name: "Meta Blueprint",
      category: "Software & Tech",
      description: "Free training for Facebook and Instagram marketing. Certifications available.",
      link: "https://www.facebook.com/business/learn"
    },
    {
      name: "HubSpot Academy",
      category: "Multi-subject",
      description: "Free marketing, sales, and CRM courses from HubSpot. Certifications widely recognised.",
      link: "https://academy.hubspot.com"
    },
    {
      name: "Salesforce Trailhead",
      category: "Software & Tech",
      description: "Free gamified learning for Salesforce skills — CRM, admin, developer tracks.",
      link: "https://trailhead.salesforce.com"
    },
    {
      name: "Unity Learn",
      category: "Software & Tech",
      description: "Free game development tutorials and courses from Unity. Beginner to advanced.",
      link: "https://learn.unity.com"
    },
    {
      name: "Unreal Online Learning",
      category: "Software & Tech",
      description: "Free courses for Unreal Engine — game dev, archviz, film, VR. Official Unreal platform.",
      link: "https://dev.epicgames.com/community/learning"
    },
    {
      name: "NASA Open Courseware",
      category: "Education",
      description: "Free STEM resources, data, and educational content from NASA for all ages.",
      link: "https://www.nasa.gov/education"
    },
    {
      name: "CK-12",
      category: "Kids",
      description: "Free K-12 textbooks, simulations, and adaptive practice. Used in 100+ countries.",
      link: "https://www.ck12.org"
    },
    {
      name: "Coursera (Financial Aid)",
      category: "Multi-subject",
      description: "Apply for financial aid on any paid Coursera course — many are approved, making them effectively free.",
      link: "https://www.coursera.org"
    },
    {
      name: "Simplilearn SkillUp",
      category: "Software & Tech",
      description: "Free certification courses in digital marketing, cloud, data science, project management.",
      link: "https://www.simplilearn.com/skillup-free-online-courses"
    },
    {
      name: "GreatLearning Academy",
      category: "Multi-subject",
      description: "Free courses in AI, data science, cloud, business — with certificates. India-headquartered, global reach.",
      link: "https://www.mygreatlearning.com/academy"
    },
    {
      name: "MOOC.fi (Finland)",
      category: "Software & Tech",
      description: "Free programming and AI courses from the University of Helsinki. Java, Python, and more.",
      link: "https://www.mooc.fi/en"
    },
    {
      name: "DataCamp (Free tier)",
      category: "Software & Tech",
      description: "Data science and analytics courses in Python, R, SQL. Free intro courses available.",
      link: "https://www.datacamp.com"
    },
    {
      name: "Prometheus (Ukraine)",
      category: "Multi-subject",
      description: "Free online online courses from Ukrainian universities. Supports education continuity.",
      link: "https://prometheus.org.ua"
    },
    {
      name: "Africa Learning Exchange",
      category: "Multi-subject",
      description: "Pan-African platform offering free vocational, digital, and academic content.",
      link: "https://africalearningexchange.org"
    },
    {
      name: "Platzi (Free trial)",
      category: "Software & Tech",
      description: "Latin America's largest tech education platform. Spanish-language focus. Free trial available.",
      link: "https://platzi.com"
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const loadBookmarks = () => {
    const saved = localStorage.getItem("free_learning_bookmarks");
    setBookmarks(saved ? JSON.parse(saved) : []);
  };

  useEffect(() => {
    loadBookmarks();
    // Dynamically sync bookmarks across panels in real-time
    window.addEventListener("storage", loadBookmarks);
    return () => window.removeEventListener("storage", loadBookmarks);
  }, []);

  const toggleBookmark = (name: string) => {
    let next;
    if (bookmarks.includes(name)) {
      next = bookmarks.filter(b => b !== name);
    } else {
      next = [...bookmarks, name];
    }
    setBookmarks(next);
    localStorage.setItem("free_learning_bookmarks", JSON.stringify(next));
    window.dispatchEvent(new Event("storage"));
  };

  const categories = [
    { id: "All", label: "All", emoji: "🌐" },
    { id: "Education", label: "Education", emoji: "🏫" },
    { id: "Software & Tech", label: "Software & Tech", emoji: "💻" },
    { id: "Language", label: "Language", emoji: "🗣️" },
    { id: "Multi-subject", label: "Multi-subject", emoji: "📚" },
    { id: "Kids", label: "Kids", emoji: "👶" }
  ];

  const filtered = platforms.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesBookmark = !showBookmarksOnly || bookmarks.includes(p.name);

    return matchesSearch && matchesCategory && matchesBookmark;
  });

  // Render modular sub-components based on activeTab routing
  const renderTabContent = () => {
    switch (activeTab) {
      case "free-problems-hub":
        return <StudentProblemsHub />;
      case "free-after10th":
        return <After10thGuide />;
      case "free-coding":
        return <CodingCareers />;
      case "free-subjects":
        return <SubjectResources />;
      case "free-textbooks":
        return <FreeTextbooks />;
      case "free-simulations":
        return <InteractiveTools />;
      case "free-dashboard":
        return <BookmarkDashboard />;
      case "free-platforms":
      default:
        return (
          <div className="space-y-8">
            {/* Control bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between relative z-10">
              {/* Search */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search platforms by name or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full glass-input text-sm text-white rounded-[14px] py-2.5 pl-11 pr-4 bg-black/20 border border-white/10 focus:border-purple-500/50 outline-none transition-all placeholder:text-gray-500"
                />
              </div>

              {/* Saved Filter */}
              <button
                type="button"
                onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                className={`w-full md:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  showBookmarksOnly
                    ? "bg-[#ec4899]/15 text-[#f472b6] border-[#ec4899]/30"
                    : "bg-black/20 border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${showBookmarksOnly ? "fill-current" : ""}`} />
                <span>{showBookmarksOnly ? "Showing Saved Bookmarks" : "Filter by Bookmarks"}</span>
              </button>
            </div>

            {/* Category selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-white/5 relative z-10">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
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

            {/* Counter of results */}
            <div className="text-gray-400 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {filtered.length} {filtered.length === 1 ? "platform" : "platforms"} found
            </div>

            {/* Cards Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {filtered.map((platform) => {
                  const isBookmarked = bookmarks.includes(platform.name);
                  return (
                    <div 
                      key={platform.name}
                      className="glass-card rounded-[22px] border border-white/5 bg-[#11101c]/45 hover:border-white/10 hover:bg-[#151424]/60 p-6 flex flex-col justify-between transition-all duration-350 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-mono uppercase tracking-wider text-gray-400">
                            {platform.category === "Software & Tech" && <Laptop className="w-3 h-3 text-cyan-400" />}
                            {platform.category === "Language" && <Globe className="w-3 h-3 text-purple-400" />}
                            {platform.category === "Education" && <GraduationCap className="w-3 h-3 text-emerald-400" />}
                            {platform.category === "Multi-subject" && <BookOpen className="w-3 h-3 text-amber-400" />}
                            {platform.category === "Kids" && <Heart className="w-3 h-3 text-pink-400" />}
                            {platform.category}
                          </span>
                          
                          <button
                            type="button"
                            onClick={() => toggleBookmark(platform.name)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              isBookmarked
                                ? "bg-[#ec4899]/15 border-[#ec4899]/30 text-[#f472b6]"
                                : "border-transparent text-gray-500 hover:text-white"
                            }`}
                            title={isBookmarked ? "Remove Bookmark" : "Save Platform"}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-current" : ""}`} />
                          </button>
                        </div>

                        <h3 className="text-base font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                          {platform.name}
                        </h3>
                        
                        <p className="text-gray-400 text-xs mt-2.5 leading-relaxed line-clamp-3">
                          {platform.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                          100% Free
                        </span>
                        
                        <a
                          href={platform.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          referrerPolicy="no-referrer"
                          className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-300 hover:text-white transition-all cursor-pointer group-hover:translate-x-0.5 duration-200"
                        >
                          <span>Visit site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-[22px] border border-white/5 bg-[#11101c]/45">
                <Globe className="w-12 h-12 text-gray-600 mb-4 animate-pulse" />
                <h3 className="text-base font-bold text-white">No learning platforms matched</h3>
                <p className="text-gray-400 text-xs max-w-sm mt-1">
                  Try adjusting your search terms or selecting a different category to find matching worldwide resources.
                </p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto pt-6 pb-16 px-4 sm:px-8" id="learning-platforms-container">
      
      {/* Header section (Only show global details on main directory home tab) */}
      {activeTab === "free-platforms" && (
        <div className="mb-10 text-center sm:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/15 to-cyan-500/15 border border-purple-500/20 text-xs font-mono text-purple-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>Worldwide Free Educational Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            Learn Instantly. No Accounts. No Barriers.
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
            All platforms listed in this worldwide directory are 100% free and require zero sign-in or sign-up. Filter resources around the globe at zero cost.
          </p>
          
          {/* Grid statistics counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-[#111827]/40 rounded-2xl p-4 border border-white/5 backdrop-blur-md text-left">
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Total Platforms</p>
              <p className="text-2xl font-bold font-mono text-white mt-1">{platforms.length}</p>
            </div>
            <div className="bg-[#111827]/40 rounded-2xl p-4 border border-white/5 backdrop-blur-md text-left">
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider font-semibold">Matched</p>
              <p className="text-2xl font-bold font-mono text-cyan-400 mt-1">{filtered.length}</p>
            </div>
            <div className="bg-[#111827]/40 rounded-2xl p-4 border border-white/5 backdrop-blur-md text-left">
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Saved Bookmarks</p>
              <p className="text-2xl font-bold font-mono text-pink-400 mt-1">{bookmarks.length}</p>
            </div>
            <div className="bg-[#111827]/40 rounded-2xl p-4 border border-white/5 backdrop-blur-md text-left">
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Cost Limit</p>
              <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">100% Free</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab Content Output Area */}
      <div className="relative z-10">
        {renderTabContent()}
      </div>

    </div>
  );
}
