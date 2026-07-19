import { useState } from "react";
import { ChevronDown, ChevronUp, MessageSquare, Diamond } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Dados mockados — futuramente virão do Supabase
const RESUMO = {
  totalAvaliacoes: 6,
  mediaGeral: 4.2,
  tendencia: "+0.4",
};

const AVALIACOES = [
  {
    id: 1,
    titulo: "Avaliação Anônima #1",
    data: "10 Julho 2026",
    detalhes: [
      {
        criterio: "Comunicação",
        nota: 5,
        comentario: "Sempre muito claro e objetivo nas passagens de bastão.",
        melhoria: "Nenhum ponto de melhoria identificado.",
      },
      {
        criterio: "Colaboração",
        nota: 4,
        comentario: "Ótimo trabalho em equipe durante o último sprint.",
        melhoria: "Poderia participar mais ativamente das sessões de brainstorming.",
      },
    ],
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
        melhoria: "Poderia documentar melhor as decisões técnicas.",
      },
    ],
  },
];

function getNotaVariant(nota) {
  if (nota >= 4) return "default";
  if (nota >= 3) return "secondary";
  return "destructive";
}

export default function MinhasAvaliacoes() {
  const [avaliacaoAberta, setAvaliacaoAberta] = useState(null);

  function alternarAvaliacao(id) {
    setAvaliacaoAberta((prev) => (prev === id ? null : id));
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
          Ciclo 3 — Junho 2026
        </p>
        <h1 className="text-2xl font-bold text-foreground">Minhas Avaliações</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Avaliações que seus colegas fizeram sobre você. Os avaliadores são anônimos.
        </p>
      </div>

      {/* Painel de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Avaliações recebidas
            </p>
            <p className="text-3xl font-bold text-primary">{RESUMO.totalAvaliacoes}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Média Geral
            </p>
            <p className="text-3xl font-bold text-chart-5">{RESUMO.mediaGeral}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Tendência
            </p>
            <p className="text-3xl font-bold text-chart-5">{RESUMO.tendencia}</p>
          </CardContent>
        </Card>
      </div>

      {/* Histórico Detalhado */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-4">Histórico Detalhado</h2>

        {AVALIACOES.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <MessageSquare className="w-10 h-10 text-muted-foreground/40 mb-4" />
              <p className="text-sm text-muted-foreground text-center">
                Nenhuma avaliação recebida ainda neste ciclo.
                <br />
                As avaliações aparecerão aqui quando seus colegas as enviarem.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {AVALIACOES.map((avaliacao) => {
              const isAberta = avaliacaoAberta === avaliacao.id;
              return (
                <div key={avaliacao.id}>
                  <Button
                    variant="default"
                    className="w-full justify-between h-auto py-4 px-5"
                    onClick={() => alternarAvaliacao(avaliacao.id)}
                  >
                    <span className="font-semibold">
                      {avaliacao.titulo}{" "}
                      <span className="text-primary-foreground/70 text-sm font-normal ml-1">
                        ({avaliacao.data})
                      </span>
                    </span>
                    {isAberta ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </Button>

                  {isAberta && (
                    <Card className="rounded-t-none border-t-0 -mt-1">
                      <CardContent className="p-5 flex flex-col gap-5">
                        {avaliacao.detalhes.map((item, index) => (
                          <div key={index}>
                            {index > 0 && <Separator className="mb-5" />}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Diamond className="w-4 h-4 text-primary" />
                                <h3 className="text-sm font-bold text-foreground">
                                  {item.criterio}
                                </h3>
                              </div>
                              <Badge variant={getNotaVariant(item.nota)}>Nota: {item.nota}</Badge>
                            </div>

                            <div className="flex flex-col gap-3">
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                                  Comentário Positivo
                                </p>
                                <p className="text-sm text-foreground bg-muted/50 p-3 rounded-lg">
                                  {item.comentario}
                                </p>
                              </div>

                              {item.melhoria && (
                                <div>
                                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                                    Pontos a Melhorar
                                  </p>
                                  <p className="text-sm text-foreground bg-muted/50 p-3 rounded-lg">
                                    {item.melhoria}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
