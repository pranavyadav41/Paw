import { Routes, Route } from "react-router-dom";
import LoginPage from "../Screens/User/loginPage";
import SignupPage from "../Screens/User/signupPage";
import Otp from "../Screens/User/otp";
import UserLayout from "../layout/userLayout/userLayout";
import Home from "../Components/Home";
import ForgetEmail from "../Components/common/ForgetEmail";
import ResetPassword from "../Components/common/ResetPassword";
import FranchisePage from "../Screens/User/FrachisePage";

function UserRoutes() {
  return (
    <Routes>
      <Route  element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/franchise" element={<FranchisePage />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<SignupPage />} />
      <Route path="Otp" element={<Otp />} />
      <Route path="verifyEmail" element={<ForgetEmail />} />
      <Route path="resetPassword" element={<ResetPassword />} />
    </Routes>
  );
}

export default UserRoutes;