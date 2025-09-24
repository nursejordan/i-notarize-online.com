import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Phone, Mail, Calendar, MapPin, Clock, Loader2 } from 'lucide-react';
import { apiService } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    document_type: '',
    preferred_date: '',
    message: ''
  });

  const [businessHours, setBusinessHours] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    // Load business hours on component mount
    const loadBusinessHours = async () => {
      const result = await apiService.getBusinessHours();
      if (result.success) {
        setBusinessHours(result.data);
      }
    };
    loadBusinessHours();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear submit status when user starts typing again
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Convert form data to match API expectations
      const apiData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service_type: formData.service_type,
        document_type: formData.document_type || undefined,
        preferred_date: formData.preferred_date || undefined,
        message: formData.message || undefined,
        urgency: 'normal'
      };

      const result = await apiService.submitContactForm(apiData);
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.data.message,
          reference: result.data.reference
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service_type: '',
          document_type: '',
          preferred_date: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit form. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      value: "(555) 123-4567",
      description: "Call for immediate assistance",
      action: "tel:5551234567"
    },
    {
      icon: Mail,
      title: "Email", 
      value: "yordanos@i-notarize-online.com",
      description: "Send us your questions",
      action: "mailto:yordanos@i-notarize-online.com"
    },
    {
      icon: Calendar,
      title: "Schedule",
      value: "Book Online",
      description: "Schedule your appointment",
      action: "#"
    }
  ];

  return (
    <section className="pad-xl" style={{ background: 'var(--bg-section)' }} id="contact">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-1 mb-4">Get Started Today</h2>
          <p className="body-large max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Ready to notarize your documents? Contact Yordanos Mathewos for professional, 
            secure, and convenient notary services.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="voice-card">
              <CardHeader>
                <CardTitle className="heading-2">Request Service</CardTitle>
                <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                  Fill out the form below and we'll contact you within 1 hour to confirm your appointment.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="body-small font-semibold mb-2 block">Full Name *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full legal name"
                        required
                      />
                    </div>
                    <div>
                      <label className="body-small font-semibold mb-2 block">Email Address *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="body-small font-semibold mb-2 block">Phone Number *</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                    <div>
                      <label className="body-small font-semibold mb-2 block">Service Type *</label>
                      <Select onValueChange={(value) => handleInputChange('service_type', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remote">Remote Notarization ($25)</SelectItem>
                          <SelectItem value="mobile">Mobile Service (Custom)</SelectItem>
                          <SelectItem value="bulk">Bulk Services (Quote)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="body-small font-semibold mb-2 block">Document Type</label>
                      <Select onValueChange={(value) => handleInputChange('documentType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="real-estate">Real Estate Documents</SelectItem>
                          <SelectItem value="power-attorney">Power of Attorney</SelectItem>
                          <SelectItem value="will-trust">Will & Trust</SelectItem>
                          <SelectItem value="loan">Loan Documents</SelectItem>
                          <SelectItem value="affidavit">Affidavit</SelectItem>
                          <SelectItem value="contract">Contract/Agreement</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="body-small font-semibold mb-2 block">Preferred Date</label>
                      <Input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="body-small font-semibold mb-2 block">
                      Additional Information
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us about your specific needs, urgency, location (for mobile service), or any questions you have..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="btn-primary w-full" size="lg">
                    Send Request
                  </Button>

                  <p className="caption text-center" style={{ color: 'var(--text-muted)' }}>
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Direct Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <Card key={index} className="voice-card hover-lift">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg" style={{ background: 'var(--glass-bg)' }}>
                        <method.icon size={20} style={{ color: 'var(--text-primary)' }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="body-medium font-semibold">{method.title}</h3>
                        <p className="body-small" style={{ color: 'var(--text-primary)' }}>
                          {method.value}
                        </p>
                        <p className="caption" style={{ color: 'var(--text-muted)' }}>
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Business Hours */}
            <Card className="voice-card accent-blue">
              <CardHeader>
                <CardTitle className="heading-3 flex items-center gap-2">
                  <Clock size={20} />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 body-small">
                  <div className="flex justify-between">
                    <span>Remote Service:</span>
                    <span className="font-semibold">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mobile Service:</span>
                    <span>8 AM - 8 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone Support:</span>
                    <span>7 AM - 10 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekend:</span>
                    <span>Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Service */}
            <Card className="voice-card accent-green">
              <CardContent className="pt-4">
                <div className="text-center">
                  <h3 className="body-medium font-semibold mb-2">Need Urgent Service?</h3>
                  <p className="caption mb-3" style={{ color: 'var(--text-secondary)' }}>
                    Rush processing available for time-sensitive documents
                  </p>
                  <Button className="btn-primary w-full" size="sm">
                    Call for Emergency Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;