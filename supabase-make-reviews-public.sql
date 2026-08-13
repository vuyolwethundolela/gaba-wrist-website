-- Run once in Supabase SQL Editor to show all existing reviews immediately
-- and make future reviews public as soon as they are submitted.

alter table public.reviews alter column is_approved set default true;
update public.reviews set is_approved = true where is_approved = false;

drop policy if exists "Anyone can submit a review" on public.reviews;
create policy "Anyone can submit a review"
on public.reviews for insert
with check (is_approved = true);
