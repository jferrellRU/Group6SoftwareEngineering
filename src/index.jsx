import React from "react";
import ReactDOM from "react-dom/client"; // Note the new import
import App from "./App";
import { AuthProvider } from "./AuthContext";

// Use createRoot instead of render
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);