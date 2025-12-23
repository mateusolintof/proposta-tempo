"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Shield,
  Zap,
  Clock,
  HelpCircle,
  Lock,
  RefreshCw,
} from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";

interface FAQItem {
  icon: React.ReactNode;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    icon: <Shield className="w-5 h-5" />,
    question:
      "Os dados dos clientes estão seguros? A solução é compatível com a LGPD?",
    answer:
      "A solução é desenhada com boas práticas de segurança e privacidade, alinhadas à LGPD (ex.: criptografia em trânsito e em repouso, controle de acesso, trilhas de auditoria e políticas de retenção). No kick-off, alinhamos governança de dados (exportação, retenção e exclusão) e os termos de tratamento conforme o escopo definido.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    question: "Como funciona a integração com nosso ERP e canais atuais?",
    answer:
      "Desenvolvemos integrações sob medida para cada operação. Conectamos ao seu ERP/CRM e canais (ex.: WhatsApp) via API e/ou webhooks, sem necessidade de substituir o sistema atual. No kick-off, mapeamos os eventos e dados necessários (cadastro, catálogo, status do pedido, pagamentos etc.) e validamos juntos o fluxo ideal.",
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    question: "E se os resultados não forem os esperados? Existe garantia?",
    answer:
      "A fase de Validação (piloto) existe justamente para ajustar fluxos, mensagens e regras de handoff antes do Go-Live. Definimos metas e critérios no kick-off e acompanhamos os KPIs com a equipe. Se o cenário real exigir mudanças de escopo/integrações, replanejamos para manter o projeto viável e orientado a resultado.",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    question: "Quanto tempo leva para implementar e ver resultados?",
    answer:
      "Em geral, a implementação leva de 4 a 6 semanas, dependendo da complexidade das integrações. Os primeiros ganhos (tempo de resposta e captura de leads fora do horário) aparecem nas primeiras semanas. Ganhos consolidados de conversão e recuperação tendem a aparecer após o período de estabilização e ajustes do piloto.",
  },
  {
    icon: <HelpCircle className="w-5 h-5" />,
    question: "Preciso de conhecimento técnico para operar o sistema?",
    answer:
      "Não! O sistema foi desenhado para ser gerenciado por qualquer pessoa da sua equipe. Oferecemos treinamento completo durante a implementação e suporte contínuo. Alterações nos fluxos, mensagens e configurações podem ser feitas através de uma interface amigável, sem necessidade de código.",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    question: "Posso cancelar o contrato a qualquer momento?",
    answer:
      "Os termos comerciais (setup, mensalidade e prazo) são definidos na proposta e podem ser ajustados conforme o nível de integração e o esforço de implantação. O importante é garantir tempo suficiente para implementar, validar e estabilizar a operação — e manter transparência de condições desde o início.",
  },
];

export default function FAQSlide() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SlideShell
      eyebrow="FAQ"
      eyebrowColor="default"
      title="Perguntas Frequentes"
      subtitle="Transparência total sobre segurança, integrações, garantias e prazos."
      align="center"
      size="compact"
    >
      <div className="max-w-3xl mx-auto space-y-3">
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-[#00E5FF]/30 transition-colors"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-5 py-4 flex items-center gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-inset"
              aria-expanded={openIndex === index}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  openIndex === index
                    ? "bg-[#00E5FF] text-[#02040A]"
                    : "bg-[#00E5FF]/20 text-[#00E5FF]"
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`flex-1 font-medium transition-colors text-body ${
                  openIndex === index ? "text-white" : "text-white/80"
                }`}
              >
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0"
              >
                <ChevronDown
                  className={`w-5 h-5 transition-colors ${
                    openIndex === index ? "text-[#00E5FF]" : "text-white/40"
                  }`}
                />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-4 pl-[4.5rem]">
                    <p className="text-white/60 text-body leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Additional help */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <p className="text-white/40 text-body">
          Ainda tem dúvidas?{" "}
          <span className="font-semibold text-[#00E5FF]">
            Estamos à disposição para esclarecer qualquer ponto.
          </span>
        </p>
      </motion.div>
    </SlideShell>
  );
}
