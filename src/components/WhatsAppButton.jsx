import React from 'react'
import { useEnquiry } from '../context/EnquiryContext.jsx'

/**
 * Generic "chat with us" WhatsApp button. For product-specific enquiries,
 * use the EnquiryModal flow (openEnquiry) instead, which builds a message
 * containing the full product details.
 */
export default function WhatsAppButton({ label = 'CHAT WITH US', className = '', fullMessage }) {
  const { openGeneralEnquiry } = useEnquiry()

  return (
    <button
      type="button"
      onClick={fullMessage ? undefined : openGeneralEnquiry}
      {...(fullMessage ? { onClick: () => window.open(fullMessage, '_blank', 'noopener,noreferrer') } : {})}
      className={`btn-whatsapp inline-flex items-center gap-2 ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.85c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.84 11.84 0 0 0 5.64 1.44h.01c6.54 0 11.85-5.3 11.85-11.85 0-3.17-1.23-6.14-3.38-8.43ZM12.05 21.5h-.01a9.7 9.7 0 0 1-4.95-1.36l-.35-.21-3.8 1 1.02-3.7-.23-.38a9.63 9.63 0 0 1-1.48-5.15c0-5.35 4.35-9.7 9.7-9.7 2.59 0 5.02 1.01 6.85 2.85a9.62 9.62 0 0 1 2.84 6.86c0 5.35-4.35 9.7-9.6 9.7Zm5.32-7.26c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.75.94-.92 1.14-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.44a8.7 8.7 0 0 1-1.6-1.99c-.17-.29-.02-.44.13-.59.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.07-.15-.66-1.6-.91-2.2-.24-.57-.48-.5-.66-.51h-.56c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.44s1.04 2.83 1.19 3.03c.15.19 2.05 3.13 4.97 4.39.69.3 1.24.48 1.66.61.7.22 1.34.19 1.84.12.56-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34Z" />
      </svg>
      {label}
    </button>
  )
}
