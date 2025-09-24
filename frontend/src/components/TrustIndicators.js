import React from 'react';
import { Card, CardContent } from './ui/card';
import { Shield, Award, Users, Star, FileCheck, Clock } from 'lucide-react';

const TrustIndicators = () => {
  const credentials = [
    {
      icon: Shield,
      title: "NY State Licensed",
      description: "Official notary commission in New York State",
      detail: "License #NY-2024-001234"
    },
    {
      icon: Award,
      title: "Bonded & Insured",
      description: "$10,000 surety bond and E&O insurance",
      detail: "Full protection coverage"
    },
    {
      icon: FileCheck,
      title: "Platform Certified",
      description: "Verified on OneNotary.us and BlueNotary.us",
      detail: "Trusted partner networks"
    }
  ];

  const stats = [
    { number: "500+", label: "Documents Notarized", icon: FileCheck },
    { number: "4.9", label: "Average Rating", icon: Star },
    { number: "15min", label: "Average Session Time", icon: Clock },
    { number: "24/7", label: "Service Availability", icon: Shield }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Real Estate Agent",
      content: "Yordanos made our urgent closing possible with her remote service. Professional, quick, and legally compliant. Highly recommended!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      content: "Needed multiple documents notarized for my business. The mobile service was convenient and saved me hours of travel time.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Healthcare Professional",
      content: "Perfect for my busy schedule. The remote notarization was seamless and the documents were ready immediately.",
      rating: 5
    }
  ];

  return (
    <section className="pad-xl" style={{ background: 'var(--bg-section)' }}>
      <div className="container">
        {/* Credentials */}
        <div className="text-center mb-16">
          <h2 className="heading-1 mb-4">Licensed & Trusted</h2>
          <p className="body-large mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Your documents are in safe hands with a fully licensed, bonded, and insured notary public.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {credentials.map((cred, index) => (
              <Card key={index} className="voice-card accent-blue hover-lift text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-lg" style={{ background: 'var(--glass-bg)' }}>
                      <cred.icon size={32} style={{ color: 'var(--text-primary)' }} />
                    </div>
                  </div>
                  <h3 className="heading-3 mb-2">{cred.title}</h3>
                  <p className="body-small mb-2" style={{ color: 'var(--text-secondary)' }}>
                    {cred.description}
                  </p>
                  <p className="caption" style={{ color: 'var(--text-muted)' }}>
                    {cred.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                <stat.icon size={24} style={{ color: 'var(--text-primary)' }} />
              </div>
              <div className="heading-hero mb-1">{stat.number}</div>
              <div className="body-small" style={{ color: 'var(--text-secondary)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="heading-1 mb-8">What Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="voice-card hover-lift">
                <CardContent className="pt-6">
                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill="currentColor" 
                        style={{ color: 'var(--text-primary)' }} 
                      />
                    ))}
                  </div>
                  
                  {/* Content */}
                  <p className="body-small mb-4 italic" style={{ color: 'var(--text-secondary)' }}>
                    "{testimonial.content}"
                  </p>
                  
                  {/* Author */}
                  <div className="text-center">
                    <div className="body-medium font-semibold">{testimonial.name}</div>
                    <div className="caption" style={{ color: 'var(--text-muted)' }}>
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Note */}
        <div className="max-w-3xl mx-auto text-center p-6 rounded-lg" style={{ background: 'var(--bg-card)' }}>
          <Shield size={32} style={{ color: 'var(--text-primary)' }} className="mx-auto mb-4" />
          <h3 className="heading-3 mb-3">Security & Compliance</h3>
          <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
            All remote sessions are recorded and encrypted. Documents are stored securely and 
            deleted after 30 days. Full compliance with NY Electronic Signature and Records Act (ESRA).
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;