import React from 'react'
import AttendanceShowAdmin from '../components/Attendance/AttendanceShowAdmin';
import AttendanceShowTeacher from '../components/Attendance/AttendanceShowTeacher';
import AttendanceShowStudent from '../components/Attendance/AttendanceShowStudent';

function Attendance() {
 const user =  JSON.parse(localStorage.getItem('data'));
  return (
    <>{user?.role === "admin" ? <AttendanceShowAdmin /> : user?.role === "teacher" ? <AttendanceShowTeacher user={user} /> : user?.role === "student" ?<AttendanceShowStudent user={user} />:""}</>
  )
}

export default Attendance