"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  LayoutDashboard,
  Inbox,
  GitBranch,
  Users,
  Building2,
  Zap,
  Calendar,
  FileText,
  ChevronDown,
  Clock,
  Settings,
  Sparkles,
} from "lucide-react";
import ModalWrapper from "./ModalWrapper";

interface CRMPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Chart data
const volumeData = [
  { day: "Seg", leads: 180, agendamentos: 95 },
  { day: "Ter", leads: 220, agendamentos: 120 },
  { day: "Qua", leads: 280, agendamentos: 150 },
  { day: "Qui", leads: 260, agendamentos: 140 },
  { day: "Sex", leads: 240, agendamentos: 130 },
  { day: "Sab", leads: 160, agendamentos: 80 },
];

const origemData = [
  { name: "WhatsApp", value: 42, color: "#1a4a5e" },
  { name: "Instagram", value: 26, color: "#3b82a0" },
  { name: "Google", value: 20, color: "#5ba3c0" },
  { name: "Indicação", value: 12, color: "#8ec5d9" },
];

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Inbox, label: "Inbox", active: false },
  {
    icon: GitBranch,
    label: "Pipeline",
    active: false,
    expanded: true,
    children: ["Atendimento IA", "Atendimento humano", "Follow-up"],
  },
];

const managementItems = [
  { icon: Users, label: "Contacts", active: false },
  { icon: Building2, label: "Companies", active: false },
  { icon: Zap, label: "Activities", active: false },
  { icon: Calendar, label: "Calendar", active: false },
  { icon: FileText, label: "Reports", active: false },
];

const kpis = [
  { label: "CONVERSAS ATIVAS", value: "284", subtitle: "Inbox unificado" },
  { label: "AGENDAMENTOS ATIVOS", value: "126", subtitle: "Próximos 7 dias" },
  { label: "DEALS EM NEGOCIAÇÃO", value: "412", subtitle: "Pipelines" },
  { label: "RECEITA EM PIPELINE", value: "R$ 1,9M", subtitle: "Prox. 30 dias" },
];

export default function CRMPreviewModal({
  isOpen,
  onClose,
}: CRMPreviewModalProps) {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="CRM Integrado"
      subtitle=""
    >
      <div className="h-full flex flex-col -mx-8 -mt-2">
        {/* Header with subtitle and filters */}
        <div className="px-8 pb-4 border-b border-gray-200 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                CRM Comercial
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mt-1">
                Central única de atendimento e vendas
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Pipelines múltiplos, inbox unificado e analytics em tempo real
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50">
                <Clock className="w-4 h-4" />
                Últimos 30 dias
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50">
                <Settings className="w-4 h-4" />
                Segmento: ortopedia
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-[#1a3a4a] bg-[#e8f4f8] border border-[#c5e4ed] rounded-full">
                <Sparkles className="w-4 h-4" />
                IA ativa e treinada
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
                <p className="text-white text-sm font-medium">CRM Comercial</p>
                <p className="text-gray-400 text-xs">Menu principal</p>
              </div>
            </div>

            {/* Main Menu */}
            <div className="px-3 mt-2">
              <p className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase px-3 mb-2">
                Main
              </p>
              {menuItems.map((item) => (
                <div key={item.label}>
                  <div
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-default ${
                      item.active
                        ? "bg-[#2a4a5a] text-white"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm flex-1">{item.label}</span>
                    {item.children && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          item.expanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                  {item.children && item.expanded && (
                    <div className="ml-7 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <p
                          key={child}
                          className="text-sm text-gray-500 py-1.5 cursor-default"
                        >
                          {child}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Management Menu */}
            <div className="px-3 mt-6">
              <p className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase px-3 mb-2">
                Management
              </p>
              {managementItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 cursor-default hover:text-gray-300"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-gray-50 overflow-y-auto p-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="bg-white rounded-xl p-4 border border-gray-100"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                      {kpi.label}
                    </p>
                    <div className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {kpi.value}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{kpi.subtitle}</p>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-5 gap-4">
              {/* Area Chart */}
              <div className="col-span-3 bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-gray-900">
                    Volume de leads e agendamentos
                  </h3>
                  <span className="text-xs text-gray-400">Última semana</span>
                </div>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={volumeData}>
                      <defs>
                        <linearGradient
                          id="colorLeads"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3b82a0"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3b82a0"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9ca3af", fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9ca3af", fontSize: 12 }}
                        domain={[0, 320]}
                        ticks={[0, 80, 160, 240, 320]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1a2a3a",
                          border: "none",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="leads"
                        stroke="#3b82a0"
                        strokeWidth={2}
                        fill="url(#colorLeads)"
                      />
                      <Area
                        type="monotone"
                        dataKey="agendamentos"
                        stroke="#1a4a5e"
                        strokeWidth={2}
                        fill="transparent"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Donut Chart */}
              <div className="col-span-2 bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Origem dos leads
                </h3>
                <div className="h-[180px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={origemData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {origemData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1a2a3a",
                          border: "none",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                        formatter={(value: number) => [`${value}%`, ""]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Legend */}
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {origemData.map((item) => (
                    <span
                      key={item.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-full text-xs text-gray-600"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.name} {item.value}%
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
