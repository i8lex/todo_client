import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { StorageProvider } from "./providers/Storage";

// import { Provider } from "react-redux";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StorageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StorageProvider>
  </React.StrictMode>
);
