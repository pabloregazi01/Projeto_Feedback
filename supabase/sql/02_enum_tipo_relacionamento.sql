-- Valores do enum tipo_relacionamento, usado em atribuicoes_avaliacao
-- para classificar a relação avaliador -> avaliado dentro de um ciclo.

create type public.tipo_relacionamento as enum (
  'autoavaliacao',  -- avaliado avalia a si mesmo
  'gestor',         -- gestor avalia um subordinado
  'pares',          -- colega avalia colega
  'subordinado'     -- colaborador avalia o próprio gestor
);
