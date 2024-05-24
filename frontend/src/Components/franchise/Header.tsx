import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/franchiseSlice";
import { FaUserAlt, FaCaretDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../../redux/store";

function Header() {
  let { franchiseInfo } = useSelector((state: RootState) => state.franchiseAuth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHamburger, setIsHamburger] = useState(false);
  const [userDropdown, setIsDropdown] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const activeStyle = {
    color: "black",
    fontWeight: 500,
  };

  let handleLogout = () => {
    setIsDropdownOpen(false);
    setIsDropdown(false);
    setIsHamburger(false);
    localStorage.removeItem("token");
    dispatch(logout());
    toast.success("Logged out succesfully");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropDownMenu = () => {
    setIsHamburger(!isHamburger);
  };

  const dropDown = () => {
    setIsDropdown(!userDropdown);
  };

  return (
    <nav className="sticky top-0 z-10 block w-full max-w-full   px-4 py-2 text-white bg-[#86D2CD]  rounded-none shadow-md h-max   backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <img className="h-[40px]" src="/public/logo/logo-color.png" alt="" />

        <div className="flex items-center gap-4">
          <div className="hidden mr-4 lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-lg">
              <li className="block p-1 font-sans text-md antialiased font-normal leading-normal text-blue-gray-900">
                <NavLink
                  to="/franchise"
                  className="flex items-center"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="block p-1 font-sans text-md antialiased font-normal leading-normal text-blue-gray-900">
                <NavLink
                  to="#"
                  className="flex items-center"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Bookings
                </NavLink>
              </li>
              <li className="block p-1 font-sans text-md antialiased font-normal leading-normal text-blue-gray-900">
                <NavLink
                  to="#"
                  className="flex items-center "
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Chat
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 font-sans lg:visible invisible text-xs font-bold text-gray-900 uppercase rounded-lg hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={toggleDropdown}
            >
             
                  <FaUserAlt />
                  <span>{franchiseInfo.name}</span>
                  <FaCaretDown />
               
            </button>
            {isDropdownOpen && (
              <div className="absolute  right-0 mt-2 py-2 w-48 bg-gray-600 rounded-lg shadow-lg z-10">
                <div>
                  <NavLink
                    to="/franchise/profile"
                    className="block px-4 py-2 text-white hover:bg-gray-800"
                  >
                    Profile
                  </NavLink>
                </div>
                <button
                  className="block w-full px-4 py-2 text-left text-white hover:bg-gray-800"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button"
            onClick={dropDownMenu}
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
          {isHamburger && (
            <div className="absolute right-5 mt-60   py-2 w-48 bg-gray-600  shadow-lg z-10">
              <div>
                <button
                  className="flex items-center gap-2 px-4 py-2 font-sans  text-xs font-bold text-gray-900 uppercase rounded-lg hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={dropDown}
                >
                  
                      <FaUserAlt />
                      <span className="text-white text-xs ">
                        {franchiseInfo.name}
                      </span>
                      <FaCaretDown />
                 
                </button>
              </div>
              {userDropdown && (
                <div className="absolute  right-0 mt-2 py-2 w-48 bg-gray-600 rounded-lg shadow-lg z-10">
                  <div>
                    <NavLink
                      to="/franchise/profile"
                      className="block px-4 py-2 text-white hover:bg-gray-800"
                    >
                      Profile
                    </NavLink>
                  </div>
                  <button
                    className="block w-full px-4 py-2 text-left text-white hover:bg-gray-800"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}

              <div>
                <a
                  href="/profile"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                >
                  Dashboard
                </a>
              </div>
              <div>
                <a
                  href="/profile"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                >
                  Bookings
                </a>
              </div>
              <div>
                <a
                  href="/profile"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                >
                  Chat
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
