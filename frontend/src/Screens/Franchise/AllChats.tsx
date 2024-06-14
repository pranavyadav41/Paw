import React, { useEffect, useState } from 'react';
import ChatRoom from '../../Components/franchise/Chat';
import { getAllUsers } from '../../api/chat';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FaUserCircle, FaComments } from 'react-icons/fa';

interface User {
  id: string;
  name: string;
}

const AllChats: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const { franchiseInfo } = useSelector((state: RootState) => state.franchiseAuth);

  useEffect(() => {
    getAllUsers(franchiseInfo._id)
      .then((response) => {
        if (response && response.data) {
          setUsers(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [franchiseInfo._id]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/public/logo/pawBackground.jpg')" }}
      ></div>
      <div className="w-[90%] max-w-6xl md:h-[550px] bg-gray-200 rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden z-20">
        <div className="w-full md:w-1/4 bg-gray-800 md:h-[550px] p-6 z-10 mt-4">
          <h3 className="text-xl font-bold mb-6 text-white flex items-center">
            <FaComments className="mr-3" /> All Chats
          </h3>
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => handleUserClick(user)}
                className={`cursor-pointer p-3 rounded-lg flex items-center transition-colors ${
                  selectedUser?.id === user.id ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <FaUserCircle className="mr-3 text-xl" />
                {user.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-3/4 bg-white flex flex-col right-2">
          {selectedUser ? (
            <ChatRoom userId={selectedUser.id} franchiseId={franchiseInfo._id} name={selectedUser?.name} />
          ) : (
            <div className="flex flex-col justify-center items-center h-full text-gray-500 bg-gray-200 z-20">
              <FaComments className="text-6xl mb-4" />
              <h3 className="text-2xl font-semibold">Welcome to Your Chat</h3>
              <p className="mt-2 text-center">Select a user from the list to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllChats;
