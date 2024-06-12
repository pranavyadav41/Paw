import React, { useEffect, useState } from 'react';
import ChatRoom from '../../Components/franchise/Chat';
import { getAllUsers } from '../../api/chat';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

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
    <div className="flex justify-center items-center min-h-screen">
       <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/public/logo/pawBackground.jpg')" }}
      ></div>
      <div className="w-[70%] rounded-lg flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 bg-gray-200 p-4 z-10">
          <h3 className="text-lg font-bold mb-4 text-gray-800">All Chats</h3>
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => handleUserClick(user)}
                className={`cursor-pointer p-2 rounded ${
                  selectedUser?.id === user.id ? 'bg-gray-300' : ''
                }`}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-3/4">
          <div className="flex justify-center items-center h-[500px] text-gray-500">
            {selectedUser && <ChatRoom userId={selectedUser.id} franchiseId={franchiseInfo._id} name={selectedUser?.name} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllChats;