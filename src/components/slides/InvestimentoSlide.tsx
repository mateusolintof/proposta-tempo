"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, CreditCard } from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";

const included = [
  "Configuração dos 4 agentes com base de conhecimento",
  "Integração com ERP e canais de atendimento (via API)",
  "CRM e Dashboard configurados",
  "Treinamento + 30 dias de acompanhamento",
];

const paymentOptions = ["PIX", "Boleto", "Cartão de Crédito"];

export default function InvestimentoSlide() {
  return (
    <SlideShell
      eyebrow="Investimento"
      eyebrowColor="success"
      title="Investimento"
      subtitle="Ecossistema Full com desconto especial"
      align="center"
      background={
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00FF94]/5 via-transparent to-transparent pointer-events-none" />
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
        {/* Setup */}
        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-[#00FF94]/20 rounded-full">
            <Sparkles className="w-3 h-3 text-[#00FF94]" />
            <span className="text-[#00FF94] text-xs font-medium">37% OFF</span>
          </div>

          <p className="text-xs uppercase tracking-widest text-white/40 mb-2">
            Setup Único
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-white/40 line-through text-lg">
              R$ 40.000
            </span>
          </div>
          <p className="text-4xl md:text-5xl font-bold text-white mt-2">
            R$ 25.000
          </p>
          <p className="text-white/50 mt-4 text-body">
            Implantação completa do ecossistema
          </p>
        </motion.div>

        {/* Mensalidade */}
        <motion.div
          className="bg-gradient-to-br from-[#00FF94]/10 to-[#00E5FF]/5 border border-[#00FF94]/30 rounded-2xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-[#00E5FF]/20 rounded-full">
            <span className="text-[#00E5FF] text-xs font-medium">
              Economia R$ 1.500/mês
            </span>
          </div>

          <p className="text-xs uppercase tracking-widest text-white/40 mb-2">
            Mensalidade
          </p>
          <p className="text-4xl md:text-5xl font-bold text-[#00FF94] mt-2">
            R$ 2.500
          </p>
          <p className="text-white/50 mt-4 text-body">/mês por todos os módulos</p>
        </motion.div>
      </div>

      {/* Included */}
      <motion.div
        className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6 w-full max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-xs uppercase tracking-widest text-white/40 mb-4">
          Incluso no pacote
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {included.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-white/70 text-body"
            >
              <Check className="w-4 h-4 text-[#00FF94] flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Payment Options */}
      <motion.div
        className="mt-6 flex items-center justify-center gap-4 flex-wrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <CreditCard className="w-4 h-4 text-white/40" />
        <span className="text-white/40 text-body">Formas de pagamento:</span>
        {paymentOptions.map((option) => (
          <span
            key={option}
            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs"
          >
            {option}
          </span>
        ))}
      </motion.div>
    </SlideShell>
  );
}
