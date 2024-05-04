import {Navigate,Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux';

export default function AdminProtected(){
    const {adminInfo} =useSelector((state:any)=>state.adminAuth)
    return adminInfo ? <Outlet/>:<Navigate to='/login' />
}