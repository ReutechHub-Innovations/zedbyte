import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-inner container">
                <div className="hero-copy">
                    <p className="eyebrow">ZAMBIA'S FUTURE-READY TECH</p>
                    <h1 className="page-title">Premium IT systems for CCTV, networking, web and software.</h1>
                    <p className="hero-description">
                        ZEDBYTES delivers futuristic digital infrastructure for Zambian companies.
                        From secure CCTV installations to cloud-ready software, our solutions are built to scale.
                    </p>
                    <div className="hero-cta">
                        <a href="/contact" className="primary-btn">Start a project</a>
                        <a href="/services" className="secondary-btn">View services</a>
                    </div>
                </div>
                <div className="hero-panel card">
                    <div className="hero-panel-header">
                        <span>Built for ambitious teams</span>
                    </div>
                    <div className="hero-panel-body">
                        <p className="panel-metric">6</p>
                        <p>Core service areas: CCTV, Networking, Printer, Web, Software, Database.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;