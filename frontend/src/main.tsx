import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'





ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="337606298738-1700n518dumqome58ngcvmfarrsate57.apps.googleusercontent.com">
        <React.StrictMode>
            <App/>
            <ToastContainer />
        </React.StrictMode>
    </GoogleOAuthProvider>
 
  </Provider>
)
