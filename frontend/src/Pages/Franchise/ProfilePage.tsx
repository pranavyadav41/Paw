import { useEffect, useState } from "react";
import Profile from "../../Components/franchise/Profile";
import { FaUserCircle,FaLock } from "react-icons/fa";
import ChangePassword from "../../Components/franchise/ChangePassword";
import { getProfile } from "../../api/franchise";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


const ProfilePage = () => {
  const { franchiseInfo } = useSelector(
    (state: RootState) => state.franchiseAuth
  );
  const [profile, setProfile] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    area: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [state, setState] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");



  useEffect(() => {
    getProfile(franchiseInfo._id).then((response) => {
      setProfile(response?.data);

      setLoadingProfile(false);
      setState(false)
    });
  }, [state]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleState = (data: boolean) => {
    setState(data);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen md:mt-16 min-w-screen">
      <div className="w-full max-w-screen-xl bg-[#60A0B0] shadow-lg rounded-lg overflow-hidden md:grid md:grid-cols-4 min-h-[500px]">
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
              <span className="font-semibold text-sm md:text-base">
                Profile
              </span>
            </button>
            <button
              className={`w-full flex items-center gap-3 p-4 rounded-md text-base transition-colors duration-300 ${
                activeTab === "changePassword" ? "bg-[#48808b]" : ""
              }`}
              onClick={() => handleTabChange("changePassword")}
            >
              <FaLock className="text-md" />
              <span className="font-semibold text-sm md:text-base">
                Change Password
              </span>
            </button>
          </div>
        </div>
        <div className=" md:col-span-3">
          {loadingProfile ? (
            <div>Loading profile...</div>
          ) : (
            activeTab === "profile" && (
              <Profile profile={profile} profileState={handleState} />
            )
          )}
          {activeTab === "changePassword" && (
            <ChangePassword Id={profile._id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
