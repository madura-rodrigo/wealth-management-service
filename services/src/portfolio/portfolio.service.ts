import { Injectable } from '@nestjs/common';
import { DividentService } from './divident/divident.service';
import { Summary } from './interfaces/summary.interface';
import { InvestmentService } from './investment/investment.service';
import { StockTransactionService } from './stock-transaction/stock-transaction.service';

@Injectable()
export class PortfolioService {
  constructor(
    readonly investmentService: InvestmentService,
    readonly dividentService: DividentService,
    readonly transactionService: StockTransactionService,
  ) {}

  async getSummary(userId: string): Promise<Summary> {
    //total investment
    const totalInvestment = await this.investmentService
      .get(userId)
      .then((invesments) => {
        return invesments
          .map((item) => item.amount)
          .reduce((previous, current) => previous + current, 0);
      });

    //total divident income
    const totalDivident = await this.dividentService
      .get(userId)
      .then((dividents) => {
        return dividents
          .map((item) => item.amount)
          .reduce((previous, current) => previous + current);
      });

    //profit or loss
    const stockSummaries = await this.transactionService
      .findIds(userId)
      .then((ids) => {
        return this.transactionService.getSummaryBySecurityIds(ids, userId);
      });

    const stocksByingCost = stockSummaries
      .map((value) => value.buyingCost)
      .reduce((previous, current) => previous + current);
    const stocksSellingIncome = stockSummaries
      .map((value) => value.sellingIncome)
      .reduce((previous, current) => previous + current);

    const unrealizedProfit = stockSummaries
      .map((value) => value.unrealizedProfit)
      .reduce((previous, current) => previous + current);

    const summary: Summary = {
      totalInvestment: totalInvestment,
      totalDivident: totalDivident,
      realizedMoney: totalDivident + stocksSellingIncome,
      unrealizedMoney: unrealizedProfit,
      profit:
        totalDivident +
        stocksSellingIncome +
        unrealizedProfit -
        stocksByingCost,
    };
    return summary;
  }
}
