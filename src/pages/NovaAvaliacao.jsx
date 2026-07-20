<<<<<<< Updated upstream
import { useState } from 'react'; // Hook do React: permite criar variáveis que, quando mudam, atualizam a tela na hora.
import { Calendar, Diamond, Save } from 'lucide-react'; // Ícones que vamos usar no visual.
=======
import { useState } from "react";
import { Diamond, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";


// Dados mockados — futuramente virão do Supabase
const COLABORADORES_PENDENTES = [
  { id: "JC", nome: "Juliana Costa Rezende" },
  { id: "RS", nome: "Rafael Souza" },   
];

const CRITERIOS = [
  {
    id: "comunicacao",
    titulo: "Comunicação",
    desc: "Clareza, objetividade e assertividade na troca de informações com a equipe.",
  },
  {
    id: "colaboracao",
    titulo: "Colaboração",
    desc: "Disponibilidade para apoiar colegas, trabalho em equipe e espírito colaborativo.",
  },
  {
    id: "qualidade-entrega",
    titulo: "Qualidade das Entregas",
    desc: "Precisão, atenção a detalhes e nível de excelência nos resultados entregues.",
  },
  {
    id: "postura-profissional",
    titulo: "Postura Profissional",
    desc: "Comprometimento, ética, proatividade e resiliência em situações de pressão.",
  },
  {
    id: "qualidade-tecnica",
    titulo: "Qualidade Técnica",
    desc: "Domínio de ferramentas, aplicação de boas práticas e eficiência na resolução de problemas.",
  },
];

const NOTAS = [1, 2, 3, 4, 5];
>>>>>>> Stashed changes

export default function NovaAvaliacao() {
  
  // Uma lista (Array) comum de JavaScript. No futuro, isso virá do banco de dados.
  const colaboradoresPendentes = [
    { id: 'JC', nome: 'Juliana Costa Rezende', cor: 'bg-emerald-500' },
    { id: 'RS', nome: 'Rafael Souza', cor: 'bg-purple-500' },
  ];

  // A lista com as perguntas que o usuário deve responder.
  const criterios = [
    { id: 'comunicacao', titulo: 'Comunicação', desc: 'Clareza, objetividade e assertividade na troca de informações com a equipe.' },
    { id: 'colaboracao', titulo: 'Colaboração', desc: 'Disponibilidade para apoiar colegas, trabalho em equipe e espírito colaborativo.' },
    { id: 'qualidade-entrega', titulo: 'Qualidade das Entregas', desc: 'Precisão, atenção a detalhes e nível de excelência nos resultados entregues.' },
    { id: 'postura-profissional', titulo: 'Postura Profissional', desc: 'Comprometimento, ética, proatividade e resiliência em situações de pressão.' },
    { id: 'qualidade-tecnica', titulo: 'Qualidade Técnica', desc: 'Domínio de ferramentas, aplicação de boas práticas de desenvolvimento e eficiência na resolução de problemas.' },
  ];


  // Apenas os números que vão aparecer nos botões.
  const notasDisponiveis = [1, 2, 3, 4, 5];

  
  // useState cria uma variável 'colaboradorSelecionado' e uma funcao 'clicavel' 'setColaboradorSelecionado'.
  // Começa como 'null' (vazio) porque o usuário  não clicou em ninguém ao abrir a tela.
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState(null);
  
  // Começa como um objeto vazio {}. Vai guardar algo como: { comunicacao: { nota: 5 }, trabalho_equipe: { nota: 4 } }
  const [respostas, setRespostas] = useState({

  });


  //  função chamada quando o usuário clica em uma nota
  const atualizarNota = (criterioId, nota) => {
    setRespostas(estadoAnterior => ({
      ...estadoAnterior, [criterioId] // pega tudo que já estava respondido antes para não apagar 
      : { ...estadoAnterior[criterioId], nota: nota } // adiciona ou atualiza a nova nota do criterio
    }));
  };

  //  função chamada quando o usuário digita nos campos de texto
  const atualizarComentario = (criterioId, tipo, texto) => {
    setRespostas(estadoAnterior => ({
      ...estadoAnterior, [criterioId] // pega tudo que já estava respondido antes para não apagar
      : { ...estadoAnterior[criterioId], [tipo]: texto } // adiciona ou atualiza a nova nota do criterio
    }));
  };


//   CONST ATUALIZARNOTA E ATUALIZARCOMENTARIO, TEM O MESMO PAPEL, MAS UM SALVA AS NOTAS E PASSA PRA FRENTE, O OUTRO FAZ ISSO COM OS COMENTARIOS

  
  // Olha para a variável 'respostas' e conta quantas já têm uma 'nota' preenchida.
  const criteriosRespondidos = Object.keys(respostas).filter(key => respostas[key]?.nota).length;
  const progresso = (criteriosRespondidos / criterios.length) * 100; //porcentagem dos criterios respondidos


  //codigo que vai pra tela
  return (
    <div className="min-h-full bg-[#0b1120] text-slate-300 p-8 font-sans">

      {/* selecionando colaborador para avaliar */}
      <div className="flex flex-wrap gap-3 mt-8">
        {/*  usei o .map() para percorrer a lista de pessoas.
            Para cada pessoa, ele cria um botão de forma automática. */}
        {colaboradoresPendentes.map((colab) => (
          <button
            key={colab.id} // chave unica ID para nao se perder na lista
            onClick={() => setColaboradorSelecionado(colab.id)} // Quando clica, salva a pessoa na "memória"
            
            // Lógica de CSS: "Se esta pessoa for a mesma salva na memória, pinte de azul forte. Se não, pinte de transparente."
            className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${
              colaboradorSelecionado === colab.id
                ? 'bg-blue-900/40 border-blue-600 text-white' 
                : 'bg-transparent border-slate-700 text-slate-400'
            }`}
          >
            <span>{colab.nome}</span>
          </button>
        ))}
      </div>


      <div className="h-1 flex-1 bg-slate-800 mt-10">
        <div 
          className="h-full bg-blue-600 transition-all" 
          style={{ width: `${progresso}%` }}
        ></div>
      </div>


      <div className="flex flex-col gap-6 mt-10">
        
        {/*  usei .map() para desenhar um cartão para cada item da lista 'criterios' */}
        {criterios.map((criterio) => (
          <div key={criterio.id} className="bg-[#131b2f] p-8 border border-slate-800">
            <h2 style={{fontSize:'24px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Diamond/>{criterio.titulo}</h2>
            <p style={{color:'grey'}}>{criterio.desc}</p>

            <div className="flex gap-4 mb-6">
              {notasDisponiveis.map((nota) => (
                <button
                  key={nota}
                  onClick={() => atualizarNota(criterio.id, nota)} 
                  
                  className={`flex-1 py-4 border ${
                    respostas[criterio.id]?.nota === nota
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-[#0b1120] border-slate-800'
                  }`}
                >
                  {nota}
                </button>
              ))}
            </div>

            
            {/* O 'value' diz que o texto da caixa é exatamente o que está na memória.
                O 'onChange' garante que toda vez que você aperta uma tecla, a função salva a nova letra na memória. */}
            {/* TIVE QUE PESQUISAR SOBRE ESSE TRECHO DO VALUE E ONCHANGE */}
            <textarea
              value={respostas[criterio.id]?.positivo || ''}
              onChange={(evento) => atualizarComentario(criterio.id, 'positivo', evento.target.value)}
              placeholder="Comentário positivo ou melhorias..."
              className="w-full bg-[#0b1120] text-slate-300 p-4"
            />
          </div>
        ))}
      </div>

      {/* botao de salvar */}
      <div className="mt-10 flex justify-end">
        <button 
          // O 'disabled' bloqueia o clique se nem tudo foi respondido OU se ninguém foi selecionado
          disabled={criteriosRespondidos !== criterios.length || !colaboradorSelecionado}
          className="bg-blue-600 p-4 text-white disabled:opacity-50"
        >
          <Save size={20} />
          Finalizar Avaliação
        </button>
      </div>

    </div>
  );
}