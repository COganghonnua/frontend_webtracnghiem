import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUser, FaBars } from "react-icons/fa";
import { useAuth } from "../store/authContext";

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside
                className={`bg-blue-700 text-white w-64 p-4 space-y-4 transition-transform duration-300 ${
                    isSidebarOpen ? "block" : "hidden md:block"
                }`}
            >
                <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
                <nav>
                    <ul className="space-y-3">
                        <li>
                            <button
                                className="w-full text-left px-4 py-2 rounded hover:bg-blue-600"
                                onClick={() => navigate("/admin/topics")}
                            >
                                Quản lý chủ đề
                            </button>
                        </li>
                        <li>
                            <button
                                className="w-full text-left px-4 py-2 rounded hover:bg-blue-600"
                                onClick={() => navigate("/admin/subjects")}
                            >
                                Quản lý môn học
                            </button>
                        </li>
                        <li>
                            <button
                                className="w-full text-left px-4 py-2 rounded hover:bg-blue-600"
                                onClick={() => navigate("/admin/exams")}
                            >
                                Quản lý bài thi
                            </button>
                        </li>
                        <li>
                            <button
                                className="w-full text-left px-4 py-2 rounded hover:bg-blue-600"
                                onClick={() => navigate("/admin/questions")}
                            >
                                Quản lý câu hỏi
                            </button>
                        </li>
                        <li>
                            <button
                                className="w-full text-left px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt className="inline mr-2" />
                                Đăng xuất
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <header className="bg-gray-100 p-4 flex items-center justify-between shadow">
                    <button
                        className="md:hidden text-blue-700 text-2xl"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <FaBars />
                    </button>
                    <h1 className="text-xl font-bold text-blue-700">Admin Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        {user && (
                            <div className="flex items-center space-x-2">
                                <FaUser className="text-blue-700" />
                                <span className="text-gray-700">{user.fullName}</span>
                            </div>
                        )}
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            <FaSignOutAlt className="h-4 w-4" />
                            <span>Đăng xuất</span>
                        </button>
                    </div>
                </header>

                {/* Nội dung chính */}
                <main className="flex-1 p-6 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
