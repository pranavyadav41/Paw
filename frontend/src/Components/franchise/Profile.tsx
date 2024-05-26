import React, { useState, useEffect } from 'react';
import { updateAddress, updateProfile } from '../../api/franchise';
import { toast } from 'react-toastify';

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
  profileState: (data: boolean) => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, profileState }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [city, setCity] = useState(profile.city);
  const [district, setDistrict] = useState(profile.district);
  const [state, setState] = useState(profile.state);
  const [pincode, setPincode] = useState(profile.pincode);

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
    setPhone(profile.phone);
    setCity(profile.city);
    setDistrict(profile.district);
    setState(profile.state);
    setPincode(profile.pincode);
  }, [profile]);

  const handleEditAddress = () => {
    setIsModalOpen(true);
  };

  const handleUpdateAddress = async () => {
    try {
      const response = await updateAddress(profile._id, { city, district, state, pincode });
      if (response) {
        profileState(true);
        setIsModalOpen(false);
        toast.success(response.data,{position:"top-center"})
      }
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateProfile(profile._id, { name, email, phone });
      if (response) {
        profileState(true);
        toast.success(response.data,{position:"top-center"})
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="bg-slate-100 h-[500px] w-full rounded-lg p-6">
      <div className="flex flex-col items-center">
        <form className="w-full max-w-md mt-10" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-black text-sm md:text-base font-medium">
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-black text-sm md:text-base font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block font-medium mb-2 text-black text-sm md:text-base">
                Phone:
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="address" className="block font-medium mb-2 text-black text-sm md:text-base">
                Address:
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="address"
                  value={`${city}, ${district}, ${state}, ${pincode}`}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  readOnly
                />
                <button
                  type="button"
                  className="ml-2 text-sm text-blue-500 hover:underline"
                  onClick={handleEditAddress}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
          >
            Update Profile
          </button>
        </form>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Address</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="modal-city" className="block mb-2 text-black text-sm md:text-base font-medium">
                  City:
                </label>
                <input
                  type="text"
                  id="modal-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="modal-district" className="block mb-2 text-black text-sm md:text-base font-medium">
                  District:
                </label>
                <input
                  type="text"
                  id="modal-district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="modal-state" className="block mb-2 text-black text-sm md:text-base font-medium">
                  State:
                </label>
                <input
                  type="text"
                  id="modal-state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="modal-pincode" className="block mb-2 text-black text-sm md:text-base font-medium">
                  Pincode:
                </label>
                <input
                  type="text"
                  id="modal-pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <button
              type="button"
              className="mt-6 w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
              onClick={handleUpdateAddress}
            >
              Update Address
            </button>
            <button
              type="button"
              className="mt-4 w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
