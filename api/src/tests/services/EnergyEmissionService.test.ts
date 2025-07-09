import { Energy } from '../../domain/entities/energy';
import { EnergyEmissionService } from '../../infra/services/EnergyEmissionService';
import { mockedEmissionFactors } from '../mocks/emission_factors';
jest.mock('../../infra/db/emission_factors.json', () => (require('../mocks/emission_factors').mockedEmissionFactors));
describe('EnergyEmissionService', () => {
  it('calculates emissions for electricity and natural gas', () => {
    const service = new EnergyEmissionService();
    const input = {
      electricity: 100,
      natural_gas: 5,
      fuel_oil: 0,
      propane: 0
    };
    const result = service.exec(input);
    const expected = 100 * mockedEmissionFactors.energy.electricity.emission_factor + 5 * mockedEmissionFactors.energy.natural_gas.emission_factor;
    expect(result).toBeCloseTo(expected, 2);
  });

  it('returns 0 for empty input', () => {
    const service = new EnergyEmissionService();
    expect(service.exec(Energy.create({}))).toBe(0);
  });
}); 