import React, { useState, useEffect } from "react";
import UserCard from "../admin/Card";
import { getUsers } from "../../api/admin";

const UserList: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(false);

  const handle = (data: boolean) => {
    setState(data);
  };
 
  useEffect(() => {
    getUsers().then((response: any) => {
      setUsers(response.data.data);
      setState(false);
    });
  }, [state]);

  const filteredUsers = users.filter((user: any) =>
    `${user.name} ${user.email} ${user.phone}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#000000] min-h-screen w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-between mb-4 items-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Users List</h2>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border focus:outline-none rounded-md bg-black text-white"
          />
        </div>
        {filteredUsers.map((user, index) => (
          <UserCard key={index} user={user} state={handle} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
