import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './AdminLogin.css'; // Assuming you have a CSS file for styling

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
history.push('/z-admin/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login error (e.g., show a message to the user)
        }
    };

    return (
        <div className="admin-login">
            <h2>Admin Login</h2>
            <p className="admin-note">Use the secret admin access path <strong>/z-login</strong> and log in with admin credentials.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;