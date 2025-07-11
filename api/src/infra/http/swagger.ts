import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Carbon Calculator API',
    version: '1.0.0',
    description: 'API for calculating carbon footprint.'
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`, 
      description: 'Local development server'
    }
  ],
  paths: {
    '/api/calculate-carbon': {
      post: {
        summary: 'Calculate carbon footprint',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  transportation: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        type: { type: 'string', example: 'car' },
                        distance: { type: 'number', example: 100 },
                        isMantainance: { type: 'boolean', example: true }
                      }
                    }
                  },
                  energy: {
                    type: 'object',
                    properties: {
                      electricity: { type: 'number', example: 200 },
                      natural_gas: { type: 'number', example: 10 },
                      fuel_oil: { type: 'number', example: 0 },
                      propane: { type: 'number', example: 0 }
                    }
                  },
                  waste: {
                    type: 'object',
                    properties: {
                      recycle_paper: { type: 'boolean', example: true },
                      recycle_plastic: { type: 'boolean', example: false },
                      recycle_metal: { type: 'boolean', example: true },
                      no_recycling: { type: 'boolean', example: false }
                    }
                  },
                  persons: { type: 'number', example: 1 }
                },
                required: ['transportation', 'energy', 'waste', 'persons']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Calculation result',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    transportationEmissions: { type: 'number', example: 44.85 },
                    energyEmissions: { type: 'number', example: 133 },
                    wasteEmissions: { type: 'number', example: -0.03 },
                    dietEmissions: { type: 'number', example: 208.33 },
                    totalEmissions: { type: 'number', example: 386.15 },
                    unit: { type: 'string', example: 'kg CO2e' }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export function setupSwagger(app: Express) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} 