import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionById } from "../../services/questionsService";

const QuestionDetail = () => {
    const { id } = useParams(); // Lấy `id` từ URL
    const [question, setQuestion] = useState(null); // Dữ liệu câu hỏi
    const [loading, setLoading] = useState(true); // Trạng thái tải

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const data = await getQuestionById(id); // Gọi API để lấy dữ liệu câu hỏi
                setQuestion(data);
            } catch (error) {
                console.error("Error fetching question details:", error);
            } finally {
                setLoading(false); // Kết thúc trạng thái tải
            }
        };

        fetchQuestion();
    }, [id]);

    if (loading) return <div className="text-center mt-10">Loading question details...</div>;
    if (!question) return <div className="text-center mt-10">Question not found.</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-blue-700 mb-4">Question Detail</h1>

                {/* Chi tiết câu hỏi */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">{question.questionText}</h2>
                    <p className="text-gray-600 mb-2">
                        <strong>Subject:</strong> {question.subjectName}
                    </p>
                    <p className="text-gray-600">
                        <strong>Difficulty:</strong> {["Easy", "Medium", "Hard"][question.difficulty - 1]}
                    </p>
                </div>

                {/* Đáp án */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Answers:</h3>
                    <ul className="space-y-3">
                        {question.answers.map((answer) => (
                            <li
                                key={answer.answerId}
                                className={`p-4 border rounded-lg ${
                                    answer.isCorrect ? "bg-green-100 border-green-500" : "bg-white border-gray-300"
                                }`}
                            >
                                {answer.answerText}
                                {answer.isCorrect && (
                                    <span className="ml-2 text-green-600 font-bold">(Correct)</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Giải thích câu hỏi */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Explanation:</h3>
                    <p className="text-gray-700">{question.explanation}</p>
                </div>
            </div>
        </div>
    );
};

export default QuestionDetail;
