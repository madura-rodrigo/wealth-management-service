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

@Injectable()
export class StockTransactionService {
  constructor(
    @InjectModel(StockTransaction.name)
    private readonly stockTransactionModel: Model<StockTransactionDocument>,
    @Inject(COMMISON_CALCULATOR)
    private readonly commisonCalculator: CommisonCalculator,
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

  findAll(): Promise<StockTransactionResponse[]> {
    return this.stockTransactionModel
      .find()
      .distinct('securityId')
      .then(async (securityIds) => {
        let allTransactions: StockTransactionResponse[] = [];
        for (const id of securityIds) {
          const arr = await this.findById(id);
          allTransactions = allTransactions.concat(arr);
        }
        return allTransactions;
      });
  }

  async findById(securityId: string): Promise<StockTransactionResponse[]> {
    const transactionsbyId = await this.stockTransactionModel.find({
      securityId,
    });
    return this.commisonCalculator.calculate(transactionsbyId);
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
