import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="container min-vh-100 pt-5">
            <main className="row g-0">
                <Outlet />
            </main>
        </div>
    );
};

export default AuthLayout;
