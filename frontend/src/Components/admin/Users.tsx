import React from 'react';
import UserCard from '../admin/Card';

const userData = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '987-654-3210',
  },
  // Add more user data as needed
];

const UserList: React.FC = () => {
  const handleBlockUser = (userId: string) => {
    console.log(`Blocking user with email: ${userId}`);
    // Implement your logic to block the user here
  };

  return (
    <div className='p-4 bg-slate-400 h-screen w-full'>

<div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      {userData.map((user, index) => (
        <UserCard key={index} user={user} onBlockUser={handleBlockUser} />
      ))}
    </div>  

    </div>
  
    
  );
};

export default UserList;