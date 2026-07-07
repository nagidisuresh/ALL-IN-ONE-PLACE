import React, { useState, useEffect, useRef } from "react";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink, 
  Sparkles, 
  Award, 
  Code, 
  Layers, 
  Cpu, 
  Check, 
  Settings, 
  Edit3, 
  Sliders, 
  RefreshCw,
  Clock,
  Volume2
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Mini internal 3D scene specifically for the Portfolio Header
function FloatingConstellation() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.rotation.x = time * 0.03;
    }
    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.y += Math.sin(time + i) * 0.002;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Central glowing core */}
      <mesh>
        <dodecahedronGeometry args={[0.8, 1]} />
        <meshPhysicalMaterial
          color="#b94fff"
          emissive="#ff2d78"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
          transmission={0.6}
          thickness={1}
        />
      </mesh>
      {/* Tiny orbital particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 1.6 + Math.sin(i) * 0.4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 0.8;

        return (
          <mesh
            key={i}
            ref={(el) => {
              if (el) meshRefs.current[i] = el;
            }}
            position={[x, y, z]}
          >
            <sphereGeometry args={[0.08 + Math.random() * 0.08, 16, 16]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#00f5ff" : "#ff2d78"}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function PortfolioView() {
  // Customizable State for Interactive Simulation
  const [name, setName] = useState("Alex Thorne");
  const [role, setRole] = useState("Interactive Developer");
  const [tagline, setTagline] = useState("Forging immersive 3D spatial environments and ultra-responsive real-time web systems at the intersection of design & computation.");
  const [freelanceStatus, setFreelanceStatus] = useState("AVAILABLE FOR FREELANCE PARTNERSHIPS");
  
  // Stats counters
  const [statExp, setStatExp] = useState("5+ Years");
  const [statProjects, setStatProjects] = useState("48 Finished");
  const [statSatisfaction, setStatSatisfaction] = useState("99.8%");
  const [statAwards, setStatAwards] = useState("12 Design");

  const [activeTab, setActiveTab] = useState("preview"); // "preview" or "config"
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Cursor position tracking state for the custom premium lagging cursor glow
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorStyle, setCursorStyle] = useState({ left: "50%", top: "50%" });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Soft lagging effect for luxurious cursor glide
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorStyle((prev) => {
        const currentX = parseFloat(prev.left) || 0;
        const currentY = parseFloat(prev.top) || 0;
        const dx = cursorPos.x - currentX;
        const dy = cursorPos.y - currentY;
        return {
          left: `${currentX + dx * 0.15}px`,
          top: `${currentY + dy * 0.15}px`
        };
      });
    }, 16);
    return () => clearInterval(interval);
  }, [cursorPos]);

  // Skill state
  const skills = [
    { name: "UI/UX Architecture", level: "94%", color: "#b94fff", desc: "Crafting beautiful semantic interfaces built around pixel-perfect grid layouts.", icon: Cpu },
    { name: "3D Spatial WebGL", level: "88%", color: "#00f5ff", desc: "Compiling optimized physical textures, custom vertex shaders & glTF systems.", icon: Sparkles },
    { name: "Frontend Engineering", level: "96%", color: "#ff2d78", desc: "Developing declarative component trees with robust state handling and routing.", icon: Code },
    { name: "Fluid Motion Physics", level: "90%", color: "#a855f7", desc: "Programming non-blocking reactive easing transitions and interactive kinetics.", icon: Layers }
  ];

  // Projects state
  const projects = [
    {
      id: "proj-nebula",
      title: "Nebula Analytics",
      category: "REAL-TIME METRICS",
      gradient: "from-[#b94fff]/20 to-[#a855f7]/40",
      glowColor: "rgba(185,79,255,0.4)",
      tags: ["Three.js", "GSAP", "React"],
      desc: "An immersive spatial computing metrics platform using physical camera pans and real-time state streams."
    },
    {
      id: "proj-cipher",
      title: "CipherAI Studio",
      category: "CREATIVE COMPUTATION",
      gradient: "from-[#00f5ff]/20 to-[#06b6d4]/40",
      glowColor: "rgba(0,245,255,0.4)",
      tags: ["WebGL", "AI/ML", "TypeScript"],
      desc: "Optimized multi-threaded AI execution layout featuring fluid node mapping and volumetric glows."
    },
    {
      id: "proj-voidspace",
      title: "VoidSpace XR",
      category: "SPATIAL INTERACTIVE",
      gradient: "from-[#ff2d78]/20 to-[#ec4899]/40",
      glowColor: "rgba(255,45,120,0.4)",
      tags: ["WebXR", "Three.js", "GLSL"],
      desc: "Stereoscopic 3D browser space utilizing custom noise shaders, post-processing shaders & ambient lighting."
    }
  ];

  // Experience timeline state
  const experience = [
    {
      date: "2024 - PRESENT",
      role: "Lead Creative Technologist",
      company: "Aetheria Interactive",
      desc: "Spearheaded WebGL visual assets pipelines, reducing bundle delivery payloads by 42% through optimized DRACO compression. Directed development of scalable visual telemetry panels."
    },
    {
      date: "2022 - 2024",
      role: "Senior Frontend Engineer",
      company: "SynthLabs AI",
      desc: "Built reactive web applications running complex model parameters. Designed high-performance SVG animations and integrated low-level custom canvas audio visualizations."
    },
    {
      date: "2021 - 2022",
      role: "UX & Interactive Designer",
      company: "Nexus Digital Studio",
      desc: "Constructed responsive grid systems and established a centralized atomic design library, accelerating development delivery rate by 35% across multidisciplinary engineering teams."
    }
  ];

  return (
    <div className="w-full relative py-6 px-4 sm:px-10 max-w-[1400px] mx-auto space-y-8 select-none">
      
      {/* Absolute lagging cursor glow layer behind contents */}
      <div 
        className="fixed pointer-events-none w-[350px] h-[350px] bg-gradient-to-tr from-[#b94fff]/10 to-[#00f5ff]/10 rounded-full filter blur-[100px] -translate-x-1/2 -translate-y-1/2 z-0 opacity-70 transition-opacity duration-500"
        style={cursorStyle}
      />

      {/* Main interactive header introducing the designer workspace */}
      <div className="relative z-10 glass-card rounded-[24px] p-6 sm:p-8 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#b94fff]/15 to-transparent rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#00f5ff] uppercase tracking-widest font-bold">LIVE STYLER & PORTFOLIO COMPILER</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
            Deploy Dark Futuristic Portfolio Aesthetics
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            Customize coordinates below in real-time, then preview your physical portfolio layout immediately. Use this blueprint prompt or export directly into production.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 md:flex-none px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl border transition-all flex items-center justify-center gap-2 ${
              activeTab === "preview" 
                ? "bg-accent-gradient text-white border-transparent shadow-[0_0_15px_rgba(168,85,247,0.3)]" 
                : "bg-[#11101c]/80 text-gray-400 border-white/5 hover:text-white"
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#00f5ff]" />
            Interactive Preview
          </button>
          
          <button
            onClick={() => setActiveTab("config")}
            className={`flex-1 md:flex-none px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl border transition-all flex items-center justify-center gap-2 ${
              activeTab === "config" 
                ? "bg-accent-gradient text-white border-transparent shadow-[0_0_15px_rgba(168,85,247,0.3)]" 
                : "bg-[#11101c]/80 text-gray-400 border-white/5 hover:text-white"
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-[#ff2d78]" />
            Compiler Settings
          </button>
        </div>
      </div>

      {/* Compiler Configurations Panel */}
      {activeTab === "config" && (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {/* Identity Parameters */}
          <div className="glass-card rounded-[22px] p-6 border border-white/5 space-y-4">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-3">
              <Edit3 className="w-4 h-4 text-[#b94fff]" /> Identity & Headline Specs
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Developer / Creator Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 focus:border-[#b94fff]/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Primary Role Headline</label>
                <input 
                  type="text" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 focus:border-[#00f5ff]/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Sub-Headline Tagline</label>
                <textarea 
                  rows={3}
                  value={tagline} 
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 focus:border-[#ff2d78]/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none transition-all leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Pulsing Status Banner Text</label>
                <input 
                  type="text" 
                  value={freelanceStatus} 
                  onChange={(e) => setFreelanceStatus(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 focus:border-[#b94fff]/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none transition-all font-mono text-xs"
                />
              </div>
            </div>
          </div>

          {/* Metrics Parameters */}
          <div className="glass-card rounded-[22px] p-6 border border-white/5 space-y-4">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-3">
              <Sliders className="w-4 h-4 text-[#00f5ff]" /> Volumetric Analytics Specs
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Experience Stat</label>
                <input 
                  type="text" 
                  value={statExp} 
                  onChange={(e) => setStatExp(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 focus:border-white/20 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Projects Stat</label>
                <input 
                  type="text" 
                  value={statProjects} 
                  onChange={(e) => setStatProjects(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 focus:border-white/20 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Satisfaction Rate</label>
                <input 
                  type="text" 
                  value={statSatisfaction} 
                  onChange={(e) => setStatSatisfaction(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 focus:border-white/20 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Awards Recieved</label>
                <input 
                  type="text" 
                  value={statAwards} 
                  onChange={(e) => setStatAwards(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 focus:border-white/20 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="bg-[#0e0e1a]/80 border border-white/5 rounded-2xl p-4 space-y-2 mt-4">
              <span className="text-[9px] font-mono text-[#ff2d78] uppercase tracking-widest font-bold block">Developer Prompt Quick-Export</span>
              <p className="text-[11px] text-gray-400 leading-relaxed font-mono">
                The parameters configured here dynamically populate variables in the layout system below, enabling custom visual deployments instantly.
              </p>
              <button 
                onClick={() => {
                  setName("AX.DEV");
                  setRole("Volumetric Architect");
                  setTagline("Compiling photorealistic custom vertex shaders, low-latency node networks, and spatial UX canvases.");
                  setFreelanceStatus("SYSTEM STATUS: SECURED & ACTIVE");
                  setStatExp("8+ Years");
                  setStatProjects("100+ Live");
                  setStatSatisfaction("100.0%");
                  setStatAwards("20 Gold");
                }}
                className="mt-2 text-[9px] font-mono font-bold uppercase tracking-wider text-[#00f5ff] hover:underline flex items-center gap-1.5"
              >
                <RefreshCw className="w-3 h-3" /> Restore Elite Presets
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Core Preview Container */}
      <div className="relative z-10 w-full bg-[#04040f] border border-white/5 rounded-[28px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
        
        {/* Visual Radial Glow Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[350px] bg-gradient-to-b from-[#b94fff]/10 to-transparent rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-[5%] w-[400px] h-[400px] bg-[#00f5ff]/5 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[5%] left-[5%] w-[400px] h-[400px] bg-[#ff2d78]/5 rounded-full filter blur-[120px] pointer-events-none" />

        {/* Grid Overlay Layer */}
        <div className="absolute inset-0 bg-grid-sci-fi pointer-events-none opacity-40" />

        {/* Floating background decorative blobs mimicking prompts */}
        <div className="absolute top-24 right-16 w-80 h-80 bg-[#b94fff]/5 rounded-full filter blur-[80px] pointer-events-none animate-float" />
        <div className="absolute bottom-96 left-12 w-64 h-64 bg-[#00f5ff]/5 rounded-full filter blur-[80px] pointer-events-none animate-float" style={{ animationDelay: "-3s" }} />

        {/* 1. HERO SECTION */}
        <div className="relative py-20 px-6 sm:px-12 md:py-32 flex flex-col items-center justify-center text-center border-b border-white/5 overflow-hidden">
          
          {/* Subtle Live 3D Particle Constellation behind Hero Content */}
          <div className="absolute inset-0 pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 3.5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]} intensity={1.5} color="#b94fff" />
              <FloatingConstellation />
            </Canvas>
          </div>

          <div className="max-w-3xl space-y-6 relative z-10">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(185,79,255,0.07)] border border-[rgba(185,79,255,0.18)] text-white shadow-lg shadow-black/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono tracking-wider uppercase font-semibold text-gray-200">
                {freelanceStatus}
              </span>
            </div>

            {/* Immersive Title Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight text-white leading-[1.05]">
              <span className="block font-sans font-light opacity-80">Design Meet</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b94fff] via-[#ff2d78] to-[#00f5ff] font-sans font-black block mt-2">
                {role}.
              </span>
            </h1>

            {/* Headline Subtitle description */}
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto font-sans">
              {tagline}
            </p>

            {/* Direct Interactive Call to action actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#b94fff] to-[#ff2d78] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_30px_rgba(185,79,255,0.4)] hover:shadow-[0_0_50px_rgba(185,79,255,0.6)] hover:-translate-y-0.5 transition-all cursor-pointer">
                Initialize Case Studies
              </button>
              <button className="px-6 py-3 rounded-xl bg-[rgba(185,79,255,0.05)] border border-[rgba(185,79,255,0.18)] hover:border-[#00f5ff]/40 text-gray-300 hover:text-white font-mono text-xs uppercase tracking-wider font-bold transition-all hover:bg-[#00f5ff]/5 cursor-pointer">
                Establish Connection
              </button>
            </div>

            {/* High end stats grid with subtle inline borders */}
            <div className="border-t border-white/5 pt-10 mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-4xl mx-auto">
              <div className="p-2 space-y-1">
                <p className="text-2xl sm:text-3xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-[#b94fff] to-[#ff2d78]">{statExp}</p>
                <p className="text-[9px] font-mono uppercase tracking-widest text-gray-500">EXPERIENCE MATRIX</p>
              </div>
              <div className="p-2 space-y-1 border-l border-white/5">
                <p className="text-2xl sm:text-3xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-[#ff2d78] to-[#00f5ff]">{statProjects}</p>
                <p className="text-[9px] font-mono uppercase tracking-widest text-gray-500">PROJECTS BUILT</p>
              </div>
              <div className="p-2 space-y-1 md:border-l border-white/5">
                <p className="text-2xl sm:text-3xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] to-[#b94fff]">{statSatisfaction}</p>
                <p className="text-[9px] font-mono uppercase tracking-widest text-gray-500">CLIENT METRIC</p>
              </div>
              <div className="p-2 space-y-1 border-l border-white/5">
                <p className="text-2xl sm:text-3xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-[#b94fff] to-[#00f5ff]">{statAwards}</p>
                <p className="text-[9px] font-mono uppercase tracking-widest text-gray-500">HONOR MATRIX</p>
              </div>
            </div>

          </div>
        </div>

        {/* 2. SKILLS / EXPERTISE SECTION */}
        <div className="py-20 px-6 sm:px-12 border-b border-white/5 relative">
          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* Header */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#b94fff] uppercase tracking-widest font-bold">SECTION 02 // MODULES</span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">Core Expertise Core</h3>
            </div>

            {/* Skills auto layout cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, i) => {
                const IconComponent = skill.icon;
                return (
                  <div 
                    key={i} 
                    className="group relative bg-[#0a0a1e] border border-white/5 rounded-2xl p-6 hover:-translate-y-1.5 transition-all duration-300 hover:border-white/15 overflow-hidden shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  >
                    {/* Glowing color gradient background */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 10%, ${skill.color}15, transparent 60%)`
                      }}
                    />

                    {/* Left top subtle marker mimicking prompts */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b94fff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10 space-y-4">
                      {/* Icon */}
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/5"
                        style={{ backgroundColor: `${skill.color}10` }}
                      >
                        <IconComponent className="w-5 h-5" style={{ color: skill.color }} />
                      </div>

                      {/* Info */}
                      <div className="space-y-1">
                        <p className="text-white text-sm font-bold tracking-tight">{skill.name}</p>
                        <p className="text-gray-400 text-xs leading-relaxed">{skill.desc}</p>
                      </div>

                      {/* Level loading indicator bar */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-gray-500">LEVEL</span>
                          <span style={{ color: skill.color }} className="font-bold">{skill.level}</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-1000 group-hover:animate-pulse"
                            style={{ 
                              width: skill.level,
                              background: `linear-gradient(90deg, ${skill.color}, #ffffff)`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* 3. PROJECTS GRID SECTION */}
        <div className="py-20 px-6 sm:px-12 border-b border-white/5 relative">
          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* Header */}
            <div className="space-y-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#00f5ff] uppercase tracking-widest font-bold">SECTION 03 // SHOWCASE</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">Active Deployments</h3>
              </div>
              <p className="text-gray-400 text-xs max-w-xs leading-relaxed">
                Featured volumetric case study records executed under physical glass shader specifications.
              </p>
            </div>

            {/* Projects Grid auto layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((proj, i) => (
                <div 
                  key={i}
                  onClick={() => setSelectedProject(selectedProject === proj.id ? null : proj.id)}
                  className={`group bg-[#0a0a1e] border border-white/5 rounded-[22px] overflow-hidden hover:-translate-y-1.5 transition-all duration-300 cursor-pointer hover:border-white/10 ${
                    selectedProject === proj.id ? "ring-2 ring-[#00f5ff]/50" : ""
                  }`}
                >
                  {/* Thumbnail stage container */}
                  <div className={`h-48 w-full bg-gradient-to-tr ${proj.gradient} relative overflow-hidden flex items-center justify-center border-b border-white/5`}>
                    
                    {/* Grid backing */}
                    <div className="absolute inset-0 bg-grid-sci-fi opacity-20 pointer-events-none" />

                    {/* Glowing core simulating radial accent */}
                    <div 
                      className="absolute w-24 h-24 rounded-full filter blur-xl transition-all duration-500 group-hover:scale-125"
                      style={{ backgroundColor: proj.glowColor }}
                    />

                    {/* Absolute label */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[9px] font-mono tracking-widest text-white uppercase">
                      {proj.category}
                    </div>

                    <Code className="w-8 h-8 text-white relative z-10 opacity-60 group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Project Info details */}
                  <div className="p-6 space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[9px] font-mono font-bold bg-[#11101c] border border-white/5 text-gray-400 px-2.5 py-1 rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-white text-base font-bold tracking-tight">{proj.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{proj.desc}</p>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold">
                      <span className="text-[#00f5ff] group-hover:underline">Explore System Structure</span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic Interactive Drawer Case study info */}
            {selectedProject && (
              <div className="glass-card rounded-[22px] p-6 border border-[#00f5ff]/20 bg-[#070714] space-y-3 relative animate-fade-in z-20">
                <div className="absolute top-3 right-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                    className="text-gray-400 hover:text-white text-xs font-mono"
                  >
                    [ CLOSE DISPATCH ]
                  </button>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#ff2d78] font-bold">SYSTEM TELEMETRY DETAIL REGISTERED</span>
                  <h4 className="text-white text-lg font-bold font-display">
                    {projects.find(p => p.id === selectedProject)?.title} Execution
                  </h4>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed">
                  The volumetric layout compiled successfully. Utilizing high-frequency custom noise shaders and absolute matrix position offsets for optimized visual output rendering on modern mobile and desktop screens. Perfect real-time integration coordinates secured.
                </p>
                <div className="pt-2 flex items-center gap-4 text-[10px] font-mono text-[#00f5ff]">
                  <span>LATENCY: 14MS</span>
                  <span>FPS: 120 FPS</span>
                  <span>PBR SHADERS: COMPLIANT</span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* 4. EXP TIMELINE SECTION */}
        <div className="py-20 px-6 sm:px-12 border-b border-white/5 relative">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Header */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#ff2d78] uppercase tracking-widest font-bold">SECTION 04 // TIMELINE</span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">System Deployments</h3>
            </div>

            {/* Vertical timeline */}
            <div className="relative pl-8 sm:pl-12 border-l border-white/5 space-y-12">
              
              {experience.map((exp, i) => (
                <div key={i} className="relative space-y-2 group">
                  
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[39px] sm:-left-[55px] top-1.5 w-[14px] h-[14px] bg-[#04040f] border-2 border-[#b94fff] rounded-full group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(185,79,255,0.8)]" />

                  {/* Time date badge */}
                  <span className="text-[10px] font-mono font-bold text-[#ff2d78] tracking-widest">
                    {exp.date}
                  </span>

                  <div className="space-y-1">
                    <h4 className="text-white text-base font-bold tracking-tight group-hover:text-[#00f5ff] transition-colors">
                      {exp.role}
                    </h4>
                    <p className="text-[#00f5ff] text-xs font-mono font-bold">
                      {exp.company}
                    </p>
                  </div>

                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
                    {exp.desc}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </div>

        {/* 5. CONTACT SECTION */}
        <div className="py-20 px-6 sm:px-12 relative overflow-hidden">
          
          {/* Internal Top Gradient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#b94fff]/20 rounded-full filter blur-[60px] pointer-events-none" />

          <div className="glass-card rounded-[24px] max-w-3xl mx-auto p-8 sm:p-12 border border-white/5 bg-[#0a0a1e]/90 relative z-10 text-center space-y-6">
            <span className="text-[10px] font-mono text-[#00f5ff] uppercase tracking-widest font-bold">SECTION 05 // ACTION</span>
            
            <h3 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight leading-snug">
              Ready to construct <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b94fff] via-[#ff2d78] to-[#00f5ff]">something elite?</span>
            </h3>

            <p className="text-gray-400 text-xs leading-relaxed max-w-md mx-auto">
              Our interactive pipelines are secured for high-volume partnerships. Initiate a secure protocol dispatch below.
            </p>

            <div className="pt-4">
              <a 
                href="mailto:nagidisuresh5727@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#b94fff] to-[#ff2d78] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(185,79,255,0.3)] hover:shadow-[0_0_40px_rgba(185,79,255,0.5)] transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                INITIATE DIRECT PROTOCOL DISPATCH
              </a>
            </div>

            {/* Social Grid block */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-white/5">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[rgba(185,79,255,0.03)] hover:bg-[rgba(185,79,255,0.08)] border border-white/5 hover:border-[#b94fff]/40 rounded-xl transition-all font-mono text-xs text-gray-300 hover:text-white"
              >
                <Github className="w-4 h-4 text-white" />
                <span>GITHUB</span>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[rgba(185,79,255,0.03)] hover:bg-[rgba(185,79,255,0.08)] border border-white/5 hover:border-[#00f5ff]/40 rounded-xl transition-all font-mono text-xs text-gray-300 hover:text-white"
              >
                <Linkedin className="w-4 h-4 text-[#00f5ff]" />
                <span>LINKEDIN</span>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[rgba(185,79,255,0.03)] hover:bg-[rgba(185,79,255,0.08)] border border-white/5 hover:border-[#ff2d78]/40 rounded-xl transition-all font-mono text-xs text-gray-300 hover:text-white"
              >
                <Twitter className="w-4 h-4 text-[#ff2d78]" />
                <span>TWITTER</span>
              </a>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
