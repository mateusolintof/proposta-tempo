"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Calculator,
  Globe,
  BookOpen,
  Shield,
  Check,
  MessageSquare,
} from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";

const clienteDeseja = [
  {
    category: "Fluxo Principal",
    items: [
      "Agente SDR Qualificador e Classificador",
      "Atendimento 24/7 para leads frios",
      "Handoff inteligente para vendedor humano finalizar",
    ],
  },
  {
    category: "Requisitos Específicos",
    items: [
      "Leitura de fatura de energia (PDF/Foto) - validar R$ 250 mínimo",
      "Personalização total - não robô genérico",
      "Capacidade de cálculos e simulações",
    ],
  },
  {
    category: "Agentes Opcionais",
    items: ["Follow-up (aumentar conversão)", "Pós-vendas (cobranças, NPS)"],
  },
];

const ferramentas = [
  {
    icon: Eye,
    title: "Visão Computacional (OCR)",
    desc: "Ler, interpretar e extrair dados de faturas de energia (PDF ou Foto)",
  },
  {
    icon: Calculator,
    title: "Cérebro Matemático",
    desc: "Cálculo avançado para simulações, projeção de descontos e financiamento em tempo real",
  },
  {
    icon: Globe,
    title: "Pesquisas & Validações",
    desc: "Consulta CPF para restrições + cálculo de score do lead",
  },
  {
    icon: BookOpen,
    title: "Base de Conhecimento (RAG)",
    desc: "Treinado nas regras de negócio da Tempo. Responde com precisão",
  },
  {
    icon: Shield,
    title: "Integrações & Segurança",
    desc: "Guardrails para evitar alucinações e invasões de terceiros",
  },
];

export default function ObjetivoProjetoSlide() {
  return (
    <SlideShell
      eyebrow="Objetivo do Projeto"
      eyebrowColor="success"
      title="Solução Desejada × Diferenciais Tecnológicos"
      subtitle="Validação técnica: o que você precisa e como vamos entregar"
      size="compact"
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full overflow-y-auto"
        data-allow-vertical-scroll
      >
        {/* Coluna Esquerda: O Que a Tempo Energia Deseja */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-7 bg-amber-500 rounded-full" />
            <h3 className="text-lg font-semibold text-white">
              O Que a Tempo Energia Deseja
            </h3>
          </div>

          {clienteDeseja.map((section, idx) => (
            <motion.div
              key={section.category}
              className="bg-white/5 border border-white/10 rounded-xl p-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <p className="text-xs uppercase tracking-widest text-amber-400 mb-3">
                {section.category}
              </p>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-white/70 text-sm"
                  >
                    <Check className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Coluna Direita: Capacidade e Diferenciais */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-7 bg-[#00FF94] rounded-full" />
            <h3 className="text-lg font-semibold text-white">
              Capacidade e Diferenciais
            </h3>
          </div>

          {/* Entrega Principal */}
          <motion.div
            className="bg-[#00FF94]/10 border border-[#00FF94]/30 rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="w-5 h-5 text-[#00FF94]" />
              <p className="text-xs uppercase tracking-widest text-[#00FF94]">
                Entrega Principal
              </p>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Agente SDR humanizado que qualifica leads, classifica por score e
              realiza handoff para vendedor humano finalizar a venda.
            </p>
          </motion.div>

          {/* 5 Cards de Ferramentas */}
          <div className="space-y-2.5">
            <p className="text-xs uppercase tracking-widest text-white/50 mb-2">
              Ferramentas Integradas
            </p>
            {ferramentas.map((tool, idx) => (
              <motion.div
                key={tool.title}
                className="bg-white/5 border border-white/10 rounded-lg p-3.5 flex items-start gap-3 hover:border-[#00FF94]/30 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.05 }}
              >
                <div className="p-2 bg-[#00E5FF]/10 rounded-lg flex-shrink-0">
                  <tool.icon className="w-4 h-4 text-[#00E5FF]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-white/50 mt-0.5">{tool.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
