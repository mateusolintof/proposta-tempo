"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  CalendarCheck,
  Star,
  CheckCircle,
} from "lucide-react";
import SectionWrapper from "../SectionWrapper";

const agents = [
  {
    id: "sdr",
    name: "Agente SDR & Qualificação",
    fullName: "Captação, triagem e passagem quente para vendas",
    description:
      "Agente SDR humanizado que qualifica leads, classifica por score e realiza handoff para vendedor humano finalizar a venda. Responde 24/7 com velocidade instantânea.",
    icon: MessageSquare,
    color: "#00E5FF",
    benefits: [
      "Qualificação e agendamento instantâneos",
      "Roteamento inteligente para o vendedor certo",
      "Scripts de vendas 24/7 alinhados ao playbook",
      "Leitura de fatura de energia (OCR) com validação de ticket mínimo",
    ],
  },
  {
    id: "followup",
    name: "Agente Follow-up Automático",
    fullName: "Cadência multicanal e recuperação de oportunidades",
    description:
      "Mantém o follow-up ativo com leads que não fecharam, nutrindo o CRM e reaquecendo contatos para vendas futuras. Evita que oportunidades sejam perdidas.",
    icon: CalendarCheck,
    color: "#00FF94",
    benefits: [
      "Cadência ativa até fechar ou desqualificar",
      "Alertas no CRM quando o lead reengaja",
      "Recuperação de orçamentos e no-shows",
      "Multicanal: WhatsApp, e-mail e SMS",
    ],
  },
  {
    id: "nps",
    name: "Agente Pós-vendas & NPS",
    fullName: "Pesquisa, reativação e expansão da carteira",
    description:
      "Coleta feedback estruturado via NPS, reativa clientes inativos com ofertas personalizadas e mantém base de conhecimento viva para respostas consistentes.",
    icon: Star,
    color: "#FFD700",
    benefits: [
      "Pesquisa NPS e coleta estruturada de feedback",
      "Reativação de clientes inativos com ofertas",
      "Base de conhecimento viva para respostas consistentes",
      "Identificação de oportunidades de upsell",
    ],
  },
];

export default function SolucoesSection() {
  return (
    <SectionWrapper
      id="solucoes"
      eyebrow="Soluções"
      eyebrowColor="default"
      title="Soluções Propostas"
      subtitle="3 agentes especializados para transformar a operação comercial da Tempo Energia."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {agents.map((agent, index) => {
          const IconComponent = agent.icon;

          return (
            <motion.div
              key={agent.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="p-3 rounded-xl flex-shrink-0"
                  style={{ backgroundColor: `${agent.color}20` }}
                >
                  <IconComponent
                    className="w-6 h-6"
                    style={{ color: agent.color }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-white/50 mt-0.5">
                    {agent.fullName}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                {agent.description}
              </p>

              {/* Benefits */}
              <div className="space-y-2">
                {agent.benefits.map((benefit, benefitIndex) => (
                  <div
                    key={benefitIndex}
                    className="flex items-start gap-3 text-sm"
                  >
                    <CheckCircle
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: agent.color }}
                    />
                    <span className="text-white/60">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
