-- RLS para o Feedback 360°.
-- Pressupõe: perfis.id = auth.users.id (trigger em 01_auth_trigger.sql).
-- papel_perfil: admin, rh, colaborador (gestor é indicado por perfis.gestor_id, não é um papel).

-- Função auxiliar: papel do usuário logado.
create or replace function public.meu_papel()
returns public.papel_perfil
language sql
security definer
stable
set search_path = public
as $$
  select papel from public.perfis where id = auth.uid();
$$;

-- Função auxiliar: ids dos subordinados diretos do usuário logado.
create or replace function public.meus_subordinados()
returns setof uuid
language sql
security definer
stable
set search_path = public
as $$
  select id from public.perfis where gestor_id = auth.uid();
$$;

alter table public.perfis enable row level security;
alter table public.times enable row level security;
alter table public.membros_time enable row level security;
alter table public.templates_competencia enable row level security;
alter table public.perguntas_template enable row level security;
alter table public.ciclos_avaliacao enable row level security;
alter table public.atribuicoes_avaliacao enable row level security;
alter table public.respostas_avaliacao enable row level security;
alter table public.feedback_aberto_avaliacao enable row level security;

-- perfis: todo autenticado lê; admin/rh escrevem qualquer perfil; usuário edita o próprio.
create policy "perfis_select_authenticated" on public.perfis
  for select to authenticated using (true);

create policy "perfis_update_admin_rh" on public.perfis
  for update to authenticated
  using (public.meu_papel() in ('admin', 'rh'));

create policy "perfis_update_self" on public.perfis
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "perfis_insert_admin_rh" on public.perfis
  for insert to authenticated
  with check (public.meu_papel() in ('admin', 'rh'));

-- times / membros_time: leitura geral; escrita só admin/rh.
create policy "times_select_authenticated" on public.times
  for select to authenticated using (true);

create policy "times_write_admin_rh" on public.times
  for all to authenticated
  using (public.meu_papel() in ('admin', 'rh'))
  with check (public.meu_papel() in ('admin', 'rh'));

create policy "membros_time_select_authenticated" on public.membros_time
  for select to authenticated using (true);

create policy "membros_time_write_admin_rh" on public.membros_time
  for all to authenticated
  using (public.meu_papel() in ('admin', 'rh'))
  with check (public.meu_papel() in ('admin', 'rh'));

-- templates_competencia / perguntas_template: leitura geral; escrita só admin/rh.
create policy "templates_select_authenticated" on public.templates_competencia
  for select to authenticated using (true);

create policy "templates_write_admin_rh" on public.templates_competencia
  for all to authenticated
  using (public.meu_papel() in ('admin', 'rh'))
  with check (public.meu_papel() in ('admin', 'rh'));

create policy "perguntas_select_authenticated" on public.perguntas_template
  for select to authenticated using (true);

create policy "perguntas_write_admin_rh" on public.perguntas_template
  for all to authenticated
  using (public.meu_papel() in ('admin', 'rh'))
  with check (public.meu_papel() in ('admin', 'rh'));

-- ciclos_avaliacao: leitura geral; escrita só admin/rh.
create policy "ciclos_select_authenticated" on public.ciclos_avaliacao
  for select to authenticated using (true);

create policy "ciclos_write_admin_rh" on public.ciclos_avaliacao
  for all to authenticated
  using (public.meu_papel() in ('admin', 'rh'))
  with check (public.meu_papel() in ('admin', 'rh'));

-- atribuicoes_avaliacao: avaliador e avaliado veem a própria atribuição;
-- gestor vê as dos seus subordinados; admin/rh veem tudo.
create policy "atribuicoes_select_envolvidos" on public.atribuicoes_avaliacao
  for select to authenticated
  using (
    avaliador_id = auth.uid()
    or avaliado_id = auth.uid()
    or avaliado_id in (select public.meus_subordinados())
    or public.meu_papel() in ('admin', 'rh')
  );

create policy "atribuicoes_write_admin_rh" on public.atribuicoes_avaliacao
  for insert to authenticated
  with check (public.meu_papel() in ('admin', 'rh'));

create policy "atribuicoes_update_admin_rh" on public.atribuicoes_avaliacao
  for update to authenticated
  using (public.meu_papel() in ('admin', 'rh'));

-- respostas_avaliacao: só o avaliador da atribuição grava a própria resposta;
-- avaliador, avaliado, gestor do avaliado e admin/rh podem ler.
create policy "respostas_select_envolvidos" on public.respostas_avaliacao
  for select to authenticated
  using (
    exists (
      select 1 from public.atribuicoes_avaliacao a
      where a.id = atribuicao_id
        and (
          a.avaliador_id = auth.uid()
          or a.avaliado_id = auth.uid()
          or a.avaliado_id in (select public.meus_subordinados())
          or public.meu_papel() in ('admin', 'rh')
        )
    )
  );

create policy "respostas_insert_avaliador" on public.respostas_avaliacao
  for insert to authenticated
  with check (
    exists (
      select 1 from public.atribuicoes_avaliacao a
      where a.id = atribuicao_id and a.avaliador_id = auth.uid()
    )
  );

create policy "respostas_update_avaliador" on public.respostas_avaliacao
  for update to authenticated
  using (
    exists (
      select 1 from public.atribuicoes_avaliacao a
      where a.id = atribuicao_id and a.avaliador_id = auth.uid()
    )
  );

-- feedback_aberto_avaliacao: mesma regra de respostas_avaliacao.
create policy "feedback_aberto_select_envolvidos" on public.feedback_aberto_avaliacao
  for select to authenticated
  using (
    exists (
      select 1 from public.atribuicoes_avaliacao a
      where a.id = atribuicao_id
        and (
          a.avaliador_id = auth.uid()
          or a.avaliado_id = auth.uid()
          or a.avaliado_id in (select public.meus_subordinados())
          or public.meu_papel() in ('admin', 'rh')
        )
    )
  );

create policy "feedback_aberto_insert_avaliador" on public.feedback_aberto_avaliacao
  for insert to authenticated
  with check (
    exists (
      select 1 from public.atribuicoes_avaliacao a
      where a.id = atribuicao_id and a.avaliador_id = auth.uid()
    )
  );

create policy "feedback_aberto_update_avaliador" on public.feedback_aberto_avaliacao
  for update to authenticated
  using (
    exists (
      select 1 from public.atribuicoes_avaliacao a
      where a.id = atribuicao_id and a.avaliador_id = auth.uid()
    )
  );
