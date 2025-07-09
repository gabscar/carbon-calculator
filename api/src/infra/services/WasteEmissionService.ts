import emissionFactors from '../db/emission_factors.json';
import { Waste } from '../../domain/entities/waste';
import { IWasteEmissionService } from '../../domain/services/IWasteEmissionService';

export class WasteEmissionService implements IWasteEmissionService {
  exec(waste: Waste, persons: number): number {
    let totalEmissions = 0;

    if (waste.recycle_paper) {
      totalEmissions += emissionFactors.waste.recycle_paper.emission_factor;
    }
    if (waste.recycle_plastic) {
      totalEmissions += emissionFactors.waste.recycle_plastic.emission_factor;
    }
    if (waste.recycle_metal) {
      totalEmissions += emissionFactors.waste.recycle_metal.emission_factor;
    }

    if (waste.no_recycling) {
      totalEmissions += emissionFactors.waste.no_recycling.emission_factor;
    }

    return totalEmissions * persons;
  }
} 