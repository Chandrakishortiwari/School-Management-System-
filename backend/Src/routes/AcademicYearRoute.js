import express from 'express';
import { SessionCreate } from '../controllers/sessonController.js';

const router = express.Router();

router.post("/createsession", SessionCreate)

export default router;
