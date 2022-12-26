import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseEnumPipe,
  Post,
} from '@nestjs/common';
import { ExchangeDataLightResponseDto } from 'src/external-data-service/dto/exchange-data-light-response.dto';
import {
  ExternalDataService,
  EXTERNAL_DATA_SERVICE,
} from 'src/external-data-service/external-data.service';
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
import { StockTransactionResponse } from './stock-transaction/dto/stock-transaction-response.dto';
import { SecurityIdValidationPipe } from './stock-transaction/pipe/security-id-validation.pipe';
import { StockTransactionService } from './stock-transaction/stock-transaction.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(
    private readonly portfolioServie: PortfolioService,
    private readonly investmentServie: InvestmentService,
    private readonly dividentService: DividentService,
    private readonly stockTransactionService: StockTransactionService,
    @Inject(EXTERNAL_DATA_SERVICE)
    private readonly extDataService: ExternalDataService,
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

  @Post('/transactions/:transaction')
  async addTransaction(
    @Param('transaction', new ParseEnumPipe(TransactionType))
    transaction: string,
    @Body() dto: CreateStockTransactionDto,
  ) {
    this.stockTransactionService.add(transaction, dto);
  }

  @Get('/transactions')
  async findAllSecurityTransactions(): Promise<StockTransactionResponse[]> {
    return await this.stockTransactionService.findAll();
  }

  @Get('/transactions/:id')
  async findSecurityTransactionsById(
    @Param('id', SecurityIdValidationPipe) id: string,
  ): Promise<StockTransactionResponse[]> {
    return await this.stockTransactionService.findById(id);
  }

  @Get('/exchange/securities/light')
  async getAllExchangeLightData(): Promise<ExchangeDataLightResponseDto[]> {
    return await this.extDataService.getAllExchangeLighData();
  }
}
