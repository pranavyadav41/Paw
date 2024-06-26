import { useState, FormEvent } from "react";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { franchiseRegister } from "../../api/franchise";
import { toast } from "react-toastify";
import validator from "validator";
import Modal from "react-modal";
import { MdLocationOn } from "react-icons/md";
import MyMap from "../../Components/common/mapBox"; // Adjust the import path as necessary

Modal.setAppElement("#root"); // Ensure this is set for accessibility

interface AddressData {
  fullAddress: string;
  area: string;
  city: string;
  state: string;
  district: string;
  postcode: string;
  longitude: number;
  latitude: number;
}

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
  const [area, setArea] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [addressSelected, setAddressSelected] = useState<boolean>(false);

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
    } else if (phone.length !== 10) {
      newErrors.phone = "Phone number must contain 10 digits";
    }

    if (!district.trim()) {
      newErrors.district = "District is required";
    }

    if (!city.trim()) {
      newErrors.city = "City is required";
    }

    if (!state.trim()) {
      newErrors.state = "State is required";
    }

    if (!pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    }
    // } else if (pincode.length !== 4) {
    //   newErrors.pincode = "Pincode must contain 4 digits";
    // }

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
          area: area,
          city: city,
          state: state,
          pincode: pincode,
          longitude: longitude,
          latitude: latitude,
        };
        resetForm();
        setAddressSelected(false);
        const response = await franchiseRegister(userData);
        if (response) {
          toast.success(response.data.message);
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleAddressSelect = (address: AddressData) => {
    setArea(address.area);
    setCity(address.city);
    setState(address.state);
    setDistrict(address.district);
    setPincode(address.postcode);
    setLongitude(address.longitude);
    setLatitude(address.latitude);
    setIsModalOpen(false);
    setAddressSelected(true);
  };

  return (
    <>
      <div className="flex flex-row w-full">
        <div className="hidden sm:block w-2/5 bg-white">
          <div
            className="h-full bg-customColor"
            style={{ clipPath: "polygon(0 0, 55% 0, 45% 100%, 0% 100%)" }}
          >
            <img
              className="h-48 ml-12"
              src="/public/logo/cut and PASTE.png"
              alt="Logo"
            />
          </div>
        </div>
        <div className="min-h-screen sm:bg-white bg-customColor flex flex-col justify-center items-center md:items-start py-12 sm:px-6 lg:px-8 w-full sm:w-3/5">
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
          <div className="mt-8 sm:w-full sm:max-w-md">
            <div
              className="bg-white py-8 px-4 rounded-lg sm:rounded-lg sm:px-10"
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            >
              <form className="space-y-6" onSubmit={submitHandler}>
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
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Please enter your mobile"
                    className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors && <p className="text-red-500">{errors.phone}</p>}
                </div>

                <div className="flex gap-12 ">
                  <div
                    className="flex  items-center text-blue-500 hover:cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <MdLocationOn />
                    <h1>Mark location</h1>
                  </div>
                  {addressSelected && (
                    <div className="">
                      <input
                        id="Area"
                        name="Area"
                        type="text"
                        value={`Area:${area}`}
                        readOnly
                        className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  )}
                </div>

                {addressSelected && (
                  <>
                    <div className="flex space-x-4 mt-1">
                      <div className="w-1/2">
                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={`City:${city}`}
                          readOnly
                          className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors && (
                          <p className="text-red-500">{errors.city}</p>
                        )}
                      </div>
                      <div className="w-1/2">
                        <input
                          id="district"
                          name="district"
                          type="text"
                          value={`Dist:${district}`}
                          readOnly
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
                          value={`State:${state}`}
                          readOnly
                          className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors && (
                          <p className="text-red-500">{errors.state}</p>
                        )}
                      </div>
                      <div className="w-1/2">
                        <input
                          id="pincode"
                          name="pincode"
                          type="text"
                          value={`Pin:${pincode}`}
                          readOnly
                          className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors && (
                          <p className="text-red-500">{errors.pincode}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Please enter your password"
                    className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={handlePasswordVisibility}
                  >
                    {showPassword ? <IoEyeOffSharp /> : <IoEyeSharp />}
                  </div>
                  {errors && <p className="text-red-500">{errors.password}</p>}
                </div>

                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Please confirm your password"
                    className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={handleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <IoEyeOffSharp /> : <IoEyeSharp />}
                  </div>
                  {errors && (
                    <p className="text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#86D2CD] hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Apply
                  </button>
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-sm">
                    Already have an account?
                    <Link
                      to="/franchise/login"
                      className="ml-2 font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Select Address"
        className="w-full h-full"
      >
        <MyMap onAddressSelect={handleAddressSelect} />
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-yellow-600"
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            zIndex: 9999,
          }}
        >
          Close Map
        </button>
      </Modal>
    </>
  );
}

export default RegisterPage;
