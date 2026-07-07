import React, { useState } from "react";
import { Sparkles, ArrowRight, MessageSquare, BookOpen, Compass, Award, Heart, Shield, Laptop, RefreshCw, GitCommit, Map, Calendar, Users, Zap, Trophy, Mail, Linkedin, Youtube, Send, Instagram, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AboutViewProps {
  onNavigate: (tabId: string) => void;
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  const [selectedLine, setSelectedLine] = useState<string>("all");
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  const corePillars = [
    {
      icon: Compass,
      title: "AI Route Planning",
      description: "Custom visual roadmaps designed by AI to bridge the gap between regional colleges and major industrial placements."
    },
    {
      icon: BookOpen,
      title: "Worldwide Free Catalog",
      description: "Direct connection to over 70+ elite, 100% free learning environments — bypassing traditional high-cost coaching."
    },
    {
      icon: Award,
      title: "Competitive Exam Rigor",
      description: "Full-scale prep suites like our dedicated TCS NQT Cockpit to provide real-time testing and performance diagnostics."
    },
    {
      icon: MessageSquare,
      title: "Real-time AI Mentorship",
      description: "A continuous feedback loop powered by advanced language models to review resumes, debug code, and explain concepts."
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto pt-24 pb-16 px-6 sm:px-10" id="about-container">
      


      {/* 2. THE MISSION STATEMENT & VALUES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="glass-card rounded-[22px] border border-white/5 bg-[#11101c]/45 p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">The Problem We Are Solving</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              India has a paradox: over 33% youth unemployment alongside a massive technical skills deficit. Traditional degrees are rigid and expensive, graduating students with theoretical knowledge that lacks real-world application. NextRoundPrep bridges this gap by mapping high-demand careers directly to curated free learning pathways.
            </p>
          </div>
          <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-[11px] font-mono text-purple-300">
            <span>Syllabus-to-Job Alignment</span>
            <span>100% Free Forever</span>
          </div>
        </div>

        <div className="glass-card rounded-[22px] border border-white/5 bg-[#11101c]/45 p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Our Core Philosophy</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              We believe skill-first achievements should speak louder than premium pedigree. By matching structured AI-generated pathways with hands-on practice, students build practical portfolios (Proof of Work) and interview experience that makes them immediately hireable by top-tier global companies.
            </p>
          </div>
          <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-[11px] font-mono text-cyan-300">
            <span>Proof of Work Focus</span>
            <span>AI Guided</span>
          </div>
        </div>
      </div>

      {/* 3. CORE FEATURES GRID */}
      <div className="mb-16">
        <h3 className="text-lg font-bold text-white tracking-tight mb-8 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>The NextRoundPrep Ecosystem</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {corePillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div key={i} className="bg-[#111827]/30 border border-white/5 rounded-2xl p-6 hover:bg-[#111827]/50 transition-all duration-300">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight">{pillar.title}</h4>
                <p className="text-gray-400 text-[11px] leading-relaxed mt-2">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. TEAM METRO STATIONS & MILESTONES (Transit Map Metaphor) */}
      <div className="mb-16 scroll-mt-24" id="metro-network-section">
        <style>{`
          @keyframes transit-flow {
            to {
              stroke-dashoffset: -40;
            }
          }
          .transit-line-anim {
            stroke-dasharray: 12, 6;
            animation: transit-flow 2.5s linear infinite;
          }
          @keyframes pulse-ring {
            0% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.15); opacity: 0.4; }
            100% { transform: scale(1.3); opacity: 0; }
          }
          .pulsing-halo {
            animation: pulse-ring 2s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
          }
        `}</style>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider mb-3">
              <Map className="w-3.5 h-3.5" />
              <span>Interactive Operations Network</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              The NextRoundPrep Metro Map
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-xl">
              Showcasing our developmental junctions, foundational milestones, and ecosystem routes. Click on any track or station to filter and view structural information.
            </p>
          </div>

          {/* Route Selectors */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", name: "All Tracks", color: "border-white/10 text-gray-300 bg-white/5", stroke: "#ffffff" },
              { id: "milestone", name: "Milestones Line (Purple)", color: "border-purple-500/20 text-purple-300 bg-purple-500/10", stroke: "#a855f7" },
              { id: "team", name: "Team & Advisory Track (Amber)", color: "border-amber-500/20 text-amber-300 bg-amber-500/10", stroke: "#f59e0b" },
              { id: "ecosystem", name: "Ecosystem Extensions (Cyan)", color: "border-cyan-500/20 text-cyan-300 bg-cyan-500/10", stroke: "#06b6d4" },
            ].map((line) => (
              <button
                key={line.id}
                onClick={() => {
                  setSelectedLine(line.id);
                  setSelectedStation(null); // Clear selected station filter on line change
                }}
                className={`px-3.5 py-1.5 rounded-lg border text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedLine === line.id
                    ? `${line.color} shadow-lg ring-1 ring-white/10 scale-[1.03]`
                    : "border-white/5 text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {line.name}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Map Backdrop panel */}
        <div className="relative rounded-[24px] border border-white/5 bg-[#090911]/80 p-4 md:p-6 shadow-3xl mb-8 overflow-hidden group">
          {/* Subtle blueprint grid layout */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none rounded-[24px]" />
          
          <div className="overflow-x-auto scrollbar-none pb-2">
            <svg viewBox="0 0 800 240" className="w-full min-w-[720px] h-auto relative z-10 select-none">
              <defs>
                <filter id="glowBlur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* TRACK LAYER 1: Deep Glow Tracks */}
              <path
                d="M 100,120 L 700,120"
                stroke="#a855f7"
                strokeWidth="8"
                strokeLinecap="round"
                opacity={selectedLine === "all" || selectedLine === "milestone" ? "0.35" : "0.06"}
                filter="url(#glowBlur)"
                className="transition-all duration-500"
              />
              <path
                d="M 400,40 L 400,120 L 550,200"
                stroke="#f59e0b"
                strokeWidth="8"
                strokeLinecap="round"
                opacity={selectedLine === "all" || selectedLine === "team" ? "0.35" : "0.06"}
                filter="url(#glowBlur)"
                className="transition-all duration-500"
              />
              <path
                d="M 250,40 L 250,120 L 400,120 L 550,200"
                stroke="#06b6d4"
                strokeWidth="8"
                strokeLinecap="round"
                opacity={selectedLine === "all" || selectedLine === "ecosystem" ? "0.35" : "0.06"}
                filter="url(#glowBlur)"
                className="transition-all duration-500"
              />

              {/* TRACK LAYER 2: Solid Rails */}
              <path
                d="M 100,120 L 700,120"
                stroke="#a855f7"
                strokeWidth="4"
                strokeLinecap="round"
                opacity={selectedLine === "all" || selectedLine === "milestone" ? "1" : "0.2"}
                className="transition-all duration-500"
              />
              <path
                d="M 400,40 L 400,120 L 550,200"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeLinecap="round"
                opacity={selectedLine === "all" || selectedLine === "team" ? "1" : "0.2"}
                className="transition-all duration-500"
              />
              <path
                d="M 250,40 L 250,120 L 400,120 L 550,200"
                stroke="#06b6d4"
                strokeWidth="4"
                strokeLinecap="round"
                opacity={selectedLine === "all" || selectedLine === "ecosystem" ? "1" : "0.2"}
                className="transition-all duration-500"
              />

              {/* TRACK LAYER 3: Animated Pulse Flow on hovered lines */}
              <path
                d="M 100,120 L 700,120"
                stroke="#d8b4fe"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity={selectedLine === "milestone" ? "0.8" : "0"}
                className="transit-line-anim transition-all duration-500"
              />
              <path
                d="M 400,40 L 400,120 L 550,200"
                stroke="#fde047"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity={selectedLine === "team" ? "0.8" : "0"}
                className="transit-line-anim transition-all duration-500"
              />
              <path
                d="M 250,40 L 250,120 L 400,120 L 550,200"
                stroke="#67e8f9"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity={selectedLine === "ecosystem" ? "0.8" : "0"}
                className="transit-line-anim transition-all duration-500"
              />

              {/* STATION NODES */}
              {[
                { id: "M1", x: 100, y: 120, label: "STN-M1", name: "Genesis Hub", color: "#a855f7" },
                { id: "M2", x: 250, y: 120, label: "STN-M2", name: "Catalog Junction", color: "#a855f7" },
                { id: "M3", x: 550, y: 120, label: "STN-M3", name: "TCS Cockpit", color: "#a855f7" },
                { id: "M4", x: 700, y: 120, label: "STN-M4", name: "AI Advisor", color: "#a855f7" },
                { id: "T2", x: 400, y: 40, label: "STN-T2", name: "AI Curriculum", color: "#f59e0b" },
                { id: "E1", x: 250, y: 40, label: "STN-E1", name: "Foundation", color: "#06b6d4" },
                { id: "E2", x: 550, y: 200, label: "STN-E2", name: "DSA Loop", color: "#06b6d4" },
              ].map((node) => {
                const isSelected = selectedStation === node.id;
                const isHQ = node.id === "T1";
                const isIntersection = node.id === "M2" || node.id === "E2" || node.id === "T1";
                
                // Primary node configurations
                const stationPrimaryLine = 
                  node.id.startsWith("M") ? "milestone" : 
                  node.id.startsWith("T") ? "team" : "ecosystem";

                const isOnActiveLine =
                  selectedLine === "all" || 
                  stationPrimaryLine === selectedLine || 
                  (node.id === "T1") || 
                  (node.id === "M2" && selectedLine === "ecosystem") || 
                  (node.id === "E2" && selectedLine === "team");

                const nodeOpacity = isOnActiveLine ? "1.0" : "0.22";

                return (
                  <g
                    key={node.id}
                    onClick={() => {
                      setSelectedStation(isSelected ? null : node.id);
                      if (selectedLine !== "all" && stationPrimaryLine !== selectedLine && !isHQ) {
                        setSelectedLine("all");
                      }
                      
                      const cardElement = document.getElementById(`station-card-${node.id}`);
                      if (cardElement) {
                        cardElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
                      }
                    }}
                    className="cursor-pointer group/node"
                    opacity={nodeOpacity}
                    style={{ transition: "all 0.4s" }}
                  >
                    {/* Pulsing Active Node Outer Ring */}
                    {isHQ && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="22"
                        fill="#f59e0b"
                        opacity="0.15"
                        className="pulsing-halo origin-center"
                        style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                      />
                    )}

                    {/* Glow backdrop on selection */}
                    {isSelected && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isHQ ? "20" : "12"}
                        fill={node.color}
                        opacity="0.35"
                        filter="url(#glowBlur)"
                      />
                    )}

                    {/* Outer Circle Ring */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isHQ ? "13" : isIntersection ? "8.5" : "6.5"}
                      fill="#06060c"
                      stroke={node.color}
                      strokeWidth={isSelected ? "4.5" : "2.5"}
                      className="group-hover/node:stroke-white transition-all duration-300"
                    />

                    {/* Inner Details / Interchanges */}
                    {isHQ ? (
                      <g transform={`translate(${node.x - 5}, ${node.y - 5})`}>
                        <path d="M 1,5 L 9,5 M 5,1 L 5,9" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                      </g>
                    ) : isIntersection ? (
                      <circle cx={node.x} cy={node.y} r="3.5" fill="#ffffff" />
                    ) : (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="2.5"
                        fill={isSelected ? "#ffffff" : node.color}
                        className="transition-colors duration-300"
                      />
                    )}

                    {/* Text Label - Station Name */}
                    <text
                      x={node.x}
                      y={node.y + (node.id === "E2" || node.id === "M2" ? 22 : -18)}
                      textAnchor="middle"
                      fill={isSelected ? "#ffffff" : "#cbd5e1"}
                      className="text-[10px] font-bold font-sans tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover/node:fill-white transition-colors"
                    >
                      {node.name}
                    </text>

                    {/* Text Label - Code */}
                    <text
                      x={node.x}
                      y={node.y + (node.id === "E2" || node.id === "M2" ? 32 : -28)}
                      textAnchor="middle"
                      fill={isSelected ? node.color : "#64748b"}
                      className="text-[8px] font-mono tracking-widest uppercase font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Dynamic Station Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {[
              {
                id: "M1",
                line: "milestone",
                title: "Genesis Hub",
                year: "2025",
                subtitle: "The Idea",
                description: "NextRoundPrep conceived to democratize professional placement prep, bridging the gap between regional colleges and major tech firms.",
                icon: Compass,
                status: "operational",
              },
              {
                id: "M2",
                line: "milestone",
                title: "Catalog Junction",
                year: "Q1 2026",
                subtitle: "70+ Free Sources Vetted",
                description: "Aggregated, vetted, and indexed 70+ top-tier free platforms, allowing students to learn without high coaching fees.",
                icon: BookOpen,
                status: "operational",
              },
              {
                id: "M3",
                line: "milestone",
                title: "TCS NQT Cockpit",
                year: "Q2 2026",
                subtitle: "Diagnostic Platform",
                description: "Launched high-fidelity diagnostic testing engines, shortcut tools, and practice sections to tackle competitive placements.",
                icon: Award,
                status: "operational",
              },
              {
                id: "T2",
                line: "team",
                title: "AI Curriculum Engine",
                role: "Automated Curator Node",
                year: "Core Technology",
                subtitle: "Route Planning Assistant",
                description: "Dynamic syllabus matching engine powered by state-of-the-art language models, tailoring free sources into clean learning journeys.",
                icon: RefreshCw,
                status: "active",
              },
              {
                id: "M4",
                line: "milestone",
                title: "AI Advisor Junction",
                year: "Q3 2026",
                subtitle: "Continuous Feedback",
                description: "Integrated real-time conversational AI to review resumes, debug code, and provide direct peer-like mentorship on the fly.",
                icon: Sparkles,
                status: "active",
              },
              {
                id: "E1",
                line: "ecosystem",
                title: "Foundation Terminal",
                year: "Extended Route",
                subtitle: "Class 9-12 Foundation",
                description: "Bridges secondary school curricula with fundamental computer science streams to build early critical thinking.",
                icon: Shield,
                status: "active",
              },
              {
                id: "E2",
                line: "ecosystem",
                title: "DSA Challenge Loop",
                year: "Extended Route",
                subtitle: "Interview Mastery",
                description: "Dynamic sandbox compiler mapping trending DSA arrays, graphs, and algorithms onto public, zero-cost compilers.",
                icon: Laptop,
                status: "active",
              }
            ]
              .filter((stn) => selectedLine === "all" || stn.line === selectedLine)
              .map((station) => {
                const Icon = station.icon;
                const isSelected = selectedStation === station.id;
                
                const lineStyles =
                  station.line === "milestone"
                    ? {
                        borderGlow: "shadow-[0_0_20px_rgba(168,85,247,0.15)] border-purple-500/40 bg-purple-500/5",
                        pillBg: "bg-purple-500/10 text-purple-300 border-purple-500/20",
                        glowHex: "#a855f7",
                        trackText: "Purple Line",
                      }
                    : station.line === "team"
                    ? {
                        borderGlow: "shadow-[0_0_20px_rgba(245,158,11,0.15)] border-amber-500/40 bg-amber-500/5",
                        pillBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
                        glowHex: "#f59e0b",
                        trackText: "Amber Track (Core)",
                      }
                    : {
                        borderGlow: "shadow-[0_0_20px_rgba(6,180,212,0.15)] border-cyan-500/40 bg-cyan-500/5",
                        pillBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
                        glowHex: "#06b6d4",
                        trackText: "Cyan Extension",
                      };

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={station.id}
                    id={`station-card-${station.id}`}
                    onClick={() => setSelectedStation(isSelected ? null : station.id)}
                    className={`relative rounded-2xl border bg-[#11101c]/35 p-6 hover:bg-[#11101c]/55 transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                      isSelected
                        ? `${lineStyles.borderGlow} ring-1 ring-white/10 scale-[1.02] z-10`
                        : "border-white/5 hover:border-white/10"
                    }`}
                  >
                    {/* Track ribbon indicators on left edge */}
                    <div 
                      className="absolute top-0 bottom-0 left-0 w-1 rounded-l-2xl transition-all" 
                      style={{ 
                        backgroundColor: isSelected ? lineStyles.glowHex : "rgba(255,255,255,0.05)",
                        boxShadow: isSelected ? `0 0 10px ${lineStyles.glowHex}` : "none" 
                      }} 
                    />

                    <div>
                      {/* Header: Station Code & Line badge */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5">
                            STN-{station.id}
                          </span>
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${lineStyles.pillBg}`}>
                            {lineStyles.trackText}
                          </span>
                        </div>
                        
                        {/* Operational Status */}
                        <div className="flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                              station.status === "operational" ? "bg-emerald-400" : "bg-amber-400"
                            }`} />
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${
                              station.status === "operational" ? "bg-emerald-500" : "bg-amber-500"
                            }`} />
                          </span>
                          <span className="text-[9px] font-mono text-gray-400 capitalize">
                            {station.status}
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="space-y-2">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-white group-hover:border-white/20 transition-all">
                          <Icon className="w-4 h-4" style={{ color: lineStyles.glowHex }} />
                        </div>
                        <h4 className="text-base font-bold text-white tracking-tight group-hover:text-white transition-colors mt-3">
                          {station.title}
                        </h4>
                        {station.role && (
                          <p className="text-[11px] font-mono text-gray-300 font-medium">
                            {station.role}
                          </p>
                        )}
                        <p className="text-gray-400 text-[11px] leading-relaxed">
                          {station.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                      <span>{station.subtitle}</span>
                      <span className="text-gray-400 font-semibold">{station.year}</span>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
