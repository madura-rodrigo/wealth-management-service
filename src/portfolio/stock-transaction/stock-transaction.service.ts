import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionType } from '../enum/transaction-type.enum';
import { StockTransaction } from '../model/stock-transaction.model';
import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';

@Injectable()
export class StockTransactionService {
  constructor(
    @InjectModel(StockTransaction.name)
    private readonly stockTransactionModel: Model<StockTransaction>,
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

  get(securityId: string) {}
}
