import Classes from '../models/classes.js'

export const CreateClass = async (req, res)=>{
    try{
        const {className} = req.body;
     const response = await Classes.create({className});
      return res.status(201).json({
      success: true,
      msg: "Class Create SuccessFully!",
      data: response,
    });
    }catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getallClasses = async (req, res)=>{
    try{

     const response = await Classes.find();
      return res.status(201).json({
      success: true,
      msg: "Class Create SuccessFully!",
      data: response,
    });
    }catch (err) {
    res.status(500).json({ message: err.message });
  }
}