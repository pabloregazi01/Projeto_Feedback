import React, { useState } from 'react';
import { Plus, Diamond, Circle, Target, X } from 'lucide-react';

export default function PaginaEquipeGestor() {
  
  
  // variaveis dos 4 primeiros cards
  const resumoCards = {
    mediaGeral: 4.2,
    comparacao: "↑ 0.3 vs. ciclo anterior",
    deficit: { nome: "Comunicação", media: 4.1 },
    destaque: { iniciais: "RS", nome: "Rafael", nota: 4.6, cor: "bg-purple-500" },
    atencao: { iniciais: "BT", nome: "Bianca", nota: 3.7, cor: "bg-pink-500" }
  };

  // desempenho medio por criterio
  const desempenhoCriterios = [
    { id: 1, nome: "Qualidade das Entregas", nota: 3.3, icone: Diamond },
    { id: 2, nome: "Colaboração", nota: 4.2, icone: Diamond },
    { id: 3, nome: "Postura Profissional", nota: 1.1, icone: Diamond },
    { id: 4, nome: "Comunicação", nota: 4.1, icone: Diamond }
  ];

  //lista dos colaboradores da equipe no ultimo card
  const [membrosEquipe, setMembrosEquipe] = useState([
    { id: 1, iniciais: "JC", nome: "Juliana Costa", cargo: "Designer UX", cor: "bg-emerald-500", notas: [3.8, 4.2, 4.5, 3.9], media: 4.1 },
    { id: 2, iniciais: "RS", nome: "Rafael Souza", cargo: "Product Manager", cor: "bg-purple-500", notas: [4.7, 4.6, 4.4, 4.8], media: 4.6 },
    { id: 3, iniciais: "CF", nome: "Carlos Ferreira", cargo: "Desenvolvedor Sênior", cor: "bg-blue-500", notas: [4.2, 4.5, 4.0, 4.1], media: 4.2 },
    { id: 4, iniciais: "ML", nome: "Mariana Lima", cargo: "Analista de Dados", cor: "bg-yellow-500", notas: [4.0, 2, 4.3, 4.2], media: 3.6 },
    { id: 5, iniciais: "BT", nome: "Bianca Torres", cargo: "Desenvolvedora Frontend", cor: "bg-pink-500", notas: [3.4, 3.8, 4.1, 3], media: 3.5 },
    { id: 6, iniciais: "PA", nome: "Pedro Alves", cargo: "Engenheiro de Software", cor: "bg-blue-400", notas: [4.3, 4.1, 4.6, 4.2], media: 4.3 }
  ]);

  // funcao que define a cor da nota de acordo com a nota (verde, amarela, vermelha)
  const getCorNota = (nota) => {
    if (nota >= 4) return "text-emerald-400";
    if (nota >= 3.5) return "text-amber-500";
    if (nota < 3.5) return "text-red-500";
  };


  

  return (
    <div className="min-h-screen bg-[#0b1120] p-8 font-sans">
      

      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-blue-500 text-sm font-semibold tracking-wider mb-2">CICLO Q3 — JULHO 2026</p>
          <h1 className="text-3xl font-serif text-white mb-2">Equipe</h1>

          {/* faz a leitura da quantidade (lenght) de colaboradores atraves do array de colaboradores  */}
          <p className="text-slate-400">{membrosEquipe.length} colaboradores cadastrados</p>
        </div>
        <button className="flex items-center gap-2 bg-teal-400 hover:bg-teal-300 text-teal-950 font-bold px-6 py-3 rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          Adicionar Colaborador
        </button>
      </div>

      {/* --- CARDS DE RESUMO  --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Média Geral */}
        <div className="bg-slate-800/40 border-t-2 border-t-blue-500 border border-slate-700/50 rounded-xl p-6 shadow-lg">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Média Geral</p>

          {/* resumoCards é o nome do array, ai vc tras cada ponto do array, usando (nome do array).(ponto que vc quer) */}
          <p className="text-5xl font-bold text-blue-500 mb-2">{resumoCards.mediaGeral}</p>
          <p className="text-slate-500 text-sm">{resumoCards.comparacao}</p>
        </div>

        {/* Déficit da Equipe */}
        <div className="bg-slate-800/40 border-t-2 border-t-red-400 border border-slate-700/50 rounded-xl p-6 shadow-lg">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Déficit da Equipe</p>

          {/* resumoCards é o nome do array, ai vc tras cada ponto do array, usando (nome do array).(ponto que vc quer) */}
          <p className="text-2xl font-serif text-red-400 mb-4">{resumoCards.deficit.nome}</p>
          <p className="text-slate-500 text-sm">média {resumoCards.deficit.media}</p>
        </div>

        {/* Destaque */}
        <div className="bg-slate-800/40 border-t-2 border-t-emerald-400 border border-slate-700/50 rounded-xl p-6 shadow-lg relative overflow-hidden">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Destaque</p>
          <div className="flex items-center gap-3 mb-4">
            
            {/* resumoCards é o nome do array, ai vc tras cada ponto do array, usando (nome do array).(ponto que vc quer) */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${resumoCards.destaque.cor}`}>
              {resumoCards.destaque.iniciais}
            </div>
            <p className="text-white font-medium">{resumoCards.destaque.nome}</p>
          </div>
          <p className="text-4xl font-bold text-emerald-400">{resumoCards.destaque.nota}</p>
        </div>

        {/* Requer Atenção */}
        <div className="bg-slate-800/40 border-t-2 border-t-amber-400 border border-slate-700/50 rounded-xl p-6 shadow-lg relative overflow-hidden">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Requer Atenção</p>
          <div className="flex items-center gap-3 mb-4">

            {/* resumoCards é o nome do array, ai vc tras cada ponto do array, usando (nome do array).(ponto que vc quer) */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${resumoCards.atencao.cor}`}>
              {resumoCards.atencao.iniciais}
            </div>
            <p className="text-white font-medium">{resumoCards.atencao.nome}</p>
          </div>
          <p className="text-4xl font-bold text-amber-400">{resumoCards.atencao.nota}</p>
        </div>
      </div>

      {/* --- MEIO DA PÁGINA (GRÁFICOS E PONTOS) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Desempenho por Critério */}
        {/* tive que buscar no claude modelo de como faria */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-serif text-white mb-8">Desempenho por Critério</h2>
          <div className="flex flex-col gap-6">
            {desempenhoCriterios.map((criterio) => {
              const Icone = criterio.icone;
              // porcentagem da barra (ex: 4.3 de 5 = 86%)
              const progresso = (criterio.nota / 5) * 100;
              
              return (
                <div key={criterio.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icone className="w-4 h-4 text-blue-500" />
                      <span className="text-slate-200">{criterio.nome}</span>
                    </div>
                    <span className="text-blue-400 font-bold">{criterio.nota}</span>
                  </div>
                  {/* Fundo da barra */}
                  <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
                    {/* Preenchimento da barra */}
                    <div 
                      className={`h-full bg-blue-500 rounded-full transition-all duration-1000
                        ${progresso >= 75 ? 'bg-emerald-400' : progresso >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                  
                      style={{ width: `${progresso}%` }}
                    ></div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>



        {/* Pontos a Melhorar */}
        <div className="bg-transparent rounded-xl flex flex-col gap-4">
          <h2 className="text-2xl font-serif text-white mb-2">Pontos a Melhorar</h2>
          
          {/* Card Déficit */}
          <div className="bg-slate-800/30 border border-amber-500/30 rounded-xl p-6">
            <p className="text-amber-500 text-xs font-semibold uppercase tracking-wider mb-3">Critério com Maior Déficit</p>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Diamond className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-white">Comunicação</h3>
              </div>
              <span className="text-amber-500 font-bold">4.1</span>
            </div>
            <p className="text-slate-400 text-sm mt-3">Recomenda-se sessões de feedback individual e workshops focados nesta competência.</p>
          </div>

          {/* Card Ponto Forte */}
          <div className="bg-slate-800/30 border border-blue-500/30 rounded-xl p-6">
            <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-3">Ponto Forte da Equipe</p>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-bold text-white">Qualidade das Entregas</h3>
              </div>
              <span className="text-blue-500 font-bold">4.3</span>
            </div>
            <p className="text-slate-400 text-sm mt-3">Utilize esses colaboradores como referência em mentorias internas.</p>
          </div>

          {/* Card Ação Recomendada */}
          <div className="bg-slate-800/30 border border-pink-500/20 rounded-xl p-6">
            <p className="text-pink-400 text-xs font-semibold uppercase tracking-wider mb-3">Ação Recomendada</p>
            <p className="text-slate-400 text-sm">Equipe dentro dos parâmetros. Manter ciclos mensais de avaliação.</p>
          </div>

        </div>
      </div>

      {/* ---  MEMBROS DA EQUIPE --- */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif text-white">Membros da Equipe</h2>
          <span className="text-slate-500 text-sm">{membrosEquipe.length} cadastrados</span>
        </div>

        <div className="flex flex-col gap-2">
          {membrosEquipe.map((membro, index) => (
            <div key={membro.id} className="flex items-center justify-between p-4 hover:bg-slate-800/50 rounded-lg transition-colors group">
              
              {/* Lado Esquerdo: Index, Avatar, Nome e Cargo */}
              <div className="flex items-center gap-6 w-1/3">
                <span className="text-slate-500 w-4">{index + 1}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${membro.cor}`}>
                  {membro.iniciais}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-semibold">{membro.nome}</span>
                  <span className="text-slate-400 text-sm">{membro.cargo}</span>
                </div>
              </div>

              {/* Lado Direito: Micro-notas, Nota Final e Botão de Excluir */}
              <div className="flex items-center gap-8">
                
                {/* Micro-notas dos critérios (com pequenos ícones) */}
                <div className="flex items-center gap-4">
                  {membro.notas.map((nota, i) => (
                     <div key={i} className="flex flex-col items-center gap-1">
                        <Diamond className="w-3 h-3 text-slate-600" />
                        <span className={`text-sm font-medium ${getCorNota(nota)}`}>{nota}</span>
                     </div>
                  ))}
                </div>

                {/* Nota Média Final */}
                <div className={`text-xl font-bold w-16 text-center ${getCorNota(membro.media)}`}>
                  {membro.media}
                </div>

                {/* Botão de Remover (Aparece mais forte no hover) */}
                <button className="flex items-center justify-center w-4 h-4 rounded-md bg-transparent text-slate-500 hover:text-red-400 hover:bg-slate-700/50 transition-colors">
                  <X className="w-4 h-4" />
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}