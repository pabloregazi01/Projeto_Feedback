// CompetenciasLista.jsx
// Tela: Lista de Templates de Competências | Épico 2: Templates de Competências | US2.1
// OBS: mockado, sem chamada de API. Navegação para ClonarTemplate.jsx via rota
// (/CompetenciasLista/ClonarTemplate), passando o template escolhido por location.state.

import React from "react";
import { useNavigate } from "react-router-dom";

// ---------------------------------------------------------------------------
// MOCK DE DADOS
// Representa a resposta que viria da API (GET /templates-competencias).
// Reflete os 2 templates existentes na imagem 7: o Padrão + 1 clonado.
// ---------------------------------------------------------------------------
const templatesMock = [
  {
    id: 1,
    nome: "Template Padrão 360°",
    descricao:
      "8 competências — Comunicação, Colaboração, Execução, Liderança e outras.",
    tipo: "padrao", // não pode ser editado direto, só clonado
    usadoEm: 4,
  },
  {
    id: 2,
    nome: "Ciclo 2026.1 — Engenharia",
    descricao: "Clonado do padrão, com 2 competências técnicas adicionadas.",
    tipo: "clonado", // pode ser editado
    usadoEm: 1,
  },
];

export default function CompetenciasLista() {
  const navigate = useNavigate();

  // ---------------------------------------------------------------------
  // HANDLERS DE NAVEGAÇÃO
  // Levam o template escolhido via state da rota — quem lê isso do outro
  // lado é o ClonarTemplate.jsx, com useLocation().state?.template.
  // ---------------------------------------------------------------------
  const handleClonar = (tpl) => {
    navigate("/CompetenciasLista/ClonarTemplate", { state: { template: tpl } });
  };

  const handleEditar = (tpl) => {
    navigate("/CompetenciasLista/ClonarTemplate", { state: { template: tpl } });
  };

  const handleCriarNovo = () => {
    // sem template de origem — ClonarTemplate.jsx trata esse caso como "em branco"
    navigate("/CompetenciasLista/ClonarTemplate");
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* CABEÇALHO ---------------------------------------------------------- */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-semibold text-gray-900">
          Templates de Competências
        </h1>
        <button
          onClick={handleCriarNovo}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md"
        >
          + Novo template
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-8">
        Conjuntos de competências avaliadas na escala 1–5. Clone o template
        padrão para adaptar a um ciclo específico.
      </p>

      {/* GRID DE CARDS -------------------------------------------------------
          3 colunas no protótipo: templates existentes + card de "criar novo" */}
      <div className="grid grid-cols-3 gap-4">
        {templatesMock.map((tpl) => (
          <div
            key={tpl.id}
            className="border border-gray-200 rounded-lg p-5 flex flex-col justify-between"
          >
            <div>
              {/* Ícone + badge "Padrão" (só aparece no template padrão) */}
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center">
                  {tpl.tipo === "padrao" ? (
                    <span className="text-blue-500 text-sm">⚙</span>
                  ) : (
                    <span className="text-gray-400 text-sm">📄</span>
                  )}
                </div>
                {tpl.tipo === "padrao" && (
                  <span className="text-xs font-medium text-blue-600">
                    Padrão
                  </span>
                )}
              </div>

              <h3 className="font-medium text-gray-800 mb-1">{tpl.nome}</h3>
              <p className="text-xs text-gray-500 mb-4">{tpl.descricao}</p>
            </div>

            {/* RODAPÉ DO CARD: uso + ação --------------------------------- */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Usado em {tpl.usadoEm} ciclos</span>
              {tpl.tipo === "padrao" ? (
                <button
                  onClick={() => handleClonar(tpl)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Clonar
                </button>
              ) : (
                <button
                  onClick={() => handleEditar(tpl)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Editar
                </button>
              )}
            </div>
          </div>
        ))}

        {/* CARD: Criar novo template (tracejado, igual ao protótipo) --------- */}
        <button
          onClick={handleCriarNovo}
          className="border border-dashed border-gray-300 rounded-lg p-5 flex flex-col items-center justify-center text-center hover:border-blue-400 hover:bg-blue-50/30 transition-colors"
        >
          <span className="text-2xl text-gray-300 mb-2">+</span>
          <span className="text-sm font-medium text-gray-700">
            Criar novo template
          </span>
          <span className="text-xs text-gray-400 mt-1">
            Ou clone um existente para começar mais rápido
          </span>
        </button>
      </div>
    </div>
  );
}