import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserRooms, createRoom, joinRoom } from "../../services/classService";
import { FaPlus, FaSignInAlt } from "react-icons/fa";

const ClassroomPage = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);

    const [newRoomName, setNewRoomName] = useState("");
    const [joinRoomCode, setJoinRoomCode] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setLoading(true);
                const userRooms = await getUserRooms();
                if (!Array.isArray(userRooms)) {
                    throw new Error("Dữ liệu trả về không hợp lệ");
                }
                if (userRooms.length === 0) {
                    toast.info("Bạn chưa tham gia lớp nào.");
                }
                setRooms(userRooms);
            } catch (error) {
                toast.error("Lỗi khi tải danh sách lớp.");
                console.error("Lỗi khi tải danh sách lớp:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    const handleCreateRoom = async () => {
        if (!newRoomName.trim()) {
            toast.error("Tên lớp không được để trống.");
            return;
        }
        try {
            const room = await createRoom(newRoomName);
            setRooms((prev) => [...prev, room]);
            toast.success("Tạo lớp thành công!");
            setShowCreateModal(false);
            setNewRoomName("");
        } catch (error) {
            toast.error("Lỗi khi tạo lớp. Vui lòng thử lại.");
            console.error("Lỗi khi tạo lớp:", error);
        }
    };

    const handleJoinRoom = async () => {
        if (!joinRoomCode.trim()) {
            toast.error("Mã lớp không được để trống.");
            return;
        }
        try {
            await joinRoom(joinRoomCode);
            const updatedRooms = await getUserRooms();
            if (!Array.isArray(updatedRooms)) {
                throw new Error("Dữ liệu trả về không hợp lệ");
            }
            setRooms(updatedRooms);
            toast.success("Tham gia lớp thành công!");
            setShowJoinModal(false);
            setJoinRoomCode("");
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Lỗi không xác định.";
            toast.error(`Lỗi khi tham gia lớp: ${errorMsg}`);
            console.error("Lỗi khi tham gia lớp:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <ToastContainer />
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-700">Lớp học trực tuyến</h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                    >
                        <FaPlus />
                        Tạo lớp
                    </button>
                    <button
                        onClick={() => setShowJoinModal(true)}
                        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
                    >
                        <FaSignInAlt />
                        Tham gia lớp
                    </button>
                </div>
            </div>

            {/* Hiển thị danh sách lớp */}
            {loading ? (
                <p className="text-gray-500">Đang tải danh sách lớp...</p>
            ) : rooms.length === 0 ? (
                <p className="text-gray-500">Bạn chưa tham gia lớp nào.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                        <div
                            key={room.onlineRoomId}
                            className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all"
                            onClick={() => {
                                navigate(`/classroom/${room.onlineRoomId}`, { state: { roomName: room.roomName } });
                            }}
                            
                        >
                            <h2 className="text-xl font-bold text-gray-700 mb-2">{room.roomName}</h2>
                            <p className="text-sm text-gray-500">Mã lớp: {room.roomCode}</p>
                            <p className="text-sm text-gray-500 mt-2">Ngày tạo: {new Date(room.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Tạo Lớp */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <h3 className="text-lg font-bold mb-4">Tạo lớp mới</h3>
                        <input
                            type="text"
                            placeholder="Tên lớp"
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="text-gray-600 hover:underline"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleCreateRoom}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                            >
                                Tạo
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Tham Gia Lớp */}
            {showJoinModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <h3 className="text-lg font-bold mb-4">Tham gia lớp</h3>
                        <input
                            type="text"
                            placeholder="Mã lớp"
                            value={joinRoomCode}
                            onChange={(e) => setJoinRoomCode(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowJoinModal(false)}
                                className="text-gray-600 hover:underline"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleJoinRoom}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
                            >
                                Tham gia
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassroomPage;
