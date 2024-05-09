import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/adminLayout/adminLayout";
import Dashboard from "../Screens/Admin/Dashboard";
import Users from "../Components/admin/Users";
import FranchiseReq from "../Components/admin/FranchiseReq";
import AdminProtected from "../protected/AdminProtected";
import FranchiseList from "../Components/admin/FranchiseList";

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminProtected />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/requests" element={<FranchiseReq/>} />
          <Route path="/franchises" element={<FranchiseList/>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
