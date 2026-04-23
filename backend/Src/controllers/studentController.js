import AcademicYear from "../models/academicYear.js";
import Student from "../models/student.js";
import StudentClass from "../models/studentClass.js";
import User from "../models/user.js";

// CREATE STUDENT PROFILE
export const createStudentProfile = async (req, res) => {
  try {
    const {
      userId,
      classId,
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

     // user_id se check
    const user = await User.findOne({ user_id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "student") {
      return res.status(400).json({ message: "User is not a student" });
    }

    // check duplicate profile
    const existingStudent = await Student.findOne({ user_id: userId });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

     // 3. Create student profile
    const student = await Student.create({
     user_id: userId,
      dob,
      gender,
      fatherName,
      motherName,
      address,
      district,
      pin,
      aadhar,
    });

      // 4. Get active session automatically
    const session = await AcademicYear.findOne({ isActive: true });
    if (!session) {
      return res.status(400).json({ message: "No active session found" });
    }

   // 5. Generate Roll Number (class + session based)
    const count = await StudentClass.countDocuments({
      classId,
      sessionId: session._id,
    });

        const rollNumber = count + 1;

   // 6. Create Student_Class entry
    const studentClass = await StudentClass.create({
      studentId: student._id,
      classId,
      sessionId: session._id,
      rollNumber,
      status: "active",
    });

    res.status(201).json({
      success: true,
      message: "Student profile created",
      data: {
        student,
        studentClass,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL STUDENTS
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    const result = await Promise.all(
      students.map(async (student) => {
        const user = await User.findOne(
          { user_id: student.user_id },
          "name mobile role user_id" 
        );

        return {
          student,
          user 
        };
      })
    );

   return res.status(201).json({
      success: true,
      msg: "Get All Student SuccessFully!",
      data: result,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE STUDENT
export const getStudentById = async (req, res) => {
  try {
    console.log(req.params.id);

    const userId = req.params.id;
     const student = await Student.findOne({user_id:userId});

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // User find
    const user = await User.findOne(
      { user_id: userId },
      "name mobile role user_id"
    );

    //  Combine result
    const result = {
      student,
      user
    };

   return res.status(201).json({
      success: true,
      msg: "Get All Student SuccessFully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// studentUpadetById

// export const studentUpadetById = async (req, res)=>{
//   try{
//       const student = await Student.findOne({userId:req.params.id}).populate("userId");
     

//   }catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }











