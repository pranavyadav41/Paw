import { useState } from "react";
import { updatePassword } from "../../api/franchise";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface ChangePassword {
  Id: string;
}

const ChangePassword = ({ Id }: ChangePassword) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    let valid = true;
    let errors = {
      password: "",
      confirmPassword: "",
    };

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await updatePassword(Id, password);
      toast.success(response?.data, { position: "top-center" });
      setPassword("");
      setConfirmPassword("");
      setErrors({
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Failed to update password", { position: "top-center" });
    }
  };

  return (
    <div className="bg-gray-200 h-[500px] w-full p-6">
      <div className="flex flex-col items-center">
        <form className="w-full max-w-md mt-10" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-black text-sm md:text-base font-medium"
              >
                New Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-black text-sm md:text-base font-medium"
              >
                Confirm new Password:
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
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
