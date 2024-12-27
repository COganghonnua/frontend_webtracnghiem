import React, { useState } from "react";
import { useAuth } from "../store/authContext";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { authService } from "../services/authService";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = () => {
        window.location.href = "https://localhost:7253/api/ExternalAuth/signin-google"; // URL của API Google Login
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await login(email, password);
            const user = await authService.getCurrentUser(); // Lấy thông tin người dùng
            if (user.roles.includes("Admin")) {
                navigate("/admin"); // Điều hướng đến trang Admin
            } else {
                navigate("/"); // Điều hướng đến trang người dùng
            }
        } catch (err) {
            setError("Email hoặc mật khẩu không đúng!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Đăng nhập</h2>
                {error && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                        role="alert"
                    >
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-gray-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Mật khẩu
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? (
                                    <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                                ) : (
                                    <FaEye className="text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Ghi nhớ đăng nhập
                            </label>
                        </div>
                        <div className="text-sm">
                            <Link
                                to="/forgot-password"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Hoặc sử dụng
                    </p>
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex justify-center items-center py-2 px-4 mt-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
                    >
                        <FaGoogle className="mr-2 text-red-500" /> Đăng nhập bằng Google
                    </button>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Chưa có tài khoản?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
