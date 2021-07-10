
import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import store from "./pages/reducer/store";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

ReactDOM.render(
 <Provider store={store}>
    <App />
    </Provider>
  ,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
