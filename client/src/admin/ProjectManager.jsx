import React, { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../services/api';
import Spinner from '../components/ui/Spinner';
import './ProjectManager.css';

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        imageUrl: '',
        link: '',
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await getProjects();
            setProjects(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Failed to load projects');
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
        if (!formData.title.trim() || !formData.description.trim() || !formData.category.trim()) {
            setError('Title, description, and category are required');
            return;
        }

        try {
            if (editingId) {
                await updateProject(editingId, formData);
            } else {
                await createProject(formData);
            }
            setFormData({ title: '', description: '', category: '', imageUrl: '', link: '' });
            setEditingId(null);
            await fetchProjects();
        } catch (err) {
            setError('Failed to save project');
            console.error(err);
        }
    };

    const handleEdit = (project) => {
        setFormData({
            title: project.title,
            description: project.description,
            category: project.category || '',
            imageUrl: project.imageUrl || '',
            link: project.link || '',
        });
        setEditingId(project._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(id);
                await fetchProjects();
            } catch (err) {
                setError('Failed to delete project');
                console.error(err);
            }
        }
    };

    const handleCancel = () => {
        setFormData({ title: '', description: '', category: '', imageUrl: '', link: '' });
        setEditingId(null);
        setError(null);
    };

    if (loading && !projects.length) {
        return <Spinner />;
    }

    return (
        <div className="project-manager">
            <h2>Projects Manager</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="project-form">
                <h3>{editingId ? 'Edit Project' : 'Add New Project'}</h3>

                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Project title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Project description"
                        rows="4"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="e.g., CCTV, Networking, Web"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Image URL</label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="form-group">
                    <label>Project Link</label>
                    <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleInputChange}
                        placeholder="https://example.com/project"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="primary-btn">
                        {editingId ? 'Update Project' : 'Add Project'}
                    </button>
                    {editingId && (
                        <button type="button" className="secondary-btn" onClick={handleCancel}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="projects-list">
                <h3>Existing Projects ({projects.length})</h3>
                {projects.length === 0 ? (
                    <p className="empty-message">No projects yet. Create one to get started.</p>
                ) : (
                    <div className="projects-table">
                        {projects.map(project => (
                            <div key={project._id} className="project-row">
                                <div className="project-info">
                                    <h4>{project.title}</h4>
                                    <p>{project.description}</p>
                                    <div className="project-meta">
                                        <span className="category-badge">{project.category}</span>
                                    </div>
                                </div>
                                <div className="project-actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(project)}
                                        type="button"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(project._id)}
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

export default ProjectManager;
