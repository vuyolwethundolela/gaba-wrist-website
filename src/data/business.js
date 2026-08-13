// ---------------------------------------------------------------------------
// GABA WRIST — Business information
// This is the single source of truth for contact details used site-wide.
// Update values here to change them everywhere on the website.
// ---------------------------------------------------------------------------

export const business = {
  name: 'Gaba Wrist',
  tagline: 'LUXURY STYLE WITHIN REACH',
  owner: 'Sibusiso Sebini',
  email: 'Sibusisosebini17@gmail.com',
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
 * Constructs the full, structured WhatsApp enquiry message for a product.
 * The complete product description (which already contains the price) is
 * included exactly as stored in the product data — never shortened, and the
 * customer is never asked about pricing anywhere in this message.
 *
 * @param {object} product - { name, reference, category, description }
 * @param {object} customer - { name, area, fulfillment: 'collect'|'deliver', message }
 */
export function buildProductEnquiryMessage(products, customer) {
  const fulfillmentLine =
    customer.fulfillment === 'collect'
      ? 'I will collect the item.'
      : 'I would like the item delivered.'

  const lines = [
    `Hello ${business.name},`,
    '',
    `I would like to enquire about the following item${products.length > 1 ? 's' : ''}:`,
    '',
    ...products.flatMap((product, index) => [
      `Product ${index + 1}: ${product.name}`,
      `Reference: ${product.reference}`,
      `Category: ${product.category}`,
      'Description:',
      product.description,
      '',
    ]),
    '',
    'Customer Details:',
    `Name: ${customer.name}`,
    `Residential Area: ${customer.area}`,
    '',
    'Collection / Delivery:',
    fulfillmentLine,
  ]

  if (customer.message && customer.message.trim().length > 0) {
    lines.push('', 'Additional Message:', customer.message.trim())
  }

  lines.push('', 'Thank you.')

  return lines.join('\n')
}
