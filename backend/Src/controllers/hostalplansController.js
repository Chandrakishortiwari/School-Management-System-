import Hostalplans from "../models/hostalplans.js";

export const CreateHostalPlans = async(req, res)=>{
    try{
      const {name, amount} = req.body;

      if(!name || !amount){
        return res.status(400).json({message:"Name and Amount is Required"});
      };

    const response = await Hostalplans.create({name,amount});
    
    if(!response){
       return res.status(400).json({message:"Record nat save!"});
    }

    return res.status(201).json({
       success: true,
       message: "Hostal Plans created successfully",
       data:response
    })

    }catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export const ViewAllPlan = async(req, res)=>{
    try{ 
     const response = await Hostalplans.find();
           res.status(201).json({
             success:true,
             message:"All Plans Views",
             data:response
           }) 
    }catch (err) {
    return res.status(500).json({ message: err.message });
   }
}

export const EditPlan = async(req, res)=>{
  try{
    const planid = req.params.id;
    const {name, amount} = req.body;
    const editPlan = await Hostalplans.findById(planid);

    if(!editPlan){
      return res.status(404).json({message:"Record Not Found"})
    }
     
  const response = await Hostalplans.findByIdAndUpdate(planid, {name, amount},{new:true});
 
  if(!response){
     return res.status(404).json({message:"Plan Not Update"})
  }

  return res.status(200).json({
    success: true,
    message: "Plan Updated successfully",
    data:response
  })

  }catch (err) {
    return res.status(500).json({ message: err.message });
   }
}

export const DeletePlan = async(req, res)=>{
  try{
     const planid = req.params.id;
     const response = await Hostalplans.findByIdAndDelete(planid);
     if(!planid){
       return res.status(400).json({message:"Record nat save!"});
     }
           res.status(201).json({
             success:true,
             message:"Plan Deleted SuccessFully",
           })
  }catch (err) {
    return res.status(500).json({ message: err.message });
   }
}