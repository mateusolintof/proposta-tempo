'use client';

import * as THREE from 'three';

// Professional color palette
const BACKGROUND = '#050510';

export function Environment() {
  return (
    <group>
      {/* Clean dark background */}
      <mesh scale={[200, 200, 200]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={BACKGROUND} side={THREE.BackSide} />
      </mesh>

      {/* Subtle ambient lighting */}
      <ambientLight intensity={0.3} />

      {/* Main directional light - soft warm white */}
      <directionalLight
        position={[5, 5, 10]}
        intensity={0.4}
        color="#ffffff"
      />

      {/* Fill light from opposite side */}
      <directionalLight
        position={[-5, -2, 5]}
        intensity={0.15}
        color="#ffffff"
      />
    </group>
  );
}
