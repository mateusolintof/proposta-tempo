'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  Vignette,
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

// Z-axis spacing between sections (depth navigation)
const SECTION_DEPTH = 10;

export function Scene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetPosition = useRef(new THREE.Vector3(0, 0, 12));
  const currentPosition = useRef(new THREE.Vector3(0, 0, 12));

  const [isIntro, setIsIntro] = useState(true);
  const [currentPoint, setCurrentPoint] = useState(0);
  const [showCard, setShowCard] = useState(false);

  // Handle intro gate enter
  const handleEnterPresentation = useCallback(() => {
    setIsIntro(false);
    setCurrentPoint(0);
    // Move camera to first section (closer to z=0)
    targetPosition.current.set(0, 0, 8);
  }, []);

  // Handle point navigation - moves along Z axis (depth)
  const handleNavigate = useCallback(
    (direction: 'prev' | 'next') => {
      const newPoint =
        direction === 'next'
          ? Math.min(currentPoint + 1, TIMELINE_DATA.length - 1)
          : Math.max(currentPoint - 1, 0);

      setCurrentPoint(newPoint);
      setShowCard(false);
      // Camera moves deeper into the scene (negative Z)
      targetPosition.current.set(0, 0, 8 - newPoint * SECTION_DEPTH);
    },
    [currentPoint]
  );

  // Handle point click - zoom in closer
  const handlePointClick = useCallback((index: number) => {
    setCurrentPoint(index);
    setShowCard(true);
    // Zoom closer to the section
    targetPosition.current.set(0, 0, 5 - index * SECTION_DEPTH);
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
            targetPosition.current.set(0, 0, 5 - currentPoint * SECTION_DEPTH);
          } else {
            targetPosition.current.set(0, 0, 8 - currentPoint * SECTION_DEPTH);
          }
          break;
        case 'Escape':
          if (showCard) {
            setShowCard(false);
            targetPosition.current.set(0, 0, 8 - currentPoint * SECTION_DEPTH);
          } else {
            setIsIntro(true);
            setCurrentPoint(0);
            setShowCard(false);
            targetPosition.current.set(0, 0, 12);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isIntro, currentPoint, showCard, handleNavigate, handleEnterPresentation]);

  // Smooth camera movement with high damping
  useFrame(() => {
    currentPosition.current.lerp(targetPosition.current, 0.03);

    if (cameraRef.current) {
      cameraRef.current.position.copy(currentPosition.current);
      // Look slightly ahead (into the scene)
      cameraRef.current.lookAt(
        currentPosition.current.x,
        currentPosition.current.y,
        currentPosition.current.z - 20
      );
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 12]}
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
          {/* Timeline Track - vertical line along Z axis */}
          <TimelineTrack currentPoint={currentPoint} spacing={SECTION_DEPTH} />

          {/* Timeline Points - positioned along Z axis */}
          {TIMELINE_DATA.map((point, index) => (
            <TimelinePoint
              key={point.id}
              data={point}
              position={[0, 0, -index * SECTION_DEPTH]}
              isActive={currentPoint === index}
              onClick={() => handlePointClick(index)}
            />
          ))}

          {/* Expanded Point Card */}
          <PointCard
            data={TIMELINE_DATA[currentPoint]}
            isVisible={showCard}
            position={[0, 0, 2 - currentPoint * SECTION_DEPTH]}
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

      {/* Minimal post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={0.2}
          luminanceThreshold={0.8}
          luminanceSmoothing={0.9}
          height={300}
        />
        <Vignette
          offset={0.4}
          darkness={0.4}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </>
  );
}
