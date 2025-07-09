import { Transportation, TransportType } from '../../domain/entities/transportation';
import { TransportationEmissionService } from '../../infra/services/TransportationEmissionService';
import { mockedEmissionFactors } from '../mocks/emission_factors';
jest.mock('../../infra/db/emission_factors.json', () => (require('../mocks/emission_factors').mockedEmissionFactors));

describe('TransportationEmissionService', () => {
  it('calculates emissions for multiple vehicles', () => {
    const service = new TransportationEmissionService();
    const input = [
      { type: TransportType.CAR, distance: 100 },
      { type: TransportType.BUS, distance: 50 }
    ].map(item=>new Transportation(item.type,item.distance));
    const result = service.exec(input);
    const expected = 100 * mockedEmissionFactors.transportation.car.emission_factor + 50 * mockedEmissionFactors.transportation.bus.emission_factor;
    expect(result).toBeCloseTo(expected, 2);
  });

  it('returns 0 for empty input', () => {
    const service = new TransportationEmissionService();
    expect(service.exec([])).toBe(0);
  });
}); 