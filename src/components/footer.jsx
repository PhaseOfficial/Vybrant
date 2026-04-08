import React from 'react';
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Footer Links */}
          <div className="mb-4 md:mb-0 flex flex-wrap justify-center">
            <Link to="/" className="text-gray-300 hover:text-white px-2">Home</Link>
            <Link to="/About" className="text-gray-300 hover:text-white px-2">About</Link>
            <Link to="/Services" className="text-gray-300 hover:text-white px-2">Services</Link>
            <Link to="/Contact" className="text-gray-300 hover:text-white px-2">Contact</Link>
            <Link to="/privacy-policy" className="text-gray-300 hover:text-white px-2 border-l border-gray-600">Privacy Policy</Link>
            <Link to="/terms-of-use" className="text-gray-300 hover:text-white px-2 border-l border-gray-600">Terms of Use</Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://wa.me/4407828402043" className="hover:text-white">
            <IoLogoWhatsapp className="w-6 h-6"/>

            </a>
            <a href="https://www.instagram.com/vybrantcareservices/#" className="hover:text-white">
            <AiFillInstagram className="w-6 h-6"/>
            </a>
            <a href="https://www.facebook.com/vybrantcareservices" className="hover:text-white">
            <FaFacebook className="w-6 h-6"/>
            </a>
            <a href="https://www.linkedin.com/in/vybrantcareservices" className="hover:text-white">
            <FaLinkedin className="w-6 h-6"/>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm">&copy; 2025 Vybrant Care Services. All rights reserved.</p>
            <p className="text-xs mt-1">
              Website by <a href="https://web.redcupseries.co.zw" target="_blank" rel="noopener noreferrer" className="hover:text-white underline transition-colors">RedCupSeries</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
