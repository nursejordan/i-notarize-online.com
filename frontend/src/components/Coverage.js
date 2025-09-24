import React from 'react';
import { Card, CardContent } from './ui/card';
import { MapPin, Globe, Clock, Phone } from 'lucide-react';

const Coverage = () => {
  const nycAreas = [
    "Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island",
    "Long Island", "Westchester", "Nassau County", "Suffolk County"
  ];

  const remoteStates = [
    "All 50 US States", "Washington DC", "Puerto Rico", 
    "International (US Citizens)", "Military (APO/FPO)"
  ];

  return (
    <section className="pad-xl" style={{ background: 'var(--bg-page)' }} id="coverage">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-1 mb-4">Service Coverage Area</h2>
          <p className="body-large max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Comprehensive notary services wherever you are. Mobile service throughout 
            New York area, remote service worldwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mobile Service Coverage */}
          <Card className="voice-card accent-green hover-lift">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg" style={{ background: 'var(--glass-bg)' }}>
                  <MapPin size={28} style={{ color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <h3 className="heading-3">Mobile Notary Service</h3>
                  <p className="caption" style={{ color: 'var(--text-muted)' }}>
                    I come to your location
                  </p>
                </div>
              </div>

              <p className="body-small mb-4" style={{ color: 'var(--text-secondary)' }}>
                Professional mobile notary service throughout the greater New York metropolitan area. 
                Perfect for real estate closings, business documents, and bulk notarizations.
              </p>

              <div className="mb-6">
                <h4 className="body-medium font-semibold mb-3">Coverage Areas:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {nycAreas.map((area, index) => (
                    <div 
                      key={index} 
                      className="p-2 rounded text-center caption"
                      style={{ background: 'var(--bg-section)' }}
                    >
                      {area}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 body-small">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Same-day and next-day appointments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>Evening and weekend availability</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Remote Service Coverage */}
          <Card className="voice-card accent-blue hover-lift">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg" style={{ background: 'var(--glass-bg)' }}>
                  <Globe size={28} style={{ color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <h3 className="heading-3">Remote Online Notarization</h3>
                  <p className="caption" style={{ color: 'var(--text-muted)' }}>
                    Available worldwide
                  </p>
                </div>
              </div>

              <p className="body-small mb-4" style={{ color: 'var(--text-secondary)' }}>
                Secure remote notarization via video conference. Available 24/7 for urgent needs. 
                Legally accepted in all states that recognize remote notarization.
              </p>

              <div className="mb-6">
                <h4 className="body-medium font-semibold mb-3">Remote Service Available:</h4>
                <div className="space-y-2">
                  {remoteStates.map((state, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 p-2 rounded"
                      style={{ background: 'var(--bg-section)' }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ background: 'var(--text-primary)' }}
                      />
                      <span className="caption">{state}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 body-small">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>24/7 availability for urgent needs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  <span>No travel required</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Travel Fees */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="voice-card">
            <CardContent className="pt-6">
              <h3 className="heading-3 text-center mb-6">Mobile Service Travel Fees</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="heading-2 mb-2" style={{ color: 'var(--text-primary)' }}>$0</div>
                  <div className="body-small font-semibold mb-1">Manhattan & Brooklyn</div>
                  <div className="caption" style={{ color: 'var(--text-muted)' }}>
                    No travel fee within 10 miles
                  </div>
                </div>
                <div className="text-center">
                  <div className="heading-2 mb-2" style={{ color: 'var(--text-primary)' }}>$25</div>
                  <div className="body-small font-semibold mb-1">Queens, Bronx, Staten Island</div>
                  <div className="caption" style={{ color: 'var(--text-muted)' }}>
                    Flat rate within boroughs
                  </div>
                </div>
                <div className="text-center">
                  <div className="heading-2 mb-2" style={{ color: 'var(--text-primary)' }}>$1/mi</div>
                  <div className="body-small font-semibold mb-1">Long Island, Westchester</div>
                  <div className="caption" style={{ color: 'var(--text-muted)' }}>
                    Per mile beyond 25 mile radius
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact for Coverage Questions */}
        <div className="text-center mt-8">
          <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
            Not sure if we service your area? <br/>
            <span className="font-semibold">Call (555) 123-4567</span> or send us a message for coverage confirmation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Coverage;