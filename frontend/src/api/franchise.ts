import franchiseRoutes from "../services/endpoints/franchiseEndPoints";
import Api from "../services/axios";
import errorHandle from "./error";

interface franchiseFormData {
  name?: string;
  email?: string;
  mobile?: string;
  password?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
}

interface loginData {
  email?: string;
  password?: string;
}

export const franchiseRegister = async (franchiseData: franchiseFormData) => {
  try {
    const response = await Api.post(
      franchiseRoutes.franchiseRequest,
      franchiseData
    );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const franchiseLogin = async (franchiseData: loginData) => {
  try {
    const response = await Api.post(
      franchiseRoutes.franchiseLogin,
      franchiseData
    );
    return response;
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
    const response = await Api.post(franchiseRoutes.franchiseOtpVerify, {
      ...otp,
      ...userId,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  } 
};
export const forgotPassword = async (email: { email: string }) => {
  try {
    const response = await Api.post(franchiseRoutes.franchiseForgotPass, email);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const resetPassword = async (password: { password: string },userId:{userId:string}) => {
  try {
    const response = await Api.post(franchiseRoutes.franchiseResetPassword,{...password,...userId});
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const resendOTP = async ()=>{
  try {
    const response = await Api.post(franchiseRoutes.resendOtp)
    console.log(response)
    
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
    
  }
}