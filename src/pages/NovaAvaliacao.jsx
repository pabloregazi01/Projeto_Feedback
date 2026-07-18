import { useState } from "react";
import { Diamond, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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

export default function NovaAvaliacao() {
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState(null);
  const [respostas, setRespostas] = useState({});

  function atualizarNota(criterioId, nota) {
    setRespostas((prev) => ({
      ...prev,
      [criterioId]: { ...prev[criterioId], nota },
    }));
  }

  function atualizarComentario(criterioId, texto) {
    setRespostas((prev) => ({
      ...prev,
      [criterioId]: { ...prev[criterioId], comentario: texto },
    }));
  }

  function handleSalvar() {
    // TODO: integrar com Supabase + validação Zod
    console.log({ colaboradorSelecionado, respostas });
  }

  const criteriosRespondidos = Object.values(respostas).filter((r) => r?.nota).length;
  const progresso = (criteriosRespondidos / CRITERIOS.length) * 100;
  const podeEnviar = criteriosRespondidos === CRITERIOS.length && colaboradorSelecionado;

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Cabeçalho */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
          Ciclo Q3 — Julho 2026
        </p>
        <h1 className="text-2xl font-bold text-foreground">Nova Avaliação</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Selecione um colaborador e preencha os critérios de avaliação.
        </p>
      </div>

      {/* Seleção de Colaborador */}
      <div>
        <p className="text-sm font-medium text-foreground mb-3">Colaborador a avaliar</p>
        <div className="flex flex-wrap gap-2">
          {COLABORADORES_PENDENTES.map((colab) => (
            <button
              key={colab.id}
              onClick={() => setColaboradorSelecionado(colab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                colaboradorSelecionado === colab.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border text-foreground hover:bg-muted"
              )}
            >
              {colab.nome}
            </button>
          ))}
        </div>
      </div>

      {/* Barra de Progresso */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs text-muted-foreground">Progresso</p>
          <p className="text-xs font-semibold text-foreground">
            {criteriosRespondidos}/{CRITERIOS.length} critérios
          </p>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      {/* Critérios */}
      <div className="flex flex-col gap-4">
        {CRITERIOS.map((criterio) => {
          const notaSelecionada = respostas[criterio.id]?.nota;
          return (
            <Card key={criterio.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Diamond className="w-4 h-4 text-primary" />
                  <CardTitle className="text-base">{criterio.titulo}</CardTitle>
                </div>
                <CardDescription>{criterio.desc}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {/* Botões de nota */}
                <div className="flex gap-2">
                  {NOTAS.map((nota) => (
                    <button
                      key={nota}
                      onClick={() => atualizarNota(criterio.id, nota)}
                      className={cn(
                        "flex-1 py-3 rounded-lg border text-sm font-bold transition-all",
                        notaSelecionada === nota
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border text-foreground hover:bg-muted"
                      )}
                    >
                      {nota}
                    </button>
                  ))}
                </div>

                {/* Campo de comentário */}
                <Textarea
                  value={respostas[criterio.id]?.comentario || ""}
                  onChange={(e) => atualizarComentario(criterio.id, e.target.value)}
                  placeholder="Comentário ou ponto de melhoria (opcional)..."
                  className="resize-none"
                  rows={3}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Botão de envio */}
      <div className="flex justify-end pb-4">
        <Button
          disabled={!podeEnviar}
          onClick={handleSalvar}
          className="gap-2"
        >
          <Save size={16} />
          Finalizar Avaliação
        </Button>
      </div>
    </div>
  );
}