import React, { useEffect, useState } from 'react'
import { buildGeneralEnquiryMessage, buildProductEnquiryMessage, buildWhatsAppUrl, getOrderTotalText } from '../data/business.js'
import { trackEvent } from '../data/track.js'
import { onlinePaymentsAvailable, startOnlinePayment } from '../data/payments.js'

const blankProductForm = { name: '', email: '', mobile: '', area: '', address: '', fulfillment: '', message: '' }
const blankGeneralForm = { name: '', enquiryType: '' }

export default function EnquiryModal({ enquiry, onClose }) {
  const isProduct = enquiry?.type === 'product'
  const whatsappOnly = enquiry?.mode === 'whatsapp'
  const showPay = isProduct && onlinePaymentsAvailable && !whatsappOnly
  const [form, setForm] = useState(isProduct ? blankProductForm : blankGeneralForm)
  const [errors, setErrors] = useState({})
  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState('')
  useEffect(() => { if (enquiry) { setForm(enquiry.type === 'product' ? blankProductForm : blankGeneralForm); setErrors({}); setPayError(''); setPaying(false) } }, [enquiry])
  useEffect(() => { if (!enquiry) return; const onKey = (event) => event.key === 'Escape' && onClose(); document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' } }, [enquiry, onClose])
  if (!enquiry) return null
  const setField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))
  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (isProduct) { if (form.mobile.replace(/\D/g, '').length < 9) next.mobile = 'Please enter a valid mobile number.'; if (!form.area.trim()) next.area = 'Please enter your residential area or suburb.'; if (!form.fulfillment) next.fulfillment = 'Please choose collection or delivery.'; if (form.fulfillment === 'deliver' && !form.address.trim()) next.address = 'Please enter your delivery address.' }
    else if (!form.enquiryType) next.enquiryType = 'Please choose what you are enquiring about.'
    if (isProduct && form.email.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) next.email = 'Please enter a valid email address.'
    setErrors(next); return Object.keys(next).length === 0
  }
  const payOnline = async (event) => {
    event.preventDefault()
    if (!validate() || paying) return
    setPaying(true); setPayError('')
    try {
      enquiry.products.forEach((product) => trackEvent('checkout_started', { product_id: product.id, product_name: product.name, category: product.category }))
      await startOnlinePayment(enquiry.products, form)
    } catch (error) { setPayError(error.message); setPaying(false) }
  }
  const submit = (event) => {
    event.preventDefault()
    if (!validate()) return
    const message = isProduct ? buildProductEnquiryMessage(enquiry.products, form) : buildGeneralEnquiryMessage(form)
    if (isProduct) {
      enquiry.products.forEach((product) =>
        trackEvent('enquiry', { product_id: product.id, product_name: product.name, category: product.category })
      )
    }
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer'); onClose()
  }
  return <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-8 animate-fade" role="dialog" aria-modal="true" onClick={onClose}>
    <div className="relative w-full max-w-lg gold-border p-6 md:p-8" style={{ backgroundColor: 'var(--bg-elevated)' }} onClick={(event) => event.stopPropagation()}>
      <button type="button" onClick={onClose} aria-label="Close enquiry form" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center border text-lg" style={{ borderColor: 'var(--border)', color: 'var(--gold)' }}>&times;</button>
      <p className="eyebrow mb-2">{isProduct ? (whatsappOnly ? 'Order on WhatsApp' : 'Checkout') : 'WhatsApp Enquiry'}</p>
      <h2 className="font-display text-2xl">{isProduct ? `${enquiry.products.length} item${enquiry.products.length > 1 ? 's' : ''} in your cart` : 'How can we help?'}</h2>
      {isProduct && <p className="mt-2 text-xs text-muted">{enquiry.products.map((product) => product.name).join(' · ')}</p>}
      {isProduct && <p className="mt-2 text-sm" style={{ color: 'var(--gold)' }}>Total: {getOrderTotalText(enquiry.products) || 'to be confirmed'}</p>}
      {isProduct && <p className="mt-2 text-xs text-muted">{whatsappOnly ? 'Your order details will be sent to us on WhatsApp.' : 'Pay securely online by card or instant EFT through PayFast, or send your order on WhatsApp instead.'}</p>}
      <div className="gold-rule my-5" />
      <form onSubmit={submit} noValidate className="space-y-5">
        {!isProduct && <div><span className="mb-2 block text-xs tracking-widest2 uppercase text-muted">Your enquiry</span><div className="space-y-2">{['More information about the business', 'A business opportunity'].map((type) => <label key={type} className="flex cursor-pointer items-center gap-2 border px-3 py-2.5 text-sm" style={{ borderColor: form.enquiryType === type ? 'var(--gold)' : 'var(--border)' }}><input type="radio" name="enquiryType" value={type} checked={form.enquiryType === type} onChange={setField('enquiryType')} className="accent-[var(--gold)]" />{type}</label>)}</div>{errors.enquiryType && <p className="mt-1 text-xs text-[#c96a5c]">{errors.enquiryType}</p>}</div>}
        <div><label htmlFor="name" className="mb-1.5 block text-xs tracking-widest2 uppercase text-muted">Full Name</label><input id="name" value={form.name} onChange={setField('name')} className="w-full border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[var(--gold)]" style={{ borderColor: errors.name ? '#b04a3f' : 'var(--border)' }} placeholder="e.g. John Doe" />{errors.name && <p className="mt-1 text-xs text-[#c96a5c]">{errors.name}</p>}</div>
        {isProduct && <><div><label htmlFor="email" className="mb-1.5 block text-xs tracking-widest2 uppercase text-muted">Email <span className="normal-case">(for your payment receipt)</span></label><input id="email" type="email" inputMode="email" value={form.email} onChange={setField('email')} className="w-full border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[var(--gold)]" style={{ borderColor: errors.email ? '#b04a3f' : 'var(--border)' }} placeholder="e.g. john@example.com" />{errors.email && <p className="mt-1 text-xs text-[#c96a5c]">{errors.email}</p>}</div><div><label htmlFor="mobile" className="mb-1.5 block text-xs tracking-widest2 uppercase text-muted">Mobile Number</label><input id="mobile" type="tel" inputMode="tel" value={form.mobile} onChange={setField('mobile')} className="w-full border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[var(--gold)]" style={{ borderColor: errors.mobile ? '#b04a3f' : 'var(--border)' }} placeholder="e.g. 082 123 4567" />{errors.mobile && <p className="mt-1 text-xs text-[#c96a5c]">{errors.mobile}</p>}</div><div><label htmlFor="area" className="mb-1.5 block text-xs tracking-widest2 uppercase text-muted">Residential Area / Suburb</label><input id="area" value={form.area} onChange={setField('area')} className="w-full border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[var(--gold)]" style={{ borderColor: errors.area ? '#b04a3f' : 'var(--border)' }} placeholder="e.g. Milnerton" />{errors.area && <p className="mt-1 text-xs text-[#c96a5c]">{errors.area}</p>}</div><div><span className="mb-2 block text-xs tracking-widest2 uppercase text-muted">Collection or Delivery</span><div className="flex gap-3"><label className="flex flex-1 cursor-pointer items-center gap-2 border px-3 py-2.5 text-sm" style={{ borderColor: form.fulfillment === 'collect' ? 'var(--gold)' : 'var(--border)' }}><input type="radio" name="fulfillment" value="collect" checked={form.fulfillment === 'collect'} onChange={setField('fulfillment')} />Collect</label><label className="flex flex-1 cursor-pointer items-center gap-2 border px-3 py-2.5 text-sm" style={{ borderColor: form.fulfillment === 'deliver' ? 'var(--gold)' : 'var(--border)' }}><input type="radio" name="fulfillment" value="deliver" checked={form.fulfillment === 'deliver'} onChange={setField('fulfillment')} />Delivery</label></div>{errors.fulfillment && <p className="mt-1 text-xs text-[#c96a5c]">{errors.fulfillment}</p>}</div>{form.fulfillment === 'deliver' && <div><label htmlFor="address" className="mb-1.5 block text-xs tracking-widest2 uppercase text-muted">Delivery Address</label><textarea id="address" rows={2} value={form.address} onChange={setField('address')} className="w-full resize-none border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[var(--gold)]" style={{ borderColor: errors.address ? '#b04a3f' : 'var(--border)' }} placeholder="Street, number, suburb" />{errors.address && <p className="mt-1 text-xs text-[#c96a5c]">{errors.address}</p>}</div>}<div><label htmlFor="message" className="mb-1.5 block text-xs tracking-widest2 uppercase text-muted">Additional Message <span className="normal-case">(optional)</span></label><textarea id="message" rows={3} value={form.message} onChange={setField('message')} className="w-full resize-none border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[var(--gold)]" style={{ borderColor: 'var(--border)' }} /></div></>}
        {showPay && <><button type="button" onClick={payOnline} disabled={paying || !getOrderTotalText(enquiry.products)} className="btn-gold w-full text-center disabled:opacity-50">{paying ? 'Taking you to PayFast…' : `Pay ${getOrderTotalText(enquiry.products) || ''} securely online`}</button>{!getOrderTotalText(enquiry.products) && <p className="text-xs text-muted">One of these items needs a price confirmed first, so please order it on WhatsApp.</p>}{payError && <p className="text-sm text-[#c96a5c]" role="alert">{payError}</p>}</>}
        <button type="submit" className={showPay ? 'btn-outline w-full text-center' : 'btn-whatsapp w-full text-center'}>{isProduct ? (showPay ? 'Order on WhatsApp instead' : 'Order on WhatsApp') : 'Continue to WhatsApp'}</button>
      </form>
    </div>
  </div>
}
