"use client";

import { motion } from "framer-motion";
import { Handshake, Code, CheckCircle, Rocket } from "lucide-react";
import SectionWrapper from "../SectionWrapper";

const phases = [
  {
    phase: 1,
    title: "Kick-off",
    subtitle: "Semana 1",
    desc: "Alinhamento inicial e levantamento de requisitos",
    icon: Handshake,
    color: "#00E5FF",
    tasks: [
      "Mapeamento de processos atuais",
      "Definição de fluxos e integrações",
      "Configuração do ambiente",
    ],
  },
  {
    phase: 2,
    title: "Desenvolvimento",
    subtitle: "Semanas 2-3",
    desc: "Construção dos fluxos e integrações",
    icon: Code,
    color: "#00FF94",
    tasks: [
      "Desenvolvimento dos agentes",
      "Integrações com CRM e WhatsApp",
      "Configuração de regras de negócio",
    ],
  },
  {
    phase: 3,
    title: "Validação",
    subtitle: "Semana 4",
    desc: "Testes com a equipe e ajustes finais",
    icon: CheckCircle,
    color: "#FFD700",
    tasks: [
      "Testes em ambiente controlado",
      "Treinamento da equipe",
      "Ajustes finos nos fluxos",
    ],
  },
  {
    phase: 4,
    title: "Go-Live",
    subtitle: "Semana 5",
    desc: "Lançamento oficial e acompanhamento",
    icon: Rocket,
    color: "#00E5FF",
    tasks: [
      "Deploy em produção",
      "Monitoramento intensivo",
      "Suporte dedicado pós-lançamento",
    ],
  },
];

export default function ProcessoSection() {
  return (
    <SectionWrapper
      id="processo"
      eyebrow="Cronograma"
      eyebrowColor="warning"
      title="Processo de Implementação"
      subtitle="4 fases até o Go-Live em aproximadamente 4-6 semanas."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {phases.map((phase, index) => {
          const IconComponent = phase.icon;
          return (
            <motion.div
              key={phase.phase}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Phase number badge */}
              <span
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center"
                style={{ backgroundColor: phase.color, color: "#02040A" }}
              >
                {phase.phase}
              </span>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${phase.color}20` }}
              >
                <IconComponent
                  className="w-6 h-6"
                  style={{ color: phase.color }}
                />
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg font-semibold text-white">{phase.title}</h3>
              <p
                className="text-xs font-medium mb-2"
                style={{ color: phase.color }}
              >
                {phase.subtitle}
              </p>
              <p className="text-white/50 text-sm mb-4">{phase.desc}</p>

              {/* Tasks */}
              <div className="space-y-2">
                {phase.tasks.map((task, taskIndex) => (
                  <div
                    key={taskIndex}
                    className="flex items-center gap-2 text-xs"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: phase.color }}
                    />
                    <span className="text-white/60">{task}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Timeline visual */}
      <motion.div
        className="mt-8 hidden lg:block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#00E5FF] via-[#00FF94] to-[#FFD700] opacity-30" />
          {phases.map((phase, index) => (
            <div
              key={phase.phase}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2"
              style={{
                left: `${(index / (phases.length - 1)) * 100}%`,
                transform: `translate(-50%, -50%)`,
                backgroundColor: "#02040A",
                borderColor: phase.color,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-white/40">
          <span>Início</span>
          <span>4-6 semanas</span>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
