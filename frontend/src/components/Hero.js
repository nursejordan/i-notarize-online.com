import React from 'react';
import { Button } from './ui/button';
import { Shield, Clock, Globe, CheckCircle, Phone } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-content">
        {/* Announcement Badge */}
        <div className="hero-announcement" style={{ background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
          <div className="text-center">
            <div className="heading-3 mb-1" style={{ color: '#3B82F6', fontWeight: '700' }}>
              YORDANOS MATHEWOS
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield size={14} style={{ color: '#3B82F6' }} />
              <span className="font-semibold" style={{ color: '#3B82F6' }}>NY STATE LICENSED NOTARY</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Phone size={14} style={{ color: '#3B82F6' }} />
              <span className="font-medium" style={{ color: '#3B82F6' }}>(929) 866-0037</span>
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="hero-title heading-hero">
          Fast, Secure & Legally Binding
          <br />
          <span style={{ color: 'var(--text-secondary)' }}>Remote Notary Services</span>
          <br />
          <span style={{ color: '#3B82F6', fontSize: '0.6em', fontWeight: '600' }}>Starting at Just $25</span>
        </h1>

        {/* Enhanced Subtitle */}
        <p className="hero-subtitle body-large" style={{ color: 'var(--text-secondary)' }}>
          Get your documents notarized from anywhere in the world in just 15 minutes. 
          <br />
          <strong>Professional, convenient, and available 24/7</strong> — serving the greater New York area 
          and clients worldwide with trusted, state-licensed notarization services.
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