import express from "express";
import { CreateHostalPlans, DeletePlan, EditPlan, ViewAllPlan } from "../controllers/hostalplansController.js";

const router = express.Router();

router.post('/createhostalplan', CreateHostalPlans);
router.get('/viewhostalplans', ViewAllPlan);
router.patch('/updateplan/:id', EditPlan);
router.delete('/deleteplan/:id', DeletePlan);

export default router;
