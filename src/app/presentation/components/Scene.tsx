'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Noise,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

import { IntroGate } from './IntroGate';
import { Slide } from './Slide';
import { Navigation } from './Navigation';
import { Environment } from './Environment';

interface SlideData {
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  color?: string;
  icon?: string;
}

const SLIDES_DATA: SlideData[] = [
  {
    title: 'O Desafio',
    subtitle: 'Atendimento ao cliente fragmentado e ineficiente',
    content: (
      <div className="space-y-2">
        <p>• Alto volume de chamados repetitivos</p>
        <p>• Tempo de resposta elevado</p>
        <p>• Falta de integração entre canais</p>
      </div>
    ),
    color: '#e74c3c',
    icon: '⚡',
  },
  {
    title: 'Nossa Solução',
    subtitle: 'Plataforma integrada de atendimento inteligente',
    content: (
      <div className="space-y-2">
        <p>• Chatbot com IA avançada</p>
        <p>• CRM unificado</p>
        <p>• Automação de processos</p>
      </div>
    ),
    color: '#c9a227',
    icon: '💡',
  },
  {
    title: 'Tecnologia',
    subtitle: 'Stack moderna e escalável',
    content: (
      <div className="space-y-2">
        <p>• Inteligência Artificial</p>
        <p>• Cloud Native</p>
        <p>• APIs RESTful</p>
      </div>
    ),
    color: '#3498db',
    icon: '🔧',
  },
  {
    title: 'Resultados Esperados',
    subtitle: 'Impacto mensurável em 90 dias',
    content: (
      <div className="space-y-2">
        <p>• 40% redução no tempo de atendimento</p>
        <p>• 60% dos chamados automatizados</p>
        <p>• NPS elevado em 25 pontos</p>
      </div>
    ),
    color: '#27ae60',
    icon: '📈',
  },
  {
    title: 'Investimento',
    subtitle: 'ROI positivo em 6 meses',
    content: (
      <div className="space-y-2">
        <p>• Implementação em fases</p>
        <p>• Suporte contínuo incluído</p>
        <p>• Escalável conforme demanda</p>
      </div>
    ),
    color: '#9b59b6',
    icon: '💰',
  },
  {
    title: 'Próximos Passos',
    subtitle: 'Vamos começar essa jornada juntos',
    content: (
      <div className="space-y-2">
        <p>1. Reunião de alinhamento</p>
        <p>2. Diagnóstico detalhado</p>
        <p>3. Proposta personalizada</p>
      </div>
    ),
    color: '#c9a227',
    icon: '🚀',
  },
];

const SLIDE_SPACING = 10;

export function Scene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetPosition = useRef(new THREE.Vector3(0, 0, 8));
  const currentPosition = useRef(new THREE.Vector3(0, 0, 8));

  const [isIntro, setIsIntro] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { size } = useThree();

  // Calculate slide positions
  const getSlidePosition = (index: number): [number, number, number] => {
    return [index * SLIDE_SPACING, 0, 0];
  };

  // Handle intro gate enter
  const handleEnterPresentation = useCallback(() => {
    setIsIntro(false);
    targetPosition.current.set(0, 0, 8);
  }, []);

  // Handle navigation
  const handleNavigate = useCallback(
    (direction: 'prev' | 'next') => {
      const newSlide =
        direction === 'next'
          ? Math.min(currentSlide + 1, SLIDES_DATA.length - 1)
          : Math.max(currentSlide - 1, 0);

      setCurrentSlide(newSlide);
      targetPosition.current.set(newSlide * SLIDE_SPACING, 0, 8);
    },
    [currentSlide]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isIntro) {
        if (e.key === 'Enter' || e.key === ' ') {
          handleEnterPresentation();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          handleNavigate('prev');
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          handleNavigate('next');
          break;
        case 'Escape':
          setIsIntro(true);
          setCurrentSlide(0);
          targetPosition.current.set(0, 0, 8);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isIntro, handleNavigate, handleEnterPresentation]);

  // Smooth camera movement
  useFrame(() => {
    currentPosition.current.lerp(targetPosition.current, 0.05);

    if (cameraRef.current) {
      cameraRef.current.position.copy(currentPosition.current);
      cameraRef.current.lookAt(
        currentPosition.current.x,
        currentPosition.current.y,
        currentPosition.current.z - 10
      );
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 8]}
        fov={50}
      />

      <Environment />

      {/* Intro Gate */}
      <group visible={isIntro}>
        <IntroGate onEnter={handleEnterPresentation} isActive={isIntro} />
      </group>

      {/* Slides */}
      <group visible={!isIntro}>
        {SLIDES_DATA.map((slide, index) => (
          <Slide
            key={index}
            index={index + 1}
            title={slide.title}
            subtitle={slide.subtitle}
            content={slide.content}
            position={getSlidePosition(index)}
            isActive={currentSlide === index}
            color={slide.color}
            icon={slide.icon}
          />
        ))}
      </group>

      {/* Navigation */}
      <Navigation
        currentSlide={currentSlide}
        totalSlides={SLIDES_DATA.length}
        onNavigate={handleNavigate}
        isIntro={isIntro}
      />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          height={300}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0005, 0.0005)}
        />
        <Vignette
          offset={0.3}
          darkness={0.6}
          blendFunction={BlendFunction.NORMAL}
        />
        <Noise
          blendFunction={BlendFunction.OVERLAY}
          opacity={0.02}
        />
      </EffectComposer>
    </>
  );
}
