import { z } from 'zod';
import { DietType } from '../../../../domain/entities/diet';



export const dietSchema = z.object({
    type: z.nativeEnum(DietType),
  });