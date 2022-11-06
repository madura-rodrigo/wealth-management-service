import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  StockTransaction,
  StockTransactionSchema,
} from '../model/stock-transaction.model';
import { StockTransactionService } from './stock-transaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StockTransaction.name, schema: StockTransactionSchema },
    ]),
  ],
  providers: [StockTransactionService],
  exports: [StockTransactionService],
})
export class StockTransactionModule {}
