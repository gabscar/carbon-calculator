import express from 'express';
import cors from 'cors';    
import carbonCalculatorRoutes from './routes/carbonCalculatorRoutes';
import { setupSwagger } from './swagger';

const app = express();
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  setupSwagger(app);
}
app.use('/api', carbonCalculatorRoutes);

export default app;