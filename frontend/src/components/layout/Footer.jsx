import React from 'react';
import { Globe, Mail, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark-bg text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img 
                src="/logo.png" 
                alt="SkillCraft Logo" 
                className="h-10 w-auto object-contain invert brightness-125" 
              />
              <span className="font-bold text-2xl text-white tracking-tight">SkillCraft</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering learners worldwide with production-grade skills. Build your future today.
            </p>
            <div className="flex space-x-4">
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors" title="Platform Website"><Globe className="h-5 w-5" /></Link>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=8123ankitprs@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="Send Email"><Mail className="h-5 w-5" /></a>
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors" title="Platform Info"><Info className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/courses" className="hover:text-primary-400 transition-colors">Browse Courses</Link></li>
              <li><Link to="/pricing" className="hover:text-primary-400 transition-colors">Pricing</Link></li>
              <li><Link to="/mentors" className="hover:text-primary-400 transition-colors">Our Mentors</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-primary-400 transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-primary-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SkillCraft Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
