/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface IntroSlideProps {
  onEnter?: () => void;
}

export default function IntroSlide({ onEnter }: IntroSlideProps) {
  return (
    <section className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00E5FF]/10 via-[#02040A] to-[#02040A] pointer-events-none" />

      {/* Subtle grid */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />

      {/* Scanline effect */}
      <div className="scanline" />

      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Agency Logo */}
        <motion.div
          className="mb-6 md:mb-8 inline-flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <img
            src="/branding/logo-principal-white.svg"
            alt="Convert A.I"
            className="h-14 md:h-20 w-auto"
            loading="eager"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-[length:var(--text-hero)] font-bold text-white mb-6 leading-[1.05] tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Agentes de IA & Inteligência Comercial
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-[length:var(--text-hero-lead)] text-white/60 mb-6 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Atendimento Personalizado, Triagem Automática via Sistema de OCR,
          ampla base de conhecimento e Gestão Inteligente de Dados de CRM e
          Dashboard.
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="text-[length:var(--text-body)] text-white/40 mb-10 md:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Solução desenhada exclusivamente para Tempo Energia.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          type="button"
          onClick={onEnter}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00FF94] to-[#00E5FF] rounded-full text-black font-semibold text-lg hover:scale-105 transition-transform cursor-pointer shadow-[0_0_30px_rgba(0,255,148,0.3)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 255, 148, 0.5)" }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Acessar Apresentação</span>
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
}
