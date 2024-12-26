import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExercisesInRoom } from "../../services/classService";

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

    if (loading) return <p>Đang tải danh sách bài tập...</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Danh sách bài tập</h1>
            {exercises.length > 0 ? (
                <ul className="space-y-4">
                    {exercises.map((exercise) => (
                        <li
                            key={exercise.exerciseId}
                            className="p-4 bg-white shadow rounded hover:cursor-pointer hover:bg-gray-100"
                            onClick={() => navigate(`/classroom/${id}/exercises/${exercise.exerciseId}`)}
                        >
                            <h2 className="font-semibold">{exercise.exerciseName}</h2>
                            <p>Thời gian bắt đầu: {new Date(exercise.startTime).toLocaleString()}</p>
                            <p>Thời gian kết thúc: {new Date(exercise.endTime).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Không có bài tập nào trong lớp học này.</p>
            )}
        </div>
    );
};

export default ExerciseListPage;
