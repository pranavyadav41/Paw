import React, { useState, useEffect } from "react";
import UserCard from "../admin/Card";
import { getUsers } from "../../api/admin";
import { toast } from "react-toastify";
import { Button, Flex, Box } from "@chakra-ui/react";

const UserList: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers(page, limit, searchTerm);
      setUsers(response?.data.data);
      setTotal(response?.data.total);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to fetch users");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 bg-[#000000] min-h-screen w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-between mb-4 items-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Users List</h2>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-3 py-2 border focus:outline-none rounded-md bg-black text-white"
          />
        </div>
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <>
            {users.map((user, index) => (
              <UserCard key={index} user={user} state={() => fetchUsers()} />
            ))}

            <Flex justifyContent="center" mt={4}>
              <Box>
                <Button
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                  mr={2}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    colorScheme={page === pageNum ? "blue" : "gray"}
                    mr={2}
                  >
                    {pageNum}
                  </Button>
                ))}
                <Button
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </Button>
              </Box>
            </Flex>
          </>
        )}
      </div>
    </div>
  );
};

export default UserList;
