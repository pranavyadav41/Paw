import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "../Components/common/loadingSpinner";


const RegisterPage = lazy(() => import("../Screens/Franchise/RegisterPage"));
const FranchiseLayout = lazy(() => import("../layout/franchiseLayout/franchiseLayout"));
const LoginPage = lazy(() => import("../Screens/Franchise/LoginPage"));
const FranchiseProtected = lazy(() => import("../protected/FranchiseProtected"));
const ForgetEmail = lazy(() => import("../Screens/Franchise/ForgotEmail"));
const ResetPassword = lazy(() => import("../Screens/Franchise/ResetPassword"));
const ProfilePage = lazy(() => import("../Screens/Franchise/ProfilePage"));
const Otp = lazy(() => import("../Screens/Franchise/OtpPage"));
const MyBookings = lazy(() => import("../Screens/Franchise/ListBookings"));
const Booking = lazy(() => import("../Screens/Franchise/BookingDetail"));
const AllChat = lazy(() => import("../Screens/Franchise/AllChats"));
const Dashboard = lazy(() => import("../Screens/Franchise/Dashboard"));

function FranchiseRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/verifyEmail" element={<ForgetEmail />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
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
