import {Navigate,Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux';

export default function AdminProtected(){
    const {franchiseInfo} =useSelector((state:any)=>state.franchiseAuth)
    return franchiseInfo ? <Outlet/>:<Navigate to='/franchise/login' replace />
}