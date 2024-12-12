import React, { useState, useEffect } from "react";
import {
  createQuestion,
  updateQuestion,
  getQuestions,
} from "../../services/questionsService";
import { getSubjects } from "../../services/subjectService";

const QuestionForm = ({ question, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    questionText: "",
    explanation: "",
    difficulty: 1, // Giá trị mặc định là 1 (Easy)
    subjectId: "",
    answers: [{ answerText: "", isCorrect: false }],
  });

  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
        setError("Unable to load subjects. Please try again later.");
      }
    };

    fetchSubjects();

    if (question) {
      setFormData({
        ...question,
        difficulty: question.difficulty || 1, // Đảm bảo chuyển đổi sang số
      });
    }
  }, [question]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "difficulty" ? parseInt(value, 10) : value, // Chuyển `difficulty` sang số
    });
  };

  const handleAnswerChange = (index, name, value) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index][name] =
      name === "isCorrect" ? value === "true" : value;
    setFormData({ ...formData, answers: updatedAnswers });
  };

  const addAnswer = () => {
    setFormData({
      ...formData,
      answers: [...formData.answers, { answerText: "", isCorrect: false }],
    });
  };

  const removeAnswer = (index) => {
    const updatedAnswers = formData.answers.filter((_, i) => i !== index);
    setFormData({ ...formData, answers: updatedAnswers });
  };

  const validateForm = () => {
    const { answers } = formData;

    if (answers.length < 2) {
      return "You must add at least 2 answers.";
    }

    const correctAnswers = answers.filter((a) => a.isCorrect);
    if (correctAnswers.length === 0) {
      return "You must mark at least one correct answer.";
    }

    if (correctAnswers.length === answers.length) {
      return "Not all answers can be correct.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (question) {
        await updateQuestion(question.questionId, formData);
      } else {
        await createQuestion(formData);
      }
      const updatedQuestions = await getQuestions();
      onSave(updatedQuestions);
    } catch (error) {
      console.error("Failed to save question:", error);
      setError(error.response?.data?.message || "Failed to save question.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-xl font-bold mb-4">
          {question ? "Edit" : "Add"} Question
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex">
          {/* Cột bên trái: Thông tin câu hỏi */}
          <div className="w-1/2 pr-4 border-r border-gray-300">
            <div className="mb-4">
              <label className="block text-gray-700">Question Text</label>
              <input
                type="text"
                name="questionText"
                value={formData.questionText}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Explanation</label>
              <textarea
                name="explanation"
                value={formData.explanation}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
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
                value={formData.subjectId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.subjectId} value={subject.subjectId}>
                    {subject.subjectName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cột bên phải: Danh sách đáp án */}
          <div className="w-1/2 pl-4">
            <h3 className="text-lg font-bold mb-2">Answers</h3>
            {formData.answers.map((answer, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  placeholder={`Answer ${index + 1}`}
                  value={answer.answerText}
                  onChange={(e) =>
                    handleAnswerChange(index, "answerText", e.target.value)
                  }
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
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
                <button
                  type="button"
                  onClick={() => removeAnswer(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addAnswer}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Add Answer
            </button>
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
