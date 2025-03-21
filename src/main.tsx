import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./components/form-builder/FormFields/fields/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/index.css";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
