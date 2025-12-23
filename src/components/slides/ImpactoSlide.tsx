"use client";

import { motion } from "framer-motion";
import { Clock, MessageSquareOff, BarChart3, CheckCircle2 } from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";

const problems = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Janela sem atendimento",
    subtitle: "FORA DO HORÁRIO COMERCIAL",
    desc: "Leads chegam quando não há cobertura humana. A primeira resposta vira o gargalo e a conversa esfria.",
  },
  {
    icon: <MessageSquareOff className="w-6 h-6" />,
    title: "Conversas sem follow-up",
    subtitle: "FALTA DE CADÊNCIA E PRIORIZAÇÃO",
    desc: "Sem processo e automação, o time perde timing, esquece retornos e não sabe quem atacar primeiro.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Falta de visibilidade",
    subtitle: "GESTÃO ÀS CEGAS",
    desc: "Sem dados por canal, etapa e equipe, fica difícil corrigir gargalos, reduzir abandono e priorizar as oportunidades certas.",
  },
];

export default function ImpactoSlide() {
  return (
    <SlideShell
      eyebrow="O Custo da Inação"
      eyebrowColor="warning"
      title="O Impacto Real"
      subtitle="Cada dia sem uma solução automatizada representa oportunidades perdidas e receita que não volta."
      background={
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none" />
      }
    >
      {/* Problem Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {problems.map((problem, index) => (
          <motion.div
            key={problem.title}
            className="relative bg-[#0d1829]/80 border border-white/10 rounded-2xl p-6 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              {problem.icon}
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-lg font-semibold text-white mb-1">
              {problem.title}
            </h3>
            <p className="text-[10px] font-medium text-white/40 uppercase tracking-wider mb-3">
              {problem.subtitle}
            </p>

            {/* Description */}
            <p className="text-body text-white/60 leading-relaxed">
              {problem.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Solution CTA */}
      <motion.div
        className="mt-8 w-full max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-[#0d1829]/60 border border-cyan-500/20 rounded-2xl px-6 py-4 flex items-center justify-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <p className="text-white/80 text-sm md:text-base">
            A solução: <span className="text-cyan-400 font-medium">automatizar com IA</span> e recuperar cada lead com governança.
          </p>
        </div>
      </motion.div>
    </SlideShell>
  );
}
