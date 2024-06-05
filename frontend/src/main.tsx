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

const CLIENT_ID =
  "Af7QRapmxxFahYN1msXn64YmqQzAv5ONt3qGnOCLqT9DGLL7U3b38yC2HqsjIxUpRbZEleL2I1D5sCeO";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="337606298738-1700n518dumqome58ngcvmfarrsate57.apps.googleusercontent.com">
      <React.StrictMode>
        <PayPalScriptProvider options={{ clientId: CLIENT_ID }}>
          <App />
        </PayPalScriptProvider>
        <ToastContainer />
      </React.StrictMode>
    </GoogleOAuthProvider>
  </Provider>
);
