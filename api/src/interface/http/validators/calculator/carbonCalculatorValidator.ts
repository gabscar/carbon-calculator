import { z } from 'zod';
import { transportationSchema } from './transportation';
import { energySchema } from './energy';
import { wasteSchema } from './waste';

export const carbonCalculatorSchema = z.object({
  transportation: transportationSchema,
  energy: energySchema,
  waste: wasteSchema,
  persons: z.number().min(1)
});

