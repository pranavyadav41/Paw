import UserCard3 from "./Card3";
import { useState, useEffect } from "react";
import { getFranchises } from "../../api/admin";

const FranchiseList = () => {
  const [franchises, setFranchises] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [state,setState] = useState(false)


  const handle =(data:boolean)=>{
    setState(data)
  }



  useEffect(() => {
    getFranchises().then((response: any) => {
      setFranchises(response.data);
      setState(false)
    });
  }, [state]);

  const filteredUsers = franchises.filter((franchise: any) =>
    `${franchise.name} ${franchise.city} ${franchise.district}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#000000] min-h-screen w-full">
      <div className="container mx-auto px-4">
        
        <div className=" flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Franchise List</h2>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border focus:outline-none rounded-md bg-black text-white"
          />
        </div>

        {filteredUsers.map((franchise, index) => (
          <UserCard3 key={index} franchise={franchise} state={handle} />
        ))}
      </div>
    </div>
  ); 
};

export default FranchiseList;
