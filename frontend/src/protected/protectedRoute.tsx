import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";

interface userAuth{
    auth:{
        userInfo:boolean
    }
}


function userProtect(){

    const userInfo = useSelector((state:userAuth)=>state.auth)

    return (
        userInfo?<Outlet/> : <Navigate to='/' replace />
    )
}

export default userProtect;