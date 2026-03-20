import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { CheckCircle, Download, Mail, Phone } from 'lucide-react';
import { apiService } from '../services/api';

const FAQ = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = [
    {
      id: "legal-validity",
      question: "Are remote notarizations legally binding?",
      answer: "Yes! Remote Online Notarization (RON) is legally binding and recognized in most US states. New York allows RON for documents that will be used outside the state. All remote sessions are recorded, encrypted, and comply with NY Electronic Signature and Records Act (ESRA).",
      category: "Legal"
    },
    {
      id: "what-needed",
      question: "What do I need for a remote notarization session?",
      answer: "You need: (1) A government-issued photo ID (driver's license, passport, or state ID), (2) A device with camera and stable internet connection, (3) Your unsigned documents in digital format (PDF preferred), (4) A quiet, well-lit space for the video session.",
      category: "Process"
    },
    {
      id: "session-length", 
      question: "How long does the notarization process take?",
      answer: "Most remote sessions take 15-30 minutes depending on the number of documents. Mobile sessions may take longer based on complexity. I always allow extra time to ensure everything is handled properly without rushing.",
      category: "Process"
    },
    {
      id: "weekend-service",
      question: "Do you provide services on weekends and holidays?",
      answer: "Yes! Remote services are available 24/7 including weekends and holidays. Mobile services are available on weekends by appointment. For urgent same-day service, call (929) 866-0037 directly.",
      category: "Availability"
    },
    {
      id: "document-types",
      question: "What types of documents can you notarize?",
      answer: "I can notarize most legal documents including: Real estate documents, Powers of Attorney, Wills & Trusts, Loan documents, Affidavits, Contracts, Medical forms, Financial documents, and more. Contact me if you're unsure about your specific document.",
      category: "Services"
    },
    {
      id: "pricing-additional",
      question: "Are there any additional fees beyond the base price?",
      answer: "No hidden fees! Remote notarization is $25 per document. Additional services: Document scanning ($10), Rush processing under 2 hours ($15), Certified copies ($5 each). Mobile service starts at $75 plus travel fees depending on location.",
      category: "Pricing"
    },
    {
      id: "identity-verification",
      question: "How do you verify my identity remotely?",
      answer: "I use a secure multi-step process: (1) Government ID verification using advanced scanning technology, (2) Knowledge-based authentication questions, (3) Live video interaction to confirm you match your ID, (4) Electronic signature capture with audit trail.",
      category: "Security"
    },
    {
      id: "document-security",
      question: "How secure are my documents during the process?",
      answer: "Your documents are highly secure. All sessions use end-to-end encryption, recordings are stored on secure servers with tamper-evident technology, documents are deleted after 30 days per regulations, and I'm bonded and insured with $10,000 coverage.",
      category: "Security"
    },
    {
      id: "mobile-coverage",
      question: "Where do you provide mobile notary services?",
      answer: "I serve the greater NYC area including Manhattan, Brooklyn, Queens, Bronx, Staten Island, Long Island, and Westchester. Travel fees: Free within 10 miles, $25 flat rate to outer boroughs, $1/mile beyond 25 miles.",
      category: "Coverage"
    },
    {
      id: "emergency-service",
      question: "Can you handle emergency or urgent notarizations?",
      answer: "Absolutely! For urgent situations, call (929) 866-0037 directly. Rush processing is available for an additional $15 and can usually be completed within 2 hours. Remote services are available 24/7 for true emergencies.",
      category: "Emergency"
    }
  ];

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for email subscription
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Email subscription failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadGuide = () => {
    // Create a simple text guide (in production, this would be a PDF)
    const guideContent = `
NOTARIZATION PREPARATION CHECKLIST
By Yordanos Mathewos, NY State Licensed Notary

BEFORE YOUR REMOTE SESSION:
✓ Valid government-issued photo ID ready
✓ Documents in PDF format, UNSIGNED
✓ Good lighting and quiet space
✓ Stable internet connection
✓ Camera and microphone working

REQUIRED DOCUMENTS:
• Driver's License, Passport, or State ID
• Original unsigned documents
• Any additional identification if required

MOBILE NOTARY CHECKLIST:
✓ All parties present with valid ID
✓ Documents ready for signing
✓ Payment method available
✓ Quiet, professional environment

QUESTIONS? Call (929) 866-0037 or email yordanos@i-notarize-online.com

© 2024 i-Notarize-Online.com - Professional Notary Services
    `;

    const blob = new Blob([guideContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Notarization-Preparation-Guide.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="pad-xl" style={{ background: 'var(--bg-page)' }} id="faq">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-1 mb-4">Frequently Asked Questions</h2>
          <p className="body-large max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Get quick answers to common questions about remote and mobile notary services. 
            Don't see your question? Contact me directly at <strong>(929) 866-0037</strong>.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Accordion */}
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="voice-card hover-lift"
                >
                  <AccordionTrigger className="text-left p-4">
                    <div>
                      <span className="caption text-blue-600 font-semibold mb-1 block">
                        {faq.category}
                      </span>
                      <span className="heading-3">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Lead Capture Sidebar */}
          <div className="space-y-6">
            {/* Free Guide Download */}
            <Card className="voice-card accent-blue">
              <CardContent className="pt-6 text-center">
                <Download size={32} style={{ color: '#3B82F6' }} className="mx-auto mb-4" />
                <h3 className="heading-3 mb-3">Free Notarization Guide</h3>
                <p className="body-small mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Download our complete preparation checklist to ensure your notarization goes smoothly.
                </p>
                <Button 
                  onClick={downloadGuide}
                  className="btn-primary w-full"
                >
                  <Download size={16} className="mr-2" />
                  Download Free Guide
                </Button>
              </CardContent>
            </Card>

            {/* Email Capture */}
            <Card className="voice-card">
              <CardContent className="pt-6">
                <Mail size={32} style={{ color: '#3B82F6' }} className="mx-auto mb-4" />
                <h3 className="heading-3 mb-3 text-center">Stay Informed</h3>
                <p className="body-small mb-4 text-center" style={{ color: 'var(--text-secondary)' }}>
                  Get notary tips, legal updates, and special offers delivered to your inbox.
                </p>
                
                {!isSubscribed ? (
                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button 
                      type="submit" 
                      className="btn-primary w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe for Free'}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center p-4 rounded-lg" style={{ background: 'var(--accent-blue-100)' }}>
                    <CheckCircle size={24} style={{ color: '#3B82F6' }} className="mx-auto mb-2" />
                    <p className="body-small font-semibold" style={{ color: '#3B82F6' }}>
                      Thank you for subscribing!
                    </p>
                  </div>
                )}
                
                <p className="caption text-center mt-3" style={{ color: 'var(--text-muted)' }}>
                  No spam, unsubscribe anytime
                </p>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="voice-card accent-green">
              <CardContent className="pt-6 text-center">
                <Phone size={32} style={{ color: '#16A34A' }} className="mx-auto mb-4" />
                <h3 className="heading-3 mb-3">Need Immediate Help?</h3>
                <p className="body-small mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Have a specific question or urgent notarization need?
                </p>
                <Button 
                  className="btn-primary w-full"
                  style={{ background: '#16A34A' }}
                  onClick={() => window.location.href = 'tel:9298660037'}
                >
                  <Phone size={16} className="mr-2" />
                  Call (929) 866-0037
                </Button>
                <p className="caption mt-2" style={{ color: 'var(--text-muted)' }}>
                  Available 24/7 for emergencies
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="text-center mt-12">
          <Card className="voice-card max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="heading-2 mb-3">Ready to Get Started?</h3>
              <p className="body-large mb-6" style={{ color: 'var(--text-secondary)' }}>
                Professional notarization services available now. Book your remote session 
                or request mobile service today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="btn-primary" 
                  size="lg"
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                >
                  Book Remote Session - $25
                </Button>
                <Button 
                  className="btn-secondary" 
                  size="lg"
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                >
                  Request Mobile Service
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQ;