'use client';

import { useState } from 'react';
import { Text } from '@react-three/drei';

// Professional color palette
const GOLD = '#c9a227';
const DARK = '#1a1a2e';
const GRAY = '#666666';

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
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

  if (isIntro) return null;

  return (
    <group position={[0, -2.5, 5]}>
      {/* Left arrow - only show if not first slide */}
      {currentSlide > 0 && (
        <group
          position={[-3.5, 0, 0]}
          onClick={() => onNavigate('prev')}
          onPointerOver={() => {
            setLeftHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setLeftHovered(false);
            document.body.style.cursor = 'default';
          }}
        >
          {/* Arrow button background */}
          <mesh>
            <planeGeometry args={[0.5, 0.5]} />
            <meshBasicMaterial
              color={DARK}
              transparent
              opacity={leftHovered ? 0.9 : 0.6}
            />
          </mesh>
          {/* Border */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[0.52, 0.52]} />
            <meshBasicMaterial
              color={GOLD}
              transparent
              opacity={leftHovered ? 0.6 : 0.2}
            />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.48, 0.48]} />
            <meshBasicMaterial color={DARK} />
          </mesh>
          {/* Arrow symbol */}
          <Text
            position={[0, 0, 0.03]}
            fontSize={0.2}
            color={leftHovered ? '#ffffff' : GOLD}
            anchorX="center"
            anchorY="middle"
          >
            ‹
          </Text>
        </group>
      )}

      {/* Progress dots - minimalist */}
      <group position={[0, 0, 0]}>
        {Array.from({ length: totalSlides }).map((_, i) => {
          const isActive = i === currentSlide;
          const isPast = i < currentSlide;
          return (
            <mesh key={i} position={[(i - (totalSlides - 1) / 2) * 0.25, 0, 0]}>
              <circleGeometry args={[isActive ? 0.04 : 0.025, 16]} />
              <meshBasicMaterial
                color={isActive ? GOLD : isPast ? GOLD : GRAY}
                transparent
                opacity={isActive ? 1 : isPast ? 0.6 : 0.3}
              />
            </mesh>
          );
        })}
      </group>

      {/* Right arrow - only show if not last slide */}
      {currentSlide < totalSlides - 1 && (
        <group
          position={[3.5, 0, 0]}
          onClick={() => onNavigate('next')}
          onPointerOver={() => {
            setRightHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setRightHovered(false);
            document.body.style.cursor = 'default';
          }}
        >
          {/* Arrow button background */}
          <mesh>
            <planeGeometry args={[0.5, 0.5]} />
            <meshBasicMaterial
              color={DARK}
              transparent
              opacity={rightHovered ? 0.9 : 0.6}
            />
          </mesh>
          {/* Border */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[0.52, 0.52]} />
            <meshBasicMaterial
              color={GOLD}
              transparent
              opacity={rightHovered ? 0.6 : 0.2}
            />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.48, 0.48]} />
            <meshBasicMaterial color={DARK} />
          </mesh>
          {/* Arrow symbol */}
          <Text
            position={[0, 0, 0.03]}
            fontSize={0.2}
            color={rightHovered ? '#ffffff' : GOLD}
            anchorX="center"
            anchorY="middle"
          >
            ›
          </Text>
        </group>
      )}

      {/* Slide counter - subtle */}
      <Text
        position={[0, -0.4, 0]}
        fontSize={0.08}
        color={GRAY}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        {`${String(currentSlide + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`}
      </Text>
    </group>
  );
}
