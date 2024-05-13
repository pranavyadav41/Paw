import Header from "../../Components/admin/Header";
import SideBar from "../../Components/admin/sideBar";
import { Outlet } from "react-router-dom";

function adminLayout() {
  return (
    <div>
      <Header />

      <div className="flex">
        <div className="w-[16%]">
        <SideBar />
        </div>
       
        <div className="w-[84%] mt-[72px]"> 
        <Outlet />
        </div>
        
      </div>
    </div>
  );
}

export default adminLayout;
