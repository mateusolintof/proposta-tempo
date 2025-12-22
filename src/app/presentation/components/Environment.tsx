'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Environment() {
  const starsRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Mesh>(null);

  // Star field
  const stars = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 30 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Warm star colors
      const colorChoice = Math.random();
      if (colorChoice > 0.8) {
        // Gold
        colors[i3] = 0.9;
        colors[i3 + 1] = 0.75;
        colors[i3 + 2] = 0.3;
      } else if (colorChoice > 0.6) {
        // Warm white
        colors[i3] = 1;
        colors[i3 + 1] = 0.95;
        colors[i3 + 2] = 0.85;
      } else {
        // Cool white
        colors[i3] = 0.9;
        colors[i3 + 1] = 0.9;
        colors[i3 + 2] = 1;
      }

      sizes[i] = Math.random() * 0.05 + 0.01;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (starsRef.current) {
      starsRef.current.rotation.y = time * 0.01;
      starsRef.current.rotation.x = time * 0.005;
    }

    if (nebulaRef.current) {
      nebulaRef.current.rotation.z = time * 0.02;
    }
  });

  return (
    <group>
      {/* Background gradient sphere */}
      <mesh scale={[100, 100, 100]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#050510" side={THREE.BackSide} />
      </mesh>

      {/* Star field */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={stars.positions.length / 3}
            array={stars.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={stars.colors.length / 3}
            array={stars.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Nebula effect */}
      <mesh ref={nebulaRef} position={[10, 5, -30]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial
          color="#c9a227"
          transparent
          opacity={0.03}
        />
      </mesh>

      {/* Secondary nebula */}
      <mesh position={[-15, -8, -25]} rotation={[0, 0, 0.5]}>
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial
          color="#2a1f5c"
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
    </group>
  );
}
