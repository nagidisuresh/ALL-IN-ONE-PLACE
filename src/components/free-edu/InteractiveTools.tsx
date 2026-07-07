import React, { useState } from "react";
import { Sparkles, Sliders, ExternalLink, Globe, Play, Info } from "lucide-react";

interface Simulation {
  name: string;
  category: "Physics" | "Mathematics" | "Space" | "Music";
  description: string;
  url: string;
  creator: string;
}

export default function InteractiveTools() {
  // SVG sine wave graphing state
  const [amplitude, setAmplitude] = useState(40);
  const [frequency, setFrequency] = useState(2);
  const [phase, setPhase] = useState(0);

  const simulations: Simulation[] = [
    {
      name: "PhET Interactive Science Simulations",
      category: "Physics",
      description: "Run game-like visual simulations to explore climate physics, natural forces, laser reflections, molecular binding, and electricity grids.",
      url: "https://phet.colorado.edu",
      creator: "University of Colorado Boulder"
    },
    {
      name: "GeoGebra 3D Grapher & Geometry",
      category: "Mathematics",
      description: "Plot dynamic 3D planes, vectors, spheres, and solve geometric proofs interactively inside your browser window.",
      url: "https://www.geogebra.org/3d",
      creator: "International GeoGebra Association"
    },
    {
      name: "Stellarium Astronomy Web",
      category: "Space",
      description: "An absolute masterpiece. A real-time 3D interactive planetarium. Pinpoint stars, nebulae, satellite orbits, and constellations from your exact latitude.",
      url: "https://stellarium-web.org",
      creator: "Stellarium Team"
    },
    {
      name: "Chrome Music Lab (Wave Sandbox)",
      category: "Music",
      description: "Explore the physics of sound. Map harmonics, visualize sound frequencies, draw musical sketches, and experiment with audio oscillators.",
      url: "https://musiclab.chromeexperiments.com",
      creator: "Google Creative Lab"
    },
    {
      name: "Desmos Functional Grapher",
      category: "Mathematics",
      description: "An incredibly fast, modern 2D graphing engine. Input equations and see curves, points, limits, and slopes plot instantly.",
      url: "https://www.desmos.com/calculator",
      creator: "Desmos Studio"
    }
  ];

  // Generate SVG path for the active graphing sandbox
  const generateSineWavePath = () => {
    let points = [];
    const width = 500;
    const height = 150;
    const centerY = height / 2;

    for (let x = 0; x <= width; x++) {
      // y = sin(x * freq + phase) * amp
      const angle = (x / width) * Math.PI * 2 * frequency + (phase * Math.PI) / 180;
      const y = centerY + Math.sin(angle) * amplitude;
      points.push(`${x},${y}`);
    }

    return `M ${points.join(" L ")}`;
  };

  return (
    <div className="w-full space-y-12">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-purple-500/10 via-cyan-500/5 to-transparent rounded-3xl p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/20 text-xs font-mono text-purple-300 mb-4">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>Hands-on Visual Laboratories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Interactive Simulations & Visual Tools
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2 leading-relaxed">
            Move beyond dry textbooks. Interact with math curves, atomic cells, sound frequencies, and stars using browser-based visual simulation platforms requiring absolutely no installation or sign-ups.
          </p>
        </div>
      </div>

      {/* Grid: Graphing Sandbox & Curated Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive math curve slider sandbox (7 cols) */}
        <div className="lg:col-span-7 bg-[#11101c]/45 rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sliders className="w-5 h-5 text-cyan-400 animate-spin-slow" />
              <h3 className="text-base font-bold text-white tracking-tight">Wave Mechanics Mathematical Sandbox</h3>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              Interact with trig vectors in real-time. Slide the controls below to mutate amplitude, frequency, and phase parameters of a sine wave, and see the dynamic SVG graph update instantly.
            </p>

            {/* SVG Plot view */}
            <div className="relative bg-[#07070d] rounded-2xl p-4 border border-white/10 overflow-hidden">
              <div className="absolute top-2 left-2 text-[9px] font-mono text-gray-500">
                Formula: f(x) = {amplitude} · sin({frequency}x + {phase}°)
              </div>
              
              <svg className="w-full h-36 mt-4" viewBox="0 0 500 150">
                {/* Grid guidelines */}
                <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.08)" strokeDasharray="4" />
                <line x1="250" y1="0" x2="250" y2="150" stroke="rgba(255,255,255,0.08)" strokeDasharray="4" />
                
                {/* Sine wave path */}
                <path 
                  d={generateSineWavePath()} 
                  fill="none" 
                  stroke="url(#wave-gradient)" 
                  strokeWidth="2.5" 
                />

                {/* Gradients */}
                <defs>
                  <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Interactive sliders */}
            <div className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                  <span>Amplitude (Wave Height)</span>
                  <span className="text-cyan-400">{amplitude}px</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="70" 
                  value={amplitude} 
                  onChange={(e) => setAmplitude(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                  <span>Frequency (Cycles)</span>
                  <span className="text-purple-400">{frequency} Hz</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="6" 
                  step="0.5"
                  value={frequency} 
                  onChange={(e) => setFrequency(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                  <span>Phase shift</span>
                  <span className="text-pink-400">{phase}°</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  value={phase} 
                  onChange={(e) => setPhase(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Curated high-quality visual platforms (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#11101c]/45 rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-bold text-white tracking-tight">Worldwide Laboratories</h3>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              These are multi-million dollar science engine initiatives sponsored by universities and leading tech corporations, open fully to students for free.
            </p>

            <div className="space-y-3.5">
              {simulations.map((sim) => (
                <a 
                  key={sim.name}
                  href={sim.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:border-purple-500/30 transition-all duration-200 group flex items-start justify-between"
                >
                  <div className="pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300">
                        {sim.category}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">By {sim.creator}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors mt-2">
                      {sim.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-1 leading-normal">
                      {sim.description}
                    </p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-500 flex-shrink-0 mt-1" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
