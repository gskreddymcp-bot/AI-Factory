create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.tenant_members (
  tenant_id uuid references public.tenants(id) on delete cascade,
  user_id uuid not null,
  role text not null check (role in ('owner', 'member', 'admin')),
  created_at timestamptz not null default now(),
  primary key (tenant_id, user_id)
);

create table if not exists public.ideas (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  title text not null,
  problem text not null,
  constraints jsonb not null default '[]'::jsonb,
  created_by uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.prds (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  idea_id uuid references public.ideas(id) on delete cascade,
  content_md text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.architectures (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  idea_id uuid references public.ideas(id) on delete cascade,
  mermaid_md text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.artifacts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  idea_id uuid references public.ideas(id) on delete cascade,
  kind text not null check (kind in ('scaffold_preview', 'zip_link')),
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  actor_user_id uuid,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.usage_counters (
  tenant_id uuid primary key references public.tenants(id) on delete cascade,
  prd_count integer not null default 0,
  architecture_count integer not null default 0,
  artifact_count integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.tenants enable row level security;
alter table public.tenant_members enable row level security;
alter table public.ideas enable row level security;
alter table public.prds enable row level security;
alter table public.architectures enable row level security;
alter table public.artifacts enable row level security;
alter table public.audit_logs enable row level security;
alter table public.usage_counters enable row level security;

create policy tenant_read_own_ideas on public.ideas
for select using (
  exists (
    select 1 from public.tenant_members tm
    where tm.tenant_id = ideas.tenant_id and tm.user_id = auth.uid()
  )
);

create policy tenant_write_own_ideas on public.ideas
for insert with check (
  exists (
    select 1 from public.tenant_members tm
    where tm.tenant_id = ideas.tenant_id and tm.user_id = auth.uid()
  )
);
