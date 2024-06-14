import { useEffect, useState } from "react";
import Profile from "../../Components/franchise/Profile";
import { FaUserCircle, FaMapMarkerAlt, FaLock } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import Services from "../../Components/franchise/Services";
import ChangePassword from "../../Components/franchise/ChangePassword";
import { getProfile } from "../../api/franchise";
import { getServices } from "../../api/admin";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Service {
  serviceName: string;
  serviceId: string;
  timeToComplete: any;
  _id: string;
}

const ProfilePage = () => {
  const { franchiseInfo } = useSelector(
    (state: RootState) => state.franchiseAuth
  );
  const [services, setServices] = useState([]);
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
  const [loadingServices, setLoadingServices] = useState(true);
  const [state, setState] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [availableServices, setAvailableServices] = useState<Service[]>([]);

  let available={
    opening:openingTime,
    closing:closingTime,
    available:availableServices
  }

  useEffect(() => {
    getProfile(franchiseInfo._id).then((response) => {
      setProfile(response?.data);
      setOpeningTime(response?.data.openingTime);
      setClosingTime(response?.data.closingTime);
      setAvailableServices(response?.data.services);

      setLoadingProfile(false);
      setState(false)
    });
  }, [state]);

  useEffect(() => {
    getServices().then((response) => {
      setServices(response?.data);
      setLoadingServices(false);
    });
  }, []);

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
                activeTab === "manageAddress" ? "bg-[#48808b]" : ""
              }`}
              onClick={() => handleTabChange("manageAddress")}
            >
              <MdMiscellaneousServices className="text-xl" />
              <span className="font-semibold text-sm md:text-base">
                Manage Services
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
          {loadingServices ? (
            <div>Loading services...</div>
          ) : (
            activeTab === "manageAddress" && (
              <Services services={services} available={available} Id={profile._id} state={handleState}/>
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
