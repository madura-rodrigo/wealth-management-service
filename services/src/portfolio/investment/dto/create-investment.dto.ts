import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInvestmentDto {
  @IsNumber()
  readonly amount: number;

  @Type(() => Date)
  @IsDate()
  readonly date: Date;

  @IsNotEmpty()
  readonly userId: string;
}
