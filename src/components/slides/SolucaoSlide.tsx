"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  CalendarCheck,
  Star,
  BrainCircuit,
} from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";
import type { ModalKind, AgentType } from "@/types/modal";

const ORBIT_RADIUS = "clamp(100px, 14vw, 160px)";
const AGENT_ANGLES = [0, 120, 240];

const agents: { id: AgentType; name: string; icon: React.ReactNode }[] = [
  {
    id: "sdr",
    name: "SDR & Qualificação",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    id: "noshow",
    name: "Follow-up Automático",
    icon: <CalendarCheck className="w-5 h-5" />,
  },
  {
    id: "nps",
    name: "Pós-vendas & NPS",
    icon: <Star className="w-5 h-5" />,
  },
];

const features = [
  { title: "Ferramentas Técnicas", desc: "Leitura de faturas (OCR), cálculos matemáticos avançados e pesquisas na internet" },
  { title: "Integrações", desc: "CRM, ERP e base de conhecimento integrados" },
  { title: "Guardrails e Handoff", desc: "Segurança, limites de alucinações e escala inteligente para humanos em casos críticos" },
];

interface SolucaoSlideProps {
  onOpenModal?: (modal: ModalKind) => void;
}

export default function SolucaoSlide({ onOpenModal }: SolucaoSlideProps) {
  return (
    <SlideShell
      eyebrow="Solução"
      eyebrowColor="success"
      title="Arquitetura da Solução"
      subtitle="3 Agentes Especializados + Ecossistema de Gestão"
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
          <div className="absolute inset-0 border border-white/5 rounded-full md:animate-[spin_30s_linear_infinite]" />
          <div className="absolute inset-12 border border-dashed border-white/10 rounded-full md:animate-[spin_20s_linear_infinite_reverse]" />

          {/* Agents (orbiting) */}
          <div className="absolute inset-0">
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
                    <motion.button
                      type="button"
                      onClick={() => onOpenModal?.({ type: "agent", agent: agent.id })}
                      className="relative w-14 h-14 rounded-full bg-black/60 border border-white/20 hover:border-[#00FF94] transition-all flex items-center justify-center backdrop-blur-md group cursor-pointer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(0, 255, 148, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Pulse ring */}
                      <span className="absolute inset-0 rounded-full border border-[#00FF94]/30 animate-ping opacity-30" />
                      <div className="text-white/80 group-hover:text-[#00FF94] transition-colors">
                        {agent.icon}
                      </div>
                      <span className="absolute -bottom-10 text-[11px] font-medium text-white/60 group-hover:text-white whitespace-nowrap text-center leading-tight transition-colors">
                        {agent.name}
                      </span>
                    </motion.button>
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
              <p className="text-white/70 mt-2 text-body leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </SlideShell>
  );
}
