import PublicIcon from '@mui/icons-material/Public';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { RiPlantFill } from "react-icons/ri";
import { PiNuclearPlantFill } from "react-icons/pi";
import { GiStarMedal } from "react-icons/gi";
export const GLOBAL_AVERAGE = 4700;
export const medalOptions:{[key: string]: {icon: React.ReactNode, label: string, color: string}} = {
  gold: {
    icon: <GiStarMedal color='gold' />,
    label: 'Gold',
    color: 'success'
  },
  silver: {
    icon: <GiStarMedal color='silver' />,
    label: 'Silver',
    color: 'warning'
  },
  bronze: {
    icon: <GiStarMedal color='bronze' />,
    label: 'Bronze',
    color: 'error'
  }
}

export function getMedal(total: number) {
  if (total < 2000) return medalOptions.gold;
  if (total < 4000) return medalOptions.silver;
  return medalOptions.bronze;
}

export function getEcoLevel(total: number) {
  if (total < 2000) return { label: <><RiPlantFill color='#4caf50' />Green Hero</>, color: '#4caf50', value: 33 };
  if (total < 4000) return { label: <><RiPlantFill color='yellow'/>Moderate</>, color: '#ffeb3b', value: 66 };
  return { label: <><PiNuclearPlantFill color='#f44336' /> High Impact</>, color: '#f44336', value: 100 };
}

export function getPlanetIcon(total: number) {
  if (total < 2000) return <PublicIcon fontSize="large" color="success" />;
  if (total < 4000) return <PublicIcon fontSize="large" color="warning" />;
  return <WhatshotIcon fontSize="large" color="error" />;
}

export function getTrees(total: number) {
  return Math.round(total / 200);
}