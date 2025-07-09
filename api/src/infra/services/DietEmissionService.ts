import emissionFactors from '../db/emission_factors.json';
import { DietType } from '../../domain/entities/diet';
import { IDietEmissionService } from '../../domain/services/IDietEmissionService';

export class DietEmissionService implements IDietEmissionService {
  exec(persons: number): number {
    if (persons <= 0) {
      throw new Error('Persons must be greater than 0');
    }
    return emissionFactors.diet[DietType.AVERAGE].emission_factor * persons/12;
  }
} 