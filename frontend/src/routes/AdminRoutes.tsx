import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/adminLayout/adminLayout";
import Dashboard from "../Screens/Admin/Dashboard";
import Users from "../Components/admin/Users";
import AdminProtected from "../protected/AdminProtected";

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminProtected />}>
        <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users/>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
