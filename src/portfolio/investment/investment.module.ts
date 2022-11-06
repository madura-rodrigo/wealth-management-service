import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Investment, InvestmentSchema } from '../model/investment.model';
import { InvestmentService } from './investment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Investment.name, schema: InvestmentSchema },
    ]),
  ],
  providers: [InvestmentService],
  exports: [InvestmentService],
})
export class InvestmentModule {}
