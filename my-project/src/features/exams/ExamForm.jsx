import React, { useState, useEffect } from "react";
import { getSubjects } from "../../services/subjectService"; // API để lấy danh sách Subject

const ExamForm = ({ selectedExam, onSave, onCancel }) => {
  const [examName, setExamName] = useState("");
  const [fee, setFee] = useState(0);
  const [subjectId, setSubjectId] = useState(0);
  const [subjects, setSubjects] = useState([]); // Danh sách Subject

  // Lấy danh sách Subject từ API
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  // Gán dữ liệu khi sửa Exam
  useEffect(() => {
    if (selectedExam) {
      setExamName(selectedExam.examName);
      setFee(selectedExam.fee);
      setSubjectId(selectedExam.subjectId);
    } else {
      setExamName("");
      setFee(0);
      setSubjectId(0);
    }
  }, [selectedExam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ examName, fee, subjectId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Tên Exam:</label>
        <input
          type="text"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Phí:</label>
        <input
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Môn Học:</label>
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(parseInt(e.target.value))}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          required
        >
          <option value="">-- Chọn Môn Học --</option>
          {subjects.map((subject) => (
            <option key={subject.subjectId} value={subject.subjectId}>
              {subject.subjectName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
        >
          Lưu
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default ExamForm;
