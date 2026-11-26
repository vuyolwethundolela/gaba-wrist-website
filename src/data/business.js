// ---------------------------------------------------------------------------
// GABA WRIST — Business information
// This is the single source of truth for contact details used site-wide.
// Update values here to change them everywhere on the website.
// ---------------------------------------------------------------------------

export const business = {
  name: 'Gaba Wrist',
  tagline: 'LUXURY STYLE WITHIN REACH',
  owner: 'Sibusiso Sebini',
  email: 'gababusinessholding@gmail.com',
  // Raw number as supplied by the owner (South African local format)
  whatsappDisplay: '068 410 1972',
  // International format, digits only, required for the wa.me deep link
  whatsappIntl: '27684101972',
  facebook: 'https://www.facebook.com/share/17UZTycdQW/',
  tiktok: 'https://www.tiktok.com/@gaba_wrist?_r=1&_t=ZS-98pc1jDyudm',
  instagram: 'https://www.instagram.com/gaba_wrist?utm_source=qr&igsh=eGdnMWhibjJ6dHgy',
}

export const mailtoHref = `mailto:${business.email}?subject=${encodeURIComponent('Gaba Wrist enquiry')}&body=${encodeURIComponent('Hello Gaba Wrist,\n\nI would like to enquire about your collection.\n\nKind regards,')}`

/**
 * Builds the click-to-chat WhatsApp URL for a given pre-written message.
 * The message is left in the chat box, ready for the customer to press Send.
 */
export function buildWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${business.whatsappIntl}?text=${encoded}`
}

/**
 * Builds a general "chat with us" WhatsApp URL (used outside of the product
 * enquiry flow, e.g. footer / contact page CTAs).
 */
export function buildGeneralWhatsAppUrl() {
  const message = `Hello ${business.name}, I would like to find out more about your collection.`
  return buildWhatsAppUrl(message)
}

export function buildGeneralEnquiryMessage({ name, enquiryType }) {
  return [`Hello ${business.name},`, '', `My name is ${name}.`, `I am enquiring about: ${enquiryType}.`, '', 'Thank you.'].join('\n')
}

export function buildProductEmailHref(products) {
  const productLines = products.map((product) => `Product: ${product.name}\nReference: ${product.reference}\nCategory: ${product.category}\nDescription: ${product.description}`).join('\n\n')
  const subject = products.length > 1 ? 'Gaba Wrist enquiry — selected items' : `Gaba Wrist enquiry — ${products[0].name}`
  const body = `Hello Gaba Wrist,\n\nI would like to enquire about the following item${products.length > 1 ? 's' : ''}:\n\n${productLines}\n\nName:\nResidential area / suburb:\n\nKind regards,`
  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/**
 * Reads the price text (e.g. "699", "1,250", "700 for both") out of a product
 * description that ends with "Price: R....".
 */
export function getProductPriceText(product) {
  const match = product.description.match(/Price:\s*R(.+?)\.\s*$/i)
  return match ? match[1].trim() : null
}

const formatRand = (amount) => `R${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

/**
 * Adds up the prices of the selected items. Returns null when any price is
 * not a plain number (for example "700 for both"), so no wrong total is shown.
 */
export function getOrderTotalText(products) {
  let total = 0
  for (const product of products) {
    const priceText = getProductPriceText(product)
    if (!priceText || !/^[\d,]+(\s+for both)?$/i.test(priceText)) return null
    total += Number(priceText.replace(/\s+for both$/i, '').replace(/,/g, ''))
  }
  return formatRand(total)
}

/**
 * Builds the WhatsApp order message for the cart. Online payment is not live
 * yet, so the payment status is stated as not yet paid.
 *
 * @param {object[]} products - items in the cart
 * @param {object} customer - { name, mobile, area, address, fulfillment: 'collect'|'deliver', message }
 */
export function buildProductEnquiryMessage(products, customer) {
  const plural = products.length > 1
  const total = getOrderTotalText(products)
  const fulfillmentLine =
    customer.fulfillment === 'collect'
      ? `I will collect the item${plural ? 's' : ''}.`
      : `I would like the item${plural ? 's' : ''} delivered.`

  const lines = [
    `Hello ${business.name},`,
    '',
    `I would like to order the following item${plural ? 's' : ''}:`,
    '',
    ...products.map((product, index) => {
      const price = getProductPriceText(product)
      return `${index + 1}. ${product.name} (${product.reference})${price ? ` - R${price}` : ''}`
    }),
    '',
    `Total: ${total || 'to be confirmed'}`,
    'Payment status: Not yet paid',
    '',
    'Customer details:',
    `Name: ${customer.name}`,
    `Mobile number: ${customer.mobile}`,
    `Residential area: ${customer.area}`,
  ]

  if (customer.fulfillment === 'deliver' && customer.address && customer.address.trim()) {
    lines.push(`Delivery address: ${customer.address.trim()}`)
  }

  lines.push('', 'Collection / Delivery:', fulfillmentLine)

  if (customer.message && customer.message.trim().length > 0) {
    lines.push('', 'Additional message:', customer.message.trim())
  }

  lines.push('', 'Thank you.')

  return lines.join('\n')
}
