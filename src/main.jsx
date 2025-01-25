import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import Context_Provider from "./Context/context.jsx";
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <Context_Provider>
    <App />
    <ToastContainer/>
    </Context_Provider>
  </BrowserRouter>
</React.StrictMode>
)
