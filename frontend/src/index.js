import React from "react";
import { HelmetProvider } from "react-helmet-async";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./store/store";
import { Provider } from "react-redux";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 1000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
        </Provider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
