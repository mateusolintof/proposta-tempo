"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Brain,
  Database,
  MessageSquare,
  Users,
  Calculator,
  ClipboardCheck,
  Target,
  Clock,
  Bell,
  UserCheck,
  Star,
  ThumbsUp,
  AlertTriangle,
  BarChart3,
  Eye,
  Globe,
  RefreshCw,
  Gift,
} from "lucide-react";
import { AgentType } from "@/types/modal";

interface Capability {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  items: string[];
  position: { angle: number; distance: number };
  connectionLabel: string;
}

interface AgentCapabilities {
  centerTitle: string;
  centerSubtitle: string;
  capabilities: Capability[];
}

// Capacidades específicas para cada agente
const capabilitiesByAgent: Record<AgentType, AgentCapabilities> = {
  sdr: {
    centerTitle: "Agente SDR",
    centerSubtitle: "Qualificação 24h",
    capabilities: [
      {
        id: "ocr",
        title: "Leitura de Faturas",
        subtitle: "Visão Computacional",
        icon: Eye,
        items: [
          "Lê PDF ou foto da fatura",
          "Extrai consumo kWh e valor",
          "Valida mínimo R$ 250",
        ],
        position: { angle: -60, distance: 200 },
        connectionLabel: "ANALISA",
      },
      {
        id: "qualificacao",
        title: "Qualificação",
        subtitle: "Score automático",
        icon: Target,
        items: [
          "Classifica perfil do lead",
          "Atribui score de intenção",
          "Prioriza leads quentes",
        ],
        position: { angle: 0, distance: 200 },
        connectionLabel: "QUALIFICA",
      },
      {
        id: "calculos",
        title: "Simulações",
        subtitle: "Cérebro matemático",
        icon: Calculator,
        items: [
          "Calcula economia mensal",
          "Projeta payback",
          "Simula financiamento",
        ],
        position: { angle: 60, distance: 200 },
        connectionLabel: "CALCULA",
      },
      {
        id: "pesquisas",
        title: "Validações",
        subtitle: "Pesquisas online",
        icon: Globe,
        items: [
          "Consulta CPF/CNPJ",
          "Verifica restrições",
          "Valida elegibilidade",
        ],
        position: { angle: 120, distance: 200 },
        connectionLabel: "VALIDA",
      },
      {
        id: "conversacao",
        title: "Conversação Natural",
        subtitle: "Atende via WhatsApp",
        icon: MessageSquare,
        items: [
          "Entende áudios",
          "Responde humanizado",
          "Mantém contexto",
        ],
        position: { angle: 180, distance: 200 },
        connectionLabel: "CONVERSA",
      },
      {
        id: "escalacao",
        title: "Handoff Inteligente",
        subtitle: "Escala para vendedor",
        icon: Users,
        items: [
          "Detecta interesse real",
          "Transfere com contexto",
          "Agenda ligação/visita",
        ],
        position: { angle: -120, distance: 200 },
        connectionLabel: "ESCALA",
      },
    ],
  },
  noshow: {
    centerTitle: "Agente Follow-up",
    centerSubtitle: "Recuperação Automática",
    capabilities: [
      {
        id: "recuperacao",
        title: "Recuperação",
        subtitle: "Orçamentos pendentes",
        icon: RefreshCw,
        items: [
          "Detecta propostas sem resposta",
          "Retoma conversa após 24h/48h",
          "Oferece atualização de valores",
        ],
        position: { angle: -60, distance: 200 },
        connectionLabel: "RECUPERA",
      },
      {
        id: "cadencia",
        title: "Cadência",
        subtitle: "Sequência otimizada",
        icon: Clock,
        items: [
          "1º toque: lembrete amigável",
          "2º toque: valor agregado",
          "3º toque: oferta especial",
        ],
        position: { angle: 0, distance: 200 },
        connectionLabel: "AGENDA",
      },
      {
        id: "objecoes",
        title: "Objeções",
        subtitle: "Trata hesitações",
        icon: MessageSquare,
        items: [
          "Identifica motivo da dúvida",
          "Responde com argumentos",
          "Envia material de apoio",
        ],
        position: { angle: 60, distance: 200 },
        connectionLabel: "RESPONDE",
      },
      {
        id: "urgencia",
        title: "Gatilhos",
        subtitle: "Cria urgência",
        icon: Bell,
        items: [
          "Vagas limitadas",
          "Prazo de validade",
          "Condição especial",
        ],
        position: { angle: 120, distance: 200 },
        connectionLabel: "ATIVA",
      },
      {
        id: "handoff",
        title: "Handoff",
        subtitle: "Escala vendedor",
        icon: Users,
        items: [
          "Detecta interesse real",
          "Transfere com contexto",
          "Agenda ligação/visita",
        ],
        position: { angle: 180, distance: 200 },
        connectionLabel: "ESCALA",
      },
      {
        id: "metricas",
        title: "Métricas",
        subtitle: "Taxa de recuperação",
        icon: BarChart3,
        items: [
          "% leads reativados",
          "Motivos de perda",
          "Tempo médio de conversão",
        ],
        position: { angle: -120, distance: 200 },
        connectionLabel: "MEDE",
      },
    ],
  },
  nps: {
    centerTitle: "Agente Pós-vendas",
    centerSubtitle: "Relacionamento Contínuo",
    capabilities: [
      {
        id: "cobranca",
        title: "Cobranças",
        subtitle: "Lembretes automáticos",
        icon: Bell,
        items: [
          "Aviso de vencimento",
          "Status de pagamento",
          "Segunda via de boleto",
        ],
        position: { angle: -60, distance: 200 },
        connectionLabel: "LEMBRA",
      },
      {
        id: "indicacao",
        title: "Indicação",
        subtitle: "Programa de benefícios",
        icon: Gift,
        items: [
          "Indique e ganhe desconto",
          "Rastreia indicações",
          "Aplica benefício automático",
        ],
        position: { angle: 0, distance: 200 },
        connectionLabel: "INCENTIVA",
      },
      {
        id: "nps",
        title: "Pesquisa NPS",
        subtitle: "Satisfação do cliente",
        icon: Star,
        items: [
          "Pergunta após instalação",
          "Classifica promotor/detrator",
          "Direciona para Google Reviews",
        ],
        position: { angle: 60, distance: 200 },
        connectionLabel: "AVALIA",
      },
      {
        id: "informativos",
        title: "Informativos",
        subtitle: "Comunicação proativa",
        icon: MessageSquare,
        items: [
          "Economia gerada no mês",
          "Status da instalação",
          "Dicas de uso",
        ],
        position: { angle: 120, distance: 200 },
        connectionLabel: "INFORMA",
      },
      {
        id: "suporte",
        title: "Suporte",
        subtitle: "Dúvidas pós-venda",
        icon: UserCheck,
        items: [
          "FAQ de cliente ativo",
          "Agendamento de visita técnica",
          "Escala para atendimento humano",
        ],
        position: { angle: 180, distance: 200 },
        connectionLabel: "ATENDE",
      },
      {
        id: "dashboard",
        title: "Dashboard",
        subtitle: "Visão do cliente",
        icon: BarChart3,
        items: [
          "NPS geral e evolução",
          "Inadimplência",
          "Taxa de indicação",
        ],
        position: { angle: -120, distance: 200 },
        connectionLabel: "EXIBE",
      },
    ],
  },
};

