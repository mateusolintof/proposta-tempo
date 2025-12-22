"use client";

import { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";

interface Deal {
  id: number;
  name: string;
  value: number;
  tags: string[];
  origin?: string;
  status?: string;
}

interface Column {
  id: string;
  title: string;
  deals: Deal[];
}

type PipelineTab = "ia" | "humano" | "followup";

const pipelineData: Record<PipelineTab, Column[]> = {
  ia: [
    {
      id: "novo",
      title: "Novo",
      deals: [
        { id: 1, name: "Maria S.", value: 4200, tags: ["Ortopedia"], origin: "WhatsApp" },
        { id: 2, name: "Jose Sa...", value: 1800, tags: ["Consulta"], origin: "Instagram" },
      ],
    },
    {
      id: "triagem",
      title: "Triagem IA",
      deals: [
        { id: 3, name: "Carla Men...", value: 780, tags: ["Avaliacao"], status: "Primeiro passo" },
        { id: 4, name: "Pedro C...", value: 9200, tags: ["Cirurgia"], status: "Primeiro passo" },
      ],
    },
    {
      id: "qualificado",
      title: "Qualificado",
      deals: [
        { id: 5, name: "Camila R...", value: 1400, tags: ["LCA"], status: "Primeiro passo" },
        { id: 6, name: "Juliana...", value: 5800, tags: ["Artroscopia"], status: "Primeiro passo" },
      ],
    },
    {
      id: "agendamento",
      title: "Agendamento",
      deals: [
        { id: 7, name: "Lucas Vit...", value: 680, tags: ["Consulta"], status: "Confirmado" },
      ],
    },
  ],
  humano: [
    {
      id: "novo",
      title: "Novo",
      deals: [
        { id: 8, name: "Roberto F.", value: 3200, tags: ["Complexo"], origin: "Indicacao" },
      ],
    },
    {
      id: "negociacao",
      title: "Negociação",
      deals: [
        { id: 9, name: "Ana Paula", value: 12000, tags: ["Cirurgia"], status: "Em análise" },
      ],
    },
    {
      id: "proposta",
      title: "Proposta",
      deals: [
        { id: 10, name: "Marcos A.", value: 8500, tags: ["Particular"], status: "Aguardando" },
      ],
    },
    {
      id: "fechamento",
      title: "Fechamento",
      deals: [],
    },
  ],
  followup: [
    {
      id: "pendente",
      title: "Pendente",
      deals: [
        { id: 11, name: "Fernanda L.", value: 2100, tags: ["Retorno"], status: "3 dias" },
        { id: 12, name: "Carlos E.", value: 950, tags: ["Reagendar"], status: "7 dias" },
      ],
    },
    {
      id: "emandamento",
      title: "Em andamento",
      deals: [
        { id: 13, name: "Patricia M.", value: 1800, tags: ["Confirmacao"], status: "Hoje" },
      ],
    },
    {
      id: "concluido",
      title: "Concluído",
      deals: [
        { id: 14, name: "Eduardo S.", value: 4500, tags: ["Convertido"] },
      ],
    },
  ],
};

const tabLabels: Record<PipelineTab, string> = {
  ia: "Atendimento IA",
  humano: "Atendimento humano",
  followup: "Follow-up",
};

export default function CRMPipelineView() {
  const [activeTab, setActiveTab] = useState<PipelineTab>("ia");

  const columns = pipelineData[activeTab];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Header with Tabs */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-6">
          {(Object.keys(tabLabels) as PipelineTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-[#1a3a4a] text-[#1a3a4a]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-4 h-full min-w-max">
          {columns.map((column) => (
            <div
              key={column.id}
              className="w-72 flex-shrink-0 flex flex-col bg-gray-100 rounded-xl"
            >
              {/* Column Header */}
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{column.title}</h4>
                  <span className="px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded-full">
                    {column.deals.length}
                  </span>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Cards */}
              <div className="flex-1 px-3 pb-3 space-y-2 overflow-y-auto">
                {column.deals.map((deal) => (
                  <div
                    key={deal.id}
                    className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm hover:shadow transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-gray-900 text-sm">{deal.name}</p>
                      <p className="text-sm font-semibold text-[#1a3a4a]">
                        {formatCurrency(deal.value)}
                      </p>
                    </div>
                    {deal.origin && (
                      <p className="text-xs text-gray-500 mb-2">
                        Origem: {deal.origin}
                      </p>
                    )}
                    {deal.status && (
                      <p className="text-xs text-gray-500 mb-2">{deal.status}</p>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {deal.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] bg-blue-50 text-blue-700 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Deal Button */}
              <div className="px-3 pb-3">
                <button className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg flex items-center justify-center gap-1 transition-colors">
                  <Plus className="w-4 h-4" />
                  Adicionar deal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
