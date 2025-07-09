export class Waste {
  constructor(
    public recycle_paper: boolean = false,
    public recycle_plastic: boolean = false,
    public recycle_metal: boolean = false,
    public no_recycling: boolean = false
  ) {}

  static create(data: {
    recycle_paper?: boolean;
    recycle_plastic?: boolean;
    recycle_metal?: boolean;
    no_recycling?: boolean;
  }): Waste {
    if (data.no_recycling && (data.recycle_paper || data.recycle_plastic || data.recycle_metal)) {
      throw new Error('Cannot have no_recycling true with other recycling options');
    }

    return new Waste(
      data.recycle_paper || false,
      data.recycle_plastic || false,
      data.recycle_metal || false,
      data.no_recycling || false
    );
  }
} 