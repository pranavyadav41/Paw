import React, { useState } from "react";
import Modal from "react-modal";
import { blockUser, unBlockUser } from "../../api/admin";
import { toast } from "react-toastify";

Modal.setAppElement("#root"); // Add this line if you have a root div in your index.html

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isBlocked: boolean;
}

interface UserCardProps {
  user: UserData;
  state: (data: boolean) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, state }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [actionType, setActionType] = useState<"block" | "unblock">("block");

  const handleBlockUser = async (userId: string) => {
    const response = await blockUser({ userId });
    toast.success(response?.data, {
      position: "top-center",
    });
    state(true);
  };

  const handleUnblockUser = async (userId: string) => {
    const response = await unBlockUser({ userId });
    toast.success(response?.data, {
      position: "top-center",
    });
    state(true);
  };

  const confirmAction = () => {
    if (actionType === "block") {
      handleBlockUser(user._id);
    } else {
      handleUnblockUser(user._id);
    }
    setModalIsOpen(false);
  };

  const openModal = (type: "block" | "unblock") => {
    setActionType(type);
    setModalIsOpen(true);
  };

  return (
    <div
      className="bg-[#191C24] rounded-lg shadow-md p-6 mb-4 w-full transition duration-300"
      style={{ transform: "scale(1.01)", transitionDuration: "300ms" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-md font-medium text-white">
            <span className="text-gray-200">NAME: </span>
            {user.name}
          </h3>
          <p className="text-md font-medium text-white">
            <span className="text-gray-200">EMAIL: </span>
            {user.email}
          </p>
          <p className="text-md font-medium text-white">
            <span className="text-gray-200">PHONE: </span>
            {user.phone}
          </p>
        </div>
        <button
          className={
            user.isBlocked
              ? "bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              : "bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded"
          }
          onClick={() => {
            user.isBlocked ? openModal("unblock") : openModal("block");
          }}
          style={{ width: "100px", height: "40px" }}
        >
          {user.isBlocked ? <span>Unblock</span> : <span>Block</span>}
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Confirm Action"
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto my-20"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">Confirm Action</h2>
        <p className="mb-6">
          Are you sure you want to {actionType} this user?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={confirmAction}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            {actionType === "block" ? "Block" : "Unblock"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserCard;
