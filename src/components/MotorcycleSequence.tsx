import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, RefreshCw, Layers, Sparkles, ArrowDown, HelpCircle, Eye, FileCode } from "lucide-react";

export default function MotorcycleSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [preloadedCount, setPreloadedCount] = useState(0);
  const [useFallback, setUseFallback] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const totalFrames = 90;

  // Track the images preloaded in memory
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // 1. Preload image frames from local assets or public CDN
    let loaded = 0;
    const tempImages: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      // Zero-pad frame number to 3 digits (e.g. 001, 002, ... 090)
      const frameNum = String(i).padStart(3, "0");
      img.src = `/assets/frame_${frameNum}.jpg`;
      
      img.onload = () => {
        loaded++;
        setPreloadedCount(loaded);
        if (loaded === totalFrames) {
          setUseFallback(false); // successfully loaded actual images
        }
      };

      img.onerror = () => {
        // Fallback to beautiful mathematical 3D wireframe render if files are missing
        setUseFallback(true);
      };

      tempImages.push(img);
    }
    imagesRef.current = tempImages;
  }, []);

  // 2. Scroll listener to map scroll position to frame index (0-89)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      
      // Calculate how far we scrolled inside the sequence container
      const scrolledPast = -rect.top;
      const scrollableDist = containerHeight - window.innerHeight;
      
      if (scrollableDist <= 0) return;

      // Clamp scroll percentage between 0 and 1
      const progress = Math.max(0, Math.min(1, scrolledPast / scrollableDist));
      const currentFrame = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
      
      setFrameIndex(currentFrame);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once at startup
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Render loop on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Responsive Canvas dimensions matching viewport scale
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, width, height);

    // If actual preloaded frames loaded, draw them
    if (!useFallback && imagesRef.current[frameIndex]?.complete) {
      const img = imagesRef.current[frameIndex];
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;
      
      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      // Aspect fill canvas
      if (canvasRatio > imgRatio) {
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    } else {
      // 4. PRELOAD FALLBACK: High-performance 3D Vector Holographic Superbike Renderer
      // This mathematically computes perspective rotation to create an incredible sci-fi interactive experience!
      const angle = (frameIndex / totalFrames) * Math.PI * 2 + Math.PI / 4;
      const centerX = width / 2;
      const centerY = height / 2 + 30;
      const scale = Math.min(width, height) * 0.28;

      // Draw background sci-fi grid
      ctx.strokeStyle = "rgba(168, 85, 247, 0.08)";
      ctx.lineWidth = 1;
      for (let j = -5; j <= 5; j++) {
        const gridY = centerY + j * 30 + Math.sin(angle) * 10;
        ctx.beginPath();
        ctx.moveTo(centerX - 250, gridY);
        ctx.lineTo(centerX + 250, gridY);
        ctx.stroke();
      }

      // Draw particle dust field circulating the bike
      for (let p = 0; p < 25; p++) {
        const pAngle = angle + (p * Math.PI * 2) / 25;
        const pRadius = scale * (1.1 + Math.sin(pAngle * 2) * 0.15);
        const px = centerX + Math.cos(pAngle) * pRadius;
        const py = centerY + Math.sin(pAngle * 0.3) * (scale * 0.4) - 20;
        
        ctx.fillStyle = p % 2 === 0 ? "rgba(34, 211, 238, 0.45)" : "rgba(236, 72, 153, 0.45)";
        ctx.beginPath();
        ctx.arc(px, py, 1.5 + Math.abs(Math.sin(pAngle)) * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Helper function for 3D rotation projection
      const project3D = (x: number, y: number, z: number) => {
        // Rotate around Y axis
        const rotX = x * Math.cos(angle) - z * Math.sin(angle);
        const rotZ = x * Math.sin(angle) + z * Math.cos(angle);
        // Add perspective scale
        const perspective = 400 / (400 + rotZ);
        return {
          x: centerX + rotX * scale * perspective,
          y: centerY + y * scale * perspective,
          z: rotZ
        };
      };

      // Define skeletal points of the Superbike
      const frontWheelCenter = project3D(1.1, 0.3, 0);
      const rearWheelCenter = project3D(-1.1, 0.3, 0);
      const engineCore = project3D(0, 0.1, 0);
      const seatPoint = project3D(-0.4, -0.3, 0);
      const fuelTankFront = project3D(0.3, -0.4, 0);
      const headlights = project3D(0.8, -0.35, 0);
      const handleBars = project3D(0.5, -0.6, 0);
      const exhaustTip = project3D(-0.9, 0.15, 0.2);

      // A. Draw Glow shadows on floor
      const grad = ctx.createRadialGradient(centerX, centerY + scale * 0.35, 10, centerX, centerY + scale * 0.35, scale * 1.5);
      grad.addColorStop(0, "rgba(168, 85, 247, 0.18)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + scale * 0.35, scale * 1.6, scale * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();

      // B. Draw neon glowing wheel outlines
      const drawWheel = (center: { x: number; y: number; z: number }, color: string) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        // project rotating spokes
        for (let s = 0; s < 8; s++) {
          const spokeAngle = angle * 2 + (s * Math.PI) / 4;
          const spokeOuter = project3D(
            center.z === frontWheelCenter.z ? 1.1 + Math.cos(spokeAngle) * 0.35 : -1.1 + Math.cos(spokeAngle) * 0.35,
            0.3 + Math.sin(spokeAngle) * 0.35,
            0
          );
          ctx.moveTo(center.x, center.y);
          ctx.lineTo(spokeOuter.x, spokeOuter.y);
        }
        ctx.stroke();

        ctx.strokeStyle = color;
        ctx.lineWidth = 7;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(center.x, center.y, scale * 0.35, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0; // reset
      };

      drawWheel(frontWheelCenter, "#22d3ee");
      drawWheel(rearWheelCenter, "#ec4899");

      // C. Draw the Chassis structure lines with technical styling
      ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      // Rear wheel arm to engine
      ctx.moveTo(rearWheelCenter.x, rearWheelCenter.y);
      ctx.lineTo(engineCore.x, engineCore.y);
      // Engine to front fork bottom
      ctx.lineTo(frontWheelCenter.x, frontWheelCenter.y);
      // Front fork to handlebar
      ctx.lineTo(handleBars.x, handleBars.y);
      // Handlebar to fuel tank
      ctx.lineTo(fuelTankFront.x, fuelTankFront.y);
      // Fuel tank to seat
      ctx.lineTo(seatPoint.x, seatPoint.y);
      // Seat back to rear axle
      ctx.lineTo(rearWheelCenter.x, rearWheelCenter.y);
      ctx.stroke();

      // D. Draw futuristic body panels (glowing glass-like polygons)
      const drawPanel = (points: { x: number; y: number }[], fillColor: string, strokeColor: string) => {
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        points.forEach((p, idx) => {
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      };

      // Fuel Tank Panel
      const fuelPoints = [
        seatPoint,
        fuelTankFront,
        project3D(0.1, -0.2, 0.15),
        project3D(-0.3, -0.15, 0.1)
      ];
      drawPanel(fuelPoints, "rgba(168, 85, 247, 0.25)", "rgba(168, 85, 247, 0.8)");

      // Front Fairing Panel
      const frontPoints = [
        fuelTankFront,
        headlights,
        project3D(0.5, -0.1, 0.1),
        engineCore
      ];
      drawPanel(frontPoints, "rgba(34, 211, 238, 0.18)", "rgba(34, 211, 238, 0.8)");

      // E. Draw pulsating engine core light sources
      ctx.shadowColor = "#e879f9";
      ctx.shadowBlur = 15;
      ctx.fillStyle = "#f472b6";
      ctx.beginPath();
      ctx.arc(engineCore.x, engineCore.y, 8 + Math.sin(angle * 5) * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      // F. Exhaust pipes neon glowing trail
      ctx.strokeStyle = "#f43f5e";
      ctx.lineWidth = 5;
      ctx.shadowColor = "#f43f5e";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(engineCore.x, engineCore.y);
      ctx.lineTo(exhaustTip.x, exhaustTip.y);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    }
  }, [frameIndex, useFallback]);

  const productionReactCode = `import React, { useEffect, useRef, useState } from "react";

export default function HighPerformanceScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const totalFrames = 90;

  // 1. Preload all image frames on mount
  useEffect(() => {
    const preloadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = \`/assets/frame_\${frameNum}.jpg\`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImages(preloadedImages);
        }
      };
      preloadedImages.push(img);
    }
  }, []);

  // 2. Track scroll position to calculate target frame
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const scrolledPast = -rect.top;
      const scrollableDist = containerHeight - window.innerHeight;
      
      if (scrollableDist <= 0) return;

      const progress = Math.max(0, Math.min(1, scrolledPast / scrollableDist));
      const targetFrame = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
      setFrameIndex(targetFrame);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Draw preloaded frames onto High-Performance Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[frameIndex];
    if (img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, [frameIndex, images]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
          <h1 className="text-6xl font-bold text-white">Future Superbike</h1>
        </div>
      </div>
    </div>
  );
}`;

  return (
    <div ref={containerRef} className="relative bg-[#050505] rounded-[32px] overflow-hidden border border-white/5 my-12 shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
      
      {/* 3D Sequence Canvas - STICKY PINNED FRAME */}
      <div className="sticky top-0 h-[650px] w-full flex flex-col justify-between overflow-hidden">
        
        {/* Absolute Background Ambient Light */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#050505] to-black pointer-events-none" />
        
        {/* Dynamic floating aurora grids */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent blur-md" />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent blur-sm" />

        {/* HTML5 Canvas Element - GPU Accelerated 60fps renders */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 z-10 w-full h-full object-contain pointer-events-none mix-blend-screen"
        />

        {/* TOP STATUS HUD OVERLAY */}
        <div className="relative z-20 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md self-start">
            <Layers className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span className="text-[9px] font-mono font-bold text-gray-300 uppercase tracking-wider">
              {useFallback ? "Interactive Canvas fallback (60 FPS)" : "PRELOADED JPEG STREAM"}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md self-start text-[9px] font-mono text-gray-400 font-bold">
            <span>ACTIVE FRAME:</span>
            <span className="text-white font-mono bg-purple-500/20 px-1.5 py-0.5 rounded border border-purple-500/30">
              frame_{String(frameIndex + 1).padStart(3, "0")}.jpg
            </span>
          </div>
        </div>

        {/* CENTERED TITLES THAT FADE/SLIDE ACCORDING TO SCROLL PROGRESSION */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center pointer-events-none min-h-[250px] w-full">
          
          <div className="relative w-full max-w-xl h-[180px] flex items-center justify-center">
            {/* Stage 1 */}
            <div 
              style={{
                opacity: Math.max(0, 1 - Math.abs(scrollProgress - 0.12) / 0.15),
                transform: `scale(${0.9 + Math.max(0, 1 - Math.abs(scrollProgress - 0.12) / 0.15) * 0.1}) translateY(${10 - Math.max(0, 1 - Math.abs(scrollProgress - 0.12) / 0.15) * 10}px)`,
                pointerEvents: scrollProgress < 0.25 ? "auto" : "none",
                display: Math.max(0, 1 - Math.abs(scrollProgress - 0.12) / 0.15) > 0 ? "block" : "none"
              }}
              className="space-y-2 absolute inset-x-0 transition-transform duration-75 ease-out"
            >
              <span className="text-[10px] font-mono font-bold text-[#22d3ee] tracking-widest uppercase bg-[#22d3ee]/10 px-3 py-1 rounded-full border border-[#22d3ee]/20">
                STAGE 01 . AERODYNAMIC PROFILE
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-none pt-2">
                Valkyrie EV-90
              </h2>
              <p className="text-xs text-gray-400 max-w-xs mx-auto font-mono">
                Rotate the physical body frame via window scroll coordinates.
              </p>
            </div>

            {/* Stage 2 */}
            <div 
              style={{
                opacity: Math.max(0, 1 - Math.abs(scrollProgress - 0.5) / 0.20),
                transform: `scale(${0.9 + Math.max(0, 1 - Math.abs(scrollProgress - 0.5) / 0.20) * 0.1}) translateY(${10 - Math.max(0, 1 - Math.abs(scrollProgress - 0.5) / 0.20) * 10}px)`,
                pointerEvents: scrollProgress >= 0.25 && scrollProgress < 0.75 ? "auto" : "none",
                display: Math.max(0, 1 - Math.abs(scrollProgress - 0.5) / 0.20) > 0 ? "block" : "none"
              }}
              className="space-y-2 absolute inset-x-0 transition-transform duration-75 ease-out"
            >
              <span className="text-[10px] font-mono font-bold text-[#f472b6] tracking-widest uppercase bg-[#f472b6]/10 px-3 py-1 rounded-full border border-[#f472b6]/20">
                STAGE 02 . DUAL-CORE INDUCTION
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-none pt-2">
                Exploded Engine Core
              </h2>
              <p className="text-xs text-gray-400 max-w-xs mx-auto font-mono">
                Inspect isolated solid-state lithium powertrain elements.
              </p>
            </div>

            {/* Stage 3 */}
            <div 
              style={{
                opacity: Math.max(0, 1 - Math.abs(scrollProgress - 0.88) / 0.15),
                transform: `scale(${0.9 + Math.max(0, 1 - Math.abs(scrollProgress - 0.88) / 0.15) * 0.1}) translateY(${10 - Math.max(0, 1 - Math.abs(scrollProgress - 0.88) / 0.15) * 10}px)`,
                pointerEvents: scrollProgress >= 0.75 ? "auto" : "none",
                display: Math.max(0, 1 - Math.abs(scrollProgress - 0.88) / 0.15) > 0 ? "block" : "none"
              }}
              className="space-y-2 absolute inset-x-0 transition-transform duration-75 ease-out"
            >
              <span className="text-[10px] font-mono font-bold text-[#a855f7] tracking-widest uppercase bg-[#a855f7]/10 px-3 py-1 rounded-full border border-[#a855f7]/20">
                STAGE 03 . KINETIC LAUNCHPAD
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-none pt-2">
                Absolute Telemetry
              </h2>
              <p className="text-xs text-gray-400 max-w-xs mx-auto font-mono">
                Ready to stream raw CAD coordinate assets straight to manufacturing.
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM TIMELINE HUD */}
        <div className="relative z-20 p-6 border-t border-white/[0.04] bg-black/40 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] font-mono text-gray-400">
              Scroll down to scrub rotation timeline
            </span>
          </div>

          {/* Timeline scrub progress bar */}
          <div className="flex-1 max-w-xs mx-4 hidden md:block">
            <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 h-full transition-all duration-75"
                style={{ width: `${(frameIndex / (totalFrames - 1)) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                // Mock scroll trigger or scroll page down to demonstrate
                window.scrollBy({ top: 350, behavior: "smooth" });
              }}
              className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-white font-bold text-[10px] rounded-lg border border-white/10 transition-all flex items-center gap-1.5 pointer-events-auto cursor-pointer"
            >
              <span>Scroll Down</span>
              <ArrowDown className="w-3 h-3 text-cyan-400" />
            </button>
          </div>
        </div>

      </div>

      {/* CODE VIEWPORT DISCLOSURE AND TOGGLE PANEL */}
      <div className="p-6 bg-[#0c0b15]/90 border-t border-white/5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-display font-bold text-white flex items-center gap-2">
              <FileCode className="w-4 h-4 text-[#22d3ee]" /> Full-Stack Production Spec Component
            </h4>
            <p className="text-[11px] text-gray-400 font-mono">
              Ready-made boilerplate including zero-flicker preloading, Canvas ratio scaling, and viewport scroll triggers.
            </p>
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(productionReactCode);
              setCopiedCode(true);
              setTimeout(() => setCopiedCode(false), 2000);
            }}
            className="px-4 py-2 bg-[#22d3ee]/10 hover:bg-[#22d3ee]/20 text-[#22d3ee] border border-[#22d3ee]/20 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 shadow-lg"
          >
            {copiedCode ? "Copied Boilerplate!" : "Copy Production Code"}
          </button>
        </div>

        {/* Source viewer */}
        <div className="relative">
          <pre className="p-4 bg-black/60 border border-white/5 rounded-2xl text-[10px] text-gray-400 font-mono overflow-x-auto whitespace-pre leading-relaxed max-h-[220px]">
            {productionReactCode}
          </pre>
          <div className="absolute bottom-3 right-3 text-[9px] text-gray-600 font-mono">
            React + HTML5 Canvas
          </div>
        </div>
      </div>

    </div>
  );
}
