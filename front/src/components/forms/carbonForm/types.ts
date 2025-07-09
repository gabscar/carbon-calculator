import type { Control } from "react-hook-form";
import z from "zod";

export const carbonCalculatorInputSchema = z.object({
    transportation: z
        .array(
            z.object({
                type: z.enum(['car', 'truck']),
                distance: z
                    .union([z.number(), z.string()])
                    .pipe(z.number().min(1, 'Distance cannot be less than 1')),
                isMantainance: z.boolean(),
            })
        ),
    energy: z.object({
        electricity: z
            .union([z.number(), z.string()])
            .pipe(z.number().min(0, 'Electricity cannot be negative')),
        natural_gas: z
            .union([z.number(), z.string()])
            .pipe(z.number().min(0, 'Natural gas cannot be negative')),
        fuel_oil: z
            .union([z.number(), z.string()])
            .pipe(z.number().min(0, 'Fuel oil cannot be negative')),
        propane: z
            .union([z.number(), z.string()])
            .pipe(z.number().min(0, 'Propane cannot be negative')),
    }),
    waste: z.object({
        recycle_paper: z.boolean(),
        recycle_plastic: z.boolean(),
        recycle_metal: z.boolean(),
        no_recycling: z.boolean(),
    }),
    persons: z
        .union([z.number(), z.string()])
        .pipe(z.number().min(1, 'At least 1 person')),
});

export type CarbonCalculatorFormInput = z.input<typeof carbonCalculatorInputSchema>;

export const carbonCalculatorSchemaValidation = carbonCalculatorInputSchema;


export type CarbonCalculatorFormProps = {
    control: Control<CarbonCalculatorFormInput>;
    loading?: boolean;
};