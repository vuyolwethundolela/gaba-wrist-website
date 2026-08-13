# Gaba Wrist — Website

A premium, black-and-gold responsive website for **Gaba Wrist**, a luxury watch and
jewellery brand. Built with React, Vite and Tailwind CSS.

## Running the project locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

To build a production version:

```bash
npm run build
npm run preview
```

The production build is written to the `dist/` folder — upload the contents of
that folder to any static web host (Netlify, Vercel, GitHub Pages, cPanel, etc.).

## What's included

- **Home** — auto-rotating hero slideshow (men's, ladies', unisex, jewellery), CTA, collection cards
- **Men's / Ladies' / Unisex Watches, Jewellery** — product grids with detail modal
- **About Us** and **Contact Us** pages
- **Light / Dark mode** toggle, saved in the browser (`localStorage`)
- **WhatsApp enquiry flow**: product card → "Enquire Now" → form (name, area,
  collection/delivery, optional message) → "Continue to WhatsApp" opens WhatsApp
  with a complete, pre-written message (product name, reference, category, full
  description including price, and the customer's details) ready to send
- Fully responsive: hamburger menu on mobile, adaptive product grids, no
  horizontal scrolling

## Where to make changes

| What you want to change | File |
|---|---|
| Contact details, WhatsApp number, social links | `src/data/business.js` |
| Products (add / edit / remove, prices, descriptions) | `src/data/products.js` |
| Product & hero images | `src/assets/images/` (SVG placeholders — replace with real photos, see below) |
| About Us wording | `src/pages/About.jsx` |
| Contact page wording | `src/pages/Contact.jsx` |
| Colours / brand palette | `tailwind.config.js` and `src/index.css` |

### Replacing the prototype images with real photography

The current images are simple gold/black placeholder graphics generated for
this prototype (see `scripts/gen_images.py`) so the site can be reviewed and
demoed without using anyone else's product photography.

To replace them:

1. Add your photo (e.g. `.jpg` or `.png`) to `src/assets/images/`.
2. Open `src/data/products.js`, find the `import` line for that product near
   the top of the file, and point it at your new file, e.g.:
   ```js
   import gwM001 from '../assets/images/classic-gold-mens-watch.jpg'
   ```
3. Do the same for the four hero slideshow images in
   `src/components/HeroSlider.jsx` and `src/components/CategorySection.jsx`.

### Adding a new product

Open `src/data/products.js` and copy an existing product object, then:

- Give it a unique `id` / `reference` (e.g. `GW-M004`)
- Set the correct `category`
- Write a full `description` that **ends with** `Price: RX,XXX.00` — the price
  must live inside the description, because that's what's shown on the site
  and sent to WhatsApp (there's no separate price field)
- Point `image` at the product photo

The product will automatically appear in the correct category page — no other
file needs to change.

## Tech stack

- React 18 + React Router
- Vite
- Tailwind CSS (dark/light theme via CSS variables + the `class` strategy)

## Notes

- The WhatsApp number used throughout the site is Gaba Wrist's number,
  `0684101972` (South Africa), stored in international format in
  `src/data/business.js`.
- Nothing is ever sent automatically — the enquiry form only *prepares* the
  WhatsApp message; the customer still presses Send inside WhatsApp themselves.
