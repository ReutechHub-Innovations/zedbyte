import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import './ThemeFix.css';


const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-links">
                <Link to="/z-admin/users" className="dashboard-link">Manage Users</Link>
                <Link to="/z-admin/content" className="dashboard-link">Content Manager</Link>
                <Link to="/z-admin/settings" className="dashboard-link">Settings</Link>
            </div>
        </div>
    );
};

export default Dashboard;