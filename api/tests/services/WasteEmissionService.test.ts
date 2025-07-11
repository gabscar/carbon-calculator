import { WasteEmissionService } from '../../src/infra/services/WasteEmissionService';
import { Waste } from '../../src/domain/entities/waste';
const mockedEmissionFactors = require('../mocks/emission_factors').mockedEmissionFactors;

jest.mock('../../src/infra/db/emission_factors.json', () => require('../mocks/emission_factors').mockedEmissionFactors);
describe('WasteEmissionService', () => {
  it('calculates emissions for recycling and no recycling', () => {
    const service = new WasteEmissionService();
    const input = {
      recycle_paper: true,
      recycle_plastic: false,
      recycle_metal: true,
      no_recycling: true
    };
    const result = service.exec(input,1);
    const expected = (mockedEmissionFactors.waste.recycle_paper.emission_factor + mockedEmissionFactors.waste.recycle_metal.emission_factor + mockedEmissionFactors.waste.no_recycling.emission_factor)/12;
    expect(result).toBeCloseTo(expected, 2);
  });

  it('returns 0 for empty input', () => {
    const service = new WasteEmissionService();
    expect(service.exec(new Waste(false,false,false,false),1)).toBe(0);
  });
}); 