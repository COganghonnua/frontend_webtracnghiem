import React, { useState } from "react";
import { useAuth } from "../store/authContext";
import { paymentService } from "../services/paymentService";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { user, isLoading } = useAuth(); // Thêm trạng thái isLoading
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handlePayment = async (method) => {
    if (!amount || amount < 10000 || amount > 500000) {
      setError("Số tiền phải nằm trong khoảng từ 10,000 đến 500,000 VND");
      return;
    }
    setError("");

    try {
      const response = await paymentService.createPayment(amount, method);
      if (response.paymentUrl) {
        window.location.href = response.paymentUrl; // Điều hướng tới VNPay hoặc MoMo
      }
    } catch (err) {
      console.error("Lỗi thanh toán:", err);
      setError("Đã xảy ra lỗi khi tạo thanh toán, vui lòng thử lại.");
    }
  };

  if (isLoading) {
    return <p>Đang kiểm tra trạng thái đăng nhập...</p>;
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Nạp Tiền</h1>
        <input
          type="number"
          placeholder="Nhập số tiền muốn nạp"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:border-blue-300"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-between">
          <button
            onClick={() => handlePayment("vnpay")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Thanh toán VNPay
          </button>
          <button
            onClick={() => handlePayment("momo")}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Thanh toán MoMo
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
