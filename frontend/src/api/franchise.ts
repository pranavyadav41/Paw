import franchiseRoutes from "../services/endpoints/franchiseEndPoints";
import Api from "../services/axios";
import errorHandle from "./error";

interface userFormData {
    name?: string;
    email?: string;
    mobile?: string;
    password?: string;
    city?:string;
    district?:string;
    state?:string;
    pincode?:string

  }

export const franchiseRegister = async (franchiseData:userFormData) => {
  try {
    const response = await Api.post(franchiseRoutes.franchiseRequest,franchiseData)
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
