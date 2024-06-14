import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { userLogout } from "../redux/slices/authSlice";
import { FaUserAlt, FaCaretDown, FaUserCircle } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaPowerOff } from "react-icons/fa6";
import { toast } from "react-toastify";
import { RootState } from "../redux/store";

function Header() {
  let { userInfo } = useSelector((state: RootState) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHamburger, setIsHamburger] = useState(false);
  const [userDropdown, setIsDropdown] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setIsDropdownOpen(false);
    setIsHamburger(false);
    setIsDropdown(false);
  }, [location]);

  const activeStyle = {
    color: "#192955",
    fontWeight: 500,
    borderBottom: "1px solid currentColor",
    paddingBottom: "1px",
  };

  let handleLogout = () => {
    setIsDropdownOpen(false);
    setIsDropdown(false);
    setIsHamburger(false);
    localStorage.removeItem("token");
    dispatch(userLogout());
    navigate("/");
    toast.success("Logged out successfully");
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

  let redirect = () => {
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 block w-full max-w-full px-4 py-2 text-white bg-[#3968B6] rounded-none shadow-md h-max backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <img className="h-[40px]" src="/public/logo/logo-white-removebg-preview.png" alt="" />

        <div className="flex items-center gap-4">
          <div className="hidden mr-4 lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-lg">
              <li className="block p-1 font-sans text-md antialiased font-normal leading-normal text-blue-gray-900">
                <NavLink
                  to="/home"
                  className="flex items-center"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Home
                </NavLink>
              </li>
              <li className="block p-1 font-sans text-md antialiased font-normal leading-normal text-blue-gray-900">
                <NavLink
                  to="/services"
                  className="flex items-center"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Services
                </NavLink>
              </li>
              <li className="block p-1 font-sans text-md antialiased font-normal leading-normal text-blue-gray-900">
                <NavLink
                  to="/fran"
                  className="flex items-center "
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Franchise
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 font-sans lg:visible invisible text-xs font-bold text-gray-900 uppercase rounded-lg hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={userInfo ? toggleDropdown : redirect}
            >
              {userInfo ? (
                <>
                  {/* <FaUserAlt className="text-[#192955]" /> */}
                  <span className="text-[#192955]">{userInfo.name}</span>
                  <FaCaretDown className="text-[#192955]" />
                </>
              ) : (
                <span className="text-[14px] mt-1 text-gray-[#192955]">Login</span>
              )}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-gray-600 rounded-md  shadow-lg z-10">
                <NavLink
                  to="/profile"
                  className="px-4 py-2 text-white hover:bg-gray-800 flex gap-2 items-center"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaUserCircle />
                  Profile
                </NavLink>
                <NavLink
                  to="/myBookings"
                  className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-800"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <SlCalender />
                  My bookings
                </NavLink>
                <button
                  className="flex gap-2 items-center w-full px-4 py-2 text-left text-white hover:bg-gray-800"
                  onClick={handleLogout}
                >
                  <FaPowerOff />
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
            <div className="absolute right-5 mt-60 py-2 w-48 bg-gray-600 shadow-lg z-10">
              <div>
                <button
                  className="flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-gray-900 uppercase rounded-lg hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={userInfo ? dropDown : redirect}
                >
                  {userInfo ? (
                    <>
                      <FaUserAlt />
                      <span className="text-white text-xs ">
                        {userInfo.name}
                      </span>
                      <FaCaretDown />
                    </>
                  ) : (
                    <span className="text-white text-xs">Login</span>
                  )}
                </button>
              </div>
              {userDropdown && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-gray-600 rounded-lg shadow-lg z-10">
                  <NavLink
                    to="/profile"
                    className="px-4 py-2 text-white hover:bg-gray-800 flex gap-2 items-center"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FaUserCircle />
                    Profile
                  </NavLink>
                  <NavLink
                    to="/myBookings"
                    className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-800"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <SlCalender />
                    My bookings
                  </NavLink>
                  <button
                    className="flex gap-2 items-center w-full px-4 py-2 text-left text-white hover:bg-gray-800"
                    onClick={handleLogout}
                  >
                    <FaPowerOff />
                    Logout
                  </button>
                </div>
              )}
              <div>
                <NavLink
                  to="/"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                  onClick={() => setIsHamburger(false)}
                >
                  Home
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/services"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                  onClick={() => setIsHamburger(false)}
                >
                  Services
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/bookings"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                  onClick={() => setIsHamburger(false)}
                >
                  Bookings
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/franchise"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                  onClick={() => setIsHamburger(false)}
                >
                  Franchise
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
