import { DietEmissionService } from '../../infra/services/DietEmissionService';
import { mockedEmissionFactors } from '../mocks/emission_factors';
jest.mock('../../infra/db/emission_factors.json', () => (require('../mocks/emission_factors').mockedEmissionFactors));


describe('DietEmissionService', () => {
  it('calculates emissions for each diet type', () => {
    const service = new DietEmissionService();

    expect(service.exec(1)).toBeCloseTo(mockedEmissionFactors.diet.average.emission_factor, 2);

  });

  it('throws for invalid or empty diet', () => {
    const service = new DietEmissionService();
    expect(() => service.exec(0)).toThrow();
  });
}); 