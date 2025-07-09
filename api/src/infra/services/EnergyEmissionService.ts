import emissionFactors from '../db/emission_factors.json';
import { Energy } from '../../domain/entities/energy';
import { IEnergyEmissionService } from '../../domain/services/IEnergyEmissionService';

export class EnergyEmissionService implements IEnergyEmissionService {
  exec(energy?: Energy): number {
    let totalEmissions = 0;

    if (energy?.electricity) {
      totalEmissions += this.calculateForType('electricity', energy.electricity);
    }

    if (energy?.natural_gas) {
      totalEmissions += this.calculateForType('natural_gas', energy.natural_gas);
    }

    if (energy?.fuel_oil) {
      totalEmissions += this.calculateForType('fuel_oil', energy.fuel_oil);
    }

    if (energy?.propane) {
      totalEmissions += this.calculateForType('propane', energy.propane);
    }

    return totalEmissions;
  }

  calculateForType(type: string, amount: number): number {
    return amount * emissionFactors.energy[type as keyof typeof emissionFactors.energy].emission_factor;
  }
} 