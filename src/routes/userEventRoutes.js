import express from 'express';
import { getAllUserEvents, getTotalUserEvents, updateUserEventById } from '../controllers/usersEventController.js';

const router = express.Router();

router.get('/getAllUserEvents', getAllUserEvents);

router.get('/totalUserEvents', getTotalUserEvents);

router.put('/updateUserEventById/:id', updateUserEventById);

export default router;