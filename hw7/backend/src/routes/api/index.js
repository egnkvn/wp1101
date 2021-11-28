import { Router } from "express";
import SCrouter from './scoreboard.js';

const router = Router();

router.use('/', SCrouter);

export default router;