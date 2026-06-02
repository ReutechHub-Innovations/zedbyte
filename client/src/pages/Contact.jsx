import React, { useState } from 'react';
import './Contact.css';
import founders from '../data/founders';
import Spinner from '../components/ui/Spinner';

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

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const backend = process.env.REACT_APP_BACKEND_URL || '';
            // Attempt to POST the contact request if backend is configured
            if (backend) {
                await fetch(`${backend}/api/contact`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } else {
                // simple simulated delay so UX shows spinner
                await new Promise((r) => setTimeout(r, 900));
            }
        } catch (err) {
            // swallow — show toast in future
            // console.error(err);
        } finally {
            setLoading(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }
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
                            <p>
                                {Array.from(new Map(founders.map((f) => [f.phone, f])).values()).map((f) => (
                                    <span key={f.phone}><a href={`tel:${f.phone.replace(/[^0-9+]/g, '')}`}>{f.phone}</a> — {f.name}<br/></span>
                                ))}
                            </p>
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
                    <button type="submit" className="primary-btn" disabled={loading}>
                        {loading ? <><Spinner size={18} /> <span style={{marginLeft:8}}>Sending...</span></> : 'Send request'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;