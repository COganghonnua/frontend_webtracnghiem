import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Để điều hướng
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";
import { getQuestions, deleteQuestion } from "../../services/questionsService";

const QuestionFeature = () => {
  const [questions, setQuestions] = useState([]);
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false); // Thêm trạng thái cho modal lựa chọn
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const navigate = useNavigate(); // Sử dụng hook điều hướng

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await deleteQuestion(id);
        setQuestions(questions.filter((q) => q.questionId !== id));
      } catch (error) {
        console.error("Failed to delete question:", error);
      }
    }
  };

  // Mở modal lựa chọn
  const handleOpenChoiceModal = () => {
    setIsChoiceModalOpen(true);
  };

  // Đóng modal lựa chọn
  const handleCloseChoiceModal = () => {
    setIsChoiceModalOpen(false);
  };

  // Mở modal thêm question bình thường
  const handleOpenAddQuestionModal = () => {
    setIsChoiceModalOpen(false); // Đóng modal lựa chọn
    setIsModalOpen(true); // Mở modal thêm câu hỏi
  };

  // Điều hướng đến trang import
  const handleNavigateToImport = () => {
    setIsChoiceModalOpen(false); // Đóng modal
    navigate("/admin/questions/import"); // Điều hướng
  };

  const handleCloseModal = () => {
    setSelectedQuestion(null);
    setIsModalOpen(false);
  };

  const handleSave = (updatedQuestions) => {
    setQuestions(updatedQuestions);
    handleCloseModal();
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Questions Management</h1>
      <div className="mb-4 flex space-x-4">
        {/* Nút mở modal lựa chọn */}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={handleOpenChoiceModal}
        >
          Add Question
        </button>
      </div>
  
      {/* Modal lựa chọn */}
      {isChoiceModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Choose an option</h2>
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleOpenAddQuestionModal}
              >
                Add Normally
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleNavigateToImport}
              >
                Import from Excel
              </button>
            </div>
            <button
              className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg w-full"
              onClick={handleCloseChoiceModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
  
      {/* Hiển thị danh sách câu hỏi */}
      <QuestionList
        questions={questions} // Truyền danh sách câu hỏi vào
        onEdit={(question) => {
          setSelectedQuestion(question); // Khi nhấn sửa, sẽ mở modal chỉnh sửa
          setIsModalOpen(true);
        }}
        onDelete={handleDelete} // Xóa câu hỏi
      />
  
      {/* Modal thêm câu hỏi bình thường */}
      {isModalOpen && (
        <QuestionForm
          question={selectedQuestion}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
  
};

export default QuestionFeature;
