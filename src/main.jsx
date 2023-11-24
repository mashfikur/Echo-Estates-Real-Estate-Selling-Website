import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes/router.jsx";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import theme from "./shared/Themes.jsx";
import { ThemeProvider } from "@mui/material";
import AuthProvider from "./authentication/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <HelmetProvider>
          <RouterProvider router={router} />
          <Toaster></Toaster>
        </HelmetProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
