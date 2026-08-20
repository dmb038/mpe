-- Short-lived, hashed codes used to confirm a signup applicant controls the
-- email address already on file for their resident record (step 2 of
-- signup). Never store the raw code.

create table public.email_verification_codes (
  id             uuid primary key default gen_random_uuid(),
  resident_id    uuid not null references public.residents (id) on delete cascade,
  email          text not null,
  code_hash      text not null,
  expires_at     timestamptz not null,
  consumed_at    timestamptz,
  attempt_count  int not null default 0,
  created_at     timestamptz not null default now()
);

create index email_verification_codes_resident_idx
  on public.email_verification_codes (resident_id, consumed_at);
