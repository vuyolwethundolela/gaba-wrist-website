-- Run once in Supabase SQL Editor to add 12 sample five-star reviews.
-- Future customer reviews submitted through the website will be added normally.

insert into public.reviews (reviewer_name, rating, comment, is_approved) values
  ('Liyema Mthembu', 5, 'Beautiful selection and excellent service. My watch looks even better in person.', true),
  ('Ayanda Ndlovu', 5, 'Fast, friendly assistance and a premium-quality piece. I am very happy with my purchase.', true),
  ('Siyabonga Dlamini', 5, 'The ordering process was simple and the watch is stylish and well presented.', true),
  ('Nosipho Khumalo', 5, 'I received wonderful service and the jewellery set was absolutely stunning.', true),
  ('Thando Mokoena', 5, 'Great communication and a quality product. I will definitely order again.', true),
  ('Keaobaka tsotlhe', 5, 'A smooth experience from enquiry to delivery. The watch was exactly as described.', true),
  ('Lerato Mofokeng', 5, 'Elegant products at a great price. I love my new watch.', true),
  ('Kagiso Molefe', 5, 'Professional service and a perfect gift for a special occasion.', true),
  ('Palesa Sekgala', 5, 'The team was helpful and my order arrived beautifully packaged.', true),
  ('Tebogo Radebe', 5, 'Excellent value and a very stylish timepiece. Highly recommended.', true),
  ('Zanele Madondo', 5, 'I am impressed by the quality and the personal service I received.', true),
  ('Banele Qwabe', 5, 'Easy to order, great support and a product that exceeded my expectations.', true);
