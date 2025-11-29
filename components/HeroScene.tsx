import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, ContactShadows, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// --- UI COMPONENTS ---

const AnimatedBar = ({ position, width, height, color, delay }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const originalScaleY = 1;

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle pulsing animation for charts
      meshRef.current.scale.y = originalScaleY + Math.sin(state.clock.elapsedTime * 3 + delay) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

const BrowserFrame = ({ position, scale = 1 }: any) => {
  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 512, 0);
      gradient.addColorStop(0, '#3b82f6'); // Blue
      gradient.addColorStop(1, '#8b5cf6'); // Violet
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 256);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group position={position} scale={scale}>
      {/* Frame Body - Matte White Plastic */}
      <RoundedBox args={[3.2, 2.1, 0.1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.1} />
      </RoundedBox>
      
      {/* Screen Area */}
      <mesh position={[0, -0.05, 0.06]}>
        <planeGeometry args={[3, 1.8]} />
        <meshBasicMaterial color="#f8fafc" /> {/* Light Gray Background */}
      </mesh>

      {/* --- Browser UI --- */}
      
      {/* Top Bar (Address Bar) */}
      <mesh position={[0, 0.92, 0.065]}>
        <planeGeometry args={[3, 0.15]} />
        <meshBasicMaterial color="#f1f5f9" />
      </mesh>
      {/* Traffic Lights */}
      <group position={[-1.35, 0.92, 0.07]}>
        <mesh position={[0, 0, 0]}>
           <circleGeometry args={[0.04, 32]} />
           <meshBasicMaterial color="#ff5f57" />
        </mesh>
        <mesh position={[0.12, 0, 0]}>
           <circleGeometry args={[0.04, 32]} />
           <meshBasicMaterial color="#febc2e" />
        </mesh>
        <mesh position={[0.24, 0, 0]}>
           <circleGeometry args={[0.04, 32]} />
           <meshBasicMaterial color="#28c840" />
        </mesh>
      </group>

      {/* Sidebar */}
      <mesh position={[-1.1, -0.05, 0.07]}>
        <planeGeometry args={[0.8, 1.8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Sidebar Items */}
      {[0.6, 0.4, 0.2, 0].map((y, i) => (
        <mesh key={i} position={[-1.1, y, 0.08]}>
          <planeGeometry args={[0.5, 0.08]} />
          <meshBasicMaterial color={i === 0 ? "#e0f2fe" : "#f1f5f9"} />
        </mesh>
      ))}
      {/* Active Indicator */}
      <mesh position={[-1.32, 0.6, 0.09]}>
         <planeGeometry args={[0.03, 0.08]} />
         <meshBasicMaterial color="#3b82f6" />
      </mesh>

      {/* Main Content Area */}
      {/* Hero Banner with Gradient */}
      <mesh position={[0.4, 0.55, 0.07]}>
         <planeGeometry args={[2, 0.6]} />
         <meshBasicMaterial map={gradientTexture} toneMapped={false} />
      </mesh>
      
      {/* Animated Chart Bars */}
      <group position={[0.4, -0.3, 0.07]}>
         {/* Chart Background */}
         <mesh position={[0, 0.1, -0.001]}>
            <planeGeometry args={[2, 0.8]} />
            <meshBasicMaterial color="#ffffff" />
         </mesh>
         
         <AnimatedBar position={[-0.8, 0, 0]} width={0.15} height={0.4} color="#3b82f6" delay={0} />
         <AnimatedBar position={[-0.5, 0.1, 0]} width={0.15} height={0.6} color="#60a5fa" delay={0.5} />
         <AnimatedBar position={[-0.2, -0.05, 0]} width={0.15} height={0.3} color="#93c5fd" delay={1} />
         <AnimatedBar position={[0.1, 0.2, 0]} width={0.15} height={0.8} color="#2563eb" delay={1.5} />
         <AnimatedBar position={[0.4, 0.05, 0]} width={0.15} height={0.5} color="#60a5fa" delay={2} />
         <AnimatedBar position={[0.7, -0.1, 0]} width={0.15} height={0.2} color="#93c5fd" delay={2.5} />
      </group>
    </group>
  );
};

