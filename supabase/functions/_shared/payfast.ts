import { createHash } from "node:crypto";

export const PAYFAST_PROCESS_URL = (sandbox: boolean) =>
  sandbox ? "https://sandbox.payfast.co.za/eng/process" : "https://www.payfast.co.za/eng/process";
export const PAYFAST_VALIDATE_URL = (sandbox: boolean) =>
  sandbox ? "https://sandbox.payfast.co.za/eng/query/validate" : "https://www.payfast.co.za/eng/query/validate";

/** PHP-style urlencode, which is what PayFast expects when it builds/verifies signatures. */
export const pfEncode = (value: string) =>
  encodeURIComponent(value.trim())
    .replace(/%20/g, "+")
    .replace(/[!'()*~]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());

const md5 = (text: string) => createHash("md5").update(text).digest("hex");

/** Signature for the outgoing payment form. Fields must be in PayFast's documented order. */
export function signFields(fields: [string, string][], passphrase: string): string {
  let str = fields.filter(([, v]) => v !== "").map(([k, v]) => `${k}=${pfEncode(v)}`).join("&");
  if (passphrase) str += `&passphrase=${pfEncode(passphrase)}`;
  return md5(str);
}

/** From the raw ITN body: the param string without the signature (used for both checks). */
export function itnParamString(rawBody: string): { paramString: string; signature: string } {
  const parts = rawBody.split("&").filter(Boolean);
  const sig = parts.find((p) => p.startsWith("signature="));
  return {
    paramString: parts.filter((p) => !p.startsWith("signature=")).join("&"),
    signature: sig ? decodeURIComponent(sig.slice(10)) : "",
  };
}

export function verifyItnSignature(rawBody: string, passphrase: string): boolean {
  const { paramString, signature } = itnParamString(rawBody);
  const str = passphrase ? `${paramString}&passphrase=${pfEncode(passphrase)}` : paramString;
  return signature !== "" && md5(str) === signature.toLowerCase();
}

/** "699", "2,100", "R450" or "700 for both" -> number. Anything else -> null (not payable online). */
export function parsePrice(text: unknown): number | null {
  const m = String(text ?? "").trim().match(/^R?\s*(\d[\d,]*(?:\.\d{1,2})?)(?:\s+for\s+both)?$/i);
  if (!m) return null;
  const n = Number(m[1].replace(/,/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

export const cors = (origin: string) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  Vary: "Origin",
});
