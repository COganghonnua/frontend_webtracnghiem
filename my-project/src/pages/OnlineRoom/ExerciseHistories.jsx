import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllExerciseHistoriesByRoom } from "../../services/classService";
import { format } from "date-fns"; // Import từ date-fns

const formatDateTime = (dateString) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
};

const ExerciseHistories = () => {
    const { id } = useParams(); // Lấy ID của phòng từ URL
    const [histories, setHistories] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistories = async () => {
            try {
                const data = await getAllExerciseHistoriesByRoom(id); // Gọi API
                setHistories(data); // Cập nhật state
                setLoading(false); // Tắt loading
            } catch (err) {
                console.error("Lỗi khi lấy lịch sử bài tập:", err);
                setError("Không thể tải dữ liệu.");
                setLoading(false);
            }
        };

        fetchHistories(); // Lấy dữ liệu khi component mount
    }, [id]);

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;

    if (!histories || Object.keys(histories).length === 0) {
        return <p>Không có dữ liệu lịch sử làm bài.</p>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Lịch sử làm bài tập</h2>
            {Object.entries(histories).map(([exerciseName, historyList]) => (
                <div key={exerciseName} className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">{exerciseName}</h3>
                    {historyList.length > 0 ? (
                        <ul className="mt-2 space-y-2">
                            {historyList.map((history, index) => (
                                <li key={index} className="p-4 bg-gray-50 border rounded-md">
                                    <p className="text-gray-600">
                                        <span className="font-medium">Học sinh:</span> {history.userFullName}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Điểm:</span> {history.score}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Bắt đầu:</span>{" "}
                                        {formatDateTime(history.startTime)}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Kết thúc:</span>{" "}
                                        {formatDateTime(history.endTime)}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Hoàn thành:</span>{" "}
                                        {history.isCompleted ? "Có" : "Không"}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 mt-2">Không có lịch sử nào cho bài tập này.</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ExerciseHistories;
