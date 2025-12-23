"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Star } from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";

type Plan = {
  name: string;
  subtitle: string;
  setup: { current: string; previous?: string };
  monthly: { current: string; previous?: string };
  bullets: string[];
  badge?: string;
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Agente SDR & Qualificação",
    subtitle: "Captação, triagem e passagem quente para vendas",
    setup: { current: "R$ 15.000" },
    monthly: { current: "R$ 2.000/mês" },
    bullets: [
      "Qualificação e agendamento instantâneos",
      "Roteamento inteligente para o vendedor certo",
      "Scripts de vendas 24/7 alinhados ao playbook",
    ],
    badge: "Mais buscado",
    featured: true,
  },
  {
    name: "Agente Follow-up Automático",
    subtitle: "Cadência multicanal e recuperação de oportunidades",
    setup: { current: "R$ 5.000" },
    monthly: { current: "R$ 1.000/mês" },
    bullets: [
      "Cadência ativa até fechar ou desqualificar",
      "Alertas no CRM quando o lead reengaja",
      "Recuperação de orçamentos e no-shows",
    ],
  },
  {
    name: "Agente Pós-vendas & NPS",
    subtitle: "Pesquisa, reativação e expansão da carteira",
    setup: { current: "R$ 5.000" },
    monthly: { current: "R$ 1.000/mês" },
    bullets: [
      "Pesquisa NPS e coleta estruturada de feedback",
      "Reativação de clientes inativos com ofertas",
      "Base de conhecimento viva para respostas consistentes",
    ],
  },
  {
    name: "Ecossistema Full",
    subtitle: "Os 3 agentes + CRM, Dashboard e integrações",
    setup: { current: "R$ 0", previous: "R$ 25.000" },
    monthly: { current: "R$ 3.500/mês", previous: "R$ 4.000/mês" },
    bullets: [
      "Três agentes orquestrados (SDR, Follow-up, Pós-vendas & NPS)",
      "CRM + Dashboard executivo prontos para uso",
      "Integrações, suporte contínuo e otimizações",
    ],
    badge: "Mais completo",
    featured: true,
  },
];

export default function InvestimentoSlide() {
  return (
    <SlideShell
      eyebrow="Investimento"
      eyebrowColor="success"
      title="Investimento"
      subtitle="Planos por agente e pacote completo, com economia progressiva"
      align="center"
      background={
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00FF94]/5 via-transparent to-transparent pointer-events-none" />
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
        {plans.map((plan, index) => {
          const isFeatured = plan.featured;
          return (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl border bg-white/5 p-6 flex flex-col gap-4 ${
                isFeatured
                  ? "border-[#00E5FF]/40 bg-[#00E5FF]/5 shadow-[0_20px_50px_-24px_rgba(0,229,255,0.5)]"
                  : "border-white/10"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              {plan.badge ? (
                <div
                  className={`absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                    isFeatured
                      ? "bg-[#00E5FF] text-black"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {isFeatured ? (
                    <Sparkles className="w-3 h-3" />
                  ) : (
                    <Star className="w-3 h-3" />
                  )}
                  {plan.badge}
                </div>
              ) : null}

              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">
                  {plan.name}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {plan.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                  Setup
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  {plan.setup.previous ? (
                    <span className="text-white/30 line-through text-sm">
                      {plan.setup.previous}
                    </span>
                  ) : null}
                  <span className="text-3xl font-bold text-white">
                    {plan.setup.current}
                  </span>
                  <span className="text-white/50 text-xs">pagamento único</span>
                </div>
              </div>

              <div className="pt-1">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                  Mensalidade
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  {plan.monthly.previous ? (
                    <span className="text-white/30 line-through text-sm">
                      {plan.monthly.previous}
                    </span>
                  ) : null}
                  <span className="text-3xl font-bold text-[#00FF94]">
                    {plan.monthly.current}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {plan.bullets.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 text-white/70 text-sm leading-relaxed"
                  >
                    <Check className="w-4 h-4 text-[#00FF94] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <motion.button
                type="button"
                className={`mt-auto inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                  isFeatured
                    ? "bg-[#00E5FF] text-black hover:bg-[#00E5FF]/90"
                    : "border border-white/15 text-white hover:border-white/40"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver detalhes
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  );
}
