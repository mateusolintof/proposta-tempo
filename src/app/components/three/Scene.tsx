'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
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
import { TimelineTrack } from './TimelineTrack';
import { TimelinePoint } from './TimelinePoint';
import { PointCard } from './PointCard';
import { Navigation } from './Navigation';
import { Environment } from './Environment';
import { TIMELINE_DATA } from '@/app/data/timelineData';

const POINT_SPACING = 8;

export function Scene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetPosition = useRef(new THREE.Vector3(0, 0, 8));
  const currentPosition = useRef(new THREE.Vector3(0, 0, 8));

  const [isIntro, setIsIntro] = useState(true);
  const [currentPoint, setCurrentPoint] = useState(0);
  const [showCard, setShowCard] = useState(false);

  // Handle intro gate enter
  const handleEnterPresentation = useCallback(() => {
    setIsIntro(false);
    setCurrentPoint(0);
    targetPosition.current.set(0, 0.5, 6);
  }, []);

  // Handle point navigation
  const handleNavigate = useCallback(
    (direction: 'prev' | 'next') => {
      const newPoint =
        direction === 'next'
          ? Math.min(currentPoint + 1, TIMELINE_DATA.length - 1)
          : Math.max(currentPoint - 1, 0);

      setCurrentPoint(newPoint);
      setShowCard(false);
      targetPosition.current.set(newPoint * POINT_SPACING, 0.5, 6);
    },
    [currentPoint]
  );

  // Handle point click
  const handlePointClick = useCallback((index: number) => {
    setCurrentPoint(index);
    setShowCard(true);
    targetPosition.current.set(index * POINT_SPACING, 0.5, 5);
  }, []);

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
        case 'Enter':
          setShowCard(!showCard);
          if (!showCard) {
            targetPosition.current.set(currentPoint * POINT_SPACING, 0.5, 5);
          } else {
            targetPosition.current.set(currentPoint * POINT_SPACING, 0.5, 6);
          }
          break;
        case 'Escape':
          if (showCard) {
            setShowCard(false);
            targetPosition.current.set(currentPoint * POINT_SPACING, 0.5, 6);
          } else {
            setIsIntro(true);
            setCurrentPoint(0);
            setShowCard(false);
            targetPosition.current.set(0, 0, 8);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isIntro, currentPoint, showCard, handleNavigate, handleEnterPresentation]);

  // Smooth camera movement
  useFrame(() => {
    currentPosition.current.lerp(targetPosition.current, 0.05);

    if (cameraRef.current) {
      cameraRef.current.position.copy(currentPosition.current);
      cameraRef.current.lookAt(
        currentPosition.current.x,
        currentPosition.current.y - 0.5,
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
      {isIntro && (
        <IntroGate onEnter={handleEnterPresentation} isActive={isIntro} />
      )}

      {/* Timeline */}
      {!isIntro && (
        <group>
          {/* Timeline Track */}
          <TimelineTrack currentPoint={currentPoint} spacing={POINT_SPACING} />

          {/* Timeline Points */}
          {TIMELINE_DATA.map((point, index) => (
            <TimelinePoint
              key={point.id}
              data={point}
              position={[index * POINT_SPACING, 0.5, 0]}
              isActive={currentPoint === index}
              onClick={() => handlePointClick(index)}
            />
          ))}

          {/* Expanded Point Card */}
          <PointCard
            data={TIMELINE_DATA[currentPoint]}
            isVisible={showCard}
            position={[currentPoint * POINT_SPACING, 0.5, 2]}
          />
        </group>
      )}

      {/* Navigation */}
      <Navigation
        currentSlide={currentPoint}
        totalSlides={TIMELINE_DATA.length}
        onNavigate={handleNavigate}
        isIntro={isIntro}
      />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          height={300}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0003, 0.0003)}
        />
        <Vignette
          offset={0.3}
          darkness={0.5}
          blendFunction={BlendFunction.NORMAL}
        />
        <Noise
          blendFunction={BlendFunction.OVERLAY}
          opacity={0.015}
        />
      </EffectComposer>
    </>
  );
}
