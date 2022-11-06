import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateStockPriceVolumeDailyDto{

    @IsNotEmpty()
    stockId: string;

    volumeByPriceDetails : {
        price: number, 
        quantity : number, 
        priceChange : number, 
        tradeCount: number
    };


}