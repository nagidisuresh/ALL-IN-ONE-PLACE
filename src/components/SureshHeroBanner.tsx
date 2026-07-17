import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

interface SureshHeroBannerProps {
  onNavigate: (tabId: string) => void;
  setPlatformMode?: (mode: "career" | "eamcet" | "free-edu" | "remote-jobs" | "student-os" | "new-age-schools" | "learn-with-suresh") => void;
}

// Reusable SVG/Image Portrait component for Suresh Nagidi
function renderSureshPortrait(imageError: boolean, setImageError: (v: boolean) => void, className: string = "") {
  return (
    <svg 
      viewBox="0 0 400 400" 
      className={`${className} shadow-2xl rounded-2xl`}
    >
      <defs>
        {/* Deep, rich dark violet/purple background gradient from the photo */}
        <radialGradient id="purpleBg" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stopColor="#2b1c4e" />
          <stop offset="40%" stopColor="#180e2b" />
          <stop offset="100%" stopColor="#080410" />
        </radialGradient>
        
        {/* Soft atmospheric backlight glow matching the photo */}
        <radialGradient id="backlight" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#6366f1" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Realistic Indian skin tone gradient */}
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c59273" />
          <stop offset="60%" stopColor="#a37051" />
          <stop offset="100%" stopColor="#7a4b2d" />
        </linearGradient>

        {/* Strong purple ambient lighting reflection on the left side of his face/neck */}
        <linearGradient id="purpleRimLight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d946ef" stopOpacity="0.6" />
          <stop offset="25%" stopColor="#a855f7" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>

        {/* Subtle warm key light on the right side of his face */}
        <linearGradient id="warmLight" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#ffedd5" stopOpacity="0" />
        </linearGradient>

        {/* Clean, detailed hair gradient */}
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e1b29" />
          <stop offset="100%" stopColor="#0a090e" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* 1. Background (moody purple/violet wall) */}
      <rect width="100%" height="100%" fill="url(#purpleBg)" />
      
      {/* 2. Light glow behind head */}
      <rect width="100%" height="100%" fill="url(#backlight)" />
      <circle cx="160" cy="160" r="120" fill="#ec4899" opacity="0.12" filter="url(#glow)" />

      {/* 3. Shoulders and Body (wearing the blue-grey solid shirt) */}
      <path d="M 120,320 C 120,320 160,290 200,290 C 240,290 280,320 280,320 Z" fill="#181e29" />
      <path d="M 90,340 C 90,340 120,310 160,300 C 180,295 220,295 240,300 C 280,310 310,340 310,340 L 320,400 L 80,400 Z" fill="#2c3a4e" />
      <path d="M 175,295 L 200,340 L 225,295 Z" fill="#7a4b2d" opacity="0.8" />
      <path d="M 175,295 L 200,340 L 225,295 Z" fill="url(#purpleRimLight)" />
      <path d="M 175,295 L 200,342 L 225,295 Z" fill="#181e29" opacity="0.4" />
      <path d="M 155,300 L 180,335 L 195,302 Z" fill="#2c3a4e" stroke="#1c2635" strokeWidth="1.5" />
      <path d="M 155,300 L 180,335 L 195,302 Z" fill="url(#purpleRimLight)" opacity="0.5" />
      <path d="M 245,300 L 220,335 L 205,302 Z" fill="#2c3a4e" stroke="#1c2635" strokeWidth="1.5" />

      {/* 4. Neck */}
      <path d="M 175,220 L 175,300 L 225,300 L 225,220 Z" fill="url(#skinGrad)" />
      <path d="M 175,220 L 175,300 L 225,300 L 225,220 Z" fill="url(#purpleRimLight)" />
      <path d="M 175,220 L 175,300 L 195,300 L 185,220 Z" fill="#5c341a" opacity="0.35" />

      {/* 5. Head & Face */}
      <path d="M 245,185 C 255,185 258,205 248,215 C 242,220 240,210 242,200 Z" fill="#a37051" />
      <path d="M 245,185 C 255,185 258,205 248,215" stroke="#7a4b2d" strokeWidth="1" fill="none" />
      <path d="M 246,192 C 250,192 251,200 248,205" stroke="#5c341a" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 148,165 C 144,215 160,255 185,265 C 210,270 245,255 248,180 C 250,135 152,115 148,165 Z" fill="url(#skinGrad)" />
      <path d="M 148,165 C 144,215 160,255 185,265 C 210,270 245,255 248,180 C 250,135 152,115 148,165 Z" fill="url(#purpleRimLight)" />
      <path d="M 148,165 C 144,215 160,255 185,265 C 210,270 245,255 248,180 C 250,135 152,115 148,165 Z" fill="url(#warmLight)" />
      <path d="M 148,175 C 144,220 160,258 185,265" stroke="#f472b6" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d="M 148,165 C 152,215 175,250 185,265 C 170,250 152,210 148,165 Z" fill="#8d583c" opacity="0.4" />

      {/* 6. Hair */}
      <path d="M 140,150 C 135,130 145,105 160,95 C 180,80 220,80 240,95 C 250,105 255,125 252,150 C 248,135 242,120 230,110 C 210,100 175,100 158,118 C 145,130 142,142 140,150 Z" fill="#0c0a12" />
      <path d="M 142,145 Q 155,95 200,85 Q 245,95 251,140 C 251,140 242,118 225,110 Q 200,100 175,112 Q 155,122 142,145 Z" fill="url(#hairGrad)" />
      <path d="M 155,125 Q 185,105 215,112" stroke="#4c436e" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M 165,115 Q 195,95 225,102" stroke="#6d5c9e" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M 148,138 Q 175,115 205,120" stroke="#302847" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 180,100 Q 205,92 230,98" stroke="#8b5cf6" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />

      {/* 7. Eyes */}
      <g transform="translate(-2, 0)">
        <path d="M 162,174 Q 170,169 178,172" stroke="#110d1a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 162,174 Q 170,178 178,172" stroke="#110d1a" strokeWidth="1" strokeLinecap="round" fill="none" />
        <circle cx="171" cy="174" r="4" fill="#1b120c" />
        <circle cx="171.5" cy="174.5" r="2.2" fill="#000000" />
        <circle cx="173" cy="172.5" r="1" fill="#ffffff" />
      </g>
      <g transform="translate(4, 0)">
        <path d="M 206,172 Q 216,167 226,171" stroke="#110d1a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 206,172 Q 216,176 226,171" stroke="#110d1a" strokeWidth="1" strokeLinecap="round" fill="none" />
        <circle cx="217" cy="173.5" r="4.2" fill="#1b120c" />
        <circle cx="217.5" cy="174" r="2.3" fill="#000000" />
        <circle cx="219" cy="171.5" r="1" fill="#ffffff" />
      </g>

      {/* Eyebrows */}
      <path d="M 158,162 Q 170,154 182,159" stroke="#110d1a" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M 204,158 Q 218,153 230,160" stroke="#110d1a" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M 158,162 Q 170,154 182,159" stroke="#d946ef" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />

      {/* 8. Nose */}
      <path d="M 191,168 L 184,208 Q 182,213 189,213 C 195,213 198,209 198,206" stroke="#5c341a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M 190,172 L 186,206" stroke="#ffd0b0" strokeWidth="1.5" fill="none" opacity="0.25" />

      {/* 9. Mustache & Stubble */}
      <path d="M 176,224 Q 186,220 198,222 Q 206,220 214,224" stroke="#181424" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M 175,255 Q 185,261 195,255" stroke="#181424" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.4" />

      {/* 10. Smile */}
      <path d="M 174,233 Q 188,242 206,233" stroke="#450f0a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M 176,233 Q 188,240 204,233" stroke="#7e1f15" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 171,231 Q 173,234 174,236" stroke="#5c341a" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
      <path d="M 209,231 Q 207,234 206,236" stroke="#5c341a" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
      <path d="M 183,248 Q 188,251 193,248" stroke="#5c341a" strokeWidth="1.5" fill="none" opacity="0.4" />
    </svg>
  );
}

