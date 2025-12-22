'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface IntroGateProps {
  onEnter: () => void;
  isActive: boolean;
}

export function IntroGate({ onEnter, isActive }: IntroGateProps) {
  const gateRef = useRef<THREE.Group>(null);
  const portalRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Particle system
  const particles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Golden/amber gradient
      colors[i3] = 0.9 + Math.random() * 0.1;
      colors[i3 + 1] = 0.7 + Math.random() * 0.2;
      colors[i3 + 2] = 0.2 + Math.random() * 0.3;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (gateRef.current && isActive) {
      gateRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
    }

    if (portalRef.current) {
      portalRef.current.rotation.z = time * 0.2;
      const scale = 1 + Math.sin(time * 2) * 0.05;
      portalRef.current.scale.set(scale, scale, 1);
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
      particlesRef.current.rotation.x = time * 0.03;
    }
  });

  return (
    <group ref={gateRef} position={[0, 0, 0]}>
      {/* Background particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.colors.length / 3}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Main portal frame */}
      <group position={[0, 0, 0]}>
        {/* Outer frame */}
        <RoundedBox args={[4, 5, 0.3]} radius={0.2} position={[0, 0, -0.2]}>
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.1}
          />
        </RoundedBox>

        {/* Inner glow frame */}
        <RoundedBox args={[3.6, 4.6, 0.2]} radius={0.15} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#c9a227"
            metalness={0.8}
            roughness={0.2}
            emissive="#c9a227"
            emissiveIntensity={0.3}
          />
        </RoundedBox>

        {/* Portal surface */}
        <mesh ref={portalRef} position={[0, 0, 0.1]} onClick={onEnter}>
          <circleGeometry args={[1.5, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.5}
            anisotropy={0.3}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.1}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
            color="#c9a227"
          />
        </mesh>
      </group>

      {/* Floating title */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[0, 3.5, 0]}
          fontSize={0.4}
          color="#c9a227"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          CM REMÉDIOS
        </Text>
      </Float>

      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
        <Text
          position={[0, 3, 0]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-regular.woff"
        >
          Proposta de Transformação Digital
        </Text>
      </Float>

      {/* Enter instruction */}
      <Float speed={3} rotationIntensity={0} floatIntensity={0.5}>
        <Text
          position={[0, -3, 0]}
          fontSize={0.12}
          color="#888888"
          anchorX="center"
          anchorY="middle"
        >
          Clique para entrar
        </Text>
      </Float>

      {/* Decorative rings */}
      {[1.8, 2.2, 2.6].map((radius, i) => (
        <mesh key={i} position={[0, 0, -0.3 - i * 0.1]} rotation={[0, 0, i * 0.5]}>
          <torusGeometry args={[radius, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#c9a227"
            emissive="#c9a227"
            emissiveIntensity={0.2 - i * 0.05}
            transparent
            opacity={0.5 - i * 0.1}
          />
        </mesh>
      ))}

      {/* Ambient light for the gate */}
      <pointLight position={[0, 0, 2]} intensity={2} color="#c9a227" distance={5} />
      <pointLight position={[0, 2, 1]} intensity={1} color="#ffffff" distance={3} />
    </group>
  );
}
