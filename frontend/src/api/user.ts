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

interface address {
  name: string;
  houseName: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
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
export const resetPassword = async (
  password: { password: string },
  userId: { userId: string }
) => {
  try {
    const response = await Api.post(userRoutes.userResetPassword, {
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
    const response = await Api.post(userRoutes.resendOtp);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const getService = async (id: string) => {
  try {
    const response = await Api.get(`${userRoutes.getService}/${id}`);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const editProfile = async (
  Id: string,
  data: { name: string; email: string; phone: string }
) => {
  try {
    const response = await Api.post(userRoutes.updateProfile, {
      Id: Id,
      data: data,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const getProfile = async (Id: string) => {
  try {
    const response = await Api.post(userRoutes.getProfile, { Id: Id });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const addAddress = async (Id: string, address: address) => {
  try {
    const response = await Api.post(userRoutes.addAddress, {
      Id: Id,
      address: address,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const getAddresses = async (Id: string) => {
  try {
    const response = await Api.post(userRoutes.getAddress, { Id: Id });

    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const editAddress = async (
  Id: string,
  addressId: string,
  address: {
    name: string;
    houseName: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  }
) => {
  try {
    const response = await Api.post(userRoutes.editAddress, {
      Id: Id,
      addressId: addressId,
      address: address,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const deleteAddress = async (Id: string, addressId: string) => {
  try {
    const response = await Api.post(userRoutes.deleteAddress, {
      Id: Id,
      addressId: addressId,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const changePassword = async (Id: string, password: string) => {
  try {
    const response = await Api.post(userRoutes.changePassword, {
      Id: Id,
      password: password,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
