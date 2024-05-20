import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { setCredentials } from "../../redux/slices/franchiseSlice";
import { useSelector, useDispatch } from "react-redux";
import { franchiseLogin } from "../../api/franchise";
import { RootState } from "../../redux/store";

interface Errors {
  email?: string;
  password?: string;
}

function loginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {franchiseInfo}=useSelector((state:RootState)=>state.franchiseAuth)

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if(franchiseInfo){
      navigate('/franchise')
    }
  },[franchiseInfo]);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!email.trim() || !validator.isEmail(email)) {
      newErrors.email = "Valid email is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(()=>{

  },[])

  const handleSubmit = async(e:FormEvent<HTMLFormElement>):Promise<void>=>{
    e.preventDefault()
    let validate = validateForm()

    if(validate){
      const data={
        email:email,
        password:password
      }
      const response = await franchiseLogin(data)
      if(response){
        console.log(response)
        localStorage.setItem('token', response.data.token)
        dispatch(setCredentials(response.data.message))
        navigate('/franchise')
      }
    }
  }


  return (
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
        <h1
          className="ml-32 hidden sm:block md:overflow-x-hidden"
          style={{ fontSize: "30px", fontWeight: "bold" }}
        >
          LOGIN PORTAL
        </h1>
        <h1
          className="sm:hidden"
          style={{ fontSize: "25px", fontWeight: "bold" }}
        >
          LOGIN PORTAL
        </h1>
        <div className="mt-8  sm:w-full sm:max-w-md">
          <div
            className="bg-white py-8  px-4  rounded-lg  sm:rounded-lg sm:px-10"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 20px" }}
          >
            <form className="space-y-6 " onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {errors && <p className="text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                </div>
                {errors && <p className="text-red-500">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/verifyEmail"
                    className=" font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-customColor hover:bg-teal-400 "
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">

              <div className="mt-6 grid grid-cols-1 gap-3 ">
                <div className="flex flex-row">
                  <p style={{ fontSize: "14px" }}>Dont have an account?</p>
                  <Link
                    style={{
                      fontSize: "14px",
                      marginLeft: "2px",
                      color: "blue",
                    }}
                    to="/franchise/register"
                  >
                    Create
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default loginPage;
