import axiosClient from './axiosClient';
import { sendNotificationToClass } from './notificationService';

/**
 * Lấy danh sách các phòng mà người dùng tham gia.
 */
export async function getUserRooms() {
    try {
        const response = await axiosClient.get('/OnlineRoom/userRooms');
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách phòng:", error);
        throw error;
    }
}

/**
 * Tạo một phòng học mới.
 * @param {string} roomName - Tên của phòng.
 */
export async function createRoom(roomName) {
    try {
        const response = await axiosClient.post('/OnlineRoom/create', { roomName });
        return response.data.room;
    } catch (error) {
        console.error("Lỗi khi tạo phòng:", error);
        throw error;
    }
}

/**
 * Tham gia vào một phòng học.
 * @param {string} roomCode - Mã phòng.
 */
export async function joinRoom(roomCode) {
    try {
        const response = await axiosClient.post('/OnlineRoom/join', { roomCode });
        return response.data.userRoom;
    } catch (error) {
        console.error("Lỗi khi tham gia phòng:", error);
        throw error;
    }
}

/**
 * Tạo bài tập trong một phòng.
 * @param {number} roomId - ID phòng học.
 * @param {object} exerciseData - Dữ liệu bài tập.
 */
export async function createExercise(roomId, exerciseData) {
    try {
        const response = await axiosClient.post(`/OnlineRoom/${roomId}/exercises`, exerciseData);
        return response.data.exercise;
    } catch (error) {
        console.error("Lỗi khi tạo bài tập:", error);
        throw error;
    }
}

/**
 * Lấy danh sách bài tập trong phòng.
 * @param {number} roomId - ID phòng học.
 */
export async function getExercisesInRoom(roomId) {
    try {
        const response = await axiosClient.get(`/OnlineRoom/${roomId}/exercises`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bài tập:", error);
        throw error;
    }
}

/**
 * Lấy chi tiết bài tập.
 * @param {number} exerciseId - ID bài tập.
 */
export async function getExerciseDetails(exerciseId) {
    try {
        const response = await axiosClient.get(`/OnlineRoom/exercises/${exerciseId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết bài tập:", error);
        throw error;
    }
};
export const gradeExercise = async (exerciseId, userAnswers) => {
    try {
        const response = await axiosClient.post(`/OnlineRoom/${exerciseId}/grade`, userAnswers);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi chấm điểm:", error);
        throw error;
    }
};


/**
 * Tạo bài tập trong một phòng và gửi thông báo.
 * @param {number} roomId - ID phòng học.
 * @param {object} exerciseData - Dữ liệu bài tập.
 */
export async function createExerciseWithNotification(roomId, exerciseData) {
    try {
        // Tạo bài tập
        const exercise = await createExercise(roomId, exerciseData);

        // Tạo nội dung thông báo
        const notificationContent = `Bài tập mới: "${exercise.exerciseName}" đã được tạo trong lớp. Hạn cuối: ${exerciseData.endTime}`;
        await sendNotificationToClass(roomId, notificationContent);

        return exercise;
    } catch (error) {
        console.error("Lỗi khi tạo bài tập hoặc gửi thông báo:", error);
        throw error;
    }
}

