import React from "react";
import ReactDOM from "react-dom/client"; // ✅ important
import App from "./App";
import "./index.css"; // optional if you have global styles

const root = document.getElementById("root");
if (!root) throw new Error("Failed to find root element");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
