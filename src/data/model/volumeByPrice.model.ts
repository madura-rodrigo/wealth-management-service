import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class VolumeByPrice {

    @Prop({type: String, required: true})
    stockId : string;

    @Prop({type: Object, required: true})
    volumeByPriceDetails : {
        price: number, 
        quantity : number, 
        priceChange : number, 
        tradeCount: number};
}