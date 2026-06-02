import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
    const isLanding = typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '');

    // Local images from public/fronpicks folder
    const localImages = [
        '/fronpicks/front1.jpg',
        '/fronpicks/front2.jpg',
        '/fronpicks/front3.jpg'
    ];

    // Prefer cloud URLs set via REACT_APP_FRONPICKS (comma-separated), otherwise use local fronpicks photos.
    const envList = (process.env.REACT_APP_FRONPICKS || '')
        .split(',')
        .map((src) => src.trim())
        .filter(Boolean);
    const images = envList.length ? envList : localImages;

    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!isLanding) return;
        const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 3000);
        return () => clearInterval(id);
    }, [isLanding, images.length]);

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
                    <div className="hero-image-card">
                        {images.map((src, i) => (
                            <img
                                key={src}
                                src={src}
                                alt={`hero ${i + 1}`}
                                className={i === index ? 'visible' : ''}
                                loading="eager"
                            />
                        ))}
                    </div>

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