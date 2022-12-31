export class StockSummaryResponseDto {
  /** Symbol of the security */
  securityId: string;

  name: string;

  marketPrice: number = 0;

  /** Cost spent to buy including commison */
  buyingCost: number = 0;
  /** Relaized income after selling excluding commison */
  sellingIncome: number = 0;

  avialableQuantity: number = 0;
  /** Average cost spent to buy stocks */
  avgCostOfAvialbleQty: number = 0;
  /** Profit considering already sold stocks + unrealized profit/loss */
  totalProfit: number = 0;
  /** Unrealized profit for avialable stoks based on current market value and average cost   */
  unrealizedProfit: number = 0;

  // constructor(
  //   marketPrice: number,
  //   buyingCost: number,
  //   sellingIncome: number,
  //   avialableQuantity: number,
  //   avgCostOfAvialbleQty: number,
  //   totalProfit: number,
  //   unrealizedProfit: number,
  // ) {
  //   this.marketPrice = marketPrice;
  //   this.buyingCost = buyingCost;
  //   this.sellingIncome = sellingIncome;
  //   this.avialableQuantity = avialableQuantity;
  //   this.avgCostOfAvialbleQty = avgCostOfAvialbleQty;
  //   this.totalProfit = totalProfit;
  //   this.unrealizedProfit = unrealizedProfit;
  // }
}
