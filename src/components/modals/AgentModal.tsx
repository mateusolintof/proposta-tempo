"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion } from "framer-motion";
import {
  MessageSquare,
  HelpCircle,
  CalendarCheck,
  Star,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import ModalWrapper from "./ModalWrapper";
import type { AgentType } from "@/types/modal";

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
    metrics: { label: string; value: string; color: string }[];
    nodes: Node[];
    edges: Edge[];
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
    metrics: [
      { label: "Reducao Tempo", value: "-80%", color: "#00FF94" },
      { label: "Disponibilidade", value: "24/7", color: "#00E5FF" },
      { label: "Taxa Resposta", value: "< 2min", color: "#00FF94" },
    ],
    nodes: [
      {
        id: "1",
        position: { x: 250, y: 0 },
        data: { label: "Lead Chega (WhatsApp)" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #00FF94",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
      },
      {
        id: "2",
        position: { x: 250, y: 80 },
        data: { label: "Agente Orquestrador" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #00E5FF",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
      },
      {
        id: "3",
        position: { x: 100, y: 170 },
        data: { label: "Particular?" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #fff",
          color: "#fff",
          borderRadius: "50%",
          width: "80px",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      {
        id: "4",
        position: { x: 400, y: 170 },
        data: { label: "Convenio?" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #fff",
          color: "#fff",
          borderRadius: "50%",
          width: "80px",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      {
        id: "5",
        position: { x: 250, y: 280 },
        data: { label: "Qualificacao" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #00E5FF",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
      },
      {
        id: "6",
        position: { x: 250, y: 370 },
        data: { label: "Agenda Unificada" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #00FF94",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
      },
      {
        id: "7",
        position: { x: 250, y: 460 },
        data: { label: "Registra no CRM" },
        style: {
          background: "#00FF94",
          border: "none",
          color: "#000",
          borderRadius: "8px",
          padding: "10px",
          fontWeight: "bold",
        },
      },
    ],
    edges: [
      {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        style: { stroke: "#00FF94" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00FF94" },
      },
      {
        id: "e2-3",
        source: "2",
        target: "3",
        style: { stroke: "#fff" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#fff" },
      },
      {
        id: "e2-4",
        source: "2",
        target: "4",
        style: { stroke: "#fff" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#fff" },
      },
      {
        id: "e3-5",
        source: "3",
        target: "5",
        style: { stroke: "#00E5FF" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00E5FF" },
      },
      {
        id: "e4-5",
        source: "4",
        target: "5",
        style: { stroke: "#00E5FF" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00E5FF" },
      },
      {
        id: "e5-6",
        source: "5",
        target: "6",
        animated: true,
        style: { stroke: "#00FF94" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00FF94" },
      },
      {
        id: "e6-7",
        source: "6",
        target: "7",
        animated: true,
        style: { stroke: "#00FF94" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00FF94" },
      },
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
    metrics: [
      { label: "Reducao Tempo", value: "-60%", color: "#00FF94" },
      { label: "Conversao FAQ>Lead", value: "22%", color: "#00E5FF" },
      { label: "Sem Humano", value: "98%", color: "#00FF94" },
    ],
    nodes: [
      {
        id: "1",
        position: { x: 250, y: 0 },
        data: { label: "Lead com Duvida" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #00E5FF",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
      },
      {
        id: "2",
        position: { x: 250, y: 80 },
        data: { label: "Agente FAQ" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #00E5FF",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
      },
      {
        id: "3",
        position: { x: 100, y: 170 },
        data: { label: "Procedimentos" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #fff",
          color: "#fff",
          borderRadius: "8px",
          padding: "8px",
        },
      },
      {
        id: "4",
        position: { x: 250, y: 170 },
        data: { label: "Convenios" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #fff",
          color: "#fff",
          borderRadius: "8px",
          padding: "8px",
        },
      },
      {
        id: "5",
        position: { x: 400, y: 170 },
        data: { label: "Valores" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #fff",
          color: "#fff",
          borderRadius: "8px",
          padding: "8px",
        },
      },
      {
        id: "6",
        position: { x: 250, y: 270 },
        data: { label: "Resposta Educativa" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #00E5FF",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
      },
      {
        id: "7",
        position: { x: 250, y: 360 },
        data: { label: "Oferta de Agendamento" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #00FF94",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
      },
      {
        id: "8",
        position: { x: 250, y: 450 },
        data: { label: "Escala p/ SDR" },
        style: {
          background: "#00FF94",
          border: "none",
          color: "#000",
          borderRadius: "8px",
          padding: "10px",
          fontWeight: "bold",
        },
      },
    ],
    edges: [
      {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        style: { stroke: "#00E5FF" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00E5FF" },
      },
      {
        id: "e2-3",
        source: "2",
        target: "3",
        style: { stroke: "#fff" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#fff" },
      },
      {
        id: "e2-4",
        source: "2",
        target: "4",
        style: { stroke: "#fff" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#fff" },
      },
      {
        id: "e2-5",
        source: "2",
        target: "5",
        style: { stroke: "#fff" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#fff" },
      },
      {
        id: "e3-6",
        source: "3",
        target: "6",
        style: { stroke: "#00E5FF" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00E5FF" },
      },
      {
        id: "e4-6",
        source: "4",
        target: "6",
        style: { stroke: "#00E5FF" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00E5FF" },
      },
      {
        id: "e5-6",
        source: "5",
        target: "6",
        style: { stroke: "#00E5FF" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00E5FF" },
      },
      {
        id: "e6-7",
        source: "6",
        target: "7",
        animated: true,
        style: { stroke: "#00FF94" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00FF94" },
      },
      {
        id: "e7-8",
        source: "7",
        target: "8",
        animated: true,
        style: { stroke: "#00FF94" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00FF94" },
      },
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
    metrics: [
      { label: "Reducao No-Show", value: "-40%", color: "#00FF94" },
      { label: "Taxa Resposta", value: "94%", color: "#00E5FF" },
      { label: "Vagas Reocupadas", value: "+187", color: "#FF6B6B" },
    ],
    nodes: [
      {
        id: "1",
        position: { x: 250, y: 0 },
        data: { label: "Consulta Agendada" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #FF6B6B",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
      },
      {
        id: "2",
        position: { x: 250, y: 80 },
        data: { label: "D-2: Lembrete 48h" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #00E5FF",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
      },
      {
        id: "3",
        position: { x: 100, y: 180 },
        data: { label: "Confirma" },
        style: {
          background: "#00FF94",
          border: "none",
          color: "#000",
          borderRadius: "8px",
          padding: "8px",
          fontWeight: "bold",
        },
      },
      {
        id: "4",
        position: { x: 250, y: 180 },
        data: { label: "Reagenda" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #fff",
          color: "#fff",
          borderRadius: "8px",
          padding: "8px",
        },
      },
      {
        id: "5",
        position: { x: 400, y: 180 },
        data: { label: "Cancela" },
        style: {
          background: "#FF6B6B",
          border: "none",
          color: "#fff",
          borderRadius: "8px",
          padding: "8px",
        },
      },
      {
        id: "6",
        position: { x: 100, y: 280 },
        data: { label: "D-1: Lembrete 24h" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #00E5FF",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
      },
      {
        id: "7",
        position: { x: 400, y: 280 },
        data: { label: "Notifica Fila Espera" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #00FF94",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
      },
      {
        id: "8",
        position: { x: 100, y: 380 },
        data: { label: "Consulta Realizada" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #00FF94",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
      },
      {
        id: "9",
        position: { x: 100, y: 470 },
        data: { label: "D+1: Follow-up NPS" },
        style: {
          background: "#00FF94",
          border: "none",
          color: "#000",
          borderRadius: "8px",
          padding: "10px",
          fontWeight: "bold",
        },
      },
    ],
    edges: [
      {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        style: { stroke: "#FF6B6B" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#FF6B6B" },
      },
      {
        id: "e2-3",
        source: "2",
        target: "3",
        style: { stroke: "#00FF94" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00FF94" },
      },
      {
        id: "e2-4",
        source: "2",
        target: "4",
        style: { stroke: "#fff" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#fff" },
      },
      {
        id: "e2-5",
        source: "2",
        target: "5",
        style: { stroke: "#FF6B6B" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#FF6B6B" },
      },
      {
        id: "e3-6",
        source: "3",
        target: "6",
        animated: true,
        style: { stroke: "#00E5FF" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00E5FF" },
      },
      {
        id: "e5-7",
        source: "5",
        target: "7",
        style: { stroke: "#00FF94" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00FF94" },
      },
      {
        id: "e6-8",
        source: "6",
        target: "8",
        animated: true,
        style: { stroke: "#00FF94" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00FF94" },
      },
      {
        id: "e8-9",
        source: "8",
        target: "9",
        animated: true,
        style: { stroke: "#00FF94" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00FF94" },
      },
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
    metrics: [
      { label: "Satisfacao", value: "4.7/5", color: "#FFD700" },
      { label: "Reviews Google", value: "+45%", color: "#00FF94" },
      { label: "Taxa Resposta", value: "68%", color: "#00E5FF" },
    ],
    nodes: [
      {
        id: "1",
        position: { x: 250, y: 0 },
        data: { label: "Consulta Realizada" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #FFD700",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
      },
      {
        id: "2",
        position: { x: 250, y: 80 },
        data: { label: "Envia Pesquisa NPS" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #00E5FF",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
      },
      {
        id: "3",
        position: { x: 100, y: 180 },
        data: { label: "Promotor (9-10)" },
        style: {
          background: "#00FF94",
          border: "none",
          color: "#000",
          borderRadius: "8px",
          padding: "8px",
          fontWeight: "bold",
        },
      },
      {
        id: "4",
        position: { x: 250, y: 180 },
        data: { label: "Neutro (7-8)" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #FFD700",
          color: "#fff",
          borderRadius: "8px",
          padding: "8px",
        },
      },
      {
        id: "5",
        position: { x: 400, y: 180 },
        data: { label: "Detrator (0-6)" },
        style: {
          background: "#FF6B6B",
          border: "none",
          color: "#fff",
          borderRadius: "8px",
          padding: "8px",
        },
      },
      {
        id: "6",
        position: { x: 100, y: 280 },
        data: { label: "Convida Google Review" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #00FF94",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
      },
      {
        id: "7",
        position: { x: 400, y: 280 },
        data: { label: "Alerta Equipe" },
        style: {
          background: "#1a1a2e",
          border: "1px solid #FF6B6B",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
      },
      {
        id: "8",
        position: { x: 250, y: 380 },
        data: { label: "Dashboard Insights" },
        style: {
          background: "#FFD700",
          border: "none",
          color: "#000",
          borderRadius: "8px",
          padding: "10px",
          fontWeight: "bold",
        },
      },
    ],
    edges: [
      {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        style: { stroke: "#FFD700" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#FFD700" },
      },
      {
        id: "e2-3",
        source: "2",
        target: "3",
        style: { stroke: "#00FF94" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00FF94" },
      },
      {
        id: "e2-4",
        source: "2",
        target: "4",
        style: { stroke: "#FFD700" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#FFD700" },
      },
      {
        id: "e2-5",
        source: "2",
        target: "5",
        style: { stroke: "#FF6B6B" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#FF6B6B" },
      },
      {
        id: "e3-6",
        source: "3",
        target: "6",
        animated: true,
        style: { stroke: "#00FF94" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00FF94" },
      },
      {
        id: "e5-7",
        source: "5",
        target: "7",
        style: { stroke: "#FF6B6B" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#FF6B6B" },
      },
      {
        id: "e6-8",
        source: "6",
        target: "8",
        style: { stroke: "#FFD700" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#FFD700" },
      },
      {
        id: "e4-8",
        source: "4",
        target: "8",
        style: { stroke: "#FFD700" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#FFD700" },
      },
      {
        id: "e7-8",
        source: "7",
        target: "8",
        style: { stroke: "#FFD700" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#FFD700" },
      },
    ],
  },
};

export default function AgentModal({ agent, isOpen, onClose }: AgentModalProps) {
  const data = agentData[agent];
  const [nodes] = useNodesState(data.nodes);
  const [edges] = useEdgesState(data.edges);

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={data.name}
      subtitle={data.fullName}
    >
      <div className="h-full flex flex-col lg:flex-row gap-8">
        {/* Left Column - Info */}
        <div className="lg:w-[45%] space-y-6 flex-shrink-0">
          {/* Description */}
          <div className="flex items-start gap-4">
            <div
              className="p-4 rounded-xl flex-shrink-0"
              style={{ backgroundColor: `${data.color}20` }}
            >
              <div style={{ color: data.color }}>{data.icon}</div>
            </div>
            <p className="text-white/70 text-base lg:text-lg leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Metrics */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#00E5FF]" />
              Metricas Esperadas
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {data.metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <p
                    className="text-2xl lg:text-3xl font-bold"
                    style={{ color: metric.color }}
                  >
                    {metric.value}
                  </p>
                  <p className="text-white/50 text-xs mt-1">{metric.label}</p>
                </motion.div>
              ))}
            </div>
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

        {/* Right Column - Flow Diagram */}
        <div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Fluxo de Operacao
          </h3>
          <div className="flex-1 bg-[#0a0f1a] rounded-xl border border-white/10 overflow-hidden">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              fitView
              attributionPosition="bottom-left"
              proOptions={{ hideAttribution: true }}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              zoomOnScroll={true}
              panOnScroll={true}
              panOnDrag={true}
              minZoom={0.5}
              maxZoom={2}
            >
              <Background color="#ffffff10" gap={20} />
              <Controls
                showZoom={true}
                showFitView={true}
                showInteractive={false}
                position="bottom-right"
                className="!bg-white/10 !border-white/20 !rounded-lg [&>button]:!bg-transparent [&>button]:!border-white/10 [&>button]:!text-white/70 [&>button:hover]:!bg-white/10"
              />
            </ReactFlow>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
