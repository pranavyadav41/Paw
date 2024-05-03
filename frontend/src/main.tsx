import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'





ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <React.StrictMode>
    <App/>
    <ToastContainer />
  </React.StrictMode>,
  </Provider>
)
