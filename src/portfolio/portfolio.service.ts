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

  async getSummary(): Promise<Summary> {
    //total investment
    const totalInvestment = await this.investmentService
      .get()
      .then((invesments) => {
        return invesments
          .map((item) => item.amount)
          .reduce((previous, current) => previous + current, 0);
      });

    //total divident income
    const totalDivident = await this.dividentService.get().then((dividents) => {
      return dividents
        .map((item) => item.amount)
        .reduce((previous, current) => previous + current);
    });

    const summary: Summary = {
      totalInvestment: totalInvestment,
      totalDivident: totalDivident,
      profit: 5000,
    };

    //profit or loss

    return summary;
  }
}
