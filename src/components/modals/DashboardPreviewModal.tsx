"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Bot,
  Users,
  UserCheck,
  Lightbulb,
} from "lucide-react";
import ModalWrapper from "./ModalWrapper";

// Views
import DashVisaoGeralView from "./dashboard/DashVisaoGeralView";
import DashGestaoIAView from "./dashboard/DashGestaoIAView";
import DashClientesView from "./dashboard/DashClientesView";
import DashInsightsView from "./dashboard/DashInsightsView";

interface DashboardPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewType = "visaogeral" | "gestao" | "vendedores" | "clientes" | "insights";

export default function DashboardPreviewModal({
  isOpen,
  onClose,
}: DashboardPreviewModalProps) {
  const [activeView, setActiveView] = useState<ViewType>("visaogeral");

  const menuItems = [
    { id: "visaogeral" as ViewType, icon: LayoutDashboard, label: "Visão geral" },
    { id: "gestao" as ViewType, icon: Bot, label: "Gestão IA" },
    { id: "vendedores" as ViewType, icon: Users, label: "Atendimento vendedores", disabled: true },
    { id: "clientes" as ViewType, icon: UserCheck, label: "Clientes" },
    { id: "insights" as ViewType, icon: Lightbulb, label: "Insights + reports" },
  ];

  const renderView = () => {
    switch (activeView) {
      case "visaogeral":
        return <DashVisaoGeralView />;
      case "gestao":
        return <DashGestaoIAView />;
      case "clientes":
        return <DashClientesView />;
      case "insights":
        return <DashInsightsView />;
      default:
        return <DashVisaoGeralView />;
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Painel Executivo"
      subtitle=""
    >
      <div className="h-full flex flex-col -mx-8 -mt-2">
        {/* Header with subtitle and filters */}
        <div className="px-8 pb-4 border-b border-gray-200 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                Dashboard Executivo
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mt-1">
                Visão completa do atendimento comercial
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                KPIs, funis e insights com suporte de IA
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 px-4 py-1.5 text-sm text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50">
                Últimos 7 dias
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-1.5 text-sm text-white bg-[#1a3a4a] rounded-full">
                Últimos 30 dias
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-1.5 text-sm text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50">
                Últimos 90 dias
              </button>
            </div>
          </div>
        </div>

        {/* Main content with sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-56 bg-[#1a2a3a] flex-shrink-0 overflow-y-auto">
            {/* Logo/Brand */}
            <div className="px-4 py-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2a4a5a] flex items-center justify-center text-white text-xs font-bold">
                AI
              </div>
              <div>
                <p className="text-white text-sm font-medium">Dashboard</p>
                <p className="text-gray-400 text-xs">Menu principal</p>
              </div>
            </div>

            {/* Main Menu */}
            <div className="px-3 mt-2">
              <p className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase px-3 mb-2">
                Main
              </p>
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => !item.disabled && setActiveView(item.id)}
                  disabled={item.disabled}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                    item.disabled
                      ? "text-gray-600 cursor-not-allowed"
                      : activeView === item.id
                      ? "bg-[#2a4a5a] text-white"
                      : "text-gray-400 hover:text-gray-300 hover:bg-[#2a4a5a]/50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Demo notice */}
            <div className="px-3 mt-8">
              <div className="bg-[#2a4a5a]/50 rounded-lg p-3">
                <p className="text-gray-400 text-xs">
                  Dados anonimizados para demo comercial.
                </p>
              </div>
            </div>
          </div>

          {/* Content Area with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex overflow-hidden"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ModalWrapper>
  );
}
