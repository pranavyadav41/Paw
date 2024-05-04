import {Routes,Route} from 'react-router-dom'
import LoginPage from '../Screens/User/loginPage'
import SignupPage from '../Screens/User/signupPage'
import Otp from '../Screens/User/otp'
import Home from '../Components/Header'

function UserRoutes() {
  return (
   <Routes>
    <Route path='login' element={<LoginPage/>} />
    <Route path='register' element={<SignupPage/>} />
    <Route path='Otp' element={<Otp/>} />
    <Route path="home" element=<Home/> />
   </Routes>
  )
}

export default UserRoutes
