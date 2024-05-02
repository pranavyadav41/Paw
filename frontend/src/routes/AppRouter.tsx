import {Route,Routes} from 'react-router-dom'
import UserRoutes from './UserRoutes'
import AdminRoutes from './AdminRoutes'

const AppRouter=()=>{
    return (
        <Routes>

            <Route  path='/*' element={<UserRoutes/>} />
            <Route  path='/admin/*' element={<AdminRoutes/>} />

        </Routes>
    )
}

export default AppRouter;