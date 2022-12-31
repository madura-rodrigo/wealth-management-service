import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  StockTransaction,
  StockTransactionDocument,
} from './model/stock-transaction.model';
import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';
import { StockTransactionResponse } from './dto/stock-transaction-response.dto';
import {
  CommisonCalculator,
  COMMISON_CALCULATOR,
} from './utilities/commison-calcuater';
import { TransactionType } from '../enum/transaction-type.enum';
import { StockSummaryResponseDto } from './dto/stock-summary-response.dto';
import {
  ExternalDataService,
  EXTERNAL_DATA_SERVICE,
} from 'src/external-data-service/external-data.service';

@Injectable()
export class StockTransactionService {
  constructor(
    @InjectModel(StockTransaction.name)
    private readonly stockTransactionModel: Model<StockTransactionDocument>,
    @Inject(COMMISON_CALCULATOR)
    private readonly commisonCalculator: CommisonCalculator,
    @Inject(EXTERNAL_DATA_SERVICE)
    private readonly extDataService: ExternalDataService,
  ) {}

  async add(
    type: string,
    createStockTransaction: CreateStockTransactionDto,
  ): Promise<StockTransaction> {
    createStockTransaction.type = type;
    const createdStockTransaction = await this.stockTransactionModel.create(
      createStockTransaction,
    );
    return createdStockTransaction;
  }

  update() {}

  delete() {}

  findAll(userId: string): Promise<StockTransactionResponse[]> {
    return this.findIds(userId).then(async (securityIds) => {
      let allTransactions: StockTransactionResponse[] = [];
      for (const id of securityIds) {
        const arr = await this.findById(id, userId);
        allTransactions = allTransactions.concat(arr);
      }
      return allTransactions;
    });
  }

  async findIds(userId: string): Promise<string[]> {
    return this.stockTransactionModel
      .find({ userId })
      .distinct('securityId')
      .exec();
  }

  async findById(
    securityId: string,
    userId: string,
  ): Promise<StockTransactionResponse[]> {
    const transactionsbyId = await this.stockTransactionModel.find({
      userId,
      securityId,
    });
    return this.commisonCalculator.calculate(transactionsbyId);
  }

  async getSummaryBySecurityIds(
    ids: string[],
    userId: string,
  ): Promise<StockSummaryResponseDto[]> {
    return Promise.all(
      ids.map(async (id) => {
        const transactions = await this.findById(id, userId);
        const secInfo = await this.extDataService.findSecurityDataById(id);

        const summary = transactions.reduce(
          (transactionsSummary: StockSummaryResponseDto, item) => {
            if (item.type === TransactionType.BUY) {
              transactionsSummary.buyingCost +=
                item.tradedPrice * item.quantity + item?.commison;
              transactionsSummary.avialableQuantity += item.quantity;
            } else {
              transactionsSummary.sellingIncome +=
                item.tradedPrice * item.quantity - item?.commison;
              transactionsSummary.avialableQuantity -= item.quantity;
            }

            return transactionsSummary;
          },
          new StockSummaryResponseDto(),
        );

        summary.securityId = id;
        summary.name = secInfo.name;
        summary.marketPrice = secInfo.price;
        summary.avgCostOfAvialbleQty =
          (summary.buyingCost - summary.sellingIncome) /
          summary.avialableQuantity;
        summary.unrealizedProfit =
          summary.avialableQuantity * secInfo.price -
          summary.avgCostOfAvialbleQty * summary.avialableQuantity;
        summary.totalProfit =
          summary.unrealizedProfit + summary.sellingIncome - summary.buyingCost;
        return summary;
      }),
    );
  }

  // private calculateAvailableQuantity(
  //   buyQuantity: number,
  //   sellQuantity: number,
  // ) {
  //   return buyQuantity - sellQuantity;
  // }

  // private calculateBuyingCost(buyTransactions) {}

  // private calculateSellingIncome(sellTransactions) {}
}
