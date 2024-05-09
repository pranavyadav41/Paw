import React from "react";
import { useState, FormEvent } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { franchiseRegister } from "../../api/franchise";
import { toast } from "react-toastify";
import validator from "validator";

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  district?: string;
  city?: string;
  state?: string;
  pincode?: string;
  password?: string;
  confirmPassword?: string;
}

function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim() || !validator.isEmail(email)) {
      newErrors.email = "Valid email is required";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (phone.length < 10 || phone.length > 10) {
      newErrors.phone = "Phone number must contain 10 numbers";
    }
    if (!district.trim()) {
      newErrors.district = "District is required";
    }
    if (!city.trim()) {
      newErrors.city = "City is requires";
    }
    if (!state.trim()) {
      newErrors.state = "State is required";
    }
    if (!pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (pincode.length > 4) {
      newErrors.state = "Pincode should only contain 4 digits";
    } else if (pincode.length < 4) {
      newErrors.pincode = "Pincode must contain 4 digits";
    }

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
  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDistrict("");
    setCity("");
    setState("");
    setPincode("");
    setPassword("");
    setConfirmPassword("");
  };

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      e.preventDefault();
      const isValid = validateForm();

      if (isValid) {
        const userData = {
          email: email,
          name: name,
          phone: phone,
          password: password,
          district: district,
          city: city,
          state: state,
          pincode: pincode,
        };
        resetForm();
        const response = await franchiseRegister(userData);

        if (response) {
          toast.info(response.data.message, {
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="flex flex-row w-full">
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
        <div className="min-h-screen  sm:bg-white bg-customColor flex flex-col justify-center items-center md:items-start py-12 sm:px-6 lg:px-8 w-full sm:w-3/5 font-sans">
          <h1
            className="hidden sm:block md:overflow-x-hidden ml-1"
            style={{ fontSize: "30px", fontWeight: "bold" }}
          >
            FRANCHISE PORTAL
          </h1>
          <h1 className="hidden sm:block md:overflow-x-hidden ml-1">
            Please fill your details and Apply
          </h1>
          <h1
            className="sm:hidden mr-28"
            style={{ fontSize: "25px", fontWeight: "bold" }}
          >
            Create account
          </h1>
          <div className="mt-8  sm:w-full sm:max-w-md">
            <div
              className="bg-white py-8  px-4  rounded-lg  sm:rounded-lg sm:px-10"
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            >
              <form className="space-y-6 " onSubmit={submitHandler}>
                <div className="mt-1">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Please enter your full name"
                    className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors && <p className="text-red-500">{errors.name}</p>}
                </div>

                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Please enter your email"
                    className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors && <p className="text-red-500">{errors.email}</p>}
                </div>

                <div className="mt-1">
                  <input
                    id="phone"
                    name="phone"
                    type="mobile"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Please enter your mobile"
                    className=" bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors && <p className="text-red-500">{errors.phone}</p>}
                </div>
                <div className="flex space-x-4 mt-1">
                  <div className="w-1/2">
                    <input
                      id="area"
                      name="area"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors && <p className="text-red-500">{errors.city}</p>}
                  </div>
                  <div className="w-1/2">
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="District"
                      className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors && (
                      <p className="text-red-500">{errors.district}</p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4 mt-1">
                  <div className="w-1/2">
                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State"
                      className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors && <p className="text-red-500">{errors.state}</p>}
                  </div>
                  <div className="w-1/2">
                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Pincode"
                      className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors && <p className="text-red-500">{errors.pincode}</p>}
                  </div>
                </div>

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
                  {errors && <p className="text-red-500">{errors.password}</p>}
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
                    <p className="text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a
                      href="#"
                      className=" font-normal text-black hover:text-indigo-500"
                    >
                      Already have an account?
                    </a>
                    <Link className="ml-1 text-blue-700" to="/login">
                      Signin
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-customColor hover:bg-teal-400"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
