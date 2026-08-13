import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { EnquiryProvider } from './context/EnquiryContext.jsx'
import ReviewSection from './components/ReviewSection.jsx'
import PublicReviewTicker from './components/PublicReviewTicker.jsx'

import Home from './pages/Home.jsx'
import MensWatches from './pages/MensWatches.jsx'
import LadiesWatches from './pages/LadiesWatches.jsx'
import UnisexWatches from './pages/UnisexWatches.jsx'
import Jewellery from './pages/Jewellery.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <EnquiryProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mens-watches" element={<MensWatches />} />
            <Route path="/ladies-watches" element={<LadiesWatches />} />
            <Route path="/unisex-watches" element={<UnisexWatches />} />
            <Route path="/jewellery" element={<Jewellery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <ReviewSection />
        <PublicReviewTicker />
        <Footer />
      </div>
    </EnquiryProvider>
  )
}
