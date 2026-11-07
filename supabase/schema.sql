-- Mamou Sahara – cars table + storage for admin dashboard
-- Run this in Supabase SQL Editor

-- Cars
create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  year int not null default 2024,
  fuel text not null default 'Essence' check (fuel in ('Essence', 'Diesel', 'Hybride')),
  seats int not null default 5,
  price int not null default 0,
  status text not null default 'Available' check (status in ('Available', 'Reserved')),
  image_url text,
  color text default '#1f4fb0',
  badge text,
  transmission text default 'Auto',
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists cars_updated_at on public.cars;
create trigger cars_updated_at
  before update on public.cars
  for each row execute function public.set_updated_at();

-- RLS
alter table public.cars enable row level security;

-- Public read (website)
drop policy if exists "Public can read cars" on public.cars;
create policy "Public can read cars"
  on public.cars for select
  to anon, authenticated
  using (true);

-- Only authenticated users can write (admin)
drop policy if exists "Auth can insert cars" on public.cars;
create policy "Auth can insert cars"
  on public.cars for insert
  to authenticated
  with check (true);

drop policy if exists "Auth can update cars" on public.cars;
create policy "Auth can update cars"
  on public.cars for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Auth can delete cars" on public.cars;
create policy "Auth can delete cars"
  on public.cars for delete
  to authenticated
  using (true);

-- Storage bucket for car photos
insert into storage.buckets (id, name, public)
values ('cars', 'cars', true)
on conflict (id) do nothing;

drop policy if exists "Public read car images" on storage.objects;
create policy "Public read car images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'cars');

drop policy if exists "Auth upload car images" on storage.objects;
create policy "Auth upload car images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'cars');

drop policy if exists "Auth update car images" on storage.objects;
create policy "Auth update car images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'cars');

drop policy if exists "Auth delete car images" on storage.objects;
create policy "Auth delete car images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'cars');

