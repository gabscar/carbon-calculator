import { z } from 'zod';


export const wasteSchema = z.object({
  recycle_paper: z.boolean().default(false),
  recycle_plastic: z.boolean().default(false),
  recycle_metal: z.boolean().default(false),
  no_recycling: z.boolean().default(false)
}).strict();