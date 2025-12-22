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
      "Os dados dos pacientes estão seguros? A solução é compatível com a LGPD?",
    answer:
      "Sim, 100%. Nossa infraestrutura segue rigorosos padrões de segurança: criptografia de ponta a ponta (AES-256), servidores em data centers certificados ISO 27001 no Brasil, e total conformidade com a LGPD. Além disso, você mantém controle total sobre os dados - eles são seus, e podemos exportá-los ou excluí-los quando desejar.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    question: "Como funciona a integração com nosso sistema ERP/agenda atual?",
    answer:
      "Desenvolvemos integrações customizadas para cada cliente. Trabalhamos com os principais ERPs do mercado de saúde (MV, Tasy, Totvs, Philips, etc.) e sistemas de agenda. A integração é feita via API segura, sem necessidade de substituir seu sistema atual. Durante a fase de kick-off, mapeamos suas necessidades específicas.",
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    question: "E se os resultados não forem os esperados? Existe garantia?",
    answer:
      "Oferecemos um período de 90 dias para validação de resultados. Se após esse período, com uso correto da plataforma, os indicadores não apresentarem melhoria significativa, renegociamos os termos ou encerramos o contrato sem multa. Nosso objetivo é parceria de longo prazo, não contratos forçados.",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    question: "Quanto tempo leva para implementar e ver resultados?",
    answer:
      "A implementação completa leva de 4 a 6 semanas, dependendo da complexidade das integrações. Os primeiros resultados (redução de tempo de resposta e aumento de leads capturados fora do horário) aparecem já na primeira semana de operação. Resultados consolidados de conversão são visíveis a partir do segundo mês.",
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
      "Sim. Trabalhamos com contratos de 12 meses (para garantir tempo adequado de implementação e maturação), mas com possibilidade de cancelamento após os primeiros 90 dias mediante aviso prévio de 30 dias. Não há multas abusivas - apenas cobramos o proporcional ao uso.",
  },
];

export default function FAQSlide() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SlideShell
      eyebrow="Dúvidas Frequentes"
      eyebrowColor="default"
      title="Perguntas que Você Pode Estar se Fazendo"
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
                className={`flex-1 font-medium transition-colors text-sm ${
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
                    <p className="text-white/60 text-sm leading-relaxed">
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
        <p className="text-white/40 text-sm">
          Ainda tem dúvidas?{" "}
          <span className="font-semibold text-[#00E5FF]">
            Estamos à disposição para esclarecer qualquer ponto.
          </span>
        </p>
      </motion.div>
    </SlideShell>
  );
}
