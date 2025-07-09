import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" textAlign="center" py={2} bgcolor="#f5f5f5" mt={4}>
      <Typography variant="body2">© {new Date().getFullYear()} Carbon Calculator</Typography>
    </Box>
  );
}