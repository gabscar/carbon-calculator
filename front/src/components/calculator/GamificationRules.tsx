import PublicIcon from '@mui/icons-material/Public';
import WhatshotIcon from '@mui/icons-material/Whatshot';


export const GLOBAL_AVERAGE = 4700;
export const medalOptions:{[key: string]: {icon: string, label: string, color: string}} = {
  gold: {
    icon: '🥇',
    label: 'Gold',
    color: 'success'
  },
  silver: {
    icon: '🥈',
    label: 'Silver',
    color: 'warning'
  },
  bronze: {
    icon: '🥉',
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
  if (total < 2000) return { label: '🌱 Green Hero', color: '#4caf50', value: 33 };
  if (total < 4000) return { label: '🟡 Moderate', color: '#ffeb3b', value: 66 };
  return { label: '🔴 High Impact', color: '#f44336', value: 100 };
}

export function getPlanetIcon(total: number) {
  if (total < 2000) return <PublicIcon fontSize="large" color="success" />;
  if (total < 4000) return <PublicIcon fontSize="large" color="warning" />;
  return <WhatshotIcon fontSize="large" color="error" />;
}

export function getTrees(total: number) {
  return Math.round(total / 200);
}