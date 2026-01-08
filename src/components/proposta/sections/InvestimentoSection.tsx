"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  CalendarCheck,
  Star,
  Check,
  Bot,
  Link2,
  LayoutDashboard,
  CheckCircle,
  Cpu,
  Database,
  Server,
  Wrench,
  Sparkles,
  Headphones,
} from "lucide-react";
import SectionWrapper from "../SectionWrapper";

const agentPackages = [
  {
    name: "Agente SDR & Qualificação",
    subtitle: "Captação, triagem e passagem quente para vendas",
    setup: "R$ 15.000",
    monthly: "R$ 2.000/mês",
    icon: MessageSquare,
    color: "#00E5FF",
    featured: true,
    badge: "Mais buscado",
    bullets: [
      "Qualificação e agendamento instantâneos",
      "Roteamento inteligente para o vendedor certo",
      "Scripts de vendas 24/7 alinhados ao playbook",
    ],
  },
  {
    name: "Agente Follow-up Automático",
    subtitle: "Cadência multicanal e recuperação de oportunidades",
    setup: "R$ 5.000",
    monthly: "R$ 1.000/mês",
    icon: CalendarCheck,
    color: "#00FF94",
    bullets: [
      "Cadência ativa até fechar ou desqualificar",
      "Alertas no CRM quando o lead reengaja",
      "Recuperação de orçamentos e no-shows",
    ],
  },
  {
    name: "Agente Pós-vendas & NPS",
    subtitle: "Pesquisa, reativação e expansão da carteira",
    setup: "R$ 5.000",
    monthly: "R$ 1.000/mês",
    icon: Star,
    color: "#FFD700",
    bullets: [
      "Pesquisa NPS e coleta estruturada de feedback",
      "Reativação de clientes inativos com ofertas",
      "Base de conhecimento viva para respostas consistentes",
    ],
  },
];

const fullPackage = {
  name: "Ecossistema Full",
  subtitle: "Os 3 agentes + CRM, Dashboard e integrações",
  setupOriginal: "R$ 25.000",
  setup: "R$ 0",
  monthly: "R$ 4.000/mês",
  badge: "Mais completo",
  bullets: [
    "Três agentes orquestrados (SDR, Follow-up, Pós-vendas & NPS)",
    "CRM + Dashboard executivo prontos para uso",
    "Integrações, suporte contínuo e otimizações",
  ],
};

const deliverables = [
  {
    title: "3 Agentes Personalizados",
    icon: Bot,
    items: ["SDR & Qualificação", "Follow-up Automático", "Pós-vendas & NPS"],
  },
  {
    title: "Ferramentas e Integrações",
    icon: Link2,
    items: [
      "Leitura de faturas (OCR)",
      "Cálculos matemáticos avançados",
      "Escalação para Humano",
    ],
  },
  {
    title: "CRM & Dashboard",
    icon: LayoutDashboard,
    items: ["Funil de vendas", "KPIs em tempo real", "Relatórios executivos"],
  },
];

