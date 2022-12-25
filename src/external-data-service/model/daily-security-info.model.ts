import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DailySecurityInfoDocument = HydratedDocument<DailySecurityInfo>;

@Schema()
export class DailySecurityInfo {
  @Prop({ type: Number })
  id?: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  symbol: string;

  @Prop({ type: Number })
  lastTradedTime?: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number })
  tradeVolume: number;

  @Prop({ type: Number })
  turnover: number;

  @Prop({ type: Number })
  shareVolume: number;

  @Prop({ type: Number })
  percentageChange?: number;

  @Prop({ type: Number })
  change?: number;

  @Prop({ type: String })
  tradingStatus?: string;
}

export const DailySecurityInfoSchema =
  SchemaFactory.createForClass(DailySecurityInfo);
