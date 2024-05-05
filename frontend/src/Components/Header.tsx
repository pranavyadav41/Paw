import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { FaUserAlt } from "react-icons/fa";
import { logout } from "../redux/slices/authSlice";

function Header() {

  let {userInfo}=useSelector((state:any)=>state.auth)
  let navigate=useNavigate()
  let dispatch=useDispatch()

  let handleLogout =()=>{

    localStorage.removeItem('token');

    dispatch(logout())

  }

  let redirect = ()=>{
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-10 block w-full max-w-full h-[85px]  px-4 py-2 text-white bg-customColor  rounded-none shadow-md h-max   backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
    <div className="flex items-center justify-between text-blue-gray-900">
      <img className="h-[65px]" src="/public/logo/cut and PASTE.png" alt="" />
      <div className="flex items-center gap-4">
        <div className="hidden mr-4 lg:block">
          <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              <a href="#" className="flex items-center">
                Home
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              <a href="#" className="flex items-center">
                Services
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              <a href="#" className="flex items-center">
                Bookings
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              <a href="#" className="flex items-center">
                Franchise
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-x-1">
         {userInfo?<button
            className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
            type="button"
          >
            
          <div className="flex gap-2">
          <FaUserAlt />
          <span>{userInfo.name}</span>
          </div> 
          </button>:null}
          {userInfo?<button
            className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
            type="button"
            onClick={handleLogout}
          >
            <span>logout</span>
          </button>:
          <button
            className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
            type="button"
            onClick={redirect}
          >
            <span>login</span>
          </button>}
        </div>
        <button
          className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </nav>
  
  );
}

export default Header;
