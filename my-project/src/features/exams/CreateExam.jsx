import React, { useState, useEffect } from "react";
import { createExam } from "../../services/examService";
import { getSubjects } from "../../services/subjectService"; // Import API lấy danh sách môn học
import { useNavigate } from "react-router-dom"; // Để điều hướng về trang ExamFeature

const CreateExam = () => {
  const [examName, setExamName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [fee, setFee] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });
  const [subjects, setSubjects] = useState([]); // Lưu danh sách môn học
  const [duration, setDuration] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook để điều hướng

  // Lấy danh sách môn học khi component được mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setMessage("Failed to load subjects.");
      }
    };

    fetchSubjects();
  }, []);

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNumberOfQuestions({
      ...numberOfQuestions,
      [name]: parseInt(value),
    });
  };

  // Gửi dữ liệu tạo bài thi
  const handleSubmit = async (e) => {
    e.preventDefault();

    const examData = {
      examName,
      subjectId: parseInt(subjectId),
      fee: parseFloat(fee),
      numberOfQuestions,
      duration,
    };

    try {
      const result = await createExam(examData);
      setMessage("Exam created successfully!");
      setTimeout(() => navigate("/exams"), 2000); // Chuyển về trang ExamFeature sau 2 giây
    } catch (error) {
      setMessage(error.error || "Failed to create exam.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Exam</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Exam Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Exam Name
          </label>
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter exam name"
            required
          />
        </div>

        {/* Subject */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Subject
          </label>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

        {/* Fee */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fee
          </label>
          <input
            type="number"
            step="0.01"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter exam fee"
          />
        </div>

        {/* Number of Questions */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Number of Questions
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-700">Easy</label>
              <input
                type="number"
                name="easy"
                value={numberOfQuestions.easy}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Easy questions"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Medium</label>
              <input
                type="number"
                name="medium"
                value={numberOfQuestions.medium}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Medium questions"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Hard</label>
              <input
                type="number"
                name="hard"
                value={numberOfQuestions.hard}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Hard questions"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Thời gian thi (phút)
  </label>
  <input
    type="number"
    value={duration}
    onChange={(e) => setDuration(parseInt(e.target.value))}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    placeholder="Nhập thời gian thi"
    required
  />
</div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Exam
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className={`mt-4 text-center text-lg ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateExam;
