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
      <div className="w-full h-[400px] rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
        <div className="text-white/60 text-sm">Carregando fluxograma...</div>
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
    name: "SDR & Qualificação",
    fullName: "Agente de Qualificação e Conversão Comercial",
    description:
      "Agente de IA que qualifica leads, coleta dados essenciais e direciona para orçamento/pedido via WhatsApp com registro automático no CRM.",
    icon: <MessageSquare className="w-6 h-6" />,
    color: "#00FF94",
    benefits: [
      "Atendimento 24/7 - Nunca mais perca leads fora do horário comercial",
      "Qualificação automática - Identifica intenção, perfil (PF/PJ) e urgência comercial",
      "Coleta de dados - Cadastro, endereço, preferência de entrega/retirada e pagamento",
      "Orçamento/pedido guiado - Encaminha para pagamento ou vendedor com contexto",
      "Redução de tempo do time com triagem e tarefas repetitivas",
    ],
  },
  faq: {
    name: "FAQ Inteligente",
    fullName: "Central de Atendimento de Produtos e Políticas",
    description:
      "Agente especialista que responde dúvidas sobre produtos, disponibilidade, entrega, pagamento e pós-venda automaticamente.",
    icon: <HelpCircle className="w-6 h-6" />,
    color: "#00E5FF",
    benefits: [
      "Redução de 60% no tempo gasto com perguntas repetitivas",
      "Respostas consistentes e atualizadas com base de conhecimento validada",
      "Conversão de dúvidas em vendas - Captura interesse e direciona para SDR",
      "Escalabilidade - Atende clientes simultaneamente sem limite",
      "Disponibilidade total - Respostas instantâneas 24/7",
    ],
  },
  noshow: {
    name: "Follow-up Automático",
    fullName: "Sistema de Follow-up e Recuperação de Conversões",
    description:
      "Sistema completo para reativar conversas, recuperar orçamentos/pedidos pendentes e reduzir abandono com cadência automática.",
    icon: <CalendarCheck className="w-6 h-6" />,
    color: "#FF6B6B",
    benefits: [
      "Redução de perdas por abandono com cadência e priorização por intenção",
      "Recuperação de oportunidades - Retoma conversas no timing certo",
      "Escalação inteligente - Handoff para humano quando necessário",
      "Registro de motivos de perda para melhoria contínua",
      "Previsibilidade - Pipeline mais limpo e com próxima ação definida",
    ],
  },
  nps: {
    name: "Pesquisa & NPS",
    fullName: "Sistema de Pesquisa de Satisfação e NPS",
    description:
      "Coleta feedback dos clientes, direciona avaliações positivas para Google Reviews e gera insights para melhoria contínua.",
    icon: <Star className="w-6 h-6" />,
    color: "#FFD700",
    benefits: [
      "Coleta automática de feedback pós-atendimento",
      "Direcionamento de avaliações positivas para Google Reviews",
      "Identificação rápida de clientes insatisfeitos",
      "Insights para melhoria contínua do atendimento",
      "Aumento da reputação online da marca",
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
                Benefícios
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
                Este agente está incluído no{" "}
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Fluxo de Operação Detalhado
            </h3>
            <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
              Arraste para explorar
            </span>
          </div>
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
