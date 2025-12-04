import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { ProjectItem } from '../types';

interface ProjectCarouselProps {
  projects: ProjectItem[];
}

const CARD_WIDTH = 3.2;
const CARD_HEIGHT = 2.0;
const SPACING = 1.8; // Space between cards in the stack

const CarouselItem = ({
  project,
  index,
  activeIndex,
  total
}: {
  project: ProjectItem;
  index: number;
  activeIndex: number;
  total: number;
}) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Card dimensions with padding
  const PADDING = 0.12;
  const CARD_BG_WIDTH = CARD_WIDTH + PADDING * 2;
  const CARD_BG_HEIGHT = CARD_HEIGHT + PADDING * 2;

  // Calculate position relative to active card (center)
  const offset = index - activeIndex;

  useFrame(() => {
    if (ref.current) {
      // Target position based on offset from center
      const targetZ = offset * SPACING;
      const targetX = offset * 0.4; // Slight horizontal spread

      // Scale: center card is largest (1.0), others smaller
      const targetScale = offset === 0 ? 1.0 : Math.max(0.65, 1 - Math.abs(offset) * 0.15);
      const hoverScale = hovered && offset === 0 ? 1.08 : 1.0;

      // Opacity: center card fully visible, others fade
      const targetOpacity = offset === 0 ? 1.0 : Math.max(0.4, 1 - Math.abs(offset) * 0.25);

      // Rotation: slight tilt for depth effect
      const targetRotationY = offset * 0.15;

      // Smooth transitions
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZ, 0.1);
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.1);
      ref.current.scale.lerp(new THREE.Vector3(targetScale * hoverScale, targetScale * hoverScale, 1), 0.1);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotationY, 0.1);

      // Update material opacity for all children
      ref.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if ('opacity' in mat) {
                mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.1);
              }
            });
          } else if ('opacity' in child.material) {
            child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, targetOpacity, 0.1);
          }
        }
      });
    }
  });

  return (
    <group
      ref={ref}
      position={[0, 0, index * SPACING]}
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
          transparent
          opacity={1}
        />
      </mesh>

      {/* Shadow plane */}
      <mesh position={[0.08, -0.08, -0.03]}>
        <planeGeometry args={[CARD_BG_WIDTH, CARD_BG_HEIGHT]} />
        <meshBasicMaterial
          color="black"
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Image */}
      <Image
        url={project.image}
        transparent
        opacity={1}
        side={THREE.DoubleSide}
        scale={[CARD_WIDTH, CARD_HEIGHT, 1]}
        toneMapped={false}
      />
    </group>
  );
};

const CoverflowCarousel = ({
  projects,
  activeIndex
}: {
  projects: ProjectItem[];
  activeIndex: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Center the active card
      const targetZ = -activeIndex * SPACING;
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, i) => (
        <CarouselItem
          key={i}
          project={project}
          index={i}
          activeIndex={activeIndex}
          total={projects.length}
        />
      ))}
    </group>
  );
};

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent default scrolling behavior on the carousel
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (e.deltaY > 0) {
          // Scroll down - next card
          setActiveIndex(prev => Math.min(prev + 1, projects.length - 1));
        } else {
          // Scroll up - previous card
          setActiveIndex(prev => Math.max(prev - 1, 0));
        }
      }, 50); // Debounce scroll
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setActiveIndex(prev => Math.min(prev + 1, projects.length - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setActiveIndex(prev => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [projects.length]);

  return (
    <div className="w-full h-[600px] relative z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 2]}>
        <ambientLight intensity={1.0} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={0.6} />
        <pointLight position={[-5, 3, 5]} intensity={0.4} />
        <directionalLight position={[0, 2, 5]} intensity={0.5} />
        <Environment preset="city" />

        <CoverflowCarousel projects={projects} activeIndex={activeIndex} />
      </Canvas>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex
                ? 'bg-purple-600 w-8'
                : 'bg-gray-400/50 hover:bg-gray-400'
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Project title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <h3 className="text-2xl font-bold text-gray-800 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg">
          {projects[activeIndex]?.title}
        </h3>
      </div>
    </div>
  );
};

export default ProjectCarousel;
