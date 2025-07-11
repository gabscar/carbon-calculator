import { TransportType } from '../../src/domain/entities/transportation';
import { CarbonCalculatorController } from '../../src/infra/controllers/api/carbonCalculatorController';
import { Request, Response } from 'express';


jest.mock('../../src/infra/db/emission_factors.json', () => require('../mocks/emission_factors').mockedEmissionFactors);

describe('CarbonCalculatorController', () => {
  let controller: CarbonCalculatorController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    controller = new CarbonCalculatorController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  it('should exec total emissions for a valid request', async () => {
    mockRequest.body = {
      transportation: [
        { type: TransportType.CAR, distance: 100, isMantainance: true },
        { type: TransportType.BUS, distance: 50, isMantainance: true }
      ],
      energy: {
        electricity: 200,
        natural_gas: 10
      },
      waste: {
        recycle_paper: true,
        recycle_plastic: false,
        recycle_metal: true,
        no_recycling: false
      },
      persons: 1
    };

    await controller.exec(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      'transportationEmissions': 44.85,
      'energyEmissions': 133,
      'wasteEmissions': -0.03,
      "unit": "kg CO2e /month",
      'totalEmissions': 177.82
    });
  });

  it('should return 0 for empty input', async () => {
    mockRequest.body = {
      transportation: [],
      energy: {},
      waste: {},
      persons: 1
    };

    await controller.exec(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      transportationEmissions: 0,
      energyEmissions: 0,
      wasteEmissions: 0,
      totalEmissions: 0,
      "unit": "kg CO2e /month"
    });
  });
}); 