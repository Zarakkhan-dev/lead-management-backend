import express from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getLeadStats
} from '../controllers/lead_controller';
import { protect } from '../middlewares/auth_middleware';

const router = express.Router();

router.use(protect);

router.post('/', createLead);
router.get('/', getLeads);
router.get('/stats', getLeadStats);
router.get('/:id', getLeadById);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

export default router;
