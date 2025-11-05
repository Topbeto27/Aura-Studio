import React, { useState, useEffect } from 'react';
import { privateImages } from '../data/images'
import { resolvePaths } from '../utils/storageResolver'

const mockPassword = 'aura2025'; // Cambia esto por seguridad real en producción

const PrivateGallery = () => {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [urls, setUrls] = useState(Array(privateImages.length).fill(null))
  const [loading, setLoading] = useState(false)

  const handleSubmit = e => {
    e.preventDefault();
    if (input === mockPassword) {
      setAuthed(true);
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  if (!authed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <form onSubmit={handleSubmit} className="bg-white/90 shadow-lg rounded-xl px-8 py-10 max-w-sm w-full animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-4 text-center">Galería Privada</h2>
          <input
            type="password"
            placeholder="Contraseña"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:border-gold focus:ring-gold/30 focus:ring-2 outline-none mb-4"
            required
          />
          {error && <div className="text-red-600 mb-2 text-center">{error}</div>}
          <button type="submit" className="w-full py-2 rounded bg-gold text-black font-bold hover:bg-white hover:text-gold border-2 border-gold transition">Acceder</button>
        </form>
      </div>
    );
  }
  useEffect(() => {
    if (!authed) return
    let mounted = true
    setLoading(true)
    resolvePaths(privateImages).then(resolved => {
      if (!mounted) return
      setUrls(resolved)
    }).catch(err => console.error('Error loading private images', err)).finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [authed])

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto animate-fade-in-up">
      <h2 className="text-3xl font-heading font-bold text-gold mb-8 text-center">Galería Privada</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: privateImages.length }).map((_, idx) => (
            <div key={idx} className="aspect-[3/4] bg-gray-800 animate-pulse rounded-xl overflow-hidden shadow-lg"></div>
          ))
        ) : (
          urls.map((src, idx) => (
            <div key={idx} className="aspect-[3/4] bg-gray-900 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
              {src ? (
                <img src={src} alt={`Privada ${idx+1}`} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white">No disponible</div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default PrivateGallery;
