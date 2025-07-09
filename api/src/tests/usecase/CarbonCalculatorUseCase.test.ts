

import { CarbonCalculatorUseCase } from '../../usecases/CarbonCalculatorUseCase';
import { TransportationEmissionService } from '../../infra/services/TransportationEmissionService';
import { EnergyEmissionService } from '../../infra/services/EnergyEmissionService';
import { WasteEmissionService } from '../../infra/services/WasteEmissionService';
import { DietEmissionService } from '../../infra/services/DietEmissionService';
import { CarbonCalculatorInput } from '../../domain/usecase/carbonCalculatorUseCase';
import { TransportType } from '../../domain/entities/transportation';
import { mockedEmissionFactors } from '../mocks/emission_factors';

jest.mock('../../infra/db/emission_factors.json', () => (require('../mocks/emission_factors').mockedEmissionFactors));
describe('CarbonCalculatorUseCase', () => {
  const useCase = new CarbonCalculatorUseCase(
    new TransportationEmissionService(),
    new EnergyEmissionService(),
    new WasteEmissionService(),
    new DietEmissionService()
  );

  it('calculates emissions for multiple cars and energy/waste/diet', async () => {
    const input: CarbonCalculatorInput = {
      transportation: [
        { type: TransportType.CAR, distance: 100 },
        { type: TransportType.BUS, distance: 50 }
      ],
      energy: {
        electricity: 200,
        natural_gas: 10,
        fuel_oil: 0,
        propane: 0
      },
      waste: {
        recycle_paper: true,
        recycle_plastic: false,
        recycle_metal: true,
        no_recycling: false
      },
      persons: 1
    };
    const result = await useCase.exec(input);
    const transportation = input.transportation.reduce((sum, t) => {
      const factor = mockedEmissionFactors.transportation[t.type].emission_factor;
      return sum + t.distance * factor;
    }, 0)

    const energy =
    input.energy.electricity * mockedEmissionFactors.energy.electricity.emission_factor +
    input.energy.natural_gas * mockedEmissionFactors.energy.natural_gas.emission_factor +
    input.energy.fuel_oil * mockedEmissionFactors.energy.fuel_oil.emission_factor +
    input.energy.propane * mockedEmissionFactors.energy.propane.emission_factor

    const waste =
    (input.waste.recycle_paper ? mockedEmissionFactors.waste.recycle_paper.emission_factor : 0) +
    (input.waste.recycle_plastic ? mockedEmissionFactors.waste.recycle_plastic.emission_factor : 0) +
    (input.waste.recycle_metal ? mockedEmissionFactors.waste.recycle_metal.emission_factor : 0) +
    (input.waste.no_recycling ? mockedEmissionFactors.waste.no_recycling.emission_factor : 0);

    const diet = mockedEmissionFactors.diet.average.emission_factor * input.persons*1000;
    const expected = transportation + energy + waste + diet;
    expect(result.transportationEmissions + result.energyEmissions + result.wasteEmissions + result.dietEmissions).toBeCloseTo(expected, 2);
  });

  it('returns 0 for empty input', async () => {
    const input: CarbonCalculatorInput = {
      transportation: [],
      energy: { electricity: 0, natural_gas: 0, fuel_oil: 0, propane: 0 },
      waste: { recycle_paper: false, recycle_plastic: false, recycle_metal: false, no_recycling: false },
      persons: 1
    };
    const result = await useCase.exec(input);
    expect(result.transportationEmissions + result.energyEmissions + result.wasteEmissions + result.dietEmissions).toBe(mockedEmissionFactors.diet.average.emission_factor * input.persons*1000);
  });
}); 