import React, { useState } from "react";
import { 
  Search, HelpCircle, Mail, MessageSquare, Phone, ArrowRight, 
  ChevronDown, ChevronUp, FileText, Sparkles, CheckCircle2, 
  LifeBuoy, BookOpen, Compass, Info, Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./ThemeProvider";

interface FAQItem {
  id: string;
  category: "prep" | "roadmaps" | "platform" | "general";
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "faq-1",
    category: "prep",
    question: "How do I start preparing for the TCS NQT?",
    answer: "You can use our dedicated TCS NQT Cockpit. Go to the main dashboard or your study planner and select TCS NQT Prep. This view contains comprehensive practice questions, quant aptitude tips, and customized mock interviews tailored specifically to TCS patterns."
  },
  {
    id: "faq-2",
    category: "prep",
    question: "Is the AI Mock Interview system really 100% free?",
    answer: "Yes, absolutely! NextRoundPrep is committed to providing free educational access. You can conduct unlimited mock interviews with our server-side AI simulator, receive structural analysis on your answers, get evaluated on the STAR method, and view personalized improvement suggestions without paying anything."
  },
  {
    id: "faq-3",
    category: "roadmaps",
    question: "How do I earn XP and Level up my profile?",
    answer: "You earn 100 XP automatically for every study step or milestone you complete on your active curriculum roadmap. Additionally, completing a full mock interview session awards you 250 XP. Your accumulated points sync dynamically with your user navigation bar and profile modal!"
  },
  {
    id: "faq-4",
    category: "roadmaps",
    question: "How do I build and customize a career study roadmap?",
    answer: "Navigate to the 'Developer Roadmaps' section, browse the available learning paths (Frontend, Backend, Fullstack, mobile, etc.), and select a path to generate an interactive milestone tracker. Once generated, you can check off completed tasks and view links to recommended free books and tutorials."
  },
  {
    id: "faq-5",
    category: "platform",
    question: "What is StudentOS and how do I use it?",
    answer: "StudentOS is our specialized student productivity workspace. It features offline-first interactive planners, grade trackers, notes-taking pads, and task checklists. It is designed to run locally in your browser, keeping your daily planning data safe and secure."
  },
  {
    id: "faq-6",
    category: "platform",
    question: "Does the platform save my interview history locally?",
    answer: "Yes! To respect your data privacy, your entire mock interview history, grades, and completed transcripts are stored directly in your browser's localStorage. You can review your historical performance, read previous transcripts, or delete history entries at any time."
  },
  {
    id: "faq-7",
    category: "general",
    question: "Who is Suresh and what is the Learn with Suresh ecosystem?",
    answer: "Suresh Nagidi is our founder, a passionate developer and mentor who built NextRoundPrep as a non-profit open-education initiative. The Suresh Ecosystem provides free textbooks, daily formula reviews, physics guides, and an AI Study Advisor to make high-quality test prep accessible to every student in India."
  }
];

