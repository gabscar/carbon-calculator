import emissionFactors from '../db/emission_factors.json';
import { Transportation } from '../../domain/entities/transportation';
import { ITransportationEmissionService } from '../../domain/services/ITransportationEmissionService';

export class TransportationEmissionService implements ITransportationEmissionService {
  exec(items: Transportation[]): number {
    if (!items.length) return 0;

    return items.reduce((total, transport) => {
      const emissionFactor = emissionFactors.transportation[transport.type].emission_factor;
      const emissions = transport.distance * emissionFactor * (transport.isMantainance ? 1.1 : 1);
      return total + emissions;
    }, 0);
  }
} 