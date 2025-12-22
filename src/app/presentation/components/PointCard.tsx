'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { TimelinePoint as TimelinePointData } from '../data/timelineData';

interface PointCardProps {
  data: TimelinePointData;
  isVisible: boolean;
  position: [number, number, number];
}

export function PointCard({ data, isVisible, position }: PointCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current && isVisible) {
      // Subtle breathing animation
      const scale = 1 + Math.sin(time * 1.5) * 0.02;
      groupRef.current.scale.set(scale, scale, scale);
    }

    if (glowRef.current) {
      const intensity = 0.3 + Math.sin(time * 2) * 0.1;
      (glowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  if (!isVisible) return null;

  return (
    <group ref={groupRef} position={position}>
      {/* Card background */}
      <RoundedBox args={[5, 4, 0.1]} radius={0.1} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#0f0f15"
          metalness={0.3}
          roughness={0.7}
        />
      </RoundedBox>

      {/* Glow border */}
      <mesh ref={glowRef} position={[0, 0, -0.05]}>
        <planeGeometry args={[5.15, 4.15]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Header section */}
      <group position={[0, 1.5, 0.1]}>
        {/* Icon */}
        <Text
          position={[-2, 0, 0]}
          fontSize={0.4}
          anchorX="left"
          anchorY="middle"
        >
          {data.icon}
        </Text>

        {/* Number */}
        <Text
          position={[2.2, 0, 0]}
          fontSize={0.2}
          color={data.color}
          anchorX="right"
          anchorY="middle"
        >
          {String(data.id).padStart(2, '0')}
        </Text>

        {/* Title */}
        <Text
          position={[-1.3, 0, 0]}
          fontSize={0.25}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          fontWeight="bold"
        >
          {data.title}
        </Text>

        {/* Subtitle */}
        <Text
          position={[-1.3, -0.35, 0]}
          fontSize={0.12}
          color="#888888"
          anchorX="left"
          anchorY="middle"
          maxWidth={4}
        >
          {data.subtitle}
        </Text>
      </group>

      {/* Divider line */}
      <mesh position={[0, 0.85, 0.1]}>
        <planeGeometry args={[4.5, 0.005]} />
        <meshBasicMaterial color={data.color} transparent opacity={0.3} />
      </mesh>

      {/* Key points - using Html for better rendering */}
      <Html
        position={[0, 0, 0.2]}
        center
        transform
        distanceFactor={4}
        style={{
          width: '350px',
          pointerEvents: 'none',
        }}
      >
        <div className="text-white/90 text-sm space-y-2">
          {data.keyPoints.map((point, i) => (
            <div key={i} className="flex items-start gap-2">
              <span style={{ color: data.color }}>•</span>
              <span className="text-white/80">{point}</span>
            </div>
          ))}
        </div>
      </Html>

      {/* Metrics section */}
      {data.metrics && (
        <group position={[0, -1.5, 0.1]}>
          <mesh position={[0, 0.3, 0]}>
            <planeGeometry args={[4.5, 0.005]} />
            <meshBasicMaterial color={data.color} transparent opacity={0.3} />
          </mesh>

          {data.metrics.map((metric, i) => {
            const xPos = (i - (data.metrics!.length - 1) / 2) * 1.8;
            return (
              <group key={i} position={[xPos, -0.1, 0]}>
                <Text
                  position={[0, 0, 0]}
                  fontSize={0.25}
                  color={data.color}
                  anchorX="center"
                  anchorY="middle"
                  fontWeight="bold"
                >
                  {metric.value}
                </Text>
                <Text
                  position={[0, -0.25, 0]}
                  fontSize={0.1}
                  color="#666666"
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

      {/* Accent light */}
      <pointLight
        position={[0, 0, 2]}
        intensity={0.8}
        color={data.color}
        distance={4}
      />
    </group>
  );
}
