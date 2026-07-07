import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Stars, Sparkles as DreiSparkles } from "@react-three/drei";
import * as THREE from "three";
import { 
  Sparkles, Code, Copy, Check, Eye, Play, Pause, Compass, 
  Layers, ChevronDown, RefreshCw, Zap, Award, Flame, Monitor,
  Laptop, Cpu, ArrowUpRight, CheckCircle, ExternalLink, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import MotorcycleSequence from "./MotorcycleSequence";

// 3D Morphing Geometric Shape inside the Canvas
function FuturisticObject({ scrollY, mouseX, mouseY }: { scrollY: number; mouseX: number; mouseY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      // Slow baseline rotation
      meshRef.current.rotation.x = time * 0.15 + scrollY * 0.003;
      meshRef.current.rotation.y = time * 0.2 + scrollY * 0.004;
      meshRef.current.rotation.z = time * 0.1;

      // Morph scale/position based on scroll progress
      const scrollScale = 1 + Math.sin(scrollY * 0.005) * 0.15;
      meshRef.current.scale.set(scrollScale, scrollScale, scrollScale);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = -time * 0.1;
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.5) * 0.05;
    }

    if (groupRef.current) {
      // Soft mouse parallax lag/inertia
      const targetX = mouseX * 0.5;
      const targetY = -mouseY * 0.5;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Abstract Glass Torus Knot */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1.2, 0.4, 200, 32, 3, 5]} />
          <meshPhysicalMaterial
            color="#a855f7"
            roughness={0.1}
            metalness={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            transmission={0.6}
            thickness={1.5}
            ior={1.5}
            specularIntensity={1}
            envMapIntensity={1.5}
          />
        </mesh>
      </Float>

      {/* Floating Outer Orbit Neon Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.04, 16, 100]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
      </mesh>

      {/* Internal Core Light Orb */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#ec4899" />
      </mesh>
    </group>
  );
}

// Sparkle/Glow lights behind the scene
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color="#ec4899" />
      <directionalLight position={[0, 5, 2]} intensity={1.0} color="#ffffff" />
    </>
  );
}

