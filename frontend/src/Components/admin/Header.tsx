import { FaSignOutAlt } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { adminLogout } from "../../redux/slices/adminSlice";

const Header = () => {
  let dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(adminLogout());
    toast.success("Logged out successfully");
  };
  return (
    <header className="bg-[#191C24] py-4 px-6 flex justify-between items-center fixed left-0 right-0 top-0 z-50">
      <div className="text-white font-bold text-xl flex items-center gap-3">
        {/* <span className="text-green-500 text-2xl">Paw</span>
        <FaPaw /> */}
        <img className="h-11  " src="/public/logo/logo-white-removebg-preview.png" alt="" />
      </div>
      <button
        className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg flex items-center"
        onClick={logout}
      >
        <FaSignOutAlt className="mr-2" />
        Logout
      </button>
    </header>
  );
};

export default Header;
