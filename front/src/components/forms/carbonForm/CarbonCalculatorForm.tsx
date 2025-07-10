import { useFieldArray, useWatch, useFormState } from 'react-hook-form';
import AccordionSteps from '@/components/accordion/AccordionSteps';
import TextInput from '@/components/inputs/TextInput';
import CheckboxInput from '@/components/inputs/CheckboxInput';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from '@/components/button/Button';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import type { CarbonCalculatorFormProps } from './types';

const CarbonCalculatorForm = ({ control, loading }: CarbonCalculatorFormProps) => {

    const { fields, append, remove } = useFieldArray({ control, name: 'transportation' });
    const { errors } = useFormState({ control });

    const errorSteps: number[] = [];
    if (errors.transportation) errorSteps.push(0);
    if (errors.energy) errorSteps.push(1);
    if (errors.waste) errorSteps.push(2);

    const steps = [
        {
            title: 'Vehicles',
            icon: <DirectionsCarIcon color="primary" />,
            description: 'Add the number of vehicles you have and the distance you travel per month.',
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
                                    <TextInput
                                        name={`transportation.${index}.distance`}
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
                            <Grid container spacing={{ xs: 1, md: 2 }}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <CheckboxInput
                                        name={`transportation.${index}.isMantainance`}
                                        label="Preventive Maintenance"
                                        control={control}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                    <CustomButton variant="contained" onClick={() => append({ type: 'car', distance: 0, isMantainance: false })}>
                        Add Vehicle
                    </CustomButton>
                </>
            ),
        },
        {
            title: 'Energy',
            icon: <FlashOnIcon color="secondary" />,
            description: 'Add the amount of energy you consume per month.',
            content: (
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextInput name="energy.electricity" label="Eletricity (kWh)" control={control} type="number" />
                    <TextInput name="energy.fuel_oil" label="Fuel oil (gal)" control={control} type="number" />
                    <TextInput name="energy.propane" label="Propane (gal)" control={control} type="number" />
                </Box>
            ),
        },
        {
            title: 'Waste',
            icon: <DeleteSweepIcon color="error" />,
            description: 'If you recycle, add the amount of waste you recycle per month, this will help us calculate the carbon footprint of your waste.',
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
            <AccordionSteps steps={steps} expandedPanels={errorSteps.length > 0 ? errorSteps : undefined} />
            <Box mb={3} className="mt-4">
                <TextInput
                    name="persons"
                    label="Number of persons in the house"
                    control={control}
                    type="number"
                />
            </Box>
            <Box mt={2}>
                <CustomButton type="submit" variant="contained" color="primary" align="end" loading={loading}>
                    Calculate
                </CustomButton>
            </Box>
        </>
    );
};

export default CarbonCalculatorForm; 