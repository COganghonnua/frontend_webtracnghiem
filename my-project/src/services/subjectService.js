import axios from 'axios';

const API_BASE_URL = 'https://localhost:7253/api'; // URL API backend của bạn

// Lấy danh sách Subject
export const getSubjects = async () => {
  const response = await axios.get(`${API_BASE_URL}/subjects`);
  return response.data;
};

// Tạo mới Subject
export const createSubject = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/subjects`, data);
  console.log('Subject được tạo:', response.data);
  return response.data;
};

// Cập nhật Subject
export const updateSubject = async (id, data) => {
  const response = await axios.put(`${API_BASE_URL}/subjects/${id}`, data);
  console.log('Subject được cập nhật:', response.data);
  return response.data;
};

// Xóa Subject
export const deleteSubject = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/subjects/${id}`);
  console.log('Subject đã bị xóa:', response.data);
  return response.data;
};
