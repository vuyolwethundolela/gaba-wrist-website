import m1 from '../../m1.jpeg'
import m2 from '../../m2.jpeg'
import m3 from '../../m3.jpeg'
import m4 from '../../m4.jpeg'
import m5 from '../../m5.jpeg'
import m6 from '../../m6.jpeg'
import l1 from '../../l1.jpeg'
import l2 from '../../l2.jpeg'
import l3 from '../../l3.jpeg'
import l4 from '../../l4.jpeg'
import l5 from '../../l5.jpeg'
import l6 from '../../l6.jpeg'
import u1 from '../../u1.jpeg'
import u2 from '../../u2.jpeg'
import u3 from '../../u3.jpeg'
import u4 from '../../u4.jpeg'
import u5 from '../../u5.jpeg'
import u6 from '../../u6.jpeg'
import j1 from '../../j1.jpeg'
import j2 from '../../j2.jpeg'
import j3 from '../../j3.jpeg'
import j4 from '../../j4.jpeg'
import j5 from '../../j5.jpeg'
import j6 from '../../j6.jpeg'

export const CATEGORIES = { MENS: "Men's Watches", LADIES: "Ladies' Watches", UNISEX: 'Unisex Watches', JEWELLERY: 'Jewellery' }
const product = (id, name, category, description, price, image) => ({ id, reference: id, name, category, description: `${description} Price: R${price}.`, image })

