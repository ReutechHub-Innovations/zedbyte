import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Projects.css';

const placeholderProjects = [
  {
    id: 'cctv-suite',
    title: 'Smart CCTV deployment',
    description: 'Complete camera system and monitoring installation for a busy corporate campus.',
  },
  {
    id: 'network-upgrade',
    title: 'Office network overhaul',
    description: 'Secure LAN/WLAN upgrade with managed switches, firewalls and fast cabling.',
  },
  {
    id: 'printer-fleet',
    title: 'Printer management solution',
    description: 'Printer fleet automation, access control and service monitoring for large offices.',
  },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data || []);
      } catch (_) {
        setError('Unable to load live portfolio data right now. Showing featured examples.');
        setProjects(placeholderProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="projects-container container">
      <div className="section-header">
        <p className="eyebrow">Project highlights</p>
        <h1>Showcase of intelligent IT systems.</h1>
        <p className="section-copy">We deliver secure, scalable technology solutions across CCTV, networking, printers, web and database services.</p>
      </div>

      {loading ? (
        <div className="empty-state">Loading projects...</div>
      ) : (
        <div className="projects-gallery">
          {projects.map((project) => (
            <div key={project._id || project.id} className="project-card">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      )}

      {error && <div className="empty-state">{error}</div>}
    </section>
  );
};

export default Projects;