import Leves from "../models/leves.js";


export const LeaveApply = async(req, res) =>{
    try{
    const {userId, fromDate, toDate,  reason} = req.body;
    
   const response = await Leves.create({userId,fromDate,toDate,reason});

   res.status(200).json({
    success:true,
    message:"Leave Apply SuccessFully",
    data:response
   })

   }catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export const GetAllLeaves = async(req, res) =>{
    try{
      const response = await Leves.find();
      res.status(201).json({
        success:true,
        message:"All leaves fetched",
        data:response
      }) 
    }catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const GetAllLeavesById = async(req, res) =>{
    try{
      const id = req.params.id;
      const response = await Leves.find({userId:id});
      res.status(201).json({
        success:true,
        message:"All leves Fatched",
        data:response
      }) 
    }catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const LeaveApprove = async(req, res)=>{
    try{
         const leaveId = req.params.id;
         const {status,approvedBy} = req.body;
        const ExistLeave = await Leves.findById(leaveId);

        if(!ExistLeave){
           return  res.status(404).json({message:"Leave Id Not found!"})
        }

        const response = await Leves.findByIdAndUpdate(leaveId,{status,approvedBy},{ new: true });
    
        if(!response){
           return  res.status(404).json({message:"Leave Not Approved!"})
        }

        res.status(201).json({
            success:true,
            message:"Leave Approved",
            data:response
        })


    }catch (err) {
    return res.status(500).json({ message: err.message });
  }
}