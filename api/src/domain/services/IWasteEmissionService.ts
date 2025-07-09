import { Waste } from '../entities/waste';

export interface IWasteEmissionService {
  exec(waste: Waste,persons: number): number;
} 