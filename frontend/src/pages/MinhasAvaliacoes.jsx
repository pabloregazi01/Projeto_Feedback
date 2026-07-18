import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare, Diamond } from 'lucide-react';

export default function MinhasAvaliacoes() {

  // Simulação de dados
  const resumoDashboard = {
    totalAvaliacoes: 6,
    mediaGeral: 4.2,
    tendencia: "+0.4"
  };

  // Simulação de avaliacoes
  const avaliacoesAnonimas = [
    {
      id: 1,
      titulo: "Avaliação Anônima #1",
      data: "10 Julho 2026",
      detalhes: [
        { 
          criterio: "Comunicação", 
          nota: 5, 
          comentario: "Sempre muito claro e objetivo nas passagens de bastão.",
          melhoria: "Nenhum ponto de melhoria identificado."
        },
        { 
          criterio: "Colaboração", 
          nota: 4, 
          comentario: "Ótimo trabalho em equipe durante o último sprint.",
          melhoria: "Poderia participar mais ativamente das sessões de brainstorming."
        }
      ]
    },
    {
      id: 2,
      titulo: "Avaliação Anônima #2",
      data: "12 Julho 2026",
      detalhes: [
        { 
          criterio: "Comunicação", 
          nota: 4, 
          comentario: "Boa assertividade nas reuniões diárias.",
          melhoria: "Poderia documentar melhor as decisões técnicas."
        }
      ]
    }
  ];


  // 'avaliacaoAberta' guarda o ID da avaliação que o usuário clicou para expandir.
  // Começa como 'null' porque a tela carrega com todas as gavetas fechadas.
  const [avaliacaoAberta, setAvaliacaoAberta] = useState(null);

  // Função disparada quando o usuário clica em uma das barras azuis.
  const alternarAvaliacao = (id) => {
    // pergunta, a avaliacaoAberta é identica ao id que foi puxado como parametro?
    // se sim "null" , ele fecha ela, se NovaAvaliacao, abre umask, e fecha a outra
    setAvaliacaoAberta(avaliacaoAberta === id ? null : id);
  };


  return (
    <div className="min-h-screen bg-[#0b1120] p-8 font-sans">
      
      {/* --- CABEÇALHO DA PÁGINA --- */}
      <div className="mb-8">
        <p className="text-blue-500 text-sm font-semibold tracking-wider mb-2">CICLO 3 — JUNHO 2026</p>
        <h1 className="text-3xl font-bold text-white mb-2">Minhas Avaliações</h1>
        <p className="text-slate-400">Avaliações que seus colegas fizeram sobre você. Os avaliadores são anônimos.</p>
      </div>

      {/* --- PAINEL DE RESUMO (DASHBOARD) --- */}
      {/* Usamos grid para colocar as 3 caixinhas lado a lado no desktop (md:grid-cols-3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Avaliações feitas para você</p>
          <p className="text-4xl font-bold text-blue-500">{resumoDashboard.totalAvaliacoes}</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Média Geral das Avaliações</p>
          <p className="text-4xl font-bold text-emerald-400">{resumoDashboard.mediaGeral}</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Tendência</p>
          <p className="text-4xl font-bold text-emerald-400">{resumoDashboard.tendencia}</p>
        </div>
      </div>


      <div>
        <h2 className="text-xl font-bold text-white mb-6">Histórico Detalhado</h2>
        
        {/* Usamos o operador ternário (IF/ELSE) para ver se tem alguma avaliacao */}
        
        {avaliacoesAnonimas.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-slate-800/30 border border-slate-700 rounded-xl p-16">
            <MessageSquare className="w-12 h-12 text-slate-600 mb-4" />
            <p className="text-slate-400 text-center">Nenhuma avaliação recebida ainda neste ciclo.<br/>As avaliações aparecerão aqui quando seus colegas as enviarem.</p>
          </div>
        ) : (

          <div className="flex flex-col gap-4">
            {/* o "(avaliacao) é um parametro, onde vc da o nome de cada avaliacao feita, de avaliacao"
            ele passa o map no avaliacoesAnonomas, e passa como parametro, ai o id.avaliacao é a chave para abrir o campo dos criterios*/}
            {avaliacoesAnonimas.map((avaliacao) => (  
              <div key={avaliacao.id} className="flex flex-col">
                
                      <button
                  onClick={() => alternarAvaliacao(avaliacao.id)} // Chama a função que altera o Estado
                  className="flex items-center justify-between w-full bg-blue-600 hover:bg-blue-500 transition-colors text-white px-6 py-4 rounded-lg shadow-md"
                >
                  <span className="font-semibold text-lg">
                    {avaliacao.titulo} 
                    <span className="text-blue-200 text-sm ml-2 font-normal">({avaliacao.data})</span>
                  </span>
                  {/* Se esta for a avaliação aberta, mostra a setinha pra cima. Se não, setinha pra baixo. */}
                  {avaliacaoAberta === avaliacao.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>

                {/* 2. O CONTEÚDO EXPANDIDO (O que fica dentro da gaveta) */}
                {/* O && significa: "Só desenhe o bloco abaixo SE o avaliacaoAberta for igual a este ID" */}
                {avaliacaoAberta === avaliacao.id && (
                  <div className="bg-slate-800/50 border-x border-b border-slate-700 rounded-b-lg p-6 -mt-2 pt-8 flex flex-col gap-6">
                    
                    {/* map feito, passando assim a nota e os comentarios feitos, index para uso de iteracao */}
                    {/* avaliacao é referente ao parametro que foi passado por causa do array avaliacoesAnonimas */}
                    {avaliacao.detalhes.map((item, index) => (
                      <div key={index} className="bg-[#0b1120] border border-slate-700 p-5 rounded-lg">
                        
                        {/* Cabeçalho do Critério com Ícone e Nota */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Diamond className="w-5 h-5 text-blue-500" />
                            {/* item.  é referente ao parametro que foi passado por causa do array avaliacoesAnonimas, na linha 127*/}
                            <h3 className="text-lg font-bold text-white">{item.criterio}</h3>
                          </div>
                          {/* card  mostrando a nota recebida */}
                          {/* item.  é referente ao parametro que foi passado por causa do array avaliacoesAnonimas, na linha 127*/}
                          <div className="bg-emerald-500/10 text-emerald-400 font-bold px-4 py-1 rounded-full border border-emerald-500/20">
                            Nota: {item.nota}
                          </div>
                        </div>

                        {/* Blocos de Texto (Comentário e Melhoria) */}
                        <div className="space-y-3 mt-4">
                          <div>
                            <p className="text-slate-500 text-xs font-bold uppercase mb-1">Comentário Positivo</p>
                            <p className="text-slate-300 text-sm bg-slate-800/50 p-3 rounded">{item.comentario}</p>
                          </div>
                          
                          {/* Só mostra a caixa de "Melhoria" se o texto realmente existir para não ficar um buraco vazio na tela */}
                          {/* item.  é referente ao parametro que foi passado por causa do array avaliacoesAnonimas, na linha 127*/}
                          
                          {item.melhoria && (
                            <div>
                              <p className="text-slate-500 text-xs font-bold uppercase mb-1">Pontos a Melhorar</p>
                              <p className="text-slate-300 text-sm bg-slate-800/50 p-3 rounded">{item.melhoria}</p>
                            </div>
                          )}
                        </div>

                      </div>
                    ))}
                  </div>
                )}


              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}