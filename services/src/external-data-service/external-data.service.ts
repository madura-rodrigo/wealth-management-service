import { Observable } from 'rxjs';
import { ExchangeDataLightResponseDto } from './dto/exchange-data-light-response.dto';
import { DailySecurityInfo } from './model/daily-security-info.model';

export const EXTERNAL_DATA_SERVICE = 'EXTERNAL_DATA_SERVICE';

export interface ExternalDataService {
  getAllExchangeLighData(): Promise<ExchangeDataLightResponseDto[]>;

  saveDataFromExchange();

  findSecurityDataById(securityId: string): Promise<DailySecurityInfo>;

  findSecurityDataByIds(securityIds: string[]): Promise<DailySecurityInfo[]>;
}
