import { createContext, useState, useContext } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        await authService.login(email, password);
        await getCurrentUser(); // Lấy thông tin sau khi login
    };

    const getCurrentUser = async () => {
        try {
            const response = await authService.getCurrentUser(); // Gọi API `/me`
            setUser({
                fullName: response.fullName, // Lưu `fullName` từ API
                email: response.email,
                balance: response.balance, // Nếu muốn sử dụng
            });
        } catch (error) {
            console.error("Không tìm thấy thông tin người dùng:", error);
            setUser(null); // Đặt user về null nếu không tìm thấy thông tin
        }
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, getCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
