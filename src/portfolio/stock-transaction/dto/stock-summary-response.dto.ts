export class StockSummaryResponseDto {
  securityId: string;
  name: string;
  buyingCost: number;
  sellingIncome: number;
  avialableQuantity: number;
  avgCostOfAvialbleQty: number;

  constructor(
    buyingCost: number,
    sellingIncome: number,
    avialableQuantity: number,
    avgCostOfAvialbleQty: number,
  ) {
    this.buyingCost = buyingCost;
    this.sellingIncome = sellingIncome;
    this.avialableQuantity = avialableQuantity;
    this.avgCostOfAvialbleQty = avgCostOfAvialbleQty;
  }
}
