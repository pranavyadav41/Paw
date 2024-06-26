import Header from "../../Components/franchise/Header";
import { Outlet } from "react-router-dom";

const franchiseLayout = () => {
  return (
    <>
     <Header/>
     <Outlet/>
    </>
  );
};

export default franchiseLayout;
