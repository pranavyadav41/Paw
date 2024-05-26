import { useState } from "react";
import { updatePassword } from "../../api/franchise";
import { toast } from "react-toastify";

interface ChangePassword {
  Id: string;
}

const ChangePassword = ({ Id }: ChangePassword) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updatePassword(Id, password).then((response) => {
      toast.success(response?.data, { position: "top-center" });
      setPassword("")
      setConfirmPassword("")
    });
  };

  return (
    <div className="bg-slate-100 h-[500px] w-full rounded-lg p-6">
      <div className="flex flex-col items-center">
        <form className="w-full max-w-md mt-10" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-black text-sm md:text-base font-medium"
              >
                New Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-black text-sm md:text-base font-medium"
              >
                Confirm new Password:
              </label>
              <input
                type="password"
                id="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
