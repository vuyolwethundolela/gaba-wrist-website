// PayFast's "Instant Transaction Notification" (ITN) webhook. This is the ONLY thing that marks an order paid.
// Checks: (1) signature, (2) merchant id, (3) amount matches OUR stored total, (4) PayFast confirms the data server-to-server.
import { createClient } from "npm:@supabase/supabase-js@2";
import { itnParamString, PAYFAST_VALIDATE_URL, verifyItnSignature } from "../_shared/payfast.ts";

const env = (k: string) => Deno.env.get(k) ?? "";
const SANDBOX = env("PAYFAST_SANDBOX") === "true";
const db = createClient(env("SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"));
const ok = () => new Response("OK", { status: 200 });
const bad = (why: string) => { console.error("ITN rejected:", why); return new Response("Rejected", { status: 400 }); };

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  if (!SANDBOX && !env("PAYFAST_PASSPHRASE")) return bad("live mode needs a passphrase");
  const raw = await req.text();
  const data = Object.fromEntries(new URLSearchParams(raw));

  if (!verifyItnSignature(raw, env("PAYFAST_PASSPHRASE"))) return bad("bad signature");
  if (data.merchant_id !== env("PAYFAST_MERCHANT_ID")) return bad("merchant mismatch");

  // Ask PayFast to confirm this exact data is genuine
  const check = await fetch(PAYFAST_VALIDATE_URL(SANDBOX), {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: itnParamString(raw).paramString,
  });
  if ((await check.text()).trim() !== "VALID") return bad("PayFast did not confirm");

  const { data: order } = await db.from("orders").select("id,total,status").eq("id", data.m_payment_id).maybeSingle();
  if (!order) return bad("unknown order");
  if (order.status === "paid") return ok(); // already handled (PayFast can retry)

  if (data.payment_status === "COMPLETE") {
    const matches = Number(data.amount_gross).toFixed(2) === Number(order.total).toFixed(2);
    await db.from("orders").update(matches
      ? { status: "paid", pf_payment_id: data.pf_payment_id, paid_at: new Date().toISOString() }
      : { status: "amount_mismatch", pf_payment_id: data.pf_payment_id }).eq("id", order.id);
    if (!matches) console.error("Amount mismatch on order", order.id, data.amount_gross, order.total);
  } else if (data.payment_status === "FAILED") {
    await db.from("orders").update({ status: "failed" }).eq("id", order.id).eq("status", "pending");
  } else if (data.payment_status === "CANCELLED") {
    await db.from("orders").update({ status: "cancelled" }).eq("id", order.id).eq("status", "pending");
  }
  return ok();
});
