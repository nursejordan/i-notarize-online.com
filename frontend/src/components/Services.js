import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Monitor, MapPin, FileText, Clock, Shield, Globe } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Monitor,
      title: "Remote Online Notarization",
      description: "Secure video-based notarization from anywhere in the world. Perfect for busy professionals and urgent documents.",
      features: ["24/7 Availability", "Legally Binding", "Instant Delivery"],
      price: "Starting at $25",
      accent: "accent-blue"
    },
    {
      icon: MapPin,
      title: "Mobile Notary Service",
      description: "I come to you anywhere in the greater New York area. Perfect for real estate closings and bulk documents.",
      features: ["Same-Day Service", "NYC Metro Area", "Volume Discounts"],
      price: "Custom Pricing",
      accent: "accent-green"
    },
    {
      icon: FileText,
      title: "Document Preparation",
      description: "Professional assistance with document review and preparation to ensure everything is ready for notarization.",
      features: ["Document Review", "Error Prevention", "Compliance Check"],
      price: "Additional Service",
      accent: "accent-grey"
    }
  ];

  const documentTypes = [
    "Real Estate Documents",
    "Power of Attorney",
    "Wills & Trusts",
    "Loan Documents",
    "Affidavits",
    "Contracts & Agreements",
    "Medical Forms",
    "Financial Documents"
  ];

  return (
    <section className="pad-xl" style={{ background: 'var(--bg-page)' }} id="services">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-1 mb-4">Professional Notary Services</h2>
          <p className="body-large max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Comprehensive notarization solutions for individuals and businesses. 
            Licensed, bonded, and insured in New York State.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <Card key={index} className={`voice-card ${service.accent} hover-lift`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg" style={{ background: 'var(--glass-bg)' }}>
                    <service.icon size={24} style={{ color: 'var(--text-primary)' }} />
                  </div>
                  <span className="caption" style={{ color: 'var(--text-muted)' }}>
                    {service.price}
                  </span>
                </div>
                <CardTitle className="heading-3">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="body-small mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 body-small">
                      <Shield size={14} style={{ color: 'var(--text-primary)' }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Document Types */}
        <div className="text-center">
          <h3 className="heading-2 mb-6">Documents We Notarize</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {documentTypes.map((doc, index) => (
              <div 
                key={index} 
                className="p-3 rounded-lg text-center hover-lift"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)' }}
              >
                <span className="body-small">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;