'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { Scene } from './components/Scene';

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#c9a227" wireframe />
    </mesh>
  );
}

export default function PresentationPage() {
  return (
    <div className="relative w-screen h-screen bg-[#050510] overflow-hidden">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene />
        </Suspense>
      </Canvas>

      <Loader
        containerStyles={{
          background: 'rgba(5, 5, 16, 0.9)',
        }}
        innerStyles={{
          background: '#c9a227',
          width: '200px',
          height: '3px',
        }}
        barStyles={{
          background: '#ffffff',
          height: '3px',
        }}
        dataStyles={{
          color: '#c9a227',
          fontSize: '14px',
          fontFamily: 'monospace',
        }}
      />

      {/* UI Overlay */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">CM</span>
          </div>
          <div>
            <h1 className="text-white text-sm font-medium tracking-wide">
              CM REMÉDIOS
            </h1>
            <p className="text-white/50 text-xs">Proposta Comercial</p>
          </div>
        </div>
      </div>

      {/* Keyboard hints */}
      <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
        <div className="flex items-center gap-4 text-white/40 text-xs">
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-white/10 rounded text-[10px]">←</kbd>
            <kbd className="px-2 py-1 bg-white/10 rounded text-[10px]">→</kbd>
            <span className="ml-1">Navegar</span>
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-white/10 rounded text-[10px]">ESC</kbd>
            <span className="ml-1">Voltar</span>
          </span>
        </div>
      </div>

      {/* Contact info */}
      <div className="absolute bottom-6 right-6 z-10 pointer-events-none">
        <p className="text-white/40 text-xs text-right">
          contato@alma.com.br
        </p>
      </div>
    </div>
  );
}
