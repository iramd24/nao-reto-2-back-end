import express from 'express';
import {getCapacities} from '../controllers/capacities.js';

const router = express.Router();


router.get('/capacities', getCapacities);
//router.put('/updateCapacities', updateCapacities);
//router.post('/uploadCapacities', uploadCapacities);


export default router;