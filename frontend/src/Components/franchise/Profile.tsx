import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; 

interface Franchise {
  _id: string;
  name: string;
  phone: string;
  email: string;
  district: string;
  city: string;
  state: string;
  pincode: string;
}

interface ProfileProps {
  profile: Franchise;
}

const Profile: React.FC<ProfileProps> = ({ profile }) => {
  return (
    <div className="w-80 h-72 bg-[#9ad1aa] rounded-md p-6 shadow-md flex flex-col items-center">
      <FaUserCircle className="text-6xl text-gray-700 mb-4" />
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">{profile.name}</h2>
        <p className="text-sm text-gray-600"><span className='font-semibold'>Email: </span>{profile.email}</p>
        <p className="text-sm text-gray-600"><span className='font-semibold'>Phone: </span>{profile.phone}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600"><span className='font-semibold'>Address: </span>{profile.city}, {profile.district}</p>
        <p className="text-sm text-gray-600">{profile.state}, {profile.pincode}</p>
      </div>
    </div>
  );
}

export default Profile;
