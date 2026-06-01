import React from 'react';
import './Footer.css';

const CONTACT = {
  phone: '0970067982',
  altPhone: '0769963307',
  email: 'zedbytesoluttions@gmail.com',
  whatsapp: '0970067982',
  address: 'Lusaka, Zambia',
};

const Footer = () => {
  const waNumber = CONTACT.whatsapp.replace(/[^0-9]/g, '');
  const waIntl = `+260${waNumber.replace(/^0+/, '')}`;
  const waMessage = encodeURIComponent('Hi, I found your site and would like more information about your digital services.');
  const waHref = `https://wa.me/${waIntl.replace('+', '')}?text=${waMessage}`;

  return (
    <footer className="footer footer-section">
      <div className="footer-content container">
        <div className="footer-grid">
          <div className="footer-card">
            <h3>ZEDBYTES SOLUTIONS</h3>
            <p>Design-led digital products, backend systems, and cloud services for ambitious teams.</p>
          </div>

          <div className="footer-card footer-contact-card">
            <p className="eyebrow">Contact</p>
            <p>
              <strong>Email</strong>
              <br />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
            <p>
              <strong>Phone</strong>
              <br />
              <a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a>
              <br />
              <a href={`tel:${CONTACT.altPhone}`}>{CONTACT.altPhone}</a>
            </p>
            <p>
              <strong>Office</strong>
              <br />
              {CONTACT.address}
            </p>
          </div>

          <div className="footer-card footer-links-card">
            <p className="eyebrow">Explore</p>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
            <a className="whatsapp-link" href={waHref} target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ZEDBYTES SOLUTIONS. Crafted for modern teams.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
