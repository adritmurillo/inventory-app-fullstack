import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const AdminRoute = () => {
    const token = localStorage.getItem('token');
    let isAdmin = false;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            isAdmin = decoded.role === "ROLE_ADMIN";
        } catch (e) {
            console.error("Error when reading token", e);
        }
    }

    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;