import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout"; // Layout cho User
import AdminLayout from "../layouts/AdminLayout"; // Layout cho Admin
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
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
import ClassroomPage from "../pages/OnlineRoom/ClassroomPage";
import ClassroomDetailPage from "../pages/OnlineRoom/ClassroomDetailPage";
import CreateExercisePage from "../pages/OnlineRoom/CreateExercisePage";
import ExerciseListPage from "../pages/OnlineRoom/ExerciseListPage";
import ClassroomMainPage from "../pages/OnlineRoom/ClassroomMainPage";
import ExerciseDetailPage from "../pages/OnlineRoom/ExerciseDetailPage";
import ExamHistoryDetail from "../features/exams/ExamHistoryDetail";
import UserExamDetail from "../features/exams/UserExamDetail";
import UserExamFeature from "../features/exams/UserExamFeature";
import ExerciseHistories from "../pages/OnlineRoom/ExerciseHistories";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ProfilePage from "../pages/ProfilePage";


const AppRoutes = () => {
    return (
        <Routes>
            {/* Routes dành cho User */}
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="register" element={<Register />} />
                <Route path="/classroom" element={<ClassroomPage />} />
                <Route path="/classroom/:id" element={<ClassroomMainPage />}>
                    <Route index element={<ClassroomDetailPage />} />
                    <Route path="create-exercise" element={<CreateExercisePage />} />
                    <Route path="exercises" element={<ExerciseListPage />} />
                    <Route path="exercises/:exerciseId" element={<ExerciseDetailPage />} />
                    <Route path="exercise-histories/all" element={<ExerciseHistories />} />

                </Route>
                <Route path="/classroom/:id/exercises/:exerciseId" element={<ExerciseDetailPage />} />
                <Route path="/payment-result" element={<PaymentResultPage />} />
                <Route path="/exams" element={<UserExamFeature />} />
                <Route path="/exams/:id" element={<ExamDetail layout="regular" />} /> {/* User giao diện thường */}
                
                <Route
                    path="payment"
                    element={
                        <PrivateRoute requiredRole="User">
                            <PaymentPage />
                        </PrivateRoute>
                    }
                />
            </Route>

            {/* Routes dành cho Admin */}
            <Route
                path="/admin"
                element={
                    <PrivateRoute requiredRole="Admin">
                        <AdminLayout />
                    </PrivateRoute>
                }
            >
                <Route path="topics" element={<TopicFeature />} />
                <Route path="subjects" element={<SubjectFeature />} />
                <Route path="exams" element={<ExamFeature />} />
                <Route path="exams/create" element={<CreateExam />} />
                <Route path="exams/:id" element={<ExamDetail layout="dashboard" />} /> {/* Admin giao diện dashboard */}
                <Route path="exams/:id/history" element={<ExamHistoryDetail />} />

                <Route path="questions" element={<QuestionFeature />} />
                
                <Route path="questions/:id" element={<QuestionDetail />} />
                <Route path="questions/import" element={<ImportQuestions />} /> {/* Đã đúng */}
            </Route>

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
