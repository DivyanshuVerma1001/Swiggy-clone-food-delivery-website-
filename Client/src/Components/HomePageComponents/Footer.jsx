import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const resourcesLinks = [
    { name: 'How it Works', path: '/how-it-works' },
    { name: 'Offers', path: '/offers' },
    { name: 'Partner with Us', path: '/partner' },
    { name: 'Help Center', path: '/help' },
  ];

  const contactInfo = [
    { icon: '📍', text: 'Street Number-10, Rohini Sector-23, Delhi, India' },
    { icon: '📧', text: 'support@fooddelivery.com' },
    { icon: '📞', text: '+91 1112222334' },
  ];

  return (
    <footer className="bg-slate-800 text-white py-12 ">
      <div className="w-[80%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo + Description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1">
            <img
              src="/assets/whiteLogo.png"
              alt="Logo"
              className="w-20 h-auto"
            />
            <p className="text-5xl font-bold">Tastify</p>
            </div>
            <p className="text-gray-400 text-sm">
              Fast and fresh food delivery from your favorite restaurants.
            </p>
            <div className="flex space-x-4 mt-2">
              {['facebook', 'twitter', 'instagram'].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* placeholder icon, replace with real social icons */}
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourcesLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              {contactInfo.map((info, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-400">
                  <span>{info.icon}</span>
                  <span>{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} FoodDelivery. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
