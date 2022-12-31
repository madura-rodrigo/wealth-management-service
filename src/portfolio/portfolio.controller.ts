import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseArrayPipe,
  ParseEnumPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LoggedInUserIntercepter } from 'src/common/intercepters/logged-in-user.intercepter';
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
import { StockSummaryResponseDto } from './stock-transaction/dto/stock-summary-response.dto';
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
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggedInUserIntercepter)
  async getPortfolioSummary(@Body('userId') userId: string): Promise<Summary> {
    return this.portfolioServie.getSummary(userId);
  }

  @Post('/investments')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggedInUserIntercepter)
  async addInvestment(@Body() dto: CreateInvestmentDto): Promise<Investment> {
    return this.investmentServie.add(dto);
  }

  @Post('/dividents')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggedInUserIntercepter)
  async addDivident(@Body() dto: CreateDividentDto): Promise<Divident> {
    return this.dividentService.add(dto);
  }

  @Post('/transactions/:transaction')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggedInUserIntercepter)
  async addTransaction(
    @Param('transaction', new ParseEnumPipe(TransactionType))
    transaction: string,
    @Body() dto: CreateStockTransactionDto,
  ) {
    this.stockTransactionService.add(transaction, dto);
  }

  @Get('/transactions')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggedInUserIntercepter)
  async findAllSecurityTransactions(
    @Body('userId') userId: string,
  ): Promise<StockTransactionResponse[]> {
    return await this.stockTransactionService.findAll(userId);
  }

  @Get('/transactions/summary')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggedInUserIntercepter)
  async getSummaryBySecurityIds(
    @Body('ids', new ParseArrayPipe({ items: String, separator: ',' }))
    ids: string[],
    @Body('userId') userId: string,
  ): Promise<StockSummaryResponseDto[]> {
    return await this.stockTransactionService.getSummaryBySecurityIds(
      ids,
      userId,
    );
  }

  @Get('/transactions/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggedInUserIntercepter)
  async findSecurityTransactionsById(
    @Param('id', SecurityIdValidationPipe) id: string,
    @Body('userId') userId: string,
  ): Promise<StockTransactionResponse[]> {
    return await this.stockTransactionService.findById(id, userId);
  }

  @Get('/exchange/securities/light')
  async getAllExchangeLightData(): Promise<ExchangeDataLightResponseDto[]> {
    return await this.extDataService.getAllExchangeLighData();
  }
}
