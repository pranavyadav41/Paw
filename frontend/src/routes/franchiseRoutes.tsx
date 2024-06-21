import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "../Components/common/loadingSpinner";

const RegisterPage = lazy(() => import("../Pages/Franchise/RegisterPage"));
const FranchiseLayout = lazy(
  () => import("../layout/franchiseLayout/franchiseLayout")
);
const LoginPage = lazy(() => import("../Pages/Franchise/LoginPage"));
const FranchiseProtected = lazy(
  () => import("../protected/FranchiseProtected")
);
const ForgetEmail = lazy(() => import("../Pages/Franchise/ForgotEmail"));
const ResetPassword = lazy(() => import("../Pages/Franchise/ResetPassword"));
const ProfilePage = lazy(() => import("../Pages/Franchise/ProfilePage"));
const Otp = lazy(() => import("../Pages/Franchise/OtpPage"));
const MyBookings = lazy(() => import("../Pages/Franchise/ListBookings"));
const Booking = lazy(() => import("../Pages/Franchise/BookingDetail"));
const AllChat = lazy(() => import("../Pages/Franchise/AllChats"));
const Dashboard = lazy(() => import("../Pages/Franchise/Dashboard"));
const Error404 = lazy(()=>import("../Pages/Error404"))

function FranchiseRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/verifyEmail" element={<ForgetEmail />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="*" element={<Error404 />} />
        <Route element={<FranchiseProtected />}>
          <Route element={<FranchiseLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/myBookings" element={<MyBookings />} />
            <Route path="/bookingDetail/:id" element={<Booking />} />
            <Route path="/chat" element={<AllChat />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route index element={<Navigate to="/franchise/dashboard" />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default FranchiseRoutes;
