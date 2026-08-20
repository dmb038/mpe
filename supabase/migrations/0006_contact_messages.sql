-- "Email Us" submissions log, kept for board record-keeping in addition to
-- the outbound notification email.

create table public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  subject     text,
  message     text not null,
  created_at  timestamptz not null default now()
);
