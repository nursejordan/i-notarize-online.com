import React from 'react';
import { Separator } from './ui/separator';
import { Mail, Phone, MapPin, Shield, ExternalLink } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Remote Notarization", href: "#services" },
        { name: "Mobile Notary", href: "#services" },
        { name: "Document Preparation", href: "#services" },
        { name: "Bulk Services", href: "#pricing" },
        { name: "Emergency Service", href: "#contact" }
      ]
    },
    {
      title: "Information",
      links: [
        { name: "How It Works", href: "#how-it-works" },
        { name: "Pricing", href: "#pricing" },
        { name: "Coverage Area", href: "#coverage" },
        { name: "FAQ", href: "#" },
        { name: "Legal Requirements", href: "#" }
      ]
    },
    {
      title: "Platform Partners",
      links: [
        { name: "OneNotary.us", href: "https://onenotary.us/become-an-online-notary/", external: true },
        { name: "BlueNotary.us", href: "https://bluenotary.us/for-notaries", external: true },
        { name: "Become a Notary", href: "#", external: true },
        { name: "Partner Network", href: "#" }
      ]
    }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Accessibility", href: "#" }
  ];

  return (
    <footer style={{ background: 'var(--text-primary)', color: 'white' }}>
      <div className="container">
        {/* Main Footer Content */}
        <div className="pad-xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Business Info */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <h3 className="heading-2" style={{ color: 'white' }}>
                  i-Notarize-Online
                </h3>
                <p className="body-small mt-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Professional notary services by Yordanos Mathewos. 
                  Licensed, bonded, and insured in New York State.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={16} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                  <span className="body-small" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                  <span className="body-small" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    yordanos@i-notarize-online.com
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                  <span className="body-small" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    New York State<br />
                    Serving Greater NYC Area & Worldwide
                  </span>
                </div>
              </div>

              {/* License Info */}
              <div className="mt-6 p-3 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={16} style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                  <span className="caption font-semibold" style={{ color: 'white' }}>
                    NYS Licensed Notary
                  </span>
                </div>
                <p className="caption" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  License #NY-2024-001234<br />
                  Bonded & Insured • $10,000 Surety Bond
                </p>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="body-medium font-semibold mb-4" style={{ color: 'white' }}>
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="body-small hover:text-white transition-colors flex items-center gap-1"
                        style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                      >
                        {link.name}
                        {link.external && (
                          <ExternalLink size={12} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator style={{ background: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Bottom Footer */}
        <div className="pad-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="caption" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                © 2024 i-Notarize-Online.com • Yordanos Mathewos, Notary Public
              </p>
              <p className="caption" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                All rights reserved. Licensed in New York State.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="caption hover:text-white transition-colors"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Compliance & Security Notice */}
          <div className="mt-6 pt-4 text-center" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <p className="caption" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              All remote notarizations comply with New York Electronic Signature and Records Act (ESRA) • 
              Secure platform with end-to-end encryption • Documents stored securely and deleted after 30 days
            </p>
          </div>

          {/* Emergency Contact */}
          <div className="mt-4 text-center">
            <p className="caption" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              <strong>Emergency Service Available 24/7</strong> • 
              Call <a href="tel:5551234567" className="hover:text-white">(555) 123-4567</a> for urgent notarizations
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;