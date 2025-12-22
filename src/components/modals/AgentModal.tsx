"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  MessageSquare,
  HelpCircle,
  CalendarCheck,
  Star,
  CheckCircle,
} from "lucide-react";
import ModalWrapper from "./ModalWrapper";
import RadialCapabilityDiagram from "./agents/RadialCapabilityDiagram";
import type { AgentType } from "@/types/modal";

// Dynamic import for ReactFlow component (SSR disabled)
const AgentFlowDiagram = dynamic(
  () => import("./agents/AgentFlowDiagram"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-gray-500 text-sm">Carregando fluxograma...</div>
      </div>
    ),
  }
);

interface AgentModalProps {
  agent: AgentType;
  isOpen: boolean;
  onClose: () => void;
}

const agentData: Record<
  AgentType,
  {
    name: string;
    fullName: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    benefits: string[];
  }
> = {
  sdr: {
    name: "SDR & Agendamento",
    fullName: "Assistente Virtual de Qualificacao e Agendamento Comercial",
    description:
      "Agente de IA que qualifica leads, valida elegibilidade e agenda consultas automaticamente via WhatsApp.",
    icon: <MessageSquare className="w-6 h-6" />,
    color: "#00FF94",
    benefits: [
      "Atendimento 24/7 - Nunca mais perca leads fora do horario comercial",
      "Qualificacao automatica - Filtra leads elegiveis vs nao elegiveis",
      "Validacao de convenios - Confirma se o plano e aceito antes de agendar",
      "Agendamento inteligente - Propoe horarios livres em tempo real",
      "Reducao de 80% no tempo das atendentes com qualificacao basica",
    ],
  },
  faq: {
    name: "FAQ Inteligente",
    fullName: "Central de Atendimento Educacional",
    description:
      "Agente especialista que responde duvidas sobre procedimentos, tratamentos e informacoes gerais automaticamente.",
    icon: <HelpCircle className="w-6 h-6" />,
    color: "#00E5FF",
    benefits: [
      "Reducao de 60% no tempo gasto com perguntas repetitivas",
      "Educacao do paciente antes da consulta (maior satisfacao)",
      "Conversao de duvidas em leads - Sempre oferece agendamento ao final",
      "Escalabilidade - Atende ilimitados pacientes simultaneamente",
      "Disponibilidade total - Respostas instantaneas 24/7",
    ],
  },
  noshow: {
    name: "Anti No-Show",
    fullName: "Sistema Anti No-Show com Follow-Up Automatizado",
    description:
      "Sistema completo para confirmar presenca, reduzir faltas e fazer follow-up pos-consulta.",
    icon: <CalendarCheck className="w-6 h-6" />,
    color: "#FF6B6B",
    benefits: [
      "Reducao de 40% na taxa de no-show (benchmark de mercado)",
      "Otimizacao de agenda - Vagas canceladas preenchidas automaticamente",
      "Aumento de satisfacao - Follow-up pos-consulta humanizado",
      "Mais consultas fechadas - Follow-up ativo para decisoes",
      "Fila de espera inteligente - Priorizacao automatica por urgencia",
    ],
  },
  nps: {
    name: "Pesquisa & NPS",
    fullName: "Sistema de Pesquisa de Satisfacao e NPS",
    description:
      "Coleta feedback dos pacientes, direciona avaliacoes positivas para Google Reviews e gera insights para melhoria continua.",
    icon: <Star className="w-6 h-6" />,
    color: "#FFD700",
    benefits: [
      "Coleta automatica de feedback pos-atendimento",
      "Direcionamento de avaliacoes positivas para Google Reviews",
      "Identificacao rapida de pacientes insatisfeitos",
      "Insights para melhoria continua do atendimento",
      "Aumento da reputacao online da clinica",
    ],
  },
};

export default function AgentModal({ agent, isOpen, onClose }: AgentModalProps) {
  const data = agentData[agent];

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={data.name}
      subtitle={data.fullName}
    >
      <div className="h-full overflow-y-auto pr-2 -mr-2 space-y-8">
        {/* Top Section: Description + Capabilities Diagram */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Description + Benefits */}
          <div className="lg:w-[40%] space-y-6 flex-shrink-0">
            {/* Description */}
            <div className="flex items-start gap-4">
              <div
                className="p-4 rounded-xl flex-shrink-0"
                style={{ backgroundColor: `${data.color}20` }}
              >
                <div style={{ color: data.color }}>{data.icon}</div>
              </div>
              <p className="text-white/70 text-base leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#00FF94]" />
                Beneficios
              </h3>
              <div className="space-y-2">
                {data.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 bg-white/5 rounded-lg p-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CheckCircle className="w-4 h-4 text-[#00FF94] mt-0.5 flex-shrink-0" />
                    <span className="text-white/70 text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-white/50 text-sm">
                Este agente esta incluido no{" "}
                <span className="text-[#00FF94] font-semibold">
                  Ecossistema Full
                </span>
              </p>
            </div>
          </div>

          {/* Right: Radial Capability Diagram */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <RadialCapabilityDiagram
                agentType={agent}
                agentColor={data.color}
              />
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom Section: Interactive Flowchart */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Fluxo de Operacao Detalhado
          </h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <AgentFlowDiagram agentType={agent} agentColor={data.color} />
          </motion.div>
        </div>
      </div>
    </ModalWrapper>
  );
}
