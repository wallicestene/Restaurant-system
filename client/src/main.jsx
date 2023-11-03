import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserDataContext } from "./hooks/Usercontext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserDataContext>
      <App />
    </UserDataContext>
  </React.StrictMode>
);
