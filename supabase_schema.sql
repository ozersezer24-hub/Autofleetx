-- AutoFleetX Supabase schema (MVP v14 all-in-one)

-- Users & Profiles
create table if not exists user_profiles (
  user_id uuid primary key,
  email text,
  phone text,
  billing_name text,
  billing_tax_no text,
  billing_tax_office text,
  billing_address text,
  created_at timestamp with time zone default now()
);
alter table user_profiles enable row level security;
create policy if not exists "upsert own profile" on user_profiles
  for insert with check (auth.uid() = user_id);
create policy if not exists "update own profile" on user_profiles
  for update using (auth.uid() = user_id);
create policy if not exists "read own profile" on user_profiles
  for select using (auth.uid() = user_id);

-- Cars
create table if not exists cars (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid,
  title text,
  brand text,
  model text,
  year int,
  km int,
  city text,
  price numeric,
  fuel text,
  gear text,
  description text,
  image_url text,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

-- Favorites
create table if not exists favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  car_id uuid references cars(id),
  created_at timestamp with time zone default now()
);
alter table favorites enable row level security;
create policy if not exists "read own favs" on favorites
  for select using (auth.uid() = user_id);
create policy if not exists "insert own fav" on favorites
  for insert with check (auth.uid() = user_id);
create policy if not exists "delete own fav" on favorites
  for delete using (auth.uid() = user_id);

-- Messages
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  car_id uuid references cars(id),
  sender text,
  phone text,
  body text,
  created_at timestamp with time zone default now()
);

-- Moderators
create table if not exists moderators (
  user_id uuid primary key
);

-- Orders
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  merchant_oid text,
  amount numeric,
  status text,
  type text,
  paid_at timestamp with time zone,
  billing_name text,
  billing_tax_no text,
  billing_tax_office text,
  billing_address text,
  invoice_no text,
  invoice_series text,
  created_at timestamp with time zone default now()
);

-- Events (logs, analytics)
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  event text,
  props jsonb,
  created_at timestamp with time zone default now()
);

-- Push Subscriptions
create table if not exists push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  segment text,
  endpoint text,
  keys jsonb,
  created_at timestamp with time zone default now()
);
