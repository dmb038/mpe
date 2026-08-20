-- Resident directory + verification anchor table.
-- Seeded from a board-provided CSV export (name, address, email, mobile).
-- A resident "claims" their row during portal signup, which links
-- auth_user_id and flips status to 'active'.

create table public.residents (
  id                 uuid primary key default gen_random_uuid(),

  -- Verification anchor fields, sourced from the CSV import. These are what
  -- a new signup is matched against; do not silently overwrite them for an
  -- already-claimed resident (see 0004_csv_imports.sql).
  full_name          text not null,
  address_line1      text not null,
  address_line2      text,
  city               text not null default 'Dallas',
  state              text not null default 'TX',
  zip                text not null,
  csv_email          text not null,
  csv_mobile         text not null,

  -- Directory-facing fields a resident can edit after claiming their account.
  household_members  text[] not null default '{}',
  display_email      text,
  display_phone      text,

  auth_user_id       uuid unique references auth.users (id) on delete set null,
  role               text not null default 'resident'
                       check (role in ('resident', 'board', 'admin')),
  status             text not null default 'unclaimed'
                       check (status in ('unclaimed', 'pending_verification', 'active', 'disabled')),

  imported_at        timestamptz,
  imported_batch_id  uuid,

  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index residents_csv_email_idx on public.residents (lower(csv_email));
create index residents_address_idx on public.residents (lower(address_line1), zip);
create index residents_auth_user_idx on public.residents (auth_user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger residents_set_updated_at
  before update on public.residents
  for each row
  execute function public.set_updated_at();
