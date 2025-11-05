import React, { useState } from 'react';


// Imágenes de ejemplo para testimonios
import client1 from '../client1.jpg';
import client2 from '../client2.jpg';
import client3 from '../client3.jpg';

const testimonials = [
  {
    img: client1,
    name: 'María López',
    text: '¡Las fotos quedaron increíbles! El trato fue muy profesional y el resultado superó mis expectativas.'
  },
  {
    img: client2,
    name: 'Juan Pérez',
    text: 'El video de mi evento fue espectacular. Recomiendo Aura Studio a todos.'
  },
  {
    img: client3,
    name: 'Ana Torres',
    text: 'Excelente servicio y atención. Volveré a contratar para futuros proyectos.'
  }
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((index + 1) % testimonials.length);
  const prev = () => setIndex((index - 1 + testimonials.length) % testimonials.length);

  const { img, name, text } = testimonials[index];

  return (
    <section id="testimonials" className="testimonials">
      <h2>Testimonios</h2>
      <div className="testimonial-card">
        <img src={img} alt={name} className="testimonial-img" />
        <h3>{name}</h3>
        <p>{text}</p>
        <div className="testimonial-nav">
          <button onClick={prev}>&lt;</button>
          <button onClick={next}>&gt;</button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
