import { requiredNumber } from "@/utils/validation";
import type { Control } from "react-hook-form";
import z from "zod";

export const carbonCalculatorInputSchema = z.object({
    transportation: z.array(
      z.object({
        type: z.enum(['car', 'truck']),
        distance: requiredNumber('Distance', 1, 'Distance cannot be less than 1'),
        isMantainance: z.boolean(),
      })
    ),
  
    energy: z.object({
      electricity: requiredNumber('Electricity'),
      natural_gas: requiredNumber('Natural gas'),
      fuel_oil: requiredNumber('Fuel oil'),
      propane: requiredNumber('Propane'),
    }),
  
    waste: z.object({
      recycle_paper: z.boolean(),
      recycle_plastic: z.boolean(),
      recycle_metal: z.boolean(),
      no_recycling: z.boolean(),
    }),
  
    persons: requiredNumber('Number of persons', 1, 'At least 1 person'),
  });

export type CarbonCalculatorFormInput = z.input<typeof carbonCalculatorInputSchema>;

export const carbonCalculatorSchemaValidation = carbonCalculatorInputSchema;


export type CarbonCalculatorFormProps = {
    control: Control<CarbonCalculatorFormInput>;
    loading?: boolean;
};