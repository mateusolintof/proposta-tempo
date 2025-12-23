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
    title: "3 Agentes Personalizados",
    items: [
      "SDR & Qualificação",
      "Follow-up Automático",
      "Pós-vendas & NPS",
    ],
  },
  {
    icon: <Link2 className="w-7 h-7" />,
    title: "Ferramentas e Integrações",
    items: [
      "Leitura de imagens e faturas de energia",
      "Cálculos matemáticos",
      "Escalação para Humano",
      "Notificação Inteligente para vendedor",
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
      "Suporte contínuo",
      "30 dias de testes contínuos até validação da equipe da Tempo",
      "Banco de dados completo e Servidor Ativo 24/7",
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
                  className="flex items-center gap-2 text-white/60 text-body"
                >
                  <Check className="w-4 h-4 text-[#00FF94]" />
                  {subItem}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

    </SlideShell>
  );
}
