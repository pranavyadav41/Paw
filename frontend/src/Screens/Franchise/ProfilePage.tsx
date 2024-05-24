import { useEffect, useState } from "react";
import Profile from "../../Components/franchise/Profile";
import Services from "../../Components/franchise/Services";
import { getServices } from "../../api/admin";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ProfilePage = () => {

  const {franchiseInfo} = useSelector((state:RootState)=>state.franchiseAuth)

  console.log(franchiseInfo,"profile")

  
  const [services,setServices] =useState([])

  const profileDetails = {
    _id: franchiseInfo._id,
    name: franchiseInfo.name,
    phone: franchiseInfo.phone,
    email: franchiseInfo.email,
    district:franchiseInfo.district,
    city: franchiseInfo.city,
    state: franchiseInfo.state,
    pincode: franchiseInfo.pincode
  };

  useEffect(()=>{

    getServices().then((response)=>setServices(response?.data))



  },[])

  return (
    <div style={{ backgroundImage: "url('/public/logo/pawBackground.jpg')"}}>
      <div className="min-h-screen px-4 lg:px-20 py-10" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        <div className="mb-10">
          <h1 className="text-2xl font-bold">Franchise Info</h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
          <Profile profile={profileDetails} />
          <Services services={services} />
        </div>
      </div>
    </div>
  );
  
};

export default ProfilePage;
