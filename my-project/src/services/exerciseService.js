// import axiosClient from './axiosClient';

// /**
//  * Tạo bài tập trong một phòng.
//  * @param {number} roomId - ID của phòng.
//  * @param {object} exerciseData - Dữ liệu bài tập.
//  */
// export const createExercise = async (roomId, exerciseData) => {
//     try {
//         const response = await axiosClient.post(`/OnlineRoom/${roomId}/exercises`, exerciseData);
//         return response.data.exercise;
//     } catch (error) {
//         console.error("Lỗi khi tạo bài tập:", error);
//         throw error;
//     }
// };

// /**
//  * Lấy danh sách bài tập trong phòng.
//  * @param {number} roomId - ID của phòng.
//  */
// export const getExercisesInRoom = async (roomId) => {
//     try {
//         const response = await axiosClient.get(`/OnlineRoom/${roomId}/exercises`);
//         return response.data;
//     } catch (error) {
//         console.error("Lỗi khi lấy danh sách bài tập:", error);
//         throw error;
//     }
// };

// /**
//  * Lấy chi tiết bài tập.
//  * @param {number} exerciseId - ID của bài tập.
//  */
// export const getExerciseDetails = async (exerciseId) => {
//     try {
//         const response = await axiosClient.get(`/OnlineRoom/exercises/${exerciseId}`);
//         return response.data;
//     } catch (error) {
//         console.error("Lỗi khi lấy chi tiết bài tập:", error);
//         throw error;
//     }
// };

// /**
//  * Gửi câu trả lời của người dùng và chấm điểm bài tập.
//  * @param {number} exerciseId - ID bài tập.
//  * @param {array} userAnswers - Danh sách câu trả lời của người dùng.
//  */
// export const gradeExercise = async (exerciseId, userAnswers) => {
//     try {
//         const response = await axiosClient.post(`/OnlineRoom/${exerciseId}/grade`, userAnswers);
//         return response.data;
//     } catch (error) {
//         console.error("Lỗi khi nộp bài tập:", error);
//         throw error;
//     }
// };
