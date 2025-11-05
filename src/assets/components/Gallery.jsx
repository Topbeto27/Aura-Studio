

import React, { useState, useRef, useEffect } from 'react';

import { galleryImages } from '../../data/images'
import { resolvePaths } from '../../utils/storageResolver'

// imagesUrls will be loaded at runtime from Firebase Storage



const Gallery = () => {
  const [urls, setUrls] = useState(Array(galleryImages.length).fill(null))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const resolved = await resolvePaths(galleryImages)
        if (!mounted) return
        setUrls(resolved)
      } catch (e) {
        console.error('Error loading gallery images', e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  const [modalIdx, setModalIdx] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [imgDims, setImgDims] = useState({ w: 1, h: 1 });
  const lastPos = useRef({ x: 0, y: 0 });
  const imgRef = useRef(null);

  // Bloquear scroll de fondo cuando el modal está abierto
  useEffect(() => {
    if (modalIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalIdx]);

  const openModal = (idx) => {
    setModalIdx(idx);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };
  const closeModal = () => {
    setModalIdx(null);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };
  const prevImg = (e) => {
    e.stopPropagation();
    setModalIdx((idx) => (idx > 0 ? idx - 1 : galleryImages.length - 1));
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };
  const nextImg = (e) => {
    e.stopPropagation();
    setModalIdx((idx) => (idx < galleryImages.length - 1 ? idx + 1 : 0));
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  const handleWheel = (e) => {
    e.preventDefault();
    setZoom((z) => {
      let newZoom = Math.max(1, Math.min(3, z + (e.deltaY < 0 ? 0.2 : -0.2)));
      if (newZoom === 1) setOffset({ x: 0, y: 0 });
      return newZoom;
    });
  };

  // Drag to pan handlers
  const handleMouseDown = (e) => {
    if (zoom === 1) return;
    setDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setOffset((prev) => {
      // Limitar pan para que la imagen no se salga demasiado
      if (!imgRef.current) return prev;
      const vw = 0.9 * window.innerWidth;
      const vh = 0.8 * window.innerHeight;
      const imgW = imgDims.w * zoom;
      const imgH = imgDims.h * zoom;
      const maxX = Math.max(0, (imgW - vw) / 2);
      const maxY = Math.max(0, (imgH - vh) / 2);
      return {
        x: clamp(prev.x + dx, -maxX, maxX),
        y: clamp(prev.y + dy, -maxY, maxY),
      };
    });
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseUp = () => {
    setDragging(false);
  };
  const handleMouseLeave = () => {
    setDragging(false);
  };
  // Touch events
  const handleTouchStart = (e) => {
    if (zoom === 1) return;
    setDragging(true);
    const touch = e.touches[0];
    lastPos.current = { x: touch.clientX, y: touch.clientY };
  };
  const handleTouchMove = (e) => {
    if (!dragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - lastPos.current.x;
    const dy = touch.clientY - lastPos.current.y;
    setOffset((prev) => {
      if (!imgRef.current) return prev;
      const vw = 0.9 * window.innerWidth;
      const vh = 0.8 * window.innerHeight;
      const imgW = imgDims.w * zoom;
      const imgH = imgDims.h * zoom;
      const maxX = Math.max(0, (imgW - vw) / 2);
      const maxY = Math.max(0, (imgH - vh) / 2);
      return {
        x: clamp(prev.x + dx, -maxX, maxX),
        y: clamp(prev.y + dy, -maxY, maxY),
      };
    });
    lastPos.current = { x: touch.clientX, y: touch.clientY };
  };
  const handleTouchEnd = () => {
    setDragging(false);
  };

  return (
    <section id="gallery" className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-heading font-bold text-gold mb-8 text-center opacity-0 animate-fade-in-down" style={{animationDelay: '0.1s', animationFillMode: 'forwards'}}>Galería</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {loading ? (
          // skeleton placeholders while loading
          Array.from({ length: galleryImages.length }).map((_, idx) => (
            <div key={idx} className="aspect-[3/4] bg-gray-800 animate-pulse rounded-xl overflow-hidden shadow-lg" style={{animationDelay: `${0.15 + idx * 0.03}s`, animationFillMode: 'forwards'}}></div>
          ))
        ) : (
          urls.map((src, idx) => (
          <button
            key={idx}
            className="aspect-[3/4] bg-gray-900 rounded-xl overflow-hidden shadow-lg group relative focus:outline-none opacity-0 animate-fade-in-up"
            style={{animationDelay: `${0.15 + idx * 0.03}s`, animationFillMode: 'forwards'}}
            onClick={() => openModal(idx)}
            tabIndex={0}
          >
              <img
              src={src || ''}
              alt={`Galería ${idx+1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </button>
          ))
        )}
      </div>
      {modalIdx !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-all"
          onClick={closeModal}
        >
          <button
            className="absolute left-4 md:left-12 text-white text-4xl font-bold bg-black/40 rounded-full p-2 hover:bg-gold hover:text-black transition"
            onClick={prevImg}
            aria-label="Anterior"
            style={{top: '50%', transform: 'translateY(-50%)'}}
          >&#8592;</button>
          <div className="relative flex flex-col items-center">
            <div
              className="overflow-hidden flex items-center justify-center bg-black/90 rounded-lg"
              style={{width: '90vw', height: '80vh', maxWidth: 900, maxHeight: 700, touchAction: 'none'}}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                ref={imgRef}
                src={urls[modalIdx]}
                alt={`Detalle ${modalIdx+1}`}
                className={`select-none ${zoom === 1 ? 'rounded-lg shadow-2xl border-4 border-gold' : 'rounded-lg shadow-2xl'}`}
                style={{
                  transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
                  transition: dragging ? 'none' : 'transform 0.2s',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  userSelect: 'none',
                  pointerEvents: 'auto',
                  cursor: zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'zoom-in',
                  boxShadow: zoom > 1 ? '0 0 32px 0 #000a' : '',
                }}
                onWheel={handleWheel}
                onClick={e => e.stopPropagation()}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                draggable={false}
                onLoad={e => {
                  setImgDims({ w: e.target.naturalWidth, h: e.target.naturalHeight });
                }}
              />
            </div>
            <div className="flex gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gold text-black font-bold rounded shadow hover:bg-white hover:text-gold transition"
                onClick={e => { e.stopPropagation(); setZoom(z => Math.min(3, z + 0.2)); }}
              >Zoom +</button>
              <button
                className="px-4 py-2 bg-gold text-black font-bold rounded shadow hover:bg-white hover:text-gold transition"
                onClick={e => { e.stopPropagation(); setZoom(z => Math.max(1, z - 0.2)); }}
              >Zoom -</button>
              <button
                className="px-4 py-2 bg-gray-900 text-white font-bold rounded shadow hover:bg-gold hover:text-black transition"
                onClick={e => { e.stopPropagation(); setZoom(1); }}
              >Reset</button>
            </div>
          </div>
          <button
            className="absolute right-4 md:right-12 text-white text-4xl font-bold bg-black/40 rounded-full p-2 hover:bg-gold hover:text-black transition"
            onClick={nextImg}
            aria-label="Siguiente"
            style={{top: '50%', transform: 'translateY(-50%)'}}
          >&#8594;</button>
          <button
            className="absolute top-6 right-8 text-white text-3xl font-bold hover:text-gold"
            onClick={closeModal}
            aria-label="Cerrar"
          >&times;</button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
