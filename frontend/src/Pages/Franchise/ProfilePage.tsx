import { useEffect, useState } from "react";
import Profile from "../../Components/franchise/Profile";
import { FaUserCircle, FaLock } from "react-icons/fa";
import ChangePassword from "../../Components/franchise/ChangePassword";
import { getProfile } from "../../api/franchise";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { motion } from "framer-motion";

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
      setState(false);
    });
  }, [state]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleState = (data: boolean) => {
    setState(data);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const tabVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row justify-center items-start min-h-screen md:mt-16 min-w-screen p-4 "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full max-w-screen-xl  shadow-2xl rounded-lg overflow-hidden md:grid md:grid-cols-4 min-h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 -z-10"
          style={{ backgroundImage: "url('/public/logo/pawBackground.jpg')" }}
        ></div>
        <motion.div
          className="bg-[#60a0b0] text-white p-4 md:p-8 md:col-span-1"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex flex-col gap-3">
            <motion.button
              className={`w-full flex items-center gap-3 p-4 rounded-md text-base transition-all duration-300 ${
                activeTab === "profile"
                  ? "bg-[#48808b] shadow-md"
                  : "hover:bg-[#48808b] hover:shadow-md"
              }`}
              onClick={() => handleTabChange("profile")}
              variants={tabVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserCircle className="text-lg" />
              <span className="font-semibold text-sm md:text-base">
                Profile
              </span>
            </motion.button>
            <motion.button
              className={`w-full flex items-center gap-3 p-4 rounded-md text-base transition-all duration-300 ${
                activeTab === "changePassword"
                  ? "bg-[#48808b] shadow-md"
                  : "hover:bg-[#48808b] hover:shadow-md"
              }`}
              onClick={() => handleTabChange("changePassword")}
              variants={tabVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLock className="text-md" />
              <span className="font-semibold text-sm md:text-base">
                Change Password
              </span>
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          className="md:col-span-3 bg-white rounded-r-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {loadingProfile ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center h-full"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#60A0B0]"></div>
            </motion.div>
          ) : (
            activeTab === "profile" && (
              <Profile profile={profile} profileState={handleState} />
            )
          )}
          {activeTab === "changePassword" && (
            <ChangePassword Id={profile._id} />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;