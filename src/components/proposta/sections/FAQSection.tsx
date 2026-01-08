"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  DollarSign,
  Shield,
  Zap,
  RefreshCw,
  Clock,
  HelpCircle,
} from "lucide-react";
import SectionWrapper from "../SectionWrapper";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    icon: DollarSign,
    question:
      "O que está incluso no valor mensal? Tenho custos adicionais com infraestrutura?",
    answer:
      "O valor mensal cobre: hospedagem dos agentes, banco de dados (armazenamento de conversas e leads), tokens de IA (GPT/Claude), integrações com WhatsApp e APIs externas, além de suporte técnico contínuo. Não há custos surpresa: estimamos o consumo de tokens e infra no kick-off e, se o volume crescer muito acima do previsto, alinhamos antecipadamente qualquer ajuste.",
  },
  {
    icon: Shield,
    question:
      "Os dados dos clientes estão seguros? A solução é compatível com a LGPD?",
    answer:
      "A solução é desenhada com boas práticas de segurança e privacidade, alinhadas à LGPD (criptografia em trânsito e em repouso, controle de acesso, trilhas de auditoria e políticas de retenção). No kick-off, alinhamos governança de dados (exportação, retenção e exclusão) e os termos de tratamento conforme o escopo definido.",
  },
  {
    icon: Zap,
    question: "Como funciona a integração com nosso sistema atual?",
    answer:
      "Desenvolvemos integrações sob medida para cada operação. Conectamos ao seu CRM, sistema de gestão e canais (WhatsApp, e-mail) via API e webhooks, sem necessidade de substituir sistemas existentes. No kick-off, mapeamos os eventos e dados necessários (cadastro de leads, status de proposta, análise de fatura etc.) e validamos juntos o fluxo ideal.",
  },
  {
    icon: RefreshCw,
    question: "E se os resultados não forem os esperados? Existe garantia?",
    answer:
      "A fase de Validação (piloto) existe justamente para ajustar fluxos, mensagens e regras de handoff antes do Go-Live. Definimos metas e critérios no kick-off e acompanhamos os KPIs com a equipe. Se o cenário real exigir mudanças de escopo ou integrações, replanejamos para manter o projeto viável e orientado a resultado.",
  },
  {
    icon: Clock,
    question: "Quanto tempo leva para implementar e ver resultados?",
    answer:
      "Em geral, a implementação leva de 4 a 6 semanas, dependendo da complexidade das integrações. Os primeiros ganhos (tempo de resposta e captura de leads fora do horário) aparecem nas primeiras semanas. Ganhos consolidados de conversão e recuperação tendem a aparecer após o período de estabilização do piloto.",
  },
  {
    icon: HelpCircle,
    question: "Preciso de conhecimento técnico para operar o sistema?",
    answer:
      "Não! O sistema foi desenhado para ser gerenciado por qualquer pessoa da sua equipe. Oferecemos treinamento completo durante a implementação e suporte contínuo. Alterações nos fluxos, mensagens e configurações podem ser feitas através de uma interface amigável, sem necessidade de código.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper
      id="faq"
      eyebrow="FAQ"
      eyebrowColor="default"
      title="Perguntas Frequentes"
      subtitle="Dúvidas sobre custos, integração, segurança e implementação."
    >
      <div className="space-y-3">
        {faqItems.map((item, index) => {
          const IconComponent = item.icon;
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-colors",
                isOpen && "border-[#00E5FF]/30"
              )}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-5 py-4 flex items-center gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-inset"
                aria-expanded={isOpen}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                    isOpen
                      ? "bg-[#00E5FF] text-[#02040A]"
                      : "bg-[#00E5FF]/20 text-[#00E5FF]"
                  )}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="flex-1 text-white font-medium">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-white/50 transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-[4.5rem]">
                      <p className="text-white/70 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
