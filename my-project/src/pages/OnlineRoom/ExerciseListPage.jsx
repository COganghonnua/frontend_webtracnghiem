import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExercisesInRoom } from "../../services/classService";
import { format, isBefore } from "date-fns";
import { vi } from "date-fns/locale"; // Định dạng tiếng Việt

const ExerciseListPage = () => {
    const { id } = useParams(); // Lấy id lớp học từ URL
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const data = await getExercisesInRoom(id);
                setExercises(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bài tập:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();
    }, [id]);

    const formatDate = (date) => {
        try {
            return format(new Date(date), "dd/MM/yyyy HH:mm", { locale: vi });
        } catch (error) {
            console.error("Lỗi định dạng ngày tháng:", error);
            return date;
        }
    };

    const isExpired = (endTime) => {
        return isBefore(new Date(endTime), new Date());
    };

    if (loading) return <p className="text-center mt-6 text-gray-500">Đang tải danh sách bài tập...</p>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
                <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Danh sách bài tập</h1>
                {exercises.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exercises.map((exercise) => (
                            <li
                                key={exercise.exerciseId}
                                className={`p-4 border rounded-lg shadow hover:shadow-lg bg-white cursor-pointer transition-all hover:bg-blue-50 relative`}
                                onClick={() =>
                                    !isExpired(exercise.endTime) &&
                                    navigate(`/classroom/${id}/exercises/${exercise.exerciseId}`)
                                }
                            >
                                {/* Dấu hết hạn */}
                                {isExpired(exercise.endTime) && (
                                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                        Hết hạn
                                    </span>
                                )}
                                <h2 className="font-semibold text-lg text-blue-800 mb-2">
                                    {exercise.exerciseName}
                                </h2>
                                <p className="text-gray-600">
                                    <strong>Bắt đầu:</strong> {formatDate(exercise.startTime)}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Kết thúc:</strong> {formatDate(exercise.endTime)}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">Không có bài tập nào trong lớp học này.</p>
                )}
            </div>
        </div>
    );
};

export default ExerciseListPage;
