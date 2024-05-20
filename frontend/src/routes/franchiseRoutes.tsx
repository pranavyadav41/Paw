import { Routes, Route } from "react-router-dom";
import RegisterPage from "../Screens/Franchise/RegisterPage";
import FranchiseLayout from "../layout/franchiseLayout/franchiseLayout";
import LoginPage from "../Screens/Franchise/LoginPage";
import FranchiseProtected from "../protected/FranchiseProtected";

function franchiseRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<FranchiseProtected />}>
        <Route path="/" element={<FranchiseLayout />}></Route>
      </Route>
    </Routes>
  );
}

export default franchiseRoutes;
