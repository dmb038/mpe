-- Public Flock camera footage review requests. Notification-only: this
-- table + an email to the security team is the entire "integration" with
-- Flock, since Flock's HOA/neighborhood-association tier exposes no public
-- footage-retrieval API. The security team pulls footage manually in
-- Flock's own dashboard.

create table public.flock_requests (
  id                  uuid primary key default gen_random_uuid(),
  requester_name      text not null,
  requester_email     text not null,
  incident_datetime   timestamptz,
  incident_date_text  text,
  description         text not null,
  status              text not null default 'new'
                        check (status in ('new', 'in_review', 'fulfilled', 'closed')),
  admin_notes         text,
  created_at          timestamptz not null default now(),
  reviewed_by         uuid references public.residents (id),
  reviewed_at         timestamptz
);

create index flock_requests_status_idx on public.flock_requests (status, created_at desc);
