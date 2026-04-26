import express from 'express';
import { GetAllLeaves, GetAllLeavesById, LeaveApply, LeaveApprove } from '../controllers/levesController.js';

const router = express.Router();

router.post("/apply",LeaveApply);
router.get("/getleaves",GetAllLeaves);
router.get("/getleavesbyid/:id",GetAllLeavesById);
router.patch("/approveleavs/:id",LeaveApprove);

export default router;
