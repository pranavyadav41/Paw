import { Routes, Route } from "react-router-dom";
import RegisterPage from "../Screens/Franchise/RegisterPage";

function franchiseRoutes(){
    return (
        <Routes>

            <Route path='/register' element={<RegisterPage/>} />


        </Routes>
    )

}

export default franchiseRoutes;