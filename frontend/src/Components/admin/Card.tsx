import React from 'react';

interface UserData {
  name: string;
  email: string;
  phone: string;
}

interface UserCardProps {
  user: UserData;
  onBlockUser: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onBlockUser }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
        </div>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          onClick={() => onBlockUser(user.email)}
        >
          Block User
        </button>
      </div>
    </div>
  );
};

export default UserCard;