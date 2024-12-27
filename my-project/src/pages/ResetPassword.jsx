import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { authService } from '../services/authService';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

    // Tách giá trị trực tiếp từ URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const emailParam = params.get('email');
        const tokenParam = params.get('token');

        setEmail(emailParam || ''); // Gán email từ URL

        // Xử lý token: thay khoảng trắng bằng + (nếu có)
        if (tokenParam) {
            const fixedToken = tokenParam.replace(/ /g, '+');
            setToken(fixedToken);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }
        if (newPassword.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp.');
            return;
        }
        if (!email || !token) {
            setError('Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.');
            return;
        }

        setMessage('');
        setError('');
        setIsLoading(true);

        try {
            console.log("Token từ URL (sau xử lý):", token);

            await authService.resetPassword({
                email,
                token, // Gửi trực tiếp token đã xử lý
                newPassword,
            });

            setMessage('Mật khẩu của bạn đã được đặt lại thành công.');

            // Chờ 3 giây, sau đó chuyển hướng về trang đăng nhập
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                'Không thể đặt lại mật khẩu. Token có thể đã hết hạn.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Đặt lại mật khẩu</h2>
                {message && (
                    <div
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                        role="alert"
                    >
                        <span className="block sm:inline">{message}</span>
                        <p className="text-sm text-gray-700 mt-2">
                            Đang chuyển hướng đến trang đăng nhập...
                        </p>
                    </div>
                )}
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
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            Mật khẩu mới
                        </label>
                        <div className="relative">
                            <input
                                id="newPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="block w-full pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? 'Ẩn' : 'Hiện'}
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            id="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                            isLoading || !newPassword || !confirmPassword ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={isLoading || !newPassword || !confirmPassword}
                    >
                        {isLoading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Quay lại Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
