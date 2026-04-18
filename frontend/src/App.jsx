import React from 'react'
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
import MainLayouts from './components/Layouts/MainLayouts';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
    
     <Routes>
        <Route element={<MainLayouts />}>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/users" element={<Users />} /> */}
        </Route>
      </Routes>
    </div>
  )
}

export default App