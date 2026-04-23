import Classes from "../models/classes.js";
import User from "../models/user.js";
import Teacher from "../models/teacher.js";
import AcademicYear from "../models/academicYear.js";
import StudentClass from "../models/studentClass.js";
export const CreateClass = async (req, res) => {
  try {
    const { className, fee, classTeacherId } = req.body;
    const response = await Classes.create({ className, fee, classTeacherId });
    return res.status(201).json({
      success: true,
      msg: "Class Create SuccessFully!",
      data: response,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getallClasses = async (req, res) => {
  try {
    // 1. Active session
    const session = await AcademicYear.findOne({ isActive: true });

    if (!session) {
      return res.status(400).json({ message: "No active session found" });
    }

    // 2. Get classes
    const classes = await Classes.find();
    

    const data = await Promise.all(
      classes.map(async (cls) => {
        // 3. Find teacher manually (since classTeacherId is STRING)
        const teacher = await Teacher.findOne({
          user_id: cls.classTeacherId,
        });

        const user = await User.findOne({  user_id: teacher?.user_id });

        // 4. Student count
        const count = await StudentClass.countDocuments({
          classId: cls._id,
          sessionId: session._id,
        });

        return {
          ...cls.toObject(),
          user: user?.name || "Not Assigned",
          count
        };
      }),
    );

    return res.status(200).json({
      success: true,
      msg: "Classes fetched successfully!",
      data,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
