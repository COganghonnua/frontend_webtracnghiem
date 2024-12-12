// src/services/classService.js
import axios from 'axios';

const API_URL = "https://localhost:7253/api";

export async function getUserRooms() {
    const response = await axios.get(`${API_URL}/OnlineRoom/userRooms`, { withCredentials: true });
    return response.data; // Giả sử trả về mảng room { roomCode, roomName, createdAt }
}

export async function createRoom(roomName) {
    const response = await axios.post(`${API_URL}/OnlineRoom/create`, { roomName }, { withCredentials: true });
    return response.data.room;
}

export async function joinRoom(roomCode) {
    const response = await axios.post(`${API_URL}/OnlineRoom/join`, { roomCode }, { withCredentials: true });
    return response.data.userRoom; // hoặc tùy thuộc vào response
}
