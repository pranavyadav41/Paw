import React,{useState,useEffect} from 'react';
import UserCard from '../admin/Card';
import { getUsers } from '../../api/admin';
import { blockUser } from '../../api/admin';
import { unBlockUser } from '../../api/admin';

const UserList: React.FC = () => {

  const [users,setUsers]=useState([])
  const [searchTerm, setSearchTerm] = useState('');

 

  const handleBlockUser = async(userId: string) => {
    const response=await blockUser({userId})
    console.log(response)
  };

  const handleUnblockUser = async(userId:string)=>{
    const response=await unBlockUser({userId})
    console.log(response)
  }

  useEffect(()=>{

    getUsers().then((response:any)=>setUsers(response.data.data))
  
    },[handleBlockUser,handleUnblockUser])

  const filteredUsers = users.filter((user:any) =>
    `${user.name} ${user.email} ${user.phone}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-slate-400 h-screen w-full">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border focus:outline-none rounded-md"
        />
      </div>
      {filteredUsers.map((user, index) => (
        <UserCard key={index} user={user} onBlockUser={handleBlockUser} onUnblockUser={handleUnblockUser}/>
      ))}
    </div>
  </div>
    
  );
};

export default UserList;