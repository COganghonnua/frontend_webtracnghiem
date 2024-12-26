import axiosClient from './axiosClient';

/**
 * Lấy danh sách thông báo của người dùng.
 */
export async function getUserNotifications() {
    try {
        const response = await axiosClient.get('/Notification/user');
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy thông báo:", error);
        throw error;
    }
}

/**
 * Gửi thông báo đến lớp học.
 * @param {number} roomId - ID của lớp học.
 * @param {string} content - Nội dung thông báo.
 */
export async function sendNotificationToClass(roomId, content) {
    try {
        await axiosClient.post('/Notification/send-to-class', { roomId, content });
    } catch (error) {
        console.error("Lỗi khi gửi thông báo:", error);
        throw error;
    }
}

/**
 * Đánh dấu thông báo là đã đọc.
 * @param {number} notificationId - ID của thông báo.
 */
export async function markNotificationAsRead(notificationId) {
    try {
        await axiosClient.post(`/Notification/mark-as-read/${notificationId}`);
    } catch (error) {
        console.error("Lỗi khi đánh dấu thông báo:", error);
        throw error;
    }
}

/**
 * Kiểm tra xem có thông báo chưa đọc không.
 */
export async function checkUnreadNotifications() {
    try {
        const notifications = await getUserNotifications();
        return notifications.some(notification => !notification.isRead);
    } catch (error) {
        console.error("Lỗi khi kiểm tra thông báo chưa đọc:", error);
        throw error;
    }
}
