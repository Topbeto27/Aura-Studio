

import Navbar from "../assets/components/Navbar";
import logoAlt from '../assets/logo-alt.png';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-black/60 pt-32 pb-12">
        <img
          src={logoAlt}
          alt="Aura Studio Logo Inicio"
          className="h-64 w-auto rounded-3xl shadow-2xl bg-white/10 p-6 mb-10 opacity-0 animate-fade-in-down"
          style={{filter: 'drop-shadow(0 8px 32px #bfa76a)', animationDelay: '0.1s', animationFillMode: 'forwards'}}
        />
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-bold text-center mb-8 drop-shadow-lg tracking-wide opacity-0 animate-fade-in-up"
            style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
          capturamos momentos, contamos historias
        </h1>
        <div className="flex flex-col sm:flex-row gap-6 mt-4 opacity-0 animate-fade-in-up" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
          <a
            href="https://wa.me/526741170415"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-gold text-black font-heading font-bold text-xl shadow-lg hover:bg-white hover:text-gold border-2 border-gold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gold/40"
          >
            Reservar Sesión
          </a>
          <Link
            to="/galeria"
            className="px-8 py-4 rounded-full bg-transparent text-gold font-heading font-bold text-xl shadow-lg hover:bg-gold hover:text-black border-2 border-gold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gold/40"
          >
            Ver Galería
          </Link>
        </div>
      </main>
    </>
  );
}

export default Home;
