import axios from "axios";

// Địa chỉ API của backend
const API_BASE_URL = "https://localhost:7253/api";

// Cấu hình axios để gửi cookie
export const paymentService = {
  createPayment: async (amount, method) => {
    try {
      // Thực hiện yêu cầu POST tới backend
      const response = await axios.post(
        `${API_BASE_URL}/VNPay/create-payment`, // URL API
        { 
          amount,
          orderType: method === "vnpay" ? "vnpay" : "momo",
        }, 
        { 
          withCredentials: true // Gửi cookie với yêu cầu
        }
      );
      console.log("Kết quả từ createPayment:", response.data); // Log để kiểm tra
      return response.data;
    } catch (err) {
      console.error("Lỗi khi gọi API createPayment:", err);
      throw err;
    }
  }
};