interface RadialCapabilityDiagramProps {
  agentType: AgentType;
  agentColor: string;
}

export default function RadialCapabilityDiagram({
  agentType,
  agentColor,
}: RadialCapabilityDiagramProps) {
  const centerX = 450;
  const centerY = 310;
  const agentConfig = capabilitiesByAgent[agentType];

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
    <div className="relative w-full h-[620px] bg-gradient-to-b from-gray-50 to-white rounded-2xl overflow-hidden">
      {/* Title */}
      <div className="absolute top-4 left-0 right-0 text-center z-10">
        <div className="inline-flex items-center gap-2 text-gray-800">
          <Bot className="w-5 h-5" />
          <span className="text-base font-semibold">Capacidades do {agentConfig.centerTitle}</span>
        </div>
      </div>

      {/* SVG for connections */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 900 620"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id={`arrowhead-${agentType}`}
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
        {agentConfig.capabilities.map((cap, index) => {
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
                  className="fill-slate-400 text-[10px] font-medium tracking-wider"
                >
                  {cap.connectionLabel}
                </text>
              </motion.g>
            </g>
          );
        })}
      </svg>

      {/* Center node */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <div
          className="w-28 h-28 rounded-full flex flex-col items-center justify-center text-white shadow-xl"
          style={{ backgroundColor: agentColor }}
        >
          <Bot className="w-7 h-7 mb-1" />
          <span className="text-xs font-bold text-center leading-tight">{agentConfig.centerTitle}</span>
          <span className="text-[11px] opacity-80">{agentConfig.centerSubtitle}</span>
        </div>
      </motion.div>

      {/* Capability nodes */}
      {agentConfig.capabilities.map((cap, index) => {
        const pos = getNodePosition(cap.position.angle, cap.position.distance);
        const Icon = cap.icon;

        const cardStyle: React.CSSProperties = {
          position: "absolute",
          left: `${(pos.x / 900) * 100}%`,
          top: `${(pos.y / 620) * 100}%`,
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
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2.5 w-36 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${agentColor}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: agentColor }} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-gray-900 truncate">{cap.title}</h4>
                  <p className="text-[11px] text-gray-500 truncate">{cap.subtitle}</p>
                </div>
              </div>
              <ul className="space-y-0.5">
                {cap.items.map((item, i) => (
                  <li key={i} className="text-[11px] text-gray-600 flex items-start gap-1">
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span className="leading-tight">{item}</span>
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
