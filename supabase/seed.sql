insert into public.tenants (id, name)
values
  ('00000000-0000-0000-0000-000000000001', 'Acme Corp'),
  ('00000000-0000-0000-0000-000000000002', 'Globex')
on conflict do nothing;

insert into public.usage_counters (tenant_id, prd_count, architecture_count, artifact_count)
values
  ('00000000-0000-0000-0000-000000000001', 4, 4, 4),
  ('00000000-0000-0000-0000-000000000002', 2, 2, 2)
on conflict do nothing;
