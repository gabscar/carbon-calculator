import { z } from 'zod';



export const wasteSchema = z.object({
  recycle_paper: z.boolean().default(false),
  recycle_plastic: z.boolean().default(false),
  recycle_metal: z.boolean().default(false),
  no_recycling: z.boolean().default(false),
}).refine((data) => {
  const doesRecycle = data.recycle_paper || data.recycle_plastic || data.recycle_metal;
  const noRecycling = data.no_recycling;

  return !(doesRecycle && noRecycling);
}, {
  message: "You cannot select recycling options and also indicate that you do not recycle anything.",
  path: ['no_recycling'],
});