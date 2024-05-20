import SideBar from "../../Components/franchise/sideBar";
import { Outlet } from "react-router-dom";

const franchiseLayout = () => {
  return (
    <>
      <div className="flex">
        <div className="w-[17%] min-h-screen">
          <SideBar />
        </div>

        <div className="w-[83%] min-h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default franchiseLayout;
