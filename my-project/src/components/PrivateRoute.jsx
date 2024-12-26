import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/authContext";

const PrivateRoute = ({ children, requiredRole }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <p>Đang kiểm tra trạng thái đăng nhập...</p>;
    }

    // Kiểm tra vai trò (nếu requiredRole được chỉ định)
    if (requiredRole && (!user || !user.roles.includes(requiredRole))) {
        return <Navigate to="/unauthorized" />;
    }

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
