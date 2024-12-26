import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExamDetails, submitExam } from "../../services/examService";

const ExamDetail = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [examResult, setExamResult] = useState(null); // Store exam result

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
    if (examResult) return; // Prevent changes after submitting the exam
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

      const result = await submitExam(id, submitData); // Submit the exam
      setExamResult(result); // Store the result in state
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert(error.message || "An error occurred while submitting the exam.");
    }
  };

  const currentQuestion = exam?.questions[currentQuestionIndex];
  const progress = exam ? ((currentQuestionIndex + 1) / exam.questions.length) * 100 : 0;

  if (loading) return <div>Loading...</div>;
  if (!exam) return <div>Exam not found</div>;

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

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Show result after submission */}
        {examResult ? (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-green-600">Kết quả bài thi</h2>
            <p>Điểm số: {examResult.score}</p>
            <p>Tổng câu hỏi: {examResult.totalQuestions}</p>
            <p>Số câu đúng: {examResult.correctAnswers}</p>
            <div className="mt-6">
              <h3 className="text-xl font-bold">Chi tiết câu trả lời:</h3>
              <ul>
                {exam.questions.map((question, index) => (
                  <li key={question.questionId} className="my-4">
                    <h4 className="font-semibold">
                      Câu {index + 1}: {question.questionText}
                    </h4>
                    <ul>
                      {question.answers.map((answer) => {
                        const isSelected = (answers[question.questionId] || []).includes(
                          answer.answerId
                        );
                        const isCorrect = answer.isCorrect;

                        return (
                          <li
                            key={answer.answerId}
                            className={`p-2 ${
                              isCorrect
                                ? "bg-green-100 text-green-700"
                                : isSelected
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100"
                            }`}
                          >
                            {answer.answerText} {isCorrect && "(Đúng)"}
                            {isSelected && !isCorrect && "(Sai)"}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <>
            {/* Show questions before submission */}
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
                        onChange={() =>
                          handleAnswerToggle(currentQuestion.questionId, answer.answerId)
                        }
                        className="mr-3"
                      />
                      {answer.answerText}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation buttons */}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ExamDetail;