export const products = [
  product('GW-M001', 'CURREN Luxury Chronograph Watch', CATEGORIES.MENS, 'A refined stainless-steel CURREN business watch with a chronograph display, luminous hands, automatic date function and water-resistant construction. A confident choice for formal and everyday wear.', '699', m1),
  product('GW-M002', 'DENVOSI Octagonal Minimalist Watch', CATEGORIES.MENS, 'A sleek DENVOSI quartz watch featuring an octagonal case, minimalist date display and water-resistant stainless-steel band. Designed for understated modern style.', '599', m2),
  product('GW-M003', 'CURREN Multifunction Chronograph Watch', CATEGORIES.MENS, 'A durable CURREN multifunction chronograph watch with a bold dial and water-resistant finish, bringing practical performance to a polished everyday look.', '699', m3),
  product('GW-M004', 'SKMEI World Time Sport Watch', CATEGORIES.MENS, 'The SKMEI 2284 combines analogue and digital timekeeping with world-time functionality, a steel case and water-resistant sport-ready design.', '550', m4),
  product('GW-M005', 'LIGE Black Steel Business Chronograph', CATEGORIES.MENS, 'A sophisticated LIGE business watch with a black stainless-steel band, round quartz dial, date display and chronograph detailing for effortless daily wear.', '1,250', m5),
  product('GW-M006', 'REWARD Silicone Strap Business Watch', CATEGORIES.MENS, 'A versatile REWARD quartz watch with a comfortable silicone strap, luminous hands, date display and multifunction styling. An excellent classic gift option.', '750', m6),
  product('GW-L001', "POEDAGAR Rhinestone Ladies' Watch", CATEGORIES.LADIES, 'An elegant POEDAGAR stainless-steel ladies’ watch with a waterproof quartz movement and refined rhinestone accents, designed for daily occasions and gifting.', '650', l1),
  product('GW-L002', "CURREN Blanche Ladies' Watch", CATEGORIES.LADIES, 'A stylish CURREN Blanche watch with a comfortable rubber strap and a clean feminine design, ideal for work, occasions and daily elegance.', '450', l2),
  product('GW-L003', "Golden Stainless-Steel Ladies' Watch", CATEGORIES.LADIES, 'A fashionable golden ladies’ quartz watch with an elegant round dial and stainless-steel strap. A sophisticated accessory for daily wear and holidays.', '280 each', l3),
  product('GW-L004', 'Vintage Polygon Dial Bracelet Watch', CATEGORIES.LADIES, 'A distinctive ladies’ bracelet watch with a creative polygon dial and vintage British-inspired styling. Made to elevate celebrations, parties and special occasions.', '290', l4),
  product('GW-L005', 'Rose Gold Watch & Jewellery Set', CATEGORIES.LADIES, 'An elegant four-piece rose-gold-tone set featuring a pink-dial rhinestone watch, a sparkling bracelet, heart bangle and infinity-symbol bracelet.', '450', l5),
  product('GW-L006', 'Rose Gold Watch & Jewellery Set', CATEGORIES.LADIES, 'An elegant four-piece rose-gold-tone set featuring a pink-dial rhinestone watch, a sparkling bracelet, heart bangle and infinity-symbol bracelet.', '450', l6),
  product('GW-U001', 'Casio W-218HC Digital Watch', CATEGORIES.UNISEX, 'The Casio W-218HC features a fresh milk-white square case, LED light, multi-function digital display and 50-metre water resistance. A practical everyday sports watch.', '899', u1),
  product('GW-U002', 'Digital Sports Watch Set', CATEGORIES.UNISEX, 'A two-piece set of casual digital sports watches with backlight, stopwatch and calendar functions. Suitable for daily wear, outdoor activities and gifting.', '700 for both', u2),
  product('GW-U003', 'GUESS Matte Square Watch', CATEGORIES.UNISEX, 'A distinctive GUESS square watch with an all-matte finish, embossed triangle-logo dial and integrated silicone band. A bold street-style statement.', '2,100', u3),
  product('GW-U004', 'BINBOND Couple Watch Set', CATEGORIES.UNISEX, 'A matching two-piece BINBOND couple watch set with Roman-numeral dials, stainless-steel bands and water-resistant quartz movements. Made for meaningful gifting.', '900 for both', u4),
  product('GW-U005', 'Elegant Couple Watch Set', CATEGORIES.UNISEX, 'A two-piece unisex quartz watch set with soft stainless-steel bands and an elegant matching design. A thoughtful choice for everyday wear and Valentine’s gifting.', '500', u5),
  product('GW-U006', '2.01-Inch Touchscreen Smartwatch', CATEGORIES.UNISEX, 'A full-screen touchscreen smartwatch with calling, step and calorie tracking, multi-sport modes, alerts and wireless Android connectivity.', '399', u6),
  product('GW-J001', '18K Gold-Plated Leaf Bracelet', CATEGORIES.JEWELLERY, 'A premium 18K gold-plated leaf-shaped bracelet, accented with cubic zirconia for a delicate, luminous finish.', '400', j1),
  product('GW-J002', 'Zirconia Rabbit Pendant Set', CATEGORIES.JEWELLERY, 'A charming stainless-steel jewellery set featuring a zirconia rabbit pendant necklace and matching earrings. A lovely gift-ready accessory.', '225', j2),
  product('GW-J003', 'Rhinestone Water Drop Jewellery Set', CATEGORIES.JEWELLERY, 'A classic three-piece jewellery set with water-drop-shaped necklace, earrings and bracelet, beautifully finished with rhinestones for parties and daily wear.', '420', j3),
  product('GW-J004', 'Zirconia Tennis Bracelet', CATEGORIES.JEWELLERY, 'A durable pure-copper tennis bracelet with glittering synthetic zirconia. Its versatile unisex hip-hop style makes a standout luxury accessory.', '600', j4),
  product('GW-J005', 'Lion & Sun Pendant Necklace', CATEGORIES.JEWELLERY, 'A vintage-inspired stainless-steel pendant necklace featuring a bold lion and sun motif in a gold-and-silver-tone finish.', '280', j5),
  product('GW-J006', 'Zirconia Earring Set', CATEGORIES.JEWELLERY, 'A versatile set of stainless-steel cross and teardrop zirconia stud earrings, designed for comfortable low-allergy wear and effortless gifting.', '399', j6),
]

export const getProductByReference = (reference) => products.find((p) => p.reference === reference)
export const getProductsByCategory = (category) => products.filter((p) => p.category === category)
