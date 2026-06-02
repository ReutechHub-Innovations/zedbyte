import React, { useState } from 'react';
import './Services.css';
import './ServicesLayoutFix.css';


const ALL = 'All';

const services = [
  { id: 'cctv', title: 'CCTV Installations', category: 'CCTV', description: 'Professional CCTV system planning, installation and monitoring integrations.', icon: 'camera' },
  { id: 'network', title: 'Networking', category: 'Networking', description: 'LAN/WAN design, switches, Wi-Fi planning and secure network deployments.', icon: 'network' },
  { id: 'printer', title: 'Printer Management', category: 'Printer', description: 'Fleet printer setup, drivers, queueing and managed print services.', icon: 'printer' },
  { id: 'web', title: 'Web Development', category: 'Web', description: 'Modern responsive websites and web applications built for performance and SEO.', icon: 'web' },
  { id: 'software', title: 'Software Engineering', category: 'Software', description: 'End-to-end software development with testing, CI/CD and maintainable architectures.', icon: 'code' },
  { id: 'db', title: 'Database Management', category: 'Database', description: 'Database design, optimisation, backup strategies and migrations.', icon: 'database' },
];

const iconFor = (name) => {
  switch (name) {
    case 'camera':
      return (<svg className="svc-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7h2l1-2h8l1 2h2v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.4"/></svg>);
    case 'network':
      return (<svg className="svc-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12h4v4H4zM16 12h4v4h-4zM10 3h4v4h-4zM10 17h4v4h-4zM8 7h8v2H8zM8 13h8v2H8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
    case 'printer':
      return (<svg className="svc-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9V3h12v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="9" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M7 14h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>);
    case 'web':
      return (<svg className="svc-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12h20M12 2v20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>);
    case 'code':
      return (<svg className="svc-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 18l6-6-6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 6L2 12l6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>);
    case 'database':
      return (<svg className="svc-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.2"/><path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
    default:
      return null;
  }
};

const Services = () => {
  const [filter, setFilter] = useState(ALL);
  const [expanded, setExpanded] = useState({});

  const categories = [ALL, ...Array.from(new Set(services.map(s => s.category)))];

  const visible = services.filter(s => filter === ALL || s.category === filter);

  const toggleCard = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="services container">
      <div className="section-header">
        <p className="eyebrow">Futuristic Solutions</p>
        <h2 className="page-title">IT services engineered for modern organisations</h2>
        <p className="section-copy">Select a category to filter services, or expand any card for more details.</p>
      </div>

      <div className="service-controls">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`toggle-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid service-grid">
        {visible.map(s => (
          <article key={s.id} className={`card service-card ${expanded[s.id]? 'open':''}`}>
            <div className="service-top">
              <div className="icon-wrap">{iconFor(s.icon)}</div>
              <div className="service-head">
                <h3>{s.title}</h3>
                <p className="service-cat">{s.category}</p>
              </div>
            </div>
            <div className="service-body">
              <p>{s.description}</p>
            </div>
            <div className="service-actions">
              <button className="secondary-btn" onClick={() => toggleCard(s.id)}>{expanded[s.id]? 'Collapse':'More'}</button>
              <a className="primary-btn" href={process.env.REACT_APP_SITE_URL ? `${process.env.REACT_APP_SITE_URL.replace(/\/$/, '')}/contact` : '/contact'}>Request Service</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;