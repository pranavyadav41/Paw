import {Navigate,Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux';
import { RootState } from '../redux/store';

export default function AdminProtected(){
    const {franchiseInfo} =useSelector((state:RootState)=>state.franchiseAuth)
    return franchiseInfo ? <Outlet/>:<Navigate to='/franchise/login' replace />
}