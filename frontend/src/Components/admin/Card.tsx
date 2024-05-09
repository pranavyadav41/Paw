import React from "react";
import { blockUser } from "../../api/admin";
import { unBlockUser } from "../../api/admin";

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
  const handleBlockUser = async (userId: string) => {
    const response = await blockUser({ userId });
    state(true);
  };

  const handleUnblockUser = async (userId: string) => {
    const response = await unBlockUser({ userId });
    state(true);
  };
  return (

    <div
      className="bg-[#191C24] rounded-lg shadow-md p-6 mb-4 w-full transition duration-300"
      style={{ transform: "scale(1.01)", transitionDuration: "300ms" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
    >
      <div className="flex items-center justify-between ">
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
            user.isBlocked
              ? handleUnblockUser(user._id)
              : handleBlockUser(user._id);
          }}
          style={{ width: "100px", height: "40px" }}
        >
          {user.isBlocked ? <span>Unblock</span> : <span>Block</span>}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
