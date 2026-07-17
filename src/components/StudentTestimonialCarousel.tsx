import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  college: string;
  achievement: string;
  text: string;
  rating: number;
  avatarBg: string;
  avatarText: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Systems Engineer @ TCS Digital",
    college: "GMR Institute of Technology, Rajam",
    achievement: "TCS Digital (7.2 LPA)",
    text: "NextRoundPrep's customized roadmaps completely demystified the interview process. Going from a regional tier-3 college in Andhra Pradesh to TCS Digital seemed impossible, but the TCS NQT Cockpit mock tests and AI study advisor gave me exactly the preparation edge I needed. Highly recommended!",
    rating: 5,
    avatarBg: "from-purple-500 to-pink-500",
    avatarText: "PS"
  },
  {
    id: 2,
    name: "Karthik Rajan",
    role: "Frontend Engineer @ Razorpay Partner",
    college: "Anna University, Chennai",
    achievement: "8.5 LPA Off-Campus Offer",
    text: "I couldn't afford expensive commercial bootcamps. Using the 100% Free Catalog and StudentOS, I mapped out my custom frontend developer syllabus. I built my portfolio entirely using NextRoundPrep's guidance and portfolio reviews, landing a high-paying job within 3 months!",
    rating: 5,
    avatarBg: "from-cyan-500 to-blue-600",
    avatarText: "KR"
  },
  {
    id: 3,
    name: "Ananya Deshmukh",
    role: "Computer Science Freshman",
    college: "VNR VJIET, Hyderabad",
    achievement: "EAMCET State Rank #1842",
    text: "The EAMCET Prep Hub was my absolute daily companion. The chapter mock tests and Suresh's physics formula reviews solved complex numerical questions in seconds. NextRoundPrep helped me score an incredible state rank and secure a seat in my dream college without paying a rupee for coaching!",
    rating: 5,
    avatarBg: "from-emerald-400 to-teal-600",
    avatarText: "AD"
  },
  {
    id: 4,
    name: "Rahul Verma",
    role: "Associate software Engineer @ Accenture",
    college: "Lovely Professional University",
    achievement: "Multiple Product-Company Offers",
    text: "The real-time AI interview simulator is pure gold. It felt exactly like talking to a real technical lead at Accenture. It highlighted resume flaws, coached me on the STAR response method, and dramatically boosted my speaking confidence. Saved thousands of rupees on private mentoring.",
    rating: 5,
    avatarBg: "from-amber-400 to-orange-500",
    avatarText: "RV"
  },
  {
    id: 5,
    name: "Sandeep Reddy",
    role: "Backend Node.js Developer @ Tech Mahindra",
    college: "JNTU, Kakinada",
    achievement: "Backend Specialist Placed",
    text: "Suresh's curated learning paths for backend development are phenomenally detailed. I went from zero coding knowledge to designing databases, APIs, and deploying microservices. The gamified XP and points badge system kept me motivated to complete every single step on my roadmap!",
    rating: 5,
    avatarBg: "from-rose-500 to-red-600",
    avatarText: "SR"
  }
];

export default function StudentTestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, isHovered]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const current = testimonials[currentIndex];

  return (
    <div 
      id="student-testimonials-section" 
      className="relative w-full rounded-[24px] border border-white/5 bg-[#0a0a14]/65 p-6 md:p-8 shadow-3xl mb-16 overflow-hidden group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle background glow elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#a855f7]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#06b6d4]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Success Stories & Social Proof</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-display">
            Placed & Qualified NextRound Students
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-xl">
            Real stories from Indian regional and tier-3 colleges who unlocked high-paying placements and top ranks using our free ecosystem.
          </p>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 min-h-[220px] md:min-h-[180px] flex items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
          >
            {/* Student Info Card */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-3">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${current.avatarBg} flex items-center justify-center text-white font-extrabold text-xl shadow-lg border border-white/10`}>
                {current.avatarText}
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white tracking-tight">{current.name}</h4>
                <p className="text-xs text-purple-300 font-mono font-medium">{current.role}</p>
                <p className="text-[11px] text-gray-400">{current.college}</p>
              </div>
              
              {/* Achievement Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono tracking-wide">
                <Award className="w-3.5 h-3.5 shrink-0" />
                <span>{current.achievement}</span>
              </div>
            </div>

            {/* Testimonial Quote Card */}
            <div className="md:col-span-8 bg-[#11101c]/45 border border-white/5 rounded-2xl p-5 md:p-6 relative flex flex-col justify-between space-y-4">
              <div className="absolute right-4 top-4 opacity-5 pointer-events-none">
                <Quote className="w-16 h-16 text-white" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed italic">
                "{current.text}"
              </p>

              {/* Bottom Verification Footer */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500 pt-2 border-t border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Verified NextRound Scholar Milestone</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dot Indicators */}
      <div className="relative z-10 flex justify-center gap-1.5 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              index === currentIndex 
                ? "w-6 bg-purple-500" 
                : "w-1.5 bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
