export class Energy {
  constructor(
    public electricity: number = 0,
    public natural_gas: number = 0,
    public fuel_oil: number = 0,
    public propane: number = 0
  ) {}

  static create(data: {
    electricity?: number;
    natural_gas?: number;
    fuel_oil?: number;
    propane?: number;
  }): Energy {
    const values = {
      electricity: data.electricity || 0,
      natural_gas: data.natural_gas || 0,
      fuel_oil: data.fuel_oil || 0,
      propane: data.propane || 0
    };

    Object.entries(values).forEach(([key, value]) => {
      if (value < 0) {
        throw new Error(`${key} consumption cannot be negative`);
      }
    });

    return new Energy(
      values.electricity,
      values.natural_gas,
      values.fuel_oil,
      values.propane
    );
  }
} 