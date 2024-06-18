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
export const bookService = async (
  latitude: number,
  longitude: number,
  serviceId: string,
  date: Date
) => {
  try {
    const response = await Api.post(userRoutes.bookService, {
      latitude: latitude,
      longitude: longitude,
      serviceId: serviceId,
      date: date,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const confirmBooking = async (
  franchiseId: string,
  bookingDate: Date | null,
  startTime: string,
  endTime: string,
  userId: string,
  address: any,
  serviceId: string,
  name: string,
  phone: string,
  size: string,
  total: string,
  isWallet:boolean
) => {
  try {
    const response = await Api.post(userRoutes.confirmBooking, {
      franchiseId,
      bookingDate,
      startTime,
      endTime,
      userId,
      address,
      serviceId,
      name,
      phone,
      size,
      totalAmount: total,
      isWallet:isWallet
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const getCoupons = async () => {
  try {
    const response = await Api.get(userRoutes.getCoupons);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const applyCoupon = async (total: string, couponCode: string) => {
  try {
    const response = await Api.post(userRoutes.applyCoupon, {
      total: total,
      couponCode: couponCode,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const getBookings = async (userId: string) => {
  try {
    const response = await Api.post(userRoutes.getBookings, { userId: userId });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const fetchBooking = async (id: string) => {
  try {
    const response = await Api.get(`${userRoutes.fetchBooking}/${id}`);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const getFranchise = async (Id: string) => {
  try {
    const response = await Api.post(userRoutes.getFranchise, { Id: Id });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const checkDate = async (bookingId: string, date: Date) => {
  try {
    const response = await Api.post(userRoutes.checkDate, {
      bookId: bookingId,
      date: date,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const confirmCancel = async (
  bookingId: string,
  userId: string,
  amount: string,
  isDate: boolean
) => {
  try {
    const response = await Api.post(userRoutes.confirmCancel, {
      bookId: bookingId,
      userId: userId,
      amount: amount,
      isDate: isDate,
    });

    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const getWallet = async (userId: string) => {
  try {
    const response = await Api.post(userRoutes.getWallet, {
      userId: userId,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const submitFeedback = async (formData: FormData) => {
  try {
    const response = await Api.post(userRoutes.submitFeedback, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const getFeedbacks = async (serviceId: string) => {
  try {
    const response = await Api.post(userRoutes.getFeedbacks, {
      serviceId: serviceId,
    });

    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const checkFeedback = async (userId: string, serviceId: string) => {
  try {
    const response = await Api.post(userRoutes.checkFeedback, {
      userId: userId,
      serviceId: serviceId,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
