import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExternalDataModule } from './external-data-service/external-data.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from '../config/databse.config';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingIntercepter } from './common/intercepters/logging.intercepter';
import { TasksService } from './tasks.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'config/default.env', isGlobal: true }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    ScheduleModule.forRoot(),
    ExternalDataModule,
    PortfolioModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TasksService,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingIntercepter,
    },
  ],
})
export class AppModule {}
