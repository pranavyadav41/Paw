import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndPoints";
import errorHandle from "./error";

interface userFormData {
    name?:string,
    email?:string,
    mobile?:string,
    password?:string
}

export const signup = async (userData:userFormData) =>{
    try {
        const response=await Api.post(userRoutes.signup,userData);
        return response;
    5   } catch(error){
        const err:Error = error as Error;
        return errorHandle(err)
    }
}