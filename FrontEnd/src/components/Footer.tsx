import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">EduQuest</h3>
            <p className="text-gray-400">
              Empowering students through innovative online examination solutions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/about" className="hover:text-white transition">About Us</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">Contact</a>
              </li>
              <li>
                <a href="/login" className="hover:text-white transition">Login</a>
              </li>
              <li>
                <a href="/register" className="hover:text-white transition">Register</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail size={18} />
                <span>support@eduquest.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} />
                <span>+91 5551234567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={18} />
                <span>21 EduQuest, Thanjavur-613004,TamilNadu</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EduQuest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;