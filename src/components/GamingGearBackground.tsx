import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';

// Gaming Controller Component
const GameController: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  // Random movement parameters for each instance
  const randomParams = useMemo(() => ({
    rotSpeedX: 0.2 + Math.random() * 0.6,
    rotSpeedY: 0.005 + Math.random() * 0.02,
    rotSpeedZ: 0.1 + Math.random() * 0.4,
    floatSpeed: 0.2 + Math.random() * 0.5,
    floatAmplitude: 0.2 + Math.random() * 0.4,
    phaseOffset: Math.random() * Math.PI * 2,
    driftSpeed: 0.1 + Math.random() * 0.3,
    driftRadius: 0.5 + Math.random() * 1.0
  }), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = Math.sin(time * randomParams.rotSpeedX + randomParams.phaseOffset) * 0.15;
      meshRef.current.rotation.y += randomParams.rotSpeedY;
      meshRef.current.rotation.z = Math.cos(time * randomParams.rotSpeedZ) * 0.1;
      
      // Floating movement with drift
      meshRef.current.position.y = position[1] + Math.sin(time * randomParams.floatSpeed + randomParams.phaseOffset) * randomParams.floatAmplitude;
      meshRef.current.position.x = position[0] + Math.cos(time * randomParams.driftSpeed) * randomParams.driftRadius;
      meshRef.current.position.z = position[2] + Math.sin(time * randomParams.driftSpeed * 0.7) * randomParams.driftRadius * 0.5;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Controller body */}
      <mesh>
        <boxGeometry args={[2, 1, 0.5]} />
        <meshStandardMaterial 
          wireframe 
          emissive="#8B5CF6" 
          emissiveIntensity={0.3}
          color="#8B5CF6"
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* D-pad */}
      <mesh position={[-0.6, 0.2, 0.3]}>
        <boxGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial wireframe emissive="#8B5CF6" emissiveIntensity={0.2} />
      </mesh>
      {/* Buttons */}
      <mesh position={[0.6, 0.2, 0.3]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial wireframe emissive="#8B5CF6" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
};

// Gaming Headphones Component
const Headphones: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  const randomParams = useMemo(() => ({
    rotSpeedX: 0.15 + Math.random() * 0.5,
    rotSpeedY: 0.003 + Math.random() * 0.015,
    rotSpeedZ: 0.2 + Math.random() * 0.6,
    floatSpeed: 0.15 + Math.random() * 0.4,
    floatAmplitude: 0.15 + Math.random() * 0.35,
    phaseOffset: Math.random() * Math.PI * 2,
    driftSpeed: 0.08 + Math.random() * 0.25,
    driftRadius: 0.4 + Math.random() * 0.8
  }), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = Math.cos(time * randomParams.rotSpeedX) * 0.12;
      meshRef.current.rotation.y += randomParams.rotSpeedY;
      meshRef.current.rotation.z = Math.sin(time * randomParams.rotSpeedZ + randomParams.phaseOffset) * 0.1;
      
      meshRef.current.position.y = position[1] + Math.cos(time * randomParams.floatSpeed + randomParams.phaseOffset) * randomParams.floatAmplitude;
      meshRef.current.position.x = position[0] + Math.sin(time * randomParams.driftSpeed) * randomParams.driftRadius;
      meshRef.current.position.z = position[2] + Math.cos(time * randomParams.driftSpeed * 1.2) * randomParams.driftRadius * 0.6;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Headband */}
      <mesh>
        <torusGeometry args={[1.2, 0.1, 8, 16, Math.PI]} />
        <meshStandardMaterial 
          wireframe 
          emissive="#A855F7" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Left ear cup */}
      <mesh position={[-1, -0.5, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2]} />
        <meshStandardMaterial wireframe emissive="#A855F7" emissiveIntensity={0.2} />
      </mesh>
      {/* Right ear cup */}
      <mesh position={[1, -0.5, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2]} />
        <meshStandardMaterial wireframe emissive="#A855F7" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
};

// Gaming Mouse Component
const GamingMouse: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  const randomParams = useMemo(() => ({
    rotSpeedX: 0.3 + Math.random() * 0.8,
    rotSpeedY: 0.008 + Math.random() * 0.025,
    rotSpeedZ: 0.25 + Math.random() * 0.7,
    floatSpeed: 0.25 + Math.random() * 0.6,
    floatAmplitude: 0.2 + Math.random() * 0.4,
    phaseOffset: Math.random() * Math.PI * 2,
    driftSpeed: 0.12 + Math.random() * 0.35,
    driftRadius: 0.3 + Math.random() * 0.7
  }), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = Math.cos(time * randomParams.rotSpeedX + randomParams.phaseOffset) * 0.08;
      meshRef.current.rotation.y += randomParams.rotSpeedY;
      meshRef.current.rotation.z = Math.sin(time * randomParams.rotSpeedZ) * 0.06;
      
      meshRef.current.position.y = position[1] + Math.sin(time * randomParams.floatSpeed + randomParams.phaseOffset) * randomParams.floatAmplitude;
      meshRef.current.position.x = position[0] + Math.cos(time * randomParams.driftSpeed * 1.1) * randomParams.driftRadius;
      meshRef.current.position.z = position[2] + Math.sin(time * randomParams.driftSpeed * 0.8) * randomParams.driftRadius * 0.7;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Mouse body */}
      <mesh>
        <capsuleGeometry args={[0.4, 1]} />
        <meshStandardMaterial 
          wireframe 
          emissive="#9333EA" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Scroll wheel */}
      <mesh position={[0, 0.3, 0.4]}>
        <cylinderGeometry args={[0.1, 0.1, 0.2]} />
        <meshStandardMaterial wireframe emissive="#9333EA" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
};

