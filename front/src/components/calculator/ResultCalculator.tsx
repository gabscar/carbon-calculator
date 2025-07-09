import type { CalculateCarbonResponse } from '@/api/services/calculateCarbon';
import { Box, Typography } from '@mui/material';



export const ResultCalculator = ({ transportationEmissions, energyEmissions, wasteEmissions, dietEmissions, totalEmissions, unit }: CalculateCarbonResponse) => {
    return (<Box bgcolor="white" borderRadius={2} p={4} boxShadow={2}  >
        <Typography variant="h6" gutterBottom >
            Results
        </Typography>

        < Typography variant="body1" >
            🚗 Transportation: <strong>{transportationEmissions} {unit} </strong>
        </Typography>
        < Typography variant="body1" >
            🔌 Energy: <strong>{energyEmissions} {unit} </strong>
        </Typography>
        < Typography variant="body1" >
            🗑️ Waste: <strong>{wasteEmissions} {unit} </strong>
        </Typography>
        < Typography variant="body1" >
            🍽️ Diet: <strong>{dietEmissions} {unit} </strong>
        </Typography>

        < Box mt={2} borderTop="1px solid #ccc" pt={2} >
            <Typography variant="h6" >
                🌍 Total: <strong>{totalEmissions} {unit} </strong>
            </Typography>
        </Box>
    </Box>)
};