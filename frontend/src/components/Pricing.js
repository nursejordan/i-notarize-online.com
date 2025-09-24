import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Check, Monitor, MapPin, Clock } from 'lucide-react';

const Pricing = () => {
  const pricingPlans = [
    {
      icon: Monitor,
      name: "Remote Notarization",
      price: "$25",
      period: "per document",
      description: "Perfect for single documents and urgent needs",
      features: [
        "24/7 availability",
        "Instant digital delivery", 
        "Secure video session",
        "Legally binding nationwide",
        "Customer support",
        "Document storage (30 days)"
      ],
      popular: true,
      cta: "Book Remote Session",
      accent: "accent-blue"
    },
    {
      icon: MapPin,
      name: "Mobile Service",
      price: "$75",
      period: "base fee + travel",
      description: "I come to your location in NYC area",
      features: [
        "Travel to your location",
        "Multiple documents",
        "Same-day availability",
        "Real estate specialization",
        "Bulk pricing available",
        "Professional service"
      ],
      popular: false,
      cta: "Request Mobile Service",
      accent: "accent-green"
    },
    {
      icon: Clock,
      name: "Bulk Services",
      price: "Custom",
      period: "contact for quote",
      description: "Volume discounts for businesses and law firms",
      features: [
        "Volume pricing", 
        "Priority scheduling",
        "Dedicated support",
        "Custom workflows",
        "Training included",
        "Monthly reporting"
      ],
      popular: false,
      cta: "Get Custom Quote",
      accent: "accent-grey"
    }
  ];

  const additionalServices = [
    { service: "Document scan & prep", price: "$10" },
    { service: "Rush processing (< 2 hours)", price: "$15" },
    { service: "Certified copies", price: "$5 each" },
    { service: "Apostille coordination", price: "$25" }
  ];

  return (
    <section className="pad-xl" style={{ background: 'var(--bg-page)' }} id="pricing">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-1 mb-4">Transparent Pricing</h2>
          <p className="body-large max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            No hidden fees. No surprises. Professional notary services 
            at competitive rates with flexible options for every need.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`voice-card ${plan.accent} hover-lift relative ${plan.popular ? 'border-2' : ''}`}
              style={plan.popular ? { borderColor: 'var(--text-primary)' } : {}}
            >
              {plan.popular && (
                <div 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full caption font-semibold"
                  style={{ background: 'var(--text-primary)', color: 'white' }}
                >
                  MOST POPULAR
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg" style={{ background: 'var(--glass-bg)' }}>
                    <plan.icon size={32} style={{ color: 'var(--text-primary)' }} />
                  </div>
                </div>
                <CardTitle className="heading-2">{plan.name}</CardTitle>
                <div className="mb-2">
                  <span className="heading-hero">{plan.price}</span>
                  <span className="body-small" style={{ color: 'var(--text-secondary)' }}>
                    /{plan.period}
                  </span>
                </div>
                <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 body-small">
                      <Check size={16} style={{ color: 'var(--text-primary)' }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={plan.popular ? "btn-primary w-full" : "btn-secondary w-full"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="max-w-2xl mx-auto">
          <h3 className="heading-2 text-center mb-6">Additional Services</h3>
          <Card className="voice-card">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {additionalServices.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="body-medium">{item.service}</span>
                    <span className="mono-text font-semibold">{item.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Info */}
        <div className="text-center mt-8">
          <p className="caption" style={{ color: 'var(--text-muted)' }}>
            Payment accepted: Credit cards, PayPal, Venmo, Zelle • All prices in USD • Tax included where applicable
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;