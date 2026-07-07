import React, { Component, ErrorInfo, ReactNode, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("WebGL/Canvas rendering error caught:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Beautiful visual fallback if WebGL fails to load
      return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex items-center justify-center">
          <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#22d3ee]/10 to-[#ec4899]/15 blur-[80px] opacity-60 animate-pulse" />
        </div>
      );
    }

    return this.props.children;
  }
}

function SceneContent() {
  const mainOrbRef = useRef<THREE.Mesh>(null);
  const satellite1Ref = useRef<THREE.Mesh>(null);
  const satellite2Ref = useRef<THREE.Mesh>(null);
  const satellite3Ref = useRef<THREE.Mesh>(null);
  
  // Floating crystal particles (marbles) in the background
  const particleRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Generate unique phase offsets for 15 decorative floating crystal particles
  const particleData = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 1.2) * 3 - 0.5,
      speed: 0.15 + Math.random() * 0.25,
      scale: 0.04 + Math.random() * 0.08,
      color: i % 3 === 0 ? "#ec4899" : i % 3 === 1 ? "#22d3ee" : "#a855f7",
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    // 1. Interactive Parallax & Float for Main Orb
    if (mainOrbRef.current) {
      const targetX = 0.5 + pointerX * 0.5;
      const targetY = pointerY * 0.35;
      
      // Smooth interpolation (lerping)
      mainOrbRef.current.position.x = THREE.MathUtils.lerp(mainOrbRef.current.position.x, targetX + Math.cos(time * 0.25) * 0.1, 0.06);
      mainOrbRef.current.position.y = THREE.MathUtils.lerp(mainOrbRef.current.position.y, targetY + Math.sin(time * 0.4) * 0.15, 0.06);

      // Slow, elegant multidimensional rotation
      mainOrbRef.current.rotation.x = time * 0.04;
      mainOrbRef.current.rotation.y = time * 0.06;
      mainOrbRef.current.rotation.z = time * 0.02;
    }

    // 2. Animate Satellites (Moons orbiting around the main glass orb)
    if (satellite1Ref.current && mainOrbRef.current) {
      // Moon 1 (Pink theme, fast tight orbit)
      const r = 2.2;
      const speed = time * 0.8;
      satellite1Ref.current.position.x = mainOrbRef.current.position.x + Math.cos(speed) * r;
      satellite1Ref.current.position.y = mainOrbRef.current.position.y + Math.sin(speed * 0.5) * r * 0.3;
      satellite1Ref.current.position.z = mainOrbRef.current.position.z + Math.sin(speed) * r;
      satellite1Ref.current.rotation.y = -time * 0.25;
    }

    if (satellite2Ref.current && mainOrbRef.current) {
      // Moon 2 (Cyan theme, wide inclined orbit)
      const r = 3.2;
      const speed = time * 0.45;
      satellite2Ref.current.position.x = mainOrbRef.current.position.x + Math.sin(speed) * r;
      satellite2Ref.current.position.y = mainOrbRef.current.position.y + Math.cos(speed) * r * 0.4;
      satellite2Ref.current.position.z = mainOrbRef.current.position.z + Math.cos(speed) * r;
      satellite2Ref.current.rotation.x = time * 0.15;
    }

    if (satellite3Ref.current && mainOrbRef.current) {
      // Moon 3 (Purple theme, slow deep background orbit)
      const r = 4.0;
      const speed = -time * 0.25;
      satellite3Ref.current.position.x = mainOrbRef.current.position.x + Math.cos(speed) * r;
      satellite3Ref.current.position.y = mainOrbRef.current.position.y + Math.sin(speed) * r * 0.5;
      satellite3Ref.current.position.z = mainOrbRef.current.position.z + Math.sin(speed) * r - 1.0;
    }

    // 3. Animate the array of tiny floating glass particles
    particleRefs.current.forEach((particle, idx) => {
      if (!particle) return;
      const data = particleData[idx];
      // Subtle float in a localized space
      const offset = Math.sin(time * data.speed + data.phase) * 0.2;
      particle.position.y = data.y + offset;
      // Gentle horizontal drift
      particle.position.x = data.x + Math.cos(time * 0.15 + data.phase) * 0.15;
    });
  });

  return (
    <>
      {/* Main Glass Orb */}
      <mesh ref={mainOrbRef} position={[0.5, 0, 0]}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.28}
          roughness={0.06}
          metalness={0.08}
          transmission={0.92}
          thickness={2.2}
          ior={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Satellite 1: Pink Glass Crystal Moon */}
      <mesh ref={satellite1Ref}>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshPhysicalMaterial
          color="#f472b6"
          transparent={true}
          opacity={0.35}
          roughness={0.1}
          metalness={0.2}
          transmission={0.85}
          thickness={1.2}
          ior={1.45}
          clearcoat={0.8}
        />
      </mesh>

      {/* Satellite 2: Cyan Glass Crystal Moon */}
      <mesh ref={satellite2Ref}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshPhysicalMaterial
          color="#22d3ee"
          transparent={true}
          opacity={0.35}
          roughness={0.12}
          metalness={0.15}
          transmission={0.88}
          thickness={1.4}
          ior={1.48}
          clearcoat={0.9}
        />
      </mesh>

      {/* Satellite 3: Soft Amethyst Moon */}
      <mesh ref={satellite3Ref}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshPhysicalMaterial
          color="#c084fc"
          transparent={true}
          opacity={0.3}
          roughness={0.05}
          metalness={0.1}
          transmission={0.9}
          thickness={0.8}
          ior={1.42}
          clearcoat={0.5}
        />
      </mesh>

      {/* Floating Micro Glass Speckles & Dust */}
      {particleData.map((data, idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            particleRefs.current[idx] = el;
          }}
          position={[data.x, data.y, data.z]}
        >
          <sphereGeometry args={[data.scale, 16, 16]} />
          <meshPhysicalMaterial
            color={data.color}
            transparent={true}
            opacity={0.35}
            roughness={0.1}
            transmission={0.8}
            thickness={0.5}
          />
        </mesh>
      ))}
    </>
  );
}

export default function GlassOrbBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        >
          {/* Soft atmospheric ambient light */}
          <ambientLight intensity={0.55} color="#1e1b4b" />

          {/* Directional front light */}
          <directionalLight position={[0, 5, 5]} intensity={0.7} color="#ffffff" />

          {/* Pink glowing light matching top-right gradient */}
          <pointLight position={[3, 2, 2]} intensity={8} distance={15} color="#ec4899" />

          {/* Cyan glowing light matching bottom-left / cyan gradient */}
          <pointLight position={[-3, -2, 2]} intensity={8} distance={15} color="#22d3ee" />

          {/* Purple accent light */}
          <pointLight position={[0, -1, 3]} intensity={4} distance={10} color="#a855f7" />

          <SceneContent />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}


