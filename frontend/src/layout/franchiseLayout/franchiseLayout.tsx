import SideBar from "../../Components/franchise/sideBar";
import Header from "../../Components/franchise/Header";
import Footer from "../../Components/franchise/Footer";
import { Outlet } from "react-router-dom";

const franchiseLayout = () => {
  return (
    <>
     <Header/>
     <Outlet/>
     <Footer/>
    </>
  );
};

export default franchiseLayout;
