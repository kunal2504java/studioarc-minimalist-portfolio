import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Component for individual flowing tube with glass/metallic appearance
const FlowingTube = ({ points, speed, index }: { points: THREE.Vector3[], speed: number, index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const tubeGeometry = useMemo(() => new THREE.TubeGeometry(curve, 150, 0.25, 24, false), [curve]);
  
  useFrame((state) => {
    if (materialRef.current) {
      const time = state.clock.getElapsedTime();
      // Enhanced shiny flowing effect
      const shimmer = 0.4 + Math.sin(time * speed * 0.3 + index) * 0.2;
      const glow = 0.15 + Math.sin(time * speed * 0.2) * 0.1;
      
      materialRef.current.opacity = shimmer;
      materialRef.current.emissiveIntensity = glow;
      materialRef.current.metalness = 0.85 + Math.sin(time * 0.1) * 0.1;
    }
    
    if (meshRef.current) {
      // Slower, more graceful movement
      meshRef.current.rotation.z += 0.0002 * speed;
      meshRef.current.rotation.x += 0.0001 * speed;
      meshRef.current.rotation.y += 0.00015 * speed;
    }
  });

  return (
    <mesh ref={meshRef} geometry={tubeGeometry}>
      <meshPhysicalMaterial
        ref={materialRef}
        color="#d1d5db"
        emissive="#f9fafb"
        emissiveIntensity={0.2}
        transparent
        opacity={0.6}
        metalness={0.95}
        roughness={0.05}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        transmission={0.2}
        thickness={0.8}
        ior={1.6}
        envMapIntensity={1.5}
      />
    </mesh>
  );
};

// Main 3D scene component
const Scene = () => {
  // Generate fewer, more elegant tube paths
  const tubes = useMemo(() => {
    const tubeData = [];
    
    for (let i = 0; i < 6; i++) {
      const points = [];
      
      // Create more organic, flowing curves with better spacing
      const startX = (Math.random() - 0.5) * 30;
      const startY = (Math.random() - 0.5) * 25;
      const startZ = -20;
      
      for (let j = 0; j < 20; j++) {
        const progress = j / 19;
        const x = startX + Math.sin(progress * Math.PI * 1.8 + i * 0.8) * 10;
        const y = startY + Math.cos(progress * Math.PI * 1.2 + i * 0.6) * 8;
        const z = startZ + progress * 40;
        points.push(new THREE.Vector3(x, y, z));
      }
      
      tubeData.push({
        points,
        speed: 0.3 + Math.random() * 0.7,
        index: i,
      });
    }
    
    return tubeData;
  }, []);

  return (
    <>
      {/* Ambient lighting for overall illumination */}
      <ambientLight intensity={0.2} color="#f8fafc" />
      
      {/* Main directional light for glass effect */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow
      />
      
      {/* Rim lighting for glass edges */}
      <directionalLight
        position={[-5, 5, 10]}
        intensity={0.4}
        color="#e2e8f0"
      />
      
      {/* Subtle fill light */}
      <pointLight 
        position={[0, 0, 0]} 
        intensity={0.3} 
        color="#f1f5f9"
        distance={50}
      />
      
      {/* Additional accent lights */}
      <pointLight position={[-15, -10, 5]} intensity={0.2} color="#cbd5e1" />
      <pointLight position={[15, 10, -5]} intensity={0.2} color="#f8fafc" />
      
      {/* Render all tubes */}
      {tubes.map((tube, index) => (
        <FlowingTube
          key={index}
          points={tube.points}
          speed={tube.speed}
          index={tube.index}
        />
      ))}
    </>
  );
};

// Main 3D Background component
const ThreeDBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;
