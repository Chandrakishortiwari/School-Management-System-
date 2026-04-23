import AcademicYear from "../models/academicYear.js";


export const SessionCreate = async (req, res) => {
  try {
    const { name, startDate, endDate, isActive } = req.body;

    if (!name || !startDate || !endDate) {
      return res.status(400).json({
        message: "Name, startDate and endDate are required",
      });
    }
    // 2. Date validation
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({
        message: "startDate must be less than endDate",
      });
    }


    // 3 If isActive = true → make all others inactive
    if (isActive) {
      await AcademicYear.updateMany(
        { isActive: true },
        { $set: { isActive: false } }
      );
    }
// console.log("kfk");
    // 4. Create session
    const session = await AcademicYear.create({
      name,
      startDate,
      endDate,
      isActive: isActive || false,
    });

    return res.status(201).json({
      message: "Session created successfully",
      data: session,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



