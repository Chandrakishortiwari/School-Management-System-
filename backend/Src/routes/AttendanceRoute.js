import express from 'express';
import { AttendaceSheet, getAttenddancebyclass, getMyAttendance, markAttendance } from '../controllers/attendanceController.js';

const router = express.Router();

router.post("/attendancesheet",AttendaceSheet);
router.post("/markattendance",markAttendance);
router.get("/getattendancebystudent/:id",getMyAttendance);
router.get("/getattendancebyclass/:id", getAttenddancebyclass)

export default router;
