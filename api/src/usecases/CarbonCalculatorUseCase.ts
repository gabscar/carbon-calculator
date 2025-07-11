import { ITransportationEmissionService } from '../domain/services/ITransportationEmissionService';
import { IEnergyEmissionService } from '../domain/services/IEnergyEmissionService';
import { IWasteEmissionService } from '../domain/services/IWasteEmissionService';
import { CarbonCalculatorInput, ICarbonCalculatorUseCase, ICarbonCalculatorUseCaseResponse } from '../domain/usecase/carbonCalculatorUseCase';
import { RoundMethods } from '../utils/round';


export class CarbonCalculatorUseCase implements ICarbonCalculatorUseCase {
  constructor(
    private readonly transportationService: ITransportationEmissionService,
    private readonly energyService: IEnergyEmissionService,
    private readonly wasteService: IWasteEmissionService,
  ) { }

  async exec(input: CarbonCalculatorInput): Promise<ICarbonCalculatorUseCaseResponse> {
    const transportationEmissions = RoundMethods.roundToTwoDecimals(this.transportationService.exec(input.transportation));
    const energyEmissions = RoundMethods.roundToTwoDecimals(this.energyService.exec(input.energy));
    const wasteEmissions = RoundMethods.roundToTwoDecimals(this.wasteService.exec(input.waste,input.persons));
    const totalEmissions = RoundMethods.roundToTwoDecimals(transportationEmissions + energyEmissions + wasteEmissions);
    
    return { transportationEmissions, energyEmissions, wasteEmissions, totalEmissions,unit: 'kg CO2e /month', };
  }
} 