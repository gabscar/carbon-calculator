export class RoundMethods {
    static roundToTwoDecimals(value: number) {
      return Math.round(value * 100) / 100;
    }
}