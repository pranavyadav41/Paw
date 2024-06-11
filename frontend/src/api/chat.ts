import Api from "../services/axios";
import chatRoutes from "../routes/ChatRoutes";
import errorHandle from "./error";

interface Message {
    sender: string;
    receiver: string;
    message: string;
    timestamp: Date;
  }

export const sendMessage = async (
  sender: string,
  receiver: string,
  message: string
) => {
  try {
    const response = await Api.post(chatRoutes.save, {
      sender: sender,
      receiver: receiver,
      message: message,
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
