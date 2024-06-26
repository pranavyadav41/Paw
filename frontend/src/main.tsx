import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const CLIENT_ID =import.meta.env.VITE_PAYPAL_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_G_CLIENT_ID}>
      <React.StrictMode>
        <PayPalScriptProvider options={{ clientId: CLIENT_ID }}>
          <App />
        </PayPalScriptProvider>
        <ToastContainer />
      </React.StrictMode>
    </GoogleOAuthProvider>
  </Provider>
);
