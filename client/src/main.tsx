import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import QueryProvider from "./providers/QueryProvider";
import {Toaster} from "react-hot-toast";

import "./index.css";
import App from "./App";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <Toaster
  position="top-center"
  toastOptions={{
    duration: 2500,
    style: {
      background: "#121826",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "14px",
      padding: "14px 18px",
    },
    success: {
      iconTheme: {
        primary: "#7C3AED",
        secondary: "#fff",
      },
    },
    error: {
      iconTheme: {
        primary: "#EF4444",
        secondary: "#fff",
      },
    },
  }}
/>
        <App />
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);