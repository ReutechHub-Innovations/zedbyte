import React from 'react';

const stats = [
  { value: '120+', label: 'Successful launches' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '8 yrs', label: 'Average partner tenure' },
];

const Statistics = () => (
  <section className="stats container">
    <div className="stats-grid">
      {stats.map((item) => (
        <div key={item.label} className="card stat-card">
          <h3>{item.value}</h3>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Statistics;
