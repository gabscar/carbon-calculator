import { z } from 'zod';
import { TransportType } from '../../../../domain/entities/transportation';


export const transportationItemSchema = z.object({
  type: z.nativeEnum(TransportType),
  distance: z.number().positive(),
  isMantainance: z.boolean().optional() 
});

export const transportationSchema = z.array(transportationItemSchema); 