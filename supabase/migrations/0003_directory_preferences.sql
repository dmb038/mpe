-- Per-resident directory privacy preferences. Defaults to showing the
-- resident in the listing but keeping contact fields private (opt-in).

create table public.directory_preferences (
  resident_id        uuid primary key references public.residents (id) on delete cascade,
  show_in_directory  boolean not null default true,
  show_email         boolean not null default false,
  show_phone         boolean not null default false,
  show_household     boolean not null default true,
  updated_at         timestamptz not null default now()
);

create trigger directory_preferences_set_updated_at
  before update on public.directory_preferences
  for each row
  execute function public.set_updated_at();

-- The directory page only ever queries this view, never the raw
-- `residents`/`directory_preferences` tables, so an app-code bug can't leak
-- a field a resident opted out of showing.
create view public.directory_view as
select
  r.id,
  r.full_name,
  r.address_line1,
  r.city,
  r.zip,
  case when dp.show_email then coalesce(r.display_email, r.csv_email) else null end as email,
  case when dp.show_phone then coalesce(r.display_phone, r.csv_mobile) else null end as phone,
  case when dp.show_household then r.household_members else null end as household_members
from public.residents r
join public.directory_preferences dp on dp.resident_id = r.id
where r.status = 'active'
  and dp.show_in_directory = true;
