import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" >
      <CircularProgress size={20} />
    </Box>
  );
};

export default Loading;