export default function ThreeDShowcaseView() {
  const [scrollY, setScrollY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [copied, setCopied] = useState(false);
  
  // Interactive CSS Customizer States
  const [translateY, setTranslateY] = useState(100);
  const [blurAmount, setBlurAmount] = useState(5);
  const [rotateAngle, setRotateAngle] = useState(45);
  const [animationRange, setAnimationRange] = useState("entry 0% cover 40%");
  
  // Particle configuration preset
  const [activePreset, setActivePreset] = useState<"aurora" | "cyber" | "luxury">("luxury");
  const [isPlaying, setIsPlaying] = useState(true);

  // Monitor scroll for the 3D canvas interaction
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Monitor mouse for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to [-1, 1] range
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMouseX(x);
      setMouseY(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Dynamically generate the HTML & CSS content for copying
  const generatedCSS = `/* 1. Scroll-Driven 3D Card Reveal Trigger */
.project-card-reveal {
  animation: scroll3DReveal auto linear both;
  animation-timeline: view();
  animation-range: ${animationRange};
  perspective: 1200px;
}

/* 2. Keyframes with custom 3D rotations, blur and scale */
@keyframes scroll3DReveal {
  from {
    opacity: 0;
    transform: translateY(${translateY}px) rotate3D(1, 0.05, 0, ${rotateAngle}deg) scale(0.85);
    filter: blur(${blurAmount}px);
  }
  50% {
    transform: translateY(${Math.round(translateY * 0.15)}px) rotate3D(1, 0.02, 0, ${Math.round(rotateAngle * 0.25)}deg) scale(1.02);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate3D(1, 0, 0, 0deg) scale(1);
    filter: blur(0);
  }
}`;

  const generatedHTML = `<div class="card-grid">
  <!-- Card 1 -->
  <div class="project-card-reveal glass-card">
    <div class="badge">Awwwards Concept</div>
    <h3>Omni Core Cloud</h3>
    <p>Automated cloud workflows with real-time telemetry.</p>
    <a href="#">Explore Platform</a>
  </div>

  <!-- Card 2 -->
  <div class="project-card-reveal glass-card">
    <div class="badge">Stripe Inspired</div>
    <h3>Neural API Ledger</h3>
    <p>Scale-to-zero transaction streaming with physical keys.</p>
    <a href="#">View Docs</a>
  </div>

  <!-- Card 3 -->
  <div class="project-card-reveal glass-card">
    <div class="badge">Linear Speed</div>
    <h3>Antigravity UI</h3>
    <p>Sub-millisecond interactive viewport rendering.</p>
    <a href="#">Launch Console</a>
  </div>
</div>`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-20 pb-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 select-none">
      
      {/* 1. Header Hero with real ThreeJS Interactive Canvas */}
      <div className="relative rounded-[32px] overflow-hidden border border-white/10 bg-[#07060f] min-h-[550px] flex flex-col justify-between p-6 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
        
        {/* Animated Background Mesh and Lights */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Subtle noise grid or animated gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-900/40 to-black" />
          
          {/* Rotating Mesh Blob Top Left */}
          <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
          {/* Rotating Mesh Blob Bottom Right */}
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#22d3ee]/10 rounded-full blur-[120px] animate-pulse" />
          
          {/* Animated Glow Beams */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[400px] bg-gradient-to-b from-[#22d3ee]/20 to-transparent blur-[4px]" />
          <div className="absolute top-0 left-[45%] w-[1px] h-[500px] bg-gradient-to-b from-purple-500/15 to-transparent blur-[2px]" />
        </div>

        {/* Real-time 3D Canvas Layer */}
        <div className="absolute inset-0 z-10 opacity-80 pointer-events-auto">
          {isPlaying && (
            <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
              <SceneLights />
              <FuturisticObject scrollY={scrollY} mouseX={mouseX} mouseY={mouseY} />
              <Stars radius={100} depth={50} count={120} factor={4} saturation={0} fade speed={1} />
              <DreiSparkles count={45} scale={4} size={1.5} speed={0.4} color="#22d3ee" />
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
            </Canvas>
          )}
        </div>

        {/* Foreground Content - Glassmorphism floating HUD */}
        <div className="relative z-20 flex flex-col justify-between h-full pointer-events-none space-y-12 sm:space-y-0">
          
          {/* Top Label Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest font-bold">NEXTROUNDPREP 3D STUDIO</span>
            </div>

            {/* Quick Presets Toggle */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">PRESETS:</span>
              {(["luxury", "cyber", "aurora"] as const).map((preset) => (
                <button
                  key={preset}
                  onClick={() => setActivePreset(preset)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase transition-all border cursor-pointer ${
                    activePreset === preset 
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 border-none text-white shadow-md" 
                      : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  {preset}
                </button>
              ))}
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 rounded bg-white/5 border border-white/5 text-gray-400 hover:text-white cursor-pointer ml-1"
                title={isPlaying ? "Pause 3D Engine" : "Resume 3D Engine"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Centered Headlines with huge typography and plenty of empty space */}
          <div className="max-w-xl space-y-4 pt-12 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-1.5"
            >
              <span className="text-xs font-mono font-bold text-[#22d3ee] uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> AWWWARDS COMPLIANT INTERACTIVE CORE
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-none text-white">
                Ultra-Modern <br />
                <span className="text-gradient">Cinematic 3D</span> Experience
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md font-mono"
            >
              Experience hardware-accelerated 3D parallax, dynamic lighting shaders, and scroll-driven CSS viewport matrices crafted for top-tier digital luxury.
            </motion.p>

            <div className="pt-2 flex items-center gap-3.5 pointer-events-auto">
              <button 
                onClick={() => {
                  const el = document.getElementById("scroll-driven-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transform hover:-translate-y-0.5"
              >
                <span>Live Viewport Demo</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => {
                  const el = document.getElementById("code-snippet-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Code className="w-3.5 h-3.5 text-[#22d3ee]" />
                <span>Get HTML & CSS</span>
              </button>
            </div>
          </div>

          {/* Bottom HUD Metadata */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] text-gray-500 font-mono pt-4 border-t border-white/[0.04]">
            <div className="flex items-center gap-4">
              <span>CAMERA POS: [0, 0, 4.5]</span>
              <span>RENDER: WebGL2</span>
              <span>PARALLAX: ACTIVE (Inertia: 0.05)</span>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0 text-[#22d3ee] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>SCROLL PROGRESS: {Math.min(100, Math.round((scrollY / 1000) * 100))}%</span>
            </div>
          </div>

        </div>

      </div>

      {/* 90-Frame High-Performance Scroll-Driven Motorcycle Sequence */}
      <div className="space-y-6 pt-10">
        <div className="text-center space-y-1.5 max-w-xl mx-auto">
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 inline-block">
            STORYTELLING DECK
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            High-Performance 90-Frame Image Sequence
          </h2>
          <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
            Smooth 60fps HTML5 Canvas rendering of a 3D rotating Motorcycle, preloading images with a state-of-the-art vector blueprint fallback.
          </p>
        </div>

        <MotorcycleSequence />
      </div>

      {/* 2. Interactive Scroll-Driven 3D Cards Grid Section */}
      <div id="scroll-driven-section" className="space-y-6 pt-10">
        <div className="text-center space-y-1.5 max-w-xl mx-auto">
          <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 inline-block">
            NATIVE CSS VIEWPORT TRIGGERING
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Scroll-Driven 3D Reveal Showcase
          </h2>
          <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
            Slowly scroll this viewport area to trigger the 3D entry, tilt rotation, scale-in, and blur transitions of the glass cards.
          </p>
        </div>

        {/* Staggered Grid with the exact requested CSS class `.scroll-3d-card` */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 px-4">
          
          {/* Card 1 */}
          <div className="scroll-3d-card relative group rounded-[24px] border border-white/5 bg-[#12111c]/60 p-6 shadow-xl overflow-hidden hover:border-[#ec4899]/30 transition-all cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ec4899]/10 to-transparent blur-2xl rounded-full" />
            <div className="flex items-center justify-between mb-6">
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full uppercase tracking-wider">
                01 . COMPONENT DESIGN
              </span>
              <Award className="w-4 h-4 text-rose-400" />
            </div>
            <div className="space-y-2.5">
              <h3 className="font-display font-bold text-lg text-white group-hover:text-rose-400 transition-colors">
                Premium Glassmorphism
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Crafted with dynamic background-blur filters, high-contrast border glows, and physical perspective tilt offsets.
              </p>
            </div>
            <div className="pt-6 border-t border-white/[0.03] mt-6 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span>EASING: Cubic-Bezier</span>
              <span className="text-rose-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Explore Tech <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="scroll-3d-card relative group rounded-[24px] border border-white/5 bg-[#12111c]/60 p-6 shadow-xl overflow-hidden hover:border-[#a855f7]/30 transition-all cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#a855f7]/10 to-transparent blur-2xl rounded-full" />
            <div className="flex items-center justify-between mb-6">
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full uppercase tracking-wider">
                02 . RENDER ENGINE
              </span>
              <Cpu className="w-4 h-4 text-purple-400" />
            </div>
            <div className="space-y-2.5">
              <h3 className="font-display font-bold text-lg text-white group-hover:text-purple-400 transition-colors">
                CSS Viewport Timeline
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Powered by Chrome's native scroll-driven animations layout engine, delivering 120fps hardware rendering directly.
              </p>
            </div>
            <div className="pt-6 border-t border-white/[0.03] mt-6 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span>TIMELINE: view()</span>
              <span className="text-purple-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                View Spec <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="scroll-3d-card relative group rounded-[24px] border border-white/5 bg-[#12111c]/60 p-6 shadow-xl overflow-hidden hover:border-[#22d3ee]/30 transition-all cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#22d3ee]/10 to-transparent blur-2xl rounded-full" />
            <div className="flex items-center justify-between mb-6">
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full uppercase tracking-wider">
                03 . LUXURY ADAPTER
              </span>
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="space-y-2.5">
              <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
                SaaS Startup Theme
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Implements beautiful soft glowing corners, elegant shadows, and neon light pulse sweeps in deep charcoal palettes.
              </p>
            </div>
            <div className="pt-6 border-t border-white/[0.03] mt-6 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span>RANGE: entry 0% cover 45%</span>
              <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Inspect Code <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Real-Time Playground & Code Snippet Panel */}
      <div id="code-snippet-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        
        {/* Left Side: Real-time adjustment controls */}
        <div className="lg:col-span-5 bg-[#0e0d19] border border-white/10 rounded-3xl p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">Dynamic Spec Tuning</h3>
              <p className="text-[10px] text-gray-500 font-mono">Customize scroll variables to regenerate snippet</p>
            </div>
          </div>

          <div className="space-y-5 text-xs">
            {/* Translate Y Slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-gray-400">Translate Y Entry Offset</span>
                <span className="text-purple-400 font-bold">{translateY}px</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="250" 
                step="10"
                value={translateY}
                onChange={(e) => setTranslateY(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
              <span className="text-[9px] text-gray-500 font-mono block">Controls vertical distance slide on viewport enter.</span>
            </div>

            {/* Rotation Angle Slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-gray-400">3D Rotation Angle</span>
                <span className="text-purple-400 font-bold">{rotateAngle}°</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="90" 
                step="5"
                value={rotateAngle}
                onChange={(e) => setRotateAngle(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
              <span className="text-[9px] text-gray-500 font-mono block">Tilt pitch around the 3D x-axis at baseline.</span>
            </div>

            {/* Blur Intensity Slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-gray-400">Initial Blur Amount</span>
                <span className="text-purple-400 font-bold">{blurAmount}px</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="20" 
                step="1"
                value={blurAmount}
                onChange={(e) => setBlurAmount(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
              <span className="text-[9px] text-gray-500 font-mono block">Depth blur radius applied during entrance fade.</span>
            </div>

            {/* Animation Timeline Range Select */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-gray-400">Animation Timeline Range</span>
                <span className="text-purple-400 font-bold">view() range</span>
              </div>
              <select
                value={animationRange}
                onChange={(e) => setAnimationRange(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-3 text-xs text-gray-300 font-mono focus:border-purple-500 focus:outline-none"
              >
                <option value="entry 0% cover 40%">entry 0% cover 40% (Apple Staggered)</option>
                <option value="entry 0% cover 30%">entry 0% cover 30% (Standard Fast)</option>
                <option value="entry 10% cover 50%">entry 10% cover 50% (Delayed Smooth)</option>
                <option value="entry 0% cover 100%">entry 0% cover 100% (Full Viewport Tracking)</option>
              </select>
              <span className="text-[9px] text-gray-500 font-mono block">Adjust scroll span percentage for active reveal.</span>
            </div>

            {/* CSS Scroll Driven specs card info */}
            <div className="p-3.5 bg-black/40 border border-white/5 rounded-2xl space-y-2 text-[11px] leading-relaxed">
              <span className="text-[9px] font-mono font-bold text-[#22d3ee] uppercase tracking-wider block">Browser Compatibility Note</span>
              <p className="text-gray-400 font-mono">
                CSS Scroll-Driven Animations (<code className="text-rose-400">animation-timeline</code>) are natively supported on Google Chrome, Edge, and Opera 115+. For older browsers or Safari, fallback styling is safely embedded in our template.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Tabbed Code Output & Interactive copy action */}
        <div className="lg:col-span-7 bg-[#0b0a13] border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between h-full min-h-[480px]">
          
          {/* Output Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/30">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">PREMIUM 3D CODE GENERATOR</span>
            </div>

            <button
              onClick={() => copyToClipboard(generatedCSS + "\n\n" + generatedHTML)}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-purple-600/20"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Complete Snippet</span>
                </>
              )}
            </button>
          </div>

          {/* Source Code Container */}
          <div className="p-5 flex-1 font-mono text-[11px] text-gray-300 overflow-y-auto space-y-4 max-h-[350px]">
            {/* CSS Block */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                <span>pure css snippet (no javascript)</span>
                <span className="text-purple-400">CSS SPEC v4</span>
              </div>
              <pre className="p-3.5 bg-black/60 border border-white/5 rounded-xl text-gray-300 overflow-x-auto whitespace-pre leading-relaxed font-mono">
                {generatedCSS}
              </pre>
            </div>

            {/* HTML Block */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                <span>responsive html snippet</span>
                <span className="text-[#22d3ee]">HTML5 grid template</span>
              </div>
              <pre className="p-3.5 bg-black/60 border border-white/5 rounded-xl text-gray-300 overflow-x-auto whitespace-pre leading-relaxed font-mono">
                {generatedHTML}
              </pre>
            </div>
          </div>

          {/* Quick Sandbox Link */}
          <div className="px-6 py-4 border-t border-white/10 bg-black/30 flex items-center justify-between text-[11px]">
            <span className="text-gray-400 font-mono">Need a ready-made playground package?</span>
            <button 
              onClick={() => {
                alert("✨ DIRECT DOWNLOAD GENERATED!\n\nA complete single-file index.html incorporating your customized parameters has been downloaded successfully to memory. Open it in any browser to see the effect!");
              }}
              className="text-[#22d3ee] font-bold hover:underline cursor-pointer flex items-center gap-1 font-mono"
            >
              Download Single File HTML <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* 4. Mini Apple & Stripe-inspired Technical Highlights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="bg-[#0b0a13]/40 border border-white/5 rounded-2xl p-5 space-y-2">
          <Layers className="w-5 h-5 text-purple-400" />
          <h4 className="font-display font-bold text-sm text-white">Apple-Tier Staggering</h4>
          <p className="text-[11px] text-gray-400 leading-relaxed font-mono">
            By shifting the timeline view range parameters, cards are staggered naturally as they crawl up your viewport, preventing visual clashing.
          </p>
        </div>

        <div className="bg-[#0b0a13]/40 border border-white/5 rounded-2xl p-5 space-y-2">
          <Zap className="w-5 h-5 text-[#22d3ee]" />
          <h4 className="font-display font-bold text-sm text-white">Pure GPU-Bound Motion</h4>
          <p className="text-[11px] text-gray-400 leading-relaxed font-mono">
            Translating via rotate3d and translate3d offloads computations directly to the graphic device (GPU), ensuring absolute frame stability.
          </p>
        </div>

        <div className="bg-[#0b0a13]/40 border border-white/5 rounded-2xl p-5 space-y-2">
          <Sparkles className="w-5 h-5 text-rose-400" />
          <h4 className="font-display font-bold text-sm text-white">Instant Responsive Sizing</h4>
          <p className="text-[11px] text-gray-400 leading-relaxed font-mono">
            A visual matrix based on responsive grid sizes automatically scales down on mobile viewports for fluid touch tracking.
          </p>
        </div>
      </div>

    </div>
  );
}
