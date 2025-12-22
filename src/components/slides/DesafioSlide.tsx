"use client";

import { motion } from "framer-motion";
import { TrendingDown, MessageSquareWarning, Star } from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";

const challenges = [
  {
    icon: <MessageSquareWarning className="w-8 h-8" />,
    title: "Insatisfação Crescente",
    desc: "Reclamações frequentes sobre qualidade e tempo de atendimento",
    stat: "NPS baixo",
  },
  {
    icon: <TrendingDown className="w-8 h-8" />,
    title: "Abandono Fora do Horário",
    desc: "50-70% dos contatos não dão continuidade quando atendidos tarde",
    stat: "50-70%",
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Reputação em Risco",
    desc: "Avaliações negativas no Google e Reclame Aqui afetam novas conversões",
    stat: "Impacto direto",
  },
];

export default function DesafioSlide() {
  return (
    <SlideShell
      eyebrow="Desafio"
      eyebrowColor="warning"
      title="O Desafio Atual"
      subtitle="Alto volume de leads sem atendimento adequado compromete resultados"
      background={
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent pointer-events-none" />
      }
    >
      {/* Main stat highlight */}
      <motion.div
        className="w-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-8 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-6xl md:text-8xl font-bold text-amber-400">
          50-70%
        </p>
        <p className="text-white/80 mt-4 text-lg">
          dos contatos fora do horário comercial não dão continuidade
        </p>
      </motion.div>

      {/* Challenge cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {challenges.map((challenge, index) => (
          <motion.div
            key={challenge.title}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="text-amber-400 mb-4">{challenge.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {challenge.title}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {challenge.desc}
            </p>
            <div className="mt-4 inline-block px-3 py-1 bg-amber-500/10 rounded-full text-amber-400 text-xs font-medium">
              {challenge.stat}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}
