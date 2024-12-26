// src/features/questions/QuestionList.jsx
import { useNavigate } from "react-router-dom";

const QuestionList = ({ questions, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {questions.map((question) => (
        <div
          key={question.questionId}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          <h2 className="text-xl font-semibold">{question.questionText}</h2>
          <p className="text-gray-600">{question.explanation}</p>
          <div className="mt-4 flex space-x-3">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => navigate(`/admin/questions/${question.questionId}`)}
            >
              Details
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
              onClick={() => onEdit(question)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={() => onDelete(question.questionId)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
