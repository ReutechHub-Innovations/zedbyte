import React from 'react';

const About = () => {
  return (
    <section className="about-container container">
      <div className="section-header">
        <p className="eyebrow">About ZEDBYTES</p>
        <h1>Future-ready IT systems for Zambian teams.</h1>
        <p className="section-copy">
          We design premium CCTV, networking, printer, web, software and database solutions for businesses that need secure, modern infrastructure.
        </p>
      </div>

      <section>
        <h2>Our Mission</h2>
        <p>To provide innovative technology systems that empower organisations to operate with speed, visibility and strong digital controls.</p>
      </section>

      <section>
        <h2>Our Vision</h2>
        <p>To be Zambia’s trusted IT partner by delivering expert installations, cloud-ready software and data management services that grow with every client.</p>
      </section>

      <section>
        <h2>Core Values</h2>
        <ul>
          <li>Integrity in every installation</li>
          <li>Innovation in every platform</li>
          <li>Collaboration with our clients</li>
          <li>Service that supports long-term growth</li>
        </ul>
      </section>

      <section>
        <h2>Our Expertise</h2>
        <p>Our team blends CCTV, network engineering, managed printer systems, web development, software engineering and database management into cohesive business solutions.</p>
      </section>

      <section>
        <h2>Trusted locally</h2>
        <p>Based in Lusaka, we serve businesses across Zambia with fast response, modern implementation and a focus on future-proofing every digital asset.</p>
      </section>
    </section>
  );
};

export default About;