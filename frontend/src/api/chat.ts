import Api from "../services/axios";
import chatRoutes from "../services/endpoints/ChatRoutes";
import errorHandle from "./error";


export const sendMessage = async (
  formData: FormData
) => {
  try {
    const response = await Api.post(chatRoutes.save, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const getMessages = async (sender: string, receiver: string) => {
  try {
    const response = await Api.get(
      `${chatRoutes.getMessages}/${sender}/${receiver}`
    );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const getAllUsers = async (franchiseId: string) => {
  try {
    const response = await Api.post(chatRoutes.getUsers, {
      franchiseId: franchiseId,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
