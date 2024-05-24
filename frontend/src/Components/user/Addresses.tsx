import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "react-modal";
import { addAddress } from "../../api/user";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  Id:string
}

const AddressModal = ({ isOpen, onClose,Id}: AddressModalProps) => {
  const [name, setName] = useState("");
  const [houseName, setHouseName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = {
      name:name,
      houseName:houseName,
      street:street,
      city:city,
      state:state,
      pincode:pincode
    }

    const response = addAddress(Id,formData).then((response)=>console.log(response))


    // Reset form fields
    setName("");
    setHouseName("");
    setStreet("");
    setCity("");
    setState("");
    setPincode("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Address"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-md shadow-md w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 md:mt-16">
        <h2 className="mb-4 font-medium text-lg text-black">Add Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="houseName" className="block mb-1 font-medium">
              House Name
            </label>
            <input
              type="text"
              id="houseName"
              value={houseName}
              onChange={(e) => setHouseName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="street" className="block mb-1 font-medium">
              Street
            </label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block mb-1 font-medium">
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block mb-1 font-medium">
              State
            </label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pincode" className="block mb-1 font-medium">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end sm:flex-row flex-col">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 mb-2 sm:mb-0 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

interface AddressesProps {
  Id: string;
}

const Addresses = ({ Id }: AddressesProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-slate-100 h-[500px] w-full rounded-lg p-6 relative">
      <h2 className="mb-4 font-medium text-lg text-black">Saved Addresses</h2>
      <div className="flex flex-wrap gap-4">
        {/* Existing address cards */}
      </div>
      <button
        className="bg-[#4DA34B] text-white px-4 py-2 rounded mt-4 flex items-center justify-center gap-2 hover:bg-green-500 transition-colors duration-300 text-sm md:text-base"
        onClick={() => setShowModal(true)}
      >
        <FaPlus /> Add Address
      </button>
      <AddressModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        Id={Id}
      />
    </div>
  );
};

export default Addresses;
