-- Row Level Security. Everything is locked down by default; policies below
-- open exactly the access each role needs. Service-role (used only in
-- trusted Server Actions) bypasses RLS entirely, so it's not listed here.

alter table public.residents enable row level security;
alter table public.directory_preferences enable row level security;
alter table public.email_verification_codes enable row level security;
alter table public.flock_requests enable row level security;
alter table public.contact_messages enable row level security;
alter table public.csv_imports enable row level security;

create or replace function public.current_resident_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.residents where auth_user_id = auth.uid();
$$;

-- residents: any signed-in resident can read (the app queries directory_view
-- for the public-facing listing, but board/admin tooling reads this table
-- directly); a resident may update only their own row; board/admin may
-- update any row. No client-side INSERT/DELETE — those go through the
-- service-role CSV import path only.
create policy "residents_select_authenticated"
  on public.residents for select
  to authenticated
  using (true);

create policy "residents_update_self"
  on public.residents for update
  to authenticated
  using (auth_user_id = auth.uid())
  with check (auth_user_id = auth.uid());

create policy "residents_update_board_admin"
  on public.residents for update
  to authenticated
  using (public.current_resident_role() in ('board', 'admin'));

-- directory_preferences: a resident manages only their own row; board/admin
-- can read all (for support requests), but not edit another resident's.
create policy "directory_preferences_self"
  on public.directory_preferences for all
  to authenticated
  using (resident_id in (select id from public.residents where auth_user_id = auth.uid()))
  with check (resident_id in (select id from public.residents where auth_user_id = auth.uid()));

create policy "directory_preferences_read_board_admin"
  on public.directory_preferences for select
  to authenticated
  using (public.current_resident_role() in ('board', 'admin'));

-- flock_requests / contact_messages: public forms. Anyone (including
-- anonymous visitors) may insert; only board/admin may read or update.
create policy "flock_requests_insert_public"
  on public.flock_requests for insert
  to anon, authenticated
  with check (true);

create policy "flock_requests_manage_board_admin"
  on public.flock_requests for all
  to authenticated
  using (public.current_resident_role() in ('board', 'admin'))
  with check (public.current_resident_role() in ('board', 'admin'));

create policy "contact_messages_insert_public"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

create policy "contact_messages_read_board_admin"
  on public.contact_messages for select
  to authenticated
  using (public.current_resident_role() in ('board', 'admin'));

-- email_verification_codes and csv_imports: no client access at all
-- (service-role only, used inside Server Actions).
create policy "csv_imports_read_board_admin"
  on public.csv_imports for select
  to authenticated
  using (public.current_resident_role() in ('board', 'admin'));

grant select on public.directory_view to authenticated;
