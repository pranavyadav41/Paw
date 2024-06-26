import  { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "../Components/common/loadingSpinner"


const AdminLayout = lazy(() => import("../layout/adminLayout/adminLayout"));
const Dashboard = lazy(() => import("../Pages/Admin/Dashboard"));
const Users = lazy(() => import("../Components/admin/Users"));
const FranchiseReq = lazy(() => import("../Components/admin/FranchiseReq"));
const AdminProtected = lazy(() => import("../protected/AdminProtected"));
const FranchiseList = lazy(() => import("../Components/admin/FranchiseList"));
const Service = lazy(() => import("../Components/admin/Service"));
const Coupon = lazy(()=>import("../Pages/Admin/Coupon"))
const Error404 = lazy(()=>import("../Pages/Error404"))

function AdminRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<AdminProtected />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/requests" element={<FranchiseReq />} />
            <Route path="/franchises" element={<FranchiseList />} />
            <Route path="/services" element={<Service />} />
            <Route path="/coupons" element={<Coupon />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AdminRoutes;