export default function HelpCenterView() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "prep" | "roadmaps" | "platform" | "general">("all");
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleToggleFaq = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formName.trim() || !formEmail.trim() || !formSubject.trim() || !formMessage.trim()) {
      setFormError("Please fill in all fields before submitting.");
      return;
    }

    if (!formEmail.includes("@") || formEmail.length < 5) {
      setFormError("Please enter a valid email address.");
      return;
    }

    // Success simulation
    setFormSubmitted(true);
    
    // Clear fields
    setTimeout(() => {
      setFormName("");
      setFormEmail("");
      setFormSubject("");
      setFormMessage("");
    }, 100);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12 min-h-screen">
      {/* 1. Header Banner */}
      <div className={`relative rounded-3xl p-8 md:p-12 border overflow-hidden shadow-2xl ${
        theme === "light"
          ? "bg-gradient-to-r from-purple-50 via-indigo-50 to-white border-slate-200/80"
          : "bg-gradient-to-r from-purple-950/25 via-slate-900/40 to-[#0a0a14] border-white/5"
      }`}>
        <div className="absolute right-4 bottom-0 opacity-10 pointer-events-none">
          <LifeBuoy className="w-48 h-48 text-purple-500 animate-[spin_40s_linear_infinite]" />
        </div>
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Support & Knowledge Base</span>
          </div>
          <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight font-display ${
            theme === "light" ? "text-slate-900" : "text-white"
          }`}>
            How can we help you succeed?
          </h1>
          <p className={`text-sm md:text-base leading-relaxed ${
            theme === "light" ? "text-slate-600" : "text-gray-300"
          }`}>
            Find instant guides on TCS placement preparation, customized learning roadmaps, gamification points, and technical articles curated by the NextRound team.
          </p>

          {/* Search bar inside header */}
          <div className="relative max-w-lg mt-6">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </span>
            <input
              type="text"
              placeholder="Search support articles, FAQs, and placement advice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-11 pr-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 transition-all ${
                theme === "light"
                  ? "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:ring-purple-500/20 focus:border-purple-500"
                  : "bg-black/45 border-white/10 text-white placeholder-gray-500 focus:ring-purple-500/30 focus:border-purple-500"
              }`}
            />
          </div>
        </div>
      </div>

      {/* 2. Grid for Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: FAQ section (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
            <h2 className={`text-xl font-bold tracking-tight font-display ${
              theme === "light" ? "text-slate-800" : "text-white"
            }`}>
              Frequently Asked Questions
            </h2>

            {/* Quick Stats badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-mono font-medium ${
              theme === "light"
                ? "border-slate-200 bg-slate-50 text-slate-600"
                : "border-white/5 bg-white/[0.02] text-gray-400"
            }`}>
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span>{filteredFaqs.length} Articles available</span>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Topics" },
              { id: "prep", label: "TCS & Placement Prep" },
              { id: "roadmaps", label: "Learning Roadmaps" },
              { id: "platform", label: "Platform & Local Storage" },
              { id: "general", label: "General & Suresh Mode" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedCategory(tab.id as any);
                  setExpandedFaqId(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/10"
                    : theme === "light"
                      ? "bg-slate-100 hover:bg-slate-200 text-slate-600"
                      : "bg-white/5 hover:bg-white/10 text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Accordion FAQ List */}
          <div className="space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isExpanded = expandedFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-200 ${
                      theme === "light"
                        ? "bg-white border-slate-200/80 hover:border-slate-300"
                        : "bg-[#0c0c16]/70 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <button
                      onClick={() => handleToggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                    >
                      <span className={`text-sm font-semibold tracking-tight ${
                        theme === "light" ? "text-slate-800" : "text-white"
                      }`}>
                        {faq.question}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-purple-400 shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500 shrink-0 ml-4" />
                      )}
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className={`p-5 pt-0 text-xs sm:text-sm leading-relaxed border-t ${
                            theme === "light" 
                              ? "text-slate-600 border-slate-100 bg-slate-50/50" 
                              : "text-gray-300 border-white/5 bg-white/[0.01]"
                          }`}>
                            <p>{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className={`text-center py-12 rounded-2xl border border-dashed ${
                theme === "light" ? "border-slate-200" : "border-white/5"
              }`}>
                <Info className="w-8 h-8 text-gray-500 mx-auto mb-3" />
                <p className="text-sm font-bold text-gray-400">No results found for "{searchQuery}"</p>
                <p className="text-xs text-gray-500 mt-1">Try expanding your search query or selecting another category.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Form & Contact Info (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Contact Cards */}
          <div className={`rounded-2xl border p-5 space-y-4 ${
            theme === "light" ? "bg-slate-50 border-slate-200" : "bg-[#0e0e1a]/85 border-white/5"
          }`}>
            <h3 className={`text-sm font-bold uppercase tracking-wider font-mono ${
              theme === "light" ? "text-slate-900" : "text-white"
            }`}>
              Direct Assistance
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <a 
                href="mailto:support@nextroundprep.org" 
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  theme === "light" 
                    ? "bg-white border-slate-200 hover:border-purple-300 text-slate-700 hover:text-purple-600" 
                    : "bg-black/30 border-white/5 hover:border-purple-500/20 text-gray-300 hover:text-purple-400"
                }`}
              >
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <div className="truncate">
                  <span className="block font-semibold">Email support</span>
                  <span className="text-[11px] text-gray-500">support@nextroundprep.org</span>
                </div>
              </a>

              <a 
                href="tel:+918005550199" 
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  theme === "light" 
                    ? "bg-white border-slate-200 hover:border-cyan-300 text-slate-700 hover:text-cyan-600" 
                    : "bg-black/30 border-white/5 hover:border-cyan-500/20 text-gray-300 hover:text-cyan-400"
                }`}
              >
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="block font-semibold">IVR Student Toll Free</span>
                  <span className="text-[11px] text-gray-500">1800-555-0199 (Mon-Fri)</span>
                </div>
              </a>
            </div>
          </div>

          {/* Interactive support form */}
          <div className={`rounded-2xl border p-5 md:p-6 space-y-4 ${
            theme === "light" ? "bg-white border-slate-200 shadow-sm" : "bg-[#0b0b14]/90 border-white/5"
          }`}>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4.5 h-4.5 text-purple-400" />
              <h3 className={`text-base font-bold tracking-tight ${
                theme === "light" ? "text-slate-800" : "text-white"
              }`}>
                Submit a Support Ticket
              </h3>
            </div>

            <p className="text-xs text-gray-400 leading-normal">
              Need technical assistance, data sync recoveries, or study planner adjustments? Send us a direct ticket and we'll reply within 24 hours.
            </p>

            {formSubmitted ? (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-5 text-center space-y-3"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-white">Ticket Submitted Successfully!</h4>
                <p className="text-[11px] text-gray-400">
                  Your request has been filed in the queue. A verified NextRound student support lead will reach out to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-purple-400 underline hover:text-purple-300 cursor-pointer"
                >
                  Submit another issue
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3 text-xs sm:text-sm">
                {formError && (
                  <p className="text-red-400 text-xs font-mono bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg">
                    {formError}
                  </p>
                )}

                <div className="space-y-1">
                  <label className="block text-gray-400 text-[11px] font-mono uppercase font-semibold">Your Name</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Enter your name"
                    className={`w-full p-2.5 rounded-xl border focus:outline-none transition-all ${
                      theme === "light"
                        ? "bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500"
                        : "bg-black/35 border-white/5 text-white focus:border-purple-500"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-400 text-[11px] font-mono uppercase font-semibold">Email Address</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="e.g. you@example.com"
                    className={`w-full p-2.5 rounded-xl border focus:outline-none transition-all ${
                      theme === "light"
                        ? "bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500"
                        : "bg-black/35 border-white/5 text-white focus:border-purple-500"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-400 text-[11px] font-mono uppercase font-semibold">Subject / Topic</label>
                  <input
                    type="text"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    placeholder="e.g. Cannot access Suresh AI Mock Interview"
                    className={`w-full p-2.5 rounded-xl border focus:outline-none transition-all ${
                      theme === "light"
                        ? "bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500"
                        : "bg-black/35 border-white/5 text-white focus:border-purple-500"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-400 text-[11px] font-mono uppercase font-semibold">Message</label>
                  <textarea
                    rows={4}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Provide full description of your issue..."
                    className={`w-full p-2.5 rounded-xl border focus:outline-none transition-all resize-none ${
                      theme === "light"
                        ? "bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500"
                        : "bg-black/35 border-white/5 text-white focus:border-purple-500"
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-3 inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl text-white font-extrabold text-xs font-sans bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 transition-all shadow-md shadow-purple-600/15 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <span>Submit Ticket</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
