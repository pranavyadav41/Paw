import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/user";
import validator from "validator";
import { toast } from "react-toastify";

interface Errors {
  email?: string;
}

function ForgetEmail() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!email.trim() || !validator.isEmail(email)) {
      newErrors.email = "Valid email is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitEmail = async () => {
    const isValid = validateForm();
    if (isValid) {
      const response= await forgotPassword({ email });
      if (response) {
        toast.success(response.data.message);
        navigate("/Otp", {
          state: { userId: response.data.userId },
        });
      }
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
              src="/logo/cut and PASTE.png"
              alt=""
            />
          </div>
        </div>
        <div className="min-h-screen  sm:bg-white bg-customColor flex flex-col justify-center items-center md:items-start py-12 sm:px-6 lg:px-8 w-full sm:w-3/5">
          <h1 className="ml-1" style={{ fontSize: "30px", fontWeight: "bold" }}>
            Enter your email
          </h1>
          <h1 className="ml-10 md:ml-1">
            Please enter your registered email for verify.
          </h1>
          <div className="mt-8  sm:w-full sm:max-w-md">
            <div className="bg-white py-8  px-4  shadow-xl rounded-lg  sm:rounded-lg sm:px-10">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors && <p className="text-red-500">{errors.email}</p>} 
              <button
                onClick={submitEmail}
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

export default ForgetEmail;
