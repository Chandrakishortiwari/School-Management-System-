import express from 'express';
import { CreateTeacher, getAllTeacher, getTeacherById } from '../controllers/teacherController.js';

const router = express.Router();

router.post("/createteacher",CreateTeacher);
router.get("/getallteacher",getAllTeacher);
router.get("/getteacherbyid/:id",getTeacherById);


export default router;