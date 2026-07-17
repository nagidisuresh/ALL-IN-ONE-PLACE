import React, { Component, ErrorInfo, ReactNode, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
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
    console.error("3D Career Path rendering error caught:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[320px] rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ec4899]/5 via-[#22d3ee]/5 to-transparent blur-xl" />
          <p className="text-gray-400 font-display font-semibold text-sm relative z-10">Interactive 3D Constellation Fallback</p>
          <p className="text-gray-500 text-[11px] max-w-xs mt-1 relative z-10">WebGL accelerated layout is inactive, but path selection below is fully operational.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

interface NodeData {
  id: string;
  name: string;
  position: [number, number, number];
  color: string;
  description: string;
  glowColor: string;
  icon: string;
}

interface PathNodeProps {
  node: NodeData;
  isActive: boolean;
  onSelect: (name: string) => void;
}

function PathNode({ node, isActive, onSelect }: PathNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Gentle float for each individual node with slight phase offsets
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const phase = node.position[0] * 2.0;
    
    // Float movement
    meshRef.current.position.y = node.position[1] + Math.sin(time * 0.8 + phase) * 0.12;
    meshRef.current.position.x = node.position[0] + Math.cos(time * 0.5 + phase) * 0.08;
    
    // Rotation of the sphere
    meshRef.current.rotation.y = time * 0.15;
    meshRef.current.rotation.x = time * 0.08;
  });

  const scale = isActive ? 1.4 : hovered ? 1.25 : 1.0;

  return (
    <mesh
      ref={meshRef}
      position={node.position}
      onClick={() => onSelect(node.name)}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      <sphereGeometry args={[0.34, 32, 32]} />
      <meshPhysicalMaterial
        color={isActive ? "#ffffff" : node.color}
        emissive={node.glowColor}
        emissiveIntensity={isActive ? 1.8 : hovered ? 1.2 : 0.4}
        roughness={0.1}
        metalness={0.4}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        transparent={true}
        opacity={isActive ? 0.95 : 0.8}
      />

      {/* Halo pulse or active orbit ring */}
      {isActive && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.42, 0.48, 32]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      )}

      {/* Floating high-end visual text overlay */}
      <Html distanceFactor={6} position={[0, 0.6, 0]} center>
        <div 
          className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition-all duration-300 font-sans shadow-lg select-none pointer-events-none text-center ${
            isActive 
              ? "bg-white text-black border-white scale-110 font-bold" 
              : hovered 
                ? "bg-[#11101c]/95 text-white border-[rgba(255,255,255,0.25)] font-semibold shadow-[0_0_15px_rgba(236,72,153,0.3)] scale-105" 
                : "bg-black/80 text-gray-400 border-[rgba(255,255,255,0.06)] scale-100 text-[10px]"
          }`}
        >
          <div className="flex items-center gap-1.5 justify-center">
            <span className="text-xs">{node.icon}</span>
            <span className="font-mono text-xs uppercase tracking-wide">{node.name}</span>
          </div>
          {hovered && !isActive && (
            <div className="text-[9px] text-gray-500 mt-0.5 max-w-[120px] truncate leading-tight font-sans">
              Click to Reveal Roadmap
            </div>
          )}
        </div>
      </Html>
    </mesh>
  );
}

// Draw physical cylinder tubes connecting nodes to act as 3D pathway paths
interface PathLinkProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

function PathLink({ start, end, color }: PathLinkProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const cylinderData = useMemo(() => {
    const vStart = new THREE.Vector3(...start);
    const vEnd = new THREE.Vector3(...end);
    const distance = vStart.distanceTo(vEnd);
    const position = vStart.clone().add(vEnd).multiplyScalar(0.5);

    // Calculate rotation to orient cylinder from start to end
    const direction = new THREE.Vector3().subVectors(vEnd, vStart).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);

    return { distance, position, quaternion };
  }, [start, end]);

  return (
    <mesh
      ref={meshRef}
      position={cylinderData.position}
      quaternion={cylinderData.quaternion}
    >
      <cylinderGeometry args={[0.02, 0.02, cylinderData.distance, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </mesh>
  );
}

interface CareerPathCanvasProps {
  activeGoal: string;
  onSelectGoal: (role: string) => void;
}

export default function CareerPathCanvas({ activeGoal, onSelectGoal }: CareerPathCanvasProps) {
  const nodes: NodeData[] = useMemo(() => [
    {
      id: "node-fe",
      name: "Frontend Developer",
      position: [-2.0, 0.4, 0],
      color: "#f472b6",
      glowColor: "#ec4899",
      description: "Client UI, components, and styling mechanics",
      icon: "🎨"
    },
    {
      id: "node-be",
      name: "Backend Developer",
      position: [2.0, 0.4, 0],
      color: "#22d3ee",
      glowColor: "#06b6d4",
      description: "Systems core, database design, and API architectures",
      icon: "⚙️"
    },
    {
      id: "node-ds",
      name: "Data Scientist",
      position: [-1.2, -1.3, 0.5],
      color: "#10b981",
      glowColor: "#34d399",
      description: "Predictive modeling, matrices, and core analytics",
      icon: "📊"
    },
    {
      id: "node-pm",
      name: "Product Manager",
      position: [1.2, -1.3, 0.5],
      color: "#f59e0b",
      glowColor: "#fbbf24",
      description: "Agile methodologies, sprint execution, and roadmap strategies",
      icon: "🎯"
    }
  ], []);

  // Set connections between path nodes (FE -> BE, FE -> DS, DS -> PM, BE -> PM, etc)
  const links = useMemo(() => [
    { start: nodes[0].position, end: nodes[1].position, color: "#a855f7" }, // FE -> BE
    { start: nodes[0].position, end: nodes[2].position, color: "#ec4899" }, // FE -> DS
    { start: nodes[1].position, end: nodes[3].position, color: "#22d3ee" }, // BE -> PM
    { start: nodes[2].position, end: nodes[3].position, color: "#10b981" }, // DS -> PM
  ], [nodes]);

  return (
    <div className="w-full h-[320px] rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden flex flex-col justify-end shadow-inner">
      {/* Visual background atmospheric elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14]/90 via-transparent to-transparent pointer-events-none z-10" />
      <div className="absolute top-4 left-5 z-20 pointer-events-none">
        <span className="text-[10px] font-mono text-[#22d3ee] uppercase tracking-widest font-bold">Interactive 3D Constellation</span>
        <h4 className="text-white text-xs font-semibold mt-0.5">Click a Node to Instant-Reveal Progression Roadmaps</h4>
      </div>

      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 4.0], fov: 55 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.4} color="#1e1b4b" />
          <directionalLight position={[0, 4, 3]} intensity={0.8} color="#ffffff" />
          <pointLight position={[0, 0, 2]} intensity={1.2} color="#a855f7" />

          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            maxPolarAngle={Math.PI / 1.5} 
            minPolarAngle={Math.PI / 3} 
          />

          {/* Connected Lines */}
          {links.map((link, idx) => (
            <PathLink key={idx} start={link.start} end={link.end} color={link.color} />
          ))}

          {/* Interactive Nodes */}
          {nodes.map((node) => (
            <PathNode
              key={node.id}
              node={node}
              isActive={activeGoal === node.name}
              onSelect={onSelectGoal}
            />
          ))}
        </Canvas>
      </CanvasErrorBoundary>

      {/* Little instructions badge */}
      <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5 pointer-events-none">
        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">Drag/Hover Space to explore</span>
      </div>
    </div>
  );
}
