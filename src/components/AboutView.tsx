import React, { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import CareerPathCanvas from "./CareerPathCanvas";

interface AboutViewProps {
  onNavigate: (tabId: string) => void;
  user?: { name: string; email: string } | null;
  userPoints?: number;
}

export default function AboutView({ onNavigate, user, userPoints = 0 }: AboutViewProps) {
  const [activeGoal, setActiveGoal] = useState<string>("Frontend Developer");

  return (
    <div className="w-full max-w-7xl mx-auto pt-4 pb-16 px-6 sm:px-10" id="about-container">
      
      {/* 0. INTERACTIVE 3D CAREER CONSTELLATION HERO */}
      <div className="mb-12 glass-card rounded-[22px] border border-white/5 bg-[#11101c]/45 p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive 3D Sandbox</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight font-display">
              Navigate Your <span className="bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">Dream Career</span> Path
            </h1>
            <p className="text-gray-400 text-xs leading-relaxed">
              Explore our dynamic 3D career constellation. Rotate, drag, and select different nodes to unlock customized study blueprints and practice paths.
            </p>
            
            {/* Active Selection Details */}
            <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold">Selected Goal:</span>
                <span className="text-xs font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                  {activeGoal}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 leading-normal min-h-[48px]">
                {activeGoal === "Frontend Developer" && "Master client-side UI, responsive styling, modern React patterns, and web interfaces."}
                {activeGoal === "Backend Developer" && "Engineer backend architectures, database modeling, secure REST/GraphQL APIs, and server operations."}
                {activeGoal === "Data Scientist" && "Delve into predictive analytics, statistical modelling, machine learning pipelines, and data insights."}
                {activeGoal === "Product Manager" && "Lead product roadmaps, manage agile sprints, coordinate design cycles, and define business alignment."}
              </p>
              <button
                onClick={() => onNavigate("roadmap")}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold py-2 px-4 rounded-lg shadow-md transition-all cursor-pointer"
              >
                <span>Generate Step-by-Step Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-7 h-[340px] relative w-full rounded-2xl border border-white/5 overflow-hidden bg-gradient-to-b from-[#0a0a14] to-[#11101c]">
            <CareerPathCanvas activeGoal={activeGoal} onSelectGoal={(goal) => setActiveGoal(goal)} />
          </div>
        </div>
      </div>

    </div>
  );
}
