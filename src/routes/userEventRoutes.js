import express from 'express';
import { getAllUserEvents } from '../controllers/usersEventController.js';

const router = express.Router();

router.get('/getAllUserEvents', getAllUserEvents);

export default router;