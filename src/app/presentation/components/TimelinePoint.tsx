'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { TimelinePoint as TimelinePointData } from '../data/timelineData';

interface TimelinePointProps {
  data: TimelinePointData;
  position: [number, number, number];
  isActive: boolean;
  onClick: () => void;
}

export function TimelinePoint({ data, position, isActive, onClick }: TimelinePointProps) {
  const groupRef = useRef<THREE.Group>(null);
  const iconRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      // Float animation
      if (isActive) {
        groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1;
      }
    }

    if (iconRef.current && isActive) {
      iconRef.current.rotation.y = time * 0.5;
    }
  });

  const scale = isActive ? 1.2 : hovered ? 1.1 : 1;
  const opacity = isActive ? 1 : 0.6;

  return (
    <group
      ref={groupRef}
      position={position}
      scale={[scale, scale, scale]}
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
      {/* Background card */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[3, 2.5]} />
        <meshStandardMaterial
          color="#0a0a0f"
          transparent
          opacity={opacity * 0.9}
        />
      </mesh>

      {/* Border glow */}
      <mesh position={[0, 0, -0.15]}>
        <planeGeometry args={[3.1, 2.6]} />
        <meshBasicMaterial
          color={data.color}
          transparent
          opacity={isActive ? 0.4 : 0.15}
        />
      </mesh>

      {/* Icon sphere */}
      <mesh ref={iconRef} position={[0, 0.6, 0.1]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={isActive ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Icon emoji */}
      <Text
        position={[0, 0.6, 0.4]}
        fontSize={0.35}
        anchorX="center"
        anchorY="middle"
      >
        {data.icon}
      </Text>

      {/* Title */}
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
        textAlign="center"
        fontWeight="bold"
      >
        {data.title}
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, -0.35, 0.1]}
        fontSize={0.1}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
        textAlign="center"
      >
        {data.subtitle}
      </Text>

      {/* Metrics preview */}
      {data.metrics && isActive && (
        <group position={[0, -0.8, 0.1]}>
          {data.metrics.slice(0, 2).map((metric, i) => (
            <group key={i} position={[(i - 0.5) * 1.2, 0, 0]}>
              <Text
                position={[0, 0, 0]}
                fontSize={0.15}
                color={data.color}
                anchorX="center"
                anchorY="middle"
                fontWeight="bold"
              >
                {metric.value}
              </Text>
              <Text
                position={[0, -0.2, 0]}
                fontSize={0.07}
                color="#666666"
                anchorX="center"
                anchorY="middle"
              >
                {metric.label}
              </Text>
            </group>
          ))}
        </group>
      )}

      {/* Point number indicator */}
      <Text
        position={[-1.3, 1.1, 0.1]}
        fontSize={0.12}
        color={data.color}
        anchorX="left"
        anchorY="middle"
      >
        {String(data.id).padStart(2, '0')}
      </Text>

      {/* Light for active point */}
      {isActive && (
        <pointLight
          position={[0, 0, 1]}
          intensity={0.5}
          color={data.color}
          distance={3}
        />
      )}
    </group>
  );
}
