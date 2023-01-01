import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  ExternalDataService,
  EXTERNAL_DATA_SERVICE,
} from './external-data-service/external-data.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @Inject(EXTERNAL_DATA_SERVICE)
    private readonly externalService: ExternalDataService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_6PM)
  fetchAndStoreExchangeDataDaily() {
    this.logger.log(
      `Schedulrer invoked ${this.fetchAndStoreExchangeDataDaily.name}...`,
    );
    const now = Date.now();
    this.externalService.saveDataFromExchange();
    this.logger.log(
      `Schedulrer finihed ${
        this.fetchAndStoreExchangeDataDaily.name
      } invocation +${Date.now() - now}ms`,
    );
  }
}