const MobileFrame = ({ position, scale = 1, rotation }: any) => {
  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Phone Body - Dark Titanium */}
      <RoundedBox args={[1.2, 2.4, 0.1]} radius={0.12} smoothness={4}>
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.6} />
      </RoundedBox>

      {/* Screen */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[1.1, 2.3]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Notch */}
      <mesh position={[0, 1.1, 0.07]}>
        <planeGeometry args={[0.3, 0.08]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* --- Mobile UI --- */}
      
      {/* Header Card */}
      <mesh position={[0, 0.8, 0.07]}>
        <planeGeometry args={[0.9, 0.4]} />
         <meshBasicMaterial color="#3b82f6" />
      </mesh>

      {/* Avatar Group */}
      <group position={[-0.3, 0.4, 0.07]}>
        <circleGeometry args={[0.12, 32]} />
        <meshBasicMaterial color="#fbbf24" />
      </group>
      <mesh position={[0.1, 0.4, 0.07]}>
         <planeGeometry args={[0.5, 0.04]} />
         <meshBasicMaterial color="#94a3b8" />
      </mesh>
       <mesh position={[0.1, 0.32, 0.07]}>
         <planeGeometry args={[0.3, 0.03]} />
         <meshBasicMaterial color="#cbd5e1" />
      </mesh>

      {/* List Items (Feed) */}
      {[0, -0.35, -0.7].map((y, i) => (
         <group key={i} position={[0, y, 0.07]}>
            {/* Card Bg */}
            <mesh position={[0, 0, -0.001]}>
               <planeGeometry args={[0.9, 0.25]} />
               <meshBasicMaterial color="#f1f5f9" />
            </mesh>
            {/* Icon */}
            <mesh position={[-0.35, 0, 0.01]}>
               <circleGeometry args={[0.08, 32]} />
               <meshBasicMaterial color={i % 2 === 0 ? "#f472b6" : "#4ade80"} />
            </mesh>
            {/* Lines */}
            <mesh position={[0.05, 0.04, 0.01]}>
               <planeGeometry args={[0.5, 0.03]} />
               <meshBasicMaterial color="#64748b" />
            </mesh>
            <mesh position={[0.05, -0.04, 0.01]}>
               <planeGeometry args={[0.3, 0.02]} />
               <meshBasicMaterial color="#94a3b8" />
            </mesh>
         </group>
      ))}
      
      {/* Floating Action Button */}
      <mesh position={[0.35, -0.9, 0.08]}>
         <circleGeometry args={[0.12, 32]} />
         <meshBasicMaterial color="#3b82f6" />
      </mesh>
    </group>
  );
};

const SceneComposition = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
     if (groupRef.current) {
        // Subtle floating rotation
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.03;
        
        // Scroll interaction
        const scrollY = window.scrollY;
        // Smoothly interpolate scroll rotation
        groupRef.current.rotation.y += scrollY * 0.0002;
     }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
         
         {/* Desktop Layer (Back) */}
         <BrowserFrame position={[0, 0.1, -0.5]} scale={1.3} />
         
         {/* Mobile Layer (Front) */}
         <MobileFrame position={[1.3, -0.6, 0.6]} scale={0.85} rotation={[0, -0.15, 0]} />

      </Float>
    </group>
  );
};

const HeroScene: React.FC = () => {
  return (
    <div className="w-full h-[500px] relative z-10 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 35 }} dpr={[1, 2]}>
        
        {/* LIGHTING SETUP FOR CLEAN LOOK */}
        <ambientLight intensity={1.5} />
        {/* Key Light with softer shadows */}
        <spotLight 
          position={[5, 10, 5]} 
          angle={0.4} 
          penumbra={1} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024}
        />
        {/* Fill Light */}
        <pointLight position={[-10, -5, 5]} intensity={0.5} color="#e0e7ff" />
        
        <Environment preset="studio" />

        <SceneComposition />

        {/* Soft Contact Shadows */}
        <ContactShadows 
          position={[0, -2.2, 0]} 
          opacity={0.35} 
          scale={15} 
          blur={2.5} 
          far={3} 
          color="#000000"
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;