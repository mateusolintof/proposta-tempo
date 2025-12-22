"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Brain,
  Database,
  Zap,
  MessageSquare,
  Link2,
  Settings,
  Users,
} from "lucide-react";
import { AgentType } from "@/types/modal";

interface RadialCapabilityDiagramProps {
  agentType: AgentType;
  agentColor: string;
}

const capabilities = [
  {
    id: "memoria",
    title: "Memória",
    subtitle: "Como lembra das conversas",
    icon: Brain,
    items: [
      "Lembra a conversa atual completa",
      "Guarda informações para o futuro",
      "Entende \"aquele assunto de antes\"",
    ],
    position: { angle: -60, distance: 180 },
    connectionLabel: "CONSULTA",
  },
  {
    id: "conhecimento",
    title: "Base de Conhecimento",
    subtitle: "O que sabe sobre seu negócio",
    icon: Database,
    items: [
      "Seus serviços e como funcionam",
      "Perfil do cliente ideal",
      "Respostas para objeções",
    ],
    position: { angle: 0, distance: 180 },
    connectionLabel: "BUSCA INFO",
  },
  {
    id: "habilidades",
    title: "Habilidades",
    subtitle: "O que consegue fazer",
    icon: Zap,
    items: [
      "Calcular orçamentos e parcelas",
      "Ler documentos e fotos",
      "Agendar reuniões na agenda",
    ],
    position: { angle: 60, distance: 180 },
    connectionLabel: "EXECUTA",
  },
  {
    id: "cadastro",
    title: "Cadastro",
    subtitle: "Informações dos clientes",
    icon: Users,
    items: [
      "Nome, empresa, contato",
      "Histórico de conversas",
      "Nível de interesse (frio/quente)",
    ],
    position: { angle: 120, distance: 180 },
    connectionLabel: "SALVA DADOS",
  },
  {
    id: "gestao",
    title: "Gestão de Conversas",
    subtitle: "Como entende o contexto",
    icon: MessageSquare,
    items: [
      "Junta mensagens em sequência",
      "Entende áudios de voz",
      "Responde de forma natural",
    ],
    position: { angle: 180, distance: 180 },
    connectionLabel: "PROCESSA",
  },
  {
    id: "automacoes",
    title: "Automações",
    subtitle: "Tarefas que faz sozinho",
    icon: Settings,
    items: [
      "Follow-up se cliente sumiu",
      "Avisa você sobre leads quentes",
      "Qualifica automaticamente",
    ],
    position: { angle: -120, distance: 180 },
    connectionLabel: "DISPARA",
  },
  {
    id: "conexoes",
    title: "Conexões",
    subtitle: "Com o que se integra",
    icon: Link2,
    items: [
      "WhatsApp",
      "Google Agenda",
      "Seu CRM / Planilhas",
    ],
    position: { angle: -180, distance: 180 },
    connectionLabel: "INTEGRA",
  },
];

export default function RadialCapabilityDiagram({
  agentType,
  agentColor,
}: RadialCapabilityDiagramProps) {
  const centerX = 400;
  const centerY = 280;

  const getNodePosition = (angle: number, distance: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: centerX + Math.cos(rad) * distance,
      y: centerY + Math.sin(rad) * distance,
    };
  };

  const getLabelPosition = (angle: number, distance: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: centerX + Math.cos(rad) * (distance * 0.5),
      y: centerY + Math.sin(rad) * (distance * 0.5),
    };
  };

  return (
    <div className="relative w-full h-[560px] bg-gradient-to-b from-gray-50 to-white rounded-2xl overflow-hidden">
      {/* Title */}
      <div className="absolute top-4 left-0 right-0 text-center z-10">
        <div className="inline-flex items-center gap-2 text-gray-800">
          <Bot className="w-5 h-5" />
          <span className="text-lg font-semibold">Como Funciona um Agente de IA</span>
        </div>
      </div>

      {/* SVG for connections */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 560"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
          </marker>
        </defs>

        {/* Connection lines */}
        {capabilities.map((cap, index) => {
          const pos = getNodePosition(cap.position.angle, cap.position.distance);
          const labelPos = getLabelPosition(cap.position.angle, cap.position.distance);

          return (
            <g key={cap.id}>
              <motion.path
                d={`M ${centerX} ${centerY} Q ${labelPos.x} ${labelPos.y} ${pos.x} ${pos.y}`}
                stroke="#cbd5e1"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              />
              {/* Connection label */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  className="fill-slate-400 text-[9px] font-medium tracking-wider"
                >
                  {cap.connectionLabel}
                </text>
              </motion.g>
            </g>
          );
        })}
      </svg>

      {/* Center node - Agente IA */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <div
          className="w-32 h-32 rounded-full flex flex-col items-center justify-center text-white shadow-xl"
          style={{ backgroundColor: agentColor }}
        >
          <Bot className="w-8 h-8 mb-1" />
          <span className="text-xs font-bold">Agente IA</span>
          <span className="text-[10px] opacity-80">Assistente Inteligente</span>
          <span className="text-[10px] opacity-80">24 horas</span>
        </div>
      </motion.div>

      {/* Capability nodes */}
      {capabilities.map((cap, index) => {
        const pos = getNodePosition(cap.position.angle, cap.position.distance);
        const Icon = cap.icon;

        // Adjust position for card placement
        const cardStyle: React.CSSProperties = {
          position: "absolute",
          left: `${(pos.x / 800) * 100}%`,
          top: `${(pos.y / 560) * 100}%`,
          transform: "translate(-50%, -50%)",
        };

        return (
          <motion.div
            key={cap.id}
            style={cardStyle}
            className="z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
          >
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 w-44 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${agentColor}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: agentColor }} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-900">{cap.title}</h4>
                  <p className="text-[10px] text-gray-500">{cap.subtitle}</p>
                </div>
              </div>
              <ul className="space-y-1">
                {cap.items.map((item, i) => (
                  <li key={i} className="text-[10px] text-gray-600 flex items-start gap-1">
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
