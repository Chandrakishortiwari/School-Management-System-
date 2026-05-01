import React from 'react'
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layouts/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Students from './pages/Students';
import NewStudentAddmission from './pages/NewStudentAddmission';
import Classes from './pages/Classes';
import Teachers from './pages/Teachers';
import Attendance from './pages/Attendance';
import MarkAttendance from './pages/MarkAttendance';

function AppRoutes(){
  const token = localStorage.getItem('authToken');
  console.log(token?"yes":"no");
  
  return(
    <Routes>
      
       <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} replace />} />
         <Route element={<ProtectedRoute  ><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
           <Route path="/studentaddmission" element={<NewStudentAddmission />} />
            <Route path="/classes" element={<Classes />} />
              <Route path="/teachers" element={<Teachers />} />
         <Route path="/attendance" element={<Attendance />} />  
          <Route path="/markattendance" element={<MarkAttendance />} /> 
         </Route>
         
    </Routes>
  )
}

function App() {
  return (
    <div>
    <AuthProvider>
      <AppRoutes />
      </AuthProvider>
    </div>
  )
}

export default App