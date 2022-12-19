export class StockTransactionResponse {
  securityId: string;

  quantity: number;

  date: Date;

  type: string;

  tradedPrice: number;

  commison?: number;

  constructor(
    securityId: string,
    quantity: number,
    date: Date,
    type: string,
    tradedPrice: number,
  ) {
    this.securityId = securityId;
    this.quantity = quantity;
    this.date = date;
    this.type = type;
    this.tradedPrice = tradedPrice;
  }
}
