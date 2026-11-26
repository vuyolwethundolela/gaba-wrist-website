# Online payments (PayFast) — setup guide

How it works: the website sends **item IDs + customer details** to the `create-payment` function.
The function looks up the real prices, saves a *pending* order, signs the payment and returns it.
The customer pays on PayFast's own page. PayFast then calls `payfast-notify`, which checks the
signature, the merchant, the amount and asks PayFast to confirm — and only then marks the order **paid**.
Card details never touch this website.

## 1. PayFast dashboard
1. Log in at payfast.co.za → **Settings → Integration**.
2. **Set a Passphrase** (long and random). This is the real secret that stops forged payments. The functions refuse to run live without one.
3. Note your **Merchant ID** and **Merchant Key** on that same page.
4. For testing, create a free account at **sandbox.payfast.co.za** and use *its* merchant ID / key / passphrase first.

## 2. Supabase (one-time)
Install the CLI (`npm i -g supabase`), then from the repo folder:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF      # the bit before .supabase.co
supabase db push                                   # creates the locked-down "orders" table
```
(No CLI for the table? Paste `supabase/migrations/001_orders.sql` into Supabase → SQL Editor → Run.)

Store the secrets (they are encrypted by Supabase and never enter the repo):

```bash
supabase secrets set \
  PAYFAST_MERCHANT_ID=xxxxxxxx \
  PAYFAST_MERCHANT_KEY=xxxxxxxxxxxxx \
  PAYFAST_PASSPHRASE="your passphrase" \
  PAYFAST_SANDBOX=true \
  SITE_URL=https://your-website-address.com       # no trailing slash, exactly where the site lives
```

Deploy the two functions:

```bash
supabase functions deploy create-payment --no-verify-jwt
supabase functions deploy payfast-notify --no-verify-jwt
```

## 3. Test in sandbox
Add an item to the cart → **Pay securely online** → pay with PayFast's sandbox test wallet.
Then open Supabase → **Table Editor → orders**: the order should show `status = paid`.
Also test pressing "Cancel" on PayFast (order stays `pending`/becomes `cancelled`).

## 4. Go live
```bash
supabase secrets set PAYFAST_MERCHANT_ID=LIVE_ID PAYFAST_MERCHANT_KEY=LIVE_KEY PAYFAST_PASSPHRASE="live passphrase" PAYFAST_SANDBOX=false
```
Do one small real purchase yourself and confirm the order shows `paid`.

## Day-to-day
* **See orders:** Supabase → Table Editor → `orders` (also PayFast dashboard → Transaction history; PayFast emails you per payment).
* **Items added/edited in /admin** are priced automatically from the database.
* **Built-in items in `src/data/products.js`:** after changing a price run `npm run catalog`, commit, and redeploy: `supabase functions deploy create-payment --no-verify-jwt`.
* Prices must be a number (`699`, `2,100`) or `700 for both` to be payable online; anything else falls back to WhatsApp.

## Security checklist
- [ ] GitHub repo set to **Private** (Settings → Danger Zone → Change visibility)
- [ ] PayFast **passphrase** set
- [ ] Supabase → Authentication → turn **off** "Allow new users to sign up" (anyone who can log in to /admin can change prices)
- [ ] `products` table: only your admin account can insert/update/delete (Row Level Security)
- [ ] No merchant details in any file, `.env`, or `VITE_` variable
- [ ] Sandbox tested end-to-end before `PAYFAST_SANDBOX=false`
- [ ] Preview test
