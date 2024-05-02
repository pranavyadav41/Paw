import {Routes,Route} from 'react-router-dom'
import LoginPage from '../Screens/User/loginPage'
import SignupPage from '../Screens/User/signupPage'
import Otp from '../Screens/User/otp'

function UserRoutes() {
  return (
   <Routes>
    <Route path='login' element={<LoginPage/>} />
    <Route path='register' element={<SignupPage/>} />
    <Route path='Otp' element={<Otp/>} />
   </Routes>
  )
}

export default UserRoutes
