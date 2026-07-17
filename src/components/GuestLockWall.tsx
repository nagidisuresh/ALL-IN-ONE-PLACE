import React from "react";
import { Lock, Sparkles, CheckCircle2, UserPlus, ArrowRight, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

interface GuestLockWallProps {
  onSignUp: () => void;
  onExploreFree: () => void;
  title?: string;
  description?: string;
}

export default function GuestLockWall({ 
  onSignUp, 
  onExploreFree,
  title = "Unlock Premium Interview Suite",
  description = "Take your prep to the next level. Sign up for a free account to unlock real-time feedback, interactive mock loops, and global stand standing."
}: GuestLockWallProps) {
  const premiumFeatures = [
    { text: "Unlimited AI Mock Interviews", desc: "Speak naturally with voice-enabled AI and get real-time STAR method feedback." },
    { text: "ATS-Optimized Resume Enhancer", desc: "Get detailed scoring, bullet points suggestions, and recruiter feedback." },
    { text: "Customized Prep Roadmaps", desc: "Track progress, solve milestones quizzes, and earn global rank standing." },
    { text: "AI Study Coach & Chat History", desc: "Save study history, consult premium coaches, and access interactive code sandboxes." }
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto my-12 px-4">
      {/* Blurred mock screen representation in the background */}
      <div className="absolute inset-0 bg-slate-900/10 rounded-3xl filter blur-xl pointer-events-none -z-10" />
      
      {/* Visual Wall */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full bg-[#11101c]/90 border border-[#ec4899]/30 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(236,72,153,0.15)] relative overflow-hidden text-left"
      >
        {/* Colorful ambient glow circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#ec4899]/10 to-transparent rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#22d3ee]/10 to-transparent rounded-full filter blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left info panel */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-[10px] font-bold font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Upgrade Workspace Access
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                {title}
              </h2>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Feature checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {premiumFeatures.map((feat, idx) => (
                <div key={idx} className="flex gap-2.5">
                  <div className="p-1 rounded-full bg-[#ec4899]/15 text-[#ec4899] h-fit shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-200">{feat.text}</h4>
                    <p className="text-[10px] text-gray-500 leading-normal mt-0.5">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Action panel */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center lg:border-l lg:border-white/5 lg:pl-8 py-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#ec4899] to-[#a855f7] flex items-center justify-center text-white shadow-xl shadow-purple-500/20 mb-6 relative">
              <Lock className="w-7 h-7" />
              <motion.div 
                className="absolute inset-0 rounded-2xl border-2 border-white/25"
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <div className="w-full space-y-3.5">
              <button
                type="button"
                onClick={onSignUp}
                className="w-full bg-gradient-to-r from-pink-500 to-[#a855f7] hover:opacity-95 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-pink-500/10 cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
              >
                <UserPlus className="w-4 h-4" />
                Create Free Account
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onExploreFree}
                className="w-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 text-gray-300 hover:text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer text-xs"
              >
                Explore Free Materials
              </button>
            </div>

            <div className="mt-5 flex items-center gap-1.5 text-[10px] text-gray-500 font-mono">
              <HelpCircle className="w-3.5 h-3.5 text-gray-600" />
              Need help? Go to our Help Center
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
