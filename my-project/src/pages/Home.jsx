import React, { useState, useEffect } from "react";
import { FaBook, FaLaptop, FaCertificate, FaChalkboardTeacher, FaArrowRight, FaCheck, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Home = () => {
  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const features = [
    { icon: <FaBook />, title: "Đa dạng bài thi", description: "Hàng nghìn câu hỏi trắc nghiệm đa lĩnh vực" },
    { icon: <FaLaptop />, title: "Học mọi lúc mọi nơi", description: "Truy cập dễ dàng trên mọi thiết bị" },
    { icon: <FaCertificate />, title: "Chứng chỉ online", description: "Nhận chứng nhận sau khi hoàn thành khóa học" },
    { icon: <FaChalkboardTeacher />, title: "Giảng viên chất lượng", description: "Đội ngũ giáo viên giàu kinh nghiệm" },
  ];

  const demoQuestions = [
    {
      question: "Thủ đô của Việt Nam là gì?",
      answers: ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Huế"],
      correctAnswer: 0
    },
    {
      question: "Sông nào dài nhất Việt Nam?",
      answers: ["Sông Hồng", "Sông Mekong", "Sông Đồng Nai", "Sông Cửu Long"],
      correctAnswer: 1
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEmailSubmitted(true);
    console.log("Email submitted:", email);
  };

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setIsAnswerCorrect(answerIndex === demoQuestions[currentQuestionIndex].correctAnswer);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % demoQuestions.length);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };

  useEffect(() => {
    if (isEmailSubmitted) {
      const timer = setTimeout(() => setIsEmailSubmitted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isEmailSubmitted]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-down">
                Nâng Cao Kiến Thức Qua Trắc Nghiệm Online
              </h1>
              <p className="text-xl md:text-2xl mb-12 animate-fade-in-up">
                Khám phá cách học tập hiệu quả và thú vị với hệ thống trắc nghiệm thông minh của chúng tôi
              </p>
              <a 
                href="#features" 
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105 animate-bounce"
              >
                Khám Phá Ngay
              </a>
            </div>
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Students learning online" className="rounded-lg shadow-2xl animate-fade-in-up" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </header>

      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-800">Tại sao chọn chúng tôi?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl shadow-lg text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <div className="text-5xl text-blue-500 mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h2 className="text-4xl font-bold mb-8">Trải nghiệm ngay bài trắc nghiệm demo</h2>
              <div className="bg-white text-gray-800 p-8 rounded-lg shadow-xl">
                <h3 className="text-2xl font-semibold mb-4">{demoQuestions[currentQuestionIndex].question}</h3>
                <div className="space-y-4">
                  {demoQuestions[currentQuestionIndex].answers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      className={`w-full text-left p-4 rounded-lg transition duration-300 ${
                        selectedAnswer === index
                          ? isAnswerCorrect
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {answer}
                      {selectedAnswer === index && (
                        <span className="float-right">
                          {isAnswerCorrect ? <FaCheck className="text-white" /> : "✗"}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                {selectedAnswer !== null && (
                  <button
                    onClick={handleNextQuestion}
                    className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                  >
                    Câu hỏi tiếp theo
                  </button>
                )}
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Student taking an online quiz" className="rounded-lg shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-blue-800">Học viên nói gì về chúng tôi?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                name: "Nguyễn Thị A"
              },
              {
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
                name: "Trần Văn B"
              },
              {
                image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                name: "Lê Thị C"
              }
            ].map((student, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
                <img src={student.image} alt={`Student ${index + 1}`} className="w-24 h-24 rounded-full mx-auto mb-6 object-cover" />
                <p className="text-gray-600 mb-6">"Hệ thống trắc nghiệm online này đã giúp tôi cải thiện đáng kể kiến thức của mình. Tôi rất hài lòng với trải nghiệm học tập tại đây!"</p>
                <div className="font-semibold text-blue-600">{student.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Sẵn sàng để bắt đầu?</h2>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-lg p-8 shadow-2xl">
            <div className="flex items-center mb-4">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                className="flex-grow px-4 py-3 rounded-l-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-6 py-3 rounded-r-full font-bold hover:bg-blue-700 transition duration-300 ease-in-out flex items-center"
              >
                Đăng Ký <FaArrowRight className="ml-2" />
              </button>
            </div>
            {isEmailSubmitted && (
              <p className="text-green-600 mt-4 text-lg animate-fade-in">
                Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ sớm.
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Về chúng tôi</h3>
              <p className="text-gray-400">Trắc Nghiệm Online là nền tảng học tập trực tuyến hàng đầu, cung cấp các bài kiểm tra chất lượng cao và đa dạng.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Liên kết nhanh</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Trang chủ</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition duration-300">Tính năng</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Bảng giá</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Liên hệ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Theo dõi chúng tôi</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition duration-300"><FaFacebookF /></a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300"><FaTwitter /></a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300"><FaInstagram /></a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Liên hệ</h3>
              <p className="text-gray-400">Email: info@tracnghiemonline.com</p>
              <p className="text-gray-400">Điện thoại: (123) 456-7890</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Trắc Nghiệm Online. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

