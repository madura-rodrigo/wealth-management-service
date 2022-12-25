import { DailySecurityInfo } from './model/daily-security-info.model';

export const EXTERNAL_DATA_SERVICE = 'EXTERNAL_DATA_SERVICE';

export interface ExternalDataService {
  fetchAllSecurityDataFromExchange(): Promise<DailySecurityInfo[]>;

  saveDataFromExchange();

  findSecurityDataById(securityId: string): Promise<DailySecurityInfo>;
}