export default function InvestimentoSection() {
  return (
    <SectionWrapper
      id="investimento"
      eyebrow="Investimento"
      eyebrowColor="success"
      title="Investimento"
      subtitle="Estrutura de preços modular com pacotes individuais e pacote completo."
    >
      <div className="space-y-8">
        {/* Individual Packages */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Pacotes Individuais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {agentPackages.map((pkg, index) => {
              const IconComponent = pkg.icon;
              return (
                <motion.div
                  key={pkg.name}
                  className={`rounded-2xl border p-5 ${
                    pkg.featured
                      ? "border-[#00E5FF]/40 bg-[#00E5FF]/5"
                      : "border-white/10 bg-white/5"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {pkg.badge && (
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold mb-4 ${
                        pkg.featured
                          ? "bg-[#00E5FF] text-black"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      {pkg.badge}
                    </span>
                  )}

                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${pkg.color}20` }}
                    >
                      <IconComponent
                        className="w-5 h-5"
                        style={{ color: pkg.color }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">
                        {pkg.name}
                      </h4>
                      <p className="text-xs text-white/50">{pkg.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mb-4">
                    <div className="flex-1 rounded-lg border border-white/10 bg-black/20 p-2 text-center">
                      <p className="text-[10px] uppercase text-white/40">
                        Setup
                      </p>
                      <span className="text-sm font-semibold text-white">
                        {pkg.setup}
                      </span>
                    </div>
                    <div className="flex-1 rounded-lg border border-[#00FF94]/30 bg-[#00FF94]/10 p-2 text-center">
                      <p className="text-[10px] uppercase text-white/40">
                        Mensal
                      </p>
                      <span className="text-sm font-semibold text-[#00FF94]">
                        {pkg.monthly}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {pkg.bullets.map((bullet, bulletIndex) => (
                      <div
                        key={bulletIndex}
                        className="flex items-center gap-2 text-xs"
                      >
                        <Check
                          className="w-3 h-3 flex-shrink-0"
                          style={{ color: pkg.color }}
                        />
                        <span className="text-white/60">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Full Package */}
        <motion.div
          className="rounded-2xl border-2 border-[#00FF94]/40 bg-gradient-to-r from-[#00FF94]/10 via-[#00E5FF]/10 to-[#00FF94]/10 p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-semibold bg-[#00FF94] text-black mb-3">
                <Sparkles className="w-3 h-3" />
                {fullPackage.badge}
              </span>
              <h3 className="text-xl font-semibold text-white">
                {fullPackage.name}
              </h3>
              <p className="text-white/50 text-sm mt-1">
                {fullPackage.subtitle}
              </p>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-center">
              <p className="text-xs uppercase tracking-wider text-white/40">
                Setup
              </p>
              <div className="flex items-baseline justify-center gap-2 mt-1">
                <span className="text-sm text-white/30 line-through">
                  {fullPackage.setupOriginal}
                </span>
                <span className="text-2xl font-bold text-[#00FF94]">
                  {fullPackage.setup}
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-[#00FF94]/30 bg-[#00FF94]/10 p-4 text-center">
              <p className="text-xs uppercase tracking-wider text-white/40">
                Mensal
              </p>
              <span className="text-2xl font-bold text-[#00FF94]">
                {fullPackage.monthly}
              </span>
            </div>
            <div className="rounded-xl border border-[#00FF94]/30 bg-[#00FF94]/20 p-4 text-center">
              <p className="text-xs uppercase tracking-wider text-white/40">
                Economia
              </p>
              <span className="text-2xl font-bold text-[#00FF94]">
                100% OFF
              </span>
              <p className="text-xs text-white/40">no setup</p>
            </div>
          </div>

          {/* Bullets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {fullPackage.bullets.map((bullet, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-[#00FF94] flex-shrink-0" />
                <span className="text-white/70">{bullet}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Deliverables */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Entregáveis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {deliverables.map((deliverable, index) => {
              const IconComponent = deliverable.icon;
              return (
                <motion.div
                  key={deliverable.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-[#00E5FF]/10">
                      <IconComponent className="w-5 h-5 text-[#00E5FF]" />
                    </div>
                    <h4 className="font-medium text-white text-sm">
                      {deliverable.title}
                    </h4>
                  </div>
                  <ul className="space-y-1.5">
                    {deliverable.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-xs text-white/60 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/30" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* What's Included */}
        <motion.div
          className="rounded-2xl border-2 border-[#00FF94]/30 bg-[#00FF94]/5 p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-[#00FF94]/20">
              <CheckCircle className="w-6 h-6 text-[#00FF94]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                O que está incluso no valor mensal
              </h3>
              <p className="text-white/50 text-sm">
                Transparência total - sem custos ocultos
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                icon: Cpu,
                title: "Tokens de IA",
                desc: "Claude, GPT e outros LLMs",
              },
              {
                icon: Database,
                title: "Banco de Dados",
                desc: "Armazenamento de conversas e leads",
              },
              {
                icon: Server,
                title: "Infraestrutura",
                desc: "Servidores 24/7 e monitoramento",
              },
              {
                icon: Wrench,
                title: "Manutenção",
                desc: "Correções e atualizações",
              },
              {
                icon: Sparkles,
                title: "Melhorias Contínuas",
                desc: "Novas features e otimizações",
              },
              {
                icon: Headphones,
                title: "Suporte Técnico",
                desc: "Atendimento dedicado",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-black/20 rounded-lg p-3"
              >
                <div className="p-1.5 rounded-lg bg-[#00FF94]/10">
                  <item.icon className="w-4 h-4 text-[#00FF94]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-white/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
