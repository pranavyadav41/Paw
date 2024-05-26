import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { addAddress } from "../../api/user";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  Id: string;
  onAddAddress: (data: boolean) => void;
  address: any;
  isEdit: boolean;
}

const AddressModal = ({
  isOpen,
  onClose,
  Id,
  onAddAddress,
  address,
  isEdit = false,
}: AddressModalProps) => {
  const [name, setName] = useState(address?.name || "");
  const [houseName, setHouseName] = useState(address?.houseName || "");
  const [street, setStreet] = useState(address?.street || "");
  const [city, setCity] = useState(address?.city || "");
  const [state, setState] = useState(address?.state || "");
  const [pincode, setPincode] = useState(address?.pincode || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name,
      houseName,
      street,
      city,
      state,
      pincode,
    };

    if (isEdit && address) {
      // const response = await updateAddress(Id, address._id, formData);
      // toast.success(response?.data, { position: "top-center" });
    } else {
      const response = await addAddress(Id, formData);
      toast.success(response?.data, { position: "top-center" });
      onAddAddress(true);
    }

    onClose();
    // Reset form fields
    setName("");
    setHouseName("");
    setStreet("");
    setCity("");
    setState("");
    setPincode("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={isEdit ? "Edit Address" : "Add Address"}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-md shadow-md w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 md:mt-16">
        <h2 className="mb-4 font-medium text-lg text-black">
          {isEdit ? "Edit Address" : "Add Address"}
        </h2>
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
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

interface AddressesProps {
  addresses: Array<{
    name: string;
    houseName?: string;
    street?: string;
    city: string;
    state: string;
    pincode: string;
    _id: string;
  }>;
  Id: string;
  onAddAddress: (data: boolean) => void;
}

const Addresses = ({ addresses, Id, onAddAddress }: AddressesProps) => {
  const [showModal, setShowModal] = useState(false);
  const [editAddress, setEditAddress] = useState<{
    name: string;
    houseName?: string;
    street?: string;
    city: string;
    state: string;
    pincode: string;
    _id: string;
  } | null>(null);

  const handleEditAddress = (address: {
    name: string;
    houseName?: string;
    street?: string;
    city: string;
    state: string;
    pincode: string;
    _id: string;
  }) => {
    setEditAddress(address);
    setShowModal(true);
  };

  return (
    <div className="bg-gray-100 rounded-lg p-6 relative h-[500px] overflow-y-auto">
      <h2 className="mb-4 font-semibold text-xl text-gray-800 text-center">
        Saved Addresses
      </h2>
      {addresses.length === 0 ? (
        <div className="text-center text-gray-600">No addresses available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <h3 className="font-semibold text-md text-gray-800 mr-2">
                  Name:
                </h3>
                <p className="text-gray-600">{address.name}</p>
              </div>

              <div className="flex items-center mb-4">
                <h3 className="font-semibold text-md text-gray-800 mr-2">
                  House Name:
                </h3>
                <p className="text-gray-600">{address.houseName}</p>
              </div>

              <div className="flex items-center mb-4">
                <h3 className="font-semibold text-md text-gray-800 mr-2">
                  Street:
                </h3>
                <p className="text-gray-600">{address.street}</p>
              </div>

              <div className="flex items-center mb-4">
                <h3 className="font-semibold text-md text-gray-800 mr-2">
                  City:
                </h3>
                <p className="text-gray-600">{address.city}</p>
              </div>

              <div className="flex items-center mb-4">
                <h3 className="font-semibold text-md text-gray-800 mr-2">
                  State:
                </h3>
                <p className="text-gray-600">{address.state}</p>
              </div>

              <div className="flex items-center mb-4">
                <h3 className="font-semibold text-md text-gray-800 mr-2">
                  Pincode:
                </h3>
                <p className="text-gray-600">{address.pincode}</p>
              </div>

              <div className="flex justify-end gap-2">
                <EditIcon className="mr-1 "  />

                <DeleteIcon className="mr-1" />
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => {
          setEditAddress(null);
          setShowModal(true);
        }}
        className="flex items-center justify-center p-2 rounded-md bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 absolute bottom-6 right-6"
      >
        <FaPlus className="mr-1" />
        Add Address
      </button>
      <AddressModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        Id={Id}
        onAddAddress={onAddAddress}
        address={editAddress}
        isEdit={!!editAddress}
      />
    </div>
  );
};

export default Addresses;
