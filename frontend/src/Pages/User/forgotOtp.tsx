import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fOtpVerify, resendOTP } from "../../api/user";
import { toast } from "react-toastify";
import errorHandle from "../../api/error"; // Adjust the path accordingly

function Otp() {
  const [otp, setOtp] = useState("");
  const [resendButton, setShowResendButton] = useState(true);
  const [timerValue, setTimerValue] = useState(60);
  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state;

  const submitOtp = async () => {
    try {
      let response = await fOtpVerify(
        { otp: parseInt(otp) },
        { email: data.email }
      );

      if (response) {
        toast.success(response.data);
        navigate("/resetPassword", {
          state: { email: data.email },
        });
      }
    } catch (error: any) {
      errorHandle(error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (!resendButton && timerValue > 0) {
      interval = setInterval(() => {
        setTimerValue((prevValue) => prevValue - 1);
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
    try {
      const response: any = await resendOTP(data.email);
      if (response) {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      errorHandle(error);
    }
  };

  return (
    <div className="flex flex-row w-full ">
      <div className="hidden sm:block w-2/5 bg-white">
        <div
          className="h-full bg-customColor"
          style={{ clipPath: "polygon(0 0, 55% 0, 45% 100%, 0% 100%)" }}
        >
          <img className="h-48 ml-12" src="/logo/cut and PASTE.png" alt="" />
        </div>
      </div>
      <div className="min-h-screen sm:bg-white bg-customColor flex flex-col justify-center items-center md:items-start py-12 sm:px-6 lg:px-8 w-full sm:w-3/5">
        <h1 className="ml-1" style={{ fontSize: "30px", fontWeight: "bold" }}>
          Enter your OTP
        </h1>
        <h1 className="ml-10 md:ml-1">
          A 4 digit OTP has been sent to your registered email.
        </h1>
        <div className="mt-8 sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:rounded-lg sm:px-10">
            <input
              id="otp"
              name="otp"
              type="number"
              placeholder="Enter your OTP"
              onChange={(e) => setOtp(e.target.value)}
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
                <span className="text-blue-800">
                  Resend OTP in {timerValue}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
