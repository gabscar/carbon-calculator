import { DietEmissionService } from '../../src/infra/services/DietEmissionService';
const mockedEmissionFactors = require('../mocks/emission_factors').mockedEmissionFactors;

jest.mock('../../src/infra/db/emission_factors.json', () => require('../mocks/emission_factors').mockedEmissionFactors);

describe('DietEmissionService', () => {
  it('calculates emissions for each diet type', () => {
    const service = new DietEmissionService();

    expect(service.exec(1)).toBeCloseTo(mockedEmissionFactors.diet.average.emission_factor/12, 2);

  });

  it('throws for invalid or empty diet', () => {
    const service = new DietEmissionService();
    expect(() => service.exec(0)).toThrow();
  });
}); 