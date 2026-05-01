import React from 'react'
import AdminDashboard from '../components/Dashbord/AdminDashboard';
import TeacherDashbord from '../components/Dashbord/TeacherDashbord';
import StudentDashbord from '../components/Dashbord/StudentDashbord';

const Dashboard =()=> {
 
 const user =  JSON.parse(localStorage.getItem('data'));
  
  return (
    <>
     {user?.role === "admin" ? <AdminDashboard /> : user?.role === "teacher" ? <TeacherDashbord user={user} /> : user?.role === "student" ?<StudentDashbord user={user} />:""}
    </>
  )
}

export default Dashboard
