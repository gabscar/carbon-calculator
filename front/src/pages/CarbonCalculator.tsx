import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import CarbonCalculatorForm, {
  carbonCalculatorSchemaValidation,
  type CarbonCalculatorFormInput,
} from '@/components/forms/CarbonCalculatorForm';

import { Box, Grid, Typography } from '@mui/material';
import { ResultCalculator, type ResultCalculatorProps } from '@/components/calculator/ResultCalculator';

const CarbonCalculator: React.FC = () => {
  const { control, handleSubmit } = useForm<CarbonCalculatorFormInput>({
    resolver: zodResolver(carbonCalculatorSchemaValidation),
    defaultValues: {
      vehicles: [{ type: 'car', distance: 0, isMaintained: false }],
      energy: { electricity: 0, natural_gas: 0, fuel_oil: 0, propane: 0 },
      waste: {
        recycle_paper: false,
        recycle_plastic: false,
        recycle_metal: false,
        no_recycling: false,
      },
      people: 1,
    },
  });
  const [result] = useState<ResultCalculatorProps>({
    transportationEmissions: 0,
    energyEmissions: 0,
    wasteEmissions: 0,
    dietEmissions: 0,
    totalEmissions: 0,
  });

  const onSubmit = (data: CarbonCalculatorFormInput) => {
    console.log(data);
  };

  return (
    <Grid container spacing={5}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Box
          bgcolor="white"
          borderRadius={2}
          p={4}
          boxShadow={2}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h5" mb={2}>
            Personal Carbon Calculator
          </Typography>
          <CarbonCalculatorForm control={control} />
        </Box>
      </Grid>

      <Grid size={{ xs: 10, md: 4 }}>
        <ResultCalculator
          transportationEmissions={result.transportationEmissions}
          energyEmissions={result.energyEmissions}
          wasteEmissions={result.wasteEmissions}
          dietEmissions={result.dietEmissions}
          totalEmissions={result.totalEmissions}
        />
      </Grid>
    </Grid>
  );
};

export default CarbonCalculator;
