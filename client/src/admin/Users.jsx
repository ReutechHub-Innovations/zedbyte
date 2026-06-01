import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../services/api';
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsers();
            setUsers(response.data);
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        await deleteUser(userId);
        setUsers(users.filter(user => user._id !== userId));
    };

    return (
        <div className="users-container">
            <h1>Manage Users</h1>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;