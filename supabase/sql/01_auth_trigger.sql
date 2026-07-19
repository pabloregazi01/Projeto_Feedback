-- Cria automaticamente uma linha em public.perfis sempre que um usuário se cadastra
-- via Supabase Auth, usando o mesmo UUID (perfis.id = auth.users.id).
-- Ajuste os campos lidos de raw_user_meta_data conforme o que você envia no signUp().

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.perfis (id, nome_completo, email)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'nome_completo'), ''),
      nullif(split_part(coalesce(new.email, ''), '@', 1), ''),
      'Novo usuário'
    ),
    new.email
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
