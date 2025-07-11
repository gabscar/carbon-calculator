import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import CarbonCalculatorForm from '@/components/forms/carbonForm/CarbonCalculatorForm';

import { Box, Grid, Typography } from '@mui/material';
import { ResultCalculator } from '@/components/calculator/ResultCalculator';
import { CalculateCarbonService, type CalculateCarbonResponse } from '@/api/services/calculateCarbon';
import { carbonCalculatorSchemaValidation, type CarbonCalculatorFormInput } from '@/components/forms/carbonForm/types';
import { scrollToRef } from '@/utils/scrollToRef';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';

const CarbonCalculator: React.FC = () => {
  const { control, handleSubmit,reset,watch } = useForm<CarbonCalculatorFormInput>({
    resolver: zodResolver(carbonCalculatorSchemaValidation),
    defaultValues: {
      transportation: [{ type: 'car', distance: 0, isMantainance: false }],
      energy: { electricity: 0, natural_gas: 0, fuel_oil: 0, propane: 0 },
      waste: {
        recycle_paper: false,
        recycle_plastic: false,
        recycle_metal: false,
        no_recycling: false,
      },
      persons: 1,
    },
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CalculateCarbonResponse>({
    transportationEmissions: 0,
    energyEmissions: 0,
    wasteEmissions: 0,
    totalEmissions: 0,
    unit: 'kg CO2e',
  });

  const onSubmit = async (data: CarbonCalculatorFormInput) => {
    setLoading(true);
    try {
      const result = await new CalculateCarbonService().calculateCarbon(data);
      setResult(result);
    } catch (error) {
      toast.error('Error calculating carbon footprint');
    } finally {
      setLoading(false);
      scrollToRef(sectionRef as React.RefObject<HTMLElement>);
    }
  };


  const resetResult = () => {
    reset();
    setResult({
      transportationEmissions: 0,
      energyEmissions: 0,
      wasteEmissions: 0,
      totalEmissions: 0,
      unit: 'kg CO2e',
    });
  }

  const theme = useTheme();

  return (
    <Grid container spacing={5}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Box
          sx={{ background: theme.palette.resultBox.main, color: theme.palette.resultBox.contrastText, borderRadius: 2, p: 3 }}
          borderRadius={2}
          p={4}
          boxShadow={2}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h5" mb={2}>
            Personal Carbon Calculator
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>
            This calculator helps you estimate your personal carbon footprint per year based on your lifestyle and habits.
          </Typography>
          <CarbonCalculatorForm control={control} loading={loading} />
        </Box>
      </Grid>

      <Grid size={{ xs: 10, md: 4 }}>
        <div ref={sectionRef}>
          <ResultCalculator
            transportationEmissions={result.transportationEmissions}
            energyEmissions={result.energyEmissions}
            wasteEmissions={result.wasteEmissions}
            onReset={() => resetResult()}
            totalEmissions={result.totalEmissions}
            unit={result.unit}
            persons={watch('persons') as number}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default CarbonCalculator;
