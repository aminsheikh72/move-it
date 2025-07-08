import { Link } from 'react-router-dom';
import { Truck, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-400 pt-12 pb-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Truck className="text-primary-500" size={24} />
              <span className="text-xl font-bold text-white">Move<span className="text-primary-500">it</span></span>
            </div>
            <p className="text-gray-400 mb-4">
              We provide efficient and reliable transportation services for all your needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary-500 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary-500 transition-colors">Services</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-primary-500 transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-primary-500 transition-colors">Register</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">2-Wheeler Transport</li>
              <li className="text-gray-400">3-Wheeler Transport</li>
              <li className="text-gray-400">4-Wheeler Transport</li>
              <li className="text-gray-400">Heavy Truck Transport</li>
              <li className="text-gray-400">Urgent Delivery</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">192 Transport nagar, indore</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary-500 flex-shrink-0" />
                <span className="text-gray-400">+91 9329394737</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-primary-500 flex-shrink-0" />
                <span className="text-gray-400">aminsheikh9065@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-gray-500 text-center">
            © {new Date().getFullYear()} Move it. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;