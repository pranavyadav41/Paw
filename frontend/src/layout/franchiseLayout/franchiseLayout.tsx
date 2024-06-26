import Header from "../../Components/franchise/Header";
import Footer from "../../Components/franchise/Footer";
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