// Gaming Console Component
const GamingConsole: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  const randomParams = useMemo(() => ({
    rotSpeedX: 0.1 + Math.random() * 0.4,
    rotSpeedY: 0.002 + Math.random() * 0.012,
    rotSpeedZ: 0.15 + Math.random() * 0.45,
    floatSpeed: 0.1 + Math.random() * 0.3,
    floatAmplitude: 0.25 + Math.random() * 0.5,
    phaseOffset: Math.random() * Math.PI * 2,
    driftSpeed: 0.06 + Math.random() * 0.2,
    driftRadius: 0.6 + Math.random() * 1.2
  }), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = Math.sin(time * randomParams.rotSpeedX) * 0.08;
      meshRef.current.rotation.y += randomParams.rotSpeedY;
      meshRef.current.rotation.z = Math.sin(time * randomParams.rotSpeedZ + randomParams.phaseOffset) * 0.05;
      
      meshRef.current.position.y = position[1] + Math.cos(time * randomParams.floatSpeed + randomParams.phaseOffset) * randomParams.floatAmplitude;
      meshRef.current.position.x = position[0] + Math.sin(time * randomParams.driftSpeed) * randomParams.driftRadius;
      meshRef.current.position.z = position[2] + Math.cos(time * randomParams.driftSpeed * 0.9) * randomParams.driftRadius * 0.4;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Console body */}
      <mesh>
        <boxGeometry args={[2.5, 0.8, 1.5]} />
        <meshStandardMaterial 
          wireframe 
          emissive="#7C3AED" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Vents */}
      <mesh position={[0, 0.5, 0.8]}>
        <boxGeometry args={[1.5, 0.1, 0.1]} />
        <meshStandardMaterial wireframe emissive="#7C3AED" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
};

const FloatingObjects: React.FC = () => {
  // Generate positions that surround the game canvas but don't overlap it
  const generateSurroundingPosition = (minDistance: number, maxDistance: number): [number, number, number] => {
    const angle = Math.random() * Math.PI * 2;
    const distance = minDistance + Math.random() * (maxDistance - minDistance);
    
    return [
      Math.cos(angle) * distance,
      (Math.random() - 0.5) * 8, // Vertical spread
      Math.sin(angle) * distance * 0.6 // Depth variation
    ];
  };

  const objectPositions = useMemo(() => {
    const positions: Array<[number, number, number]> = [];
    
    // Controllers - surrounding the game area
    for (let i = 0; i < 5; i++) {
      positions.push(generateSurroundingPosition(4, 8));
    }
    
    return positions;
  }, []);

  const headphonePositions = useMemo(() => {
    const positions: Array<[number, number, number]> = [];
    
    for (let i = 0; i < 4; i++) {
      positions.push(generateSurroundingPosition(5, 9));
    }
    
    return positions;
  }, []);

  const mousePositions = useMemo(() => {
    const positions: Array<[number, number, number]> = [];
    
    for (let i = 0; i < 6; i++) {
      positions.push(generateSurroundingPosition(3.5, 7));
    }
    
    return positions;
  }, []);

  const consolePositions = useMemo(() => {
    const positions: Array<[number, number, number]> = [];
    
    for (let i = 0; i < 3; i++) {
      positions.push(generateSurroundingPosition(6, 10));
    }
    
    return positions;
  }, []);

  return (
    <>
      {/* Controllers */}
      {objectPositions.map((position, index) => (
        <GameController key={`controller-${index}`} position={position} />
      ))}
      
      {/* Headphones */}
      {headphonePositions.map((position, index) => (
        <Headphones key={`headphones-${index}`} position={position} />
      ))}
      
      {/* Mice */}
      {mousePositions.map((position, index) => (
        <GamingMouse key={`mouse-${index}`} position={position} />
      ))}
      
      {/* Consoles */}
      {consolePositions.map((position, index) => (
        <GamingConsole key={`console-${index}`} position={position} />
      ))}
    </>
  );
};

const GamingGearBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ 
          position: [0, 0, 6], 
          fov: 75,
          near: 0.1,
          far: 1000 
        }}
        style={{ 
          background: 'transparent',
          width: '100%',
          height: '100%'
        }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#8B5CF6" />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#A855F7" />
        
        {/* Floating gaming objects */}
        <FloatingObjects />
        
        {/* Subtle fog for depth */}
        <fog attach="fog" args={['#0A0A0A', 15, 25]} />
      </Canvas>
    </div>
  );
};

export default GamingGearBackground;
