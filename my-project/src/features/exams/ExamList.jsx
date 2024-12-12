import React from "react";
import { useNavigate } from "react-router-dom";

const ExamList = ({ exams, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleViewExam = (examId) => {
    navigate(`/exams/${examId}`); // Chuyển hướng sang trang làm bài thi
  };

  return (
    <div className="mt-4">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Tên Exam</th>
            <th className="border border-gray-300 px-4 py-2">Môn Học</th>
            <th className="border border-gray-300 px-4 py-2">Phí</th>
            <th className="border border-gray-300 px-4 py-2">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr
              key={exam.examId}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleViewExam(exam.examId)} // Thêm sự kiện nhấn vào hàng
            >
              <td className="border border-gray-300 px-4 py-2">{exam.examId}</td>
              <td className="border border-gray-300 px-4 py-2">{exam.examName}</td>
              <td className="border border-gray-300 px-4 py-2">{exam.subjectName}</td>
              <td className="border border-gray-300 px-4 py-2">{exam.fee} VND</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn chặn sự kiện click row
                    onEdit(exam);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-600"
                >
                  Sửa
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn chặn sự kiện click row
                    onDelete(exam.examId);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamList;
