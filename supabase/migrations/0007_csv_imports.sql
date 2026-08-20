-- Audit trail for each admin CSV import, plus the transactional upsert
-- function the import Server Action calls via RPC.

create table public.csv_imports (
  id             uuid primary key default gen_random_uuid(),
  imported_by    uuid not null references public.residents (id),
  filename       text,
  rows_total     int not null,
  rows_inserted  int not null,
  rows_updated   int not null,
  rows_flagged   int not null default 0,
  rows_skipped   int not null default 0,
  errors         jsonb not null default '[]'::jsonb,
  created_at     timestamptz not null default now()
);

alter table public.residents
  add constraint residents_imported_batch_fk
  foreign key (imported_batch_id) references public.csv_imports (id) on delete set null;

-- Upserts a batch of resident rows inside a single transaction. Matches
-- existing residents by normalized address + zip (the most stable
-- identifier for a physical property). Never deletes rows, and never
-- silently overwrites the verification anchor (csv_email/csv_mobile) for an
-- already-claimed resident — those rows come back with action = 'flagged'
-- for an admin to review by hand.
create or replace function public.import_residents(
  p_rows jsonb,
  p_imported_by uuid,
  p_filename text
)
returns public.csv_imports
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row jsonb;
  v_existing public.residents;
  v_inserted int := 0;
  v_updated int := 0;
  v_flagged int := 0;
  v_skipped int := 0;
  v_errors jsonb := '[]'::jsonb;
  v_import public.csv_imports;
  v_batch_id uuid := gen_random_uuid();
begin
  for v_row in select * from jsonb_array_elements(p_rows)
  loop
    begin
      select * into v_existing
      from public.residents
      where lower(address_line1) = lower(trim(v_row->>'address_line1'))
        and zip = trim(v_row->>'zip')
      limit 1;

      if v_existing.id is null then
        insert into public.residents (
          full_name, address_line1, address_line2, city, state, zip,
          csv_email, csv_mobile, imported_at, imported_batch_id
        ) values (
          trim(v_row->>'full_name'),
          trim(v_row->>'address_line1'),
          nullif(trim(v_row->>'address_line2'), ''),
          coalesce(nullif(trim(v_row->>'city'), ''), 'Dallas'),
          coalesce(nullif(trim(v_row->>'state'), ''), 'TX'),
          trim(v_row->>'zip'),
          lower(trim(v_row->>'email')),
          trim(v_row->>'mobile'),
          now(),
          v_batch_id
        );
        v_inserted := v_inserted + 1;

      elsif v_existing.status = 'unclaimed' then
        update public.residents
        set full_name = trim(v_row->>'full_name'),
            address_line2 = nullif(trim(v_row->>'address_line2'), ''),
            csv_email = lower(trim(v_row->>'email')),
            csv_mobile = trim(v_row->>'mobile'),
            imported_at = now(),
            imported_batch_id = v_batch_id
        where id = v_existing.id;
        v_updated := v_updated + 1;

      else
        -- Claimed account: update the display name only, never the
        -- verification anchor. Flag for manual review instead.
        update public.residents
        set full_name = trim(v_row->>'full_name'),
            imported_at = now(),
            imported_batch_id = v_batch_id
        where id = v_existing.id;
        v_flagged := v_flagged + 1;
        v_errors := v_errors || jsonb_build_object(
          'address', v_row->>'address_line1',
          'reason', 'Resident already claimed; email/mobile were not overwritten. Review manually if the CSV values changed.'
        );
      end if;

    exception when others then
      v_skipped := v_skipped + 1;
      v_errors := v_errors || jsonb_build_object(
        'address', v_row->>'address_line1',
        'reason', sqlerrm
      );
    end;
  end loop;

  insert into public.csv_imports (
    imported_by, filename, rows_total, rows_inserted, rows_updated,
    rows_flagged, rows_skipped, errors
  ) values (
    p_imported_by, p_filename, jsonb_array_length(p_rows), v_inserted, v_updated,
    v_flagged, v_skipped, v_errors
  )
  returning * into v_import;

  return v_import;
end;
$$;
