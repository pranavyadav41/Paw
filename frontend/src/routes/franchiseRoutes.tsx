import { Routes, Route } from "react-router-dom";
import RegisterPage from "../Screens/Franchise/RegisterPage";
import FranchiseLayout from "../layout/franchiseLayout/franchiseLayout";
import LoginPage from "../Screens/Franchise/LoginPage";
import FranchiseProtected from "../protected/FranchiseProtected";
import ForgetEmail from "../Screens/Franchise/ForgotEmail";
import ResetPassword from "../Screens/Franchise/ResetPassword";
import ProfilePage from "../Screens/Franchise/ProfilePage";
import Otp from "../Screens/Franchise/OtpPage";

function franchiseRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/verifyEmail" element={<ForgetEmail/>} />
      <Route path="/resetPassword" element={<ResetPassword/>} />
      <Route element={<FranchiseProtected />}>
        <Route path="/" element={<FranchiseLayout />}>
          <Route path="/profile" element={<ProfilePage/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default franchiseRoutes; 
