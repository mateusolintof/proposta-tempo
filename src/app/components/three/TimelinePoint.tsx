'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { TimelinePoint as TimelinePointData } from '@/app/data/timelineData';

// Professional color palette
const GOLD = '#c9a227';
const WHITE = '#ffffff';
const GRAY = '#666666';
const DARK = '#0a0a0f';

interface TimelinePointProps {
  data: TimelinePointData;
  position: [number, number, number];
  isActive: boolean;
  onClick: () => void;
}

export function TimelinePoint({ data, position, isActive, onClick }: TimelinePointProps) {
  const groupRef = useRef<THREE.Group>(null);
  const borderRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current && isActive) {
      // Very subtle scale breathing
      const scale = 1 + Math.sin(time * 1.5) * 0.01;
      groupRef.current.scale.set(scale, scale, scale);
    }

    // Subtle border glow pulse for active
    if (borderRef.current && isActive) {
      const opacity = 0.4 + Math.sin(time * 2) * 0.1;
      (borderRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  const opacity = isActive ? 1 : hovered ? 0.8 : 0.5;

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      {/* Card background */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[4, 2.5]} />
        <meshBasicMaterial color={DARK} transparent opacity={0.9} />
      </mesh>

      {/* Subtle border glow */}
      <mesh ref={borderRef} position={[0, 0, -0.06]}>
        <planeGeometry args={[4.05, 2.55]} />
        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={isActive ? 0.4 : 0.1}
        />
      </mesh>

      {/* Top accent line */}
      <mesh position={[0, 1.2, 0]}>
        <planeGeometry args={[3.8, 0.002]} />
        <meshBasicMaterial color={GOLD} transparent opacity={opacity * 0.6} />
      </mesh>

      {/* Section number */}
      <Text
        position={[-1.7, 0.9, 0.01]}
        fontSize={0.12}
        color={GOLD}
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {String(data.id).padStart(2, '0')}
      </Text>

      {/* Title */}
      <Text
        position={[0, 0.4, 0.01]}
        fontSize={0.22}
        color={WHITE}
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
        textAlign="center"
        letterSpacing={0.02}
      >
        {data.title}
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.1}
        color={GRAY}
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
        textAlign="center"
      >
        {data.subtitle}
      </Text>

      {/* Metrics preview - only show when active */}
      {data.metrics && isActive && (
        <group position={[0, -0.7, 0.01]}>
          {data.metrics.slice(0, 2).map((metric, i) => {
            const xPos = data.metrics!.length === 1 ? 0 : (i - 0.5) * 1.5;
            return (
              <group key={i} position={[xPos, 0, 0]}>
                <Text
                  position={[0, 0, 0]}
                  fontSize={0.2}
                  color={GOLD}
                  anchorX="center"
                  anchorY="middle"
                  letterSpacing={0.02}
                >
                  {metric.value}
                </Text>
                <Text
                  position={[0, -0.25, 0]}
                  fontSize={0.08}
                  color={GRAY}
                  anchorX="center"
                  anchorY="middle"
                >
                  {metric.label}
                </Text>
              </group>
            );
          })}
        </group>
      )}

      {/* Subtle point light for active section */}
      {isActive && (
        <pointLight
          position={[0, 0, 2]}
          intensity={0.3}
          color={GOLD}
          distance={5}
        />
      )}
    </group>
  );
}
