"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Slider } from "@heroui/react";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Calendar,
  ArrowRight,
} from "lucide-react";
import ModalWrapper from "./ModalWrapper";

interface ROICalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ROICalculatorModal({
  isOpen,
  onClose,
}: ROICalculatorModalProps) {
  const [leadsPerMonth, setLeadsPerMonth] = useState(3000);
  const [avgTicket, setAvgTicket] = useState(400);
  const [currentConversionRate, setCurrentConversionRate] = useState(15);

  const SETUP_COST = 25000;
  const MONTHLY_COST = 2500;
  const AI_CONVERSION_BOOST = 1.6; // 160% improvement

  const calculations = useMemo(() => {
    const newConversionRate = Math.min(
      currentConversionRate * AI_CONVERSION_BOOST,
      80
    );

    const currentMonthlyConsults = Math.round(
      (leadsPerMonth * currentConversionRate) / 100
    );
    const newMonthlyConsults = Math.round(
      (leadsPerMonth * newConversionRate) / 100
    );
    const additionalConsults = newMonthlyConsults - currentMonthlyConsults;

    const currentMonthlyRevenue = currentMonthlyConsults * avgTicket;
    const newMonthlyRevenue = newMonthlyConsults * avgTicket;
    const additionalRevenue = newMonthlyRevenue - currentMonthlyRevenue;

    const monthlyProfit = additionalRevenue - MONTHLY_COST;
    const annualProfit = monthlyProfit * 12 - SETUP_COST;

    const paybackMonths =
      monthlyProfit > 0 ? Math.ceil(SETUP_COST / monthlyProfit) : Infinity;

    const roi12Months =
      SETUP_COST + MONTHLY_COST * 12 > 0
        ? ((monthlyProfit * 12 - SETUP_COST) /
            (SETUP_COST + MONTHLY_COST * 12)) *
          100
        : 0;

    return {
      currentMonthlyConsults,
      newMonthlyConsults,
      additionalConsults,
      currentMonthlyRevenue,
      newMonthlyRevenue,
      additionalRevenue,
      monthlyProfit,
      annualProfit,
      paybackMonths,
      roi12Months,
      newConversionRate,
    };
  }, [leadsPerMonth, avgTicket, currentConversionRate]);

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
      title="Calculadora de ROI"
      subtitle="Simule o retorno do investimento em agentes de IA"
      size="4xl"
    >
      <div className="space-y-8">
        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <label className="text-white/70 text-sm block mb-4">
              Leads por mes
            </label>
            <Slider
              size="sm"
              step={100}
              minValue={500}
              maxValue={10000}
              value={leadsPerMonth}
              onChange={(val) => setLeadsPerMonth(val as number)}
              className="max-w-full"
              classNames={{
                track: "bg-white/20",
                filler: "bg-gradient-to-r from-[#00E5FF] to-[#00FF94]",
                thumb: "bg-white",
              }}
            />
            <p className="text-2xl font-bold text-[#00E5FF] mt-3">
              {leadsPerMonth.toLocaleString()}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <label className="text-white/70 text-sm block mb-4">
              Ticket medio (R$)
            </label>
            <Slider
              size="sm"
              step={50}
              minValue={100}
              maxValue={1000}
              value={avgTicket}
              onChange={(val) => setAvgTicket(val as number)}
              className="max-w-full"
              classNames={{
                track: "bg-white/20",
                filler: "bg-gradient-to-r from-[#00E5FF] to-[#00FF94]",
                thumb: "bg-white",
              }}
            />
            <p className="text-2xl font-bold text-[#00E5FF] mt-3">
              {formatCurrency(avgTicket)}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <label className="text-white/70 text-sm block mb-4">
              Conversao atual (%)
            </label>
            <Slider
              size="sm"
              step={1}
              minValue={5}
              maxValue={40}
              value={currentConversionRate}
              onChange={(val) => setCurrentConversionRate(val as number)}
              className="max-w-full"
              classNames={{
                track: "bg-white/20",
                filler: "bg-gradient-to-r from-[#00E5FF] to-[#00FF94]",
                thumb: "bg-white",
              }}
            />
            <p className="text-2xl font-bold text-[#00E5FF] mt-3">
              {currentConversionRate}%
            </p>
          </div>
        </div>

        {/* Conversion Comparison */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#00FF94]" />
            Projecao de Melhoria
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-white/50 text-sm mb-2">Antes (atual)</p>
              <p className="text-3xl font-bold text-white/70">
                {currentConversionRate}%
              </p>
              <p className="text-white/40 text-sm mt-1">
                {calculations.currentMonthlyConsults} consultas/mes
              </p>
            </div>
            <div className="flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-[#00FF94]" />
            </div>
            <div className="text-center">
              <p className="text-white/50 text-sm mb-2">Depois (com IA)</p>
              <p className="text-3xl font-bold text-[#00FF94]">
                {calculations.newConversionRate.toFixed(0)}%
              </p>
              <p className="text-[#00FF94] text-sm mt-1">
                {calculations.newMonthlyConsults} consultas/mes
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <p className="text-white/70">
              <span className="text-[#00FF94] font-bold text-xl">
                +{calculations.additionalConsults}
              </span>{" "}
              consultas adicionais por mes
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            className="bg-gradient-to-br from-[#00E5FF]/20 to-transparent border border-[#00E5FF]/30 rounded-xl p-5 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <DollarSign className="w-6 h-6 text-[#00E5FF] mx-auto mb-2" />
            <p className="text-white/50 text-xs mb-1">Receita Adicional/Mes</p>
            <p className="text-2xl font-bold text-[#00E5FF]">
              {formatCurrency(calculations.additionalRevenue)}
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-[#00FF94]/20 to-transparent border border-[#00FF94]/30 rounded-xl p-5 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TrendingUp className="w-6 h-6 text-[#00FF94] mx-auto mb-2" />
            <p className="text-white/50 text-xs mb-1">Lucro Liquido/Mes</p>
            <p className="text-2xl font-bold text-[#00FF94]">
              {formatCurrency(calculations.monthlyProfit)}
            </p>
            <p className="text-white/30 text-xs">
              (ja descontando R$ 2.5k/mes)
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-[#FFD700]/20 to-transparent border border-[#FFD700]/30 rounded-xl p-5 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Calendar className="w-6 h-6 text-[#FFD700] mx-auto mb-2" />
            <p className="text-white/50 text-xs mb-1">Payback</p>
            <p className="text-2xl font-bold text-[#FFD700]">
              {calculations.paybackMonths === Infinity
                ? "-"
                : `${calculations.paybackMonths} meses`}
            </p>
            <p className="text-white/30 text-xs">(setup R$ 25k)</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-[#00FF94]/20 to-transparent border border-[#00FF94]/30 rounded-xl p-5 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Calculator className="w-6 h-6 text-[#00FF94] mx-auto mb-2" />
            <p className="text-white/50 text-xs mb-1">ROI em 12 meses</p>
            <p className="text-2xl font-bold text-[#00FF94]">
              {calculations.roi12Months > 0
                ? `+${calculations.roi12Months.toFixed(0)}%`
                : "-"}
            </p>
            <p className="text-white/30 text-xs">
              {formatCurrency(calculations.annualProfit)} lucro
            </p>
          </motion.div>
        </div>

        {/* Investment Summary */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h4 className="text-white font-semibold mb-3">
            Resumo do Investimento
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-white/50">Setup (unico)</span>
              <span className="text-white">{formatCurrency(SETUP_COST)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Mensalidade</span>
              <span className="text-white">{formatCurrency(MONTHLY_COST)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Custo 1o ano</span>
              <span className="text-white">
                {formatCurrency(SETUP_COST + MONTHLY_COST * 12)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Receita adicional 1o ano</span>
              <span className="text-[#00FF94]">
                {formatCurrency(calculations.additionalRevenue * 12)}
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-white/30 text-xs text-center">
          * Valores projetados com base em benchmarks de mercado. Resultados
          reais podem variar de acordo com a operacao.
        </p>
      </div>
    </ModalWrapper>
  );
}
