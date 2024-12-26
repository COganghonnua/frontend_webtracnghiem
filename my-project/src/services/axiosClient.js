import axios from 'axios';

const axiosClient = axios.create({
    baseURL: "https://localhost:7253/api",
    withCredentials: true, // Mặc định gửi cookie
});

// Xử lý lỗi tự động
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Lỗi từ API:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;
