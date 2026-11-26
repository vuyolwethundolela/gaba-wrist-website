// Called by the website at checkout. Prices are looked up HERE, never trusted from the browser.
import { createClient } from "npm:@supabase/supabase-js@2";
import catalog from "../_shared/catalog.json" with { type: "json" };
import { cors, parsePrice, PAYFAST_PROCESS_URL, signFields } from "../_shared/payfast.ts";

const env = (k: string) => Deno.env.get(k) ?? "";
const SITE_URL = env("SITE_URL").replace(/\/+$/, "");
const SANDBOX = env("PAYFAST_SANDBOX") === "true";
const db = createClient(env("SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"));

const clean = (v: unknown, max: number) => String(v ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);

Deno.serve(async (req) => {
  const headers = { ...cors(SITE_URL || "*"), "Content-Type": "application/json" };
  const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers });

  if (req.method === "OPTIONS") return new Response("ok", { headers });
  if (req.method !== "POST") return reply({ error: "Method not allowed" }, 405);
  if (!SITE_URL || !env("PAYFAST_MERCHANT_ID") || !env("PAYFAST_MERCHANT_KEY") || (!SANDBOX && !env("PAYFAST_PASSPHRASE"))) {
    console.error("Payment settings are missing on the server");
    return reply({ error: "Online payment is not available right now." }, 503);
  }

  let input: any;
  try { input = await req.json(); } catch { return reply({ error: "Invalid request" }, 400); }

  // ---- validate customer ----
  const c = input?.customer ?? {};
  const customer = {
    name: clean(c.name, 100), email: clean(c.email, 120), mobile: clean(c.mobile, 30),
    area: clean(c.area, 120), fulfillment: c.fulfillment === "deliver" ? "deliver" : c.fulfillment === "collect" ? "collect" : "",
    address: clean(c.address, 300), note: clean(c.message, 500),
  };
  if (!customer.name || customer.mobile.replace(/\D/g, "").length < 9 || !customer.area || !customer.fulfillment ||
      (customer.fulfillment === "deliver" && !customer.address) ||
      (customer.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customer.email))) {
    return reply({ error: "Please check your details and try again." }, 400);
  }

  // ---- price the cart on the server ----
  const ids: string[] = [...new Set<string>((Array.isArray(input?.items) ? input.items : []).map((i: unknown) => clean(i, 40)))].filter(Boolean);
  if (ids.length === 0 || ids.length > 20) return reply({ error: "Your cart is empty or too large." }, 400);

  const found = new Map<string, { name: string; price: number }>();
  const dbIds: string[] = [];
  for (const id of ids) {
    const p = (catalog as Record<string, { name: string; price: string }>)[id];
    const price = p && parsePrice(p.price);
    if (p && price) found.set(id, { name: p.name, price }); else dbIds.push(id);
  }
  if (dbIds.length) {
    const { data } = await db.from("products").select("id,name,price,is_active").in("id", dbIds).eq("is_active", true);
    for (const r of data ?? []) { const price = parsePrice(r.price); if (price) found.set(r.id, { name: r.name, price }); }
  }
  if (ids.some((id) => !found.has(id))) return reply({ error: "One or more items can't be paid for online. Please order via WhatsApp." }, 400);

  const items = ids.map((id) => ({ id, ...found.get(id)! }));
  const total = Math.round(items.reduce((s, i) => s + i.price, 0) * 100) / 100;

  // ---- save the order as pending ----
  const { data: order, error } = await db.from("orders").insert({
    items, total, customer_name: customer.name, customer_email: customer.email || null,
    customer_mobile: customer.mobile, area: customer.area, fulfillment: customer.fulfillment,
    delivery_address: customer.address || null, note: customer.note || null,
  }).select("id,reference").single();
  if (error || !order) { console.error("Order insert failed", error); return reply({ error: "Could not start your order. Please try again." }, 500); }

  // ---- build the signed PayFast form (field ORDER matters for the signature) ----
  const [first, ...rest] = customer.name.split(/\s+/);
  const itemName = items.length === 1 ? items[0].name : `Gaba Wrist order ${order.reference}`;
  const fields = ([
    ["merchant_id", env("PAYFAST_MERCHANT_ID")],
    ["merchant_key", env("PAYFAST_MERCHANT_KEY")],
    ["return_url", `${SITE_URL}/payment/success`],
    ["cancel_url", `${SITE_URL}/payment/cancelled`],
    ["notify_url", `${env("SUPABASE_URL")}/functions/v1/payfast-notify`],
    ["name_first", first.slice(0, 100)],
    ["name_last", rest.join(" ").slice(0, 100)],
    ["email_address", customer.email],
    ["m_payment_id", order.id],
    ["amount", total.toFixed(2)],
    ["item_name", itemName.slice(0, 100)],
    ["item_description", items.map((i) => i.name).join(", ").slice(0, 255)],
  ] as [string, string][]).map(([k, v]) => [k, v.trim()] as [string, string]); // posted values must equal signed values
  const signature = signFields(fields, env("PAYFAST_PASSPHRASE"));
  const out = fields.filter(([, v]) => v !== "");
  out.push(["signature", signature]);

  return reply({ action: PAYFAST_PROCESS_URL(SANDBOX), fields: out, reference: order.reference });
});
