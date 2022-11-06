import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStockTransactionDto {
  @IsNotEmpty()
  securityId: string;

  @IsNumber()
  quantity: number;

  @Type(() => Date)
  @IsDate()
  date: Date;

  type: string;

  @IsNumber()
  tradedPrice: number;
}
