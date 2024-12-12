import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/authContext";

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <p>Đang kiểm tra trạng thái đăng nhập...</p>; // Hiển thị loading
    }

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