export default function SureshHeroBanner({ onNavigate, setPlatformMode }: SureshHeroBannerProps) {
  const [imageError, setImageError] = useState(false);
  const { language, t } = useLanguage();

  const handleStartLearning = () => {
    if (setPlatformMode) {
      setPlatformMode("learn-with-suresh");
    }
    onNavigate("learn-with-suresh");
  };

  const handleAskAI = () => {
    onNavigate("ai-chat");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 mt-12 mb-16">
      <div className="bg-[#0b0f19]/90 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 max-w-4xl mx-auto font-sans text-white shadow-2xl relative overflow-hidden">
        {/* Subtle dark ambient glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#b94fff]/10 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-amber-500/10 rounded-full filter blur-[80px] pointer-events-none" />

        {/* Profile Image with Glow */}
        <div className="relative shrink-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#fbbf24] to-[#a855f7] rounded-2xl blur-md opacity-40"></div>
          {renderSureshPortrait(imageError, setImageError, "relative w-32 h-32 md:w-36 md:h-36 object-cover rounded-2xl shadow-2xl border border-white/10")}
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 flex-1">
          
          {/* Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/20 text-[#fbbf24] text-[10px] sm:text-xs font-bold tracking-wider mb-4 bg-amber-500/5 uppercase font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {t("sureshBadge")}
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tight font-sans text-white">
            {language === "hi" ? (
              <span>नमस्ते, मैं <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 font-extrabold italic">सुरेश</span> हूँ</span>
            ) : (
              <span>Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 font-extrabold italic">Suresh</span></span>
            )}
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-2xl mb-6 font-sans">
            {t("sureshDesc")}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3.5 justify-center md:justify-start w-full">
            <button
              onClick={handleStartLearning}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#fbbf24] hover:bg-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{t("startLearning")}</span>
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>

            <button
              onClick={handleAskAI}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-white/10 hover:border-white/20 hover:bg-slate-850 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <span>{t("askAI")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
