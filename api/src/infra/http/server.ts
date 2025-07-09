import express from 'express';
import cors from 'cors';    
import carbonCalculatorRoutes from './routes/carbonCalculatorRoutes';


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', carbonCalculatorRoutes);


export default app;