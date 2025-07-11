import z from "zod";
import { carbonCalculatorSchema } from "../../interface/http/validators/calculator/carbonCalculatorValidator";



export interface ICarbonCalculatorUseCaseResponse {
  transportationEmissions: number;
  energyEmissions: number;
  wasteEmissions: number;
  totalEmissions: number;
  unit:string
}
export type CarbonCalculatorInput = z.infer<typeof carbonCalculatorSchema>;

export interface ICarbonCalculatorUseCase {
  exec(input: CarbonCalculatorInput): Promise<ICarbonCalculatorUseCaseResponse>;
}