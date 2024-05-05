import Api from "../services/axios";
import adminRoutes from "../services/endpoints/adminEndPoints";
import errorHandle from "./error";

export const getUsers = async () => {
  try {
    const response = await Api.get(adminRoutes.getUserDetails);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const blockUser = async (userId:{userId: string}) => {
  try {
    const response = await Api.post(adminRoutes.blockUser,userId);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const unBlockUser = async (userId:{userId: string}) => {
  try {
    const response = await Api.post(adminRoutes.unBlockUser,userId);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
