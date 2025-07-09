import type { CarbonCalculatorFormInput } from "@/components/forms/carbonForm/types";
import api from "../api";

export interface CalculateCarbonResponse {
    transportationEmissions: number;
    energyEmissions: number;
    wasteEmissions: number;
    dietEmissions: number;
    totalEmissions: number;
    unit: string;
}
export class CalculateCarbonService {
    private readonly baseUrl = '/calculate-carbon';

    async calculateCarbon(data: CarbonCalculatorFormInput): Promise<CalculateCarbonResponse> {
        const response = await api.post<CalculateCarbonResponse>(this.baseUrl, data);
        return response.data;
    }
}