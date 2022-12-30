import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosError } from 'axios';
import { Model } from 'mongoose';
import { catchError, firstValueFrom, map, Observable, zip } from 'rxjs';
import { ExchangeDataLightResponseDto } from '../dto/exchange-data-light-response.dto';
import { ExternalDataService } from '../external-data.service';
import {
  DailySecurityInfo,
  DailySecurityInfoDocument,
} from '../model/daily-security-info.model';

@Injectable()
export class CSEDataService implements ExternalDataService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(DailySecurityInfo.name)
    private readonly securityInfoModel: Model<DailySecurityInfoDocument>,
  ) {}

  async getAllExchangeLighData(): Promise<ExchangeDataLightResponseDto[]> {
    return await this.securityInfoModel
      .find()
      .exec()
      .then((r) =>
        r.map((item) => {
          return new ExchangeDataLightResponseDto(
            item.symbol,
            item.name,
            item.price,
          );
        }),
      );
  }

  async saveDataFromExchange() {
    const fetchedData = await this.fetchAllSecurityDataFromExchange();
    await this.securityInfoModel.insertMany(fetchedData);
  }

  private async fetchAllSecurityDataFromExchange(): Promise<
    DailySecurityInfo[]
  > {
    const all = zip([
      this.getSnPSecurities(),
      this.getMainBoardSecurities(),
      this.getDiriSaviBoardSecurities(),
      this.getSecondBoardSecurities(),
    ]).pipe(map((val) => val.flat()));

    return firstValueFrom(all);
  }

  async findSecurityDataById(securityId: string): Promise<DailySecurityInfo> {
    return await this.securityInfoModel.findOne({ symbol: securityId }).exec();
  }

  async findSecurityDataByIds(
    securityIds: string[],
  ): Promise<DailySecurityInfo[]> {
    return await this.securityInfoModel
      .find()
      .where('symbol')
      .in(securityIds)
      .exec();
  }

  private getSnPSecurities(): Observable<DailySecurityInfo[]> {
    return this.httpService.post('https://www.cse.lk/api/spsl').pipe(
      map((value) => {
        return value.data.reqSNPIndices;
      }),
      catchError((err: AxiosError) => {
        throw err;
      }),
    );
  }

  private getMainBoardSecurities(): Observable<DailySecurityInfo[]> {
    return this.httpService.post('https://www.cse.lk/api/main_boards').pipe(
      map((value) => {
        return value.data.reqMainBoards;
      }),
      catchError((error: AxiosError) => {
        throw error;
      }),
    );
  }

  private getDiriSaviBoardSecurities(): Observable<DailySecurityInfo[]> {
    return this.httpService.post('https://www.cse.lk/api/divi_siri_board').pipe(
      map((value) => {
        return value.data.reqDirisaviBoards;
      }),
      catchError((error: AxiosError) => {
        throw error;
      }),
    );
  }

  private getSecondBoardSecurities(): Observable<DailySecurityInfo[]> {
    return this.httpService.post('https://www.cse.lk/api/secondBoard').pipe(
      map((value) => {
        return value.data.reqSecondBoards;
      }),
      catchError((error: AxiosError) => {
        throw error;
      }),
    );
  }
}
