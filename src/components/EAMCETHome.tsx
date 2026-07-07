import React from "react";
import { motion } from "motion/react";
import { 
  BookOpen, 
  Award, 
  FileText, 
  Zap, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight, 
  Sparkles, 
  UserCheck, 
  ArrowRight,
  TrendingUp,
  Cpu
} from "lucide-react";

interface EAMCETHomeProps {
  onNavigate: (tab: string) => void;
  onSelectSubject?: (subject: "Mathematics" | "Physics" | "Chemistry") => void;
}

export default function EAMCETHome({ onNavigate, onSelectSubject }: EAMCETHomeProps) {
  // Animated counters
  const stats = [
    { label: "Active Aspirants", count: "145K+", icon: UserCheck, color: "from-blue-500 to-cyan-400" },
    { label: "Questions Solved", count: "4.2M+", icon: CheckCircle2, color: "from-emerald-500 to-teal-400" },
    { label: "Colleges Database", count: "250+", icon: Award, color: "from-purple-500 to-pink-400" },
    { label: "AI Doubt Queries", count: "650K+", icon: Cpu, color: "from-amber-500 to-orange-400" }
  ];

  const features = [
    {
      title: "Smart MCQ Practice",
      desc: "Practice chapter-wise multiple choice questions with instant color-coded feedback and detailed explanations.",
      icon: BookOpen,
      tab: "practice",
      badge: "Self-Paced"
    },
    {
      title: "Previous Year Papers",
      desc: "Exhaustive PDF library of original solved papers from 2022 to 2025 with performance mapping.",
      icon: FileText,
      tab: "materials",
      badge: "High Value"
    },
    {
      title: "College & Rank Predictor",
      desc: "Input your EAMCET rank, category, and preferences to see AI-generated dream, target, and safe colleges.",
      icon: TrendingUp,
      tab: "counseling",
      badge: "AI Powered"
    },
    {
      title: "Topper Strategy & Tips",
      desc: "Proven tactics, study roadmaps, exam time-management checklists, and subject weightage charts.",
      icon: Zap,
      tab: "tips",
      badge: "Guaranteed Boost"
    }
  ];

  const subjects = [
    {
      name: "Mathematics" as const,
      topics: ["Algebra", "Calculus", "Vectors", "Coordinate Geometry"],
      color: "from-blue-600/20 to-indigo-600/20 border-blue-500/30 text-blue-400",
      btnColor: "bg-blue-500 hover:bg-blue-600 shadow-blue-500/20",
      desc: "Carries 50% of the total score. Crucial for rank-boosting."
    },
    {
      name: "Physics" as const,
      topics: ["Mechanics", "Optics", "Modern Physics", "Electromagnetism"],
      color: "from-purple-600/20 to-pink-600/20 border-purple-500/30 text-purple-400",
      btnColor: "bg-purple-500 hover:bg-purple-600 shadow-purple-500/20",
      desc: "Logical, conceptual, and numerical questions. Key differentiator."
    },
    {
      name: "Chemistry" as const,
      topics: ["Organic", "Physical", "Inorganic", "General Chemistry"],
      color: "from-emerald-600/20 to-teal-600/20 border-emerald-500/30 text-emerald-400",
      btnColor: "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20",
      desc: "Fastest to solve. Excellent source for securing quick marks."
    }
  ];

  const faqs = [
    {
      q: "Is the EAMCETPrep platform really free?",
      a: "Yes, our core mission is to assist engineering aspirants of all financial backgrounds. The practice MCQs, previous papers, counseling predictors, and standard AI tutoring tools are completely free forever."
    },
    {
      q: "How accurate is the College Predictor?",
      a: "Our algorithm uses multi-year official seat-allotment and cutoff data (including OC, BC, SC, ST, Gender, Local Region metrics) to determine predictions. While highly reliable (95%+ accuracy), it serves as a decision-making model and we recommend verifying during official web option entries."
    },
    {
      q: "What is the benefit of the AI Tutor Chat?",
      a: "The floating Ask AI widget acts as your 24/7 personalized doubt-solving assistant. If you do not understand a calculus formula or a physical concept, ask directly to get a friendly step-by-step mathematical explanation."
    },
    {
      q: "Are the questions here aligned with the actual syllabus?",
      a: "Absolutely. All questions, weights, and chapters are drafted by subject-matter experts strictly aligned with the latest syllabus frameworks of APSCHE (Andhra Pradesh) and TGCHE (Telangana)."
    }
  ];

  const testimonials = [
    {
      quote: "The college predictor was a lifesaver. It showed me that JNTUH was reachable with my rank. Now, I am studying CSE here!",
      name: "Chandra Shekhar Reddy",
      rank: "Rank 842 in 2025",
      college: "JNTUH CSE"
    },
    {
      quote: "Practicing Chemistry on this site helped me increase my speed. I finished my Chemistry section in just 20 minutes on the final exam!",
      name: "K. Harika",
      rank: "Rank 1520 in 2025",
      college: "OUCE ECE"
    }
  ];

  return (
    <div id="eamcet-home-view" className="space-y-24 py-6 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Aurora / Glow background spots */}
      <div className="absolute top-24 left-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-96 right-1/4 w-[250px] h-[250px] bg-pink-500/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto space-y-8 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-xs font-mono text-indigo-300 shadow-inner"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>India's Most Advanced AI-Powered EAMCET Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-b from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent font-sans"
        >
          Crack EAMCET with <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Focused AI Practice
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed"
        >
          Master subject-wise MCQs, explore counseling predictions with your rank, download previous year papers, and interact with our dedicated 
          <span className="text-indigo-300 font-semibold"> AI Doubt Solver</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
        >
          <button
            onClick={() => onNavigate("plans")}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-medium tracking-wide shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Start 30-Day Plan
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate("practice")}
            className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Practice MCQs
          </button>
          <button
            onClick={() => onNavigate("counseling")}
            className="w-full sm:w-auto px-8 py-3.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 rounded-xl font-medium border border-indigo-500/30 hover:border-indigo-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Predict Colleges
          </button>
        </motion.div>

        {/* Badges row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-gray-500 font-mono pt-8"
        >
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> FREE FOREVER</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> INSTANT EXPLANATIONS</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> MOBILE FRIENDLY</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 24/7 AI DOUBT TUTOR</span>
        </motion.div>
      </div>

      {/* Counters Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-6 flex flex-col justify-between hover:border-white/10 transition-colors group"
          >
            <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <stat.icon className="w-24 h-24 text-white" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10 text-white flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-neutral-100" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold font-sans tracking-tight text-white">{stat.count}</div>
              <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-white">Full-Suite Aspirant Ecosystem</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">Everything you need to study, practice, and secure admission under one dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-6 hover:border-indigo-500/20 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-white/5 text-indigo-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-300 transition-colors">
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider bg-white/5 text-gray-400 px-2.5 py-1 rounded-full border border-white/5">
                    {feat.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed mb-6">
                  {feat.desc}
                </p>
              </div>

              <button
                onClick={() => onNavigate(feat.tab)}
                className="w-full py-2.5 bg-white/5 hover:bg-indigo-600 hover:text-white border border-white/10 hover:border-indigo-500 text-gray-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                Open Resource
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Practice by Subject Section */}
      <div className="space-y-12">
        <div className="flex flex-col sm:flex-row justify-between items-end gap-4 border-b border-white/5 pb-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white">Interactive Subject Suites</h2>
            <p className="text-gray-400 text-sm">Select a core STEM subject to instantly load our dynamic practice quiz engine.</p>
          </div>
          <button
            onClick={() => onNavigate("practice")}
            className="text-xs font-mono uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
          >
            View All Subjects <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {subjects.map((sub, idx) => (
            <motion.div
              key={sub.name}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`rounded-2xl border bg-gradient-to-br ${sub.color} p-8 flex flex-col justify-between h-[380px] shadow-lg group relative overflow-hidden`}
            >
              {/* Subtle visual decoration */}
              <div className="absolute top-1/2 right-[-20%] w-[180px] h-[180px] bg-white/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-white/10 transition-colors" />

              <div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-white">{sub.name}</h3>
                  <span className="text-[10px] font-mono tracking-wider text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full uppercase">
                    Core Subject
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  {sub.desc}
                </p>

                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase text-gray-400">Key High-Weight Chapters:</div>
                  <div className="flex flex-wrap gap-2">
                    {sub.topics.map((t) => (
                      <span key={t} className="text-xs bg-white/10 text-white/90 border border-white/10 px-2.5 py-1 rounded-lg">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (onSelectSubject) {
                    onSelectSubject(sub.name);
                  }
                  onNavigate("practice");
                }}
                className={`w-full py-3.5 ${sub.btnColor} text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg cursor-pointer`}
              >
                Start Practice <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-r from-blue-950/10 via-indigo-950/10 to-purple-950/10 rounded-3xl border border-white/5 p-8 sm:p-12 relative overflow-hidden">
        <div className="space-y-6 max-w-md">
          <div className="p-2 w-fit rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Aspirant Success Stories</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Read comments from top-rankers who used our interactive study plans, subject quizzes, and AI prediction modules to design their counseling options.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-amber-500">★★★★★</span>
            <span className="text-xs font-mono text-gray-400 ml-2">OVERALL RATING 4.9/5 BY 45K+ STUDENTS</span>
          </div>
        </div>

        <div className="space-y-6 flex flex-col justify-center">
          {testimonials.map((test, idx) => (
            <div key={idx} className="bg-white/[0.02] border border-white/5 backdrop-blur-md p-6 rounded-2xl relative">
              <p className="text-gray-300 text-sm italic mb-4">"{test.quote}"</p>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xs font-semibold text-white">{test.name}</div>
                  <div className="text-[11px] text-gray-500 font-mono">{test.college}</div>
                </div>
                <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                  {test.rank}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-10 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-white">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-sm">Need quick answers? Check our general FAQ board or ask the Ask AI assistant widget below.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors p-6 rounded-2xl space-y-3"
            >
              <div className="flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <h4 className="text-sm font-semibold text-white">{faq.q}</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed pl-7">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Call To Action */}
      <div className="relative rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/20 via-blue-950/20 to-neutral-900/50 p-10 sm:p-16 text-center space-y-6 overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Ready to Boost Your Exam Rank?</h2>
        <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
          Unlock personalized study sprints, practice thousands of high-yield questions, and predict your target colleges in minutes. Totally free.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => onNavigate("plans")}
            className="px-8 py-3.5 bg-white text-black hover:bg-neutral-200 rounded-xl font-semibold text-sm transition-all cursor-pointer"
          >
            Start Learning Now
          </button>
          <button 
            onClick={() => onNavigate("practice")}
            className="px-8 py-3.5 bg-transparent border border-white/10 hover:border-white/30 text-white rounded-xl font-semibold text-sm transition-all cursor-pointer"
          >
            Practice Math MCQs
          </button>
        </div>
      </div>
    </div>
  );
}
