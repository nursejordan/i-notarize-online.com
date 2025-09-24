import React from 'react';
import { Card, CardContent } from './ui/card';
import { Calendar, Video, FileCheck, Download } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Calendar,
      number: "01",
      title: "Book Appointment",
      description: "Schedule your notarization session at your convenience. Choose between remote or mobile service.",
      details: ["Select date & time", "Provide document details", "Receive confirmation"]
    },
    {
      icon: Video,
      number: "02", 
      title: "Verify Identity",
      description: "Join secure video session where I verify your identity and witness document signing.",
      details: ["Government ID required", "Knowledge-based questions", "Document review"]
    },
    {
      icon: FileCheck,
      number: "03",
      title: "Complete Notarization",
      description: "I apply my official notary seal and signature to your documents during the session.",
      details: ["Digital notary seal", "Official signature", "Compliance certification"]
    },
    {
      icon: Download,
      number: "04",
      title: "Receive Documents",
      description: "Get your notarized documents immediately via secure download or scheduled delivery.",
      details: ["Instant digital delivery", "Certified copies", "Tamper-evident security"]
    }
  ];

  return (
    <section className="pad-xl" style={{ background: 'var(--bg-section)' }} id="how-it-works">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-1 mb-4">How It Works</h2>
          <p className="body-large max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Simple, secure, and legally compliant notarization in four easy steps. 
            The entire process typically takes 15-30 minutes.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="voice-card hover-lift text-center">
              <CardContent className="pt-6">
                {/* Step Number */}
                <div className="flex justify-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mono-text text-lg font-bold"
                    style={{ background: 'var(--text-primary)', color: 'white' }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg" style={{ background: 'var(--glass-bg)' }}>
                    <step.icon size={28} style={{ color: 'var(--text-primary)' }} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="heading-3 mb-3">{step.title}</h3>
                <p className="body-small mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {step.description}
                </p>

                {/* Details */}
                <ul className="space-y-1 text-left">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="caption flex items-center gap-2">
                      <div 
                        className="w-1 h-1 rounded-full"
                        style={{ background: 'var(--text-primary)' }}
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <div className="max-w-3xl mx-auto p-6 rounded-lg" style={{ background: 'var(--bg-card)' }}>
            <h3 className="heading-3 mb-3">What You Need</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="body-medium font-semibold mb-2">Valid ID</h4>
                <p className="caption">Government-issued photo ID (driver's license, passport, state ID)</p>
              </div>
              <div>
                <h4 className="body-medium font-semibold mb-2">Device & Internet</h4>
                <p className="caption">Computer, tablet, or smartphone with camera and stable internet</p>
              </div>
              <div>
                <h4 className="body-medium font-semibold mb-2">Your Documents</h4>
                <p className="caption">Documents ready to sign (digital format for remote sessions)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;