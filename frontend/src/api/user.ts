import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndPoints";
import errorHandle from "./error";

interface userFormData {
  name?: string;
  email?: string;
  mobile?: string;
  password?: string;
}
interface loginData {
  email?: string;
  password?: string;
}

export const signup = async (userData: userFormData) => {
  try {
    const response = await Api.post(userRoutes.signup, userData);
    return response;
    5;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const otpVerify = async (
  otp: { otp: number },
  userId: { userId: string }
) => {
  try {
    const response = await Api.post(userRoutes.userOtpVerify, {
      ...otp,
      ...userId,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const login = async (userData: loginData) => {
  try {
    const response = await Api.post(userRoutes.userLogin, userData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const forgotPassword = async (email: { email: string }) => {
  try {
    const response = await Api.post(userRoutes.userForgotPass, email);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const resetPassword = async (password: { password: string },userId:{userId:string}) => {
  try {
    const response = await Api.post(userRoutes.userResetPassword,{...password,...userId});
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const resendOTP = async ()=>{
  try {
    const response = await Api.post(userRoutes.resendOtp)
    console.log(response)
    
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
    
  }
}
