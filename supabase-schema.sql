-- ═══════════════════════════════════════════════
--  PANDA SHOES — Supabase Database Schema
--  Run this entire file in your Supabase SQL Editor
-- ═══════════════════════════════════════════════

-- PRODUCTS TABLE
create table public.products (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  brand        text not null,
  gender       text not null check (gender in ('mens','womens','kids')),
  category     text not null,
  style        text,
  price        numeric(10,2) not null,
  image_url    text,
  is_new       boolean default false,
  is_active    boolean default true,
  sizes        text[] default array['6','7','8','9','10','11','12'],
  created_at   timestamptz default now()
);

-- ORDERS TABLE
create table public.orders (
  id                uuid primary key default gen_random_uuid(),
  stripe_session_id text unique,
  stripe_payment_id text,
  status            text default 'pending' check (status in ('pending','paid','fulfilled','cancelled')),
  customer_name     text,
  customer_email    text,
  customer_phone    text,
  shipping_address  jsonb,
  items             jsonb not null,
  subtotal          numeric(10,2),
  total             numeric(10,2),
  notes             text,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger orders_updated_at
  before update on public.orders
  for each row execute function update_updated_at();

-- Row Level Security
alter table public.products enable row level security;
alter table public.orders enable row level security;

-- Anyone can read active products
create policy "Public can read active products"
  on public.products for select
  using (is_active = true);

-- Only service role can write products / read orders
create policy "Service role full access products"
  on public.products for all
  using (auth.role() = 'service_role');

create policy "Service role full access orders"
  on public.orders for all
  using (auth.role() = 'service_role');

-- ─── SEED PRODUCTS ──────────────────────────────────────────
insert into public.products (name, brand, gender, category, style, price, is_new) values
-- MEN'S DRESS
('Cap Toe Oxford','Florsheim','mens','dress','Oxford',89.99,false),
('Kenmoor Wingtip','Florsheim','mens','dress','Wingtip',99.99,true),
('Postino Loafer','Florsheim','mens','dress','Loafer',79.99,false),
('Madison Loafer','Stacy Adams','mens','dress','Loafer',74.99,false),
('Swagger Cap Toe','Stacy Adams','mens','dress','Oxford',84.99,true),
('Lincoln Oxford','Nunn Bush','mens','dress','Oxford',69.99,false),
('Tru Comfort Loafer','Nunn Bush','mens','dress','Loafer',64.99,false),
('Caldwell Wingtip','Rockport','mens','dress','Wingtip',89.99,true),
('Style Purpose Oxford','Rockport','mens','dress','Oxford',79.99,false),
-- MEN'S BOOTS
('Pro Titan Boot','Timberland Pro','mens','boots','Work Boot',149.99,false),
('Pit Boss','Timberland Pro','mens','boots','Work Boot',139.99,true),
('6-Inch Premium Boot','Timberland','mens','boots','Hiking Boot',189.99,false),
('Earthkeeper Chukka','Timberland','mens','boots','Chukka',119.99,false),
('Second Shift Boot','Caterpillar','mens','boots','Work Boot',119.99,false),
('Threshold Boot','Caterpillar','mens','boots','Work Boot',129.99,true),
('Newton Ridge Hiking Boot','Columbia','mens','boots','Hiking Boot',109.99,false),
-- MEN'S SPORTS
('GO Walk 7','Skechers','mens','sports','Walking Shoe',79.99,true),
('D-Lites','Skechers','mens','sports','Lifestyle',69.99,false),
('Cage Sneaker','Fila','mens','sports','Court',64.99,false),
('33 Low','Patrick Ewing','mens','sports','Basketball',89.99,true),
-- WOMEN'S HEELS
('Stiletto Pump','De Maria','womens','heels','Stiletto',59.99,false),
('Block Heel Sandal','De Maria','womens','heels','Block Heel',54.99,true),
('Strappy Heel','Pierre Dumas','womens','heels','Strappy',49.99,false),
('Platform Heel','De Blossom','womens','heels','Platform',64.99,true),
('Kitten Heel Pump','Top Moda','womens','heels','Kitten Heel',44.99,false),
-- WOMEN'S SANDALS
('Slide Sandal','Easy Street','womens','sandals','Slide',39.99,false),
('Wedge Sandal','Easy Street','womens','sandals','Wedge',49.99,true),
('Ballet Flat','Botter','womens','sandals','Ballet Flat',44.99,false),
('Espadrille','City Classified','womens','sandals','Espadrille',39.99,false),
-- WOMEN'S BOOTS
('Ankle Bootie','Life Stride','womens','boots','Ankle Boot',79.99,true),
('Chelsea Boot','Life Stride','womens','boots','Chelsea',89.99,false),
('Knee High Boot','Forever Comfort','womens','boots','Knee High',94.99,true),
-- WOMEN'S COMFORT
('ProWalker','Spring Step','womens','comfort','Walking Shoe',89.99,false),
('Comfort Flat','Flexus','womens','comfort','Flat',69.99,true),
('Orthopedic Sandal','Soft Spot','womens','comfort','Sandal',74.99,false),
-- KIDS
('Light-Up Sneaker','Josmo','kids','sneakers','Light-Up',34.99,true),
('Velcro Runner','Josmo','kids','sneakers','Velcro',29.99,false),
('Mickey Mouse Sneaker','Disney (Josmo)','kids','character','Character',39.99,true),
('Frozen Boot','Disney (Josmo)','kids','character','Character Boot',44.99,true),
('Uniform Oxford','Joseph Allen Kids','kids','dress','Oxford',34.99,false),
('Mary Jane','Josmo','kids','girls','Mary Jane',29.99,true),
('Glitter Ballet Flat','Josmo','kids','girls','Ballet Flat',27.99,true),
('Winter Boot','Hush Puppies Kids','kids','boots','Winter Boot',54.99,false);
