import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
    constructor(private readonly httpService: HttpService){}

    async getStockVolumesByPriceInDay(){
        return this.httpService.get('https://itrade.sampathsecurities.lk/atsweb/marketdetails?action=getTradesSummaryOfSec&format=json&market=CSE&security=CARE.N0000&boardId=1&dojo.preventCache=1664105699723');

    }
}
