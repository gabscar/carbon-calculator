import { Energy } from '../entities/energy';

export interface IEnergyEmissionService {
  exec(energy?: Energy): number;
  calculateForType(type: string, amount: number): number;
} 