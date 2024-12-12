import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";
import Register from "../pages/Register";
import TopicFeature from "../features/topics/TopicFeature";
import SubjectFeature from "../features/subjects/SubjectFeature";
import ExamFeature from "../features/exams/ExamFeature";
import QuestionFeature from "../features/questions/QuestionFeature";
import QuestionDetail from "../features/questions/QuestionDetail";
import ImportQuestions from "../features/questions/ImportQuestions";
import CreateExam from "../features/exams/CreateExam";
import ExamDetail from "../features/exams/ExamDetail";
import PaymentPage from "../pages/PaymentPage";
import PrivateRoute from "../components/PrivateRoute";
import PaymentResultPage from "../pages/PaymentResultPage";
import ClassroomPage from "../pages/ClassroomPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="/register" element={<Register />} /> 
                <Route path="/topics" element={<TopicFeature />} /> 
                <Route path="/subjects" element={<SubjectFeature/>}/>
                <Route path="/exams" element={<ExamFeature />} />

                <Route path="/exams/create" element={<CreateExam />} />
                <Route path="/exams/:id" element={<ExamDetail />} />
                <Route path="/questions" element={<QuestionFeature />} />
                <Route path="/questions/:id" element={<QuestionDetail />} />
                <Route path="/questions/import" element={<ImportQuestions />} />
                <Route path="/payment-result" element={<PaymentResultPage />} />
                <Route path="/classroom" element={<ClassroomPage />} />
                <Route
  path="/payment"
  element={
    <PrivateRoute>
      <PaymentPage />
    </PrivateRoute>
  }
/>;
            </Route>

            {/* Trang 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
