// ClonarTemplate.jsx
// Tela: Clonar/Editar Template de Competências | Épico 2: Templates de Competências | US2.2
// OBS: mockado, sem chamada de API. Recebe o template de origem via location.state
// (navegado a partir do CompetenciasLista.jsx). Ao salvar/cancelar, navega de volta.

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ---------------------------------------------------------------------------
// MOCK: competências padrão do "Template Padrão 360°"
// Usado como base quando não há template de origem definido (ex: "Criar novo").
// ---------------------------------------------------------------------------
const competenciasPadraoMock = [
  {
    id: 1,
    nome: "Comunicação",
    escala: "1 = Raramente se comunica com clareza · 5 = Referência em comunicação clara e assertiva.",
    adicionada: false,
  },
  {
    id: 2,
    nome: "Colaboração",
    escala: "1 = Trabalha isolado · 5 = Facilita ativamente o trabalho em equipe.",
    adicionada: false,
  },
  {
    id: 3,
    nome: "Qualidade Técnica",
    escala: "1 = Entrega com falhas recorrentes · 5 = Padrão de qualidade referência no time.",
    adicionada: true, // marcada como "Competência adicionada — específica deste ciclo"
  },
];

export default function ClonarTemplate() {
  const navigate = useNavigate();
  const location = useLocation();

  // Template de origem, se veio de "Clonar" ou "Editar".
  // Fica undefined quando o usuário veio de "Criar novo template".
  const template = location.state?.template;

  // ---------------------------------------------------------------------
  // ESTADOS
  // ---------------------------------------------------------------------
  const [nomeTemplate, setNomeTemplate] = useState(
    template
      ? `${template.nome} (clonado do Padrão)`
      : "Novo template (clonado do Padrão)"
  );

  const [competencias, setCompetencias] = useState(
    template?.competencias || competenciasPadraoMock
  );

  // ---------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------
  const handleEditarCompetencia = (id, campo, valor) => {
    setCompetencias((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [campo]: valor } : c))
    );
  };

  const handleRemoverCompetencia = (id) => {
    setCompetencias((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAdicionarCompetencia = () => {
    setCompetencias((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((c) => c.id)) + 1 : 1,
        nome: "",
        escala: "",
        adicionada: true,
      },
    ]);
  };

  // Cancela e volta pra lista, sem salvar nada
  const onCancelar = () => {
    navigate("/CompetenciasLista");
  };

  // Salva (mockado) e volta pra lista
  const handleSalvar = () => {
    const resultado = {
      nome: nomeTemplate,
      competencias,
      origemId: template?.id ?? null,
    };
    console.log("Template salvo:", resultado); // mockado — sem API ainda
    navigate("/CompetenciasLista");
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {/* BREADCRUMB + CABEÇALHO --------------------------------------------- */}
      <p className="text-xs text-gray-400 mb-2">Templates / Clonar template</p>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-semibold text-gray-900">
          Clonar Template Padrão 360°
        </h1>
        <div className="flex gap-3">
          <button
            onClick={onCancelar}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Salvar template
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-8">
        Ajuste as competências para este ciclo sem alterar o template global.
      </p>

      {/* LAYOUT: coluna principal (form) + coluna lateral (info) ----------- */}
      <div className="flex gap-8">
        {/* COLUNA PRINCIPAL ---------------------------------------------------- */}
        <div className="flex-1">
          <label className="block text-sm text-gray-700 mb-1">
            Nome do template
          </label>
          <input
            type="text"
            value={nomeTemplate}
            onChange={(e) => setNomeTemplate(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* LISTA DE COMPETÊNCIAS ------------------------------------------- */}
          <div className="flex flex-col gap-3">
            {competencias.map((comp) => (
              <div
                key={comp.id}
                className={`border rounded-md p-4 ${
                  comp.adicionada ? "border-blue-300" : "border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-gray-300 mt-1 cursor-grab">≡</span>

                  <div className="flex-1">
                    <input
                      type="text"
                      value={comp.nome}
                      onChange={(e) =>
                        handleEditarCompetencia(comp.id, "nome", e.target.value)
                      }
                      placeholder="Nome da competência"
                      className="w-full font-medium text-gray-800 text-sm border-none focus:outline-none mb-1"
                    />
                    <input
                      type="text"
                      value={comp.escala}
                      onChange={(e) =>
                        handleEditarCompetencia(comp.id, "escala", e.target.value)
                      }
                      placeholder="Ex.: 1 = ... · 5 = ..."
                      className="w-full text-xs text-gray-500 border-none focus:outline-none"
                    />
                    {comp.adicionada && (
                      <p className="text-xs text-blue-600 mt-2">
                        Competência adicionada — específica deste ciclo
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleRemoverCompetencia(comp.id)}
                    className="text-gray-300 hover:text-red-400"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleAdicionarCompetencia}
            className="w-full mt-4 border border-dashed border-gray-300 rounded-md py-2 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600"
          >
            + Adicionar competência
          </button>
        </div>

        {/* COLUNA LATERAL: informações fixas --------------------------------- */}
        <div className="w-72 flex flex-col gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-gray-800 mb-2">
              Sobre a escala 1–5
            </h3>
            <p className="text-xs text-gray-500">
              Cada competência recebe uma única nota de 1 a 5. Não há
              comentário individual por competência — o feedback textual fica
              restrito às duas perguntas abertas do fim do formulário, para
              reduzir a fadiga de preenchimento.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-gray-800 mb-2">
              Este template está sendo usado por
            </h3>
            <p className="text-xs text-gray-500">
              {template?.usadoEm ?? 1} ciclo(s):{" "}
              <a href="#" className="text-blue-600 hover:underline">
                {template?.nome ?? "Ciclo 2026.1 — Engenharia"} (draft)
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}