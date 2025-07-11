
import { z } from 'zod';

export const energySchema = z.object({
    electricity: z.number().optional().default(0),
    natural_gas: z.number().optional().default(0),
    fuel_oil: z.number().optional().default(0),
    propane: z.number().optional().default(0),
  });