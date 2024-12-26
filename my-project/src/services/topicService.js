import axios from 'axios';

// Tạo một instance axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: 'https://localhost:7253/api', // URL API backend của bạn
  withCredentials: true, // Cho phép gửi cookie kèm theo yêu cầu
});

// Lấy danh sách tất cả các topic
export const getTopics = async () => {
  try {
    const response = await axiosInstance.get('/topics');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách topic:', error);
    throw error; // Ném lỗi để xử lý trong UI
  }
};

// Tạo topic mới
export const createTopic = async (data) => {
  try {
    const response = await axiosInstance.post('/topics', data);
    console.log('Topic được tạo:', response.data); // Log để kiểm tra
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo topic:', error);
    throw error; // Ném lỗi để xử lý trong UI
  }
};

// Cập nhật topic
export const updateTopic = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/topics/${id}`, data);
    console.log('Topic được cập nhật:', response.data); // Log dữ liệu mới
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật topic với ID ${id}:`, error);
    throw error; // Ném lỗi để xử lý trong UI
  }
};

// Xóa topic
export const deleteTopic = async (id) => {
  try {
    const response = await axiosInstance.delete(`/topics/${id}`);
    console.log('Xóa topic thành công:', response.data); // Log phản hồi từ API
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa topic với ID ${id}:`, error);
    throw error; // Ném lỗi để xử lý trong UI
  }
};
