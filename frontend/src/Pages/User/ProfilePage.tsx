import { useState, useEffect } from "react";
import { FaUserCircle, FaWallet, FaLock } from "react-icons/fa";
import Profile from "../../Components/user/Profile";
import ChangePassword from "../../Components/user/ChangePassword";
import Wallet from "../../Components/user/wallet";
import { getProfile, getWallet } from "../../api/user";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import "./ProfilePage.css"

interface ProfileState {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface WalletState {
  balance: number;
  history: { date: Date; amount: number }[];
}

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingWallet, setLoadingWallet] = useState(true);
  const [state, setState] = useState(false);
  const [profile, setProfile] = useState<ProfileState>({
    _id: "",
    name: "",
    email: "",
    phone: "",
  });

  const [wallet, setWallet] = useState<WalletState>({
    balance: 0,
    history: [],
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
  }, [state, userInfo._id]);

  useEffect(() => {
    if (activeTab === "wallet") {
      setLoadingWallet(true);
      getWallet(userInfo._id)
        .then((response) => {
          console.log(response)
          setWallet(response?.data);
        })
        .finally(() => {
          setLoadingWallet(false);
        });
    }
  }, [activeTab, userInfo._id]);

  const handle = (data: boolean) => {
    setState(data);
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen md:mt-14  ">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-screen-xl bg-white shadow-2xl rounded-lg overflow-hidden md:grid md:grid-cols-4 min-h-[500px] "
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 -z-10"
          style={{ backgroundImage: "url('/logo/pawBackground.jpg')" }}
        ></div>
        <div className="bg-[#60a0b0] text-white p-4 md:p-8  md:col-span-1">
          <motion.div 
            className="flex flex-col gap-3"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
          >
            {["profile", "wallet", "changePassword"].map((tab) => (
              <motion.button
                key={tab}
                variants={tabVariants}
                className={`w-full flex items-center gap-3 p-4 rounded-md text-base transition-all duration-300 hover:bg-[#48808b] hover:shadow-md ${
                  activeTab === tab ? "bg-[#48808b] shadow-lg" : ""
                }`}
                onClick={() => handleTabChange(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab === "profile" && <FaUserCircle className="text-lg" />}
                {tab === "wallet" && <FaWallet className="text-lg" />}
                {tab === "changePassword" && <FaLock className="text-md" />}
                <span className="font-semibold text-sm md:text-base capitalize">
                  {tab === "changePassword" ? "Change Password" : tab}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
        <motion.div 
          className="md:col-span-3 p-6"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          {loadingProfile ? (
            <motion.div 
              className="text-center text-gray-500 text-sm md:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="loader"></div>
              Loading Profile...
            </motion.div>
          ) : activeTab === "profile" ? (
            <Profile profile={profile} state={handle} />
          ) : null}
          {activeTab === "wallet" ? (
            loadingWallet ? (
              <motion.div 
                className="text-center text-gray-500 text-sm md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="loader"></div>
                Loading Wallet...
              </motion.div>
            ) : (
              <Wallet balance={wallet.balance} history={wallet.history}/>
            )
          ) : null}
          {activeTab === "changePassword" ? (
            <ChangePassword Id={userInfo._id} />
          ) : null}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;