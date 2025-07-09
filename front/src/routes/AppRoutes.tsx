import { Routes, Route } from 'react-router-dom';
import CarbonCalculator from '@/pages/CarbonCalculator';

import MainLayout from '../components/template/MainLayout';

export default function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<CarbonCalculator />} />
      </Routes>
    </MainLayout>
  );
}