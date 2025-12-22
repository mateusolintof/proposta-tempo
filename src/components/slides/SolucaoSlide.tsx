"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  HelpCircle,
  CalendarCheck,
  Star,
  BrainCircuit,
} from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";

const ORBIT_RADIUS = "clamp(100px, 14vw, 160px)";
const AGENT_ANGLES = [0, 90, 180, 270];

const agents = [
  {
    id: "sdr",
    name: "SDR & Agendamento",
    desc: "Qualificação e integração ERP",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    id: "faq",
    name: "FAQ Inteligente",
    desc: "Base de conhecimento 24/7",
    icon: <HelpCircle className="w-5 h-5" />,
  },
  {
    id: "noshow",
    name: "Anti No-Show",
    desc: "Confirmações e fila de espera",
    icon: <CalendarCheck className="w-5 h-5" />,
  },
  {
    id: "nps",
    name: "Pesquisa & NPS",
    desc: "Satisfação e Google Reviews",
    icon: <Star className="w-5 h-5" />,
  },
];

const features = [
  { title: "Handoffs", desc: "Escala inteligente para humanos em casos críticos" },
  { title: "Ferramentas", desc: "Agenda, CRM, ERP e base de conhecimento integrados" },
  { title: "Guardrails", desc: "LGPD, limites de risco e confirmação em casos sensíveis" },
];

export default function SolucaoSlide() {
  return (
    <SlideShell
      eyebrow="Solução"
      eyebrowColor="success"
      title="Arquitetura da Solução"
      subtitle="4 Agentes Especializados + Ecossistema de Gestão"
      align="center"
      size="compact"
      background={
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00FF94]/5 via-transparent to-transparent pointer-events-none" />
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 w-full items-center">
        {/* Orbit Container */}
        <div className="relative w-[min(380px,45vh)] h-[min(380px,45vh)] flex items-center justify-center z-10 mx-auto">
          {/* Center Core */}
          <div className="absolute w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center shadow-[0_0_60px_rgba(0,255,148,0.15)]">
            <BrainCircuit
              className="w-9 h-9 animate-pulse"
              style={{ color: "#00FF94" }}
            />
          </div>

          {/* Orbit Rings */}
          <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_30s_linear_infinite]" />
          <div className="absolute inset-12 border border-dashed border-white/10 rounded-full animate-[spin_20s_linear_infinite_reverse]" />

          {/* Agents (orbiting) */}
          <div className="absolute inset-0 animate-[spin_28s_linear_infinite]">
            {agents.map((agent, index) => {
              const angle = AGENT_ANGLES[index] ?? 0;
              return (
                <div
                  key={agent.id}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${ORBIT_RADIUS})`,
                  }}
                >
                  <div style={{ transform: `rotate(-${angle}deg)` }}>
                    <div className="animate-[spin_28s_linear_infinite_reverse]">
                      <motion.div
                        className="relative w-14 h-14 rounded-full bg-black/60 border border-white/20 hover:border-[#00FF94] transition-all flex items-center justify-center backdrop-blur-md group"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="text-white/80 group-hover:text-[#00FF94] transition-colors">
                          {agent.icon}
                        </div>
                        <span className="absolute -bottom-10 text-[10px] font-medium text-white/60 whitespace-nowrap text-center leading-tight">
                          {agent.name}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4 text-left w-full">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-[#00FF94]/30 transition-colors"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <p className="text-xs uppercase tracking-widest text-[#00FF94]/80">
                {feature.title}
              </p>
              <p className="text-white/70 mt-2 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-[#00FF94]/10 border border-[#00FF94]/30 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-[#00FF94]">4</p>
              <p className="text-white/60 text-xs mt-1">Agentes IA</p>
            </div>
            <div className="bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-[#00E5FF]">24/7</p>
              <p className="text-white/60 text-xs mt-1">Disponibilidade</p>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
