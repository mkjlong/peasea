import { Router } from 'express';
import setupsRoute from './setup.route';

const router = Router();

router.use('/setups', setupsRoute);

export default router;
