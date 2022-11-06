import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class StockTransaction {
  @Prop({ type: String, required: true })
  securityId: string;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: Number, required: true })
  tradedPrice: number;
}

export const StockTransactionSchema =
  SchemaFactory.createForClass(StockTransaction);
