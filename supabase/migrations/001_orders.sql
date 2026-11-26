-- Orders table for online payments.
-- Row Level Security is ON with NO public policies: the website (publishable key)
-- can neither read nor write it. Only the server functions (service role) can.
-- Owner views orders in Supabase > Table Editor > orders.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  reference text generated always as ('GW-' || upper(left(id::text, 8))) stored,
  status text not null default 'pending'
    check (status in ('pending','paid','failed','cancelled','amount_mismatch')),
  items jsonb not null,
  total numeric(10,2) not null check (total > 0),
  customer_name text not null,
  customer_email text,
  customer_mobile text not null,
  area text not null,
  fulfillment text not null check (fulfillment in ('collect','deliver')),
  delivery_address text,
  note text,
  pf_payment_id text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

alter table public.orders enable row level security;
revoke all on public.orders from anon, authenticated;
