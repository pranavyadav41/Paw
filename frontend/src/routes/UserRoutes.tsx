import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/userLayout/userLayout";
import LoadingSpinner from "../Components/common/loadingSpinner";
import Error404 from "../Pages/Error404";
import UserProtect from "../protected/protectedRoute";

const LoginPage = lazy(() => import("../Pages/User/loginPage"));
const SignupPage = lazy(() => import("../Pages/User/signupPage"));
const Otp = lazy(() => import("../Pages/User/otp"));
const Home = lazy(() => import("../Components/user/Home"));
const ForgetEmail = lazy(() => import("../Components/common/ForgetEmail"));
const ResetPassword = lazy(() => import("../Components/common/ResetPassword"));
const FranchisePage = lazy(() => import("../Pages/User/FrachisePage"));
const Services = lazy(() => import("../Pages/User/Services"));
const ServiceDetail = lazy(() => import("../Pages/User/ServiceDetail"));
const BookingService = lazy(() => import("../Pages/User/BookingPage"));
const ProfilePage = lazy(() => import("../Pages/User/ProfilePage"));
const Checkout = lazy(() => import("../Pages/User/checkOut"));
const Success = lazy(() => import("../Pages/User/successBooking"));
const MyBookings = lazy(() => import("../Pages/User/MyBookings"));
const Booking = lazy(() => import("../Pages/User/BookingDetail"));
const Video = lazy(() => import("../Components/common/videoCall"));

function UserRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/fran" element={<FranchisePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route element={<UserProtect />}>
            <Route path="/booking" element={<BookingService />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/myBookings" element={<MyBookings />} />
            <Route path="/bookingDetail/:id" element={<Booking />} />
            <Route path="/videoChat/:roomID" element={<Video />} />
          </Route>
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
