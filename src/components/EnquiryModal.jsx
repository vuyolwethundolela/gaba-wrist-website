import React, { useEffect, useState } from 'react'
import { buildGeneralEnquiryMessage, buildProductEnquiryMessage, buildWhatsAppUrl } from '../data/business.js'

const blankProductForm = { name: '', area: '', fulfillment: '', message: '' }
const blankGeneralForm = { name: '', enquiryType: '' }

export default function EnquiryModal({ enquiry, onClose }) {
  const isProduct = enquiry?.type === 'product'
  const [form, setForm] = useState(isProduct ? blankProductForm : blankGeneralForm)
  const [errors, setErrors] = useState({})
  useEffect(() => { if (enquiry) { setForm(enquiry.type === 'product' ? blankProductForm : blankGeneralForm); setErrors({}) } }, [enquiry])
  useEffect(() => { if (!enquiry) return; const onKey = (event) => event.key === 'Escape' && onClose(); document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' } }, [enquiry, onClose])
  if (!enquiry) return null
  const setField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (isProduct) { if (!form.area.trim()) next.area = 'Please enter your residential area or suburb.'; if (!form.fulfillment) next.fulfillment = 'Please choose collection or delivery.' }
    else if (!form.enquiryType) next.enquiryType = 'Please choose what you are enquiring about.'
    setErrors(next); if (Object.keys(next).length) return
    const message = isProduct ? buildProductEnquiryMessage(enquiry.products, form) : buildGeneralEnquiryMessage(form)
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer'); onClose()
  }
  return <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-8 animate-fade" role="dialog" aria-modal="true" onClick={onClose}>
    <div className="relative w-full max-w-lg gold-border p-6 md:p-8" style={{ backgroundColor: 'var(--bg-elevated)' }} onClick={(event) => event.stopPropagation()}>
      <button type="button" onClick={onClose} aria-label="Close enquiry form" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center border text-lg" style={{ borderColor: 'var(--border)', color: 'var(--gold)' }}>&times;</button>
      <p className="eyebrow mb-2">{isProduct ? 'Product Enquiry' : 'WhatsApp Enquiry'}</p>
      <h2 className="font-display text-2xl">{isProduct ? `${enquiry.products.length} selected item${enquiry.products.length > 1 ? 's' : ''}` : 'How can we help?'}</h2>
      {isProduct && <p className="mt-2 text-xs text-muted">{enquiry.products.map((product) => product.name).join(' · ')}</p>}
      <div className="gold-rule my-5" />
      <form onSubmit={submit} noValidate className="space-y-5">
        {!isProduct && <div><span className="mb-2 block text-xs tracking-widest2 uppercase text-muted">Your enquiry</span><div className="space-y-2">{['More information about the business', 'A business opportunity'].map((type) => <label key={type} className="flex cursor-pointer items-center gap-2 border px-3 py-2.5 text-sm" style={{ borderColor: form.enquiryType === type ? 'var(--gold)' : 'var(--border)' }}><input type="radio" name="enquiryType" value={type} checked={form.enquiryType === type} onChange={setField('enquiryType')} className="accent-[var(--gold)]" />{type}</label>)}</div>{errors.enquiryType && <p className="mt-1 text-xs text-[#c96a5c]">{errors.enquiryType}</p>}</div>}
        <div><label htmlFor="name" className="mb-1.5 block text-xs tracking-widest2 uppercase text-muted">Full Name</label><input id="name" value={form.name} onChange={setField('name')} className="w-full border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[var(--gold)]" style={{ borderColor: errors.name ? '#b04a3f' : 'var(--border)' }} placeholder="e.g. John Doe" />{errors.name && <p className="mt-1 text-xs text-[#c96a5c]">{errors.name}</p>}</div>
        {isProduct && <><div><label htmlFor="area" className="mb-1.5 block text-xs tracking-widest2 uppercase text-muted">Residential Area / Suburb</label><input id="area" value={form.area} onChange={setField('area')} className="w-full border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[var(--gold)]" style={{ borderColor: errors.area ? '#b04a3f' : 'var(--border)' }} placeholder="e.g. Milnerton" />{errors.area && <p className="mt-1 text-xs text-[#c96a5c]">{errors.area}</p>}</div><div><span className="mb-2 block text-xs tracking-widest2 uppercase text-muted">Collection or Delivery</span><div className="flex gap-3"><label className="flex flex-1 cursor-pointer items-center gap-2 border px-3 py-2.5 text-sm" style={{ borderColor: form.fulfillment === 'collect' ? 'var(--gold)' : 'var(--border)' }}><input type="radio" name="fulfillment" value="collect" checked={form.fulfillment === 'collect'} onChange={setField('fulfillment')} />Collect</label><label className="flex flex-1 cursor-pointer items-center gap-2 border px-3 py-2.5 text-sm" style={{ borderColor: form.fulfillment === 'deliver' ? 'var(--gold)' : 'var(--border)' }}><input type="radio" name="fulfillment" value="deliver" checked={form.fulfillment === 'deliver'} onChange={setField('fulfillment')} />Delivery</label></div>{errors.fulfillment && <p className="mt-1 text-xs text-[#c96a5c]">{errors.fulfillment}</p>}</div><div><label htmlFor="message" className="mb-1.5 block text-xs tracking-widest2 uppercase text-muted">Additional Message <span className="normal-case">(optional)</span></label><textarea id="message" rows={3} value={form.message} onChange={setField('message')} className="w-full resize-none border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[var(--gold)]" style={{ borderColor: 'var(--border)' }} /></div></>}
        <button type="submit" className="btn-whatsapp w-full text-center">Continue to WhatsApp</button>
      </form>
    </div>
  </div>
}
