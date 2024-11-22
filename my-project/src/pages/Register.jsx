import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";


const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        phoneNumber: "",
        dateOfBirth: "",
        address: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register(formData);
            setSuccess("Đăng ký thành công!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError("Đăng ký thất bại. Vui lòng kiểm tra thông tin.");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen">
            {/* Video bên trái */}
            <div className="w-1/2 relative">
    <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ objectPosition: "left center" }} // Đặt vị trí video
    >
        <source src="/backgroundcover.mp4" type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video.
    </video>
    <div className="absolute top-0 left-0 flex items-center justify-center h-full w-full text-center px-8 animate-fade-in">
    


</div>

</div>


            {/* Form bên phải */}
            <div className="flex items-center justify-center w-full lg:w-1/2 bg-white px-6 py-12">
                <div className="w-full max-w-lg">
                    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                        Đăng ký tài khoản
                    </h2>
                    {error && (
                        <p className="text-red-500 bg-red-100 p-2 rounded mb-4 text-center">
                            {error}
                        </p>
                    )}
                    {success && (
                        <p className="text-green-500 bg-green-100 p-2 rounded mb-4 text-center">
                            {success}
                        </p>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {[
                            { id: "userName", label: "Tên đăng nhập", type: "text" },
                            { id: "email", label: "Email", type: "email" },
                            { id: "password", label: "Mật khẩu", type: "password" },
                            { id: "confirmPassword", label: "Xác nhận mật khẩu", type: "password" },
                            { id: "fullName", label: "Họ và tên", type: "text" },
                            { id: "phoneNumber", label: "Số điện thoại", type: "text" },
                            { id: "dateOfBirth", label: "Ngày sinh", type: "date" },
                            { id: "address", label: "Địa chỉ", type: "text" },
                        ].map(({ id, label, type }) => (
                            <div key={id}>
                                <label htmlFor={id} className="block text-gray-700 font-medium mb-1">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    id={id}
                                    name={id}
                                    value={formData[id]}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg shadow-md hover:opacity-90 transition-all duration-300"
                        >
                            Đăng ký
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
