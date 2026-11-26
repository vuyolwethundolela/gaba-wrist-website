import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext.jsx'
import { buildGeneralWhatsAppUrl, business } from '../data/business.js'

export default function PaymentResult({ success }) {
  const { clearSelectedProducts } = useEnquiry()
  useEffect(() => { if (success) clearSelectedProducts() }, [success])
  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="eyebrow mb-2">{success ? 'Payment received' : 'Payment cancelled'}</p>
      <h1 className="font-display text-3xl md:text-4xl">{success ? 'Thank you for your order' : 'No payment was taken'}</h1>
      <div className="gold-rule my-6" />
      <p className="text-sm text-muted">
        {success
          ? `PayFast is confirming your payment and ${business.name} will contact you on the mobile number you gave to arrange collection or delivery.`
          : 'Your cart has been kept, so you can try again whenever you are ready.'}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-gold">Back to the shop</Link>
        <a href={buildGeneralWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-outline">Chat with us</a>
      </div>
    </section>
  )
}
