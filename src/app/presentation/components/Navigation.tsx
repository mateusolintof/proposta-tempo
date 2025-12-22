'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNavigate: (direction: 'prev' | 'next') => void;
  isIntro: boolean;
}

export function Navigation({
  currentSlide,
  totalSlides,
  onNavigate,
  isIntro,
}: NavigationProps) {
  const leftArrowRef = useRef<THREE.Group>(null);
  const rightArrowRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (leftArrowRef.current) {
      leftArrowRef.current.position.x = -4 + Math.sin(time * 3) * 0.1;
    }
    if (rightArrowRef.current) {
      rightArrowRef.current.position.x = 4 - Math.sin(time * 3) * 0.1;
    }
  });

  if (isIntro) return null;

  return (
    <group position={[0, -2.5, 5]}>
      {/* Left arrow */}
      {currentSlide > 0 && (
        <group
          ref={leftArrowRef}
          position={[-4, 0, 0]}
          onClick={() => onNavigate('prev')}
          onPointerOver={(e) => {
            document.body.style.cursor = 'pointer';
            e.stopPropagation();
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default';
          }}
        >
          <mesh>
            <circleGeometry args={[0.3, 32]} />
            <meshStandardMaterial
              color="#1a1a2e"
              transparent
              opacity={0.8}
            />
          </mesh>
          <Text
            position={[0, 0, 0.1]}
            fontSize={0.25}
            color="#c9a227"
            anchorX="center"
            anchorY="middle"
          >
            ←
          </Text>
        </group>
      )}

      {/* Progress indicator */}
      <group position={[0, 0, 0]}>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <mesh key={i} position={[(i - (totalSlides - 1) / 2) * 0.4, 0, 0]}>
            <circleGeometry args={[i === currentSlide ? 0.08 : 0.05, 16]} />
            <meshBasicMaterial
              color={i === currentSlide ? '#c9a227' : '#444444'}
            />
          </mesh>
        ))}
      </group>

      {/* Right arrow */}
      {currentSlide < totalSlides - 1 && (
        <group
          ref={rightArrowRef}
          position={[4, 0, 0]}
          onClick={() => onNavigate('next')}
          onPointerOver={(e) => {
            document.body.style.cursor = 'pointer';
            e.stopPropagation();
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default';
          }}
        >
          <mesh>
            <circleGeometry args={[0.3, 32]} />
            <meshStandardMaterial
              color="#1a1a2e"
              transparent
              opacity={0.8}
            />
          </mesh>
          <Text
            position={[0, 0, 0.1]}
            fontSize={0.25}
            color="#c9a227"
            anchorX="center"
            anchorY="middle"
          >
            →
          </Text>
        </group>
      )}

      {/* Slide counter */}
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.1}
        color="#666666"
        anchorX="center"
        anchorY="middle"
      >
        {`${currentSlide + 1} / ${totalSlides}`}
      </Text>
    </group>
  );
}
