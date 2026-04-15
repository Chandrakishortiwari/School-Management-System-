import express from "express";
import {
  createStudentProfile,
  getAllStudents,
  getStudentById,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/", createStudentProfile);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);

export default router;