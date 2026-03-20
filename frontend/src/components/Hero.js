import React from 'react';
import { Button } from './ui/button';
import { Shield, Clock, Globe, CheckCircle, Phone } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-content">
        {/* Announcement Badge */}
        <div className="hero-announcement" style={{ 
          background: 'rgba(59, 130, 246, 0.12)', 
          border: '1px solid rgba(59, 130, 246, 0.25)',
          padding: '1.5rem 2rem',
          borderRadius: '1rem'
        }}>
          <div className="text-center space-y-3">
            <div className="heading-2" style={{ 
              color: '#1E40AF', 
              fontWeight: '700',
              letterSpacing: '0.025em',
              marginBottom: '0.75rem'
            }}>
              YORDANOS MATHEWOS
            </div>
            
            <div className="flex items-center justify-center gap-2" style={{ marginBottom: '0.5rem' }}>
              <Shield size={16} style={{ color: '#3B82F6' }} />
              <span className="body-medium font-semibold" style={{ 
                color: '#3B82F6',
                letterSpacing: '0.05em'
              }}>
                NY STATE LICENSED NOTARY
              </span>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Phone size={16} style={{ color: '#1E40AF' }} />
              <span className="heading-3 font-bold" style={{ 
                color: '#1E40AF',
                letterSpacing: '0.025em'
              }}>
                (929) 866-0037
              </span>
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
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <div className="flex items-center gap-3 bg-white bg-opacity-80 px-4 py-2 rounded-full">
            <Clock size={20} style={{ color: '#3B82F6' }} />
            <span className="body-medium font-semibold">Ready in 15 Minutes</span>
          </div>
          <div className="flex items-center gap-3 bg-white bg-opacity-80 px-4 py-2 rounded-full">
            <Globe size={20} style={{ color: '#3B82F6' }} />
            <span className="body-medium font-semibold">Available 24/7 Worldwide</span>
          </div>
          <div className="flex items-center gap-3 bg-white bg-opacity-80 px-4 py-2 rounded-full">
            <CheckCircle size={20} style={{ color: '#3B82F6' }} />
            <span className="body-medium font-semibold">100% Legally Binding</span>
          </div>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button className="btn-primary" size="lg" style={{ background: '#3B82F6', minHeight: '3.5rem', fontSize: '1.1rem' }}>
            BOOK REMOTE NOTARIZATION
          </Button>
          <Button className="btn-secondary" size="lg" style={{ minHeight: '3.5rem', fontSize: '1.1rem' }}>
            📍 Request Mobile Service
          </Button>
        </div>

        {/* Urgency/Trust Statement */}
        <div className="text-center mb-8">
          <p className="body-small" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
            ⚡ <strong>Urgent documents?</strong> Same-day service available • No hidden fees • Satisfaction guaranteed
          </p>
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