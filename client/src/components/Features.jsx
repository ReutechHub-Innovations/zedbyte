import React from 'react';

const serviceList = [
  {
    title: 'CCTV Installations',
    description: 'End-to-end CCTV systems with secure monitoring, recording and analytics.',
  },
  {
    title: 'Networking',
    description: 'Robust wired and wireless networks designed for reliability and speed.',
  },
  {
    title: 'Printer Management',
    description: 'Managed printer services, drivers, queues and user workflows.',
  },
  {
    title: 'Web Development',
    description: 'Responsive websites and applications built for performance and conversion.',
  },
  {
    title: 'Software Engineering',
    description: 'Custom software solutions built with maintainability and speed in mind.',
  },
  {
    title: 'Database Management',
    description: 'Secure database design, backup automation and optimisation.',
  },
];

const Features = () => (
  <section className="features container">
    <div className="section-header">
      <p className="eyebrow">What we do</p>
      <h2 className="page-title">Core services for futuristic IT operations.</h2>
      <p className="section-copy">ZEDBYTES delivers modern technology services across CCTV, networking, printers, web, software and database systems.</p>
    </div>
    <div className="grid features-grid">
      {serviceList.map((service) => (
        <div key={service.title} className="card feature-card">
          <div className="service-chip">{service.title.split(' ')[0]}</div>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Features;
