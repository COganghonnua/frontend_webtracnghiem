import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExamHistory } from "../../services/examService";

const ExamHistoryDetail = () => {
  const { examId } = useParams();
  const [examHistory, setExamHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExamHistory = async () => {
      try {
        const data = await getExamHistory(examId);
        setExamHistory(data);
      } catch (error) {
        console.error("Error fetching exam history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamHistory();
  }, [examId]);

  if (loading) return <div>Loading...</div>;
  if (!examHistory) return <div>Exam history not found</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        {examHistory.examName} - Kết quả
      </h1>
      <p>Điểm: {examHistory.score}</p>
      <p>Ngày thi: {new Date(examHistory.examDate).toLocaleDateString()}</p>

      <h2 className="text-xl font-semibold mt-6">Danh sách câu hỏi</h2>
      <ul>
        {examHistory.questions.map((question, index) => (
          <li key={question.questionId} className="my-4">
            <h3 className="font-bold">
              {index + 1}. {question.questionText}
            </h3>
            <ul>
              {question.answers.map((answer) => (
                <li
                  key={answer.answerId}
                  className={`p-2 ${
                    answer.isCorrect
                      ? "bg-green-100 text-green-700"
                      : question.selectedAnswers.includes(answer.answerId)
                      ? "bg-red-100 text-red-700"
                      : ""
                  }`}
                >
                  {answer.answerText}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamHistoryDetail;
