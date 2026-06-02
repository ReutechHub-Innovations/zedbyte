import React, { useState, useEffect } from 'react';
import { getServices, createService, updateService, deleteService } from '../services/api';
import Spinner from '../components/ui/Spinner';
import './ServiceManager.css';

const ServiceManager = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const data = await getServices();
            setServices(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Failed to load services');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.description.trim()) {
            setError('Title and description are required');
            return;
        }

        try {
            if (editingId) {
                await updateService(editingId, formData);
            } else {
                await createService(formData);
            }
            setFormData({ title: '', description: '', image: '' });
            setEditingId(null);
            await fetchServices();
        } catch (err) {
            setError('Failed to save service');
            console.error(err);
        }
    };

    const handleEdit = (service) => {
        setFormData({
            title: service.title,
            description: service.description,
            image: service.image || '',
        });
        setEditingId(service._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await deleteService(id);
                await fetchServices();
            } catch (err) {
                setError('Failed to delete service');
                console.error(err);
            }
        }
    };

    const handleCancel = () => {
        setFormData({ title: '', description: '', image: '' });
        setEditingId(null);
        setError(null);
    };

    if (loading && !services.length) {
        return <Spinner />;
    }

    return (
        <div className="service-manager">
            <h2>Services Manager</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="service-form">
                <h3>{editingId ? 'Edit Service' : 'Add New Service'}</h3>

                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Service title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Service description"
                        rows="4"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Image URL</label>
                    <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="primary-btn">
                        {editingId ? 'Update Service' : 'Add Service'}
                    </button>
                    {editingId && (
                        <button type="button" className="secondary-btn" onClick={handleCancel}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="services-list">
                <h3>Existing Services ({services.length})</h3>
                {services.length === 0 ? (
                    <p className="empty-message">No services yet. Create one to get started.</p>
                ) : (
                    <div className="services-table">
                        {services.map(service => (
                            <div key={service._id} className="service-row">
                                <div className="service-info">
                                    <h4>{service.title}</h4>
                                    <p>{service.description}</p>
                                </div>
                                <div className="service-actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(service)}
                                        type="button"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(service._id)}
                                        type="button"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceManager;
