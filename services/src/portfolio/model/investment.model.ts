import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Investment {
  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: String, required: true })
  userId: string;
}

export const InvestmentSchema = SchemaFactory.createForClass(Investment);
