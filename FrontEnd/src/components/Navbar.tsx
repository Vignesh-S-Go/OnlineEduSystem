import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8" />
            <span className="font-bold text-xl">EduQuest</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-indigo-200 transition">Home</Link>
            <Link to="/about" className="hover:text-indigo-200 transition">About</Link>
            <Link to="/contact" className="hover:text-indigo-200 transition">Contact</Link>
            <Link to="/login" className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 transition">Login</Link>
            <Link to="/register" className="bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-400 transition">Register</Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="hover:bg-indigo-500 px-3 py-2 rounded-md">Home</Link>
              <Link to="/about" className="hover:bg-indigo-500 px-3 py-2 rounded-md">About</Link>
              <Link to="/contact" className="hover:bg-indigo-500 px-3 py-2 rounded-md">Contact</Link>
              <Link to="/login" className="bg-white text-indigo-600 px-3 py-2 rounded-md hover:bg-indigo-100">Login</Link>
              <Link to="/register" className="bg-indigo-500 px-3 py-2 rounded-md hover:bg-indigo-400">Register</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;