import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  Post,
} from '@nestjs/common';
import { type } from 'os';
import { DividentService } from './divident/divident.service';
import { CreateDividentDto } from './divident/dto/create-divident.dto';
import { TransactionType } from './enum/transaction-type.enum';
import { Summary } from './interfaces/summary.interface';
import { CreateInvestmentDto } from './investment/dto/create-investment.dto';
import { InvestmentService } from './investment/investment.service';
import { Divident } from './model/divident.model';
import { Investment } from './model/investment.model';
import { PortfolioService } from './portfolio.service';
import { CreateStockTransactionDto } from './stock-transaction/dto/create-stock-transaction.dto';
import { StockTransactionService } from './stock-transaction/stock-transaction.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(
    private readonly portfolioServie: PortfolioService,
    private readonly investmentServie: InvestmentService,
    private readonly dividentService: DividentService,
    private readonly stockTransactionService: StockTransactionService,
  ) {}

  @Get()
  getDetailPortfolio() {}

  @Get('/summary')
  async getPortfolioSummary(): Promise<Summary> {
    return this.portfolioServie.getSummary();
  }

  @Post('/investments')
  async addInvestment(@Body() dto: CreateInvestmentDto): Promise<Investment> {
    return this.investmentServie.add(dto);
  }

  @Post('/dividents')
  async addDivident(@Body() dto: CreateDividentDto): Promise<Divident> {
    return this.dividentService.add(dto);
  }

  @Post(':transaction')
  async addTransaction(
    @Param('transaction', new ParseEnumPipe(TransactionType))
    transaction: string,
    @Body() dto: CreateStockTransactionDto,
  ) {
    this.stockTransactionService.add(transaction, dto);
  }
}
