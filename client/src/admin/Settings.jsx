import React, { useState } from 'react';

const Settings = () => {
    const [settings, setSettings] = useState({
        siteName: '',
        siteDescription: '',
        contactEmail: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings({ ...settings, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to save settings goes here
        console.log('Settings saved:', settings);
    };

    return (
        <div className="settings-container">
            <h2>Application Settings</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="siteName">Site Name:</label>
                    <input
                        type="text"
                        id="siteName"
                        name="siteName"
                        value={settings.siteName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="siteDescription">Site Description:</label>
                    <textarea
                        id="siteDescription"
                        name="siteDescription"
                        value={settings.siteDescription}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="contactEmail">Contact Email:</label>
                    <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        value={settings.contactEmail}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save Settings</button>
            </form>
        </div>
    );
};

export default Settings;