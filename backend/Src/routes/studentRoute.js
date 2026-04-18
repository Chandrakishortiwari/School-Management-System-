import express from "express";
import {
  createStudentProfile,
  getAllStudents,
  getStudentById,
  // studentUpadetById,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/createstudent", createStudentProfile);
router.get("/getstudent", getAllStudents);
router.get("/getstudent/:id", getStudentById);
// router.put("/updatestudent/:id", studentUpadetById);

export default router;