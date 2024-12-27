import React, { useState, useEffect } from "react";
import { getExams, deleteExam, updateExam } from "../../services/examService";
import { useNavigate } from "react-router-dom";

const ExamFeature = () => {
  const [exams, setExams] = useState([]);
  const [editingExam, setEditingExam] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const data = await getExams();
        setExams(data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteExam(id);
      setExams((prev) => prev.filter((exam) => exam.examId !== id));
      setMessage("Exam deleted successfully.");
    } catch (error) {
      setMessage("Failed to delete exam.");
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateExam(id, updatedData);
      setExams((prev) =>
        prev.map((exam) => (exam.examId === id ? { ...exam, ...updatedData } : exam))
      );
      setEditingExam(null);
      setMessage("Exam updated successfully.");
    } catch (error) {
      setMessage("Failed to update exam.");
    }
  };

  const handleViewExam = (examId) => {
    navigate(`/admin/exams/${examId}`); // Chuyển hướng sang trang chi tiết bài thi
  };

  const handleCreateExam = () => {
    navigate("/admin/exams/create"); // Điều hướng sang trang tạo bài thi
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Exam Management</h1>
        <button
          onClick={handleCreateExam}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
        >
          + Create Exam
        </button>
      </div>

      {message && <p className="text-green-500 mb-4">{message}</p>}

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Fee</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr
              key={exam.examId}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleViewExam(exam.examId)} // Thêm sự kiện chuyển hướng khi click vào hàng
            >
              <td className="border border-gray-300 px-4 py-2">{exam.examId}</td>
              <td className="border border-gray-300 px-4 py-2">
                {editingExam === exam.examId ? (
                  <input
                    defaultValue={exam.examName}
                    onBlur={(e) =>
                      handleUpdate(exam.examId, { examName: e.target.value })
                    }
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  exam.examName
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">${exam.fee}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn chặn sự kiện click vào hàng
                    setEditingExam(exam.examId);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn chặn sự kiện click vào hàng
                    handleDelete(exam.examId);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamFeature;
