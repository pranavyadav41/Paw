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
  "AQfGdzRqN2AI8KMjftw1H6GyxshTx0QxieZ3oELTUfN0qH-1F5zCofB6GHtu0G6rxhGT8Kgg6MYyF8IW";

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
