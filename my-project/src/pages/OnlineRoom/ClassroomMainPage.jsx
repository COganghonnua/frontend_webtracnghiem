import React, { useState, useEffect } from "react";
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaBell, FaCog, FaBook, FaCalendar, FaTasks } from 'react-icons/fa';
import { getUserNotifications, markNotificationAsRead } from "../../services/notificationService";

const ClassroomMainPage = () => {
    const { state } = useLocation(); // Lấy state từ navigate
    const roomName = state?.roomName || "Không rõ tên lớp"; // Dùng roomName từ state
    const { id } = useParams();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);

    // Fetch notifications on mount
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await getUserNotifications();
                setNotifications(data);
                const unread = data.filter((n) => !n.isRead).length;
                setUnreadCount(unread);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách thông báo:", error);
            }
        };

        fetchNotifications();
    }, []);

    const handleNotificationClick = async (notificationId) => {
        try {
            await markNotificationAsRead(notificationId);
            setNotifications((prev) =>
                prev.map((n) =>
                    n.notificationId === notificationId ? { ...n, isRead: true } : n
                )
            );
            setUnreadCount((prev) => prev - 1);
        } catch (error) {
            console.error("Lỗi khi đánh dấu thông báo là đã đọc:", error);
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left Section */}
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200">
                                <FaBars className="h-5 w-5" />
                            </button>
                            <h1 className="text-xl font-bold text-gray-900">
                            {roomName}
                            </h1>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <button
                                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 relative"
                                    onClick={() => setShowNotifications(!showNotifications)}
                                >
                                    <FaBell className="h-5 w-5" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>

                                {/* Notification Dropdown */}
                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                                        <div className="p-4 border-b border-gray-200">
                                            <h2 className="text-lg font-medium text-gray-900">Thông báo</h2>
                                        </div>
                                        <ul className="max-h-64 overflow-y-auto">
                                            {notifications.length > 0 ? (
                                                notifications.map((notification) => (
                                                    <li
                                                        key={notification.notificationId}
                                                        className={`p-3 border-b border-gray-200 cursor-pointer rounded-lg ${
                                                            !notification.isRead ? "bg-blue-50 border-l-4 border-blue-500" : "bg-white"
                                                        } hover:bg-blue-100`}
                                                        onClick={() => handleNotificationClick(notification.notificationId)}
                                                    >
                                                        <h3
                                                            className={`font-semibold ${
                                                                !notification.isRead ? "text-blue-600" : "text-gray-700"
                                                            }`}
                                                        >
                                                            {notification.content.split("\n")[0]} {/* Tiêu đề */}
                                                        </h3>
                                                        <p className="text-sm text-gray-700 mt-2">
                                                            {notification.content.split("\n")[1]} {/* Chi tiết */}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {notification.content.split("\n")[3]} {/* Thời gian */}
                                                        </p>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="p-4 text-sm text-gray-500 text-center">
                                                    Không có thông báo.
                                                </li>
                                            )}
                                        </ul>

                                    </div>
                                )}
                            </div>
                            <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200">
                                <FaCog className="h-5 w-5" />
                            </button>
                            <div className="flex items-center space-x-3">
                                <img
                                    className="h-9 w-9 rounded-full border-2 border-gray-200"
                                    src="https://via.placeholder.com/40"
                                    alt="User avatar"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 gap-6">
                {/* Sidebar */}
                <nav className="w-64 hidden lg:block">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                        </div>
                        <ul className="p-2">
                            <li className="mb-1">
                                <button
                                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200 flex items-center"
                                    onClick={() =>
                                        handleNavigate(`/classroom/${id}/exercises`)
                                    }
                                >
                                    <FaBook className="mr-3 h-5 w-5" />
                                    <span className="font-medium">Bài tập trên lớp</span>
                                </button>
                            </li>
                            <li className="mb-1">
                                <button
                                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200 flex items-center"
                                    onClick={() =>
                                        handleNavigate(`/classroom/${id}/homework`)
                                    }
                                >
                                    <FaTasks className="mr-3 h-5 w-5" />
                                    <span className="font-medium">Bài tập về nhà</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200 flex items-center"
                                    onClick={() =>
                                        handleNavigate(`/classroom/${id}/calendar`)
                                    }
                                >
                                    <FaCalendar className="mr-3 h-5 w-5" />
                                    <span className="font-medium">Lịch học</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Main Content Area */}
                <main className="flex-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Mobile Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-around items-center py-3">
                        <button
                            className="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            onClick={() => handleNavigate(`/classroom/${id}/exercises`)}
                        >
                            <FaBook className="h-6 w-6" />
                            <span className="text-xs font-medium">Bài tập</span>
                        </button>
                        <button
                            className="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            onClick={() => handleNavigate(`/classroom/${id}/homework`)}
                        >
                            <FaTasks className="h-6 w-6" />
                            <span className="text-xs font-medium">Về nhà</span>
                        </button>
                        <button
                            className="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            onClick={() => handleNavigate(`/classroom/${id}/calendar`)}
                        >
                            <FaCalendar className="h-6 w-6" />
                            <span className="text-xs font-medium">Lịch</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassroomMainPage;
