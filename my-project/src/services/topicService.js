import axios from 'axios';

// Cập nhật URL base
const API_BASE_URL = 'https://localhost:7253/api'; // URL API backend của bạn

// Lấy danh sách tất cả các topic
export const getTopics = async () => {
  const response = await axios.get(`${API_BASE_URL}/topics`);
  return response.data;
};

export const createTopic = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/topics`, data);
    console.log('Topic được tạo:', response.data); // Log để kiểm tra
    return response.data;
  };
  
  export const updateTopic = async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/topics/${id}`, data);
    console.log('Topic được cập nhật:', response.data); // Log dữ liệu mới
    return response.data; // Trả về topic đã được cập nhật
  };
  
  
  export const deleteTopic = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/topics/${id}`);
      console.log('Xóa topic thành công:', response.data); // Log phản hồi từ API
      return response.data; // Trả về phản hồi
    } catch (error) {
      console.error('Lỗi khi xóa topic:', error);
      throw error; // Ném lỗi để xử lý trong UI
    }
  };
  