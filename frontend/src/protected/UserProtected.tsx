import { Navigate } from "react-router-dom";

export default function UserProteced(props:any) {
    if(localStorage.getItem('userInfo')){
        return props.children
    }else{
        <Navigate to='/home'/>
    }
}