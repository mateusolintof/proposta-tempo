'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TIMELINE_DATA } from '@/app/data/timelineData';

// Professional color palette
const GOLD = '#c9a227';
const DARK_GOLD = '#8a7019';

interface TimelineTrackProps {
  currentPoint: number;
  spacing: number;
}

export function TimelineTrack({ currentPoint, spacing }: TimelineTrackProps) {
  const progressRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    // Animate progress indicator position
    if (progressRef.current) {
      const targetZ = -currentPoint * spacing;
      progressRef.current.position.z = THREE.MathUtils.lerp(
        progressRef.current.position.z,
        targetZ,
        0.05
      );
    }
  });

  const totalLength = (TIMELINE_DATA.length - 1) * spacing;

  return (
    <group position={[-3, 0, 0]}>
      {/* Main vertical track line (along Z axis) */}
      <mesh position={[0, 0, -totalLength / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.002, totalLength + 4]} />
        <meshBasicMaterial color={DARK_GOLD} transparent opacity={0.4} />
      </mesh>

      {/* Progress indicator - current position */}
      <mesh ref={progressRef} position={[0, 0, 0]}>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial color={GOLD} />
      </mesh>

      {/* Section markers */}
      {TIMELINE_DATA.map((point, index) => {
        const isActive = index === currentPoint;
        const isPast = index < currentPoint;

        return (
          <group key={point.id} position={[0, 0, -index * spacing]}>
            {/* Marker dot */}
            <mesh>
              <circleGeometry args={[isActive ? 0.05 : 0.03, 16]} />
              <meshBasicMaterial
                color={isActive || isPast ? GOLD : DARK_GOLD}
                transparent
                opacity={isActive ? 1 : isPast ? 0.8 : 0.3}
              />
            </mesh>

            {/* Connection line to content (horizontal) */}
            <mesh position={[1.5, 0, 0]}>
              <planeGeometry args={[3, 0.001]} />
              <meshBasicMaterial
                color={GOLD}
                transparent
                opacity={isActive ? 0.4 : 0.1}
              />
            </mesh>
          </group>
        );
      })}

      {/* Subtle glow for active section */}
      <pointLight
        position={[0, 0, -currentPoint * spacing]}
        intensity={0.2}
        color={GOLD}
        distance={3}
      />
    </group>
  );
}
