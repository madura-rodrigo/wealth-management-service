import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExternalDataModule } from 'src/external-data-service/external-data.module';
import {
  StockTransaction,
  StockTransactionSchema,
} from './model/stock-transaction.model';
import { StockTransactionService } from './stock-transaction.service';
import {
  COMMISON_CALCULATOR,
  CSECommisonCalculator,
} from './utilities/commison-calcuater';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StockTransaction.name, schema: StockTransactionSchema },
    ]),
    ExternalDataModule,
  ],
  providers: [
    StockTransactionService,
    { provide: COMMISON_CALCULATOR, useClass: CSECommisonCalculator },
  ],
  exports: [StockTransactionService],
})
export class StockTransactionModule {}
