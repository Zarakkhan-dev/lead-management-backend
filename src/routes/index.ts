import express from 'express';
import authRoutes from './auth_routes';
import leadRoutes from './lead_routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/leads', leadRoutes);

export default router;
