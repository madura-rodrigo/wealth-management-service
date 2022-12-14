import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Divident {
  @Prop({ type: String, required: true })
  securityId: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: String, required: true })
  userId: string;
}

export const DividentSchema = SchemaFactory.createForClass(Divident);
