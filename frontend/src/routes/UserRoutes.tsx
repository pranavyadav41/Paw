import {Routes,Route} from 'react-router-dom'
import LoginPage from '../Screens/User/loginPage'
import SignupPage from '../Screens/User/signupPage'

function UserRoutes() {
  return (
   <Routes>
    <Route path='login' element={<LoginPage/>} />
    <Route path='register' element={<SignupPage/>} />
   </Routes>
  )
}

export default UserRoutes
