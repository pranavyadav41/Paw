import { Routes, Route } from "react-router-dom";
import LoginPage from "../Screens/User/loginPage";
import SignupPage from "../Screens/User/signupPage";
import Otp from "../Screens/User/otp";
import UserLayout from "../layout/userLayout/userLayout";
import Home from "../Components/Home";
import ForgetEmail from "../Components/common/ForgetEmail";
import ResetPassword from "../Components/common/ResetPassword";
import FranchisePage from "../Screens/User/FrachisePage";
import Services from "../Screens/User/Services";
import Error404 from "../Screens/Error404";

function UserRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fran" element={<FranchisePage />} />
        <Route path="/services" element={<Services />} />
      </Route>

      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<SignupPage />} />
      <Route path="Otp" element={<Otp />} />
      <Route path="verifyEmail" element={<ForgetEmail />} />
      <Route path="resetPassword" element={<ResetPassword />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default UserRoutes;
