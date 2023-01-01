import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CSEDataService } from './cse-data/cse-data.service';
import { EXTERNAL_DATA_SERVICE } from './external-data.service';
import {
  DailySecurityInfo,
  DailySecurityInfoSchema,
} from './model/daily-security-info.model';

@Module({
  imports: [
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    MongooseModule.forFeature([
      { name: DailySecurityInfo.name, schema: DailySecurityInfoSchema },
    ]),
  ],
  providers: [{ provide: EXTERNAL_DATA_SERVICE, useClass: CSEDataService }],
  exports: [{ provide: EXTERNAL_DATA_SERVICE, useClass: CSEDataService }],
})
export class ExternalDataModule {}
