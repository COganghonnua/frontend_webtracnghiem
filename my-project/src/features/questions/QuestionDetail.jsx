import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import `useParams` và `useNavigate`
import { getExamDetails, submitExam } from "../../services/examService";

const ExamDetail = () => {
  const { id } = useParams(); // Lấy `examId` từ URL
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  // Lấy chi tiết bài thi
  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const data = await getExamDetails(id); // Lấy dữ liệu bài thi từ API
        setExam(data);
      } catch (error) {
        console.error("Error fetching exam details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [id]);

  // Cập nhật câu trả lời khi người dùng chọn
  const handleAnswerToggle = (questionId, answerId) => {
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

  // Gửi bài thi
  const handleSubmit = async () => {
    try {
      const payload = {
        userAnswers: Object.entries(answers).reduce((acc, [questionId, answerIds]) => {
          acc[questionId] = answerIds.map((id) => parseInt(id, 10)); // Chuyển ID thành số
          return acc;
        }, {}),
      };

      const result = await submitExam(id, payload); // Gọi API submit bài thi
      alert(`Bài thi đã được nộp thành công! Điểm số của bạn: ${result.score}`);
      navigate(`/admin/exams/${id}/history`); // Điều hướng về lịch sử bài thi
    } catch (error) {
      console.error("Lỗi khi gửi bài thi:", error);
      alert(error.response?.data?.message || "Có lỗi xảy ra khi gửi bài thi.");
    }
  };

  // Xử lý chuyển câu hỏi
  const handleQuestionJump = (index) => {
    setCurrentQuestionIndex(index);
  };

  if (loading) return <div>Loading...</div>;
  if (!exam) return <div>Exam not found</div>;

  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">{exam.examName}</h1>

        {/* Hiển thị câu hỏi */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Câu {currentQuestionIndex + 1}: {currentQuestion.questionText}
          </h2>
          <ul>
            {currentQuestion.answers.map((answer) => (
              <li key={answer.answerId} className="mb-2">
                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    (answers[currentQuestion.questionId] || []).includes(answer.answerId)
                      ? "bg-blue-100 border-blue-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={(answers[currentQuestion.questionId] || []).includes(answer.answerId)}
                    onChange={() => handleAnswerToggle(currentQuestion.questionId, answer.answerId)}
                    className="mr-3"
                  />
                  {answer.answerText}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Nút điều hướng */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
          >
            Quay lại
          </button>
          {currentQuestionIndex === exam.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Nộp bài
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Tiếp theo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamDetail;
