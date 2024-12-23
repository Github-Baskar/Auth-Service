import express from 'express';
const router = express.Router();
import {
    authUser,
    registerUser,
    logoutUser,
} from '../controllers/userController.js';

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/signout', logoutUser);

export default router;