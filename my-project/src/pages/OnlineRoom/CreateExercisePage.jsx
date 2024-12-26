import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createExercise,createExerciseWithNotification  } from "../../services/classService";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const CreateExercisePage = () => {
    const { id } = useParams();
    const [exerciseName, setExerciseName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [questions, setQuestions] = useState([
        { questionText: "", answers: [{ answerText: "", isCorrect: false }] },
    ]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { questionText: "", answers: [{ answerText: "", isCorrect: false }] }]);
    };

    const handleAddAnswer = (qIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answers.push({ answerText: "", isCorrect: false });
        setQuestions(newQuestions);
    };

    const handleQuestionChange = (qIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].questionText = value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (qIndex, aIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answers[aIndex].answerText = value;
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (qIndex, aIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answers[aIndex].isCorrect = value;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (questions.length === 0) {
            toast.error("Phải có ít nhất một câu hỏi trong bài tập.");
            return;
        }
    
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const correctAnswers = question.answers.filter((a) => a.isCorrect);
    
            if (correctAnswers.length === 0) {
                toast.error(`Câu hỏi ${i + 1} phải có ít nhất một đáp án đúng.`);
                return;
            }
    
            if (correctAnswers.length === question.answers.length) {
                toast.error(`Câu hỏi ${i + 1} không được chọn tất cả đáp án đúng.`);
                return;
            }
        }
    
        try {
            const exerciseData = {
                exerciseName,
                startTime,
                endTime,
                questions,
            };
            await createExerciseWithNotification(id, exerciseData);
            toast.success("Bài tập và thông báo đã được tạo thành công!");
        } catch (error) {
            console.error("Lỗi khi tạo bài tập hoặc thông báo:", error);
            toast.error("Không thể tạo bài tập hoặc thông báo.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4">Tạo bài tập mới</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Tên bài tập</label>
                    <input
                        type="text"
                        value={exerciseName}
                        onChange={(e) => setExerciseName(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Thời gian bắt đầu</label>
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Thời gian kết thúc</label>
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-700">Danh sách câu hỏi</h3>
                    {questions.map((question, qIndex) => (
                        <div key={qIndex} className="mb-4">
                            <label className="block text-gray-700 mb-c2">Câu hỏi {qIndex + 1}</label>
                            <input
                                type="text"
                                value={question.questionText}
                                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 mb-2"
                                placeholder="Nhập câu hỏi"
                                required
                            />
                            {question.answers.map((answer, aIndex) => (
                                <div key={aIndex} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        value={answer.answerText}
                                        onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                                        className="flex-grow border rounded-lg px-3 py-2"
                                        placeholder={`Đáp án ${aIndex + 1}`}
                                        required
                                    />
                                    <label className="ml-4 flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={answer.isCorrect}
                                            onChange={(e) => handleCorrectAnswerChange(qIndex, aIndex, e.target.checked)}
                                            className="mr-2"
                                        />
                                        Đúng
                                    </label>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddAnswer(qIndex)}
                                className="text-blue-600 hover:underline mt-2"
                            >
                                + Thêm đáp án
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="text-blue-600 hover:underline"
                    >
                        + Thêm câu hỏi
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    Tạo bài tập
                </button>
            </form>
        </div>
    );
};

export default CreateExercisePage;
