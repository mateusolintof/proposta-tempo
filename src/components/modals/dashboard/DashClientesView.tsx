"use client";

import { useState } from "react";
import { Flame, TrendingUp, AlertTriangle, ArrowRight } from "lucide-react";

interface Cliente {
  id: number;
  name: string;
  segment: string;
  stage: string;
  channel: string;
  score: number;
  ticket: number;
}

const clientes: Cliente[] = [
  { id: 1, name: "Marina Duarte", segment: "Reposição mensal", stage: "Qualificado", channel: "WhatsApp", score: 88, ticket: 4200 },
  { id: 2, name: "Rafaela Souza", segment: "Cotação atacado", stage: "Proposta", channel: "Instagram", score: 74, ticket: 1800 },
  { id: 3, name: "Helio Lima", segment: "Primeira compra", stage: "Sem resposta", channel: "Google", score: 54, ticket: 780 },
  { id: 4, name: "Isadora Pinto", segment: "Pedido recorrente", stage: "Pedido", channel: "WhatsApp", score: 91, ticket: 9200 },
  { id: 5, name: "Paulo Cesar", segment: "Reativação", stage: "Qualificação", channel: "Indicação", score: 79, ticket: 5800 },
  { id: 6, name: "Camila Rodrigues", segment: "Recorrente", stage: "Qualificado", channel: "Instagram", score: 82, ticket: 3500 },
];

const getAnaliseIA = (cliente: Cliente) => {
  const temperatura = cliente.score >= 80 ? "Quente" : cliente.score >= 60 ? "Morna" : "Fria";
  const sinais = cliente.score >= 80
    ? ["Engajamento alto", "Resposta rápida", "Interesse confirmado"]
    : cliente.score >= 60
    ? ["Interesse moderado", "Necessita follow-up"]
    : ["Baixo engajamento", "Necessita reativação"];

  const riscos = cliente.stage === "Sem resposta"
    ? ["Risco de perda", "Sem interação recente"]
    : cliente.score < 70
    ? ["Ticket baixo", "Conversão incerta"]
    : [];

  const proximaAcao = cliente.stage === "Sem resposta"
    ? "Enviar mensagem de reativação"
    : cliente.stage === "Qualificado"
    ? "Enviar orçamento"
    : cliente.stage === "Proposta"
    ? "Enviar proposta comercial"
    : "Confirmar pedido";

  return { temperatura, sinais, riscos, proximaAcao };
};

export default function DashClientesView() {
  const [selectedCliente, setSelectedCliente] = useState<Cliente>(clientes[0]);

  const analise = getAnaliseIA(selectedCliente);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Base de clientes qualificados</h3>
        <p className="text-sm text-gray-500">Leads com maior potencial de conversão identificados pela IA</p>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Table */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[10px] font-semibold tracking-wider text-gray-400 uppercase px-4 py-3">Cliente</th>
                  <th className="text-left text-[10px] font-semibold tracking-wider text-gray-400 uppercase px-4 py-3">Etapa</th>
                  <th className="text-left text-[10px] font-semibold tracking-wider text-gray-400 uppercase px-4 py-3">Canal</th>
                  <th className="text-left text-[10px] font-semibold tracking-wider text-gray-400 uppercase px-4 py-3">Score</th>
                  <th className="text-left text-[10px] font-semibold tracking-wider text-gray-400 uppercase px-4 py-3">Ticket</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr
                    key={cliente.id}
                    onClick={() => setSelectedCliente(cliente)}
                    className={`border-b border-gray-50 cursor-pointer transition-colors ${
                      selectedCliente.id === cliente.id
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{cliente.name}</p>
                        <p className="text-xs text-gray-500">{cliente.segment}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        cliente.stage === "Qualificado" ? "bg-green-100 text-green-700" :
                        cliente.stage === "Proposta" ? "bg-blue-100 text-blue-700" :
                        cliente.stage === "Pedido" ? "bg-purple-100 text-purple-700" :
                        cliente.stage === "Sem resposta" ? "bg-gray-100 text-gray-600" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {cliente.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{cliente.channel}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              cliente.score >= 80 ? "bg-green-500" :
                              cliente.score >= 60 ? "bg-yellow-500" :
                              "bg-red-500"
                            }`}
                            style={{ width: `${cliente.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{cliente.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-[#1a3a4a]">
                        {formatCurrency(cliente.ticket)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar - Análise IA */}
        <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Análise IA do cliente</h3>
            <p className="text-xs text-gray-500 mt-0.5">{selectedCliente.name}</p>
          </div>
          <div className="p-4 space-y-4">
            {/* Temperatura */}
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-2">
                Temperatura
              </p>
              <div className="flex items-center gap-2">
                <Flame className={`w-4 h-4 ${
                  analise.temperatura === "Quente" ? "text-red-500" :
                  analise.temperatura === "Morna" ? "text-yellow-500" :
                  "text-blue-500"
                }`} />
                <span className={`px-2 py-1 text-xs rounded-full ${
                  analise.temperatura === "Quente" ? "bg-red-100 text-red-700" :
                  analise.temperatura === "Morna" ? "bg-yellow-100 text-yellow-700" :
                  "bg-blue-100 text-blue-700"
                }`}>
                  {analise.temperatura}
                </span>
              </div>
            </div>

            {/* Sinais Positivos */}
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-2">
                Sinais positivos
              </p>
              <div className="space-y-1.5">
                {analise.sinais.map((sinal) => (
                  <div key={sinal} className="flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-gray-700">{sinal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Riscos */}
            {analise.riscos.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-2">
                  Riscos identificados
                </p>
                <div className="space-y-1.5">
                  {analise.riscos.map((risco) => (
                    <div key={risco} className="flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      <span className="text-xs text-gray-700">{risco}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Próxima Ação */}
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-2">
                Próxima ação recomendada
              </p>
              <div className="bg-[#e8f4f8] border border-[#c5e4ed] rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-[#1a3a4a]" />
                  <span className="text-sm text-[#1a3a4a] font-medium">{analise.proximaAcao}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-2">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                  {selectedCliente.segment}
                </span>
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                  {selectedCliente.channel}
                </span>
                {selectedCliente.score >= 80 && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                    Alta prioridade
                  </span>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Análise gerada automaticamente com base no comportamento e histórico do lead.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
