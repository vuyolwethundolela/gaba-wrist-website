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
import fm1 from '../assets/images/fm1.jpg'
import fm2 from '../assets/images/fm2.jpg'
import fm3 from '../assets/images/fm3.jpg'
import fm4 from '../assets/images/fm4.jpg'
import fm5 from '../assets/images/fm5.jpg'
import fm6 from '../assets/images/fm6.jpg'
import fm7 from '../assets/images/fm7.jpg'
import fm8 from '../assets/images/fm8.jpg'
import fm9 from '../assets/images/fm9.jpg'
import fw1 from '../assets/images/fw1.jpg'
import fw2 from '../assets/images/fw2.jpg'
import fw3 from '../assets/images/fw3.jpg'
import fw4 from '../assets/images/fw4.jpg'
import fw5 from '../assets/images/fw5.jpg'
import fw6 from '../assets/images/fw6.jpg'
import fw7 from '../assets/images/fw7.jpg'
import fw8 from '../assets/images/fw8.jpg'
import e1 from '../assets/images/e1.jpg'
import e2 from '../assets/images/e2.jpg'
import e3 from '../assets/images/e3.jpg'
import e4 from '../assets/images/e4.jpg'
import e5 from '../assets/images/e5.jpg'
import e6 from '../assets/images/e6.jpg'
import e7 from '../assets/images/e7.jpg'
import e8 from '../assets/images/e8.jpg'
import e9 from '../assets/images/e9.jpg'
import e10 from '../assets/images/e10.jpg'
import e11 from '../assets/images/e11.jpg'
import e12 from '../assets/images/e12.jpg'
import e13 from '../assets/images/e13.jpg'
import e14 from '../assets/images/e14.jpg'

