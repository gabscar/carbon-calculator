import type { CalculateCarbonResponse } from '@/api/services/calculateCarbon';
import { Box, Typography, Alert, LinearProgress, Button, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useEffect, useState } from 'react';
import { getEcoLevel, getMedal, getPlanetIcon, getTrees, GLOBAL_AVERAGE } from './GamificationRules';

type ResultCalculatorProps = CalculateCarbonResponse & {
  onReset: () => void;
  persons: number;
}


export const ResultCalculator = ({ transportationEmissions, energyEmissions, wasteEmissions, totalEmissions, unit, onReset, persons }: ResultCalculatorProps) => {
  const theme = useTheme();
  const [showCongrats, setShowCongrats] = useState(false);
  const [animate, setAnimate] = useState(false);
  const totalYear = Math.round(totalEmissions * 12 * 100) / 100;
  const medal = getMedal(totalYear/persons);
  const eco = getEcoLevel(totalYear/persons);
  const planetIcon = getPlanetIcon(totalYear/persons);
  const trees = getTrees(totalYear);

  useEffect(() => {
    if (totalEmissions > 0) {
      setAnimate(true);
      setShowCongrats(true);
    }

  }, [totalEmissions]);


  const resetGame = () => {
    setAnimate(false);
    setShowCongrats(false);
    onReset();
  };


  return (
    <Box sx={{ background: theme.palette.resultBox.main, color: theme.palette.resultBox.contrastText }} className='d-flex flex-column gap-2' borderRadius={2} p={4} boxShadow={2}>
      {showCongrats && <Fade in={showCongrats} timeout={1000} >
        <Box>
          <Alert severity={medal.color as any} icon={<EmojiEventsIcon />} sx={{ mb: 2, fontWeight: 'bold', fontSize: 18 }}>
            You've earned the {medal.icon} <b>{medal.label} Badge</b> for your footprint!
          </Alert>

          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            {planetIcon}
          </Box>

          <Box sx={{ width: '100%', mb: 1 }}>
            <LinearProgress
              variant="determinate"
              value={eco.value}
              sx={{
                height: 12,
                borderRadius: 6,
                background: '#eee',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: eco.color,
                  transition: 'all 1s',
                },
              }}
            />
            <Typography align="center" mt={1} fontWeight={600}>
              {eco.label}
            </Typography>
          </Box>
          <Box textAlign="center" mb={2}>
            <Typography variant="body2">
              Estimated CO₂ per year: <b>{totalYear.toLocaleString()} {unit.replace('month', '')}</b><br />
              That’s equivalent to planting <b>{trees}</b> trees 🌳
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography align="center" variant="body2">
              🌍 Global average per person: <b>{GLOBAL_AVERAGE.toLocaleString()} kg CO₂/year</b>
            </Typography>
          </Box>
        </Box>

      </Fade>}



      <Typography variant="h6" gutterBottom>
        Results
      </Typography>
      <Typography variant="body1">
        🚗 Transportation: <strong>{transportationEmissions} {unit} </strong>
      </Typography>
      <Typography variant="body1">
        🔌 Energy: <strong>{energyEmissions} {unit} </strong>
      </Typography>
      <Typography variant="body1">
        🗑️ Waste: <strong>{wasteEmissions} {unit} </strong>
      </Typography>
      <Box mt={2} borderTop="1px solid #ccc" pt={2}>
        <Typography variant="h6">
          🌍 Total: <strong>{totalEmissions} {unit} </strong>
        </Typography>
        <Typography variant="h6">
          🌍 Total Year: <strong>{totalYear} {unit.replace('/month', '')} </strong>
        </Typography>
      </Box>

      <Box mt={3} textAlign="center">
        <Button onClick={resetGame} startIcon={<RestartAltIcon />} color="secondary" variant="outlined">
          Reset Footprint
        </Button>
      </Box>

    </Box>
  );
};