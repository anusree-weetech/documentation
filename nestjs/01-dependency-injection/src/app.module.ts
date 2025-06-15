/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import {
  AppController,
  DiController,
  ManualController,
  Manual2Controller,
} from './app.controller';
import { AppService, LoggerService } from './app.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    DiController,
    ManualController,
    Manual2Controller,
  ],
  providers: [AppService, LoggerService],
})
export class AppModule {}
