import { Container, Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Container sx={{ flex: 1, mt: 4 }}>{children}</Container>
      <Footer />
    </Box>
  );
}