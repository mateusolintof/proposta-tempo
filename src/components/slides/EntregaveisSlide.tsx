"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Link2,
  LayoutDashboard,
  GraduationCap,
  Check,
} from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";

const deliverables = [
  {
    icon: <Bot className="w-7 h-7" />,
    title: "4 Agentes Configurados",
    items: [
      "SDR & Agendamento",
      "FAQ Inteligente",
      "Anti No-Show",
      "Pesquisa & NPS",
    ],
  },
  {
    icon: <Link2 className="w-7 h-7" />,
    title: "Integração ERP",
    items: [
      "Conexão com Tasy",
      "Sincronização de agenda",
      "Atualização automática",
    ],
  },
  {
    icon: <LayoutDashboard className="w-7 h-7" />,
    title: "CRM & Dashboard",
    items: [
      "Funil de vendas",
      "KPIs em tempo real",
      "Relatórios executivos",
    ],
  },
  {
    icon: <GraduationCap className="w-7 h-7" />,
    title: "Treinamento & Suporte",
    items: [
      "4h de treinamento",
      "30 dias de acompanhamento",
      "Documentação completa",
    ],
  },
];

export default function EntregaveisSlide() {
  return (
    <SlideShell
      eyebrow="Entregáveis"
      title="O Que Será Entregue"
      subtitle="Setup Tecnológico completo + Serviços de implantação"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {deliverables.map((item, index) => (
          <motion.div
            key={item.title}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-[#00E5FF]/10 rounded-lg text-[#00E5FF]">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            </div>
            <ul className="space-y-2">
              {item.items.map((subItem) => (
                <li
                  key={subItem}
                  className="flex items-center gap-2 text-white/60 text-sm"
                >
                  <Check className="w-4 h-4 text-[#00FF94]" />
                  {subItem}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Support Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
        <motion.div
          className="bg-[#00FF94]/10 border border-[#00FF94]/30 rounded-xl p-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-2xl font-bold text-[#00FF94]">4h</p>
          <p className="text-white/60 text-xs mt-1">Treinamento</p>
        </motion.div>
        <motion.div
          className="bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-xl p-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-2xl font-bold text-[#00E5FF]">30 dias</p>
          <p className="text-white/60 text-xs mt-1">Suporte dedicado</p>
        </motion.div>
      </div>
    </SlideShell>
  );
}
