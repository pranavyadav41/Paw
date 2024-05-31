import React, { useState, useEffect } from "react";
import { updateProfile } from "../../api/franchise";
import { toast } from "react-toastify";
import Modal from "react-modal";
import MyMap, { AddressData } from "../common/mapBox";

interface Franchise {
  _id: string;
  name: string;
  phone: string;
  email: string;
  area: string;
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
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [area, setArea] = useState(profile.area);
  const [city, setCity] = useState(profile.city);
  const [district, setDistrict] = useState(profile.district);
  const [state, setState] = useState(profile.state);
  const [pincode, setPincode] = useState(profile.pincode);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
    setPhone(profile.phone);
    setCity(profile.city);
    setArea(profile.area);
    setDistrict(profile.district);
    setState(profile.state);
    setPincode(profile.pincode);
  }, [profile]);

  const handleEditAddress = () => {
    setModalIsOpen(true);
  };

  const handleAddress = async (address: AddressData) => {
    setArea(address.area);
    setCity(address.city);
    setState(address.state);
    setDistrict(address.district);
    setPincode(address.postcode);
    setLongitude(address.longitude);
    setLatitude(address.latitude);
    setModalIsOpen(false)
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateProfile(profile._id, { name, email, phone },{area,city,state,district,pincode,longitude,latitude});
      if (response) {
        profileState(true);
        toast.success(response.data, { position: "top-center" });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="bg-slate-100 h-[500px] w-full rounded-lg p-6">
      <div className="flex flex-col items-center">
        <form className="w-full max-w-md " onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-black text-sm md:text-base font-medium"
              >
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
              <label
                htmlFor="email"
                className="block mb-2 text-black text-sm md:text-base font-medium"
              >
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
              <label
                htmlFor="phone"
                className="block font-medium mb-2 text-black text-sm md:text-base"
              >
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
              <label
                htmlFor="address"
                className="block font-medium mb-2 text-black text-sm md:text-base"
              >
                Address:
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="address"
                  value={`${area},${city},${district}, ${state}, ${pincode}`}
                  className="w-full px-4 py-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="mt-6 w-full bg-[#48808B] text-white py-2 rounded-md hover:bg-sky-900 transition-colors duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
          >
            Update Profile
          </button>
        </form>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Mark Location"
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      >
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl p-4">
          <button
            onClick={() => setModalIsOpen(false)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-md p-1 px-4 focus:outline-none hover:bg-red-600"
          >
            Close
          </button>
          <h2 className="text-xl font-bold mb-4 text-center">Mark Location</h2>
          <div className="w-full h-[500px] bg-gray-200 rounded-lg overflow-hidden">
            <MyMap onAddressSelect={handleAddress} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
