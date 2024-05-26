import React, { useState } from "react";
import { editProfile } from "../../api/user";
import { toast } from "react-toastify";

interface ProfileProps {
  profile: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  state: (data: boolean) => void;
}

const Profile = ({ profile, state }: ProfileProps) => {
  const [name, setName] = useState(profile.name || "");
  const [email, setEmail] = useState(profile.email || "");
  const [phone, setPhone] = useState(profile.phone || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { name, email, phone };

    const response = await editProfile(profile._id, formData);

    toast.success(response?.data.message, { position: "top-center" });

    state(true);
  };

  return (
    <div className="bg-slate-100 h-[500px] w-full rounded-lg p-6">
      <div className="flex flex-col items-center">
        <form className="w-full max-w-md mt-10" onSubmit={handleSubmit}>
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
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
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
    </div>
  );
};

export default Profile;
