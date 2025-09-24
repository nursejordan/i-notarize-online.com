import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import TrustIndicators from '../components/TrustIndicators';
import Coverage from '../components/Coverage';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Pricing />
        <TrustIndicators />
        <Coverage />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;