import axios from "axios";

const API_URL = "https://localhost:7253/api/auth"; // Backend URL

const login = async (email, password) => {
    const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true } // Đảm bảo cookie được gửi kèm
    );
    return response.data;
};
const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};
// Lấy thông tin người dùng hiện tại
const getCurrentUser = async () => {
    const response = await axios.get(`${API_URL}/me`, {
        withCredentials: true,
    });
    return response.data; // Trả về thông tin user bao gồm fullName
};

// Đăng xuất
const logout = async () => {
    await axios.post(`${API_URL}/logout`, null, { withCredentials: true });
};

export const authService = {
    login,
    getCurrentUser,
    register,
    logout,
};
