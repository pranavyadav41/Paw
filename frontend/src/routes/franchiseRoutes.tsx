import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "../Components/common/loadingSpinner";

// Lazy load components
const RegisterPage = lazy(() => import("../Screens/Franchise/RegisterPage"));
const FranchiseLayout = lazy(() => import("../layout/franchiseLayout/franchiseLayout"));
const LoginPage = lazy(() => import("../Screens/Franchise/LoginPage"));
const FranchiseProtected = lazy(() => import("../protected/FranchiseProtected"));
const ForgetEmail = lazy(() => import("../Screens/Franchise/ForgotEmail"));
const ResetPassword = lazy(() => import("../Screens/Franchise/ResetPassword"));
const ProfilePage = lazy(() => import("../Screens/Franchise/ProfilePage"));
const Otp = lazy(() => import("../Screens/Franchise/OtpPage"));

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
          <Route path="/" element={<FranchiseLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default FranchiseRoutes;
