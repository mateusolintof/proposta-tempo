"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ElegantNetworkProps {
  particleCount?: number;
  connectionDistance?: number;
  speed?: number;
}

// Seeded random for consistent particle generation
function createSeededRandom(seed: number) {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

// Simple noise function for organic movement
function noise3D(x: number, y: number, z: number): number {
  const n = Math.sin(x * 1.27 + y * 3.43 + z * 2.17) * 43758.5453;
  return (n - Math.floor(n)) * 2 - 1;
}

function createParticles(count: number) {
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const rand = createSeededRandom(count * 97 + 13);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (rand() - 0.5) * 20; // X: -10 to 10
    positions[i3 + 1] = (rand() - 0.5) * 12; // Y: -6 to 6
    positions[i3 + 2] = (rand() - 0.5) * 8; // Z: -4 to 4

    velocities[i3] = (rand() - 0.5) * 0.02;
    velocities[i3 + 1] = (rand() - 0.5) * 0.02;
    velocities[i3 + 2] = (rand() - 0.5) * 0.02;
  }

  return { positions, velocities };
}

export default function ElegantNetwork({
  particleCount = 150,
  connectionDistance = 2.5,
  speed = 0.0005,
}: ElegantNetworkProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, velocities } = useMemo(
    () => createParticles(particleCount),
    [particleCount]
  );

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions.slice(), 3)
    );
    return geometry;
  }, [positions]);

  const lineGeometry = useMemo(() => {
    const maxConnections = (particleCount * (particleCount - 1)) / 2;
    const linePositions = new Float32Array(maxConnections * 6);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    return geometry;
  }, [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.elapsedTime * speed * 1000;
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    // Update particle positions with noise-based movement
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      const noiseX = noise3D(posArray[i3] * 0.1, time, i * 0.1) * 0.01;
      const noiseY =
        noise3D(posArray[i3 + 1] * 0.1, time + 100, i * 0.1) * 0.01;
      const noiseZ =
        noise3D(posArray[i3 + 2] * 0.1, time + 200, i * 0.1) * 0.005;

      posArray[i3] += velocities[i3] + noiseX;
      posArray[i3 + 1] += velocities[i3 + 1] + noiseY;
      posArray[i3 + 2] += velocities[i3 + 2] + noiseZ;

      // Boundary wrap
      if (posArray[i3] > 10) posArray[i3] = -10;
      if (posArray[i3] < -10) posArray[i3] = 10;
      if (posArray[i3 + 1] > 6) posArray[i3 + 1] = -6;
      if (posArray[i3 + 1] < -6) posArray[i3 + 1] = 6;
      if (posArray[i3 + 2] > 4) posArray[i3 + 2] = -4;
      if (posArray[i3 + 2] < -4) posArray[i3 + 2] = 4;
    }
    posAttr.needsUpdate = true;

    // Update connection lines
    const lineAttr = linesRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const lineArray = lineAttr.array as Float32Array;

    let lineIndex = 0;
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const i3 = i * 3;
        const j3 = j * 3;

        const dx = posArray[i3] - posArray[j3];
        const dy = posArray[i3 + 1] - posArray[j3 + 1];
        const dz = posArray[i3 + 2] - posArray[j3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < connectionDistance) {
          const li = lineIndex * 6;
          lineArray[li] = posArray[i3];
          lineArray[li + 1] = posArray[i3 + 1];
          lineArray[li + 2] = posArray[i3 + 2];
          lineArray[li + 3] = posArray[j3];
          lineArray[li + 4] = posArray[j3 + 1];
          lineArray[li + 5] = posArray[j3 + 2];
          lineIndex++;
        }
      }
    }

    // Clear remaining lines
    for (let i = lineIndex * 6; i < lineArray.length; i++) {
      lineArray[i] = 0;
    }
    lineAttr.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
  });

  return (
    <group>
      <points ref={pointsRef} geometry={particleGeometry}>
        <pointsMaterial
          color="#FFFFFF"
          size={0.05}
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#4F4F4F"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
