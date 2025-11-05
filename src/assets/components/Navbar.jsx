

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';

const navLinks = [
  { to: '/', label: 'Inicio', isRoute: true },
  { to: '/galeria', label: 'Galería', isRoute: true },
  { href: '#services', label: 'Servicios' },
  { to: '/contacto', label: 'Contacto', isRoute: true },
  { to: '/privada', label: 'Galería Privada', isRoute: true },
];


const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-dark shadow-lg">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-4">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Aura Studio Logo"
            className="h-12 w-auto rounded-lg shadow bg-white/10 p-1"
            style={{objectFit: 'contain'}}
          />
          <span className="font-heading font-bold text-2xl sm:text-3xl tracking-wide text-white select-none">
            Aura Studio
          </span>
        </div>
        <ul className="flex gap-8 ml-8">
          {navLinks.map((link, idx) => (
            <li key={link.label + idx}>
              {link.isRoute ? (
                <Link
                  to={link.to}
                  className="text-lg font-heading font-semibold text-white hover:text-gold transition-colors duration-200 px-2 py-1 rounded"
                  style={{textDecoration: 'none'}}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="text-lg font-heading font-semibold text-white hover:text-gold transition-colors duration-200 px-2 py-1 rounded"
                  style={{textDecoration: 'none'}}
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
