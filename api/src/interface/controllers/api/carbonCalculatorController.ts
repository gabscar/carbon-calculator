import { Request, Response } from 'express';

import { BaseController } from '../baseController';
import { TransportationEmissionService } from '../../../infra/services/TransportationEmissionService';
import { EnergyEmissionService } from '../../../infra/services/EnergyEmissionService';
import { WasteEmissionService } from '../../../infra/services/WasteEmissionService';
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
    );
  }

  protected async executeRoute(req: Request, res: Response): Promise<void> {
    const validatedData = RequestValidator.validate(carbonCalculatorSchema, req.body) as CarbonCalculatorInput;

    const totalEmissions = await this.carbonCalculateUseCase.exec(validatedData);

    res.status(200).json(totalEmissions);
  }
}
