'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface IntroGateProps {
  onEnter: () => void;
  isActive: boolean;
}

// Professional color palette
const GOLD = '#c9a227';
const WHITE = '#ffffff';
const GRAY = '#888888';

export function IntroGate({ onEnter, isActive }: IntroGateProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.Mesh>(null);
  const [opacity, setOpacity] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Fade in animation
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setOpacity(1), 100);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Subtle breathing animation for the line
    if (lineRef.current) {
      const scale = 1 + Math.sin(time * 1.5) * 0.02;
      lineRef.current.scale.x = scale;
    }
  });

  if (!isActive) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main title - CM REMÉDIOS */}
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.8}
        color={WHITE}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
      >
        CM REMÉDIOS
      </Text>

      {/* Horizontal golden line separator */}
      <mesh ref={lineRef} position={[0, 0.5, 0]}>
        <planeGeometry args={[3, 0.003]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.8} />
      </mesh>

      {/* Subtitle */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.2}
        color={GRAY}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        Proposta de Transformação Digital
      </Text>

      {/* Secondary tagline */}
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.12}
        color={GOLD}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        Agentes Inteligentes para Atendimento Comercial
      </Text>

      {/* Start button */}
      <group
        position={[0, -1.5, 0]}
        onClick={onEnter}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        {/* Button background */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[2.2, 0.45]} />
          <meshBasicMaterial
            color={hovered ? GOLD : '#0a0a0f'}
            transparent
            opacity={hovered ? 0.15 : 0.5}
          />
        </mesh>

        {/* Button border */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.2, 0.45]} />
          <meshBasicMaterial color={GOLD} transparent opacity={0} />
        </mesh>

        {/* Border lines */}
        <mesh position={[0, 0.22, 0]}>
          <planeGeometry args={[2.2, 0.002]} />
          <meshBasicMaterial color={GOLD} transparent opacity={hovered ? 1 : 0.5} />
        </mesh>
        <mesh position={[0, -0.22, 0]}>
          <planeGeometry args={[2.2, 0.002]} />
          <meshBasicMaterial color={GOLD} transparent opacity={hovered ? 1 : 0.5} />
        </mesh>
        <mesh position={[-1.1, 0, 0]}>
          <planeGeometry args={[0.002, 0.45]} />
          <meshBasicMaterial color={GOLD} transparent opacity={hovered ? 1 : 0.5} />
        </mesh>
        <mesh position={[1.1, 0, 0]}>
          <planeGeometry args={[0.002, 0.45]} />
          <meshBasicMaterial color={GOLD} transparent opacity={hovered ? 1 : 0.5} />
        </mesh>

        {/* Button text */}
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.11}
          color={hovered ? WHITE : GOLD}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          INICIAR APRESENTAÇÃO
        </Text>
      </group>

      {/* Subtle ambient light */}
      <pointLight position={[0, 0, 3]} intensity={0.5} color={WHITE} distance={8} />
    </group>
  );
}
