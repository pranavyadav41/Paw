import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/userLayout/userLayout";
import LoadingSpinner from "../Components/common/loadingSpinner";
import Error404 from "../Screens/Error404";

const LoginPage = lazy(() => import("../Screens/User/loginPage"));
const SignupPage = lazy(() => import("../Screens/User/signupPage"));
const Otp = lazy(() => import("../Screens/User/otp"));
const Home = lazy(() => import("../Components/Home"));
const ForgetEmail = lazy(() => import("../Components/common/ForgetEmail"));
const ResetPassword = lazy(() => import("../Components/common/ResetPassword"));
const FranchisePage = lazy(() => import("../Screens/User/FrachisePage"));
const Services = lazy(() => import("../Screens/User/Services"));
const ServiceDetail = lazy(() => import("../Screens/User/ServiceDetail"));
const BookingService = lazy(() => import("../Screens/User/BookingPage"));
const ProfilePage = lazy(() => import("../Screens/User/ProfilePage"));

function UserRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <Routes>
        <Route element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/fran" element={<FranchisePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service/:id" element={<ServiceDetail/>} />
          <Route path="/booking" element={<BookingService/>} />
          <Route path="/profile" element={<ProfilePage/>} />
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<SignupPage />} />
        <Route path="Otp" element={<Otp />} />
        <Route path="verifyEmail" element={<ForgetEmail />} />
        <Route path="resetPassword" element={<ResetPassword />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}

export default UserRoutes;
