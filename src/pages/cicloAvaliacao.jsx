import React, { useState } from "react";
import CicloModal from "./cicloModal";

const ciclosMock = [
  {
    id: 1,
    nome: "Ciclo 2026.2 — Semestral",
    template: "Template Padrão 360°",
    periodo: "a definir",
    status: "rascunho",
    progresso: null, // sem progresso ainda, ciclo nem foi gerado
  },
  {
    id: 2,
    nome: "Ciclo 2026.1 — Engenharia",
    template: "Ciclo 2026.1 — Engenharia (clonado)",
    periodo: "01 jun – 30 jun 2026",
    status: "aberto",
    progresso: 62, //62% do progresso concluido
  },
  {
    id: 3,
    nome: "Ciclo 2025.4 — Anual",
    template: "Template Padrão 360°",
    periodo: "01 nov – 15 dez 2025",
    status: "encerrado",
    progresso: 100, //100% do progresso concluido
  },
  {
    id: 4,
    nome: "Ciclo 2025.3 — Comercial",
    template: "Template Padrão 360°",
    periodo: "01 ago – 30 ago 2025",
    status: "encerrado",
    progresso: 100,
  },
  {
    id: 5,
    nome: "Ciclo 2025.2 — Semestral",
    template: "Template Padrão 360°",
    periodo: "01 jun – 30 jun 2025",
    status: "encerrado",
    progresso: 100,
  },
];

// Config visual de cada status (cor da bolinha + texto do badge)
const statusConfig = {
  rascunho: { label: "Rascunho", dot: "bg-green-500", text: "text-green-500" },
  aberto: { label: "Aberto", dot: "bg-blue-500", text: "text-blue-600" },
  encerrado: { label: "Encerrado", dot: "bg-gray-300", text: "text-gray-400" },
};

export default function CicloAvaliacao() {
  // -------------------------------------------------------------------------
  // ESTADOS LOCAIS
  // -------------------------------------------------------------------------
  const [ciclos, setCiclos] = useState(ciclosMock);
  const [tabAtiva, setTabAtiva] = useState("todos"); // todos | rascunho | aberto | encerrado
  const [modalAberto, setModalAberto] = useState(false);


  //contagem de ciclos por status
  const contagem = {
    todos: ciclos.length,
    rascunho: ciclos.filter((c) => c.status === "rascunho").length,
    aberto: ciclos.filter((c) => c.status === "aberto").length,
    encerrado: ciclos.filter((c) => c.status === "encerrado").length,
  };

  // Lista filtrada de acordo com a tab selecionada
  const ciclosFiltrados =
    tabAtiva === "todos" ? ciclos : ciclos.filter((c) => c.status === tabAtiva);

  // -------------------------------------------------------------------------
  // HANDLER: recebe o novo ciclo criado no modal e adiciona na lista
  // (simula o "aparecer como rascunho" mostrado no protótipo)
  // -------------------------------------------------------------------------
  const handleCriarCiclo = (novoCiclo) => {
    setCiclos((prev) => [
      {
        id: prev.length + 1,
        nome: novoCiclo.nome,
        template: novoCiclo.template,
        periodo: "a definir",
        status: "rascunho",
        progresso: null,
      },
      ...prev,
    ]);
    setModalAberto(false);
  };

  //começo da parte visual
  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-semibold text-gray-900">
          Ciclos de Avaliação
        </h1>
        <button
          onClick={() => setModalAberto(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md"
        >
          + Novo ciclo
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Ciclo de vida completo: criação, geração de atribuições, execução e
        encerramento.
      </p>

      {/* leitura de filtragem dos ciclos */}
      <div className="flex gap-2 mb-6">
        {["todos", "rascunho", "aberto", "encerrado"].map((tab) => (
          <button
            key={tab}
            onClick={() => setTabAtiva(tab)}
            className={`px-4 py-2 rounded-md text-sm border ${
              tabAtiva === tab
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-gray-200 text-gray-600"
            }`}
          >
            {tab === "todos"
              ? `Todos (${contagem.todos})`
              : `${statusConfig[tab].label} (${contagem[tab]})`}
          </button>
        ))}
      </div>

      {/* tabela dos ciclos */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-200">
            <th className="py-2 font-normal">Ciclo</th>
            <th className="font-normal">Template</th>
            <th className="font-normal">Período</th>
            <th className="font-normal">Status</th>
            <th className="font-normal">Progresso</th>
            <th className="font-normal text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {ciclosFiltrados.map((ciclo) => {
            const cfg = statusConfig[ciclo.status];
            return (
              <tr key={ciclo.id} className="border-b border-gray-100">
                <td className="py-3 font-medium text-gray-800">
                  {ciclo.nome}
                </td>
                <td className="text-gray-600">{ciclo.template}</td>
                <td className="text-gray-600">{ciclo.periodo}</td>
                <td>
                  <span className={`flex items-center gap-2 ${cfg.text}`}>
                    <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </span>
                </td>
                <td>
                  {ciclo.progresso === null ? (
                    <span className="text-gray-400">—</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${ciclo.progresso}%` }}
                        />
                      </div>
                      <span className="text-gray-500 text-xs">
                        {ciclo.progresso}%
                      </span>
                    </div>
                  )}
                </td>
                <td className="text-right">
                  {/* Ação muda de acordo com o status, igual no protótipo:
                      rascunho -> Configurar | aberto -> Ver progresso | encerrado -> Ver resultados */}
                  <a href="#" className="text-blue-600 hover:underline">
                    {ciclo.status === "rascunho"
                      ? "Configurar"
                      : ciclo.status === "aberto"
                      ? "Ver progresso"
                      : "Ver resultados"}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* MODAL: só renderiza quando modalAberto = true --------------------- */}
      {modalAberto && (
        <CicloModal
          onClose={() => setModalAberto(false)}
          onCriar={handleCriarCiclo}
        />
      )}
    </div>
  );
}