import { TransportationEmissionService } from '../../src/infra/services/TransportationEmissionService';
import { Transportation, TransportType } from '../../src/domain/entities/transportation';
const mockedEmissionFactors = require('../mocks/emission_factors').mockedEmissionFactors;

jest.mock('../../src/infra/db/emission_factors.json', () => require('../mocks/emission_factors').mockedEmissionFactors);
describe('TransportationEmissionService', () => {
  it('calculates emissions for multiple vehicles', () => {
    const service = new TransportationEmissionService();
    const input = [
      { type: TransportType.CAR, distance: 100 },
      { type: TransportType.BUS, distance: 50}
    ].map(item=>new Transportation(item.type,item.distance));
    const result = service.exec(input);
    const expected = 100 * mockedEmissionFactors.transportation.car.emission_factor * 1.1 + 50 * mockedEmissionFactors.transportation.bus.emission_factor * 1.1;
    expect(result).toBeCloseTo(expected, 2);
  });

  it('returns 0 for empty input', () => {
    const service = new TransportationEmissionService();
    expect(service.exec([])).toBe(0);
  });
}); 