import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExamDetails, submitExam } from "../../services/examService";

const UserExamDetail = () => {
    const { id } = useParams();
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [examResult, setExamResult] = useState(null);

    useEffect(() => {
        const fetchExamDetails = async () => {
            try {
                const data = await getExamDetails(id);
                setExam(data);
            } catch (error) {
                console.error("Error fetching exam details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExamDetails();
    }, [id]);

    const handleAnswerToggle = (questionId, answerId) => {
        if (examResult) return;
        setAnswers((prev) => {
            const currentAnswers = prev[questionId] || [];
            if (currentAnswers.includes(answerId)) {
                return {
                    ...prev,
                    [questionId]: currentAnswers.filter((id) => id !== answerId),
                };
            } else {
                return {
                    ...prev,
                    [questionId]: [...currentAnswers, answerId],
                };
            }
        });
    };

    const handleSubmit = async () => {
        try {
            const submitData = {
                userAnswers: Object.entries(answers).reduce((acc, [questionId, answerIds]) => {
                    acc[parseInt(questionId, 10)] = answerIds.map((id) => parseInt(id, 10));
                    return acc;
                }, {}),
            };
            const result = await submitExam(id, submitData);
            setExamResult(result);
        } catch (error) {
            console.error("Error submitting exam:", error);
            alert("An error occurred while submitting the exam.");
        }
    };

    const currentQuestion = exam?.questions[currentQuestionIndex];
    const progress = exam ? ((currentQuestionIndex + 1) / exam.questions.length) * 100 : 0;

    if (loading) return <div>Loading...</div>;
    if (!exam) return <div>Exam not found</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-center text-blue-700">{exam.examName}</h1>
                <div className="flex justify-between items-center my-4">
                    <p className="text-gray-600">
                        <strong>Duration:</strong> {exam.duration} minutes
                    </p>
                    <p className="text-gray-600">
                        <strong>Fee:</strong> {exam.fee} VND
                    </p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {examResult ? (
                    <div>
                        <h2 className="text-xl font-semibold text-green-600">Exam Results</h2>
                        <p className="my-4">Score: {examResult.score}</p>
                        <p>Correct Answers: {examResult.correctAnswers}/{exam.questions.length}</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Question {currentQuestionIndex + 1}: {currentQuestion.questionText}
                            </h2>
                            <ul className="space-y-3 mt-4">
                                {currentQuestion.answers.map((answer) => (
                                    <li key={answer.answerId}>
                                        <label
                                            className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                                                (answers[currentQuestion.questionId] || []).includes(answer.answerId)
                                                    ? "bg-blue-100 border-blue-500"
                                                    : "bg-white border-gray-300"
                                            } hover:bg-gray-100`}
                                        >
                                            <input
                                                type="checkbox"
                                                className="mr-3"
                                                checked={(answers[currentQuestion.questionId] || []).includes(answer.answerId)}
                                                onChange={() =>
                                                    handleAnswerToggle(currentQuestion.questionId, answer.answerId)
                                                }
                                            />
                                            {answer.answerText}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                                disabled={currentQuestionIndex === 0}
                                className={`px-4 py-2 rounded ${
                                    currentQuestionIndex === 0
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-blue-500 text-white hover:bg-blue-600"
                                }`}
                            >
                                Previous
                            </button>
                            {currentQuestionIndex === exam.questions.length - 1 ? (
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Submit
                                </button>
                            ) : (
                                <button
                                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserExamDetail;
