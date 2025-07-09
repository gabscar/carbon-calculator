import { useFieldArray, useWatch, type Control } from 'react-hook-form';
import AccordionSteps from '@/components/accordion/AccordionSteps';
import TextInput from '@/components/inputs/TextInput';
import SelectInput from '@/components/inputs/SelectInput';
import CheckboxInput from '@/components/inputs/CheckboxInput';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { z } from 'zod';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from '@/components/button/Button';
import PeopleIcon from '@mui/icons-material/People';


const vehicleOptions = [
    { label: 'Car', value: 'car' },
];

const carbonCalculatorInputSchema = z.object({
    vehicles: z
        .array(
            z.object({
                type: z.enum(['car', 'truck']),
                distance: z
                    .union([z.number(), z.string()])
                    .pipe(z.number().min(0, 'Distance cannot be negative')),
                isMaintained: z.boolean(),
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
    people: z
        .union([z.number(), z.string()])
        .pipe(z.number().min(1, 'At least 1 person')),
});

export type CarbonCalculatorFormInput = z.input<typeof carbonCalculatorInputSchema>;

export const carbonCalculatorSchemaValidation = carbonCalculatorInputSchema;


type CarbonCalculatorFormProps = {
    control: Control<CarbonCalculatorFormInput>;
};

                            {/* Primeira linha: Type, Distance e Remove */}
const CarbonCalculatorForm = ({ control }: CarbonCalculatorFormProps) => {

    const { fields, append, remove } = useFieldArray({ control, name: 'vehicles' });

    const steps = [
        {
            title: 'Vehicles',
            content: (
                <>
                    {fields.map((field, index) => (
                        <Box key={field.id} mb={2}>
                            <Grid container spacing={{ xs: 1, md: 2 }}
                                mb={1}
                                className="mb-sm-5 mb-md-2 mb-0"
                                sx={{ alignItems: "center" }}
                            >
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <SelectInput
                                        name={`vehicles.${index}.type`}
                                        label="Vehicle Type"
                                        control={control}
                                        options={vehicleOptions}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextInput
                                        name={`vehicles.${index}.distance`}
                                        label="Distance per month (miles)"
                                        control={control}
                                        type="number"
                                    />
                                </Grid>
                                <Grid
                                    size={{ xs: 12, md: 4 }}
                                    sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                                    className="d-flex align-items-center justify-content-center h-100 mt-0"
                                >
                                    <CustomButton
                                        variant="outlined"
                                        color="error"
                                        className="mb-md-4 "
                                        startIcon={<DeleteIcon />}
                                        onClick={() => remove(index)}
                                    >
                                        Remove
                                    </CustomButton>
                                </Grid>
                            </Grid>
                            
                            {/* Segunda linha: Checkbox de manutenção */}
                            <Grid container spacing={{ xs: 1, md: 2 }}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <CheckboxInput
                                        name={`vehicles.${index}.isMaintained`}
                                        label="Preventive Maintenance"
                                        control={control}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                    <CustomButton variant="contained" onClick={() => append({ type: 'car', distance: 0, isMaintained: false })}>
                        Add Vehicle
                    </CustomButton>
                </>
            ),
        },
        {
            title: 'Energy',
            content: (
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextInput name="energy.electricity" label="Eletricity (kWh)" control={control} type="number" />
                    <TextInput name="energy.fuel_oil" label="Fuel oil (galão)" control={control} type="number" />
                    <TextInput name="energy.propane" label="Propane (galão)" control={control} type="number" />
                </Box>
            ),
        },
        {
            title: 'Trash/Recycling',
            content: (() => {
                const recyclePaper = useWatch({ control, name: 'waste.recycle_paper' });
                const recyclePlastic = useWatch({ control, name: 'waste.recycle_plastic' });
                const recycleMetal = useWatch({ control, name: 'waste.recycle_metal' });
                const noRecycling = useWatch({ control, name: 'waste.no_recycling' });

                const anyRecycleChecked = recyclePaper || recyclePlastic || recycleMetal;

                return (
                    <Box display="flex" flexDirection="column" gap={1}>
                        <CheckboxInput
                            name="waste.recycle_paper"
                            label="Recycle Paper"
                            control={control}
                            disabled={noRecycling}
                        />
                        <CheckboxInput
                            name="waste.recycle_plastic"
                            label="Recycle Plastic"
                            control={control}
                            disabled={noRecycling}
                        />
                        <CheckboxInput
                            name="waste.recycle_metal"
                            label="Recycle Metal"
                            control={control}
                            disabled={noRecycling}
                        />
                        <CheckboxInput
                            name="waste.no_recycling"
                            label="No recycling"
                            control={control}
                            disabled={anyRecycleChecked}
                        />
                    </Box>
                );
            })(),
        },
    ];

    return (
        <>
            <AccordionSteps steps={steps} />
            <Box mb={3}>
                <Grid container alignItems="center" spacing={3}>
                    <Grid >
                        <PeopleIcon fontSize="small" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }} className="mt-4">
                        <TextInput
                            name="people"
                            label="Number of people in the house"
                            control={control}
                            type="number"
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box mt={2}>
                <CustomButton type="submit" variant="contained" color="primary" align="end">
                    Calcular
                </CustomButton>
            </Box>
        </>
    );
};

export default CarbonCalculatorForm; 