import { useState, useEffect } from "react";
import { FaUserCircle, FaMapMarkerAlt,FaLock} from "react-icons/fa";
import Profile from "../../Components/user/Profile";
import Addresses from "../../Components/user/Addresses";
import ChangePassword from "../../Components/user/ChangePassword";
import { getProfile, getAddresses } from "../../api/user";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

interface ProfileState {
  _id: string;
  name: string;
  email: string;
  phone: string;
} 

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [addresses, setAddresses] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [state, setState] = useState(false);
  const [add, setAdd] = useState(false);
  const [profile, setProfile] = useState<ProfileState>({
    _id: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setLoadingProfile(true);
    getProfile(userInfo._id)
      .then((response) => {
        setProfile(response?.data);
      })
      .finally(() => {
        setLoadingProfile(false);
      });
    setState(false);
  }, [state]);

  useEffect(() => {
    setLoadingAddresses(true);
    getAddresses(userInfo._id)
      .then((response) => {
        setAddresses(response?.data);
      })
      .finally(() => {
        setLoadingAddresses(false);
      });
    setAdd(false);
  }, [add]);

  const handle = (data: boolean) => {
    setState(data);
  };

  const handleAddAddress = (data: boolean) => {
    setAdd(data);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen md:mt-16">
      <div className="w-full max-w-screen-xl bg-[#9ad1aa] shadow-lg rounded-lg overflow-hidden md:grid md:grid-cols-4 min-h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 -z-10"
          style={{ backgroundImage: "url('/public/logo/pawBackground.jpg')" }}
        ></div>
        <div className="bg-[#60a0b0] text-white p-4 md:p-8 md:col-span-1">
          <div className="flex flex-col gap-3">
            <button
              className={`w-full flex items-center gap-3 p-4 rounded-md text-base transition-colors duration-300 ${
                activeTab === "profile" ? "bg-[#48808b]" : ""
              }`}
              onClick={() => handleTabChange("profile")}
            >
              <FaUserCircle className="text-lg" />
              <span className="font-semibold text-sm md:text-base">Profile</span> 
            </button>
            <button
              className={`w-full flex items-center gap-3 p-4 rounded-md text-base transition-colors duration-300 ${
                activeTab === "manageAddress" ? "bg-[#48808b]" : ""
              }`}
              onClick={() => handleTabChange("manageAddress")}
            >
              <FaMapMarkerAlt className="text-lg" />
              <span className="font-semibold text-sm md:text-base">Manage Address</span>
            </button>
            <button
              className={`w-full flex items-center gap-3 p-4 rounded-md text-base transition-colors duration-300 ${
                activeTab === "changePassword" ? "bg-[#48808b]" : ""
              }`}
              onClick={() => handleTabChange("changePassword")}
            >
              <FaLock className="text-md" />
              <span className="font-semibold text-sm md:text-base">Change Password</span>
            </button>
          </div>
        </div>
        <div className="p-4 md:p-8 md:col-span-3">
          {loadingProfile ? (
            <div className="text-center text-gray-500 text-sm md:text-lg">
              Loading Profile...
            </div>
          ) : activeTab === "profile" ? (
            <Profile profile={profile} state={handle} />
          ) : null}
          {loadingAddresses ? (
            <div className="text-center text-gray-500 text-sm md:text-lg">
              Loading Addresses...
            </div>
          ) : activeTab === "manageAddress" ? (
            <Addresses
              addresses={addresses}
              Id={profile._id}
              onAddAddress={handleAddAddress}
            />
          ) : null}
          {activeTab === "changePassword" ? (
            <ChangePassword Id={userInfo._i}  />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;