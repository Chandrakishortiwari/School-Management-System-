import Student from "../models/student.js";
import User from "../models/user.js";

// CREATE STUDENT PROFILE
export const createStudentProfile = async (req, res) => {
  try {
    const {
      userId,
      dob,
      gender,
      fatherName,
      motherName,
      address,
      district,
      pin,
      aadhar,
      photo,
    } = req.body;

    // check user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // optional: role check
    if (user.role !== "student") {
      return res.status(400).json({ message: "User is not a student" });
    }

    const student = await Student.create({
      userId,
      dob,
      gender,
      fatherName,
      motherName,
      address,
      district,
      pin,
      aadhar,
      photo,
    });

    res.status(201).json({
      message: "Student profile created",
      student,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL STUDENTS
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("userId");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE STUDENT
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("userId");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};