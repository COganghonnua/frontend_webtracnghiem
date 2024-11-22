import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/authContext";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
    const { user, getCurrentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                await getCurrentUser();
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
        }
    };

    return (
        <nav className="relative bg-white shadow-md py-4">
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Logo */}
                <div
                    className="flex items-center text-3xl gap-2 font-bold cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <FaBell className="text-blue-500 animate-pulse" />
                    <p className="text-blue-500">Trắc Nghiệm</p>
                    <p className="text-gray-700">Online</p>
                </div>

                {/* Nút Đăng nhập/Đăng xuất/Đăng ký */}
                <div className="flex items-center gap-x-4">
                    {loading ? (
                        <p className="text-gray-500 animate-pulse">Đang tải...</p>
                    ) : user ? (
                        <>
                            <p className="text-gray-700">Xin chào, {user.fullName}</p>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
                            >
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
                            >
                                Đăng nhập
                            </button>
                            <button
                                onClick={() => navigate("/register")}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
                            >
                                Đăng ký
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
