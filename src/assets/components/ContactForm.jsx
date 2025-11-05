import React, { useState } from 'react';

const initialState = {
  nombre: '',
  email: '',
  telefono: '',
  servicio: '',
  fecha: '',
  lugar: '',
  duracion: '',
  personas: '',
  presupuesto: '',
  detalles: '',
};

const servicios = [
  'Sesión fotográfica individual',
  'Sesión fotográfica familiar',
  'Cobertura de evento social',
  'Fotografía de producto',
  'Video promocional',
  'Video de evento',
  'Edición de fotos',
  'Edición de video',
  'Streaming en vivo',
  'Otro',
];

const ContactForm = () => {
  const [form, setForm] = useState(initialState);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
  const response = await fetch('http://localhost:4000/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Error al enviar la solicitud.');
      setEnviado(true);
    } catch (err) {
      setError('No se pudo enviar la solicitud. Intenta de nuevo más tarde.');
    }
  };

  if (enviado) {
    return (
      <div className="max-w-xl mx-auto bg-green-100 border border-green-400 text-green-800 px-6 py-8 rounded-xl mt-12 text-center animate-fade-in-down">
        <h2 className="text-2xl font-bold mb-2">¡Solicitud enviada!</h2>
        <p>Gracias por contactarnos. Pronto nos pondremos en contacto contigo.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white/80 shadow-xl rounded-2xl px-8 py-10 mt-12 backdrop-blur-md animate-fade-in-up">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <h2 className="text-3xl font-heading font-bold text-dark mb-8 text-center">Contáctanos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-1">Nombre completo *</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required className="w-full px-4 py-2 rounded border border-gray-300 focus:border-gold focus:ring-gold/30 focus:ring-2 outline-none" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Correo electrónico *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 rounded border border-gray-300 focus:border-gold focus:ring-gold/30 focus:ring-2 outline-none" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Teléfono *</label>
          <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} required className="w-full px-4 py-2 rounded border border-gray-300 focus:border-gold focus:ring-gold/30 focus:ring-2 outline-none" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Tipo de servicio *</label>
          <select name="servicio" value={form.servicio} onChange={handleChange} required className="w-full px-4 py-2 rounded border border-gray-300 focus:border-gold focus:ring-gold/30 focus:ring-2 outline-none">
            <option value="">Selecciona un servicio</option>
            {servicios.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Fecha del evento/sesión *</label>
          <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required className="w-full px-4 py-2 rounded border border-gray-300 focus:border-gold focus:ring-gold/30 focus:ring-2 outline-none" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Lugar *</label>
          <input type="text" name="lugar" value={form.lugar} onChange={handleChange} required className="w-full px-4 py-2 rounded border border-gray-300 focus:border-gold focus:ring-gold/30 focus:ring-2 outline-none" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Duración estimada</label>
          <input type="text" name="duracion" value={form.duracion} onChange={handleChange} placeholder="Ej: 2 horas" className="w-full px-4 py-2 rounded border border-gray-300 focus:border-gold focus:ring-gold/30 focus:ring-2 outline-none" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Cantidad de personas</label>
          <input type="number" name="personas" value={form.personas} onChange={handleChange} min="1" className="w-full px-4 py-2 rounded border border-gray-300 focus:border-gold focus:ring-gold/30 focus:ring-2 outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Presupuesto estimado</label>
          <input type="text" name="presupuesto" value={form.presupuesto} onChange={handleChange} placeholder="$ MXN" className="w-full px-4 py-2 rounded border border-gray-300 focus:border-gold focus:ring-gold/30 focus:ring-2 outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Detalles adicionales</label>
          <textarea name="detalles" value={form.detalles} onChange={handleChange} rows={4} placeholder="Cuéntanos más sobre tu evento, ideas o necesidades..." className="w-full px-4 py-2 rounded border border-gray-300 focus:border-gold focus:ring-gold/30 focus:ring-2 outline-none" />
        </div>
      </div>
      <button type="submit" className="mt-8 w-full py-3 rounded-full bg-gold text-black font-heading font-bold text-xl shadow-lg hover:bg-white hover:text-gold border-2 border-gold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gold/40">Enviar solicitud</button>
    </form>
  );
};

export default ContactForm;
