
import heroImg from '../hero.jpg'; // Aquí pondrás tu imagen principal

function Hero() {
  return (
    <section id="hero" className="hero">
      <img src={heroImg} alt="Aura Studio" className="hero-image" />
      <div className="hero-overlay">
        <h1>Aura Studio</h1>
        <p>Fotografía y Video Profesional</p>
      </div>
    </section>
  );
}

export default Hero;
