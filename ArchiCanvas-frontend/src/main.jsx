import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
         style: {
    background: "#4caf50",   // green background
    color: "#fff",           // white text
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
    border: "2px solid #fff",
  },
  autoClose: 3000,  // auto close after 3 seconds
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,

        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)
