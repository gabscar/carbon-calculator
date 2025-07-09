export enum DietType {
  AVERAGE = 'average',
}

export class Diet {
  private constructor(public readonly type: DietType) {}

  static create(type: string): Diet {
    const validTypes = Object.values(DietType);

    if (!validTypes.includes(type as DietType)) {
      throw new Error(
        `Invalid diet type. Must be one of: ${validTypes.join(', ')}`
      );
    }

    return new Diet(type as DietType);
  }
}