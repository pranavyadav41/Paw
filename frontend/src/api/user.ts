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

export const otpVerify = async (otp:{otp:number}) =>{
    try {
        const response=await Api.post(userRoutes.userOtpVerify,otp)
        return response
        
    } catch (error) {
        const err:Error = error as Error;
        return errorHandle(err)
    }
}