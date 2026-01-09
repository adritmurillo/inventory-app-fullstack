import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole } from "../services/authService";

const normalizeRole = (role) => {
    if (!role) return null;
    const upper = role.toUpperCase();
    return upper.startsWith("ROLE_") ? upper.slice(5) : upper;
};

const RoleGuard = ({ children, requiredRole = "ADMIN" }) => {
    const userRole = normalizeRole(getUserRole());
    const needed = normalizeRole(requiredRole);

    if (!userRole || (needed && userRole !== needed)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default RoleGuard;
