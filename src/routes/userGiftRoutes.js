import express from 'express';
import { getAllUserGifts, getTotalUserGifts } from '../controllers/userGiftController.js';

const router = express.Router();

router.get('/getAllUserGifts', getAllUserGifts);

router.get('/getTotalUserGifts', getTotalUserGifts);

export default router;