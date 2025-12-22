'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TIMELINE_DATA } from '@/app/data/timelineData';

interface TimelineTrackProps {
  currentPoint: number;
  spacing: number;
}

export function TimelineTrack({ currentPoint, spacing }: TimelineTrackProps) {
  const trackRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create flowing particles along the track
  const flowParticles = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    const totalLength = (TIMELINE_DATA.length - 1) * spacing;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Distribute along the track
      positions[i3] = Math.random() * totalLength - spacing;
      positions[i3 + 1] = (Math.random() - 0.5) * 0.3;
      positions[i3 + 2] = (Math.random() - 0.5) * 0.3;

      // Golden color
      colors[i3] = 0.79 + Math.random() * 0.1;
      colors[i3 + 1] = 0.64 + Math.random() * 0.1;
      colors[i3 + 2] = 0.15 + Math.random() * 0.1;

      speeds[i] = 0.5 + Math.random() * 1.5;
    }

    return { positions, colors, speeds };
  }, [spacing]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const totalLength = (TIMELINE_DATA.length - 1) * spacing;

      for (let i = 0; i < positions.length / 3; i++) {
        const i3 = i * 3;
        // Move particles forward
        positions[i3] += flowParticles.speeds[i] * 0.02;

        // Reset when past the end
        if (positions[i3] > totalLength + 2) {
          positions[i3] = -2;
        }

        // Subtle vertical oscillation
        positions[i3 + 1] = Math.sin(time * 2 + i * 0.5) * 0.1;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const totalLength = (TIMELINE_DATA.length - 1) * spacing;

  return (
    <group ref={trackRef} position={[0, -2, 0]}>
      {/* Main track line */}
      <mesh position={[totalLength / 2 - spacing / 2, 0, 0]}>
        <boxGeometry args={[totalLength + 4, 0.02, 0.02]} />
        <meshStandardMaterial
          color="#c9a227"
          emissive="#c9a227"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Glow plane under track */}
      <mesh position={[totalLength / 2 - spacing / 2, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[totalLength + 6, 1]} />
        <meshBasicMaterial
          color="#c9a227"
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* Flowing particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={flowParticles.positions.length / 3}
            array={flowParticles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={flowParticles.colors.length / 3}
            array={flowParticles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Connection dots at each point */}
      {TIMELINE_DATA.map((point, index) => {
        const isActive = index === currentPoint;
        const isPast = index < currentPoint;

        return (
          <group key={point.id} position={[index * spacing, 0, 0]}>
            {/* Main dot */}
            <mesh>
              <sphereGeometry args={[isActive ? 0.15 : 0.08, 16, 16]} />
              <meshStandardMaterial
                color={isActive ? '#c9a227' : isPast ? '#c9a227' : '#444444'}
                emissive={isActive ? '#c9a227' : '#000000'}
                emissiveIntensity={isActive ? 0.5 : 0}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Glow ring for active point */}
            {isActive && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.25, 0.02, 16, 32]} />
                <meshStandardMaterial
                  color="#c9a227"
                  emissive="#c9a227"
                  emissiveIntensity={0.8}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            )}

            {/* Vertical connector line */}
            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[0.01, 2, 0.01]} />
              <meshBasicMaterial
                color={isActive ? '#c9a227' : '#333333'}
                transparent
                opacity={isActive ? 0.8 : 0.3}
              />
            </mesh>
          </group>
        );
      })}

      {/* Track lighting */}
      <pointLight
        position={[currentPoint * spacing, 0, 1]}
        intensity={1}
        color="#c9a227"
        distance={5}
      />
    </group>
  );
}
