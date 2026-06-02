import React from 'react';

import './CoFounders.css';
import founders from '../data/founders';

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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoFounders;

