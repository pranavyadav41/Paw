import franchiseRoutes from "../services/endpoints/franchiseEndPoints";
import Api from "../services/axios";
import errorHandle from "./error";

interface franchiseFormData {
  name?: string;
  email?: string;
  mobile?: string;
  password?: string;
  area?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
  longitude?: number;
  latitude?: number;
}

interface loginData {
  email?: string;
  password?: string;
}

interface address {
  city: string;
  district: string;
  state: string;
  pincode: string;
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
export const resetPassword = async (
  password: { password: string },
  userId: { userId: string }
) => {
  try {
    const response = await Api.post(franchiseRoutes.franchiseResetPassword, {
      ...password,
      ...userId,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const resendOTP = async () => {
  try {
    const response = await Api.post(franchiseRoutes.resendOtp);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const getProfile = async (Id: string) => {
  try {
    const response = await Api.post(franchiseRoutes.getProfile, { Id: Id });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const updateProfile = async (
  Id: string,
  data: { name: string; email: string; phone: string },
  address:{city:string,area:string,district:string,state:string,pincode:string,longitude:number,latitude:number}
) => {
  try {
    const response = await Api.post(franchiseRoutes.updateProfile, {
      Id: Id,
      data: data,
      address:address
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const updatePassword = async (Id: string, password: string) => {
  try {
    const response = await Api.post(franchiseRoutes.updatePassword, {
      Id: Id,
      password: password,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const addServices = async (
  franchiseId: string,
  service: { serviceId: string; serviceName: string },
  time: { hours: number; minutes: number }
) => {
  try {
    const response = await Api.post(franchiseRoutes.addService, {
      franchiseId: franchiseId,
      service: service,
      time: time,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const deleteService = async (franchiseId: string, serviceId: string) => {
  try {
    const response = await Api.post(franchiseRoutes.deleteService, {
      franchiseId: franchiseId,
      serviceId: serviceId,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const setTime = async (
  franchiseId: string,
  openingTime: string,
  closingTime: string
) => {
  try {
    const response = await Api.post(franchiseRoutes.setTime, {
      franchiseId: franchiseId,
      openingTime: openingTime,
      closingTime: closingTime,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const editTime = async (
  franchiseId: string,
  serviceId: string,
  hours: number,
  minutes: number
) => {
  try {
    const response = await Api.post(franchiseRoutes.editTime, {
      franchiseId: franchiseId,
      serviceId: serviceId,
      hours: hours,
      minutes: minutes,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
