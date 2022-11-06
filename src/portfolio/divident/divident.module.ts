import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Divident, DividentSchema } from '../model/divident.model';
import { DividentService } from './divident.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Divident.name, schema: DividentSchema}]),],
  providers: [DividentService],
  exports: [DividentService],
})
export class DividentModule {}
