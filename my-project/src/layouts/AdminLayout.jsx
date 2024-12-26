import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../store/authContext';

const AdminLayout = () => {
    const { user } = useAuth();

    return (
        <div className="admin-layout">
            <header>
                <h1>Admin Dashboard</h1>
                {user && (
                    <p>
                        Chào mừng, {user.fullName} - Vai trò: {user.roles.join(", ")}
                    </p>
                )}
            </header>
            <main>
                <Outlet />
            </main>
            <footer>Admin Footer</footer>
        </div>
    );
};

export default AdminLayout;
