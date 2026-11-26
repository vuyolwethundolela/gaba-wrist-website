// Online payment (PayFast). The browser never sees the merchant key:
// it asks our server function to price + sign the order, then forwards the customer to PayFast.
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const onlinePaymentsAvailable = Boolean(url && key)

export async function startOnlinePayment(products, customer) {
  const response = await fetch(`${url}/functions/v1/create-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: key, Authorization: `Bearer ${key}` },
    body: JSON.stringify({ items: products.map((p) => p.id), customer }),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Online payment is unavailable right now. Please order via WhatsApp.')

  // Hand the customer to PayFast's secure payment page
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = data.action
  for (const [name, value] of data.fields) {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = value
    form.appendChild(input)
  }
  document.body.appendChild(form)
  form.submit()
}
