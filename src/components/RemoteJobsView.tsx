import React, { useState, useEffect } from "react";
import { 
  Briefcase, 
  Search, 
  Bookmark, 
  Sliders, 
  Globe, 
  GraduationCap, 
  Laptop, 
  Heart, 
  Check, 
  ExternalLink, 
  AlertCircle, 
  User, 
  Mail, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  Moon, 
  Sun, 
  Lightbulb, 
  TrendingUp, 
  Send, 
  Sparkles, 
  Clock, 
  ArrowRight,
  Info
} from "lucide-react";

interface Platform {
  id: string;
  name: string;
  url: string;
  description: string;
  bestFor: string[];
  type: "remote-job-board" | "internship-platform" | "freelance-marketplace";
  pricing: "free-to-browse" | "free-to-join" | "freemium";
  tags: string[];
  featured?: boolean;
}

export default function RemoteJobsView() {
  // Theme Toggle: dark mode (default) vs light mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  
  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | "remote-job-board" | "internship-platform" | "freelance-marketplace">("All");
  const [filterWorldwide, setFilterWorldwide] = useState(false);
  const [filterTechOnly, setFilterTechOnly] = useState(false);
  const [filterNoExp, setFilterNoExp] = useState(false);
  const [filterFreeOnly, setFilterFreeOnly] = useState(false);
  
  // Strategy Alert Box Dismiss state
  const [showAlert, setShowAlert] = useState(true);
  
  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Email Alert Form state
  const [email, setEmail] = useState("");
  const [roleType, setRoleType] = useState("Jobs");
  const [categoryAlert, setCategoryAlert] = useState("Any");
  const [frequency, setFrequency] = useState("Weekly");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Remote Visa Guide selected country state
  const [activeVisaCountry, setActiveVisaCountry] = useState<"spain" | "portugal" | "greece" | "costarica">("spain");

  // Load Bookmarks on mount
  useEffect(() => {
    const saved = localStorage.getItem("remote_jobs_bookmarks");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  const toggleBookmark = (id: string) => {
    let next;
    if (bookmarks.includes(id)) {
      next = bookmarks.filter(b => b !== id);
    } else {
      next = [...bookmarks, id];
    }
    setBookmarks(next);
    localStorage.setItem("remote_jobs_bookmarks", JSON.stringify(next));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      // Auto reset after 4 seconds
      setIsSubscribed(false);
      setEmail("");
    }, 4000);
  };

  const platforms: Platform[] = [
    // Category A: Dedicated Remote Job Boards
    {
      id: "weworkremotely",
      name: "We Work Remotely",
      url: "https://weworkremotely.com",
      description: "The world's largest remote work community. Best for Software, Marketing, Design, and Customer Support. Highly legitimate, high-paying global roles with vetted employers.",
      bestFor: ["Software", "Marketing", "Design", "Customer Support"],
      type: "remote-job-board",
      pricing: "free-to-browse",
      tags: ["Worldwide", "Free", "Full-Time", "Vetted"],
      featured: true
    },
    {
      id: "remoteok",
      name: "Remote OK",
      url: "https://remoteok.com",
      description: "Massive tech and startup-focused board. Features clear salary tags, region flexibility filtering, and a live tracking feed of remote operations globally.",
      bestFor: ["Software", "Design", "Marketing", "Startups"],
      type: "remote-job-board",
      pricing: "free-to-browse",
      tags: ["Worldwide", "Free", "Tech-Heavy"],
      featured: true
    },
    {
      id: "workingnomads",
      name: "Working Nomads",
      url: "https://www.workingnomads.com",
      description: "Curates 100% location-independent career opportunities for digital nomads. Great for global contract and full-time flexible positions.",
      bestFor: ["Digital Nomads", "Contract", "Full-Time"],
      type: "remote-job-board",
      pricing: "free-to-browse",
      tags: ["Worldwide", "Free", "Flexible"],
      featured: true
    },
    {
      id: "remoteco",
      name: "Remote.co",
      url: "https://remote.co",
      description: "Hand-vetted job listings across customer service, writing, marketing, and development. Completely filters out spam to present safe, reliable roles.",
      bestFor: ["Customer Service", "Writing", "Development", "Marketing"],
      type: "remote-job-board",
      pricing: "free-to-browse",
      tags: ["Worldwide", "Free", "Vetted"],
      featured: false
    },
    {
      id: "nodesk",
      name: "NoDesk",
      url: "https://nodesk.co",
      description: "A completely free remote job aggregator and resource hub. Excellent for exploring entry-level roles and early-stage tech startup positions.",
      bestFor: ["Entry-Level", "Startups", "Tech", "No Login Needed"],
      type: "remote-job-board",
      pricing: "free-to-browse",
      tags: ["Worldwide", "Free", "No Login Required"],
      featured: false
    },
    {
      id: "justremote",
      name: "JustRemote",
      url: "https://justremote.co",
      description: "Simple, fast job board targeting remote-first companies across multiple non-tech and tech sectors. Easily discover hidden jobs.",
      bestFor: ["Tech", "Non-Tech", "Design", "Sales"],
      type: "remote-job-board",
      pricing: "free-to-browse",
      tags: ["Worldwide", "Free", "Hidden Roles"],
      featured: false
    },
    {
      id: "remotive",
      name: "Remotive",
      url: "https://remotive.com",
      description: "Community-driven remote job board with a strong tech focus. Hand-curates listings from reliable global teams to optimize candidate search.",
      bestFor: ["Software Engineering", "Product", "Sales", "Data"],
      type: "remote-job-board",
      pricing: "free-to-browse",
      tags: ["Worldwide", "Free", "Tech-Heavy"],
      featured: false
    },
    {
      id: "hiringcafe",
      name: "HiringCafe",
      url: "https://hiringcafe.com",
      description: "A highly regarded, search-optimized global platform utilizing automated sourcing to index direct, scam-free remote roles with broad reach.",
      bestFor: ["Tech Engineers", "Marketing", "Data Scientists"],
      type: "remote-job-board",
      pricing: "free-to-browse",
      tags: ["Worldwide", "Free", "No Sign-Up"],
      featured: false
    },
    {
      id: "jobspresso",
      name: "Jobspresso",
      url: "https://jobspresso.co",
      description: "Hand-picked, carefully curated remote listings in tech, marketing, customer support, and writing. Great for location-independent experts.",
      bestFor: ["Marketing", "Writing", "Tech", "Project Management"],
      type: "remote-job-board",
      pricing: "free-to-browse",
      tags: ["Worldwide", "Free", "Vetted"],
      featured: false
    },
    {
      id: "dailyremote",
      name: "DailyRemote",
      url: "https://dailyremote.com",
      description: "Fresh remote and work-from-home job listings updated daily with strong country-based and worldwide geographic filters.",
      bestFor: ["Customer Support", "Data Entry", "Writing", "Design"],
      type: "remote-job-board",
      pricing: "free-to-browse",
      tags: ["Worldwide", "Free", "Fresh Daily"],
      featured: false
    },
    {
      id: "flexjobs",
      name: "FlexJobs",
      url: "https://flexjobs.com",
      description: "Screens and verifies all listings for total legitimacy. Features clean job previews at zero cost, with optional paid full access.",
      bestFor: ["High-Security", "Flexible Hours", "Vetted Companies"],
      type: "remote-job-board",
      pricing: "freemium",
      tags: ["Curated", "Freemium", "Scam-Free"],
      featured: false
    },

    // Category B: Internships & Student-Focused Platforms
    {
      id: "unstop",
      name: "Unstop",
      url: "https://unstop.com",
      description: "Connecting global students to virtual internships, coding challenges, and hiring hackathons with prestigious multinational brands.",
      bestFor: ["Students", "Freshers", "Virtual Internships", "Coding Challenges"],
      type: "internship-platform",
      pricing: "free-to-browse",
      tags: ["Students", "Free", "Internships", "Competitions"],
      featured: true
    },
    {
      id: "extern",
      name: "Extern",
      url: "https://www.extern.com",
      description: "Provides fully remote, project-based remote externships with Fortune 500 companies. Build an elite resume with zero prior experience.",
      bestFor: ["Students", "Resume Building", "Externships", "Project Learning"],
      type: "internship-platform",
      pricing: "free-to-browse",
      tags: ["Students", "No Experience", "Free", "Fortune 500"],
      featured: true
    },
    {
      id: "wellfound",
      name: "Wellfound (AngelList)",
      url: "https://wellfound.com",
      description: "The top platform for remote startup jobs and internships. Apply directly to founders with absolute transparency on salaries and equity.",
      bestFor: ["Startups", "Internships", "Entry-Level", "Equity Transparency"],
      type: "internship-platform",
      pricing: "free-to-browse",
      tags: ["Entry-Level", "Free", "Startups", "Direct Contact"],
      featured: true
    },
    {
      id: "parkerdewey",
      name: "Parker Dewey",
      url: "https://www.parkerdewey.com",
      description: "Connects college students to paid, short-term micro-internships and remote projects that require no prior background or local tax constraints.",
      bestFor: ["Paid Projects", "Micro-Internships", "Students", "No Experience"],
      type: "internship-platform",
      pricing: "free-to-browse",
      tags: ["Students", "Paid Projects", "Free", "Flexible"],
      featured: false
    },
    {
      id: "virtualinternships",
      name: "Virtual Internships",
      url: "https://www.virtualinternships.com",
      description: "Guarantees placement in fully remote global internships across various corporate fields. Includes premium coaching & career mentoring.",
      bestFor: ["Students", "Global Placement", "Career Mentorship"],
      type: "internship-platform",
      pricing: "freemium",
      tags: ["Students", "Global Placement", "Structured"],
      featured: false
    },
    {
      id: "internshala",
      name: "Internshala",
      url: "https://internshala.com",
      description: "India's largest internship platform. Features robust filters for work-from-home, flexible stipend structures, and verified student certificates.",
      bestFor: ["Indian Students", "Freshers", "WFH Gigs", "Stipends"],
      type: "internship-platform",
      pricing: "free-to-browse",
      tags: ["Students", "Free", "Internships", "Stipends"],
      featured: false
    },
    {
      id: "forage",
      name: "Forage",
      url: "https://theforage.com",
      description: "Free virtual job simulations from top global companies like JPMorgan and Deloitte. Build direct employer-aligned skills in self-paced environments.",
      bestFor: ["Virtual Simulations", "Skill Badges", "Corporate Learning"],
      type: "internship-platform",
      pricing: "free-to-browse",
      tags: ["Students", "No Experience", "Free Simulations"],
      featured: false
    },
    {
      id: "wayup",
      name: "WayUp",
      url: "https://wayup.com",
      description: "Excellent platform for college students and recent graduates to search for curated remote internships and entry-level positions.",
      bestFor: ["Undergrads", "Fresh Graduates", "Entry-Level"],
      type: "internship-platform",
      pricing: "free-to-browse",
      tags: ["Entry-Level", "Free", "Student-Focused"],
      featured: false
    },
    {
      id: "handshake",
      name: "Handshake",
      url: "https://joinhandshake.com",
      description: "University-linked platform connecting millions of students with thousands of global employers offering remote and local entry-level roles.",
      bestFor: ["College Students", "Entry-Level", "University Network"],
      type: "internship-platform",
      pricing: "free-to-browse",
      tags: ["Students", "Free", "University-Linked"],
      featured: false
    },

    // Category C: Freelance & Gig Marketplaces
    {
      id: "upwork",
      name: "Upwork",
      url: "https://www.upwork.com",
      description: "The world's largest freelance marketplace. Best for building a remote portfolio through contractual project gigs like coding, writing, and design.",
      bestFor: ["Contract Gigs", "Portfolio Building", "Worldwide Gigs"],
      type: "freelance-marketplace",
      pricing: "free-to-join",
      tags: ["Freelance", "Worldwide", "Free Profile"],
      featured: true
    },
    {
      id: "fiverr",
      name: "Fiverr",
      url: "https://www.fiverr.com",
      description: "Gig-based platform where you post your remote services directly. Ideal for entry-level freelancers to generate global clients quickly.",
      bestFor: ["Gig Gigs", "Micro Projects", "Entry Freelance"],
      type: "freelance-marketplace",
      pricing: "free-to-join",
      tags: ["Freelance", "Entry-Level", "Free Profile"],
      featured: true
    },
    {
      id: "contra",
      name: "Contra",
      url: "https://contra.com",
      description: "Commission-free, elegant freelance network built for modern independent creators, designers, and developers to display beautiful portfolios.",
      bestFor: ["Creators", "Designers", "Developers", "Zero Commission"],
      type: "freelance-marketplace",
      pricing: "free-to-join",
      tags: ["Freelance", "Zero Commission", "Portfolio"],
      featured: true
    },
    {
      id: "freelancer",
      name: "Freelancer",
      url: "https://freelancer.com",
      description: "Global marketplace hosting millions of projects across coding, copywriting, translation, and admin assistance. Features live bidding.",
      bestFor: ["Admin Work", "Quick Contests", "Bidding Gigs"],
      type: "freelance-marketplace",
      pricing: "free-to-join",
      tags: ["Freelance", "Worldwide", "Bidding"],
      featured: false
    },
    {
      id: "peopleperhour",
      name: "PeoplePerHour",
      url: "https://peopleperhour.com",
      description: "Curated freelance marketplace popular in the UK and Europe. High-quality corporate clients seeking remote project handlers.",
      bestFor: ["European Markets", "Quality Buyers", "Corporate Projects"],
      type: "freelance-marketplace",
      pricing: "free-to-join",
      tags: ["Freelance", "Curated Buyers", "Europe-Focus"],
      featured: false
    },
    {
      id: "toptal",
      name: "Toptal",
      url: "https://toptal.com",
      description: "Highly selective, elite freelance network representing the top 3% of global software developers, designers, and finance experts.",
      bestFor: ["Elite Talent", "Senior Developers", "High-Paying Contracts"],
      type: "freelance-marketplace",
      pricing: "free-to-browse",
      tags: ["Freelance", "Elite", "High-Paying", "Strict Screening"],
      featured: false
    },

    // Extra Aggregators
    {
      id: "himalayas",
      name: "Himalayas",
      url: "https://himalayas.app",
      description: "Premium directory of remote-first companies with deep research on salary figures, geographic rules, and company culture.",
      bestFor: ["Salary Research", "Remote Culture", "Software Teams"],
      type: "remote-job-board",
      pricing: "free-to-browse",
      tags: ["Worldwide", "Free", "Salary Transparency"],
      featured: false
    },
    {
      id: "powertofly",
      name: "PowerToFly",
      url: "https://powertofly.com",
      description: "Fast-growing remote hiring and diversity-focused platform designed to place underrepresented tech talent globally.",
      bestFor: ["Diversity Hiring", "Tech Careers", "Women in Tech"],
      type: "remote-job-board",
      pricing: "free-to-browse",
      tags: ["Inclusive Hiring", "Tech", "Free"],
      featured: false
    },
    {
      id: "arc",
      name: "Arc",
      url: "https://arc.dev",
      description: "Fast-tracks remote software engineering careers by matching developers globally with vetted companies and supportive tech networks.",
      bestFor: ["Software Developers", "Engineers", "Vetted Jobs"],
      type: "remote-job-board",
      pricing: "free-to-browse",
      tags: ["Tech-Heavy", "Free", "Vetted", "Worldwide"],
      featured: false
    },
    {
      id: "crossover",
      name: "Crossover",
      url: "https://crossover.com",
      description: "High-paying full-time remote roles for global professionals. Features standard rigorous testing assessments to unlock USD salaries.",
      bestFor: ["USD Salaries", "High-Performing Roles", "Testing Assessments"],
      type: "remote-job-board",
      pricing: "free-to-browse",
      tags: ["Worldwide", "High-Paying", "USD Salaries"],
      featured: false
    }
  ];

  // Dynamic filter logic
  const filteredPlatforms = platforms.filter(p => {
    // 1. Search Query Match
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bestFor.some(b => b.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    // 2. Category Tab Match
    const matchesCategory = selectedCategory === "All" || p.type === selectedCategory;

    // 3. Saved Bookmark Filter
    const matchesBookmark = !showBookmarksOnly || bookmarks.includes(p.id);

    // 4. Badges / Tags Filters
    const matchesWorldwide = !filterWorldwide || p.tags.some(t => ["Worldwide", "global", "Global Placement"].some(val => t.toLowerCase() === val.toLowerCase()));
    const matchesTechOnly = !filterTechOnly || p.tags.some(t => ["Tech-Heavy", "Tech", "developer"].some(val => t.toLowerCase().includes(val.toLowerCase()))) || p.bestFor.some(b => ["Software", "Development", "Engineering"].some(val => b.toLowerCase().includes(val.toLowerCase())));
    const matchesNoExp = !filterNoExp || p.tags.some(t => ["No Experience", "Students", "Entry-Level", "Student-Focused"].some(val => t.toLowerCase() === val.toLowerCase()));
    const matchesFree = !filterFreeOnly || p.pricing === "free-to-browse" || p.pricing === "free-to-join";

    return matchesSearch && matchesCategory && matchesBookmark && matchesWorldwide && matchesTechOnly && matchesNoExp && matchesFree;
  });

  const visaCountryDetails = {
    spain: {
      name: "Spain Digital Nomad Visa",
      income: "$3,050+/month",
      duration: "Up to 1 year initial (renewable to 5 years)",
      perks: "Beckham Law gives favorable 15% flat tax rates on foreign income. Direct path to EU permanent residency.",
      requirements: "Proof of employment contract/clients outside Spain, clean criminal records, valid health insurance."
    },
    portugal: {
      name: "Portugal D8 Visa",
      income: "$3,850+/month",
      duration: "1 year initial (renewable up to 5+ years)",
      perks: "Visa free travel throughout the entire Schengen zone. High quality of life, robust digital expat hubs.",
      requirements: "Tax declarations, proof of remote earnings exceeding 4x Portugal minimum wage, active lease agreement."
    },
    greece: {
      name: "Greece Nomad Visa",
      income: "$3,850+/month",
      duration: "2 years initial (renewable every 2 years)",
      perks: "50% income tax reduction incentive package for up to 7 years. Absolute scenic Mediterranean environment.",
      requirements: "Steady foreign remote income, bank statements verifying reserves, clean medical certificates."
    },
    costarica: {
      name: "Costa Rica Rentista Visa",
      income: "$3,000/month",
      duration: "Up to 2 years (renewable)",
      perks: "100% tax exemption on all foreign-sourced earnings. Highly simplified bureaucracy, incredible nature.",
      requirements: "Certified bank letter guaranteeing income stream, background check apostilled, medical coverage."
    }
  };

  return (
    <div className={`w-full min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-[#0F172A] text-white" : "bg-slate-50 text-slate-800"}`}>
      
      {/* Platform Banner Wrapper */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
        
        {/* Header Title with localized Dark/Light Mode toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0D9488]/15 border border-[#0D9488]/20 text-[#0D9488] mb-2">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Worldwide Remote Opportunity Directory</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight font-display">
              Remote Jobs Platform
            </h1>
            <p className={`text-xs mt-1 font-sans ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              Unlock 100% vetted global job boards, internships, and marketplaces to find remote work with ease.
            </p>
          </div>

          {/* Theme switcher */}
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 text-xs font-medium ${
              isDarkMode 
                ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-yellow-400" 
                : "bg-white border-slate-200 hover:bg-slate-100 text-indigo-600 shadow-sm"
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className={`rounded-3xl p-8 sm:p-12 relative overflow-hidden border transition-all ${
          isDarkMode 
            ? "bg-gradient-to-r from-slate-900/80 via-[#0F172A]/90 to-transparent border-slate-800 shadow-2xl" 
            : "bg-gradient-to-r from-teal-500/10 via-indigo-500/5 to-transparent border-slate-200 shadow-sm"
        }`}>
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0D9488]/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight font-display">
              Your Gateway to Worldwide Remote Work.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0D9488] to-indigo-400">100% Vetted. 100% Free.</span>
            </h2>
            <p className={`text-sm sm:text-base max-w-2xl leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
              Ditch the local geographic boundaries. Explore the worlds' most popular remote boards, micro-internships, paid projects, and freelance sites from any country across the globe.
            </p>

            {/* Smart Search Bar within Hero */}
            <div className="pt-4 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Type role keywords (e.g. 'Tech', 'Marketing', 'Internship', 'Writing')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full text-sm rounded-2xl py-3.5 pl-12 pr-4 outline-none transition-all ${
                    isDarkMode 
                      ? "bg-slate-950/80 border border-slate-800 text-white focus:border-[#0D9488]/50 focus:ring-1 focus:ring-[#0D9488]/30" 
                      : "bg-white border border-slate-200 text-slate-900 focus:border-[#0D9488]/60 focus:ring-1 focus:ring-[#0D9488]/40 shadow-sm"
                  }`}
                />
              </div>
            </div>

            {/* Live Counts & Stats row */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-mono uppercase tracking-wider">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>20+ Verified Hubs</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Globe className="w-4 h-4" />
                <span>Worldwide Hiring</span>
              </div>
              <div className="flex items-center gap-1.5 text-purple-400">
                <GraduationCap className="w-4 h-4" />
                <span>Student-Friendly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dismissible Strategy Alert Box */}
        {showAlert && (
          <div className={`p-5 rounded-2xl border flex items-start justify-between gap-4 transition-all duration-300 ${
            isDarkMode 
              ? "bg-[#0D9488]/10 border-[#0D9488]/25 text-slate-200" 
              : "bg-teal-50 border-teal-200 text-teal-900"
          }`}>
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0 animate-pulse" />
              <div>
                <p className="text-xs font-bold font-mono uppercase tracking-wide">💡 Strategy Tip for Success</p>
                <p className="text-xs leading-relaxed mt-1">
                  Many remote jobs still require you to live in a specific country (like the US or EU) due to local tax laws. To bypass local tax or country restrictions, always filter or search for <span className="font-bold underline">"Worldwide"</span> or <span className="font-bold underline">"Anywhere"</span> on global boards!
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="text-xs font-bold hover:opacity-80 px-2 py-1 rounded bg-black/10 text-slate-400 hover:text-white cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Directory Dashboard Section */}
        <div className="space-y-6">
          
          {/* Filtering Controls Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
            
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar scrollbar-thin">
              {[
                { id: "All", label: "All Platforms", icon: Briefcase },
                { id: "remote-job-board", label: "Dedicated Job Boards", icon: Laptop },
                { id: "internship-platform", label: "Internships & Freshers", icon: GraduationCap },
                { id: "freelance-marketplace", label: "Freelance & Gigs", icon: Globe }
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-[#0D9488] text-white shadow-md shadow-[#0D9488]/20"
                        : isDarkMode
                          ? "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                          : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Bookmarks Toggle button */}
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                showBookmarksOnly
                  ? "bg-pink-500/10 border-pink-500/25 text-pink-400"
                  : isDarkMode
                    ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    : "bg-white border-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showBookmarksOnly ? "fill-pink-500 text-pink-400" : ""}`} />
              <span>{showBookmarksOnly ? "My Saved Folders" : "Saved Only"}</span>
            </button>
          </div>

          {/* Secondary Badge Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mr-2">Quick Filters:</span>
            
            <button
              onClick={() => setFilterWorldwide(!filterWorldwide)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                filterWorldwide 
                  ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-400"
                  : isDarkMode ? "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              🌍 Worldwide Hiring
            </button>

            <button
              onClick={() => setFilterTechOnly(!filterTechOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                filterTechOnly 
                  ? "bg-blue-500/15 border-blue-500/30 text-blue-400"
                  : isDarkMode ? "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              💻 Tech-Heavy / Software
            </button>

            <button
              onClick={() => setFilterNoExp(!filterNoExp)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                filterNoExp 
                  ? "bg-purple-500/15 border-purple-500/30 text-purple-400"
                  : isDarkMode ? "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              🎓 Student & Freshers
            </button>

            <button
              onClick={() => setFilterFreeOnly(!filterFreeOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                filterFreeOnly 
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                  : isDarkMode ? "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              ✅ 100% Free Only
            </button>
          </div>

          {/* Results Summary Counter */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 uppercase tracking-wide pt-2">
            <div>
              Showing <span className={isDarkMode ? "text-cyan-400" : "text-slate-950 font-bold"}>{filteredPlatforms.length}</span> matching platforms
            </div>
            {bookmarks.length > 0 && (
              <div className="text-[10px]">
                {bookmarks.length} platform{bookmarks.length > 1 ? "s" : ""} bookmarked
              </div>
            )}
          </div>

          {/* Card Grid Layout */}
          {filteredPlatforms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 animate-fade-in">
              {filteredPlatforms.map((platform) => {
                const isBookmarked = bookmarks.includes(platform.id);
                return (
                  <div 
                    key={platform.id}
                    className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 group hover:scale-[1.01] ${
                      isDarkMode 
                        ? "bg-slate-900/50 border-slate-800/80 hover:border-[#0D9488]/40 hover:bg-[#1E293B]/40" 
                        : "bg-white border-slate-200/80 hover:border-[#0D9488]/50 hover:bg-slate-50/50 shadow-sm hover:shadow-md"
                    }`}
                  >
                    <div>
                      {/* Top platform badges row */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[9px] font-mono uppercase tracking-wider font-bold ${
                          platform.type === "remote-job-board"
                            ? isDarkMode ? "bg-blue-500/10 text-blue-300 border border-blue-500/20" : "bg-blue-50 text-blue-700 border border-blue-100"
                            : platform.type === "internship-platform"
                              ? isDarkMode ? "bg-purple-500/10 text-purple-300 border border-purple-500/20" : "bg-purple-50 text-purple-700 border border-purple-100"
                              : isDarkMode ? "bg-pink-500/10 text-pink-300 border border-pink-500/20" : "bg-pink-50 text-pink-700 border border-pink-100"
                        }`}>
                          {platform.type === "remote-job-board" && <Laptop className="w-3 h-3" />}
                          {platform.type === "internship-platform" && <GraduationCap className="w-3 h-3" />}
                          {platform.type === "freelance-marketplace" && <Globe className="w-3 h-3" />}
                          {platform.type === "remote-job-board" ? "Remote Jobs" : platform.type === "internship-platform" ? "Internships" : "Freelance"}
                        </span>
                        
                        <div className="flex items-center gap-1">
                          {platform.featured && (
                            <span className="text-[8px] font-bold font-mono uppercase tracking-widest text-amber-400 bg-amber-400/15 border border-amber-400/20 px-1.5 py-0.5 rounded">
                              ★ Featured
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => toggleBookmark(platform.id)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              isBookmarked
                                ? "bg-pink-500/15 border-pink-500/30 text-pink-400"
                                : "border-transparent text-slate-500 hover:text-slate-300"
                            }`}
                            title={isBookmarked ? "Remove Bookmark" : "Save Board"}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isBookmarked ? "fill-pink-500 text-pink-400" : ""}`} />
                          </button>
                        </div>
                      </div>

                      {/* Header title */}
                      <h3 className={`text-base font-bold tracking-tight group-hover:text-[#0D9488] transition-colors ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}>
                        {platform.name}
                      </h3>

                      {/* Description */}
                      <p className={`text-xs mt-2 leading-relaxed line-clamp-3 ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}>
                        {platform.description}
                      </p>

                      {/* Best for points */}
                      <div className="mt-3.5 space-y-1">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">Best For:</span>
                        <div className="flex flex-wrap gap-1">
                          {platform.bestFor.map((item) => (
                            <span 
                              key={item} 
                              className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                                isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Features Badges array */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {platform.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className={`text-[9px] px-2 py-0.5 rounded font-semibold ${
                              tag === "Worldwide" || tag === "Global Placement"
                                ? isDarkMode ? "bg-cyan-500/10 border border-cyan-500/25 text-cyan-300" : "bg-cyan-50 border border-cyan-200 text-cyan-700"
                                : tag === "Free" || tag === "Zero Commission"
                                  ? isDarkMode ? "bg-emerald-500/10 border border-emerald-500/25 text-emerald-300" : "bg-emerald-50 border border-emerald-200 text-emerald-700"
                                  : isDarkMode ? "bg-slate-800/60 border border-slate-700 text-slate-400" : "bg-slate-100 border border-slate-200 text-slate-500"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Launcher Link */}
                    <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                      <span className={`text-[9px] font-mono font-bold uppercase ${
                        platform.pricing === "free-to-browse" || platform.pricing === "free-to-join"
                          ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded"
                          : "text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded"
                      }`}>
                        {platform.pricing === "free-to-browse" ? "100% Free Browse" : platform.pricing === "free-to-join" ? "Free Registration" : "Freemium Core"}
                      </span>
                      
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        referrerPolicy="no-referrer"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0D9488] hover:bg-[#0D9488]/90 text-white text-xs font-bold transition-all cursor-pointer group-hover:translate-x-0.5 duration-200 shadow-sm"
                      >
                        <span>Visit Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={`flex flex-col items-center justify-center py-20 text-center rounded-3xl border ${
              isDarkMode ? "bg-slate-900/40 border-slate-800 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-600"
            }`}>
              <Globe className="w-12 h-12 text-slate-600 mb-4 animate-pulse" />
              <h3 className={`text-base font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>No platform matches found</h3>
              <p className="text-xs max-w-sm mt-1 leading-relaxed px-4">
                No matching directory items detected. Try checking your keyword queries, toggling of filters, or reset saved bookmarks tab.
              </p>
            </div>
          )}
        </div>

        {/* 4-Step Interactive Roadmap & Search Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          
          {/* How to use 4-step */}
          <div className={`lg:col-span-7 rounded-2xl p-6 border ${
            isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-5 h-5 text-[#0D9488]" />
              <h3 className={`text-base font-bold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                How to Use This Site Successfully
              </h3>
            </div>
            
            <p className={`text-xs leading-relaxed mb-6 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              Unlock maximum career efficacy with this simple four-step directory navigation guide.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { step: "1", title: "Search Hubs", desc: "Type in high-scale keywords like 'Intern' or 'Worldwide' inside our dashboard filters to locate corresponding websites." },
                { step: "2", title: "Filter Match", desc: "Select 'Dedicated Job Boards', 'Internships', or 'Freelance' tab to customize search parameters." },
                { step: "3", title: "Visit & Pivot", desc: "Click 'Visit Website' to open official vetting portals securely inside a new tab with no fees required." },
                { step: "4", title: "Apply Directly", desc: "Locate employer postings directly on those official sites. Apply daily to 3-5 roles to boost success!" }
              ].map((item, idx) => (
                <div key={idx} className={`p-4 rounded-xl border flex gap-3 ${
                  isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-100"
                }`}>
                  <div className="w-7 h-7 rounded-full bg-[#0D9488]/10 text-[#0D9488] border border-[#0D9488]/20 flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>{item.title}</h4>
                    <p className={`text-[11px] leading-relaxed mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips for Job Seekers */}
          <div className={`lg:col-span-5 rounded-2xl p-6 border flex flex-col justify-between ${
            isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-[#0D9488]" />
                <h3 className={`text-base font-bold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  Security & Job-Hunting Guidelines
                </h3>
              </div>
              
              <p className={`text-xs leading-relaxed mb-4 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Avoid internet scams and construct a highly optimized workflow utilizing three central policies.
              </p>

              <div className="space-y-3">
                {[
                  { title: "Avoid Platform Scams", desc: "Legitimate remote jobs will NEVER charge applications, screening fees, or onboarding supplies. Verify the hiring domain." },
                  { title: "Build One Strong Resume", desc: "Align your profile with standard ATS formatting guidelines. Use modern clear display layouts." },
                  { title: "Configure Job Alerts", desc: "Set up automated weekly email notifications matching your specific tech stacks on the target directories." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start text-xs">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className={`font-bold block ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>{item.title}</span>
                      <span className={`text-[11px] leading-relaxed block mt-0.5 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`mt-6 p-3 rounded-xl border flex items-center gap-2.5 ${
              isDarkMode ? "bg-slate-950/50 border-slate-800/60" : "bg-slate-50 border-slate-100"
            }`}>
              <Info className="w-4 h-4 text-[#0D9488] flex-shrink-0" />
              <p className={`text-[10px] leading-normal ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Always submit applications directly through verified corporate career pages.
              </p>
            </div>
          </div>
        </div>

        {/* Remote Work Visas & Digital Nomad Guide */}
        <div className={`rounded-2xl p-6 sm:p-8 border ${
          isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-400 animate-pulse" />
                <h3 className={`text-base font-bold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  Global Remote Work Visas & Expat Guide
                </h3>
              </div>
              <p className={`text-xs mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Interested in travelling or relocation? Discover top international digital nomad visa paths available in 2026.
              </p>
            </div>

            {/* Country Selector Tabs */}
            <div className="flex flex-wrap gap-1 bg-black/40 p-1 border border-white/5 rounded-xl">
              {(["spain", "portugal", "greece", "costarica"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveVisaCountry(key)}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg capitalize cursor-pointer transition-all duration-150 ${
                    activeVisaCountry === key 
                      ? "bg-[#0D9488] text-white shadow-sm" 
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {key === "costarica" ? "Costa Rica" : key}
                </button>
              ))}
            </div>
          </div>

          {/* Visa details content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left explanation block (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/20 text-indigo-300 uppercase font-bold tracking-wider">
                  2026 Immigration Pathways
                </span>
                <h4 className={`text-lg font-bold mt-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  {visaCountryDetails[activeVisaCountry].name}
                </h4>
                <p className={`text-xs leading-relaxed mt-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  {visaCountryDetails[activeVisaCountry].perks}
                </p>
              </div>

              {/* Requirement grid indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className={`p-3.5 rounded-xl border flex flex-col gap-1 ${
                  isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-100"
                }`}>
                  <span className="text-[9px] font-mono text-slate-500 uppercase font-bold">Min. Income Threshold:</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">{visaCountryDetails[activeVisaCountry].income}</span>
                </div>
                <div className={`p-3.5 rounded-xl border flex flex-col gap-1 ${
                  isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-100"
                }`}>
                  <span className="text-[9px] font-mono text-slate-500 uppercase font-bold">Validity Duration:</span>
                  <span className="text-sm font-bold text-cyan-400 font-mono">{visaCountryDetails[activeVisaCountry].duration}</span>
                </div>
              </div>
            </div>

            {/* Right instruction details card (5 cols) */}
            <div className={`md:col-span-5 rounded-2xl p-5 border flex flex-col justify-between h-full min-h-[180px] ${
              isDarkMode ? "bg-slate-950/60 border-slate-800/80" : "bg-slate-50 border-slate-200"
            }`}>
              <div>
                <span className="text-[10px] font-mono text-[#0D9488] font-extrabold uppercase tracking-wider block mb-1">
                  Primary Requirements:
                </span>
                <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                  {visaCountryDetails[activeVisaCountry].requirements}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px]">
                <span className="text-slate-500 font-mono font-bold uppercase">Legal & Verified</span>
                <a 
                  href="https://archive.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-indigo-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Official Policy</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Email Alerts Form section */}
        <div className={`rounded-3xl p-8 relative overflow-hidden border ${
          isDarkMode 
            ? "bg-slate-950/80 border-slate-800 shadow-2xl" 
            : "bg-white border-slate-200 shadow-sm"
        }`}>
          {/* Decorative glowing orb */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#0D9488]/5 rounded-full filter blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left text description (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488]/15 border border-[#0D9488]/20 text-[#0D9488] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className={`text-xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Get Remote Job Alerts by Email
              </h3>
              <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Configure your tailored alert specifications and receive new global remote listings, virtual internships, and entry-level gigs straight to your secure inbox.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                <Check className="w-4.5 h-4.5 text-emerald-400" />
                <span>Free to join • No spam • Opt-out anytime</span>
              </div>
            </div>

            {/* Right form submission grid (7 cols) */}
            <div className="lg:col-span-7">
              {isSubscribed ? (
                <div className={`p-8 rounded-2xl border text-center space-y-3 animate-rec-pulse ${
                  isDarkMode ? "bg-slate-900/50 border-emerald-500/30" : "bg-emerald-50 border-emerald-200"
                }`}>
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className={`text-base font-bold ${isDarkMode ? "text-white" : "text-emerald-900"}`}>Subscription Successful!</h4>
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-emerald-700"}`}>
                    You have successfully registered for weekly alert updates on <span className="font-bold">{roleType}</span> ({categoryAlert} niche) to your inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Role Type */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Role Type Preferences:</label>
                      <select
                        value={roleType}
                        onChange={(e) => setRoleType(e.target.value)}
                        className={`w-full text-xs rounded-xl p-2.5 outline-none border ${
                          isDarkMode 
                            ? "bg-slate-900 border-slate-800 text-white focus:border-[#0D9488]" 
                            : "bg-white border-slate-200 text-slate-800 focus:border-[#0D9488]"
                        }`}
                      >
                        <option value="Jobs">Jobs (Full-Time / Contract)</option>
                        <option value="Internships">Remote Internships</option>
                        <option value="Freelance">Freelance Gigs</option>
                        <option value="All">All Categories</option>
                      </select>
                    </div>

                    {/* Category Alert option */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Niche Categorization:</label>
                      <select
                        value={categoryAlert}
                        onChange={(e) => setCategoryAlert(e.target.value)}
                        className={`w-full text-xs rounded-xl p-2.5 outline-none border ${
                          isDarkMode 
                            ? "bg-slate-900 border-slate-800 text-white focus:border-[#0D9488]" 
                            : "bg-white border-slate-200 text-slate-800 focus:border-[#0D9488]"
                        }`}
                      >
                        <option value="Any">Any Discipline</option>
                        <option value="Tech">Software & Tech Focus</option>
                        <option value="Non-Tech">Non-Tech (Support, Writing)</option>
                        <option value="Design">UI/UX & Creative Design</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    {/* Frequency option */}
                    <div className="space-y-1 sm:col-span-1">
                      <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Alert Frequency:</label>
                      <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className={`w-full text-xs rounded-xl p-2.5 outline-none border ${
                          isDarkMode 
                            ? "bg-slate-900 border-slate-800 text-white focus:border-[#0D9488]" 
                            : "bg-white border-slate-200 text-slate-800 focus:border-[#0D9488]"
                        }`}
                      >
                        <option value="Daily">Daily Feeds</option>
                        <option value="Weekly">Weekly Summaries</option>
                      </select>
                    </div>

                    {/* Email Input Bar */}
                    <div className="space-y-1 sm:col-span-2 flex flex-col justify-end">
                      <div className="flex gap-2">
                        <input
                          type="email"
                          placeholder="Your email address (e.g. name@domain.com)..."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className={`flex-1 text-xs rounded-xl px-4 py-2.5 outline-none border ${
                            isDarkMode 
                              ? "bg-slate-900 border-slate-800 text-white focus:border-[#0D9488]" 
                              : "bg-white border-slate-200 text-slate-800 focus:border-[#0D9488]"
                          }`}
                        />
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0D9488]/90 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 flex-shrink-0"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Subscribe</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Sub-Footer Vetting Disclaimer */}
        <div className={`p-6 rounded-2xl border text-center ${
          isDarkMode ? "bg-slate-900/15 border-slate-800" : "bg-slate-50 border-slate-200 shadow-inner"
        }`}>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wide leading-relaxed max-w-4xl mx-auto">
            💡 Platform Disclaimer: Remote Jobs Platform is a 100% free informational community directory routing to third-party public remote websites and corporate placement boards. We do NOT process candidate applications or request fees. Always check and verify hiring legitimacy of employers before submitting credentials.
          </p>
        </div>

      </div>

    </div>
  );
}
