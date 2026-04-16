import React from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Login />
     <ToastContainer position="top-right" autoClose={2000} />
    </div>
  )
}

export default App