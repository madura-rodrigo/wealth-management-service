import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class CreateInvestmentDto {
  @IsNumber()
  readonly amount: number;

  @Type(() => Date)
  @IsDate()
  readonly date: Date;
}
