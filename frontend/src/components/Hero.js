import React from 'react';
import { Button } from './ui/button';
import { Shield, Clock, Globe, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-content">
        {/* Announcement Badge */}
        <div className="hero-announcement">
          <Shield size={14} />
          <span>NY State Licensed Notary</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-title heading-hero">
          Fast, Secure Remote Notary Services
          <br />
          <span style={{ color: 'var(--text-secondary)' }}>Starting at $25</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle body-large" style={{ color: 'var(--text-secondary)' }}>
          Get your documents notarized from anywhere in the world. 
          Professional remote notarization services by Yordanos Mathewos, 
          serving greater New York area and worldwide clients.
        </p>

        {/* Key Benefits */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Clock size={18} style={{ color: 'var(--text-primary)' }} />
            <span className="body-medium">Available 24/7</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={18} style={{ color: 'var(--text-primary)' }} />
            <span className="body-medium">Worldwide Service</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={18} style={{ color: 'var(--text-primary)' }} />
            <span className="body-medium">Legally Binding</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="btn-primary" size="lg">
            Book Remote Notarization - $25
          </Button>
          <Button className="btn-secondary" size="lg">
            Request Mobile Service
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <p className="caption mb-4" style={{ color: 'var(--text-muted)' }}>
            TRUSTED PLATFORM PARTNERS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <span className="mono-text">OneNotary.us</span>
            <span className="mono-text">BlueNotary.us</span>
            <span className="mono-text">NY State Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;