"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function IntroSlide() {
  return (
    <section className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00E5FF]/10 via-[#02040A] to-[#02040A] pointer-events-none" />

      {/* Subtle grid */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />

      {/* Scanline effect */}
      <div className="scanline" />

      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Agency Logo */}
        <motion.div
          className="mb-12 inline-flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <img
            src="/branding/logo-principal-white.svg"
            alt="Convert A.I"
            className="h-20 md:h-24"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          CM Remédios
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-white/60 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Agentes Inteligentes para Atendimento Comercial
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="text-base text-white/40 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Transformação Digital · Outubro 2025
        </motion.p>

        {/* CTA hint */}
        <motion.div
          className="flex items-center justify-center gap-2 text-white/50 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span>Deslize para continuar</span>
          <ArrowRight size={16} className="animate-pulse" />
        </motion.div>
      </motion.div>
    </section>
  );
}
