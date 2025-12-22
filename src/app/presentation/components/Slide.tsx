'use client';

import { useRef, useMemo, ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html, RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';

interface SlideProps {
  index: number;
  title: string;
  subtitle?: string;
  content?: ReactNode;
  position: [number, number, number];
  isActive: boolean;
  color?: string;
  icon?: string;
}

export function Slide({
  index,
  title,
  subtitle,
  content,
  position,
  isActive,
  color = '#c9a227',
  icon,
}: SlideProps) {
  const groupRef = useRef<THREE.Group>(null);
  const cardRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Grid pattern for background
  const gridParticles = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 8;
      positions[i3 + 1] = (Math.random() - 0.5) * 6;
      positions[i3 + 2] = (Math.random() - 0.5) * 2;
    }

    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      // Subtle floating animation when active
      if (isActive) {
        groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.05;
      }
    }

    if (cardRef.current && isActive) {
      cardRef.current.rotation.y = Math.sin(time * 0.3) * 0.02;
    }

    if (glowRef.current) {
      const intensity = isActive ? 0.6 + Math.sin(time * 2) * 0.2 : 0.2;
      (glowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  const activeScale = isActive ? 1 : 0.85;
  const activeOpacity = isActive ? 1 : 0.4;

  return (
    <group ref={groupRef} position={position}>
      {/* Background grid particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={gridParticles.length / 3}
            array={gridParticles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color={color}
          transparent
          opacity={isActive ? 0.3 : 0.1}
          sizeAttenuation
        />
      </points>

      {/* Main card */}
      <group scale={[activeScale, activeScale, activeScale]}>
        {/* Card background */}
        <RoundedBox
          ref={cardRef}
          args={[6, 4, 0.1]}
          radius={0.1}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial
            color="#0a0a0f"
            metalness={0.5}
            roughness={0.3}
            transparent
            opacity={activeOpacity}
          />
        </RoundedBox>

        {/* Card border glow */}
        <mesh ref={glowRef} position={[0, 0, -0.05]}>
          <planeGeometry args={[6.1, 4.1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Slide number */}
        <Float speed={2} rotationIntensity={0} floatIntensity={0.2}>
          <Text
            position={[-2.5, 1.5, 0.1]}
            fontSize={0.3}
            color={color}
            anchorX="left"
            anchorY="top"
          >
            {String(index).padStart(2, '0')}
          </Text>
        </Float>

        {/* Icon */}
        {icon && (
          <Text
            position={[2.5, 1.5, 0.1]}
            fontSize={0.5}
            anchorX="right"
            anchorY="top"
          >
            {icon}
          </Text>
        )}

        {/* Title */}
        <Text
          position={[0, 0.3, 0.1]}
          fontSize={0.35}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={5}
          textAlign="center"
        >
          {title}
        </Text>

        {/* Subtitle */}
        {subtitle && (
          <Text
            position={[0, -0.3, 0.1]}
            fontSize={0.15}
            color="#888888"
            anchorX="center"
            anchorY="middle"
            maxWidth={5}
            textAlign="center"
          >
            {subtitle}
          </Text>
        )}

        {/* HTML content overlay */}
        {content && isActive && (
          <Html
            position={[0, -1, 0.2]}
            center
            transform
            distanceFactor={5}
            style={{
              transition: 'all 0.5s',
              opacity: isActive ? 1 : 0,
              transform: `scale(${isActive ? 1 : 0.8})`,
            }}
          >
            <div className="w-[400px] text-center text-white/80 text-sm">
              {content}
            </div>
          </Html>
        )}

        {/* Decorative lines */}
        <mesh position={[-3, 0, 0.05]}>
          <planeGeometry args={[0.02, 3.5]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
        <mesh position={[3, 0, 0.05]}>
          <planeGeometry args={[0.02, 3.5]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Lights */}
      {isActive && (
        <>
          <pointLight position={[0, 0, 2]} intensity={1} color={color} distance={4} />
          <spotLight
            position={[0, 3, 3]}
            angle={0.3}
            penumbra={0.5}
            intensity={0.5}
            color="#ffffff"
          />
        </>
      )}
    </group>
  );
}
