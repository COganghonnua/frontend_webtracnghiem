import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExamDetails, submitExam } from "../../services/examService";

const ExamDetail = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);

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
        examId: exam.examId, // ID của bài thi
        answers: Object.entries(answers).map(([questionId, answerIds]) => ({
          questionId: parseInt(questionId, 10), // ID của câu hỏi
          answerIds, // Các ID của đáp án
        })),
      };
  
      const result = await submitExam(submitData);
  
      alert(`Bạn đã hoàn thành bài thi! Điểm số của bạn: ${result.score}`);
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert(error.message || "Có lỗi xảy ra khi gửi bài thi.");
    }
  };
  
  
  
  const handleQuestionJump = (index) => {
    setCurrentQuestionIndex(index);
    setShowSidebar(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!exam) return <div>Exam not found</div>;

  const currentQuestion = exam.questions[currentQuestionIndex];
  const progress = exam ? ((currentQuestionIndex + 1) / exam.questions.length) * 100 : 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">{exam.examName}</h1>
        <div className="flex justify-between items-center mb-4">
          <span>
            <strong>Thời gian:</strong> {exam.duration} phút
          </span>
          <span>
            <strong>Phí:</strong> {exam.fee} VND
          </span>
        </div>

        {/* Thanh tiến trình */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Câu hỏi */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Câu {currentQuestionIndex + 1}: {currentQuestion.questionText}
          </h2>
          <ul>
            {currentQuestion.answers.map((answer) => (
              <li key={answer.answerId} className="mb-2">
                <label
                  htmlFor={`answer-${answer.answerId}`}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    (answers[currentQuestion.questionId] || []).includes(answer.answerId)
                      ? "bg-blue-100 border-blue-600"
                      : "bg-white border-gray-300"
                  } hover:bg-gray-100`}
                >
                  <input
                    type="checkbox"
                    id={`answer-${answer.answerId}`}
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
            className={`px-4 py-2 rounded-lg ${
              currentQuestionIndex === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          {currentQuestionIndex === exam.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <button
        onClick={() => setShowSidebar((prev) => !prev)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 z-10"
      >
        Jump to Question
      </button>

      {showSidebar && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-20 p-4">
          <h3 className="text-lg font-bold mb-4">Danh sách câu hỏi</h3>
          <ul>
            {exam.questions.map((question, index) => (
              <li
                key={question.questionId}
                className={`p-2 rounded-lg cursor-pointer mb-2 ${
                  (answers[question.questionId] || []).length > 0
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                } hover:bg-gray-200`}
                onClick={() => handleQuestionJump(index)}
              >
                Câu {index + 1}{" "}
                {(answers[question.questionId] || []).length > 0 ? "(Đã trả lời)" : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExamDetail;
