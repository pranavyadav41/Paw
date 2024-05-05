import React from "react";

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isBlocked: boolean;
}

interface UserCardProps {
  user: UserData;
  onBlockUser: (userId: string) => void;
  onUnblockUser: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onBlockUser,
  onUnblockUser,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">
            <span>NAME:</span>
            {user.name}
          </h3>
          <p className="text-gray-600">
            <span>EMAIL:</span>
            {user.email}
          </p>
          <p className="text-gray-600">
            <span>PHONE:</span>
            {user.phone}
          </p>
        </div>
        <button
           className={
            user.isBlocked
              ? "bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              : "bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded"
          }
          onClick={() => {
            user.isBlocked ? onUnblockUser(user._id) : onBlockUser(user._id);
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
