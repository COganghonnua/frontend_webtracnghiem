import React, { useEffect, useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
        const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await authService.getCurrentUser();
                setUser(userData);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
            }
        };
        fetchUser();
    }, []);

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
                <span className="ml-3 text-gray-700 text-sm">Đang tải thông tin người dùng...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-blue-50">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center space-x-4 border-b pb-4 mb-6">
                        <img
                            src={user.avatarUrl || "https://via.placeholder.com/80"}
                            alt={user.fullName}
                            className="w-20 h-20 rounded-full object-cover shadow"
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{user.fullName}</h1>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 rounded-lg p-4 shadow-md">
                            <h2 className="text-lg font-medium text-blue-700">Thông tin tài khoản</h2>
                            <p className="mt-2 text-gray-600">
                                <strong>Số dư:</strong> {user.balance.toLocaleString()} VND
                            </p>
                            <p className="mt-2 text-gray-600">
                                <strong>Vai trò:</strong> {user.roles.includes("Admin") ? "Admin" : "Người tham gia"}
                            </p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4 shadow-md">
                            <h2 className="text-lg font-medium text-blue-700">Cài đặt</h2>
                            <ul className="mt-2 space-y-2">
                                <li>
                                    <button
                                        className="text-blue-500 hover:text-blue-700 transition"
                                        onClick={() => alert("Tính năng này đang phát triển.")}
                                    >
                                        Đổi mật khẩu
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="text-blue-500 hover:text-blue-700 transition"
                                        onClick={() => alert("Tính năng này đang phát triển.")}
                                    >
                                        Cập nhật thông tin
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <button
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                            onClick={() => navigate("/")}
                        >
                            Trở về trang chính
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
