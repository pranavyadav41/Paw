import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Screens/User/loginPage';
import SignupPage from './Screens/User/signupPage';
import Otp from './Screens/User/otp'; 
import './index.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
      <Route path="/Otp" element={<Otp/>}/>
    </Routes>
  </Router>
);

export default App
