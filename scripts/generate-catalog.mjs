// Builds supabase/functions/_shared/catalog.json from src/data/products.js
// so the payment server knows the REAL prices of the built-in products.
// Run:  npm run catalog   (then redeploy: supabase functions deploy create-payment)
import { readFileSync, writeFileSync } from 'node:fs'

const src = readFileSync('src/data/products.js', 'utf8')
const catalog = {}
for (const line of src.split('\n')) {
  const m = line.match(/^\s*product\(\s*(['"])(GW-[A-Z0-9]+)\1\s*,\s*(['"])(.+?)\3\s*,.*,\s*(['"])([^'"]+)\5\s*,\s*\w+\s*\)\s*,?\s*$/)
  if (m) catalog[m[2]] = { name: m[4], price: m[6] }
}
const count = Object.keys(catalog).length
const declared = (src.match(/^\s*product\(/gm) || []).length
if (count !== declared) {
  console.error(`Parsed ${count} of ${declared} products - check the format of products.js`)
  process.exit(1)
}
writeFileSync('supabase/functions/_shared/catalog.json', JSON.stringify(catalog, null, 2) + '\n')
console.log(`Wrote ${count} products to supabase/functions/_shared/catalog.json`)
