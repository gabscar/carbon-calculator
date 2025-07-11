import z from "zod";
import { carbonCalculatorSchema } from "../../infra/http/validators/calculator/carbonCalculatorValidator";



export interface ICarbonCalculatorUseCaseResponse {
  transportationEmissions: number;
  energyEmissions: number;
  wasteEmissions: number;
  dietEmissions: number;
  totalEmissions: number;
  unit:string
}
export type CarbonCalculatorInput = z.infer<typeof carbonCalculatorSchema>;

export interface ICarbonCalculatorUseCase {
  exec(input: CarbonCalculatorInput): Promise<ICarbonCalculatorUseCaseResponse>;
}