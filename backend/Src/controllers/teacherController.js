import User from "../models/user.js";
import Teacher from "../models/teacher.js";
import { response } from "express";
import teacher from "../models/teacher.js";

export const CreateTeacher = async (req, res) => {
  try {
    const {
      userId,
      dob,
      gender,
      emali,
      aadhar,
      address,
      alternate_num,
      subject,
      qualification,
      joiningDate,
    } = req.body;

    console.log(userId);
    const isUser = await User.findOne({ user_id: userId });
    console.log(isUser);

    if (!isUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (isUser.role !== "teacher") {
      return res.status(400).json({ message: "User not found" });
    }

    const exists = await Teacher.findOne({ user_id: userId });
    if (!isUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const response = await Teacher.create({
      user_id: userId,
      dob,
      gender,
      emali,
      aadhar,
      address,
      alternate_num,
      subject,
      qualification,
      joiningDate,
    });

    if (!response) {
      return res.status(400).json({ message: "Data not Saved" });
    }

    return res.status(201).json({
      success: true,
      message: "Teacher Profile created successfully",
      data: response,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllTeacher = async (req, res) => {
  try {
    const teachers = await teacher.find();

    console.log(teachers);
    const result = await Promise.all(
      teachers.map(async (teacher) => {
        const user = await User.findOne(
          { user_id: teacher.user_id },
          "name mobile role user_id",
        );

        return {
          teacher,
          user,
        };
      }),
    );

    return res.status(201).json({
      success: true,
      message: "Teacher Profile created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const userId = req.params.id;
    const teacher = await Teacher.findOne({ user_id: userId });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const user = await User.find(
      { user_id: userId },
      "name mobile role user_id",
    );

    const response = { teacher, user };

    return res.status(201).json({
      success: true,
      message: "Get Teacher Profile successfully",
      data: response,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
