import axios from "axios";

const BASE_URL = "https://localhost:7253/api/exams"; // Cập nhật URL của bạn

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Cho phép gửi cookie trong yêu cầu
});

export const createExam = async (examData) => {
  try {
    const response = await axios.post(`${BASE_URL}/random`, examData);
    return response.data;
  } catch (error) {
    console.error("Error creating exam:", error);
    throw error.response.data;
  }
};
export const getExams = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching exams:", error);
    throw error.response.data;
  }
};

export const deleteExam = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting exam:", error);
    throw error.response.data;
  }
};

export const updateExam = async (id, examData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, examData);
    return response.data;
  } catch (error) {
    console.error("Error updating exam:", error);
    throw error.response.data;
  }
};
export const getExamDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/questions`);
    return response.data.data; // Trả về phần dữ liệu chính
  } catch (error) {
    console.error("Error fetching exam details:", error);
    throw error.response.data;
  }
};
export const submitExam = async (examId, payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/${examId}/submit`, payload, {
      withCredentials: true, // Nếu cần JWT hoặc cookie
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting exam:", error);
    throw error.response?.data || "Error occurred while submitting the exam";
  }
};
export const getExamHistory = async (examId) => {
  try {
    const response = await axiosInstance.get(`/exams/${examId}/details`);
    return response.data; // Đảm bảo dữ liệu trả về đúng cấu trúc từ API
  } catch (error) {
    console.error("Error fetching exam history:", error);
    throw error.response?.data || "Error occurred while fetching exam history";
  }
};


