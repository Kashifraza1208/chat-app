import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { SocketContextProvider } from "./components/context/socketContext";
import { AuthContextProvider } from "./components/context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </AuthContextProvider>
);
