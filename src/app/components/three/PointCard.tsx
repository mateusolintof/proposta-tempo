'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { TimelinePoint as TimelinePointData } from '@/app/data/timelineData';

// Professional color palette
const GOLD = '#c9a227';
const WHITE = '#ffffff';
const GRAY = '#666666';
const LIGHT_GRAY = '#888888';
const DARK = '#0a0a0f';

interface PointCardProps {
  data: TimelinePointData;
  isVisible: boolean;
  position: [number, number, number];
}

export function PointCard({ data, isVisible, position }: PointCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const borderRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current && isVisible) {
      // Very subtle breathing
      const scale = 1 + Math.sin(time * 1.2) * 0.005;
      groupRef.current.scale.set(scale, scale, scale);
    }

    if (borderRef.current && isVisible) {
      const opacity = 0.3 + Math.sin(time * 1.5) * 0.05;
      (borderRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  if (!isVisible) return null;

  return (
    <group ref={groupRef} position={position}>
      {/* Card background */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[5.5, 4]} />
        <meshBasicMaterial color={DARK} transparent opacity={0.95} />
      </mesh>

      {/* Border glow */}
      <mesh ref={borderRef} position={[0, 0, -0.03]}>
        <planeGeometry args={[5.55, 4.05]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.3} />
      </mesh>

      {/* Top accent line */}
      <mesh position={[0, 1.95, 0]}>
        <planeGeometry args={[5.3, 0.003]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.8} />
      </mesh>

      {/* Header section */}
      <group position={[0, 1.5, 0.01]}>
        {/* Section number */}
        <Text
          position={[-2.5, 0, 0]}
          fontSize={0.14}
          color={GOLD}
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.05}
        >
          {String(data.id).padStart(2, '0')}
        </Text>

        {/* Title */}
        <Text
          position={[0, 0, 0]}
          fontSize={0.28}
          color={WHITE}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.02}
        >
          {data.title}
        </Text>
      </group>

      {/* Subtitle */}
      <Text
        position={[0, 1, 0.01]}
        fontSize={0.12}
        color={LIGHT_GRAY}
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
      >
        {data.subtitle}
      </Text>

      {/* Divider */}
      <mesh position={[0, 0.7, 0.01]}>
        <planeGeometry args={[5, 0.001]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.3} />
      </mesh>

      {/* Key points */}
      <group position={[-2.4, 0.3, 0.01]}>
        {data.keyPoints.map((point, i) => (
          <group key={i} position={[0, -i * 0.35, 0]}>
            {/* Bullet */}
            <mesh position={[-0.1, 0, 0]}>
              <circleGeometry args={[0.02, 16]} />
              <meshBasicMaterial color={GOLD} />
            </mesh>
            {/* Text */}
            <Text
              position={[0.1, 0, 0]}
              fontSize={0.1}
              color={WHITE}
              anchorX="left"
              anchorY="middle"
              maxWidth={4.5}
            >
              {point}
            </Text>
          </group>
        ))}
      </group>

      {/* Metrics section */}
      {data.metrics && data.metrics.length > 0 && (
        <group position={[0, -1.5, 0.01]}>
          {/* Metrics divider */}
          <mesh position={[0, 0.35, 0]}>
            <planeGeometry args={[5, 0.001]} />
            <meshBasicMaterial color={GOLD} transparent opacity={0.3} />
          </mesh>

          {/* Metrics */}
          {data.metrics.map((metric, i) => {
            const totalMetrics = data.metrics!.length;
            const xPos = totalMetrics === 1
              ? 0
              : (i - (totalMetrics - 1) / 2) * 2;
            return (
              <group key={i} position={[xPos, -0.1, 0]}>
                <Text
                  position={[0, 0, 0]}
                  fontSize={0.3}
                  color={GOLD}
                  anchorX="center"
                  anchorY="middle"
                  letterSpacing={0.02}
                >
                  {metric.value}
                </Text>
                <Text
                  position={[0, -0.3, 0]}
                  fontSize={0.09}
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

      {/* Subtle accent light */}
      <pointLight
        position={[0, 0, 3]}
        intensity={0.4}
        color={GOLD}
        distance={6}
      />
    </group>
  );
}