export const CATEGORIES = { MENS: "Men's Watches", LADIES: "Ladies' Watches", UNISEX: 'Unisex Watches', JEWELLERY: 'Jewellery', EYEWEAR: 'Eyewear', FRAGRANCE_MEN: "Men's Fragrance", FRAGRANCE_WOMEN: "Women's Fragrance" }
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
  product("GW-FM001", "Blue & Homme Fragrance Gift Set", CATEGORIES.FRAGRANCE_MEN, "2pcs Flameless Fragrance Gift Set, Home Flameless Fragrance, Blending Floral And Fruit Scents, Bringing Long-Lasting Fresh Fragrance To The Air, This High-End Luxury Fragrance Product Has Long-Lasting Scent Function, Affordable Alternative To Luxury Flameless Fragrance Liquid | Long-Lasting Scent | Suitable For Bedroom, Wardrobe, Car, Home, Hotel, Office And Other Places.", "400", fm1),
  product("GW-FM002", "Arabian Sandalwood Eau De Parfum 100ml", CATEGORIES.FRAGRANCE_MEN, "Arabian Sandalwood Men's Eau De Parfum, Oriental Woody Scent, Long-Lasting Masculine Fragrance Spray For Daily & Dating, 100ML/3.4FL OZ.", "250", fm2),
  product("GW-FM003", "5-Scent Men's Cologne Gift Set", CATEGORIES.FRAGRANCE_MEN, "5pcs/Set, 10ml Men's Cologne Fragrance Spray, Gift Box Packaging, Limited Edition Indoor/Outdoor Dual-Use Fragrance Spray, Multi-Layered Pleasant Scent, Long-Lasting Natural Fresh And Charming Aroma, Suitable For Dating, Party, Gathering, Travel, Vacation, Home, Hotel, Office And Other Multiple Scenarios, Ideal Gift For Family And Friends.", "200", fm3),
  product("GW-FM004", "Black Intense For Men 100ml", CATEGORIES.FRAGRANCE_MEN, "Men's Perfume, 100ml Spray, Designer Fragrance, Rich And Long-Lasting Scent. Perfect For Gifting, Dating And Daily Wear.", "250", fm4),
  product("GW-FM005", "CEO Night Eau De Parfum 100ml", CATEGORIES.FRAGRANCE_MEN, "100ml 3.4FL.Oz CEO Men's Fragrance Spray Perfume, Strong Fragrance, Lasting Fragrance, Cologne Fragrance, Wooden Tone, A Must For Dating And Work, Gift For Boyfriend, Boy Attraction, Magic Tool.", "250", fm5),
  product("GW-FM006", "Blasting Love Cologne 50ml", CATEGORIES.FRAGRANCE_MEN, "FLATPEA 1 Bottle Men's Cologne Spray, Alcohol-Free, 50ml/1.7oz, Ocean Citrus Lavender Fragrance, Long-Lasting Scent, Suitable For Casual Daily Wear, Perfect For Morning Jog, Cafe Hangout, Weekend Cycling And More.", "150", fm6),
  product("GW-FM007", "Angel Elves 3-Piece Gift Set", CATEGORIES.FRAGRANCE_MEN, "3pcs/Set Aromatherapy Gift Box Set, Floral And Fruity Scented Diffuser, 50ml*3 Per Bottle, Portable Aromatherapy Gift Box Suitable For Daily Use On Fabrics, Clothes, Pants, Skirts, Portable Aromatherapy Liquid, Can Be Used For Home Decor, Pillows, Wardrobes, Luggage, Handbags To Freshen Air, Perfect Gift Choice.", "600", fm7),
  product("GW-FM008", "Warmkiss 4-Piece Fragrance Gift Set", CATEGORIES.FRAGRANCE_MEN, "4pcs Flameless Fragrance Gift Set. Fragrance Spray In Exquisite Gift Box. Four Long-Lasting Premium Fragrance Products With Deodorizing And Scent-Enhancing Functions. Very Suitable For Indoor Deodorizing And Scenting, Applicable To Fabrics, Clothes, Pants, Skirts And Other Daily Necessities. Portable Air Freshener. Can Be Used For Home Decor, Pillows, Wardrobes, Bags And More To Add Fragrance.", "700", fm8),
  product("GW-FM009", "24K Pure Black For Men 100ml", CATEGORIES.FRAGRANCE_MEN, "100ml 3.4FL OZ Men's Fragrance Spray – A Long-Lasting, Invigorating Scent For Men, Perfect For Dates And Everyday Wear. An Ideal Gift For Friends And Boyfriends.", "350", fm9),
  product("GW-FW001", "24K Pure Pink For Women 100ml", CATEGORIES.FRAGRANCE_WOMEN, "100ml 3.4FL OZ 24k Gold Perfume Charming Flower And Fruit Eau De Toilette - A Long-Lasting, Multi-Functional Female Perfume, Very Suitable For Dating And Daily Wear. The Ideal Gift For Friends And Girlfriends.", "350", fw1),
  product("GW-FW002", "Dignife 3-Piece Fragrance Gift Set", CATEGORIES.FRAGRANCE_WOMEN, "3pcs/Set 30ML Fragrance Gift Set, Mixed Floral & Fruity Scents, Air Freshener, Holiday Gift For Friends.", "600", fw2),
  product("GW-FW003", "Classic Eau De Toilette 100ml", CATEGORIES.FRAGRANCE_WOMEN, "100ml Perfume, Long-Lasting Fragrance, Blending Floral And Mandarin Scents, Showcasing Feminine Softness, Charm And Confidence, Suitable For Daily Work, Business And Entertainment Occasions.", "350", fw3),
  product("GW-FW004", "Glow Vanilla Fragrance 56ml", CATEGORIES.FRAGRANCE_WOMEN, "Arabian Glow Vanilla Fragrance 56ml, Luxury Middle Eastern Fragrance Spray, Warm Sweet Vanilla Oriental Scent, Long-Lasting Intense Fragrance, Elegant Unisex Fragrance Gift.", "250", fw4),
  product("GW-FW005", "Gazipoo Arabian Fragrance Mist 20ml", CATEGORIES.FRAGRANCE_WOMEN, "20ml - Dubai Arabian Style Elegant Women's Floral Fragrance Spray, Featuring Floral Scents, Plant-Based Arabian Fragrance, Long-Lasting Aroma, Ideal Gift For Girlfriend, Daughter, Wife And Friends (Valentine's Day/Anniversary).", "150", fw5),
  product("GW-FW006", "Her's Lahab Eau De Parfum 100ml", CATEGORIES.FRAGRANCE_WOMEN, "1pc 100ml Gold Crown Flameless Aroma Diffuser Liquid, Luxury Fragrance Alternative, Portable Home Fragrance Releasing Fresh Natural Floral And Fruity Notes, Gentle And Delicate Without Irritation, Suitable For Indoor, Outdoor, Cinema, Office And Other Daily Use To Remove Odors And Add Fragrance, With Fresh Air, Refreshing And Relaxing, Fatigue Relief Effects, Perfect Gift Choice.", "400", fw6),
  product("GW-FW007", "Ms. Beautiful 3-Piece Fragrance Gift Set", CATEGORIES.FRAGRANCE_WOMEN, "1 Set 3x30ml/Set Creamy Dessert Fragrance Women's Fragrance Gift Set, Combining Creamy And Dessert Scents, Long-Lasting Fragrance, Can Be Applied To Wrists, Behind Ears And Neck, Aromatherapy Essential Oil, Makes The Air Fresher, Has Refreshing And Relaxing Functions, Essential For Daily Outings, This Fragrance Gift Set Is Perfect For Personal Use Or As A Gift.", "480", fw7),
  product("GW-FW008", "Warm Kiss Butterfly Fragrance 35ml", CATEGORIES.FRAGRANCE_WOMEN, "1pc 35ml Cute Butterfly Fragrance, Women's Fragrance, Premium Flameless Aromatherapy Liquid, 8 Niche Scents To Choose From, Portable Fragrance, Releases Fresh Natural Floral And Fruity Notes, Multiple Fragrances, Natural Long-Lasting Subtle Scent, Suitable For Wrists, Behind Ears And Neck, Elegant Feminine Charm, Gentle And Non-Irritating, Creates Home Atmosphere, Freshens Air, Soothes Emotions, Relieves Fatigue, Refreshing, Suitable For Dates, Gatherings And Other Occasions, Women's Gift.", "250", fw8),
  product("GW-E001", "Large Frame Aviator Glasses", CATEGORIES.EYEWEAR, "1pc Large Frame Aviator Style New Fashion Glasses For Men, Retro Personalized Men's Glasses, Men's Driving Glasses, Outdoor Travel Holiday Beach Accessory Unisex Basic.", "250", e1),
  product("GW-E002", "Geometric Metal Frame Glasses", CATEGORIES.EYEWEAR, "1 Pair Unisex Metal Geometric Frame Small/Medium Size Casual Fashionable Fashion Glasses Festival Shades For Summer Beach Vacation,Outdoor,Travel.", "299", e2),
  product("GW-E003", "Metal Spring Punk Glasses", CATEGORIES.EYEWEAR, "1 Pair Fashion New Metal Spring Punk Style Oversized Fashion Glasses, Suitable For Outdoor Travel & Beach For Men And Women.", "199", e3),
  product("GW-E004", "Retro Punk Hollow Square Glasses", CATEGORIES.EYEWEAR, "1 Pair Unisex Retro Punk Metal Hollow Square Frame Fashion Glasses.", "250", e4),
  product("GW-E005", "Polygon Thick Frame Glasses", CATEGORIES.EYEWEAR, "1PC Men's Polygon Multi-Color Thick Frame Square Casual Retro Autumn/Winter Premium, Personalized Street Style Temple Decor Daily Commute Vacation Driving Handsome Cool Fashion Glasses Shades, Suitable For Street Photography, Travel, Dating, Beach, Etc.", "350", e5),
  product("GW-E006", "Transparent Tea Large Frame Glasses", CATEGORIES.EYEWEAR, "1 Pair Men's Transparent Tea Color Large Frame One-Piece Lens Personalized Outdoor Street Style Travel Vacation Fashion Glasses.", "300", e6),
  product("GW-E007", "SI YANG Metal Square Frame Glasses", CATEGORIES.EYEWEAR, "SY SI YANG Brand 1 Pair Men's And Women's Metal Casual Square Frame Personalized Fashion Glasses, Side Wing Decoration, Travel Walking Shopping Item, Suitable For Photography, Outfit, Driving, Outdoor Glasses.", "320", e7),
  product("GW-E008", "Cat Eye Retro Glasses (Black)", CATEGORIES.EYEWEAR, "1PC Personalized Cat Eye Retro Women's Fashion Glasses, Avant-Garde Narrow Frame Cat Eye Women's Glasses, Outdoor Travel Vacation Beach Accessory, Summer Vacation Glasses, Women's Driving Glasses.", "199", e8),
  product("GW-E009", "Cat Eye Retro Glasses (Tortoise)", CATEGORIES.EYEWEAR, "1PC Personalized Cat Eye Retro Women's Fashion Glasses, Avant-Garde Narrow Frame Cat Eye Women's Glasses, Outdoor Travel Vacation Beach Accessory, Summer Vacation Glasses, Women's Driving Glasses.", "199", e9),
  product("GW-E010", "Chain-Leg Double Bridge Aviator Glasses", CATEGORIES.EYEWEAR, "1pc Women's Metal Double Bridge Classic Aviator, Chain Leg Fashion Retro Punk Geometric Bohemian Y2K Street Neutral Shades Fashion Glasses, Suitable For Travel, Dating, Driving, Beach.", "150", e10),
  product("GW-E011", "Rimless Polygon Y2K Glasses", CATEGORIES.EYEWEAR, "1 Pair Rimless Polygon Y2K Fashion Glasses, Suitable For Party Photography And Daily Wear, Comfortable Fit, Photography Props And Accessories, Durable Eyewear.", "250", e11),
  product("GW-E012", "Oversized Fashion Glasses", CATEGORIES.EYEWEAR, "Fashion Glasses For Women, European And American Style Personalized Oversized Fashion Glasses, Outdoor Travel Street Style Beach Accessories.", "280", e12),
  product("GW-E013", "Classic Aviator Frame Glasses", CATEGORIES.EYEWEAR, "1pc Summer New Fashion Glasses Classic Aviator Frame Decorative Glasses Unisex, Y2K Personalized Retro Bohemian Metallic Cat Eye Ins Style Glasses High-End Street Style Decorative Glasses Daily Decoration, Street Photography Daily Commute. Casual Vacation, Beach, Party, Best Choice For Student Gift.", "200", e13),
  product("GW-E014", "Foldable Women's Glasses", CATEGORIES.EYEWEAR, "Foldable Women Eyewear.", "150", e14),
]

export const getProductByReference = (reference) => products.find((p) => p.reference === reference)
export const getProductsByCategory = (category) => products.filter((p) => p.category === category)
