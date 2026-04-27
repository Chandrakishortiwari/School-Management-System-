import Classes from "../models/classes.js";
import StudentClass from "../models/studentClass.js";
import Student from "../models/student.js";
import User from "../models/user.js";
import Attendance from "../models/attendance.js";

export const AttendaceSheet = async(req, res)=>{
   try{
    const {classId} = req.body;

    if(!classId){
        return res.status(400).json({message:"ClassId Is required!"})
    }

    const Class = await Classes.findById(classId);

    const AllActiveStudent = await StudentClass.find({classId});
    
    const data = await Promise.all(
      AllActiveStudent.map(async (st)=>{
      const student = await Student.findById(st.studentId);

      const user = await User.findOne({  user_id: student?.user_id });
      
       return{
         ...st.toObject(),
        gender:student?.gender,
        fatherName:student?.fatherName,
        name: user?.name
       }

      })
    )

 
    
   res.status(200).json({
    success:true,
    message:"All Student Attence Prepered",
    data:{Class,data}
   });
   
   } catch (err) {
    res.status(500).json({ message: err.message });
  } 
};


export const markAttendance = async(req, res)=>{
  try{
    const {studentClassId,status,markedBy} = req.body;
    
     const today = new Date();
    today.setHours(0, 0, 0, 0);

     const existing = await Attendance.findOne({
      studentClassId,
      date: today,
    });

     if (existing) {
      return res.status(400).json({ message: "Already marked today" });
    }

    const attendance = await Attendance.create({
      studentClassId,
      date: today,
      status,
      markedBy: markedBy, //  JWT se teacher id
    });

    res.json({
      message: "Attendance marked",
      attendance,
    });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
};

export const getMyAttendance = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    
console.log("jjj");
    // student ka current class find karo
    const studentClass = await StudentClass.findOne({
      studentId: userId,
      status: "active",
    });


    if (!studentClass) {
      return res.status(404).json({ message: "No class found" });
    }

    // attendance fetch
    const data = await Attendance.find({
      studentClassId: studentClass._id,
    }).sort({ date: -1 });

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAttenddancebyclass = async(req, res)=>{
 try{
    const classId = req.params.id;
    // console.log(classId);
    
    const Class = await  StudentClass.find({classId});
    // console.log("jjjj",Class[0].studentId);

    const AllStudentAttendance = await Promise.all(
      Class.map(async(cl)=>{
        const student = await Attendance.find({studentClassId:cl._id})
        const StudentData = await Student.findById(cl.studentId);
       
        const user = await User.findOne({  user_id: StudentData?.user_id });

        console.log(StudentData);
        
        console.log("student",student);
        
        return{
          ...cl.toObject(),
          student,
          gender:StudentData?.gender,
          fatherName:StudentData?.fatherName,
          name: user?.name

        }
      })
    )
    
   return res.status(201).json({
    message:"claass",
    data:AllStudentAttendance
   })

 }catch (err) {
    res.status(500).json({ message: err.message });
  }
}