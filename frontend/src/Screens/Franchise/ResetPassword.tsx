import { useState } from "react";
import { resetPassword } from "../../api/franchise";
import { useLocation, useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { toast } from "react-toastify";

interface Errors {
  password?: string;
  confirmPassword?: string;
}

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const location = useLocation();
  const userId = location.state?.userId;
  const navigate = useNavigate(); 

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitPassword = async () => {
    const valid = validateForm();
    if (valid) {
      console.log("clicked")
      const response = await resetPassword({ password }, { userId });
      toast.success(response?.data);
      navigate("/franchise/login");
    }
  };

  return (
    <div>
      <div className="flex flex-row w-full ">
        <div className="hidden sm:block w-2/5 bg-white">
          <div
            className=" h-full  bg-customColor "
            style={{ clipPath: "polygon(0 0, 55% 0, 45% 100%, 0% 100%)" }}
          >
            <img
              className="h-48 ml-12"
              src="/public/logo/cut and PASTE.png"
              alt=""
            />
          </div>
        </div>
        <div className="min-h-screen  sm:bg-white bg-customColor flex flex-col justify-center items-center md:items-start py-12 sm:px-6 lg:px-8 w-full sm:w-3/5">
          <h1 className="ml-1" style={{ fontSize: "30px", fontWeight: "bold" }}>
            Reset Password
          </h1>
          <h1 className="ml-10 md:ml-1">Please reset your password</h1>
          <div className="mt-8  sm:w-full sm:max-w-md">
            <div className="bg-white py-8  px-4  shadow-xl rounded-lg  sm:rounded-lg sm:px-10 flex flex-col gap-3">
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Please enter your Password"
                  className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={handlePasswordVisibility}
                    className="focus:outline-none"
                  >
                    {showPassword ? <IoEyeOffSharp /> : <IoEyeSharp />}
                  </button>
                </div>
                {errors && <p className="text-red-500 ">{errors.password}</p>}
              </div>
              <div className="mt-1 relative">
                <input
                  id="cpassword"
                  name="cpassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Please confirm your password"
                  className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={handleConfirmPasswordVisibility}
                    className="focus:outline-none"
                  >
                    {showConfirmPassword ? <IoEyeOffSharp /> : <IoEyeSharp />}
                  </button>
                </div>
                {errors && (
                  <p className="text-red-500 absolute">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <button
                onClick={submitPassword}
                className="mt-7 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-customColor hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
