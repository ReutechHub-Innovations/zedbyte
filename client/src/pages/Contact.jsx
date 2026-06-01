import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add API submission logic here when backend form endpoint is ready.
    };

    return (
        <section className="contact-section container">
            <div className="contact-grid">
                <div className="contact-card card">
                    <p className="eyebrow">Get in touch</p>
                    <h2 className="page-title">Talk to our technical team</h2>
                    <p className="section-copy">Share your project goals and let us recommend the fastest route to launch, scale, or optimize.</p>
                    <div className="contact-details">
                        <div>
                            <strong>Email</strong>
                            <p><a href="mailto:zedbytesoluttions@gmail.com">zedbytesoluttions@gmail.com</a></p>
                        </div>
                        <div>
                            <strong>Phone</strong>
                            <p><a href="tel:0970067982">0970067982</a><br /><a href="tel:0769963307">0769963307</a></p>
                        </div>
                        <div>
                            <strong>Office</strong>
                            <p>Lusaka, Zambia</p>
                        </div>
                    </div>
                </div>

                <form className="contact-form card" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                    </div>
                    <div className="form-row">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
                    </div>
                    <div className="form-row">
                        <label htmlFor="subject">Subject</label>
                        <input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project type or question" required />
                    </div>
                    <div className="form-row">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project" rows="6" required />
                    </div>
                    <button type="submit" className="primary-btn">Send request</button>
                </form>
            </div>
        </section>
    );
};

export default Contact;