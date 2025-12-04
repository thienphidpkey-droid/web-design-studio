import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ProjectItem } from '../types';

interface ProjectCarouselProps {
  projects: ProjectItem[];
}

const RADIUS = 4; // Radius of the circular carousel
const CARD_WIDTH = 2.5;
const CARD_HEIGHT = 1.6;

const CarouselItem = ({
  project,
  index,
  total,
  groupRotation
}: {
  project: ProjectItem;
  index: number;
  total: number;
  groupRotation: number;
}) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Card dimensions with padding for white background
  const PADDING = 0.12;
  const CARD_BG_WIDTH = CARD_WIDTH + PADDING * 2;
  const CARD_BG_HEIGHT = CARD_HEIGHT + PADDING * 2;

  // Calculate position in circle
  const angle = (index / total) * Math.PI * 2;
  const x = Math.cos(angle) * RADIUS;
  const z = Math.sin(angle) * RADIUS;

  useFrame(() => {
    if (ref.current) {
      // Smooth scale animation on hover
      const targetScale = hovered ? 1.15 : 1;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      // Cards always face the center
      ref.current.lookAt(0, 0, 0);
    }
  });

  return (
    <group
      ref={ref}
      position={[x, 0, z]}
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
      <mesh position={[0.06, -0.06, -0.03]}>
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

const CircularCarousel = ({ projects }: { projects: ProjectItem[] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const rotationRef = useRef(0);

  useFrame((state, delta) => {
    if (groupRef.current && !isHovered) {
      // Rotate the entire carousel around Y axis (horizontal rotation)
      rotationRef.current += delta * 0.3;
      groupRef.current.rotation.y = rotationRef.current;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {projects.map((project, i) => (
        <CarouselItem
          key={i}
          project={project}
          index={i}
          total={projects.length}
          groupRotation={rotationRef.current}
        />
      ))}
    </group>
  );
};

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  return (
    <div className="w-full h-[600px] relative z-10 cursor-pointer">
      <Canvas camera={{ position: [0, 2, 10], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={1.2} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={0.8} />
        <pointLight position={[-10, 5, -5]} intensity={0.4} />
        <directionalLight position={[0, 5, 5]} intensity={0.5} />
        <Environment preset="city" />

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
          <CircularCarousel projects={projects} />
        </Float>
      </Canvas>
    </div>
  );
};

export default ProjectCarousel;
