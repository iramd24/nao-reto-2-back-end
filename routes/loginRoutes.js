import express from 'express';
import {userLogin, userRegister} from '../controllers/users.js';

const router = express.Router();

router.post('/userLogin', userLogin);
router.post('/userRegister', userRegister);

export default router;

