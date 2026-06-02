import React from 'react';

import reubenImg from '../assets/Reuben Ng\'uni.jpg';
import humphreyImg from '../assets/Humphrey Moonga.jpg';
import kayomboImg from '../assets/Kayombo Chifwana.jpg';

import './CoFounders.css';

const founders = [
  {
    name: 'REUBEN NG\u2019UNI',
    role: 'Co-Founder',
    phone: '+260 772446414',
    image: reubenImg,
  },
  {
    name: 'HUMPHREY MOONGA',
    role: 'Co-Founder',
    phone: '+260 0779485653',
    image: humphreyImg,
  },
  {
    name: 'KAYOMBO CHIFWANA',
    role: 'Co-Founder',
    phone: '+0769963307',
    image: kayomboImg,
  },
];

const CoFounders = () => {
  return (
    <section className="cofounders-section container">
      <div className="section-header">
        <p className="eyebrow">Core Team</p>
        <h2 className="page-title">Co-founders behind ZEDBYTES</h2>
        <p className="section-copy">Meet the people driving secure, future-ready technology solutions in Zambia.</p>
      </div>

      <div className="cofounders-grid">
        {founders.map((f) => (
          <div key={f.name} className="cofounder-card card">
            <div className="cofounder-image-wrap">
              <img className="cofounder-image" src={f.image} alt={f.name} />
            </div>
            <div className="cofounder-body">
              <h3 className="cofounder-name">{f.name}</h3>
              <p className="cofounder-role">{f.role}</p>
              <p className="cofounder-phone">
                <a href={`tel:${f.phone.replace(/[^0-9+]/g, '')}`}>{f.phone}</a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoFounders;

