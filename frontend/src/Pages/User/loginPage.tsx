import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { setCredentials } from '../../redux/slices/authSlice';
import { setAdminCredentials } from '../../redux/slices/adminSlice';
import { RootState } from '../../redux/store';
import axios from 'axios';
import { login } from '../../api/user';
import { motion } from 'framer-motion';

interface Errors {
  email?: string;
  password?: string;
}

function LoginPage() {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  let { userInfo } = useSelector((state: RootState) => state.auth);
  let { adminInfo } = useSelector((state: RootState) => state.adminAuth);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (userInfo) {
      navigate('/home');
    }
    if (adminInfo) {
      navigate('/admin/dashboard');
    }
  }, [userInfo, adminInfo]);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
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
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const data = {
        email: email,
        password: password,
      };
      const response = await login(data);

      if (response) {
        if (response.data.isAdmin) {
          localStorage.setItem('token', response.data.token);
          dispatch(setAdminCredentials(response.data.message));
          navigate('/admin/dashboard');
        } else {
          console.log(response);
          localStorage.setItem('token', response.data.token);
          dispatch(setCredentials(response.data.message));
          navigate('/home');
        }
      }
    }
  };

  const Glogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`
        );

        console.log(res, '1');

        const data = {
          email: res.data.email,
          password: 'qwerty123',
        };

        const response2 = await login(data);
        console.log(response2, '2');
        if (response2) {
          if (response2.data.isAdmin) {
            localStorage.setItem('token', response2.data.token);
            dispatch(setAdminCredentials(response2.data.message));
            navigate('/admin');
          } else {
            localStorage.setItem('token', response2.data.token);
            dispatch(setCredentials(response2.data.message));
            navigate('/home');
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="flex flex-row w-full min-h-screen">
      <motion.div
        className="hidden sm:block w-2/5 bg-white relative overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="h-full bg-customColor"
          style={{ clipPath: 'polygon(0 0, 55% 0, 45% 100%, 0% 100%)' }}
        >
          <motion.img
            className="h-48 ml-12"
            src="/logo/cut and PASTE.png"
            alt=""
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
        <motion.div
          className="absolute bottom-10 left-5 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-md">Log in to access your account</p>
        </motion.div>
      </motion.div>
      <div className="flex-1 sm:bg-white bg-customColor flex flex-col justify-center items-center md:items-start py-12 sm:px-6 lg:px-8">
        <motion.h1
          className="text-3xl font-bold mb-8 md:ml-24 stext-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        > 
          Hi, Welcome! 👋
        </motion.h1>
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="bg-white py-8 px-4 shadow-2xl rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={submitHandler}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={handlePasswordVisibility}
                      className="focus:outline-none"
                    >
                      {showPassword ? <IoEyeOffSharp className="h-5 w-5 text-gray-400" /> : <IoEyeSharp className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link to="/verifyEmail" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-customColor hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign in
                </motion.button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <div className="mt-6">
                <motion.div
                  onClick={() => Glogin()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="mr-2">Sign in with Google</span>
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262">
                      <path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"/>
                      <path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"/>
                      <path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"/>
                      <path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"/>
                    </svg>
                  </button>
                </motion.div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Create one
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginPage;
