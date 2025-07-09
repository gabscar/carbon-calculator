export enum TransportType {
  CAR = 'car',
  BUS = 'bus',
  TRAIN = 'train',
  AIRPLANE_SHORT = 'airplane_short',
  AIRPLANE_LONG = 'airplane_long',
}

export class Transportation {
  constructor(
    public type: TransportType,
    public distance: number,
    public isMantainance: boolean = true
  ) {}

  static create(type: string, distance: number): Transportation {
    const validTypes = Object.values(TransportType);

    if (!validTypes.includes(type as TransportType)) {
      throw new Error(
        `Invalid transport type. Must be one of: ${validTypes.join(', ')}`
      );
    }

    if (distance < 0) {
      throw new Error('Distance cannot be negative');
    }

    return new Transportation(type as TransportType, distance);
  }
}
