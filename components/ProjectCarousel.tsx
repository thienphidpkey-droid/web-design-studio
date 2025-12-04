import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { ProjectItem } from '../types';

interface ProjectCarouselProps {
  projects: ProjectItem[];
}

const CARD_WIDTH = 3.5;
const CARD_HEIGHT = 2.2;

const CarouselItem = ({
  project,
  index,
  total
}: {
  project: ProjectItem;
  index: number;
  total: number;
}) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Card dimensions with padding for white background
  const PADDING = 0.15;
  const CARD_BG_WIDTH = CARD_WIDTH + PADDING * 2;
  const CARD_BG_HEIGHT = CARD_HEIGHT + PADDING * 2;

  // Calculate stacked position - cards fan out from center
  const stackOffset = index * 0.05; // Slight offset for depth
  const fanAngle = ((index - (total - 1) / 2) * 8) * (Math.PI / 180); // Fan out 8 degrees per card
  const slideDistance = index * 0.8; // How far to slide each card horizontally

  useFrame((state) => {
    if (ref.current) {
      // Smooth scale animation on hover
      const targetScale = hovered ? 1.12 : 1;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      // Animate cards sliding out - use sine wave for smooth "dealing" animation
      const time = state.clock.elapsedTime;
      const dealDelay = index * 0.15; // Stagger each card's animation
      const animationProgress = Math.min(1, Math.max(0, (time - dealDelay) * 1.5));

      // Smooth easing function
      const eased = animationProgress < 0.5
        ? 2 * animationProgress * animationProgress
        : 1 - Math.pow(-2 * animationProgress + 2, 2) / 2;

      // Position: start stacked, then fan out
      const targetX = slideDistance * eased;
      const targetY = stackOffset * 2 * (1 - eased); // Cards drop down slightly as they deal
      const targetZ = -stackOffset * (1 - eased); // Start stacked, spread in Z

      ref.current.position.x = targetX;
      ref.current.position.y = targetY;
      ref.current.position.z = targetZ;

      // Rotation: slight tilt as cards fan out
      ref.current.rotation.z = fanAngle * eased;
    }
  });

  return (
    <group
      ref={ref}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* White background card */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[CARD_BG_WIDTH, CARD_BG_HEIGHT]} />
        <meshStandardMaterial
          color="white"
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Shadow plane */}
      <mesh position={[0.08, -0.08, -0.03]}>
        <planeGeometry args={[CARD_BG_WIDTH, CARD_BG_HEIGHT]} />
        <meshBasicMaterial
          color="black"
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Image */}
      <Image
        url={project.image}
        transparent
        side={THREE.DoubleSide}
        scale={[CARD_WIDTH, CARD_HEIGHT, 1]}
        toneMapped={false}
      />
    </group>
  );
};

const CardStack = ({ projects }: { projects: ProjectItem[] }) => {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} position={[-2, 0, 0]}>
      {projects.map((project, i) => (
        <CarouselItem
          key={i}
          project={project}
          index={i}
          total={projects.length}
        />
      ))}
    </group>
  );
};

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  return (
    <div className="w-full h-[600px] relative z-10 cursor-pointer">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={1.2} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={0.8} />
        <pointLight position={[-10, 5, -5]} intensity={0.3} />
        <Environment preset="city" />

        <CardStack projects={projects} />
      </Canvas>
    </div>
  );
};

export default ProjectCarousel;
