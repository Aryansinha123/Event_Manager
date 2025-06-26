import React from 'react';
import { Instagram, Twitter, Linkedin, Facebook, Youtube, Github, Mail, Phone, MapPin } from 'lucide-react';

const CreativeFooter = () => {
  const socialLinks = [
    { name: 'Instagram', icon: Instagram, url: '#', color: 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500' },
    { name: 'Twitter', icon: Twitter, url: '#', color: 'hover:bg-blue-500' },
    { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'hover:bg-blue-600' },
    { name: 'Facebook', icon: Facebook, url: '#', color: 'hover:bg-blue-700' },
    { name: 'YouTube', icon: Youtube, url: '#', color: 'hover:bg-red-600' },
    { name: 'GitHub', icon: Github, url: '#', color: 'hover:bg-gray-700' }
  ];

  const footerLinks = {
    'Company': ['About Us', 'Our Team', 'Careers', 'News', 'Contact'],
    'Services': ['Web Design', 'Development', 'SEO', 'Marketing', 'Consulting'],
    'Resources': ['Blog', 'Documentation', 'Help Center', 'Privacy Policy', 'Terms of Service']
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center text-white text-2xl text-center py-20">
        <div>
          <h1 className="text-4xl font-bold mb-4">Your Amazing Website</h1>
          <p className="text-lg opacity-80">Scroll down to see the footer!</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white relative overflow-hidden">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand section */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold mb-6 relative">
                YourBrand
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Creating amazing digital experiences that inspire and connect people around the world.
              </p>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>hello@yourbrand.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>New York, NY</span>
                </div>
              </div>
            </div>

            {/* Footer links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-lg font-semibold mb-6 relative">
                  {title}
                  <div className="absolute -bottom-2 left-0 w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:translate-x-1 inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social media section */}
          <div className="text-center mb-12">
            <h4 className="text-xl font-semibold mb-6">Connect With Us</h4>
            <div className="flex justify-center gap-4 flex-wrap">
              {socialLinks.map(({ name, icon: Icon, url, color }) => (
                <a
                  key={name}
                  href={url}
                  className={`group relative w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25 ${color}`}
                  aria-label={name}
                >
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {name}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom footer */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © 2024 YourBrand. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-400 rounded-full blur-xl"></div>
        </div>
      </footer>
    </div>
  );
};

export default CreativeFooter;