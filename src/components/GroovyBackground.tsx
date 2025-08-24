import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleSystemProps {
  mousePosition: { x: number; y: number };
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ mousePosition }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  // Generate particle positions
  const particleCount = 2000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Create a more distributed particle field
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20; // x
      positions[i3 + 1] = (Math.random() - 0.5) * 20; // y
      positions[i3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    
    return positions;
  }, []);
  
  // Store original positions for mouse interaction
  const originalPositions = useRef(positions.slice());
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Mouse interaction strength
    const mouseInfluence = 2;
    const mouseX = (mousePosition.x / window.innerWidth) * 2 - 1;
    const mouseY = -(mousePosition.y / window.innerHeight) * 2 + 1;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Get original positions
      const originalX = originalPositions.current[i3];
      const originalY = originalPositions.current[i3 + 1];
      const originalZ = originalPositions.current[i3 + 2];
      
      // Add flowing animation
      const flowX = Math.sin(time * 0.5 + originalX * 0.1) * 0.5;
      const flowY = Math.cos(time * 0.3 + originalY * 0.1) * 0.3;
      const flowZ = Math.sin(time * 0.4 + originalZ * 0.2) * 0.2;
      
      // Calculate distance from mouse (in normalized coordinates)
      const mouseWorldX = mouseX * viewport.width / 2;
      const mouseWorldY = mouseY * viewport.height / 2;
      
      const dx = originalX - mouseWorldX;
      const dy = originalY - mouseWorldY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Mouse repulsion effect
      let mouseOffsetX = 0;
      let mouseOffsetY = 0;
      
      if (distance < 3) {
        const force = (3 - distance) / 3;
        const angle = Math.atan2(dy, dx);
        mouseOffsetX = Math.cos(angle) * force * mouseInfluence;
        mouseOffsetY = Math.sin(angle) * force * mouseInfluence;
      }
      
      // Apply all transformations
      positions[i3] = originalX + flowX + mouseOffsetX;
      positions[i3 + 1] = originalY + flowY + mouseOffsetY;
      positions[i3 + 2] = originalZ + flowZ;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate the entire particle system slowly
    pointsRef.current.rotation.x = time * 0.05;
    pointsRef.current.rotation.y = time * 0.02;
  });
  
  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8B5CF6"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={1.0}
        toneMapped={false}
      />
    </Points>
  );
};

const GroovyBackground: React.FC = () => {
  const mousePosition = useRef({ x: 0, y: 0 });
  
  // Track mouse movement
  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: event.clientX,
        y: event.clientY
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none" 
      style={{ 
        zIndex: 1,
        background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'
      }}
    >
      <Canvas
        camera={{ 
          position: [0, 0, 5], 
          fov: 75,
          near: 0.1,
          far: 1000 
        }}
        style={{ 
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'block'
        }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Ambient lighting for subtle particle illumination */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#8B5CF6" />
        
        {/* Main particle system */}
        <ParticleSystem mousePosition={mousePosition.current} />
        
        {/* Additional particle layers for depth */}
        <group position={[0, 0, -2]}>
          <ParticleSystem mousePosition={mousePosition.current} />
        </group>
        
        <group position={[0, 0, -4]} scale={0.5}>
          <ParticleSystem mousePosition={mousePosition.current} />
        </group>
      </Canvas>
    </div>
  );
};

export default GroovyBackground;
