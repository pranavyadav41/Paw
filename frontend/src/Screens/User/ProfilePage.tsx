import React, { useState, useEffect } from "react";
import { FaUserCircle, FaMapMarkerAlt } from "react-icons/fa";
import Profile from "../../Components/user/Profile";
import Addresses from "../../Components/user/Addresses";
import { getProfile } from "../../api/user";
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
  const [profile, setProfile] = useState<ProfileState>({
    _id: "",
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(false);

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setLoading(true);
    getProfile(userInfo._id)
      .then((response) => {
        setProfile(response?.data);
      })
      .finally(() => {
        setLoading(false);
      });
      setState(false)
  }, [state]);

  const handle = (data: boolean) => {
    setState(data);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 md:px-8">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/public/logo/pawBackground.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.4,
            zIndex: -1,
          }}
        ></div>
        <div className="w-full md:w-[75%] bg-[#9ad1aa] max-w-screen-lg rounded-md h-auto shadow-xl p-4 md:p-8 md:mb-20">
          <div className="flex mb-8 justify-center flex-wrap">
            <button
              className={`px-6 py-3 rounded-l-md w-full md:w-1/2 shadow-md ${
                activeTab === "profile"
                  ? "bg-[#60a0b0] text-white"
                  : "bg-white text-green-900"
              } flex items-center justify-center gap-2 transition-colors duration-300`}
              onClick={() => handleTabChange("profile")}
            >
              <FaUserCircle className="text-lg" />
              Profile
            </button>
            <button
              className={`px-6 py-3 rounded-r-md w-full md:w-1/2 shadow-md ${
                activeTab === "manageAddress"
                  ? "bg-[#60a0b0] text-white"
                  : "bg-white text-green-900"
              } flex items-center justify-center gap-2 transition-colors duration-300`}
              onClick={() => handleTabChange("manageAddress")}
            >
              <FaMapMarkerAlt className="text-lg" />
              Manage Address
            </button>
          </div>
          {loading ? ( 
            <div>Loading...</div>
          ) : (
            <>
              {activeTab === "profile" && (
                <Profile profile={profile} state={handle} />
              )}
              {activeTab === "manageAddress" && <Addresses Id={profile._id} />}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
