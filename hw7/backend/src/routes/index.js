import { Router } from "express";
import APIrouter from './api/index.js';

const router = Router();

router.use('/api', APIrouter);

export default router;