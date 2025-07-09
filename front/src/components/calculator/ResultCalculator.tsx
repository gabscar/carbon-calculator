import { Box, Typography } from '@mui/material';


export type ResultCalculatorProps = {
    transportationEmissions: number;
    energyEmissions: number;
    wasteEmissions: number;
    dietEmissions: number;
    totalEmissions: number;
}
export const ResultCalculator = ({ transportationEmissions, energyEmissions, wasteEmissions, dietEmissions, totalEmissions }: ResultCalculatorProps) => {
    return (<Box bgcolor="white" borderRadius={2} p={4} boxShadow={2} >
        <Typography variant="h6" gutterBottom >
            Results
        </Typography>

        < Typography variant="body1" >
            🚗 Transportation: <strong>{transportationEmissions} kg CO2e </strong>
        </Typography>
        < Typography variant="body1" > 
            🔌 Energy: <strong>{energyEmissions} kg CO2e </strong>
        </Typography>
        < Typography variant="body1" >
            🗑️ Waste: <strong>{wasteEmissions} kg CO2e </strong>
        </Typography>
        < Typography variant="body1" >
            🍽️ Diet: <strong>{dietEmissions} kg CO2e </strong>
        </Typography>

        < Box mt={2} borderTop="1px solid #ccc" pt={2} >
            <Typography variant="h6" >
                🌍 Total: <strong>{totalEmissions} kg CO2e </strong>
            </Typography>
        </Box>
    </Box>)
};