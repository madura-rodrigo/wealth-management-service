import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StockTransactionDocument = HydratedDocument<StockTransaction>;

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

  commison: number;
}

export const StockTransactionSchema =
  SchemaFactory.createForClass(StockTransaction);
