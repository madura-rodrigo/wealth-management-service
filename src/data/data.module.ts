import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DataService } from './data.service';

@Module({
  imports: [HttpModule],
  providers: [DataService]
})
export class DataModule {}
