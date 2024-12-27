import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authContext";

const GoogleCallback = () => {
    const { saveToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            saveToken(token); // Lưu token vào localStorage
            navigate("/"); // Chuyển đến trang chính
        } else {
            alert("Đăng nhập Google thất bại!");
            navigate("/login");
        }
    }, [saveToken, navigate]);

    return <p>Đang xử lý đăng nhập...</p>;
};

export default GoogleCallback;
