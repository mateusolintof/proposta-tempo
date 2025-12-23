"use client";

import { useState } from "react";

interface Contact {
  id: number;
  name: string;
  segment: string;
  stage: string;
  channel: string;
  tags: string[];
  score: number;
}

const contacts: Contact[] = [
  { id: 1, name: "Marina Duarte", segment: "Reposição mensal", stage: "Qualificado", channel: "WhatsApp", tags: ["Recorrente", "PJ"], score: 88 },
  { id: 2, name: "Rafaela Souza", segment: "Cotação atacado", stage: "Proposta", channel: "Instagram", tags: ["Orçamento", "PJ"], score: 74 },
  { id: 3, name: "Helio Lima", segment: "Primeira compra", stage: "Sem resposta", channel: "Google", tags: ["Follow-up"], score: 54 },
  { id: 4, name: "Isadora Pinto", segment: "Pedido recorrente", stage: "Pedido", channel: "WhatsApp", tags: ["Alta prioridade", "Pagamento"], score: 91 },
  { id: 5, name: "Paulo Cesar", segment: "Reativação", stage: "Qualificação", channel: "Indicação", tags: ["Retomada"], score: 79 },
];

const filters = ["Todos", "Qualificados", "Alta prioridade", "Pedidos", "Sem resposta"];

export default function CRMContactsView() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);

  const filteredContacts = activeFilter === "Todos"
    ? contacts
    : contacts.filter((c) => {
        if (activeFilter === "Qualificados") return c.stage === "Qualificado";
        if (activeFilter === "Alta prioridade") return c.tags.includes("Alta prioridade");
        if (activeFilter === "Pedidos") return c.stage === "Pedido";
        if (activeFilter === "Sem resposta") return c.stage === "Sem resposta";
        return true;
      });

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Gestão de contatos</h3>
            <p className="text-sm text-gray-500">Leads qualificados com tags e segmentação inteligente</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
                activeFilter === filter
                  ? "bg-[#1a3a4a] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Table */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[10px] font-semibold tracking-wider text-gray-400 uppercase px-4 py-3">Lead</th>
                  <th className="text-left text-[10px] font-semibold tracking-wider text-gray-400 uppercase px-4 py-3">Etapa</th>
                  <th className="text-left text-[10px] font-semibold tracking-wider text-gray-400 uppercase px-4 py-3">Canal</th>
                  <th className="text-left text-[10px] font-semibold tracking-wider text-gray-400 uppercase px-4 py-3">Tags</th>
                  <th className="text-left text-[10px] font-semibold tracking-wider text-gray-400 uppercase px-4 py-3">Score</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`border-b border-gray-50 cursor-pointer transition-colors ${
                      selectedContact.id === contact.id
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{contact.name}</p>
                        <p className="text-xs text-gray-500">{contact.segment}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        contact.stage === "Qualificado" ? "bg-green-100 text-green-700" :
                        contact.stage === "Proposta" ? "bg-blue-100 text-blue-700" :
                        contact.stage === "Pedido" ? "bg-purple-100 text-purple-700" :
                        contact.stage === "Sem resposta" ? "bg-gray-100 text-gray-600" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {contact.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{contact.channel}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] bg-gray-100 text-gray-600 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              contact.score >= 80 ? "bg-green-500" :
                              contact.score >= 60 ? "bg-yellow-500" :
                              "bg-red-500"
                            }`}
                            style={{ width: `${contact.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{contact.score}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar - Contact Summary */}
        <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Resumo do contato</h3>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-1">
                Responsável
              </p>
              <p className="text-sm text-gray-900">IA SDR</p>
            </div>

            <div>
              <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-1">
                Última interação
              </p>
              <p className="text-sm text-gray-900">Hoje 10:12</p>
            </div>

            <div>
              <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-1">
                Prioridade IA
              </p>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  selectedContact.score >= 80
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {selectedContact.score >= 80 ? "Temperatura quente" : "Temperatura morna"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Score {selectedContact.score} com alto potencial
              </p>
            </div>

            <div>
              <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-1">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedContact.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Acionamentos automáticos baseados em score e etapa do funil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
