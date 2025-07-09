import { Transportation } from '../entities/transportation';

export interface ITransportationEmissionService {
  exec(items: Transportation[]): number;
} 