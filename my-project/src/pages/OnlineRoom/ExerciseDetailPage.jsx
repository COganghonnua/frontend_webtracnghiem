import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExerciseDetails, gradeExercise } from "../../services/classService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExerciseDetailPage = () => {
    const { exerciseId } = useParams();
    const navigate = useNavigate();
    const [exercise, setExercise] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [remainingTime, setRemainingTime] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const data = await getExerciseDetails(exerciseId);
                setExercise(data);

                const now = new Date();
                const endTime = new Date(data.endTime);
                const remaining = Math.max((endTime - now) / 1000, 0);
                setRemainingTime(remaining);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết bài tập:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExercise();
    }, [exerciseId]);

    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime((prev) => Math.max(prev - 1, 0));
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [remainingTime]);

    const handleAnswerChange = (questionId, answerId, isChecked) => {
        setUserAnswers((prev) => {
            const updatedAnswers = prev[questionId] || [];
            if (isChecked) {
                return {
                    ...prev,
                    [questionId]: [...updatedAnswers, answerId],
                };
            } else {
                return {
                    ...prev,
                    [questionId]: updatedAnswers.filter((id) => id !== answerId),
                };
            }
        });
    };

    const handleSubmit = async () => {
        try {
            const answers = Object.entries(userAnswers).map(([questionId, answerIds]) => ({
                questionId: Number(questionId),
                answerIds: answerIds.map(Number),
            }));
    
            const result = await gradeExercise(exerciseId, answers);
    
            // Tính điểm hệ số 10
            const score = (result.correctAnswers / result.totalQuestions) * 10;
    
            toast.success(
                `🎉 Bạn đã hoàn thành bài thi! 
                ✅ Đúng: ${result.correctAnswers}/${result.totalQuestions}
                🏆 Điểm: ${score.toFixed(2)}`, // Điểm hệ 10 hiển thị làm tròn 2 chữ số
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                }
            );
    
            setTimeout(() => navigate(-1), 5000);
        } catch (error) {
            toast.error("❌ Lỗi khi nộp bài, vui lòng thử lại.");
        }
    };
    

    if (loading) return <p className="text-center mt-6">Đang tải bài tập...</p>;
    if (!exercise) return <p className="text-center mt-6 text-red-500">Không tìm thấy bài tập.</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">{exercise.exerciseName}</h1>
                <div className="text-lg text-gray-700">
                    <span>Thời gian còn lại: </span>
                    <span className="font-semibold text-blue-600">
                        {Math.floor(remainingTime / 60)} phút {Math.floor(remainingTime % 60)} giây
                    </span>
                </div>
            </header>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="space-y-6">
                {exercise.questions.map((question) => (
                    <div key={question.exerciseQuestionId} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                        <h2 className="font-semibold text-lg mb-3">{question.questionText}</h2>
                        <ul className="space-y-2">
                            {question.answers.map((answer) => (
                                <li key={answer.exerciseAnswerId}>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name={`question-${question.exerciseQuestionId}`}
                                            className="mr-2"
                                            onChange={(e) =>
                                                handleAnswerChange(
                                                    question.exerciseQuestionId,
                                                    answer.exerciseAnswerId,
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        {answer.answerText}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-600 transition"
                >
                    Nộp bài
                </button>
            </div>
        </div>
    );
};

export default ExerciseDetailPage;
