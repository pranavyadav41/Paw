import { useState, useEffect } from "react";
import { FaUserCircle, FaWallet, FaLock } from "react-icons/fa";
import Profile from "../../Components/user/Profile";
import ChangePassword from "../../Components/user/ChangePassword";
import Wallet from "../../Components/user/wallet";
import { getProfile, getWallet } from "../../api/user"; // Assuming getWallet is a function to fetch wallet data
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

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

  return (
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen md:mt-16">
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
              <span className="font-semibold text-sm md:text-base">Profile</span>
            </button>
            <button
              className={`w-full flex items-center gap-3 p-4 rounded-md text-base transition-colors duration-300 ${
                activeTab === "wallet" ? "bg-[#48808b]" : ""
              }`}
              onClick={() => handleTabChange("wallet")}
            >
              <FaWallet className="text-lg" />
              <span className="font-semibold text-sm md:text-base">My wallet</span>
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
        <div className="md:col-span-3">
          {loadingProfile ? (
            <div className="text-center text-gray-500 text-sm md:text-lg">
              Loading Profile...
            </div>
          ) : activeTab === "profile" ? (
            <Profile profile={profile} state={handle} />
          ) : null}
          {activeTab === "wallet" ? (
            loadingWallet ? (
              <div className="text-center text-gray-500 text-sm md:text-lg">
                Loading Wallet...
              </div>
            ) : (
              <Wallet balance={wallet.balance} history={wallet.history}/>
            )
          ) : null}
          {activeTab === "changePassword" ? (
            <ChangePassword Id={userInfo._id} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
