import React, { useState } from "react";
import { useAuth } from "../../store/authContext";
import { useNavigate } from "react-router-dom";
import { FaBell, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaLaptop } from "react-icons/fa";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white bg-opacity-80 backdrop-blur-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <FaBell className="h-6 w-6 text-blue-500 animate-pulse" />
                        <span className="text-2xl font-bold text-blue-500">Trắc Nghiệm</span>
                        <span className="text-2xl font-bold text-gray-700">Online</span>
                    </div>

                    {/* Navigation and User Actions */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <button
                                    className="hidden sm:flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition-colors duration-200"
                                    onClick={() => navigate("/classroom")}
                                >
                                    <FaLaptop className="h-4 w-4" />
                                    <span>Online Class</span>
                                </button>
                                <div className="relative">
                                    <button
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition-colors duration-200"
                                    >
                                        <img
                                            src={user.avatarUrl || "https://via.placeholder.com/40"}
                                            alt={user.fullName}
                                            className="h-8 w-8 rounded-full object-cover"
                                        />
                                        <span className="hidden sm:inline">{user.fullName}</span>
                                    </button>
                                    {isMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    role="menuitem"
                                                    onClick={() => navigate("/classroom")}
                                                >
                                                    Online Class
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    role="menuitem"
                                                    onClick={handleLogout}
                                                >
                                                    Đăng xuất
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition-colors duration-200"
                                >
                                    <FaSignInAlt className="h-4 w-4" />
                                    <span>Đăng nhập</span>
                                </button>
                                <button
                                    onClick={() => navigate("/register")}
                                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                                >
                                    <FaUserPlus className="h-4 w-4" />
                                    <span>Đăng ký</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

