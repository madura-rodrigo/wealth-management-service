import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Investment {
  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Date, required: true })
  date: Date;
}

export const InvestmentSchema = SchemaFactory.createForClass(Investment);
