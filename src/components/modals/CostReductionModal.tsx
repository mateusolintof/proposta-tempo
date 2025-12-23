"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Slider } from "@heroui/react";
import {
  Users,
  TrendingDown,
  DollarSign,
  Bot,
  Clock,
  AlertCircle,
} from "lucide-react";
import ModalWrapper from "./ModalWrapper";

interface CostReductionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CostReductionModal({
  isOpen,
  onClose,
}: CostReductionModalProps) {
  const [attendantCount, setAttendantCount] = useState(3);
  const [avgSalary, setAvgSalary] = useState(2500);
  const [automationPercent, setAutomationPercent] = useState(60);

  const SUPERVISION_RESERVE = 0.15; // 15% for quality supervision

  const calculations = useMemo(() => {
    const totalMonthlyCost = attendantCount * avgSalary;
    const automationRate = automationPercent / 100;
    const effectiveAutomation = automationRate * (1 - SUPERVISION_RESERVE);

    const potentialSavings = totalMonthlyCost * effectiveAutomation;
    const supervisionCost = totalMonthlyCost * automationRate * SUPERVISION_RESERVE;
    const netMonthlySavings = potentialSavings;
    const annualSavings = netMonthlySavings * 12;

    const reducedStaff = Math.floor(attendantCount * effectiveAutomation);
    const remainingStaff = attendantCount - reducedStaff;

    const hoursFreed = Math.round(attendantCount * 8 * 22 * effectiveAutomation);

    return {
      totalMonthlyCost,
      potentialSavings,
      supervisionCost,
      netMonthlySavings,
      annualSavings,
      reducedStaff,
      remainingStaff,
      hoursFreed,
      effectiveAutomation,
    };
  }, [attendantCount, avgSalary, automationPercent]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Simulador de Economia"
      subtitle="Calcule a redução de custos com automação"
    >
      <div className="space-y-8">
        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <label className="text-white/70 text-body block mb-4">
              Número de atendentes
            </label>
            <Slider
              aria-label="Número de atendentes"
              size="sm"
              step={1}
              minValue={1}
              maxValue={15}
              value={attendantCount}
              onChange={(val) => setAttendantCount(val as number)}
              className="max-w-full"
              classNames={{
                track: "bg-white/20",
                filler: "bg-gradient-to-r from-[#00E5FF] to-[#00FF94]",
                thumb: "bg-white",
              }}
            />
            <p className="text-2xl font-bold text-[#00E5FF] mt-3">
              {attendantCount} pessoas
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <label className="text-white/70 text-body block mb-4">
              Salário médio (R$)
            </label>
            <Slider
              aria-label="Salário médio (R$)"
              size="sm"
              step={100}
              minValue={1500}
              maxValue={5000}
              value={avgSalary}
              onChange={(val) => setAvgSalary(val as number)}
              className="max-w-full"
              classNames={{
                track: "bg-white/20",
                filler: "bg-gradient-to-r from-[#00E5FF] to-[#00FF94]",
                thumb: "bg-white",
              }}
            />
            <p className="text-2xl font-bold text-[#00E5FF] mt-3">
              {formatCurrency(avgSalary)}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <label className="text-white/70 text-body block mb-4">
              Automação (%)
            </label>
            <Slider
              aria-label="Automação (%)"
              size="sm"
              step={5}
              minValue={30}
              maxValue={80}
              value={automationPercent}
              onChange={(val) => setAutomationPercent(val as number)}
              className="max-w-full"
              classNames={{
                track: "bg-white/20",
                filler: "bg-gradient-to-r from-[#00E5FF] to-[#00FF94]",
                thumb: "bg-white",
              }}
            />
            <p className="text-2xl font-bold text-[#00E5FF] mt-3">
              {automationPercent}%
            </p>
          </div>
        </div>

        {/* Current vs Future */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-white/70" />
              Cenário Atual
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/50">Atendentes</span>
                <span className="text-white">{attendantCount} pessoas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Salário médio</span>
                <span className="text-white">{formatCurrency(avgSalary)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-white/10">
                <span className="text-white/70 font-medium">Custo mensal total</span>
                <span className="text-white font-bold">
                  {formatCurrency(calculations.totalMonthlyCost)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#00FF94]/10 to-transparent border border-[#00FF94]/30 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#00FF94]" />
              Cenário com IA
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/50">Atendentes necessários</span>
                <span className="text-[#00FF94]">
                  {calculations.remainingStaff} pessoas
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Automação efetiva</span>
                <span className="text-[#00FF94]">
                  {(calculations.effectiveAutomation * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-white/10">
                <span className="text-white/70 font-medium">Economia mensal</span>
                <span className="text-[#00FF94] font-bold">
                  {formatCurrency(calculations.netMonthlySavings)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            className="bg-gradient-to-br from-[#00FF94]/20 to-transparent border border-[#00FF94]/30 rounded-xl p-5 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <DollarSign className="w-6 h-6 text-[#00FF94] mx-auto mb-2" />
            <p className="text-white/50 text-xs mb-1">Economia Mensal</p>
            <p className="text-3xl font-bold text-[#00FF94]">
              {formatCurrency(calculations.netMonthlySavings)}
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-[#00E5FF]/20 to-transparent border border-[#00E5FF]/30 rounded-xl p-5 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TrendingDown className="w-6 h-6 text-[#00E5FF] mx-auto mb-2" />
            <p className="text-white/50 text-xs mb-1">Economia Anual</p>
            <p className="text-3xl font-bold text-[#00E5FF]">
              {formatCurrency(calculations.annualSavings)}
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-[#FFD700]/20 to-transparent border border-[#FFD700]/30 rounded-xl p-5 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Clock className="w-6 h-6 text-[#FFD700] mx-auto mb-2" />
            <p className="text-white/50 text-xs mb-1">Horas Liberadas/Mês</p>
            <p className="text-3xl font-bold text-[#FFD700]">
              {calculations.hoursFreed}h
            </p>
          </motion.div>
        </div>

        {/* Note about supervision */}
        <div className="bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white/80 text-sm font-medium">
              15% reservado para supervisão de qualidade
            </p>
            <p className="text-white/50 text-xs mt-1">
              A automação efetiva considera {SUPERVISION_RESERVE * 100}% do tempo
              para supervisão humana, garantindo qualidade no atendimento e
              tratamento de casos excepcionais.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h4 className="text-white font-semibold mb-3">
            Benefícios Adicionais
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-body">
            <div className="flex items-center gap-2 text-white/70">
              <div className="w-2 h-2 bg-[#00FF94] rounded-full" />
              Equipe focada em tarefas de alto valor
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <div className="w-2 h-2 bg-[#00FF94] rounded-full" />
              Escalabilidade sem aumento de custos
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <div className="w-2 h-2 bg-[#00FF94] rounded-full" />
              Atendimento 24/7 sem hora extra
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <div className="w-2 h-2 bg-[#00FF94] rounded-full" />
              Qualidade consistente em todos os atendimentos
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-white/30 text-xs text-center">
          * Valores simulados. A economia real depende do volume de atendimentos
          e complexidade das operações.
        </p>
      </div>
    </ModalWrapper>
  );
}
