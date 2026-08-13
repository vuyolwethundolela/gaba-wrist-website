-- Run this entire script in Supabase: SQL Editor > New query > Run.
-- Public visitors can read approved reviews and submit a new one.
-- Reviews appear immediately after submission.

create table if not exists public.reviews (
  id bigint generated always as identity primary key,
  reviewer_name text not null check (char_length(reviewer_name) between 2 and 80),
  rating smallint not null check (rating between 1 and 5),
  comment text not null check (char_length(comment) between 3 and 1000),
  is_approved boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

drop policy if exists "Anyone can read approved reviews" on public.reviews;
create policy "Anyone can read approved reviews"
on public.reviews for select
using (is_approved = true);

drop policy if exists "Anyone can submit a review" on public.reviews;
create policy "Anyone can submit a review"
on public.reviews for insert
with check (is_approved = true);
