import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContentManager = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingPostId, setEditingPostId] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const response = await axios.get('/api/content');
        setPosts(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingPostId) {
            await axios.put(`/api/content/${editingPostId}`, { title, content });
        } else {
            await axios.post('/api/content', { title, content });
        }
        setTitle('');
        setContent('');
        setEditingPostId(null);
        fetchPosts();
    };

    const handleEdit = (post) => {
        setTitle(post.title);
        setContent(post.content);
        setEditingPostId(post._id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/content/${id}`);
        fetchPosts();
    };

    return (
        <div>
            <h2>Content Manager</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">{editingPostId ? 'Update' : 'Create'} Post</button>
            </form>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <button onClick={() => handleEdit(post)}>Edit</button>
                        <button onClick={() => handleDelete(post._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContentManager;