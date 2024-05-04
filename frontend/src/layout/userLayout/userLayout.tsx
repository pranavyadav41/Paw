import Header from "../../Components/Header"
import Footer from "../../Components/Footer"
import { Outlet } from "react-router-dom"

function outlet() {
  return (
    <div>
        <Header />
        <Outlet />
        <Footer />
      
    </div>
  )
}

export default outlet
