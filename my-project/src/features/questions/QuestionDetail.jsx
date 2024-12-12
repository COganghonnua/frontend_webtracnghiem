import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getQuestionById,
  updateQuestion,
} from "../../services/questionsService";
import { getSubjects } from "../../services/subjectService";

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionData, subjectsData] = await Promise.all([
          getQuestionById(id),
          getSubjects(),
        ]);
        setQuestion(questionData);
        setSubjects(subjectsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Unable to load question details. Please try again later.");
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleAnswerChange = (index, field, value) => {
    const updatedAnswers = [...question.answers];
    updatedAnswers[index][field] =
      field === "isCorrect" ? value === "true" : value;
    setQuestion({ ...question, answers: updatedAnswers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Chuẩn hóa payload
    const payload = {
      questionText: question.questionText, 
      explanation: question.explanation,  
      difficulty: parseInt(question.difficulty, 10), // Chuyển thành số
      subjectId: parseInt(question.subjectId, 10),   // Chuyển thành số
      answers: question.answers.map((answer) => ({
        answerId: answer.answerId || 0,  // Nếu là đáp án mới, đặt answerId = 0
        answerText: answer.answerText,   // Văn bản đáp án
        isCorrect: Boolean(answer.isCorrect), // Chuyển thành boolean
      })),
    };
  
    console.log("Payload gửi đi:", JSON.stringify(payload, null, 2));
  
    try {
      await updateQuestion(id, payload);
      alert("Question updated successfully!");
      navigate("/questions");
    } catch (error) {
      console.error("Failed to update question:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to update question.");
    }
  };
  

  if (!question) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Question Detail</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Question Text</label>
          <input
            type="text"
            name="questionText"
            value={question.questionText}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Explanation</label>
          <textarea
            name="explanation"
            value={question.explanation}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Difficulty</label>
          <select
            name="difficulty"
            value={question.difficulty}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="1">Easy</option>
            <option value="2">Medium</option>
            <option value="3">Hard</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Subject</label>
          <select
            name="subjectId"
            value={question.subjectId}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          >
            {subjects.map((subject) => (
              <option key={subject.subjectId} value={subject.subjectId}>
                {subject.subjectName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold">Answers</h3>
          {question.answers.map((answer, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={answer.answerText}
                onChange={(e) =>
                  handleAnswerChange(index, "answerText", e.target.value)
                }
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                required
              />
              <select
                value={answer.isCorrect.toString()}
                onChange={(e) =>
                  handleAnswerChange(index, "isCorrect", e.target.value)
                }
                className="border border-gray-300 rounded-lg px-2 py-1"
              >
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2"
            onClick={() => navigate("/questions")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionDetail;
