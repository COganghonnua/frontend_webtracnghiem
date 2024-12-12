import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiCheckCircle, FiXCircle, FiAlertCircle } from "react-icons/fi";

const PaymentResultPage = () => {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const success = queryParams.get("success");
    const message = queryParams.get("message");

    if (success === "true") {
      setPaymentStatus("Thanh toán thành công!");
    } else {
      setPaymentStatus("Thanh toán thất bại.");
    }

    setMessage(decodeURIComponent(message));
  }, [location.search]);

  const getStatusIcon = () => {
    if (paymentStatus === "Thanh toán thành công!") {
      return <FiCheckCircle className="text-green-500 w-16 h-16 mb-4" />;
    } else if (paymentStatus === "Thanh toán thất bại.") {
      return <FiXCircle className="text-red-500 w-16 h-16 mb-4" />;
    }
    return <FiAlertCircle className="text-yellow-500 w-16 h-16 mb-4" />;
  };

  const getStatusColor = () => {
    if (paymentStatus === "Thanh toán thành công!") {
      return "text-green-600";
    } else if (paymentStatus === "Thanh toán thất bại.") {
      return "text-red-600";
    }
    return "text-yellow-600";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center">
          {getStatusIcon()}
          <h1 className={`text-2xl font-bold mb-4 ${getStatusColor()}`}>
            Kết quả thanh toán
          </h1>
          <p className={`text-xl mb-4 ${getStatusColor()}`}>{paymentStatus}</p>
          <p className="text-gray-600 text-center">{message}</p>
        </div>
        <div className="mt-8">
          <a
            href="/"
            className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            Trở về trang chủ
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentResultPage;

