import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS của react-toastify
import { getExams, checkExamEligibility } from "../../services/examService";

const UserExamFeature = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const data = await getExams();
        setExams(data);
      } catch (error) {
        toast.error("Không thể tải danh sách bài thi. Vui lòng thử lại!");
        console.error("Error fetching exams:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  const handleStartExam = async (examId, examFee) => {
    try {
      // Hiển thị cảnh báo trước khi thi
      const confirmStart = window.confirm(
        `Bạn sẽ bị trừ ${examFee} VND để bắt đầu bài thi này. Bạn có chắc chắn muốn tiếp tục?`
      );
      if (!confirmStart) return;

      // Gọi API kiểm tra điều kiện thi
      const eligibility = await checkExamEligibility(examId);

      if (eligibility.success) {
        toast.success("Bắt đầu bài thi thành công!");
        navigate(`/exams/${examId}`); // Chuyển hướng đến trang làm bài thi
      } else {
        toast.warning(eligibility.message || "Số dư của bạn không đủ.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi bắt đầu bài thi. Vui lòng thử lại!");
      console.error("Error in handleStartExam:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Đang tải bài thi...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Danh sách bài thi
        </h1>

        {exams.length === 0 ? (
          <div className="text-center text-gray-500">
            Hiện tại không có bài thi nào.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div
                key={exam.examId}
                className="p-4 border rounded-lg shadow-lg hover:shadow-xl bg-white transform transition-all hover:-translate-y-1"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {exam.examName}
                </h2>
                <p className="text-gray-600">
                  <strong>Thời gian:</strong> {exam.duration} phút
                </p>
                <p className="text-gray-600">
                  <strong>Lệ phí:</strong> {exam.fee} VND
                </p>
                <button
                  onClick={() => handleStartExam(exam.examId, exam.fee)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                >
                  Bắt đầu
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserExamFeature;
