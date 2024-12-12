// src/services/questionsService.js
import axios from 'axios';

const BASE_URL = "https://localhost:7253/api/Questions"; // Thay bằng URL thật nếu cần.

export const getQuestions = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getQuestionById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createQuestion = async (data) => {
  const response = await axios.post(BASE_URL, data);
  console.log("Dứ liệu gửi đi",data);
  return response.data;
};

export const updateQuestion = async (id, data) => {
  console.log("data :", data);
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
// export const importQuestions = async (formData) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/import`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data", // Đảm bảo đúng header cho multipart
//       },
//     });
//     return response.data; // Trả về dữ liệu từ backend
//   } catch (error) {
//     console.error("Error during importQuestions:", error.response || error);
//     throw error; // Ném lỗi để frontend xử lý
//   }
// };
export const importQuestions = async (questions) => {
  try {
    const response = await axios.post(`${BASE_URL}/import`, questions, {
      headers: {
        "Content-Type": "application/json", // Gửi dữ liệu JSON
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during importQuestions:", error.response || error);
    throw error;
  }
};
