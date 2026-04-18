import express from "express";
import { CreateClass, getallClasses } from "../controllers/classController.js";


 const router = express.Router();

 router.post("/createclass",CreateClass)
 router.get("/getallclasses",getallClasses)


 export default router;
