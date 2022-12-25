import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { InvestmentModule } from './investment/investment.module';
import { DividentModule } from './divident/divident.module';
import { StockTransactionModule } from './stock-transaction/stock-transaction.module';
import { ExternalDataModule } from 'src/external-data-service/external-data.module';

@Module({
  controllers: [PortfolioController],
  providers: [PortfolioService],
  imports: [
    InvestmentModule,
    DividentModule,
    StockTransactionModule,
    ExternalDataModule,
  ],
})
export class PortfolioModule {}
