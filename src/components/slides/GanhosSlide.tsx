"use client";

import { motion } from "framer-motion";
import {
  Zap,
  CalendarCheck,
  TrendingUp,
  DollarSign,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";
import type { ModalKind } from "@/types/modal";

const gains = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Retenção de Lead Frio",
    desc: "O lead de tráfego frio exige velocidade. Ao responder em segundos e já apresentar o cálculo de economia, evitamos que ele continue pesquisando e vá para o concorrente.",
    color: "cyan",
  },
  {
    icon: <CalendarCheck className="w-6 h-6" />,
    title: "Financeiro (OCR)",
    desc: "A IA atua como uma barreira de qualidade: lê a fatura, valida o ticket mínimo e descarta curiosos automaticamente, protegendo a agenda dos vendedores.",
    color: "green",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Maturação de Oportunidades",
    desc: "Leads que não fecham agora não são perdidos. O Agente mantém o follow-up ativo e nutre o CRM, reaquecendo contatos para vendas futuras.",
    color: "cyan",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Foco Exclusivo em Fechamento",
    desc: "Inversão da lógica de trabalho: o humano para de prospectar e começa a negociar. Menos tempo operacional, mais tempo persuasivo.",
    color: "green",
  },
];

const mainMetrics = [
  {
    label: "De Cobertura e Resposta",
    value: "100%",
    context:
      "Eliminação total do gap de atendimento. Todo lead, seja domingo ou 3h da manhã, é respondido e engajado instantaneamente.",
    color: "#00FF94",
  },
  {
    label: "Triagem Manual de Faturas",
    value: "Zero",
    context:
      "Seu time comercial deixa de gastar tempo analisando contas abaixo de R$ 250. Só recebem o lead validado.",
    color: "#00E5FF",
  },
];

interface GanhosSlideProps {
  onOpenModal?: (modal: ModalKind) => void;
}

export default function GanhosSlide({ onOpenModal }: GanhosSlideProps) {
  return (
    <SlideShell
      eyebrow="Resultados"
      eyebrowColor="success"
      title="Ganhos Esperados"
      subtitle="Impacto direto nos indicadores de performance comercial"
      background={
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#00FF94]/5 via-transparent to-transparent pointer-events-none" />
      }
    >
      {/* Main Metrics */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
        {mainMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className="relative overflow-hidden rounded-2xl p-6 text-center"
            style={{
              background: `linear-gradient(135deg, ${metric.color}15, transparent)`,
              border: `1px solid ${metric.color}30`,
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
          >
            <p
              className="text-4xl md:text-5xl font-bold"
              style={{ color: metric.color }}
            >
              {metric.value}
            </p>
            <p className="text-white/70 mt-2 text-body font-medium">
              {metric.label}
            </p>
            <p className="text-white/50 text-xs md:text-sm mt-2 leading-relaxed">
              {metric.context}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Gains Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {gains.map((gain, index) => (
          <motion.div
            key={gain.title}
            className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3"
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div
              className={`p-2 rounded-lg ${
                gain.color === "cyan"
                  ? "bg-[#00E5FF]/10 text-[#00E5FF]"
                  : "bg-[#00FF94]/10 text-[#00FF94]"
              }`}
            >
              {gain.icon}
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                {gain.title}
              </h3>
              <p className="text-white/50 mt-1 text-[13px] leading-relaxed">
                {gain.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          type="button"
          onClick={() => onOpenModal?.({ type: "gains" })}
          className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#00FF94]/10 to-transparent border border-[#00FF94]/30 rounded-xl text-white hover:border-[#00FF94]/60 hover:bg-[#00FF94]/5 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <TrendingUp className="w-5 h-5 text-[#00FF94]" />
          <span className="font-medium">Detalhar Ganhos Operacionais</span>
          <ArrowRight className="w-4 h-4 text-[#00FF94] group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <motion.button
          type="button"
          onClick={() => onOpenModal?.({ type: "intelligence" })}
          className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#00E5FF]/10 to-transparent border border-[#00E5FF]/30 rounded-xl text-white hover:border-[#00E5FF]/60 hover:bg-[#00E5FF]/5 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <BarChart3 className="w-5 h-5 text-[#00E5FF]" />
          <span className="font-medium">Ver Inteligência de Dados</span>
          <ArrowRight className="w-4 h-4 text-[#00E5FF] group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </SlideShell>
  );
}
