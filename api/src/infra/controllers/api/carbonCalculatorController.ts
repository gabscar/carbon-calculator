import { Request, Response } from 'express';

import { BaseController } from '../baseController';
import { TransportationEmissionService } from '../../services/TransportationEmissionService';
import { EnergyEmissionService } from '../../services/EnergyEmissionService';
import { WasteEmissionService } from '../../services/WasteEmissionService';
import { DietEmissionService } from '../../services/DietEmissionService';
import { CarbonCalculatorUseCase } from '../../../usecases/CarbonCalculatorUseCase';
import { RequestValidator } from '../../http/validators/baseValidator';
import { carbonCalculatorSchema } from '../../http/validators/calculator/carbonCalculatorValidator';
import { CarbonCalculatorInput } from '../../../domain/usecase/carbonCalculatorUseCase';

export class CarbonCalculatorController extends BaseController {
  private carbonCalculateUseCase: CarbonCalculatorUseCase;

  constructor() {
    super();
    this.carbonCalculateUseCase = new CarbonCalculatorUseCase(
      new TransportationEmissionService(),
      new EnergyEmissionService(),
      new WasteEmissionService(),
      new DietEmissionService()
    );
  }

  protected async executeRoute(req: Request, res: Response): Promise<void> {
    const validatedData = RequestValidator.validate(carbonCalculatorSchema, req.body) as CarbonCalculatorInput;

    const totalEmissions = await this.carbonCalculateUseCase.exec(validatedData);

    res.status(200).json({
      totalEmissions,
      unit: 'kg CO2e',
    });
  }
}
