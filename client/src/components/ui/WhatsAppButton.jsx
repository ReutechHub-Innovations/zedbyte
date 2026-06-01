import React from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = ({ phone = '+260970067982', message = 'Hi, I found your site and would like more information.' }) => {
  const number = phone.replace(/[^+0-9]/g, '').replace('+', '');
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a className="whatsapp-fab" href={href} target="_blank" rel="noreferrer">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.52 3.48C18.03 1 14.73 0 11.64 0 5.22 0 0 5.22 0 11.64c0 2.05.54 4.02 1.56 5.77L0 24l6.84-1.46C9.43 23.7 10.99 24 11.64 24c6.42 0 11.64-5.22 11.64-11.64 0-3.09-1-6.39-3.12-8.92z" fill="#25D366"/>
        <path d="M17.5 14.2c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.36.22-.66.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2 0-.38-.02-.53-.02-.15-.68-1.64-.93-2.25-.24-.59-.48-.51-.68-.52l-.58-.01c-.2 0-.53.07-.8.37-.27.3-1.02 1-1.02 2.45 0 1.45 1.04 2.85 1.18 3.05.14.2 2.04 3.22 4.94 4.51 2.9 1.3 2.9.87 3.42.81.52-.06 1.69-.69 1.93-1.36.24-.66.24-1.23.17-1.35-.07-.12-.27-.19-.57-.34z" fill="#fff"/>
      </svg>
    </a>
  );
};

export default WhatsAppButton;
