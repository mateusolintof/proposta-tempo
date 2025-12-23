"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Brain,
  Database,
  MessageSquare,
  Users,
  Calendar,
  ClipboardCheck,
  Target,
  Clock,
  Bell,
  UserCheck,
  Star,
  ThumbsUp,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  BookOpen,
  HelpCircle,
  Send,
  RefreshCw,
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
        id: "qualificacao",
        title: "Qualificação",
        subtitle: "Filtra leads elegíveis",
        icon: Target,
        items: [
          "Valida perfil do cliente (PF/PJ)",
          "Identifica interesse real",
          "Atribui score automático",
        ],
        position: { angle: -60, distance: 175 },
        connectionLabel: "QUALIFICA",
      },
      {
        id: "comercial",
        title: "Condições Comerciais",
        subtitle: "Valida cadastro",
        icon: ClipboardCheck,
        items: [
          "Coleta CNPJ/CPF",
          "Define forma de pagamento",
          "Registra condições e preferência",
        ],
        position: { angle: 0, distance: 175 },
        connectionLabel: "VALIDA",
      },
      {
        id: "pedido",
        title: "Orçamento/Pedido",
        subtitle: "Converte no canal",
        icon: Calendar,
        items: [
          "Confirma itens e quantidades",
          "Sugere alternativas/upsell",
          "Encaminha para pagamento ou vendedor",
        ],
        position: { angle: 60, distance: 175 },
        connectionLabel: "CONVERTE",
      },
      {
        id: "crm",
        title: "Integração CRM",
        subtitle: "Registra tudo",
        icon: Database,
        items: [
          "Salva lead no sistema",
          "Atualiza histórico",
          "Alimenta pipeline",
        ],
        position: { angle: 120, distance: 175 },
        connectionLabel: "REGISTRA",
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
        position: { angle: 180, distance: 175 },
        connectionLabel: "CONVERSA",
      },
      {
        id: "escalacao",
        title: "Handoff Inteligente",
        subtitle: "Escala quando precisa",
        icon: Users,
        items: [
          "Detecta casos complexos",
          "Transfere com contexto",
          "Notifica atendente",
        ],
        position: { angle: -120, distance: 175 },
        connectionLabel: "ESCALA",
      },
    ],
  },
  faq: {
    centerTitle: "Agente FAQ",
    centerSubtitle: "Respostas 24h",
    capabilities: [
      {
        id: "conhecimento",
        title: "Base de Conhecimento",
        subtitle: "Sabe tudo do negócio",
        icon: BookOpen,
        items: [
          "Catálogo e disponibilidade",
          "Entrega, frete e prazos",
          "Pagamento, NF e devoluções",
        ],
        position: { angle: -60, distance: 175 },
        connectionLabel: "BUSCA",
      },
      {
        id: "interpretacao",
        title: "Interpretação",
        subtitle: "Entende a dúvida",
        icon: Brain,
        items: [
          "Identifica intenção",
          "Classifica pergunta",
          "Contextualiza resposta",
        ],
        position: { angle: 0, distance: 175 },
        connectionLabel: "INTERPRETA",
      },
      {
        id: "resposta",
        title: "Resposta Educativa",
        subtitle: "Explica com clareza",
        icon: HelpCircle,
        items: [
          "Linguagem acessível",
          "Informação completa",
          "Tom empático",
        ],
        position: { angle: 60, distance: 175 },
        connectionLabel: "RESPONDE",
      },
      {
        id: "conversao",
        title: "Conversão",
        subtitle: "Transforma em lead",
        icon: TrendingUp,
        items: [
          "Capta interesse",
          "Qualifica rapidamente",
          "Encaminha para SDR/vendas",
        ],
        position: { angle: 120, distance: 175 },
        connectionLabel: "CONVERTE",
      },
      {
        id: "multicanal",
        title: "Atendimento",
        subtitle: "WhatsApp + Chat",
        icon: MessageSquare,
        items: [
          "Respostas instantâneas",
          "Múltiplas conversas",
          "Histórico preservado",
        ],
        position: { angle: 180, distance: 175 },
        connectionLabel: "ATENDE",
      },
      {
        id: "escalacao",
        title: "Escalação",
        subtitle: "Quando necessário",
        icon: Send,
        items: [
          "Casos complexos",
          "Dúvidas específicas",
          "Transfere contexto",
        ],
        position: { angle: -120, distance: 175 },
        connectionLabel: "ESCALA",
      },
    ],
  },
  noshow: {
    centerTitle: "Agente Follow-up",
    centerSubtitle: "Recuperação Automática",
    capabilities: [
      {
        id: "lembrete48",
        title: "Follow-up rápido",
        subtitle: "Após 1ª mensagem",
        icon: Bell,
        items: [
          "Mensagem curta e objetiva",
          "Botões de ação (sim/não)",
          "Pergunta de intenção",
        ],
        position: { angle: -60, distance: 175 },
        connectionLabel: "LEMBRA",
      },
      {
        id: "lembrete24",
        title: "Follow-up 24h",
        subtitle: "Segundo toque",
        icon: Clock,
        items: [
          "Reforço com contexto",
          "Sugere alternativas",
          "Oferece atendimento humano",
        ],
        position: { angle: 0, distance: 175 },
        connectionLabel: "CONFIRMA",
      },
      {
        id: "confirmacao",
        title: "Confirma interesse",
        subtitle: "Captura resposta",
        icon: UserCheck,
        items: [
          "Confirma interesse de compra",
          "Processa objeções",
          "Registra motivo de perda",
        ],
        position: { angle: 60, distance: 175 },
        connectionLabel: "PROCESSA",
      },
      {
        id: "fila",
        title: "Recuperação",
        subtitle: "Orçamento/pedido",
        icon: RefreshCw,
        items: [
          "Reabre conversa no timing",
          "Envia link de pagamento",
          "Escala vendedor quando precisa",
        ],
        position: { angle: 120, distance: 175 },
        connectionLabel: "RECUPERA",
      },
      {
        id: "followup",
        title: "Pós-venda",
        subtitle: "Acompanha entrega",
        icon: MessageSquare,
        items: [
          "Confirma recebimento",
          "Resolve pendências",
          "Solicita avaliação",
        ],
        position: { angle: 180, distance: 175 },
        connectionLabel: "ACOMPANHA",
      },
      {
        id: "metricas",
        title: "Métricas",
        subtitle: "Monitora taxa",
        icon: BarChart3,
        items: [
          "Taxa de resposta",
          "Taxa de recuperação",
          "Motivos de perda",
        ],
        position: { angle: -120, distance: 175 },
        connectionLabel: "MEDE",
      },
    ],
  },
  nps: {
    centerTitle: "Agente NPS",
    centerSubtitle: "Satisfação Contínua",
    capabilities: [
      {
        id: "pesquisa",
        title: "Pesquisa NPS",
        subtitle: "Coleta feedback",
        icon: Star,
        items: [
          "Pergunta após compra",
          "Escala 0-10",
          "Comentário opcional",
        ],
        position: { angle: -60, distance: 175 },
        connectionLabel: "PERGUNTA",
      },
      {
        id: "classificacao",
        title: "Classificação",
        subtitle: "Segmenta respostas",
        icon: Target,
        items: [
          "Promotores (9-10)",
          "Neutros (7-8)",
          "Detratores (0-6)",
        ],
        position: { angle: 0, distance: 175 },
        connectionLabel: "CLASSIFICA",
      },
      {
        id: "reviews",
        title: "Google Reviews",
        subtitle: "Promotores",
        icon: ThumbsUp,
        items: [
          "Convida para avaliar",
          "Link direto Google",
          "Aumenta reputação",
        ],
        position: { angle: 60, distance: 175 },
        connectionLabel: "DIRECIONA",
      },
      {
        id: "alertas",
        title: "Alertas",
        subtitle: "Detratores",
        icon: AlertTriangle,
        items: [
          "Notifica equipe",
          "Prioriza contato",
          "Recupera cliente",
        ],
        position: { angle: 120, distance: 175 },
        connectionLabel: "ALERTA",
      },
      {
        id: "insights",
        title: "Insights",
        subtitle: "Análise contínua",
        icon: Brain,
        items: [
          "Tendências de satisfação",
          "Pontos de melhoria",
          "Comparativo temporal",
        ],
        position: { angle: 180, distance: 175 },
        connectionLabel: "ANALISA",
      },
      {
        id: "dashboard",
        title: "Dashboard",
        subtitle: "Visualização",
        icon: BarChart3,
        items: [
          "Score NPS geral",
          "Por período/canal",
          "Evolução histórica",
        ],
        position: { angle: -120, distance: 175 },
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
  const centerX = 400;
  const centerY = 280;
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
    <div className="relative w-full h-[560px] bg-gradient-to-b from-gray-50 to-white rounded-2xl overflow-hidden">
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
        viewBox="0 0 800 560"
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
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 w-40 hover:shadow-md transition-shadow">
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
