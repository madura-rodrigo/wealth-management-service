import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDividentDto {
  @IsNotEmpty()
  readonly securityId: string;
  @IsNumber()
  readonly amount: number;

  @Type(() => Date)
  @IsDate()
  readonly date: Date;
}
