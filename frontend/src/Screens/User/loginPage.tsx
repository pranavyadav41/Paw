import {FormEvent, useState } from 'react'
import { Link } from "react-router-dom";
import validator from 'validator';

interface Errors{
  email?:string;
  password?:string;
}

function loginPage() {

  const [email,setEmail]=useState<string>('')
  const [password,setPassword]=useState<string>('')
  const [errors,setErrors]=useState<Errors>({})


  const validateForm =()=>{
    const newErrors: Errors = {};

    if (!email.trim() || !validator.isEmail(email)) {
      newErrors.email = 'Valid email is required';
    }


    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must contain at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  }


  const submitHandler=async(e:FormEvent<HTMLFormElement>):Promise<void>=>{
    e.preventDefault()
    const isValid=validateForm()

    if(isValid){
      console.log("done")
    }
  }




  return (
    <div className="flex flex-row w-full ">
      <div className="hidden sm:block w-2/5 bg-white">
        <div
          className=" h-full  bg-customColor "
          style={{ clipPath: "polygon(0 0, 55% 0, 45% 100%, 0% 100%)" }}
        >
           <img className="h-48 ml-12" src="/public/logo/cut and PASTE.png" alt="" />
        </div>
      </div>
      <div className="min-h-screen  sm:bg-white bg-customColor flex flex-col justify-center items-center md:items-start py-12 sm:px-6 lg:px-8 w-full sm:w-3/5">
      <h1 className="ml-32 hidden sm:block md:overflow-x-hidden" style={{fontSize:"30px",fontWeight:"bold"}}>Hi, Welcome! 👋</h1>
        <h1 className="sm:hidden" style={{fontSize:"25px",fontWeight:"bold"}}>Hi, Welcome! 👋</h1>
        <div className="mt-8  sm:w-full sm:max-w-md">
          <div className="bg-white py-8  px-4  shadow-xl rounded-lg  sm:rounded-lg sm:px-10">
            <form className="space-y-6 " onSubmit={submitHandler}>
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
                    onChange={(e)=>setEmail(e.target.value)}

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
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className=" bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {errors && <p className="text-red-500">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    href="#"
                    className=" font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
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
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 ">
                

                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="mr-2">Sign in with Google</span>
               
                      <svg className="w-5 h-5"  xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262"><path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"/><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"/><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"/><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"/></svg>
                  </a>
                </div>
                <div className="flex flex-row">

                <p style={{fontSize:"14px"}}>Dont have an account?</p>
                <Link style={{fontSize:"14px",marginLeft:"2px",color:"blue"}}  to="/register">Create</Link>

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
