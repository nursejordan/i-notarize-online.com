import React, { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { name: 'Services', href: '#services' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Coverage', href: '#coverage' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className="header-nav">
      <div className="container">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center">
            <div className="logo-container">
              <span className="heading-2" style={{ color: 'var(--text-primary)' }}>
                i-Notarize-Online
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="body-medium hover:text-opacity-80 transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <Phone size={16} />
              <span className="mono-text">(555) 123-4567</span>
            </div>
            <Button className="btn-primary">
              Book Now
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="btn-nav">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="body-large hover:text-opacity-80 transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
                  <div className="flex items-center space-x-2 mb-4">
                    <Phone size={16} />
                    <span className="mono-text">(555) 123-4567</span>
                  </div>
                  <Button className="btn-primary w-full">
                    Book Appointment
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;