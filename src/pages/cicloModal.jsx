// cicloModal.jsx
// Componente: Modal "Novo ciclo de avaliação" | Épico 3: Gestão do Ciclo de Avaliação | US3.1
// OBS: mockado, sem chamada de API. Só monta o objeto e devolve pro componente pai
// via onCriar, que quem decide o que fazer com o dado (nesta branch: adicionar na lista mockada).

import React, { useState } from "react";

export default function CicloModal({ onClose, onCriar }) {
  // ---------------------------------------------------------------------
  // ESTADOS DO FORMULÁRIO
  // Cada campo do modal (imagem 5) vira um state separado.
  // ---------------------------------------------------------------------
  const [nome, setNome] = useState("");
  const [template, setTemplate] = useState("Template Padrão 360°");
  const [dataInicio, setDataInicio] = useState("");
  const [dataLimite, setDataLimite] = useState("");
  const [erro, setErro] = useState(""); // mensagem de validação (ex: data-limite obrigatória)

  // ---------------------------------------------------------------------
  // VALIDAÇÃO SIMPLES
  // No protótipo (imagem 5) aparece o erro "Informe a data-limite de envio
  // das respostas" quando o campo fica vazio. Replicando esse comportamento.
  // ---------------------------------------------------------------------
  const handleCriar = () => {
    if (!dataLimite) {
      setErro("Informe a data-limite de envio das respostas.");
      return;
    }
    setErro("");

    // Monta o objeto do novo ciclo e devolve pro componente pai
    onCriar({
      nome: nome.trim() || "Ciclo sem nome", // fallback simples caso o usuário não preencha
      template,
      dataInicio,
      dataLimite,
    });
  };

  return (
    // Overlay escuro cobrindo a tela toda, com o modal centralizado
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* CABEÇALHO DO MODAL ----------------------------------------- */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Novo ciclo de avaliação
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* CAMPO: Nome do ciclo ---------------------------------------- */}
        <label className="block text-sm text-gray-700 mb-1">
          Nome do ciclo
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex.: Ciclo 2026.2 — Semestral"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* CAMPO: Template de competências ------------------------------ */}
        <label className="block text-sm text-gray-700 mb-1">
          Template de competências
        </label>
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {/* Mockado — no futuro isso viria da lista real de templates
              (ver CompetenciasLista.jsx) */}
          <option>Template Padrão 360°</option>
          <option>Ciclo 2026.1 — Engenharia</option>
        </select>

        {/* CAMPOS: Data de início e Data-limite (lado a lado) ----------- */}
        <div className="flex gap-4 mb-1">
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">
              Data de início
            </label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">
              Data-limite
            </label>
            <input
              type="date"
              value={dataLimite}
              onChange={(e) => setDataLimite(e.target.value)}
              className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                erro
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {/* Mensagem de erro, igual ao protótipo */}
            {erro && (
              <p className="text-xs text-red-500 mt-1">{erro}</p>
            )}
          </div>
        </div>

        {/* AVISO INFORMATIVO (igual ao balão cinza da imagem 5) --------- */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-xs text-gray-500 mt-4 mb-6">
          O ciclo é criado em <strong>rascunho</strong>. As atribuições de
          avaliação só serão geradas quando você clicar em "Gerar Avaliações"
          na tela do ciclo.
        </div>

        {/* BOTÕES --------------------------------------------------------- */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={handleCriar}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Criar ciclo em rascunho
          </button>
        </div>
      </div>
    </div>
  );
}