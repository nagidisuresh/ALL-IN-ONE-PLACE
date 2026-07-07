import React, { useState, useEffect, useRef } from "react";
import { 
  Search, Compass, ShieldCheck, Cpu, Star, Award, HelpCircle, 
  LayoutGrid, Sparkles, BookOpen, UserCheck, Plus, Check, Settings, 
  Trash2, Tag, Calendar, Share2, TrendingUp, Clock, FileText, Gift, 
  CreditCard, ChevronRight, AlertCircle, RefreshCw, BarChart2, MessageSquare,
  Users, CheckCircle2, Eye, Lock, ArrowUpRight, DollarSign, Bookmark, Send
} from "lucide-react";
import { 
  STARTUP_LISTINGS, StartupListing, LISTING_CATEGORIES, 
  BLOG_ARTICLES, BlogArticle, SUBSCRIPTION_PLANS, MOCK_USERS_LIST 
} from "./foundersPrimeData";

export default function FoundersPrimeView() {
  // Navigation tabs: "catalog" | "ai-advisor" | "subscriptions" | "blog" | "admin"
  const [subTab, setSubTab] = useState<"catalog" | "ai-advisor" | "subscriptions" | "blog" | "admin">("catalog");

  // Search, Suggestion, and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStage, setSelectedStage] = useState<string>("All");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem("fp_recent_searches");
    return saved ? JSON.parse(saved) : ["AWS", "Y Combinator", "PostHog", "Grants"];
  });
  const [savedSearches, setSavedSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem("fp_saved_searches");
    return saved ? JSON.parse(saved) : ["AI API Credits", "Government Grants"];
  });

  // Bookmark and Claim Deals State
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem("fp_bookmarks");
    return saved ? JSON.parse(saved) : [];
  });
  const [claimedDeals, setClaimedDeals] = useState<string[]>(() => {
    const saved = localStorage.getItem("fp_claimed");
    return saved ? JSON.parse(saved) : [];
  });

  // AI Advisor matching state
  const [advisorStage, setAdvisorStage] = useState("Pre-seed");
  const [advisorLocation, setAdvisorLocation] = useState("Global");
  const [advisorIndustry, setAdvisorIndustry] = useState("Artificial Intelligence & SaaS");
  const [advisorGoals, setAdvisorGoals] = useState("Extend cash runway and fund early development");
  const [isMatchingLoading, setIsMatchingLoading] = useState(false);
  const [advisorResult, setAdvisorResult] = useState<{
    summary: string;
    strategies: string[];
    timelinePlaybook: string[];
    targetedAdvice: string;
  } | null>(null);

  // Subscriptions & Checkout state
  const [selectedPlan, setSelectedPlan] = useState<any>(SUBSCRIPTION_PLANS[2]); // Default Founder plan
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [referralCode, setReferralCode] = useState("FOUNDER-SURESH");
  const [commissionTracked, setCommissionTracked] = useState(84.00);
  const [couponError, setCouponError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [activeSubscription, setActiveSubscription] = useState<string>(() => {
    return localStorage.getItem("fp_active_sub") || "Free";
  });
  const [invoice, setInvoice] = useState<{
    id: string;
    date: string;
    planName: string;
    origPrice: number;
    finalPrice: number;
    coupon: string;
  } | null>(null);

  // Blog CMS & Comments state
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);
  const [blogScrollPercent, setBlogScrollPercent] = useState(0);
  const [blogComments, setBlogComments] = useState<Record<string, { author: string; text: string; date: string }[]>>({
    "art-1": [
      { author: "Ananya Roy", text: "Staging credits is absolutely critical. We claimed our $100k GCP credits too early and lost 6 months of them because our product wasn't fully ready. Don't make our mistake!", date: "2 days ago" },
      { author: "Deepak Sharma", text: "Does anyone know if Stripe Atlas incorporates into Delaware LLC too, or only C-Corp?", date: "Yesterday" }
    ]
  });
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  // Admin Dashboard States (Mutable Mock Data)
  const [adminUsers, setAdminUsers] = useState(MOCK_USERS_LIST);
  const [adminDeals, setAdminDeals] = useState<StartupListing[]>(STARTUP_LISTINGS);
  const [pendingQueue, setPendingQueue] = useState<StartupListing[]>([
    {
      id: "pend-1",
      name: "NeoVite Email Server",
      logoColor: "from-rose-600 to-indigo-600",
      description: "Claim $2,500 in transactional mail credits with ultra-fast latency and compliance verification.",
      eligibility: "Formed under 1 year ago.",
      category: "SaaS Discounts",
      country: "Global",
      industry: "Email/DevTools",
      startupStage: "Pre-seed",
      applicationLink: "https://neovite.io",
      value: "$2,500 Email Credits",
      deadline: "Rolling",
      verificationStatus: "Pending Review",
      updateHistory: "Submitted yesterday by founder",
      tags: ["email", "smtp", "saas"]
    }
  ]);
  const [successMessage, setSuccessMessage] = useState("");

  // Blog creation state
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogExcerpt, setNewBlogExcerpt] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");
  const [newBlogCategory, setNewBlogCategory] = useState("General");
  const [newBlogTags, setNewBlogTags] = useState("");

  const articleContainerRef = useRef<HTMLDivElement>(null);

  // Sync state helpers
  useEffect(() => {
    localStorage.setItem("fp_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("fp_claimed", JSON.stringify(claimedDeals));
  }, [claimedDeals]);

  useEffect(() => {
    localStorage.setItem("fp_recent_searches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    localStorage.setItem("fp_saved_searches", JSON.stringify(savedSearches));
  }, [savedSearches]);

  // Track scroll for active article reading indicator
  useEffect(() => {
    const handleScroll = () => {
      if (!articleContainerRef.current) return;
      const element = articleContainerRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      if (totalHeight === 0) return;
      const progress = (element.scrollTop / totalHeight) * 100;
      setBlogScrollPercent(Math.min(100, Math.max(0, progress)));
    };

    const container = articleContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [activeArticle]);

  // Toggle bookmark function
  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter((b) => b !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  // Add search query to recent searches
  const handleSearchSubmit = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    if (!recentSearches.includes(trimmed)) {
      setRecentSearches([trimmed, ...recentSearches.slice(0, 4)]);
    }
    setShowSuggestions(false);
  };

  // Save current search query
  const handleSaveSearch = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    if (!savedSearches.includes(trimmed)) {
      setSavedSearches([...savedSearches, trimmed]);
      triggerNotification(`Saved search pattern: "${trimmed}"`);
    }
  };

  // Trigger temporary flash banners
  const triggerNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  // Claim a deal with mock verification workflow
  const handleClaimDeal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (claimedDeals.includes(id)) {
      triggerNotification("You have already claimed this coupon.");
      return;
    }
    setClaimedDeals([...claimedDeals, id]);
    triggerNotification("Perk claimed successfully! Copied coupon to workspace.");
  };

  // AI Recommendation matching
  const generateAIPlaybook = async () => {
    setIsMatchingLoading(true);
    setAdvisorResult(null);
    try {
      const res = await fetch("/api/gemini/founders-prime/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: advisorStage,
          location: advisorLocation,
          industry: advisorIndustry,
          goals: advisorGoals
        })
      });
      if (!res.ok) throw new Error("Recommendation generation failed.");
      const data = await res.json();
      setAdvisorResult(data);
    } catch (e: any) {
      console.error(e);
      // Fallback in case of server failure/offline
      setAdvisorResult({
        summary: `Excellent match for a ${advisorStage} company based in ${advisorLocation} focused on ${advisorIndustry}.`,
        strategies: [
          `Claim AWS Activate or Microsoft Founders Hub during Month 0-2 to launch beta versions without hosting bills.`,
          `Integrate PostHog's early-stage cohort discount to bypass high SaaS integration barriers.`,
          `Submit application to regional pre-seed accelerator fellowships targeting ${advisorIndustry}.`
        ],
        timelinePlaybook: [
          "Month 1-3: Establish AWS Cloud hosting, Stripe Atlas business structure, and secure early user feedback.",
          "Month 3-6: Claim PostHog and Datadog monitoring to track user metrics and infrastructure performance.",
          "Month 6-12: Expand to government innovation grant funding programs to support team growth without giving up equity."
        ],
        targetedAdvice: "Prioritize non-dilutive startup grants and cloud perks to secure at least 12 months of runway before talking to VC angel networks."
      });
    } finally {
      setIsMatchingLoading(false);
    }
  };

  // Subscription Checkout Simulation
  const applyPromoCode = () => {
    setCouponError("");
    const code = couponCode.trim().toUpperCase();
    if (code === "SURESH50") {
      setDiscountApplied(true);
      setDiscountPercent(50);
      triggerNotification("Promo Code 'SURESH50' Applied: 50% Off Lifetime!");
    } else if (code === "LAUNCH20") {
      setDiscountApplied(true);
      setDiscountPercent(20);
      triggerNotification("Promo Code 'LAUNCH20' Applied: 20% Off!");
    } else if (code) {
      setCouponError("Invalid promo code. Try 'SURESH50' or 'LAUNCH20'");
    }
  };

  const executeMockCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      const numericPrice = parseFloat(selectedPlan.price.replace("$", ""));
      const discountVal = (numericPrice * discountPercent) / 100;
      const finalPrice = numericPrice - discountVal;

      setInvoice({
        id: "INV-" + Math.floor(Math.random() * 900000 + 100000),
        date: new Date().toLocaleDateString(),
        planName: selectedPlan.name,
        origPrice: numericPrice,
        finalPrice: finalPrice,
        coupon: discountApplied ? couponCode.toUpperCase() : "None"
      });
      setActiveSubscription(selectedPlan.name);
      localStorage.setItem("fp_active_sub", selectedPlan.name);
      triggerNotification(`Successfully subscribed to ${selectedPlan.name} Tier! Invoice issued.`);
    }, 1500);
  };

  // Blog comment submission
  const handleAddComment = (articleId: string) => {
    if (!newCommentName.trim() || !newCommentText.trim()) return;
    const currentComments = blogComments[articleId] || [];
    const updated = [
      ...currentComments,
      { author: newCommentName, text: newCommentText, date: "Just now" }
    ];
    setBlogComments({
      ...blogComments,
      [articleId]: updated
    });
    setNewCommentName("");
    setNewCommentText("");
    triggerNotification("Comment posted to review queue!");
  };

  // Admin Actions
  const handleApprovePending = (listing: StartupListing) => {
    setPendingQueue(pendingQueue.filter((p) => p.id !== listing.id));
    const approved = { ...listing, verificationStatus: "Verified" as const };
    setAdminDeals([approved, ...adminDeals]);
    triggerNotification(`Approved deal: "${listing.name}" is now live!`);
  };

  const handleRejectPending = (id: string) => {
    setPendingQueue(pendingQueue.filter((p) => p.id !== id));
    triggerNotification("Pending deal submission rejected.");
  };

  const handleUpdateRole = (userId: string, newRole: string) => {
    setAdminUsers(
      adminUsers.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    triggerNotification("User access role updated.");
  };

  const handlePublishBlog = () => {
    if (!newBlogTitle.trim() || !newBlogContent.trim()) {
      triggerNotification("Please fill in Blog Title and Content.");
      return;
    }
    const newArt: BlogArticle = {
      id: "art-" + Date.now(),
      title: newBlogTitle,
      slug: newBlogTitle.toLowerCase().replace(/ /g, "-"),
      excerpt: newBlogExcerpt || newBlogContent.substring(0, 120) + "...",
      content: newBlogContent,
      category: newBlogCategory,
      tags: newBlogTags.split(",").map((t) => t.trim()).filter(Boolean),
      author: {
        name: "Suresh Nagidi",
        role: "Super Admin",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
      },
      readTime: "4 min read",
      publishedAt: new Date().toLocaleDateString(),
      commentsCount: 0
    };
    BLOG_ARTICLES.unshift(newArt);
    setNewBlogTitle("");
    setNewBlogExcerpt("");
    setNewBlogContent("");
    setNewBlogTags("");
    triggerNotification("Blog published to the premium feed!");
  };

  // Filtering directory listings
  const filteredListings = adminDeals.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.eligibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesStage = selectedStage === "All" || item.startupStage === selectedStage;
    const matchesCountry = selectedCountry === "All" || item.country.toLowerCase() === selectedCountry.toLowerCase();

    return matchesSearch && matchesCategory && matchesStage && matchesCountry;
  });

  const uniqueCountries = ["All", "Global", "United States", "India"];

  return (
    <div id="founders-prime-panel" className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-24 min-h-[calc(100vh-120px)] flex flex-col justify-between">
      
      {/* 1. Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-r from-slate-950 via-[#0d0c18] to-purple-950 p-6 sm:p-12 mb-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] animate-fade-in">
        <div className="absolute top-[-30%] right-[-10%] w-[450px] h-[450px] bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent rounded-full filter blur-[90px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-cyan-500/5 rounded-full filter blur-[60px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/15 to-purple-500/15 border border-amber-500/30 text-xs font-mono text-amber-300 font-bold mb-5 shadow-lg">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>FOUNDERS-PRIME INTELLIGENCE PORTAL v2026</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-display leading-tight">
              Build More. <span className="bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">Burn Less.</span>
            </h1>
            
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed font-sans">
              Unlock over <strong className="text-white">$500,000</strong> in verified cloud infrastructure credits, SaaS discounts, student edge benefits, and a database of <strong className="text-white font-mono">$10M+ in non-dilutive grants</strong>. Extend runway, validate ideas, and protect equity.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-4 shrink-0">
            <button
              onClick={() => setSubTab("ai-advisor")}
              className="px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 transform hover:scale-[1.02] shadow-[0_10px_30px_rgba(168,85,247,0.3)] cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 animate-spin text-cyan-200" />
              <span>Ask AI Advisor</span>
            </button>
            <button
              onClick={() => setSubTab("subscriptions")}
              className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
            >
              Upgrade Membership
            </button>
          </div>
        </div>

        {/* Live Platform Stats Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-10 border-t border-white/5 font-mono">
          <div className="bg-[#121124]/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Total Savings Hub</span>
            <span className="text-2xl font-black text-[#22d3ee] mt-1">$508,450+</span>
          </div>
          <div className="bg-[#121124]/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Non-Dilutive Grants</span>
            <span className="text-2xl font-black text-amber-400 mt-1">$10.4M</span>
          </div>
          <div className="bg-[#121124]/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Vetted Categories</span>
            <span className="text-2xl font-black text-[#ec4899] mt-1">16 Tracks</span>
          </div>
          <div className="bg-[#121124]/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Membership Status</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 flex items-center gap-1.5 uppercase">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              {activeSubscription}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Success Messages / Floating Notification */}
      {successMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121021] border border-emerald-500/30 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          </div>
          <div>
            <p className="text-xs font-bold">System Confirmation</p>
            <p className="text-[11px] text-gray-400">{successMessage}</p>
          </div>
        </div>
      )}

      {/* 3. Sub Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/5 scrollbar-thin">
        <button
          onClick={() => { setSubTab("catalog"); setActiveArticle(null); }}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-150 cursor-pointer ${
            subTab === "catalog" && !activeArticle
              ? "bg-white text-black shadow-lg"
              : "bg-[#0c0b17] border border-white/5 text-gray-400 hover:text-white"
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Universal Directory</span>
        </button>

        <button
          onClick={() => { setSubTab("ai-advisor"); setActiveArticle(null); }}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-150 cursor-pointer ${
            subTab === "ai-advisor"
              ? "bg-white text-black shadow-lg"
              : "bg-[#0c0b17] border border-white/5 text-gray-400 hover:text-white"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Match Advisor</span>
        </button>

        <button
          onClick={() => { setSubTab("subscriptions"); setActiveArticle(null); }}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-150 cursor-pointer ${
            subTab === "subscriptions"
              ? "bg-white text-black shadow-lg"
              : "bg-[#0c0b17] border border-white/5 text-gray-400 hover:text-white"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>SaaS & Pricing Checkout</span>
        </button>

        <button
          onClick={() => { setSubTab("blog"); }}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-150 cursor-pointer ${
            subTab === "blog"
              ? "bg-white text-black shadow-lg"
              : "bg-[#0c0b17] border border-white/5 text-gray-400 hover:text-white"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Runway Blog CMS</span>
        </button>

        <button
          onClick={() => { setSubTab("admin"); setActiveArticle(null); }}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-150 cursor-pointer ${
            subTab === "admin"
              ? "bg-white text-black shadow-lg"
              : "bg-[#0c0b17] border border-white/5 text-gray-400 hover:text-white"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Admin Controls</span>
        </button>
      </div>

      {/* 4. Sub Tab View Layouts */}

      {/* SUB TAB A: UNIVERSAL CATALOG VIEW */}
      {subTab === "catalog" && (
        <div className="space-y-6 animate-fade-in">
          {/* Controls Panel (Search, suggestions, advanced filters) */}
          <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
            
            {/* Search inputs row */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch justify-between relative">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Instant search cloud credits, grants, saas deals, student edge packages..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchSubmit(searchQuery);
                    }
                  }}
                  className="w-full bg-[#0d0c17] border border-white/10 focus:border-[#22d3ee]/50 rounded-xl py-3.5 pl-12 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
                />
                
                {/* Instant Search Suggestions Panel */}
                {showSuggestions && (
                  <div className="absolute left-0 right-0 mt-2 bg-[#121124] border border-white/10 rounded-xl shadow-2xl z-30 p-2 overflow-hidden max-h-60 scrollbar-thin">
                    <p className="text-[9px] font-bold font-mono tracking-wider text-gray-500 px-3 py-1.5 uppercase">Match suggestions</p>
                    {["AWS", "Y Combinator", "PostHog", "Stripe Atlas", "Google Cloud", "NIDHI Prayas"].map((s) => {
                      if (!s.toLowerCase().includes(searchQuery.toLowerCase())) return null;
                      return (
                        <button
                          key={s}
                          onClick={() => {
                            setSearchQuery(s);
                            handleSearchSubmit(s);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2 cursor-pointer"
                        >
                          <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{s}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveSearch}
                  className="px-4 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-all whitespace-nowrap"
                >
                  <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                  Save Search
                </button>
              </div>
            </div>

            {/* Recent Searches and Saved Searches tag lists */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
              {recentSearches.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-mono text-[10px] uppercase">Recents:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((rec) => (
                      <button
                        key={rec}
                        onClick={() => {
                          setSearchQuery(rec);
                          handleSearchSubmit(rec);
                        }}
                        className="bg-white/5 hover:bg-white/10 text-gray-300 px-2 py-1 rounded-md text-[10px] transition-all font-mono"
                      >
                        {rec}
                      </button>
                    ))}
                    <button 
                      onClick={() => setRecentSearches([])}
                      className="text-rose-400/80 hover:text-rose-400 text-[10px]"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}

              {savedSearches.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-mono text-[10px] uppercase">Saved searches:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {savedSearches.map((sav) => (
                      <div
                        key={sav}
                        className="bg-purple-950/40 border border-purple-500/20 text-purple-300 px-2 py-0.5 rounded-md text-[10px] flex items-center gap-1 font-mono"
                      >
                        <button
                          onClick={() => {
                            setSearchQuery(sav);
                            handleSearchSubmit(sav);
                          }}
                        >
                          {sav}
                        </button>
                        <button 
                          onClick={() => setSavedSearches(savedSearches.filter((s) => s !== sav))}
                          className="hover:text-rose-400"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Multi-Dimensional advanced filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5 text-xs">
              <div>
                <label className="block text-gray-500 text-[10px] font-mono uppercase tracking-wider mb-1.5">Track Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-[#0d0c17] border border-white/10 rounded-xl py-2 px-3 focus:outline-none focus:border-[#a855f7]/50 text-white"
                >
                  <option value="All">All Tracks (16 Categories)</option>
                  {LISTING_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-500 text-[10px] font-mono uppercase tracking-wider mb-1.5">Startup Maturity Stage</label>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="w-full bg-[#0d0c17] border border-white/10 rounded-xl py-2 px-3 focus:outline-none focus:border-[#a855f7]/50 text-white"
                >
                  <option value="All">All Stages</option>
                  <option value="Idea">Idea Phase</option>
                  <option value="Pre-seed">Pre-seed</option>
                  <option value="Seed">Seed backed</option>
                  <option value="Growth">Growth stage</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-500 text-[10px] font-mono uppercase tracking-wider mb-1.5">Region / Location</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-[#0d0c17] border border-white/10 rounded-xl py-2 px-3 focus:outline-none focus:border-[#a855f7]/50 text-white"
                >
                  {uniqueCountries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Directory Listings Grid */}
          <div>
            <div className="flex items-center justify-between mb-5 px-1">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                Showing {filteredListings.length} matching startup listings
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedStage("All");
                    setSelectedCountry("All");
                    setSearchQuery("");
                  }}
                  className="text-rose-400 font-mono text-[10px] hover:underline"
                >
                  Reset filters
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.length > 0 ? (
                filteredListings.map((item) => {
                  const isBookmarked = bookmarks.includes(item.id);
                  const isClaimed = claimedDeals.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className="glass-card rounded-2xl border border-white/5 bg-[#0b0a17]/55 hover:border-white/15 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-200 p-6 flex flex-col justify-between group relative overflow-hidden"
                    >
                      {/* Gradient glow accent */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 filter blur-xl pointer-events-none" />

                      <div>
                        {/* Title Row */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            {/* Logo representation */}
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.logoColor} flex items-center justify-center text-xs font-black text-white shadow-md`}>
                              {item.name.substring(0, 2)}
                            </div>
                            <div>
                              <h3 className="font-bold text-white text-sm tracking-tight">{item.name}</h3>
                              <span className="text-[10px] font-mono text-cyan-400">{item.category}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={(e) => handleToggleBookmark(item.id, e)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                              title={isBookmarked ? "Remove Bookmark" : "Save Deal"}
                            >
                              <Star className={`w-3.5 h-3.5 ${isBookmarked ? "text-amber-400 fill-amber-400" : ""}`} />
                            </button>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-4">{item.description}</p>

                        {/* Metadata row cards */}
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-400 mb-4 bg-black/25 p-2 rounded-xl border border-white/5">
                          <div>
                            <span className="text-gray-600 uppercase block text-[8px]">Value</span>
                            <span className="text-emerald-400 font-bold">{item.value}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 uppercase block text-[8px]">Stage Eligibility</span>
                            <span className="text-gray-300 font-bold">{item.startupStage}</span>
                          </div>
                        </div>

                        {/* Eligibility details */}
                        <div className="text-[11px] text-gray-400 leading-relaxed border-l-2 border-indigo-500/40 pl-2.5 mb-4">
                          <strong className="text-[9px] uppercase tracking-wider font-mono text-indigo-400">Eligibility: </strong>
                          {item.eligibility}
                        </div>
                      </div>

                      {/* CTAs and badges footer */}
                      <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                        <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-amber-500" />
                            <span>{item.deadline}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#22d3ee]" />
                            <span>{item.updateHistory}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={item.applicationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
                          >
                            <span>Claim Details</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={(e) => handleClaimDeal(item.id, e)}
                            className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                              isClaimed
                                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                                : "bg-cyan-500 text-black hover:opacity-95"
                            }`}
                          >
                            {isClaimed ? "Claimed" : "Instant Claim"}
                          </button>
                        </div>
                      </div>

                      {/* Verified Badge */}
                      {item.verificationStatus === "Featured" && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-[8px] font-bold text-black uppercase px-2 py-0.5 rounded-full font-mono shadow">
                          Featured
                        </div>
                      )}
                      {item.verificationStatus === "Verified" && (
                        <div className="absolute top-2 right-2 bg-emerald-500/15 border border-emerald-500/30 text-[8px] font-bold text-emerald-400 uppercase px-2 py-0.5 rounded-full font-mono">
                          ✓ Verified
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="col-span-1 md:col-span-3 py-16 text-center space-y-4">
                  <HelpCircle className="w-12 h-12 text-gray-600 mx-auto stroke-1 animate-bounce" />
                  <h3 className="text-lg font-bold text-white">No Directory Listings Found</h3>
                  <p className="text-xs text-gray-400 max-w-md mx-auto">No startup perks matched your specific combination of tracks, stages, or countries. Try clearing the query filter to reset matches.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB B: AI ADVISOR MATCHING HUB */}
      {subTab === "ai-advisor" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
          
          {/* Left panel: advisor matcher inputs */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 sm:p-8 border border-white/5 bg-[#0d0c18]/50 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#22d3ee] font-mono font-bold bg-[#22d3ee]/10 px-2.5 py-1 rounded-full border border-[#22d3ee]/20">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#22d3ee]" />
                Interactive Advisor
              </div>
              <h2 className="text-xl font-bold text-white">Runway Extension Matcher</h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Provide details about your venture and goals, and our AI advisor will synthesize a custom program and SaaS credits rollout playbook matching your stage.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-[10px] font-mono uppercase tracking-wider mb-1.5">Development Stage</label>
                <select
                  value={advisorStage}
                  onChange={(e) => setAdvisorStage(e.target.value)}
                  className="w-full bg-[#080712] border border-white/10 rounded-xl py-3 px-3 text-xs focus:outline-none focus:border-[#22d3ee]/50 text-white"
                >
                  <option value="Idea Phase / Unincorporated">Idea Phase / Unincorporated</option>
                  <option value="Pre-seed / Bootstrapping">Pre-seed / Bootstrapping</option>
                  <option value="Seed Stage Backed">Seed Stage Backed</option>
                  <option value="Growth & Series-A Scale">Growth & Series-A Scale</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-[10px] font-mono uppercase tracking-wider mb-1.5">Primary Target Location</label>
                <select
                  value={advisorLocation}
                  onChange={(e) => setAdvisorLocation(e.target.value)}
                  className="w-full bg-[#080712] border border-white/10 rounded-xl py-3 px-3 text-xs focus:outline-none focus:border-[#22d3ee]/50 text-white"
                >
                  <option value="Global">Global / remote first</option>
                  <option value="United States">United States (Delaware Corp)</option>
                  <option value="India">India (DPIIT Registered)</option>
                  <option value="United Kingdom / Europe">United Kingdom / Europe</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-[10px] font-mono uppercase tracking-wider mb-1.5">Industry Verticals</label>
                <input
                  type="text"
                  value={advisorIndustry}
                  onChange={(e) => setAdvisorIndustry(e.target.value)}
                  placeholder="e.g. Generative AI, SaaS, HealthTech, IoT"
                  className="w-full bg-[#080712] border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#22d3ee]/50 text-white placeholder-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-[10px] font-mono uppercase tracking-wider mb-1.5">Core Operational Goal or Bottleneck</label>
                <textarea
                  rows={3}
                  value={advisorGoals}
                  onChange={(e) => setAdvisorGoals(e.target.value)}
                  placeholder="e.g. Save infrastructure costs, claims early marketing support, find government R&D grants..."
                  className="w-full bg-[#080712] border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#22d3ee]/50 text-white placeholder-gray-600 leading-relaxed resize-none"
                />
              </div>

              <button
                onClick={generateAIPlaybook}
                disabled={isMatchingLoading}
                className="w-full py-3.5 bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#ec4899] hover:opacity-95 text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isMatchingLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Analyzing Directory matches...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black animate-pulse" />
                    <span>Generate AI Credits Playbook</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right panel: results */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            {advisorResult ? (
              <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 bg-gradient-to-r from-[#121123]/30 via-slate-950/60 to-purple-950/20 shadow-2xl space-y-6 animate-fade-in">
                
                {/* Custom profile pill */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400 animate-bounce" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">My Smart Credits Strategy Plan</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">Ready</span>
                </div>

                <div className="space-y-4">
                  {/* Summary Block */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider mb-1.5">Profile Syntheses Match</h3>
                    <p className="text-sm font-semibold text-white leading-relaxed">{advisorResult.summary}</p>
                  </div>

                  {/* Top recommended tracks */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider mb-2">Recommended Runway Tactics</h3>
                    <div className="space-y-2">
                      {advisorResult.strategies.map((strat, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-black/35 p-3 rounded-xl border border-white/5 text-xs text-gray-300">
                          <div className="w-5 h-5 rounded-full bg-[#22d3ee]/10 text-[#22d3ee] flex items-center justify-center font-bold text-[10px] shrink-0 border border-[#22d3ee]/20">
                            {idx + 1}
                          </div>
                          <span className="leading-relaxed">{strat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Month timeline rollup */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider mb-2">Paced Timeline Playbook</h3>
                    <div className="space-y-2">
                      {advisorResult.timelinePlaybook.map((play, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-[#a855f7]/5 border border-[#a855f7]/10 p-3.5 rounded-xl text-xs text-gray-300">
                          <Calendar className="w-4 h-4 text-[#a855f7] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{play}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Targeted Advice */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider mb-1.5">Ecosystem Mentor Advice</h3>
                    <div className="bg-[#10b981]/5 border border-[#10b981]/20 p-4 rounded-xl text-xs text-emerald-400 leading-relaxed font-sans">
                      {advisorResult.targetedAdvice}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                  <span>Processed via Gemini 3.5 Flash</span>
                  <button
                    onClick={() => {
                      setAdvisorResult(null);
                      setAdvisorGoals("");
                    }}
                    className="text-cyan-400 hover:underline"
                  >
                    Reset advisor matcher
                  </button>
                </div>

              </div>
            ) : isMatchingLoading ? (
              <div className="glass-card rounded-2xl p-12 border border-white/5 bg-[#0d0c18]/50 flex flex-col items-center justify-center space-y-6 text-center h-full min-h-[350px]">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-2 border-t-[#22d3ee] border-r-transparent border-b-[#a855f7] border-l-transparent animate-spin" />
                  <div className="absolute top-2 left-2 right-2 bottom-2 rounded-full border border-t-[#ec4899] border-r-transparent border-b-[#22d3ee] border-l-transparent animate-spin duration-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Synthesizing Startup Capital Match...</h3>
                  <p className="text-[11px] text-gray-400 mt-1 max-w-sm">Comparing listing tags, stage thresholds, and eligibility guidelines against 16 core tracks.</p>
                </div>
                <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full animate-pulse w-2/3" />
                </div>
                <p className="text-[10px] text-gray-500 italic">"Stacking credits correctly expands bootstrapper runway by an average of 18 months."</p>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-12 border border-white/5 bg-[#0d0c18]/50 flex flex-col items-center justify-center space-y-4 text-center h-full min-h-[350px]">
                <Sparkles className="w-12 h-12 text-[#a855f7] stroke-1 animate-pulse" />
                <h3 className="text-sm font-bold text-white">Playbook Ready to Generate</h3>
                <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                  Fill in your startup sector goals on the left panel. The AI recommendations engine will create a strongly formatted, verified pacing blueprint mapping cloud credits, non-dilutive grant tracks, and SaaS discount triggers.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setAdvisorStage("Pre-seed / Bootstrapping");
                      setAdvisorLocation("India");
                      setAdvisorIndustry("AI-Driven FinTech Agents");
                      setAdvisorGoals("Claim API credits and apply to seed incubators/grants.");
                      triggerNotification("Loaded example criteria.");
                    }}
                    className="text-[10px] font-mono text-cyan-400 hover:underline"
                  >
                    Load India FinTech Example
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB TAB C: MONETIZATION SUBSCRIPTION CHECKOUT & REFERRAL */}
      {subTab === "subscriptions" && (
        <div className="space-y-12 animate-fade-in">
          
          {/* Plan Comparison Grid */}
          <div>
            <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
              <h2 className="text-2xl font-bold text-white font-display">Premium Founders Membership</h2>
              <p className="text-xs text-gray-400">
                Unlock instant claiming privileges for premium cloud networks, our complete grant monitoring dashboard, and unlimited matching advisor blueprints.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {SUBSCRIPTION_PLANS.map((plan) => {
                const isCurrent = activeSubscription === plan.name;
                const isSelected = selectedPlan.id === plan.id;
                return (
                  <div
                    key={plan.id}
                    className={`glass-card rounded-2xl p-5 border flex flex-col justify-between transition-all duration-150 ${plan.color} ${
                      isSelected ? "ring-2 ring-cyan-400 bg-white/[0.02]" : "hover:scale-[1.01]"
                    }`}
                  >
                    <div>
                      {plan.badge && (
                        <span className="inline-block bg-white/5 text-[9px] font-bold font-mono text-gray-300 px-2.5 py-0.5 rounded-full mb-3 uppercase tracking-wider">
                          {plan.badge}
                        </span>
                      )}
                      
                      <h3 className="text-sm font-bold text-white tracking-tight">{plan.name}</h3>
                      <p className="text-2xl font-black font-mono text-white mt-2">{plan.price}</p>
                      <span className="text-[10px] text-gray-500 font-mono block mb-4">{plan.billing}</span>

                      <div className="space-y-2.5 border-t border-white/5 pt-4">
                        {plan.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px] text-gray-400 leading-normal">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => {
                          setSelectedPlan(plan);
                          setDiscountApplied(false);
                          setInvoice(null);
                        }}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                          isCurrent
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                            : isSelected
                            ? "bg-cyan-500 text-black font-extrabold"
                            : "bg-white/5 hover:bg-white/10 text-white"
                        }`}
                      >
                        {isCurrent ? "Active Plan" : isSelected ? "Selected" : "Select Plan"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Secure Checkout and Invoice Simulation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-white/5">
            
            {/* Secure Checkout form */}
            <div className="lg:col-span-6 glass-card rounded-2xl p-6 sm:p-8 border border-white/5 bg-[#0d0c18]/50 space-y-6">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base">Secure Gateway Checkout</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <p className="text-gray-400">Selected Membership Tier:</p>
                    <p className="font-bold text-white text-sm mt-0.5">{selectedPlan.name} Plan</p>
                  </div>
                  <div className="text-right font-mono">
                    <p className="text-gray-500">Base Price</p>
                    <p className="font-bold text-white text-sm mt-0.5">{selectedPlan.price}</p>
                  </div>
                </div>

                {/* Coupon Code support */}
                <div>
                  <label className="block text-gray-400 text-[10px] font-mono uppercase tracking-wider mb-1.5">Apply Partner Coupon / Referral Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. SURESH50 or LAUNCH20"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-[#080712] border border-white/10 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-cyan-500 text-white font-mono uppercase"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white font-bold transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-rose-400 text-[10px] mt-1.5 font-mono">{couponError}</p>}
                  <p className="text-[9px] text-gray-500 mt-1.5">💡 Try using custom promotional coupon code <strong className="text-cyan-400 font-mono">SURESH50</strong> for 50% discount.</p>
                </div>

                {/* Computed pricing summary */}
                <div className="space-y-2 border-t border-white/5 pt-4 text-xs font-mono text-gray-400">
                  <div className="flex items-center justify-between">
                    <span>Base Tier Total</span>
                    <span>{selectedPlan.price}</span>
                  </div>
                  {discountApplied && (
                    <div className="flex items-center justify-between text-emerald-400">
                      <span>Discount Applied ({discountPercent}%)</span>
                      <span>-${(parseFloat(selectedPlan.price.replace("$", "")) * discountPercent) / 100}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-white/5 pt-2 font-bold text-white text-sm">
                    <span>Grand Total Due</span>
                    <span>
                      ${parseFloat(selectedPlan.price.replace("$", "")) - (discountApplied ? (parseFloat(selectedPlan.price.replace("$", "")) * discountPercent) / 100 : 0)}
                    </span>
                  </div>
                </div>

                {/* Execute Secure Pay */}
                <button
                  onClick={executeMockCheckout}
                  disabled={isCheckingOut || selectedPlan.name === "Free"}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-lg transition-all disabled:opacity-40"
                >
                  {isCheckingOut ? (
                    <span className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Verifying billing node...</span>
                    </span>
                  ) : (
                    <span>Confirm Stripe Pay Securely</span>
                  )}
                </button>
              </div>
            </div>

            {/* Simulated Invoice output */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              {invoice ? (
                <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 bg-emerald-950/5 shadow-2xl space-y-4 font-mono text-xs text-gray-300 animate-fade-in relative overflow-hidden">
                  
                  {/* Visual overlay */}
                  <div className="absolute top-2 right-2 rotate-12 opacity-10 text-emerald-400 font-black text-2xl">PAID</div>

                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>INVOICE GENERATED</span>
                    </div>
                    <span className="text-[10px] text-gray-500">{invoice.id}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Transaction Date:</span>
                      <span className="text-white font-bold">{invoice.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Membership Tier:</span>
                      <span className="text-[#22d3ee] font-bold">{invoice.planName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Invoice Status:</span>
                      <span className="text-emerald-400 font-bold bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded text-[10px] uppercase">Paid in Full</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Promo Applied:</span>
                      <span className="text-white font-bold uppercase">{invoice.coupon}</span>
                    </div>

                    <div className="space-y-1.5 border-t border-white/5 pt-3 mt-3 text-gray-400">
                      <div className="flex items-center justify-between text-[11px]">
                        <span>List price standard:</span>
                        <span>${invoice.origPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-emerald-400 font-bold text-sm border-t border-white/5 pt-2">
                        <span>Total charged:</span>
                        <span>${invoice.finalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[9px] text-gray-500 leading-normal mt-4 text-center">
                    Thank you for subscribing! Your invoice details and transaction ledger have been logged securely. Claiming codes are now fully active.
                  </p>
                </div>
              ) : (
                <div className="glass-card rounded-2xl p-8 border border-white/5 bg-[#0d0c18]/50 text-center flex flex-col items-center justify-center space-y-4 h-full min-h-[300px]">
                  <CreditCard className="w-12 h-12 text-gray-600 stroke-1" />
                  <h3 className="text-sm font-bold text-white font-mono">Invoice Ledger Idle</h3>
                  <p className="text-xs text-gray-400 max-w-sm">
                    Complete your membership subscription payment using the secure checkout panel on the left to instantly generate a persistent invoice.
                  </p>
                </div>
              )}

              {/* Affiliate & Referral tracker card */}
              <div className="bg-[#121124] border border-white/5 rounded-2xl p-5 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                <div>
                  <p className="text-gray-500 text-[9px] uppercase">My Custom Referral Hook</p>
                  <p className="font-bold text-white text-sm mt-0.5">{referralCode}</p>
                  <p className="text-gray-400 text-[10px] mt-1">Share this with co-founders to claim 15% affiliate commissions.</p>
                </div>

                <div className="text-right shrink-0 bg-black/40 p-3 rounded-xl border border-white/5">
                  <p className="text-gray-500 text-[9px] uppercase">Tracked Earnings</p>
                  <p className="text-emerald-400 font-black text-sm mt-0.5">${commissionTracked.toFixed(2)}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUB TAB D: PREMIUM BLOG CMS */}
      {subTab === "blog" && (
        <div className="animate-fade-in space-y-8">
          
          {activeArticle ? (
            /* FULL ARTICLE READ VIEW */
            <div className="relative">
              {/* Reading progress tracker bar */}
              <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
                <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" style={{ width: `${blogScrollPercent}%` }} />
              </div>

              <button
                onClick={() => {
                  setActiveArticle(null);
                  setBlogScrollPercent(0);
                }}
                className="mb-6 text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono cursor-pointer"
              >
                ← Back to Blog CMS listings
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Article content block */}
                <div 
                  ref={articleContainerRef}
                  className="lg:col-span-8 glass-card rounded-2xl p-6 sm:p-10 border border-white/5 bg-[#0d0c18]/60 max-h-[700px] overflow-y-auto space-y-6"
                >
                  <div className="space-y-3">
                    <span className="bg-purple-500/15 text-purple-300 text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border border-purple-500/20">
                      {activeArticle.category}
                    </span>
                    <h2 className="text-xl sm:text-3xl font-bold text-white font-display leading-tight">{activeArticle.title}</h2>
                    
                    <div className="flex items-center gap-3 pt-3 text-xs text-gray-400 font-mono">
                      <img src={activeArticle.author.avatar} alt="Author" className="w-8 h-8 rounded-full border border-white/10" referrerPolicy="no-referrer" />
                      <div>
                        <p className="text-white font-bold">{activeArticle.author.name}</p>
                        <p className="text-gray-500 text-[10px]">{activeArticle.author.role}</p>
                      </div>
                      <span className="mx-2">•</span>
                      <span>{activeArticle.publishedAt}</span>
                      <span className="mx-2">•</span>
                      <span>{activeArticle.readTime}</span>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-6 text-xs text-gray-300 leading-relaxed space-y-4 font-sans markdown-body">
                    {/* Render basic custom structured parser for mock markdown articles */}
                    <div className="whitespace-pre-wrap">{activeArticle.content}</div>
                  </div>

                  {/* Comments section */}
                  <div className="border-t border-white/5 pt-8 mt-10 space-y-6 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#ec4899]" />
                      <h3 className="font-bold text-white text-sm">Community Discussion ({blogComments[activeArticle.id]?.length || 0})</h3>
                    </div>

                    <div className="space-y-3">
                      {(blogComments[activeArticle.id] || []).map((comm, idx) => (
                        <div key={idx} className="bg-black/35 p-3.5 rounded-xl border border-white/5 space-y-1">
                          <div className="flex items-center justify-between text-gray-500 text-[10px]">
                            <span className="font-bold text-white">{comm.author}</span>
                            <span>{comm.date}</span>
                          </div>
                          <p className="text-gray-300 font-sans text-xs leading-relaxed">{comm.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Post comments form */}
                    <div className="bg-[#121124]/40 p-4 rounded-xl border border-white/5 space-y-3">
                      <p className="text-gray-400 text-[10px] uppercase font-bold">Post a comment</p>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={newCommentName}
                          onChange={(e) => setNewCommentName(e.target.value)}
                          className="bg-black/40 border border-white/10 rounded-lg p-2 text-xs focus:outline-none focus:border-cyan-500 text-white"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Join the co-founder debate..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs focus:outline-none focus:border-cyan-500 text-white leading-relaxed resize-none font-sans"
                      />
                      <button
                        onClick={() => handleAddComment(activeArticle.id)}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg font-bold text-white hover:opacity-90 transition-all text-[11px] cursor-pointer"
                      >
                        Submit Comment
                      </button>
                    </div>
                  </div>

                </div>

                {/* Side widgets: related articles */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="glass-card rounded-2xl p-5 border border-white/5 bg-[#0d0c18]/50 space-y-4">
                    <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-gray-400">Related CMS publications</h3>
                    <div className="space-y-3">
                      {BLOG_ARTICLES.filter((art) => art.id !== activeArticle.id).map((art) => (
                        <button
                          key={art.id}
                          onClick={() => {
                            setActiveArticle(art);
                            setBlogScrollPercent(0);
                          }}
                          className="w-full text-left bg-black/25 hover:bg-black/45 p-3 rounded-xl border border-white/5 transition-all flex flex-col gap-1.5 cursor-pointer"
                        >
                          <span className="text-[9px] font-mono text-[#a855f7] uppercase">{art.category}</span>
                          <span className="text-xs font-bold text-white line-clamp-1">{art.title}</span>
                          <span className="text-[10px] text-gray-500 font-mono">{art.publishedAt}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#121124] border border-white/5 rounded-2xl p-5 text-xs text-gray-400 leading-normal space-y-3">
                    <p className="font-bold text-white font-mono uppercase text-[10px]">CMS SEO Information</p>
                    <p>This post is indexed under search filters for Google, Bing, and major venture capital aggregators automatically.</p>
                    <div className="flex flex-wrap gap-1">
                      {activeArticle.tags.map((tag) => (
                        <span key={tag} className="bg-white/5 text-gray-400 px-2 py-0.5 rounded text-[9px] font-mono">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* CMS FEED HOMEPAGE VIEW */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* CMS articles main block */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Premium Runway CMS Articles</span>
                  <span className="text-xs font-mono text-gray-500">{BLOG_ARTICLES.length} posts total</span>
                </div>

                <div className="space-y-6">
                  {BLOG_ARTICLES.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => setActiveArticle(art)}
                      className="glass-card rounded-2xl p-6 border border-white/5 bg-[#0b0a17]/55 hover:border-white/10 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-all cursor-pointer flex flex-col md:flex-row justify-between gap-6"
                    >
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#a855f7]/15 text-[#a855f7] text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border border-[#a855f7]/25">
                            {art.category}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono">{art.publishedAt}</span>
                        </div>

                        <h3 className="font-bold text-white text-lg tracking-tight hover:text-cyan-400 transition-colors leading-tight">
                          {art.title}
                        </h3>

                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                          {art.excerpt}
                        </p>

                        <div className="flex items-center gap-2.5 pt-2 text-[10px] text-gray-500 font-mono">
                          <img src={art.author.avatar} alt="Avatar" className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
                          <span>By {art.author.name}</span>
                          <span>•</span>
                          <span>{art.readTime}</span>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center justify-end">
                        <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white transition-all">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar: trending searches / newsletters */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* CMS newsletter signup */}
                <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#0d0c18]/50 space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ec4899]/10 border border-[#ec4899]/20 flex items-center justify-center text-xl">
                    📧
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Weekly Founders Newsletter</h3>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">Join 50k+ bootstrappers receiving verified discount alerts directly in their inbox every Friday.</p>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="founder@venture.io"
                      className="w-full bg-[#080712] border border-white/10 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-[#ec4899]/50 text-white font-mono"
                    />
                    <button
                      onClick={() => triggerNotification("Subscribed successfully! Welcome onboard.")}
                      className="w-full py-2 bg-[#ec4899] hover:bg-opacity-95 text-white font-bold text-xs rounded-lg transition-all cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>

                {/* Popular tags row */}
                <div className="bg-[#121124] border border-white/5 rounded-2xl p-5 text-xs text-gray-400 space-y-3">
                  <p className="font-bold text-white font-mono uppercase text-[10px]">Trending Categories</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Runway Extension", "Bootstrapping", "Government Grants", "AI Token API", "Pre-seed Vetting"].map((tag) => (
                      <span key={tag} className="bg-white/5 text-gray-300 px-2.5 py-1 rounded text-[10px] font-mono font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

      {/* SUB TAB E: ADVANCED ADMIN DASHBOARD VIEW */}
      {subTab === "admin" && (
        <div className="space-y-8 animate-fade-in font-mono text-xs text-gray-300">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-400 animate-spin-slow" />
                <span>FoundersPrime Operations Console</span>
              </h2>
              <p className="text-[11px] text-gray-500 mt-0.5">Control panel for deal moderation, users, coupon logs, and blog publishing.</p>
            </div>
            
            <div className="bg-[#121124] border border-[#a855f7]/30 px-3 py-1.5 rounded-xl flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-[#a855f7] text-[10px]">Super Admin Active</span>
            </div>
          </div>

          {/* Admin metric analytics panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0b0a17] border border-white/5 p-4 rounded-xl space-y-1">
              <span className="text-[9px] text-gray-500 uppercase tracking-wider block">Deal Claims Checked</span>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">412 Claims</span>
                <span className="text-emerald-400 text-[10px] font-bold">✓ 99.4% Valid</span>
              </div>
            </div>

            <div className="bg-[#0b0a17] border border-white/5 p-4 rounded-xl space-y-1">
              <span className="text-[9px] text-gray-500 uppercase tracking-wider block">Vetted Directory Size</span>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">{adminDeals.length} active</span>
                <span className="text-cyan-400 text-[10px] font-bold">16 Categories</span>
              </div>
            </div>

            <div className="bg-[#0b0a17] border border-white/5 p-4 rounded-xl space-y-1">
              <span className="text-[9px] text-gray-500 uppercase tracking-wider block">Submission Queue</span>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">{pendingQueue.length} pending</span>
                <span className="text-amber-500 text-[10px] font-bold">Verification alert</span>
              </div>
            </div>

            <div className="bg-[#0b0a17] border border-white/5 p-4 rounded-xl space-y-1">
              <span className="text-[9px] text-gray-500 uppercase tracking-wider block">Simulated MRR Tracker</span>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-[#ec4899]">$1,284.00</span>
                <span className="text-gray-500 text-[10px] font-bold">Q3 2026 Target</span>
              </div>
            </div>
          </div>

          {/* Double-column grid for sections */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Column 1: Deal Verification Queue & Blog CMS Publishing */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Box 1: Pending Deal Verification Queue */}
              <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#0d0c18]/50 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <h3 className="font-bold text-white text-xs uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                    <span>Deal Submission Queue ({pendingQueue.length})</span>
                  </h3>
                  <span className="text-[9px] text-gray-500 uppercase">Awaiting audit</span>
                </div>

                <div className="space-y-3">
                  {pendingQueue.length > 0 ? (
                    pendingQueue.map((item) => (
                      <div key={item.id} className="bg-black/40 border border-white/5 p-4 rounded-xl space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider block">{item.category}</span>
                            <span className="text-xs font-bold text-white">{item.name}</span>
                          </div>
                          <span className="text-emerald-400 font-bold bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded text-[9px]">{item.value}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-normal font-sans">{item.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-[9px] text-gray-500 border-t border-white/5 pt-2 mt-2">
                          <div>Eligibility: <strong className="text-white">{item.eligibility}</strong></div>
                          <div>Maturity Stage: <strong className="text-white">{item.startupStage}</strong></div>
                        </div>

                        <div className="flex gap-2 justify-end pt-2">
                          <button
                            onClick={() => handleRejectPending(item.id)}
                            className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 font-bold rounded-lg transition-all"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleApprovePending(item)}
                            className="px-3 py-1.5 bg-emerald-500 hover:opacity-95 text-black font-black rounded-lg transition-all"
                          >
                            Approve Live
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500 text-center py-6">Verification queue is clean. No pending user submissions.</p>
                  )}
                </div>
              </div>

              {/* Box 2: Markdown Blog CMS Publishing Editor */}
              <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#0d0c18]/50 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <h3 className="font-bold text-white text-xs uppercase tracking-widest">Publish New CMS Article</h3>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-500 text-[9px] uppercase mb-1">Article Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Navigating YC application forms"
                        value={newBlogTitle}
                        onChange={(e) => setNewBlogTitle(e.target.value)}
                        className="w-full bg-[#080712] border border-white/10 rounded-lg p-2.5 text-xs focus:outline-none focus:border-purple-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 text-[9px] uppercase mb-1">Category Domain</label>
                      <select
                        value={newBlogCategory}
                        onChange={(e) => setNewBlogCategory(e.target.value)}
                        className="w-full bg-[#080712] border border-white/10 rounded-lg p-2.5 text-xs focus:outline-none focus:border-purple-500 text-white"
                      >
                        <option value="Runway Extension">Runway Extension</option>
                        <option value="Funding Strategies">Funding Strategies</option>
                        <option value="Founder Resource">Founder Resource</option>
                        <option value="Indie Growth">Indie Growth</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-500 text-[9px] uppercase mb-1">Excerpt / Brief Summary</label>
                    <input
                      type="text"
                      placeholder="Short catchy hook summary..."
                      value={newBlogExcerpt}
                      onChange={(e) => setNewBlogExcerpt(e.target.value)}
                      className="w-full bg-[#080712] border border-white/10 rounded-lg p-2.5 text-xs focus:outline-none focus:border-purple-500 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 text-[9px] uppercase mb-1">Article Body Content (Markdown Supported)</label>
                    <textarea
                      rows={4}
                      placeholder="### Header title... use clear bullet lists or markdown-style syntax."
                      value={newBlogContent}
                      onChange={(e) => setNewBlogContent(e.target.value)}
                      className="w-full bg-[#080712] border border-white/10 rounded-lg p-2.5 text-xs focus:outline-none focus:border-purple-500 text-white leading-relaxed resize-none font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-500 text-[9px] uppercase mb-1">Tags (Comma separated)</label>
                      <input
                        type="text"
                        placeholder="e.g. startup, safe, vc"
                        value={newBlogTags}
                        onChange={(e) => setNewBlogTags(e.target.value)}
                        className="w-full bg-[#080712] border border-white/10 rounded-lg p-2.5 text-xs focus:outline-none focus:border-purple-500 text-white"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={handlePublishBlog}
                        className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-95 text-white font-bold rounded-lg transition-all cursor-pointer"
                      >
                        Publish Live Feed
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Column 2: User Role Management & Active Coupons list */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Box 3: User Role Management Panel */}
              <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#0d0c18]/50 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-bold text-white text-xs uppercase tracking-widest">Active User Accounts ({adminUsers.length})</h3>
                </div>

                <div className="space-y-3">
                  {adminUsers.map((user) => (
                    <div key={user.id} className="bg-black/30 p-3 rounded-xl border border-white/5 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-bold text-white text-xs truncate max-w-[140px]">{user.name}</p>
                        <p className="text-[10px] text-gray-500 truncate max-w-[140px]">{user.email}</p>
                        <span className="text-[9px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded mt-1 inline-block font-bold">
                          Sub: {user.subscription}
                        </span>
                      </div>

                      <div className="text-right">
                        <select
                          value={user.role}
                          onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                          className="bg-[#080712] border border-white/10 rounded-lg py-1 px-2 focus:outline-none focus:border-cyan-500 text-white text-[10px]"
                        >
                          <option value="Member">Member</option>
                          <option value="Founder">Founder</option>
                          <option value="Super Admin">Super Admin</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 4: Active Referral commissions and Coupons directory */}
              <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#0d0c18]/50 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                  <Gift className="w-4 h-4 text-rose-400" />
                  <h3 className="font-bold text-white text-xs uppercase tracking-widest">Commission Logs</h3>
                </div>

                <div className="space-y-3 font-mono text-[11px] leading-relaxed">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Total active discount referrals:</span>
                    <span className="font-bold text-white">4 active</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Active promo codes list:</span>
                    <span className="font-bold text-[#ec4899]">SURESH50, LAUNCH20</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Conversion Rate (Click to Claim):</span>
                    <span className="font-bold text-emerald-400">14.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Latest checkout check:</span>
                    <span className="font-bold text-[#22d3ee]">Stripe Simulation OK</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
