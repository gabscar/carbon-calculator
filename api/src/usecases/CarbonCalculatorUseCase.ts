import { ITransportationEmissionService } from '../domain/services/ITransportationEmissionService';
import { IEnergyEmissionService } from '../domain/services/IEnergyEmissionService';
import { IWasteEmissionService } from '../domain/services/IWasteEmissionService';
import { IDietEmissionService } from '../domain/services/IDietEmissionService';
import { CarbonCalculatorInput, ICarbonCalculatorUseCase, ICarbonCalculatorUseCaseResponse } from '../domain/usecase/carbonCalculatorUseCase';


export class CarbonCalculatorUseCase implements ICarbonCalculatorUseCase {
  constructor(
    private readonly transportationService: ITransportationEmissionService,
    private readonly energyService: IEnergyEmissionService,
    private readonly wasteService: IWasteEmissionService,
    private readonly dietService: IDietEmissionService
  ) { }

  async exec(input: CarbonCalculatorInput): Promise<ICarbonCalculatorUseCaseResponse> {
    const transportationEmissions = this.transportationService.exec(input.transportation);
    const energyEmissions = this.energyService.exec(input.energy);
    const wasteEmissions = this.wasteService.exec(input.waste,input.persons);
    const dietEmissions = this.dietService.exec(input.persons) * 1000;

    return { transportationEmissions, energyEmissions, wasteEmissions, dietEmissions };
  }
} 