import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getServiceById } from '../services/api';
import Spinner from '../components/ui/Spinner';
import './ServiceDetail.css';

const ServiceDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const data = await getServiceById(id);
        setService(data);
      } catch (err) {
        setError('Failed to load service details');
        console.error('Error fetching service:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  if (loading) {
    return (
      <section className="service-detail container" style={{ padding: '100px 0', minHeight: '60vh' }}>
        <Spinner />
      </section>
    );
  }

  if (error || !service) {
    return (
      <section className="service-detail container" style={{ padding: '100px 0' }}>
        <div className="empty-state">
          <p>{error || 'Service not found'}</p>
          <button className="primary-btn" onClick={() => history.push('/services')}>
            Back to Services
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="service-detail container">
      <div className="detail-header">
        <button className="back-btn" onClick={() => history.push('/services')}>
          ← Back to Services
        </button>
      </div>

      <article className="detail-card">
        {service.image && (
          <div className="detail-image">
            <img src={service.image} alt={service.title} />
          </div>
        )}

        <div className="detail-content">
          <h1>{service.title}</h1>
          <p className="detail-description">{service.description}</p>

          <div className="detail-actions">
            <a href={process.env.REACT_APP_SITE_URL ? `${process.env.REACT_APP_SITE_URL.replace(/\/$/, '')}/contact` : '/contact'} className="primary-btn">
              Request This Service
            </a>
          </div>

          {service.createdAt && (
            <div className="detail-meta">
              <small>Added {new Date(service.createdAt).toLocaleDateString()}</small>
            </div>
          )}
        </div>
      </article>
    </section>
  );
};

export default ServiceDetail;
