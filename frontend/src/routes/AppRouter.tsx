import {Route,Routes} from 'react-router-dom'
import UserRoutes from './UserRoutes'
import AdminRoutes from './AdminRoutes'
import FranchiseRoutes from './franchiseRoutes'

const AppRouter=()=>{
    return (
        <Routes>

            <Route  path='/*' element={<UserRoutes/>} />
            <Route  path='/admin/*' element={<AdminRoutes/>} />
            <Route path='/franchise/*' element={<FranchiseRoutes/>} />

        </Routes>
    )
}

export default AppRouter;