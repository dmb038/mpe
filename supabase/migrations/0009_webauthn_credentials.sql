-- Registered passkeys. Built against @simplewebauthn (a stable, well-
-- documented library) rather than Supabase Auth's native passkey support,
-- which was still in beta with an evolving API at the time of this build.
-- Accessed exclusively through the service-role client inside
-- app/api/webauthn/** route handlers — no client-side access, no RLS
-- policies needed since there's no `authenticated`/`anon` grant on it.

create table public.webauthn_credentials (
  id             uuid primary key default gen_random_uuid(),
  resident_id    uuid not null references public.residents (id) on delete cascade,
  credential_id  text not null unique,
  public_key     text not null,
  counter        bigint not null default 0,
  transports     text[],
  device_label   text,
  created_at     timestamptz not null default now(),
  last_used_at   timestamptz
);

create index webauthn_credentials_resident_idx on public.webauthn_credentials (resident_id);

alter table public.webauthn_credentials enable row level security;
-- No policies: this table is intentionally inaccessible to the anon/
-- authenticated roles. Only the service-role client (which bypasses RLS)
-- may read or write it.
