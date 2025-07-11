import { Router } from 'express';
import { CarbonCalculatorController } from '../../controllers/api/carbonCalculatorController';

const router = Router();
const controller = new CarbonCalculatorController();

router.post('/calculate-carbon', (req, res) => controller.exec(req, res));

export default router; 