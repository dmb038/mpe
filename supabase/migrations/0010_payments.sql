-- Payment records for dues and other transactions. Keyed by Stripe payment intent ID
-- for idempotency and webhook reconciliation. RLS allows anonymous insertion (public
-- form), but reads/updates are board/admin only.

create type payment_status as enum ('pending', 'succeeded', 'failed', 'refunded');

create table public.payments (
  id                  uuid primary key default gen_random_uuid(),
  stripe_intent_id    text not null unique,
  amount_cents        integer not null,
  currency            text not null default 'usd',
  status              payment_status not null default 'pending',
  payer_name          text not null,
  payer_email         text not null,
  payer_resident_id   uuid,
  description         text,
  metadata            jsonb,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  succeeded_at        timestamptz
);

create index payments_stripe_intent_idx on public.payments (stripe_intent_id);
create index payments_payer_email_idx on public.payments (payer_email);
create index payments_status_idx on public.payments (status);
create index payments_resident_idx on public.payments (payer_resident_id);

alter table public.payments enable row level security;

-- Anonymous users can insert (public payment form)
create policy payments_insert_anonymous on public.payments
  for insert with check (true);

-- Only board/admin can read and update
create policy payments_select_board on public.payments
  for select
  using (exists(
    select 1 from public.residents
    where residents.auth_user_id = auth.uid()
    and residents.role in ('board', 'admin')
  ));

create policy payments_update_board on public.payments
  for update
  using (exists(
    select 1 from public.residents
    where residents.auth_user_id = auth.uid()
    and residents.role in ('board', 'admin')
  ));

-- Trigger to update updated_at
create or replace function update_payments_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger payments_updated_at before update on public.payments
  for each row execute function update_payments_updated_at();
