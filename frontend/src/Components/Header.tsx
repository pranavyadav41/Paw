import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { logout } from "../redux/slices/authSlice";

function Header() {

  let {userInfo}=useSelector((state:any)=>state.auth)
  let navigate=useNavigate()
  let dispatch=useDispatch()

  let handleLogout =()=>{

    dispatch(logout())

  }

  let redirect = ()=>{
    navigate('/login')
  }

  return (
    <div className=" bg-customColor">
      <div className="h-24 w-full container mx-auto flex justify-between items-center px-4">
        <div className="">
          <img className="h-24" src="/public/logo/cut and PASTE.png" alt="" />
        </div>

        <div className="flex items-center gap-5">
          <div className="flex gap-5">
            <h1 className="font-semibold text-xl text-customColor1">Home</h1>
            <h1 className="font-semibold text-xl text-customColor1">Services</h1>
            <h1 className="font-semibold text-xl text-customColor1">Bookings</h1>
            <h1 className="font-semibold text-xl text-customColor1">Franchise</h1>
          </div>

          <div className="">
          {(userInfo?<button onClick={handleLogout}  className="border-blue-500 text-blue-500 border-2 px-4 py-2 rounded-lg">Logout</button>:
          userInfo?null:<button onClick={redirect} className="border-blue-500 text-blue-500 border-2 px-4 py-2 rounded-lg">Login</button>)}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
