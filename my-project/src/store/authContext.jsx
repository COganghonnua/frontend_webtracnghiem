import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Memoize hàm getCurrentUser
    const getCurrentUser = useCallback(async () => {
        try {
            const response = await authService.getCurrentUser();
            setUser({
                fullName: response.fullName,
                email: response.email,
                balance: response.balance,
                roles: response.roles, // Thêm roles vào state
            });
        } catch (error) {
            console.error("Không tìm thấy thông tin người dùng:", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);
    

    // Hàm đăng nhập
    const login = async (email, password) => {
        await authService.login(email, password); // Gọi API đăng nhập
        await getCurrentUser(); // Cập nhật thông tin người dùng
    };

    // Hàm đăng xuất
    const logout = async () => {
        await authService.logout(); // Gọi API đăng xuất
        setUser(null); // Xóa thông tin người dùng khỏi state
    };

    useEffect(() => {
        getCurrentUser(); // Lấy thông tin người dùng khi app khởi động
    }, [getCurrentUser]);

    return (
        <AuthContext.Provider value={{ user, isLoading, getCurrentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
