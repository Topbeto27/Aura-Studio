import React from 'react';


const ContactButton = () => (
  <a
    href="https://wa.me/521234567890" // Cambia por tu número
    className="contact-button"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
  >
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#25D366"/>
      <path d="M22.5 9.5C21.1 8.1 19.2 7.3 17.2 7.3C12.7 7.3 9 11 9 15.5C9 17.1 9.5 18.7 10.5 20L9 25L13.1 23.5C14.3 24.1 15.7 24.5 17.2 24.5C21.7 24.5 25.4 20.8 25.4 16.3C25.4 14.3 24.9 12.4 23.5 11L22.5 9.5Z" fill="#fff"/>
    </svg>
  </a>
);

export default ContactButton;
