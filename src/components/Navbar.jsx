import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5"; // Close icon
import { Link } from 'react-router-dom';
import GlassSurface from './GlassSurface';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={80}
        opacity={0.9}
        brightness={80}
        blur={14}
        className="sticky top-0 w-full py-4 px-6 z-50"
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl font-black font-montserrat text-white">
            P.A Mhonde
          </h1>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 text-white">
            <Link to="/Projects" className="hover:text-gray-300">Projects</Link>
            <Link to="/Resume" className="hover:text-gray-300">Resume</Link>
            <Link to="/Contact" className="hover:text-gray-300">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center px-3 py-2 text-white"
            onClick={() => setIsOpen(true)}
          >
            <GiHamburgerMenu size={26} />
          </button>
        </div>
      </GlassSurface>

      {/* Fullscreen Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center space-y-8 text-white text-3xl font-montserrat z-50 transition-all duration-300">
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-400"
            onClick={() => setIsOpen(false)}
          >
            <IoClose size={36} />
          </button>

          {/* Mobile Links */}
          <Link to="/Projects" onClick={() => setIsOpen(false)} className="hover:text-gray-400">
            Projects
          </Link>
          <Link to="/Resume" onClick={() => setIsOpen(false)} className="hover:text-gray-400">
            Resume
          </Link>
          <Link to="/Contact" onClick={() => setIsOpen(false)} className="hover:text-gray-400">
            Contact
          </Link>
        </div>
      )}
    </>
  );
}
