import express from 'express';
import { getAllUserGifts, getTotalUserGifts, getFilteredUserGifts } from '../controllers/userGiftController.js';

const router = express.Router();

router.get('/getAllUserGifts', getAllUserGifts);

router.get('/getTotalUserGifts', getTotalUserGifts);

router.get('/filter', getFilteredUserGifts);

export default router;