import axiosClient from './axiosClient';
import { sendNotificationToClass } from './notificationService';

/**
 * Lấy danh sách bài viết trong một lớp học.
 * @param {number} roomId - ID của lớp học.
 */
export const getPostsByRoom = async (roomId) => {
    try {
        const response = await axiosClient.get(`/Post/${roomId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết:", error);
        throw error;
    }
};

/**
 * Tạo bài viết mới trong lớp học.
 * @param {FormData} postData - Dữ liệu bài viết (bao gồm nội dung và file đính kèm).
 */
export const createPost = async (postData) => {
    try {
        const response = await axiosClient.post(`/Post/create`, postData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        const newPost = response.data.post;

        const roomId = postData.get("OnlineRoomId");
        const roomName = postData.get("RoomName"); // Lấy tên lớp từ FormData

        // Tạo nội dung thông báo rõ ràng hơn
        const content = `
            📢 **Thông báo mới từ lớp ${roomName}**:
            ✍️ *Người tạo*: ${newPost.createdBy}
            📝 *Nội dung*: "${newPost.content.length > 50 ? newPost.content.substring(0, 50) + '...' : newPost.content}"
            ⏰ *Thời gian*: ${new Date(newPost.createdAt).toLocaleString()}
        `;

        // Gửi thông báo
        await sendNotificationToClass(roomId, content);

        return newPost;
    } catch (error) {
        console.error("Lỗi khi tạo bài viết:", error);
        throw error;
    }
};


/**
 * Lấy danh sách bình luận của một bài viết.
 * @param {number} postId - ID của bài viết.
 */
export const getCommentsByPost = async (postId) => {
    try {
        const response = await axiosClient.get(`/Post/${postId}/comments`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bình luận:", error);
        throw error;
    }
};

/**
 * Thêm bình luận mới vào bài viết.
 * @param {number} postId - ID của bài viết.
 * @param {object} commentData - Nội dung bình luận.
 */
export const addCommentToPost = async (postId, commentData) => {
    try {
        const response = await axiosClient.post(`/Post/${postId}/comments`, commentData);
        return response.data.comment;
    } catch (error) {
        console.error("Lỗi khi thêm bình luận:", error);
        throw error;
    }
};


