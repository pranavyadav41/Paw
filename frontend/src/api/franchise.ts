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
