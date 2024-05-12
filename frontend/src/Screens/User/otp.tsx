import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import { otpVerify } from "../../api/user";
import { resendOTP } from "../../api/user";
import { toast } from "react-toastify";

function otp() {
  const [otp, setOtp] = useState(0);
  const [resendButton, setShowResendButton] = useState(true);
  const [timerValue, setTimerValue] = useState(60);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const data = location.state?.userId ?? 'default value';

  const submitOtp = async () => {
    if (data !=='default value') {
      const response= await otpVerify(
        { otp: otp },
        { userId: data.userId }
      );
      if (response) {
        toast.success(response.data.message);
        navigate("/resetPassword", {
          state: { userId: data },
        });
      }
    } else {
      const response = await otpVerify({ otp: otp }, { userId: "" });

      localStorage.setItem("token", response?.data.token);
      dispatch(setCredentials(response?.data.data));
      navigate("/home");
    }
  };
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (!resendButton && timerValue > 0) {
      interval = setInterval(() => {
        setTimerValue(timerValue - 1);
      }, 1000);
    } else if (timerValue === 0) {
      setShowResendButton(true);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [resendButton, timerValue]);

  const handleResendOtp = async () => {
    setShowResendButton(false);
    setTimerValue(60);
    let response:any= await resendOTP();
    if (response) {
      toast.success(response.message);
    }
  };

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
        <h1 className="ml-1" style={{ fontSize: "30px", fontWeight: "bold" }}>
          Enter your OTP
        </h1>
        <h1 className="ml-10 md:ml-1">
          A 4 digit otp has been sent to your registered email.
        </h1>
        <div className="mt-8  sm:w-full sm:max-w-md">
          <div className="bg-white py-8  px-4  shadow-xl rounded-lg  sm:rounded-lg sm:px-10">
            <input
              id="otp"
              name="otp"
              type="number"
              placeholder="Enter your otp"
              onChange={(e) => setOtp(parseInt(e.target.value, 10))}
              required
              className="bg-gray-100 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              onClick={submitOtp}
              className="mt-7 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-customColor hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Verify
            </button>
            <div className="mt-3 text-sm flex gap-1">
              <p>Didn't receive OTP?</p>
              {resendButton ? (
                <button className="text-blue-800" onClick={handleResendOtp}>
                  RESEND OTP
                </button>
              ) : (
                <span className="text-blue-800">Resend otp in {timerValue}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default otp;
