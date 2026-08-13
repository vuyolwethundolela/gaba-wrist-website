import React, { createContext, useContext, useState } from 'react'
import EnquiryModal from '../components/EnquiryModal.jsx'

const EnquiryContext = createContext(null)

export function EnquiryProvider({ children }) {
  const [enquiry, setEnquiry] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState([])

  const toggleProduct = (product) => setSelectedProducts((items) => items.some((item) => item.id === product.id) ? items.filter((item) => item.id !== product.id) : [...items, product])
  const openEnquiry = (product) => {
    const products = selectedProducts.some((item) => item.id === product.id) ? selectedProducts : [...selectedProducts, product]
    setEnquiry({ type: 'product', products })
  }
  const openSelectedEnquiry = () => selectedProducts.length && setEnquiry({ type: 'product', products: selectedProducts })
  const openGeneralEnquiry = () => setEnquiry({ type: 'general' })
  const closeEnquiry = () => setEnquiry(null)

  return (
    <EnquiryContext.Provider value={{ openEnquiry, openGeneralEnquiry, selectedProducts, toggleProduct, openSelectedEnquiry }}>
      {children}
      <EnquiryModal enquiry={enquiry} onClose={closeEnquiry} />
    </EnquiryContext.Provider>
  )
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext)
  if (!ctx) throw new Error('useEnquiry must be used within an EnquiryProvider')
  return ctx
}
